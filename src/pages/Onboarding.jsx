import { useOnboarding } from "../state/onboarding";
import WelcomeScreen from "../components/onboarding/WelcomeScreen";
import LanguageScreen from "../components/onboarding/LanguageScreen";
import MoodScreen from "../components/onboarding/MoodScreen";
import MusicScreen from "../components/onboarding/MusicScreen";
import FinalScreen from "../components/onboarding/FinalScreen";

export default function Onboarding() {
  const { step } = useOnboarding();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      {step === 1 && <WelcomeScreen />}
      {step === 2 && <LanguageScreen />}
      {step === 3 && <MoodScreen />}      {/* ← MUST EXIST */}
      {step === 4 && <MusicScreen />}
      {step === 5 && <FinalScreen />}
    </div>
  );
}
