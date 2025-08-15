"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
  setAvatarImage: Dispatch<SetStateAction<string>>;
  setAssistant: Dispatch<SetStateAction<string>>;
}

const defaultTabs: Tab[] = [
  {
    id: "hitesh",
    label: "Chat With Hitesh",
    content: (
      <div className="bg-white bg-gradient-to-b from-emerald-50 via-25%-emerald-50 via-50%-white to-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-4">
          <Image
            src="/hitesh.png"
            alt="Hitesh Avatar"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl text-black font-semibold">
              Hitesh Choudhary
            </h3>
            <p className="text-gray-500">Tech Wizard</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          Hitesh is your go-to <strong>tech wizard</strong> — passionate about
          coding, problem-solving, and turning coffee into clean, efficient
          code. Loves mentoring beginners. He is one of those teachers who makes
          you feel like coding isn't scary at all. His way of explaining is so
          simple and relatable that even tough topics like React, APIs, or
          databases feel easy. He doesn't just teach syntax — he teaches how to
          think like a developer.
        </p>
        <ul className="mt-4 px-5 list-disc list-outside text-gray-600">
          <li>Favorite language: JavaScript (but flirts with Python)</li>
          <li>
            Makes Complex Things Simple → Whether it's JavaScript closures or
            full-stack architecture, he breaks it down into small, digestible
            pieces with relatable examples.
          </li>
          <li>
            Project-First Approach → You don't just listen; you build alongside
            him. Every concept comes with a real-life project so you remember it
            longer.
          </li>
          <li>
            Relatable Communication Style → Uses Hinglish, humor, and life
            analogies — like comparing APIs to restaurant waiters — which makes
            technical topics feel like casual conversations.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "piyush",
    label: "Chat With Piyush",
    content: (
      <div className="bg-white bg-gradient-to-b from-amber-50 via-25%-amber-50 via-50%-white to-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-4">
          <Image
            src="/piyush.png"
            alt="Piyush Avatar"
            width={70}
            height={70}
            className="object-top rounded-full"
          />
          <div>
            <h3 className="text-xl text-black font-semibold">Piyush Garg</h3>
            <p className="text-gray-500">Creative Mind</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          Piyush Garg is a{" "}
          <strong>full-stack developer, content creator</strong>, and{" "}
          <strong>educator</strong>
          with a strong focus on empowering developers via project-based
          learning. He's the <strong>Founder & CEO</strong> of Teachyst, a
          next-gen white-labeled learning management platform for educators. He
          shares a YouTube channel, with a passion for making programming
          accessible through real-world tutorials.
        </p>
        <ul className="mt-4 px-5 list-disc list-outside text-gray-600">
          <li>
            Build-As-You-Learn Approach Every video isn't just theory—it's a
            project you work on, making learning sticky and practical.
          </li>{" "}
          <li>
            Real-World Relevance He uses modern tools and workflows like
            Node.js, React, Docker, AWS, Redis, and WebRTC—so you're not just
            coding, you're building.
          </li>{" "}
          <li>
            Beginner to Advanced, His Style Whether you're fresh from tutorials
            or ready for the next level, he tailors content to get you
            job-ready.
          </li>
          <li>Turns boring apps into engaging experiences</li>
        </ul>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
  setAvatarImage,
  setAssistant
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-4xl flex flex-col gap-y-1", className)}>
      <div className="flex [@media(max-width:320px)]:flex-col gap-2 my-4 bg-opacity-50 backdrop-blur-sm rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setAvatarImage(
                tab.id === "piyush" ? "/piyush.png" : "/hitesh.png"
              );
              setActiveTab(tab.id);
              setAssistant(tab.id);
            }}
            className={cn(
              `relative w-full px-3 py-2 text-sm ${
                activeTab === tab.id ? "text-white" : "text-black"
              } font-medium cursor-pointer rounded-lg outline-none transition-colors`
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className={`absolute inset-0 ${
                  tab.id === "hitesh" ? "bg-emerald-700" : "bg-amber-600"
                } bg-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm !rounded-lg`}
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className=" bg-opacity-50 backdrop-blur-sm rounded-xl border min-h-60 h-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
