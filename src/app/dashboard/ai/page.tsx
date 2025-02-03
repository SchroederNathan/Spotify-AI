"use client";

import PlaylistPreview from "@/app/components/PlaylistPreview";
import SongPreview from "@/app/components/SongPreview";
import { Button, Textarea } from "@headlessui/react";
import { IconSend } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

const AI = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState(false);
  const [topGenres, setTopGenres] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`api/stats/genres?time_range=short_term`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Take only the first 5 genres from the response
        setTopGenres(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (message === "") return;
    e.preventDefault();
    setLoading(true);

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    try {
      setMessage("");
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          topGenres: topGenres || [], // Ensure we always send an array
        }),
      });

      const data = await res.json();
      const parsedMessage = JSON.parse(data.message.text.value);

      // Add AI response to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: parsedMessage.text_response,
          request_type: parsedMessage.request_type,
          song: parsedMessage.song,
          playlist: parsedMessage.playlist,
        },
      ]);

      console.log(parsedMessage);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col absolute right-3 left-3 top-36 bottom-3 max-w-4xl mx-auto">
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto mb-4"
      >
        {chatHistory.map((msg, index) => (
          <div key={index}>
            <div
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-neutral-800 text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
            {msg.request_type === "song" && (
              <SongPreview message={msg} className="mt-3" />
            )}
            {msg.request_type === "playlist" && (
              <PlaylistPreview message={msg} className="mt-3" />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start bg-neutral-800 w-fit rounded-lg">
            <div className="animate-pulse p-3 rounded-lg flex space-x-1">
              <div
                className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0">
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <form onSubmit={handleSubmit} className="relative">
              <div className="rounded-lg bg-neutral-800 outline-1 -outline-offset-1 outline-neutral-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600">
                <label htmlFor="message" className="sr-only">
                  Ask for music recommendations...
                </label>
                <div className="relative">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 inline-flex items-center rounded-md bg-green-600 py-2 px-2 font-semibold text-white shadow-xs hover:bg-green-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
                  >
                    <IconSend strokeWidth={2} size={18} />
                  </Button>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask for music recommendations..."
                    className="block w-full resize-none bg-transparent px-3 py-1.5 pr-20 text-base text-white placeholder:text-neutral-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
