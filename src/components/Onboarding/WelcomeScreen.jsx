import { useOnboarding } from "../../state/onboarding";

export default function WelcomeScreen() {
  const { nextStep, saveUserId } = useOnboarding();

  return (
    <div className="text-center max-w-md space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Open Heart</h1>
      <p className="text-lg opacity-80">
        I’m glad you’re here. Let’s set things up so we can talk comfortably.
      </p>

      <button
        onClick={() => {
          saveUserId();
          nextStep();
        }}
        className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200"
      >
        Continue
      </button>
    </div>
  );
}
