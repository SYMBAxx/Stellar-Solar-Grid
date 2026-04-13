import { create } from "zustand";

interface WalletState {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,

  connect: async () => {
    // Freighter wallet integration
    try {
      const freighter = (window as any).freighter;
      if (!freighter) {
        alert("Please install the Freighter wallet extension.");
        return;
      }
      await freighter.requestAccess();
      const { publicKey } = await freighter.getPublicKey();
      set({ address: publicKey });
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  },

  disconnect: () => set({ address: null }),
}));
