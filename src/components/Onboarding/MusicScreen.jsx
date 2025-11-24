import { useOnboarding } from "../../state/onboarding";

export default function MusicScreen() {
  const { nextStep, setMusic } = useOnboarding();

  return (
    <div className="text-center max-w-md space-y-4">
      <h2 className="text-3xl font-bold">Do you want background music?</h2>

      <div className="space-y-3">
        <button
          className="w-full py-3 bg-white text-black rounded-xl hover:bg-gray-200"
          onClick={() => {
            setMusic(true);
            nextStep();
          }}
        >
          Yes, please
        </button>

        <button
          className="w-full py-3 bg-gray-700 rounded-xl hover:bg-gray-600"
          onClick={() => {
            setMusic(false);
            nextStep();
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
