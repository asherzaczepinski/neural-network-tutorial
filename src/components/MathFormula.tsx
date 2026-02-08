'use client';

interface MathFormulaProps {
  children: React.ReactNode;
  label?: string;
}

export default function MathFormula({ children, label }: MathFormulaProps) {
  return (
    <div className="math-formula">
      {label && <div className="math-label">{label}</div>}
      {children}
    </div>
  );
}
