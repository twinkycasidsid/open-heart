import { useOnboarding } from "../state/onboarding";
import WelcomeScreen from "../components/Onboarding/WelcomeScreen";
import LanguageScreen from "../components/Onboarding/LanguageScreen";
import MoodScreen from "../components/Onboarding/MoodScreen";
import MusicScreen from "../components/Onboarding/MusicScreen";
import FinalScreen from "../components/Onboarding/FinalScreen";

export default function Onboarding() {
  const { step } = useOnboarding();

  if (step === 1) return <WelcomeScreen />;
  if (step === 2) return <LanguageScreen />;
  if (step === 3) return <MoodScreen />;
  if (step === 4) return <MusicScreen />;
  if (step === 5) return <FinalScreen />;

  return null;
}
