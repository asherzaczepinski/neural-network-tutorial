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

export const TOTAL_STEPS = 17;

export const STEPS = [
  { id: 1, title: 'What is a Neuron?', shortTitle: 'Neuron Basics' },
  { id: 2, title: 'Representing Weather as Numbers', shortTitle: 'Data & Inputs' },
  { id: 3, title: 'Weights: How Much Each Factor Matters', shortTitle: 'Weights' },
  { id: 4, title: 'Bias: The Baseline Rain Tendency', shortTitle: 'Bias' },
  { id: 5, title: 'The Dot Product', shortTitle: 'Dot Product' },
  { id: 6, title: 'Why Non-linearity Matters', shortTitle: 'Non-linearity' },
  { id: 7, title: 'The Sigmoid Function', shortTitle: 'Sigmoid' },
  { id: 8, title: 'Your First Complete Neuron', shortTitle: 'First Neuron' },
  { id: 9, title: 'Building a Layer of Neurons', shortTitle: 'Layers' },
  { id: 10, title: 'Connecting Layers into a Network', shortTitle: 'Network' },
  { id: 11, title: 'Forward Propagation', shortTitle: 'Forward Pass' },
  { id: 12, title: 'Measuring Error: The Loss Function', shortTitle: 'Loss' },
  { id: 13, title: 'Derivatives and Gradients', shortTitle: 'Derivatives' },
  { id: 14, title: 'The Chain Rule', shortTitle: 'Chain Rule' },
  { id: 15, title: 'Backpropagation', shortTitle: 'Backprop' },
  { id: 16, title: 'Gradient Descent', shortTitle: 'Training' },
  { id: 17, title: 'Training: Will It Rain?', shortTitle: 'Rain Prediction' },
];
