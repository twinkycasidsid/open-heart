import { useOnboarding } from "../../state/onboarding";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../services/sessionService";

export default function FinalScreen() {
  const { userId, language, mood, music } = useOnboarding();
  const navigate = useNavigate();

  const handleStart = async () => {
    // create a session in Supabase
    await createSession({ userId, language, mood });

    // go to chat page
    navigate("/chat");
  };

  return (
    <div className="text-center max-w-md space-y-6">
      <h2 className="text-3xl font-bold">All set!</h2>

      <p className="opacity-80">
        You chose <strong>{language}</strong>, <strong>{mood}</strong> mood
        and {music ? "with music." : "no music."}
      </p>

      <button
        className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200"
        onClick={handleStart}
      >
        Start talking 💬
      </button>
    </div>
  );
}
