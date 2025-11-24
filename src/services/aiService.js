import axios from "axios";

export async function sendGemini(message, mood, language) {
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-gemini`;
    console.log(import.meta.env.VITE_SUPABASE_URL);

    const response = await axios.post(
      url,
      { message, mood, language },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.reply;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Sorry, something went wrong while reaching Open Heart.";
  }
}
