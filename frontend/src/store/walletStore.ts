import { create } from "zustand";

interface WalletState {
  address: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  error: null,

  connect: async () => {
    // Freighter wallet integration
    try {
      const freighter = (window as any).freighter;
      if (!freighter) {
        set({ error: "no_freighter" });
        return;
      }
      await freighter.requestAccess();
      const { publicKey } = await freighter.getPublicKey();
      set({ address: publicKey, error: null });
    } catch (err) {
      console.error("Wallet connection failed:", err);
      set({ error: "connection_failed" });
    }
  },

  disconnect: () => set({ address: null, error: null }),
  clearError: () => set({ error: null }),
}));
