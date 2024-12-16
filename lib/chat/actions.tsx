import 'server-only'

import {
  createAI,
  getAIState,
  getMutableAIState
} from 'ai/rsc'

import {
  BotMessage,
} from '@/components/stocks'
import { Chat } from '@/lib/types'
import { Client } from "@langchain/langgraph-sdk";
import { UserMessage } from '@/components/stocks/message'
import { auth } from '@/auth'
import {
  nanoid,
} from '@/lib/utils'
import { saveChat } from '@/app/actions'

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
  status?: 'pending' | 'streaming' | 'complete'
  streamId?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  async function submitData() {
    const threadID = aiState.get().chatId
    const chat_history = aiState.get().messages
    const question = chat_history[chat_history.length - 1].content

    const streamId = nanoid()
    const initialMessageId = nanoid()
    
    // Create initial pending message
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: initialMessageId,
          role: 'assistant',
          content: '',
          status: 'pending',
          streamId: streamId
        }
      ]
    })

    try {
      const client = new Client({apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL});
      const assistantID = "graph";
      const streamResponse = client.runs.stream(threadID, assistantID, {
        input: { question: question },
        streamMode: "events",
      });

      let fullContent = ''
      for await (const chunk of streamResponse) {
        if (
          chunk.data.event == "on_chat_model_stream" &&
          chunk.data.metadata.langgraph_node == "generate_node"
        ) {
          const newContent = chunk.data.data.chunk.content;
          fullContent += newContent

          // Update streaming content
          aiState.update({
            ...aiState.get(),
            messages: aiState.get().messages.map((msg: Message) => 
              msg.id === initialMessageId 
                ? { 
                    ...msg, 
                    content: fullContent, 
                    status: 'streaming' 
                  } 
                : msg
            )
          })
        }
      }

      // Finalize message
      aiState.update({
        ...aiState.get(),
        messages: aiState.get().messages.map((msg: Message) => 
          msg.id === initialMessageId 
            ? { 
                ...msg, 
                content: fullContent, 
                status: 'complete' 
              } 
            : msg
        )
      })

      const ui = <BotMessage content={fullContent} />
      return ui
    } catch (error) {
      const ui = <BotMessage content={JSON.stringify(error)} />
      return ui
    }
  }

  const ui = await submitData()
  return {
    id: nanoid(),
    display: ui
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  // @ts-ignore
  unstable_onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  // @ts-ignore
  unstable_onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
