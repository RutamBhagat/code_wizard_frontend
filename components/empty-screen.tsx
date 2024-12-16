export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Code Wizard: A LangChain Documentation AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          Your AI buddy for all things LangChain! This handy chatbot is built
          with Next.js, FastAPI, LangChain, and a local Llama 3 model to guide
          you through the LangChain docs. Whether you're a newbie or a pro, just
          ask Code Wizard about any LangChain concept or code, and it'll break
          it down in an easy-to-understand way
        </p>
      </div>
    </div>
  )
}
