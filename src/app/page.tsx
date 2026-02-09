'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useTutorialStore, STEPS } from '@/lib/store';

// Loading spinner component
function StepLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '80px 0',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid #e5e7eb',
        borderTopColor: '#2563eb',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Lazy load step components - only loads the current step, not all 18
const stepComponents = [
  dynamic(() => import('@/app/steps/Step1'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step2'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step3'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step4'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step5'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step6'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step7'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step8'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step9'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step10'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step11'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step12'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step13'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step14'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step15'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step16'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step17'), { loading: () => <StepLoader /> }),
  dynamic(() => import('@/app/steps/Step18'), { loading: () => <StepLoader /> }),
];

function CourseContent() {
  const { completeStep } = useTutorialStore();
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
