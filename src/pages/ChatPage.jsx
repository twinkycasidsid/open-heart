import { useState } from "react";
import { sendGemini } from "../services/aiService";
import { useOnboarding } from "../state/onboarding";

export default function ChatPage() {
  const { mood, language } = useOnboarding();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const reply = await sendGemini(input, mood, language);
    const botMsg = { from: "bot", text: reply };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Open Heart 💬</h1>

      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
            <p className="inline-block px-4 py-2 rounded-xl bg-white text-black">
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-3 bg-white text-black rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
