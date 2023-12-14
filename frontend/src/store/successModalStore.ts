import { create } from 'zustand';

interface SuccessModalState {
  open: boolean;
  toggle: () => void;
}

export const useSuccessModal = create<SuccessModalState>()((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
