export interface Step {
  id: number;
  title: string;
  shortTitle: string;
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
