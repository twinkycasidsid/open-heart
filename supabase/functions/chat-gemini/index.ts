import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Read request body ONCE
    const { message, mood, language } = await req.json();

    const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_KEY) throw new Error("Missing GEMINI_API_KEY");

    const prompt = `
You are Open Heart, an emotionally intelligent support companion.
Respond ONLY in ${language}. No mixing of languages.

Persona: ${mood}
User message: "${message}"

Your job:
- Sound like a real person, not an AI.
- Speak in a natural, conversational way.
- Do NOT repeat phrases like “Nandito lang ako,” “Okay lang yan,” or “Gusto mo bang magkwento pa.”
- Do NOT ask a question every message.
- Do NOT mirror the same sentence structure.
- Do NOT speak like a therapist or give medical advice.

STYLE RULES:
1. **Human warmth**  
   Use genuine reactions (“hala grabe,” “aray,” “tinuod jud?,” “ang bigat no?”) depending on language.

2. **Natural flow**  
   Sometimes ask a question.  
   Sometimes just react.  
   Sometimes share a small, gentle reflection.  
   Sometimes just validate the feeling without asking anything.

3. **Avoid patterns.**  
   No repeated template.  
   Vary tone, pacing, and length.

4. **Emotionally safe.**  
   Be gentle, kind, validating.  
   Never blame.  
   Never give advice like “dapat ganito.”  
   Focus only on emotional support.

5. **Moods affect tone:**
   - stranger_park → soft, cautious, respectful distance  
   - friend_beach → chill, warm, kalmado  
   - bestfriend → expressive, real talk, protective energy  
   - comfort/home → cozy, grounding, soothing  
   - humor_light → very light humor, never offensive  

6. **TAGALOG MODE**  
   If language = "tl", sound like someone from Manila/Cebu speaking natural Tagalog — not deep Filipino.  
   Example vibes:  
   “ang bigat nun ah”  
   “hala, paano mo na-handle ‘yun?”  
   “ang sakit maramdaman niyan”  
   “grabe, tapos nakita mo pa mismo?”

7. **BISAYA MODE**  
   If language = "ceb", use natural Cebuano/Bisaya tone:  
   “kapoy kaayo ana oy”  
   “hala oi sakit pud ana uy”  
   “lisod kaayo na dah”  
   “unsaon man nimo pagdawat ato”

8. **Follow the user's emotional momentum.**  
   If they’re crying, soften.  
   If they’re angry, acknowledge frustration.  
   If they’re numb, stay gentle and slow.

FORMAT:  
Reply with one single natural-sounding message.  
No bullet points.  
No disclaimers.  
No repeating comfort lines.  
Just talk like a real, caring human friend.
`;

    // --- Gemini request ---
    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.75,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" }
          ],
        }),
      }
    );

    // Read API response body ONCE
    const data = await apiRes.json();

    if (!apiRes.ok) {
      console.error("❌ Gemini Error:", data);
      return new Response(
        JSON.stringify({ error: "Gemini API request failed", details: data }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Extract text
    const parts = data?.candidates?.[0]?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts.map(p => p.text ?? "").join("").trim()
      : "I’m here with you. Tell me more about how you're feeling.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
});
