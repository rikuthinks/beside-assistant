# Beside AI

Beside AI is an AI-powered executive assistant designed to keep you on track at your own pace.

- Utilizes state of the art prompt engineering and the latest OpenAI completion endpoint to understand user questions and generate natural language responses.
- Utilizes Next.js v13 with the experimental appDirectory feature and TypeScript on the front-end, with Upstash and Redis for serverless back-end functionality.
- Implements OAuth for user authentication and Pusher Channels for real-time messaging.
- Uses SWR for efficient data fetching and caching.
- Styled the application with Tailwind CSS.
- Utilized Framer Motion to create interactive and animated UI components.
- This project allowed me to explore the capabilities of artificial intelligence in web development and gain experience with serverless architecture and real-time communication.

🔗 [Open live Demo](https://.vercel.app)

## Tech Stack

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI API, GPT-3 models
- SWR (stale-while-revalidate)
- Upstash
- Redis in-memory DB
- Pusher real-time Channels
- NextAuth
- Google OAuth
- GitHub OAuth

## Features

- Responsive UI with Tailwind CSS.
- AI ChatBot that can understand general natural language.
- Chat log stored in Redis.
- Data fetching and caching techniques using SWR— a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
- NextAuth with Google and GitHub OAuth providers.
- Robust code using TypeScript.
