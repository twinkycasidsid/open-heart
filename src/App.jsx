import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/Onboarding/WelcomeScreen";
import LanguageScreen from "./components/Onboarding/LanguageScreen";
import MoodScreen from "./components/Onboarding/MoodScreen";
import MusicScreen from "./components/Onboarding/MusicScreen";
import FinalScreen from "./components/Onboarding/FinalScreen";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <BrowserRouter basename="/open-heart">
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/language" element={<LanguageScreen />} />
        <Route path="/mood" element={<MoodScreen />} />
        <Route path="/music" element={<MusicScreen />} />
        <Route path="/final" element={<FinalScreen />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
