import { create } from 'zustand';

interface IGlobalStore {
  globalLoading: boolean;

  setGlobalLoading: (isLoading: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  // Definindo os estados globais
  globalLoading: false,

  // Funções para modificar os estados globais
  setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),
}));
