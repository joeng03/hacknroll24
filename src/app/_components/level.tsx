"use client";
import React from "react";
import Stage from "./stage";
import ChatBox from "./bot/chatbox";
import { type LevelType } from "@/lib/types";
import { api } from "@/trpc/react";

type LevelProps = {
  level: LevelType;
};

export default function Level({ level }: LevelProps) {
  const [messages, setMessages] = React.useState<Array<string>>([]);
  const [audioUrl, setAudioUrl] = React.useState<string>("");

  console.log(audioUrl);
  const textMutation = api.openAI.hello.useMutation({
    onSuccess: (data) => {
      console.log(data.audio_url);
      console.log("data", data);
      console.log("recevied data", data.message);
      const message = JSON.parse(data.message);
      const correctness = message.correctness;
      const newMessages = message.comments;
      setMessages((prev) => [...prev, ...newMessages]);
      setAudioUrl(data.audio_url);
      console.log(typeof correctness);
      console.log(correctness);
      if (correctness > level.correctness! * 100) {
        alert("You're hired!");
      } else {
        alert("You're fired!");
      }
    },
  });

  const onSubmit = async (code: string) => {
    const textPrompt = `{
"INTERN_CODE": \`${code}\`,
"CONTEXT": \`${level.contextPrompt}\`,
"SAMPLE_ANSWER": \"${level.sampleAnswer}\",
"SAMPLE_CORRECT_RESPONSE_FORMAT": \"${level.sampleCorrectResponse}\",
"SAMPLE_WRONG_RESPONSE_FORMAT": \"${level.sampleWrongResponse}\"
}`;

    console.log("text prompt", textPrompt);
    textMutation.mutate({
      message: textPrompt,
      persona: level.persona,
      correctness: level.correctness!,
    });
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row">
        <div className="absolute bottom-0 right-0 z-10 flex w-[600px] flex-col px-4 py-4">
          <ChatBox level={level} messages={messages} />
        </div>
        <div className="flex w-full">
          <Stage level={level} onSubmit={onSubmit} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white"></p>
        </div>

        <audio
          src={audioUrl}
          preload="auto"
          style={{ display: "none" }}
          autoPlay
        ></audio>
      </div>
    </main>
  );
}
