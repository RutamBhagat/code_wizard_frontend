# Code Wizard: LangChain Documentation AI Chatbot

Code Wizard is a super cool AI chatbot that helps you learn and use the LangChain Documentation in an interactive way. Just ask it anything about LangChain concepts or code, and it'll break it down for you in an easy-to-understand way. Built with Next.js, FastAPI, LangChain, and a local LLaMA model.

**Link to project:** https://code-wizard-frontend.vercel.app/

![Screenshot 2024-04-27 095234](https://github.com/RutamBhagat/code_wizard_backend/assets/72187009/8c0bc093-2a29-4f00-bedc-1f164eb53b0a)


## How It's Made

**Tech used:** LangChain, LLaMA, Next.js, Typescript, FastAPI

Code Wizard is a full-stack app that combines some cutting edge tech. The front-end is built with Next.js and React, which makes it fast and snappy. The back-end uses FastAPI to host the LangChain pipelines and APIs.

The core is powered by LangChain, which lets us build cool applications with large language models like LLaMA. Code Wizard takes the LangChain documentation, chunks it up, and stores it in a vector database using embeddings.

When you ask Code Wizard a question, it uses LangChain agents to search the vector database for relevant doc chunks. It then generates a response by combining those chunks with the LLaMA 3.

The front-end has a slick chat interface built with React, so you can have natural conversations with the AI. It also renders Markdown and code snippets nicely.

## Optimizations

To make Code Wizard performant and scalable, it uses some cool optimizations:

1. **Caching**: Frequently asked questions and their responses are cached to improve latency.
2. **Async Processing**: The LangChain pipelines run asynchronously to handle multiple requests concurrently.
3. **Model Optimization**: The LLaMA model is optimized for efficient CPU inference, allowing Code Wizard to run on modest hardware.

## Lessons Learned

Building Code Wizard was an incredible learning experience that taught me so much about LangChain, large language models, and modern web development. Some key lessons:

- How to effectively integrate LangChain components like agents, memory, and vector stores.
- Optimizing LLM performance through techniques like quantization and CPU offloading.
- Designing intuitive conversational UIs that feel natural and engaging.
- Leveraging the latest web frameworks like Next.js and FastAPI for building scalable apps.

## Examples

Check out these example conversations with Code Wizard:

**Understanding Retrieval Augmented Generation (RAG):**
![Screenshot 2024-04-27 095356](https://github.com/RutamBhagat/code_wizard_backend/assets/72187009/d99ab750-2723-4caa-af01-336c38e1c015)

**What is Langchain:**
![Screenshot 2024-04-27 095418](https://github.com/RutamBhagat/code_wizard_backend/assets/72187009/38f3bcd2-e135-487b-a81e-5563302f7b04)

**Explaining LangChain Expression Language:**
![Screenshot 2024-04-27 095430](https://github.com/RutamBhagat/code_wizard_backend/assets/72187009/fb16a35e-d619-4332-a3c1-3cc211069c1f)

