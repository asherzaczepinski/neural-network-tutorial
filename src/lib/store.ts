'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TutorialState {
  currentStep: number;
  completedSteps: number[];
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
  resetProgress: () => void;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set) => ({
      currentStep: 1,
      completedSteps: [],
      setCurrentStep: (step) => set({ currentStep: step }),
      completeStep: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),
      resetProgress: () => set({ currentStep: 1, completedSteps: [] }),
    }),
    {
      name: 'neural-network-tutorial-progress',
    }
  )
);

export const TOTAL_STEPS = 18;

export const STEPS = [
  { id: 1, title: 'Welcome', shortTitle: 'Intro' },
  { id: 2, title: 'What is a Neuron?', shortTitle: 'Neuron Intro' },
  { id: 3, title: 'Representing Data as Numbers', shortTitle: 'Data & Inputs' },
  { id: 4, title: 'Weights: How Much Each Factor Matters', shortTitle: 'Weights' },
  { id: 5, title: 'Bias: Adding Flexibility', shortTitle: 'Bias' },
  { id: 6, title: 'Computing Pre-activation', shortTitle: 'Pre-activation' },
  { id: 7, title: 'The Dot Product', shortTitle: 'Dot Product' },
  { id: 8, title: 'Why Non-linearity Matters', shortTitle: 'Non-linearity' },
  { id: 9, title: 'The Sigmoid Function', shortTitle: 'Sigmoid' },
  { id: 10, title: 'Your First Complete Neuron', shortTitle: 'Complete Neuron' },
  { id: 11, title: 'How Information Flows Through a Network', shortTitle: 'Network Flow' },
  { id: 12, title: 'Building a Layer of Neurons', shortTitle: 'Layers' },
  { id: 13, title: 'Connecting Layers', shortTitle: 'Connecting' },
  { id: 14, title: 'Forward Propagation', shortTitle: 'Forward Pass' },
  { id: 15, title: 'Measuring Error: The Loss Function', shortTitle: 'Loss' },
  { id: 16, title: 'Derivatives and Gradients', shortTitle: 'Derivatives' },
  { id: 17, title: 'Backpropagation', shortTitle: 'Backprop' },
  { id: 18, title: 'Gradient Descent & Training', shortTitle: 'Training' },
];
