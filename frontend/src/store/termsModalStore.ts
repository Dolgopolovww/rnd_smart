import { create } from 'zustand';

interface TermsModalState {
  open: boolean;
  toggle: () => void;
}

export const useTermsModal = create<TermsModalState>()((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
