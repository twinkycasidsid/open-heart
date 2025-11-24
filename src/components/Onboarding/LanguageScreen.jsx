import { useOnboarding } from "../../state/onboarding";

export default function LanguageScreen() {
  const { nextStep, setLanguage } = useOnboarding();

  const languages = [
    { code: "en", label: "English" },
    { code: "tl", label: "Tagalog" },
    { code: "bis", label: "Bisaya" },
  ];

  return (
    <div className="text-center max-w-md space-y-4">
      <h2 className="text-3xl font-bold">Choose your language</h2>

      <div className="space-y-3">
        {languages.map((lng) => (
          <button
            key={lng.code}
            className="w-full py-3 bg-white text-black rounded-xl hover:bg-gray-200"
            onClick={() => {
              setLanguage(lng.code);
              nextStep();
            }}
          >
            {lng.label}
          </button>
        ))}
      </div>
    </div>
  );
}
