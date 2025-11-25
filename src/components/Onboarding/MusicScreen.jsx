import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/onboarding";
import { useState, useEffect } from "react";

export default function MusicScreen() {
  const navigate = useNavigate();
  const { setMusic } = useOnboarding();

  const fullText = "Would you like soft background music while we talk?";
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (choice) => {
    setMusic(choice);
    navigate("/final");
  };

  return (
    <div className="oh-wrapper">

      {/* Background GIF */}
      <div className="fullscreen-bg">
        <img src="/open-heart/oh-bg.gif" alt="bg" />
      </div>

      {/* Card */}
      <div className="oh-card">

        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/open-heart/oh-light-logo.png"
            className="oh-logo"
            alt="logo"
          />
        </div>

        {/* Typing Question */}
        <p className="oh-text">{display}</p>

        {/* Buttons */}
        <div className="d-grid gap-3 mt-3">

          <button
            className="btn btn-light w-100"
            onClick={() => handleSelect(true)}
          >
            Yes, please 🎵
          </button>

          <button
            className="btn btn-secondary w-100"
            style={{ background: "#ffffff33", border: "none" }}
            onClick={() => handleSelect(false)}
          >
            No thanks
          </button>

        </div>
      </div>
    </div>
  );
}
