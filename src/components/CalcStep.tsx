'use client';

interface CalcStepProps {
  number: number;
  children: React.ReactNode;
}

export default function CalcStep({ number, children }: CalcStepProps) {
  return (
    <div className="calc-step">
      <div className="calc-step-number">{number}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
