"use client";

import type { Session } from "next-auth";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { IMessage } from "../types/typings";
import fetchMessages from "../utils/fetchMessages";

type Props = {
  session: Session | null;
};

const ChatInput = ({ session }: Props) => {
  const userSession = session?.user?.email?.replace("@", "").replace(".", "");
  const [input, setInput] = useState("");
  const {
    data: messages,
    error,
    mutate,
  } = useSWR(`/api/getMessages/${userSession!}`, fetchMessages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;
    setInput("");

    const id = uuid();
    const message: IMessage = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToRedis = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userSession,
          message,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    const mutateUploadMessagesToRedis = await mutate(uploadMessageToRedis, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });

    if (mutateUploadMessagesToRedis) {
      sendOpenAiAnswerToRedis(messageToSend);
    }
  };

  const sendOpenAiAnswerToRedis = async (messageToSend: string) => {
    // OpenAI generate answer
    const openAiResponse = await fetch("/api/generateAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: messageToSend }),
    });
    const openAiData = await openAiResponse.json();

    // Send answer to Redis
    const idOpenAi = uuid();
    const messageOpenAi: IMessage = {
      id: idOpenAi,
      message: openAiData.result,
      created_at: Date.now(),
      username: "Beside AI",
      profilePic: "https://i.imgur.com/MzMAhKf.png",
      email: "AgentV1@beside.ai",
    };

    const uploadOpenAiAnswerToRedis = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userSession,
          message: messageOpenAi,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadOpenAiAnswerToRedis, {
      optimisticData: [messageOpenAi, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 w-full z-50 flex px-10 py-5 space-x-2 bg-zinc-900 border-t border-stone-700"
    >
      <input
        disabled={!session}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What's on your mind?"
        className="resize flex-1 rounded border border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-cyan-700 transition-all hover:bg-cyan-800 text-stone-200 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
