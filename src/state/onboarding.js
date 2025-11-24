import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware"; // ← REQUIRED

export const useOnboarding = create(
  persist(
    (set) => ({
      step: 1,
      language: null,
      mood: null,
      music: false,
      userId: localStorage.getItem("openheart_user") || uuid(),

      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),

      setLanguage: (lang) => set({ language: lang }),
      setMood: (m) => set({ mood: m }),
      setMusic: (choice) => set({ music: choice }),

      saveUserId: () =>
        set((state) => {
          localStorage.setItem("openheart_user", state.userId);
          return {};
        }),
    }),
    {
      name: "openheart-onboarding",
    }
  )
);
