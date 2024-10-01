import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  // Definindo os estados globais
  user: null,

  // Funções para modificar os estados globais
  setUser: (user: any) => set({ user: user }),
}));
