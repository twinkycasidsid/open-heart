import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/onboarding";

export default function MusicScreen() {
  const navigate = useNavigate();
  const { setMusic } = useOnboarding();

  const handleSelect = (choice) => {
    setMusic(choice);
    navigate("/final");   // ← go to final screen
  };

  return (
    <div className="oh-wrapper">

      {/* Background GIF */}
      <div className="fullscreen-bg">
        <img src="./oh-bg.gif" alt="bg" />
      </div>

      {/* Card */}
      <div className="oh-card">

        {/* Logo */}
        <div className="text-center mb-3">
          <img src="./oh-light-logo.png" className="oh-logo" alt="logo" />
        </div>

        {/* Question */}
        <p className="oh-text">
          Would you like soft background music<br />
          while we talk?
        </p>

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
