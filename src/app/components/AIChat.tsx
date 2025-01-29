import { useState } from "react";

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getSong = async (query: string): Promise<Track> => {
    console.log(query);
    const res = await fetch(`/api/search/song?track=${query}`);
    const data = await res.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      // Parse the nested JSON string to get text_response
      const parsedMessage = JSON.parse(data.message.text.value);
      setResponse(parsedMessage.text_response);

      console.log(parsedMessage);

      console.log(await getSong(parsedMessage.song_id));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-md bg-neutral-800 text-white"
          placeholder="Ask for music recommendations..."
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-neutral-800 rounded-md">
          <p className="text-white">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AiChat;
