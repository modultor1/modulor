import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";

export type UserRole = "etudiant" | "formateur" | "cadre" | "autre" | "admin";

export interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  setUser:    (user: User | null)        => void;
  setProfile: (profile: UserProfile | null) => void;
  logout:     ()                         => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      profile:         null,
      isAuthenticated: false,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user }),

      setProfile: (profile) =>
        set({ profile }),

      logout: () =>
        set({ user: null, profile: null, isAuthenticated: false }),
    }),
    { name: "modulor-auth" }
  )
);
