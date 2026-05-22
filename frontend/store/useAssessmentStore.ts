import { create } from 'zustand';

export interface AssessmentContext {
  title: string;
  sections: Array<{
    id: string;
    instructions: string;
    questions: Array<{
      id: string;
      text: string;
      type: string;
      difficulty: 'easy' | 'medium' | 'hard';
      marks: number;
      options?: string[];
      answer?: string;
    }>;
  }>;
}

export interface AssessmentState {
  generatedAssessment: AssessmentContext | null;
  history: AssessmentContext[];
  setAssessment: (assessment: AssessmentContext) => void;
  addToHistory: (assessment: AssessmentContext) => void;
  clearAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  generatedAssessment: null,
  history: [],
  setAssessment: (assessment) => set({ generatedAssessment: assessment }),
  addToHistory: (assessment) =>
    set((state) => ({ history: [assessment, ...state.history] })),
  clearAssessment: () => set({ generatedAssessment: null }),
}));
