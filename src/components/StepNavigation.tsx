'use client';

import Link from 'next/link';
import { STEPS, TOTAL_STEPS } from '@/lib/store';

interface StepNavigationProps {
  currentStep: number;
  canProceed: boolean;
}

export default function StepNavigation({ currentStep, canProceed }: StepNavigationProps) {
  const prevStep = currentStep > 1 ? currentStep - 1 : null;
  const nextStep = currentStep < TOTAL_STEPS ? currentStep + 1 : null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      {prevStep ? (
        <Link href={`/step/${prevStep}`} className="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          Previous: {STEPS[prevStep - 1].shortTitle}
        </Link>
      ) : (
        <div />
      )}

      {nextStep ? (
        <Link
          href={canProceed ? `/step/${nextStep}` : '#'}
          className={`btn ${canProceed ? 'btn-primary' : 'btn-secondary'}`}
          style={{ opacity: canProceed ? 1 : 0.5, pointerEvents: canProceed ? 'auto' : 'none' }}
        >
          Next: {STEPS[nextStep - 1].shortTitle}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </Link>
      ) : (
        <div className="btn btn-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Tutorial Complete!
        </div>
      )}
    </div>
  );
}
