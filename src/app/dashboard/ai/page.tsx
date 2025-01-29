import SongPreview from "@/app/components/SongPreview";
import { Button } from "@headlessui/react";
import React, { useState } from "react";

const AI = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState(false);

  const getSong = async (query: string): Promise<Track> => {
    console.log(query);
    const res = await fetch(`/api/search/song?track=${query}`);
    const data = await res.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (message === "") return;
    e.preventDefault();
    setLoading(true);

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const parsedMessage = JSON.parse(data.message.text.value);

      console.log(parsedMessage);

      // Add AI response to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: parsedMessage.text_response,
          song: parsedMessage.song,
          playlist: parsedMessage.playlist,
        },
      ]);

      console.log(parsedMessage);
    //   console.log(await getSong(parsedMessage.song_id));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 space-y-4 h-[60vh] overflow-y-auto">
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
            {msg.song && <SongPreview message={msg} className="mt-3" />}
          </div>
        ))}
      </div>

      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <form onSubmit={handleSubmit} className="relative">
            <div className="rounded-lg bg-neutral-800 outline-1 -outline-offset-1 outline-neutral-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600">
              <label htmlFor="message" className="sr-only">
                Ask for music recommendations...
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask for music recommendations..."
                className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-white placeholder:text-neutral-400 focus:outline-none sm:text-sm/6"
              />

              {/* Spacer element to match the height of the toolbar */}
              <div aria-hidden="true" className="py-2">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pr-2">
              <div className="shrink-0">
                <Button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 d disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer "
                >
                  {loading ? "Thinking..." : "Send"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AI;
