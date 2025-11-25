import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/onboarding";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { saveUserId } = useOnboarding();

  return (
    <>
      {/* FULLSCREEN BACKGROUND */}
      <div className="fullscreen-bg">
        <img src="./oh-bg.gif" alt="background" />
      </div>

      {/* CARD CENTERED */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="center-card">

          {/* LOGO */}
          <img
            src="./oh-light-logo.png"
            className="mx-auto mb-3 oh-logo"
            style={{ width: "80px", height: "80px" }}
            alt="Open Heart Logo"
          />

          {/* TEXT */}
          <p className="oh-text">
            Hey there. Welcome to Open Heart.
            <br />
            I’m glad you’re here.
          </p>

          {/* BUTTON */}
          <button
            className="btn btn-light w-100 mt-3"
            onClick={() => {
              saveUserId();
              navigate("/language");   // ← NEW ROUTE
            }}
          >
            Continue →
          </button>

        </div>
      </div>
    </>
  );
}
