import { create } from 'zustand';

export interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

export interface FormState {
  title: string;
  dueDate: string;
  instructions: string;
  questions: QuestionType[];
  file: File | null;
  setField: (field: keyof Omit<FormState, 'setField' | 'resetForm' | 'addQuestionType' | 'updateQuestionType' | 'removeQuestionType'>, value: any) => void;
  addQuestionType: (question: QuestionType) => void;
  updateQuestionType: (index: number, question: QuestionType) => void;
  removeQuestionType: (index: number) => void;
  resetForm: () => void;
}

const defaultState = {
  title: '',
  dueDate: '',
  instructions: '',
  questions: [{ type: 'Multiple Choice', count: 10, marks: 1 }],
  file: null,
};

export const useFormStore = create<FormState>((set) => ({
  ...defaultState,
  setField: (field, value) => set({ [field]: value }),
  addQuestionType: (question) => set((state) => ({ questions: [...state.questions, question] })),
  updateQuestionType: (index, question) =>
    set((state) => {
      const newQuestions = [...state.questions];
      newQuestions[index] = question;
      return { questions: newQuestions };
    }),
  removeQuestionType: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  resetForm: () => set(defaultState),
}));
