import { LandingTemplate } from '@/types/template';
import { create } from 'zustand';

interface TemplateState {
  data: LandingTemplate | null;
  setData: (data: LandingTemplate) => void;
}

export const useTemplateStore = create<TemplateState>()((set) => ({
  data: null,
  setData: (data) => set({ data: data }),
}));
