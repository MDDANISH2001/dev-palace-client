import type { IClient } from "@/types/clientTypes/clientAuth.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ClientProfileState {
  clientProfile: Record<string, Partial<IClient>> | null;
  setClientProfile: (profile: Record<string, Partial<IClient>>) => void;
  clearClientProfile: () => void;
}
export const useClientProfileStore = create<ClientProfileState>()(
  devtools(
    persist(
      (set) => ({
        clientProfile: null,
        setClientProfile: (profile: Record<string, Partial<IClient>>) =>
          set({ clientProfile: profile }),
        clearClientProfile: () => set({ clientProfile: null }),
      }),
      {
        name: "client-profile-storage", // unique name
      }
    )
  )
);
