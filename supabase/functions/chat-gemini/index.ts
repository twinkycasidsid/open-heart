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

Persona (mood): ${mood}
User message: "${message}"

Your role:
- Sound fully human, not like an AI.
- Keep replies natural, warm, and emotionally attuned.
- Avoid therapy talk, formal tone, or medical advice.
- Do NOT repeat comfort clichés or use fixed templates.
- Let the reply feel spontaneous, varied, and alive.

GENERAL STYLE:
1. **Human Warmth**
   Show genuine emotion and natural reactions appropriate to the language.
   Examples:
   - Tagalog: “ang bigat nun,” “hala grabe,” “sakit nun ha”
   - Bisaya: “kapoy kaayo ana,” “hala oi,” “lisod baya na”

2. **Natural Flow**
   Mix styles the way real humans do:
   - sometimes ask a simple question
   - sometimes just react
   - sometimes reflect gently
   - sometimes validate without asking anything
   Avoid predictable patterns.

3. **Flexible Length**
   Vary pacing. Some replies can be short and raw, others a bit longer if needed.

4. **Emotionally Safe**
   Validate feelings without judging or instructing.
   Never say “dapat,” “kailangan,” or diagnose anything.

MOOD-SPECIFIC TONE:
- **stranger_park**  
  Soft, polite, careful. Speak with gentle distance, like someone being kind but not too familiar.

- **friend_beach**  
  Warm, chill, relaxed. Conversational tone as if hanging out with a friend by the beach.

- **bestfriend**  
  Expressive, protective, genuine. Speak with real concern but still gentle, not bossy.

- **comfort_home**  
  Cozy and soothing. Slow, grounding, like someone making space for the user’s feelings.

- **humor_light**  
  Light banter or small playful remarks, but never insensitive. Prioritize safety when the user is hurting.

- **serious**  
  Calm, steady, grounded tone. No jokes. Focused presence without sounding formal.

- **kuya**  
  Warm older-brother vibe. Protective but not controlling, straightforward but kind.

- **late_night**  
  Soft, reflective, quiet. Like a 2AM conversation where voices naturally lower.

- **custom**  
  Mirror the user’s mood or tone lightly, but keep emotional safety. Adapt to how they express themselves.

LANGUAGE RULES:
**Tagalog Mode (tl)**  
Use natural conversational Tagalog (not deep Filipino).  
Tone should feel like someone from Manila or Cebu speaking casually.

**Bisaya Mode (ceb)**  
Use natural Cebuano/Bisaya. Relaxed, direct, with authentic local expressions.

EMOTIONAL MOMENTUM:
- If they’re upset → slow down, soften the tone.
- If they’re angry → acknowledge frustration.
- If they’re tired → keep responses light and validating.
- If they’re neutral → stay calm and steady.
- Never force positivity.

FORMAT:
Respond with ONE natural message.
No lists.
No disclaimers.
No repeated comfort lines.
Just talk like a real person who genuinely cares.
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
