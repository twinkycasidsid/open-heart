import { useOnboarding } from "../../state/onboarding";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../services/sessionService";
import { useEffect, useState } from "react";

export default function FinalScreen() {
  const { userId, language, mood, reset } = useOnboarding();
  const navigate = useNavigate();

  const textFull =
    "Whenever you're ready, you can start talking.\nI'm here to listen.";

  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(textFull.slice(0, i));
      i++;
      if (i > textFull.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const startChat = async () => {
    await createSession({ userId, language, mood });
    navigate("/chat");
  };

  return (
    <>
      {/* BACKGROUND */}
      <div className="fullscreen-bg">
        <img src="./oh-bg.gif" />
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="center-card">

          {/* LOGO */}
          <img
            src="./oh-light-logo.png"
            className="mx-auto mb-3"
            style={{ width: "80px", height: "80px" }}
          />

          {/* TYPING TEXT */}
          <p className="typing">{text}</p>

          {/* BUTTONS */}
          <div className="mt-4 d-flex justify-content-center gap-3">
            <button
              className="btn btn-outline-light"
              onClick={() => {
                reset();
                navigate("/");
              }}
            >
              Reset
            </button>

            <button className="btn btn-light" onClick={startChat}>
              Proceed →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}