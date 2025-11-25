import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/onboarding";

export default function MoodScreen() {
  const navigate = useNavigate();
  const { setMood } = useOnboarding();

  const [selected, setSelected] = useState(null);
  const [customMood, setCustomMood] = useState("");

  const fullText =
    "What kind of presence do you want me to be for you today?";

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

  const moods = [
    { id: "park", label: "Stranger at the park" },
    { id: "beach", label: "Friend at the beach" },
    { id: "home", label: "Family at home" },
    { id: "late", label: "Late-night talk" },
    { id: "funny", label: "Funny & light" },
    { id: "serious", label: "Serious but kind listener" },
    { id: "kuya", label: "Ate/Kuya tone" }
  ];

  const handleSelect = (id) => {
    setSelected(id);
    if (id !== "custom") setCustomMood("");
  };

  const handleContinue = () => {
    if (selected === "custom") {
      setMood(customMood.trim());
    } else {
      setMood(selected);
    }
    navigate("/music");
  };

  return (
    <div className="oh-wrapper">

      {/* Background */}
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
        <div className="dropdown text-center mt-3">
          <button
            className="btn oh-dropdown-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {selected
              ? selected === "custom"
                ? "Custom Mood"
                : moods.find((m) => m.id === selected)?.label
              : "Choose Mood"}
          </button>

          <ul className="dropdown-menu oh-dropdown-menu text-center">
            {moods.map((m) => (
              <li key={m.id}>
                <button
                  className="dropdown-item"
                  onClick={() => handleSelect(m.id)}
                >
                  {m.label}
                </button>
              </li>
            ))}

            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSelect("custom")}
              >
                Custom Mood
              </button>
            </li>
          </ul>
        </div>

        {/* Custom Input */}
        {selected === "custom" && (
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Describe how you want me to talk…"
            style={{ borderRadius: "10px" }}
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
          />
        )}

        {/* Continue Button */}
        <button
          className="btn btn-light w-100 mt-4"
          disabled={
            !selected || (selected === "custom" && customMood.trim() === "")
          }
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
