import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Onboarding flow */}
        <Route path="/" element={<Onboarding />} />

        {/* Chat */}
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  );
}
