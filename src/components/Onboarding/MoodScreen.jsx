import { useOnboarding } from "../../state/onboarding";

export default function MoodScreen() {
  const { nextStep, setMood } = useOnboarding();

  const moods = [
    { id: "park", label: "Stranger at the park" },
    { id: "beach", label: "Friend at the beach" },
    { id: "home", label: "Family at home" },
  ];

  return (
    <div className="text-center max-w-md space-y-4">
      <h2 className="text-3xl font-bold">Who do you want to talk to?</h2>

      <div className="space-y-3">
        {moods.map((m) => (
          <button
            key={m.id}
            className="w-full py-3 bg-white text-black rounded-xl hover:bg-gray-200"
            onClick={() => {
              setMood(m.id);
              nextStep();
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
