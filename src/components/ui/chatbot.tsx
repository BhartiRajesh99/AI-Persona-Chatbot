"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Message } from "@/utils/message";
import ReactMarkdown from "react-markdown";
import React from "react";

interface ChatbotProps {
  className?: string;
  avatarImage: string;
  assistant: string;
}

export function Chatbot({ avatarImage, assistant, className }: ChatbotProps) {
  const [hiteshMessages, setHiteshMessages] = useState<Message[]>([]);
  const [piyushMessages, setPiyushMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const URL = `/api/${assistant}`;

  const getMessages = () =>
    assistant === "piyush" ? piyushMessages : hiteshMessages;

  const setMessages = (messages: Message[]) => {
    if (assistant === "piyush") setPiyushMessages(messages);
    else setHiteshMessages(messages);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputValue.trim() };
    const updatedMessages = [...getMessages(), userMessage];

    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);
    scrollToBottom();

    try {
      const botResponse = await axios.post(URL, updatedMessages);

      const botMessage: Message = {
        role: "assistant",
        content: botResponse.data.content,
      };

      setMessages(((prev: any) => [...prev, botMessage]) as any);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I'm having trouble responding right now. Please try again.",
      };
      setMessages(((prev: any) => [...prev, errorMessage]) as any);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const messages = getMessages();

  return (
    <div
      className={cn(
        "flex flex-col h-full hover:shadow-xl transition-shadow max-h-[550px] min-h-[500px] w-full max-w-4xl mx-auto bg-background border rounded-xl shadow-lg",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gray-300/70 rounded-t-xl">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarImage} />
          <AvatarFallback>
            <Bot className="h-5 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">
            {assistant === "hitesh" ? "Hitesh" : "Piyush"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {assistant === "piyush" ? "Software Engineer" : "Web Developer"}
          </p>
        </div>
      </div>

      {/* Messages */}
      {messages.length ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage
                  src={message.role === "assistant" ? avatarImage : "/user.svg"}
                />
                <AvatarFallback>
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              {/* Bubble */}
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                  message.role === "assistant"
                    ? assistant === "piyush"
                      ? "text-foreground bg-gradient-to-l from-amber-50 to-amber-100"
                      : "text-foreground bg-gradient-to-l from-emerald-50 to-emerald-100"
                    : "bg-gradient-to-l from-violet-50 to-violet-100"
                )}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
                <span className="text-xs mt-1 opacity-70 text-black">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={avatarImage} />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2 flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="text-3xl h-[400px] flex justify-center items-center font-bold">
          <p className="animate-bounce">Send a message to start a chat</p>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t rounded-b-xl">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className={
              assistant === "hitesh" ? "bg-emerald-700" : "bg-amber-600"
            }
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
