import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/onboarding";
import { useState, useEffect } from "react";

export default function LanguageScreen() {
  const navigate = useNavigate();
  const { setLanguage } = useOnboarding();

  const [selected, setSelected] = useState(null);

  const fullText =
    "Before we start, what language feels most comfortable for you today?";
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const chooseLanguage = (code) => {
    setSelected(code);
    setLanguage(code);
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

        {/* Typing Text */}
        <p className="oh-text" style={{ minHeight: "55px" }}>
          {display}
        </p>

        {/* Dropdown */}
        <div className="dropdown text-center mt-4">
          <button
            className="btn oh-dropdown-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {selected === "en"
              ? "English"
              : selected === "tl"
              ? "Tagalog"
              : selected === "bis"
              ? "Bisaya"
              : "Choose Language"}
          </button>

          <ul className="dropdown-menu oh-dropdown-menu text-center">
            <li>
              <button
                className="dropdown-item"
                onClick={() => chooseLanguage("en")}
              >
                English
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => chooseLanguage("tl")}
              >
                Tagalog
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => chooseLanguage("bis")}
              >
                Bisaya
              </button>
            </li>
          </ul>
        </div>

        {/* Continue Button */}
        <button
          className="btn btn-light w-100 mt-4"
          disabled={!selected}
          onClick={() => navigate("/mood")}
        >
          Continue →
        </button>

      </div>
    </div>
  );
}
