'use client';

import { useState, useEffect } from 'react';
import { useTutorialStore, STEPS } from '@/lib/store';

// Import all step content
import Step1 from '@/app/steps/Step1';
import Step2 from '@/app/steps/Step2';
import Step3 from '@/app/steps/Step3';
import Step4 from '@/app/steps/Step4';
import Step5 from '@/app/steps/Step5';
import Step6 from '@/app/steps/Step6';
import Step7 from '@/app/steps/Step7';
import Step8 from '@/app/steps/Step8';
import Step9 from '@/app/steps/Step9';
import Step10 from '@/app/steps/Step10';
import Step11 from '@/app/steps/Step11';
import Step12 from '@/app/steps/Step12';
import Step13 from '@/app/steps/Step13';
import Step14 from '@/app/steps/Step14';
import Step15 from '@/app/steps/Step15';
import Step16 from '@/app/steps/Step16';
import Step17 from '@/app/steps/Step17';

const stepComponents = [
  Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9,
  Step10, Step11, Step12, Step13, Step14, Step15, Step16, Step17
];

export default function Home() {
  const { completedSteps, completeStep, resetProgress } = useTutorialStore();
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-step]');
      let current = 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = parseInt(section.getAttribute('data-step') || '1');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (stepId: number) => {
    const element = document.querySelector(`[data-step="${stepId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="tutorial-container">
      {/* Fixed sidebar navigation */}
      <nav className="nav-sidebar">
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Neural Networks
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            From Scratch
          </p>
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
            const isActive = activeSection === step.id;

            return (
              <button
                key={step.id}
                onClick={() => scrollToStep(step.id)}
                className={`nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
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
              </button>
            );
          })}
        </div>

        {completedSteps.length > 0 && (
          <div style={{ padding: '1.5rem' }}>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.85rem' }}
              onClick={() => {
                if (confirm('Reset all progress? This cannot be undone.')) {
                  resetProgress();
                }
              }}
            >
              Reset Progress
            </button>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="main-content">
        {/* Hero section */}
        <div className="step-card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Build a Neural Network From Scratch
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            No NumPy. No TensorFlow. No PyTorch. Just pure mathematics and your own code.
            By the end, you&apos;ll truly understand how neural networks learn.
          </p>
          <p style={{ fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
            Throughout this tutorial, we&apos;ll build a neural network that predicts <strong>whether it will rain</strong> based
            on temperature and humidity — a concrete example that makes every concept click.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-blue)' }}>17</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Steps</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-green)' }}>Rain</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Prediction</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-purple)' }}>0</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Libraries</div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: '2rem', fontSize: '1.1rem', padding: '1rem 2rem' }}
            onClick={() => scrollToStep(1)}
          >
            Start Learning
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
        </div>

        {/* All steps */}
        {stepComponents.map((StepComponent, index) => {
          const stepId = index + 1;
          const step = STEPS[index];

          return (
            <section
              key={stepId}
              data-step={stepId}
              className="step-section"
              style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}
            >
              <div className="step-header-bar">
                <span className="step-number-badge">Step {stepId}</span>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{step.title}</h2>
              </div>

              <div className="step-card">
                <StepComponent onComplete={() => completeStep(stepId)} />
              </div>
            </section>
          );
        })}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          borderTop: '1px solid var(--border-light)',
          marginTop: '2rem'
        }}>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            Built with pure math and understanding.
          </p>
        </div>
      </main>
    </div>
  );
}
