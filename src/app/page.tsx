"use client";

import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Chatbot } from "@/components/ui/chatbot";
import { useState } from "react";

export default function Home() {
  const [avatarImage, setAvatarImage] = useState("/hitesh.png");
  const [assistant, setAssistant] = useState('hitesh')
  const word = [{ text: "AI" }, { text: "Persona" }, { text: "Chatbot" }];
  return (
    <div className="min-h-screen sm:p-10 lg:px-20 md:p-10 bg-black/90">
      <div className="bg-neutral-50 w-full p-4 sm:p-10 sm:rounded-xl flex flex-col gap-5 lg:gap-10 justify-center items-center">
        <div>
          <TypewriterEffectSmooth className="" words={word} />
        </div>
        <div className="flex flex-col gap-5 mb-10 min-h-[450px]">
          <div>
            <h2 className="text-lg sm:text-xl xl:text-3xl font-bold text-center">
              Select your AI buddy
            </h2>
            <AnimatedTabs
              setAvatarImage={setAvatarImage}
              setAssistant={setAssistant}
            />
          </div>
          <div className="w-full">
            <Chatbot
              avatarImage={avatarImage}
              assistant={assistant}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
