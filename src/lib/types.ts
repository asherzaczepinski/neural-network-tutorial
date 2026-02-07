export interface Step {
  id: number;
  title: string;
  shortTitle: string;
  completed: boolean;
}

export interface ValidationResult {
  success: boolean;
  output: string;
  feedback?: string;
}

export interface CodeEditorProps {
  initialCode: string;
  onRun: (code: string) => ValidationResult;
  placeholder?: string;
  minHeight?: number;
}

export interface StepProps {
  stepNumber: number;
  totalSteps: number;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
}
