import { create } from 'zustand';

export interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;
  loadingStates: Record<string, boolean>;
  setSidebarOpen: (isOpen: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setLoading: (key: string, isLoading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  activeModal: null,
  loadingStates: {},
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  setLoading: (key, isLoading) =>
    set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: isLoading },
    })),
}));
