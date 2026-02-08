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
  { id: 2, title: 'What is a Neuron?', shortTitle: 'Neuron Basics' },
  { id: 3, title: 'Representing Weather as Numbers', shortTitle: 'Data & Inputs' },
  { id: 4, title: 'Weights: How Much Each Factor Matters', shortTitle: 'Weights' },
  { id: 5, title: 'Bias: The Baseline Rain Tendency', shortTitle: 'Bias' },
  { id: 6, title: 'The Dot Product', shortTitle: 'Dot Product' },
  { id: 7, title: 'Why Non-linearity Matters', shortTitle: 'Non-linearity' },
  { id: 8, title: 'The Sigmoid Function', shortTitle: 'Sigmoid' },
  { id: 9, title: 'Your First Complete Neuron', shortTitle: 'First Neuron' },
  { id: 10, title: 'Building a Layer of Neurons', shortTitle: 'Layers' },
  { id: 11, title: 'Connecting Layers into a Network', shortTitle: 'Network' },
  { id: 12, title: 'Forward Propagation', shortTitle: 'Forward Pass' },
  { id: 13, title: 'Measuring Error: The Loss Function', shortTitle: 'Loss' },
  { id: 14, title: 'Derivatives and Gradients', shortTitle: 'Derivatives' },
  { id: 15, title: 'The Chain Rule', shortTitle: 'Chain Rule' },
  { id: 16, title: 'Backpropagation', shortTitle: 'Backprop' },
  { id: 17, title: 'Gradient Descent', shortTitle: 'Training' },
  { id: 18, title: 'Training: Will It Rain?', shortTitle: 'Final Project' },
];
