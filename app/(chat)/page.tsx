import { AI } from '@/lib/chat/actions'
import { Chat } from '@/components/chat'
import { Client } from '@langchain/langgraph-sdk'
import { Session } from '@/lib/types'
import { auth } from '@/auth'
import { getMissingKeys } from '../actions'

export const metadata = {
  title: 'LangChain Docs AI Chatbot'
}

export default async function IndexPage() {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()
  const client = new Client({apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL});
  const thread = await client.threads.create();
  const id = thread.thread_id

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
