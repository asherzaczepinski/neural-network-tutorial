'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { STEPS } from '@/lib/store';

export default function Navigation() {
  const pathname = usePathname();

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

      <div>
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;

          return (
            <Link
              key={step.id}
              href={`/step/${step.id}`}
              className={`nav-item ${isActive ? 'active' : ''}`}
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
                  background: isActive
                    ? 'var(--accent-blue)'
                    : 'var(--bg-tertiary)',
                  color: isActive ? 'white' : 'var(--text-muted)',
                  flexShrink: 0,
                }}
              >
                {step.id}
              </span>
              <span style={{ lineHeight: '1.3' }}>{step.shortTitle}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
