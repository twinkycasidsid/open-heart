import { sendGemini } from "../services/aiService";

async function handleSend() {
  const reply = await sendGemini(userInput, selectedMood, selectedLanguage);

  setMessages((prev) => [
    ...prev,
    { from: "user", text: userInput },
    { from: "bot", text: reply },
  ]);

  setUserInput("");
}
