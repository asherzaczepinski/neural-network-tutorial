'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
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
import Step18 from '@/app/steps/Step18';

const stepComponents = [
  Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9,
  Step10, Step11, Step12, Step13, Step14, Step15, Step16, Step17, Step18
];

function CourseContent() {
  const { completedSteps, completeStep } = useTutorialStore();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Start at step 1 by default, or use URL param
  const [currentStep, setCurrentStep] = useState(() => {
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 1 && parsed <= 18) return parsed;
    }
    return 1;
  });

  // Update when URL changes
  useEffect(() => {
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 1 && parsed <= 18) {
        setCurrentStep(parsed);
      }
    }
  }, [stepParam]);

  // Handle header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;

      if (scrollingUp || currentScrollY < 100) {
        setHeaderVisible(true);
      } else if (currentScrollY > 100) {
        setHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
    setHeaderVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, '', `/?step=${stepId}`);
  };

  const nextStep = () => {
    if (currentStep < 18) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const StepComponent = stepComponents[currentStep - 1];
  const step = STEPS[currentStep - 1];
  const isCompleted = completedSteps.includes(currentStep);

  return (
    <div className="course-page">
      {/* Top navigation */}
      <header className={`course-header ${headerVisible ? 'visible' : 'hidden'}`}>
        <nav className="course-nav">
          <button
            className="nav-arrow"
            onClick={prevStep}
            disabled={currentStep === 1}
            aria-label="Previous step"
          >
            ←
          </button>

          <div className="step-pagination">
            <input
              type="number"
              className="step-input"
              value={currentStep}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (val >= 1 && val <= STEPS.length) goToStep(val);
              }}
              min={1}
              max={STEPS.length}
            />
            <span className="step-total">of {STEPS.length}</span>
          </div>

          <button
            className="nav-arrow"
            onClick={nextStep}
            disabled={currentStep === 18}
            aria-label="Next step"
          >
            →
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="course-main">
        <div className="course-content">
          <div className="step-header-section">
            <span className="step-label">Module {currentStep}</span>
            <h1>{step.title}</h1>
            {isCompleted && <span className="completed-tag">Completed</span>}
          </div>

          <div className="step-body">
            <StepComponent onComplete={() => completeStep(currentStep)} />
          </div>

          {/* Bottom navigation */}
          <div className="step-footer">
            {currentStep > 1 && (
              <button className="footer-btn prev" onClick={prevStep}>
                ← Previous
              </button>
            )}
            <div className="footer-spacer" />
            {currentStep < 18 && (
              <button className="footer-btn next" onClick={nextStep}>
                Next →
              </button>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .course-page {
          min-height: 100vh;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #222;
        }

        .course-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 52px;
          background: #fff;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          z-index: 100;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .course-header.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .course-header.hidden {
          transform: translateY(-100%);
          opacity: 0;
        }

        .course-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: none;
          border: 1px solid #e5e5e5;
          border-radius: 50%;
          color: #888;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .nav-arrow:hover:not(:disabled) {
          border-color: #ccc;
          color: #333;
        }

        .nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .step-pagination {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-input {
          width: 44px;
          height: 36px;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          text-align: center;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          background: #fff;
          -moz-appearance: textfield;
        }

        .step-input::-webkit-outer-spin-button,
        .step-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .step-input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .step-total {
          font-size: 15px;
          color: #888;
        }

        .course-main {
          padding-top: 52px;
        }

        .course-content {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .step-header-section {
          margin-bottom: 36px;
        }

        .step-label {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #2563eb;
          margin-bottom: 10px;
        }

        .step-header-section h1 {
          font-size: 32px;
          font-weight: 600;
          line-height: 1.2;
          margin: 0;
          color: #222;
        }

        .completed-tag {
          display: inline-block;
          margin-top: 14px;
          font-size: 13px;
          font-weight: 500;
          color: #22c55e;
          background: #f0fdf4;
          padding: 5px 12px;
          border-radius: 4px;
        }

        .step-body {
          line-height: 1.7;
        }

        .step-footer {
          display: flex;
          align-items: center;
          margin-top: 56px;
          padding-top: 28px;
          border-top: 1px solid #eee;
        }

        .footer-spacer {
          flex: 1;
        }

        .footer-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 500;
          color: #444;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .footer-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .footer-btn.next {
          background: #2563eb;
          border-color: #2563eb;
          color: #fff;
        }

        .footer-btn.next:hover {
          background: #1d4ed8;
        }

        @media (max-width: 640px) {
          .course-content {
            padding: 32px 16px;
          }

          .step-header-section h1 {
            font-size: 26px;
          }

          .nav-arrow {
            width: 32px;
            height: 32px;
          }

          .step-input {
            width: 40px;
            height: 32px;
            font-size: 14px;
          }

          .step-total {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>
      <CourseContent />
    </Suspense>
  );
}
