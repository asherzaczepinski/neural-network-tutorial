'use client';

interface MathFormulaProps {
  children: React.ReactNode;
  label?: string;
}

export default function MathFormula({ children, label }: MathFormulaProps) {
  return (
    <div className="math-formula">
      {label && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
