'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTutorialStore, STEPS } from '@/lib/store';

export default function Navigation() {
  const pathname = usePathname();
  const { completedSteps } = useTutorialStore();

  const currentStepMatch = pathname.match(/\/step\/(\d+)/);
  const currentStep = currentStepMatch ? parseInt(currentStepMatch[1]) : 0;

  return (
    <nav className="nav-sidebar">
      <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Neural Networks
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            From Scratch
          </p>
        </Link>
      </div>

      <div style={{ marginBottom: '1.5rem', padding: '0 1.5rem' }}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
          />
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>
          {completedSteps.length} of {STEPS.length} completed
        </p>
      </div>

      <div>
        {STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;

          return (
            <Link
              key={step.id}
              href={`/step/${step.id}`}
              className={`nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  background: isCompleted
                    ? 'var(--accent-green)'
                    : isActive
                    ? 'var(--accent-blue)'
                    : 'var(--bg-tertiary)',
                  color: isCompleted || isActive ? 'white' : 'var(--text-muted)',
                  flexShrink: 0,
                }}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  step.id
                )}
              </span>
              <span style={{ lineHeight: '1.3' }}>{step.shortTitle}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
