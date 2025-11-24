# 🌸 Open Heart — Emotional Support AI (Tagalog & Bisaya)

Open Heart is a lightweight emotional-support chatbot designed to offer warm, human-like conversations in Tagalog or Bisaya, powered by Supabase Edge Functions and Google Gemini.
It adapts its tone based on the user’s chosen mood/persona, creating natural and comforting conversations.

**🌟 Features**
🧠 Emotionally Intelligent Responses
- Understands user feelings (sadness, heartbreak, stress, loneliness)
- Replies with natural emotional warmth
-No robotic repetition. No clinical tone.
🎭 Mood-Based Personas
- Choose how the AI speaks:
    "stranger_in_park" – gentle. soft-spoken. respectful.
    "friend_at_beach" – warm. casual. comforting.
    "kuya_or_ate" – caring sibling tone.
    "late_night_talk" – quiet. calm. reflective.
    "funny_light" – kalog, pang-comfort, but still safe.
- Each mood affects:
    Length of responses
    Level of emotional closeness
    Word choice
    Style of empathy
🌍 Multi-language
- Supports Tagalog, Bisaya and English
🛡 Trauma-Safe Guardrails
- Never gives medical, legal, or suicidal instructions
- Avoids harmful advice
- Redirects to safer emotional grounding language
🔁 Short-term Memory (Conversation Awareness)
- Open Heart keeps context of:
    What emotion the user expressed
    What happened in earlier messages (e.g., breakup, betrayal)
    Tone they use
    How they are coping

**⚙️ Tech Stack**
  Frontend
    React + Vite
    Axios
    Tailwind (optional)

  Backend
    Supabase Edge Functions
    Deno
    Google Gemini API (gemini-2.0-flash)

**🛠 Installation**
Clone the repo:
    git clone https://github.com/twinkycasidsid/open-heart.git
    cd open-heart

Install dependencies:
    npm install
    
Run dev mode:
    npm run dev

Deploy Edge Functions:
    supabase functions deploy chat-gemini
