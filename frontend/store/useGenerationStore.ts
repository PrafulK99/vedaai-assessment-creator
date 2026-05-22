import { create } from 'zustand';

export interface GenerationState {
  currentJobId: string | null;
  progress: number;
  status: 'idle' | 'queued' | 'processing' | 'completed' | 'failed';
  message: string;
  error: string | null;
  setJobId: (id: string) => void;
  setProgress: (progress: number, message?: string) => void;
  setStatus: (status: GenerationState['status']) => void;
  setError: (error: string) => void;
  resetGeneration: () => void;
}

const defaultState = {
  currentJobId: null,
  progress: 0,
  status: 'idle' as const,
  message: '',
  error: null,
};

export const useGenerationStore = create<GenerationState>((set) => ({
  ...defaultState,
  setJobId: (id) => set({ currentJobId: id }),
  setProgress: (progress, message) =>
    set((state) => ({
      progress,
      message: message !== undefined ? message : state.message,
    })),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: 'failed' }),
  resetGeneration: () => set(defaultState),
}));
