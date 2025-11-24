import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware"; // ← REQUIRED

export const useOnboarding = create(
  persist(
    (set) => ({
      language: null,
      mood: null,
      music: false,
      userId: localStorage.getItem("openheart_user") || uuid(),

      setLanguage: (lang) => set({ language: lang }),
      setMood: (mood) => set({ mood }),
      setMusic: (music) => set({ music }),

      saveUserId: () =>
        set((state) => {
          localStorage.setItem("openheart_user", state.userId);
          return {};
        }),
    }),
    { name: "openheart-onboarding" }
  )
);