import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/onboarding";
import { useState, useEffect } from "react";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { saveUserId } = useOnboarding();

  const fullText = "Hey there. Welcome to Open Heart.\nI’m glad you’re here.";
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplay(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 40); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* FULLSCREEN BACKGROUND */}
      <div className="fullscreen-bg">
        <img src="/open-heart/oh-bg.gif" alt="background" />
      </div>

      {/* CARD CENTERED */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="center-card">

          {/* LOGO */}
          <img
            src="/open-heart/oh-light-logo.png"
            className="mx-auto mb-3 oh-logo"
            style={{ width: "80px", height: "80px" }}
            alt="Open Heart Logo"
          />

          {/* TYPING TEXT */}
          <p className="oh-text" style={{ whiteSpace: "pre-line" }}>
            {display}
          </p>

          {/* BUTTON */}
          <button
            className="btn btn-light w-100 mt-3"
            onClick={() => {
              saveUserId();
              navigate("/language");
            }}
          >
            Continue →
          </button>

        </div>
      </div>
    </>
  );
}
