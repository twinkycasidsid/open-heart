import { useState } from "react";
import { sendGemini } from "../services/aiService";
import { useOnboarding } from "../state/onboarding";

export default function ChatPage() {
  const { mood, language } = useOnboarding();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  const moodBackgrounds = {
    park: "/bg1.gif",
    beach: "/bg2.gif",
    home: "/bg3.gif",
    late: "/bg4.gif",
    funny: "/bg5.gif",
    serious: "/bg6.gif",
    kuya: "/bg7.gif",
    custom: "/bgcustom.gif",
  };

  const chosenBackground = moodBackgrounds[mood] || moodBackgrounds.custom;

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
    <div
      style={{
        backgroundImage: `url(${chosenBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        position: "relative",
        transition: "0.3s ease",
      }}
    >
      {/* 🔹 Background darkener overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: darkMode ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0)",
          pointerEvents: "none",
          transition: "0.3s ease",
        }}
      ></div>

      {/* RIGHT SIDE FLOATING ICONS */}
      <div
        style={{ position: "absolute", right: "25px", top: "40px", zIndex: 20 }}
      >
        {/* 1 — LIGHT/DARK MODE TOGGLE */}
        <div
          className="floating-icon"
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.75)",
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </div>

        {/* 2 — MUSIC TOGGLE */}
        <div
          className="floating-icon"
          onClick={() => setMusicOn(!musicOn)}
          style={{
            background: darkMode
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.75)",
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
            marginTop: "12px",
          }}
        >
          {musicOn ? "🔊" : "🔇"}
        </div>

        {/* 3 — RESET CHAT */}
        <div
          className="floating-icon"
          onClick={() => setShowResetModal(true)}
          style={{
            background: darkMode
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.75)",
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
            marginTop: "12px",
          }}
        >
          ↻
        </div>
      </div>

      {/* 🔹 Center Glass Panel */}
      <div
        className="glass-panel"
        style={{
          backdropFilter: "blur(20px)",
          background: darkMode ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.18)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.3)",
          width: "90%",
          maxWidth: "900px",
          margin: "80px auto",
          minHeight: "75vh",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "0.3s ease",
        }}
      >
        {/* Top UI */}
        <div className="text-center mb-4">
          <img
            src="/oh-light-logo.png"
            style={{ width: "60px", opacity: 0.9 }}
          />
          <h2 style={{ marginTop: "10px", color: "#fff" }}>
            So, how are you feeling?
          </h2>
        </div>

        {/* Messages */}
        <div
          className="messages-area"
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{ textAlign: m.from === "user" ? "right" : "left" }}
            >
              <p
                style={{
                  display: "inline-block",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  background: darkMode
                    ? "rgba(0,0,0,0.45)"
                    : "rgba(255,255,255,0.85)",
                  color: darkMode ? "#fff" : "#000",
                  maxWidth: "70%",
                }}
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="It's okay, just let it all out..."
            style={{
              flex: 1,
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              background: darkMode
                ? "rgba(0,0,0,0.45)"
                : "rgba(255,255,255,0.9)",
              color: darkMode ? "#fff" : "#000",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              border: "none",
              background: darkMode
                ? "rgba(0,0,0,0.45)"
                : "rgba(255,255,255,0.9)",
              padding: "0 20px",
              borderRadius: "12px",
              fontSize: "22px",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            ➤
          </button>
        </div>
      </div>
      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: darkMode ? "#222" : "#fff",
              color: darkMode ? "#fff" : "#000",
              padding: "30px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "380px",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>Reset chat?</h3>
            <p style={{ opacity: 0.8 }}>
              You will go back to the welcome screen and lose your conversation.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => setShowResetModal(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "gray",
                  color: "#fff",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("openheart-onboarding");
                  window.location.href = "/"; // go back to WelcomeScreen
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#d9534f",
                  color: "#fff",
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
