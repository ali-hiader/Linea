// lib/store/useAuthStore.ts
import { Session } from "better-auth";
import { create } from "zustand";

interface AuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));
