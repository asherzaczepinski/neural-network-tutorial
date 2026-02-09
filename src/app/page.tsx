'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { STEPS } from '@/lib/store';

// Preload adjacent steps for instant navigation
const preloadStep = (stepNum: number) => {
  if (stepNum >= 1 && stepNum <= 17) {
    import(`@/app/steps/Step${stepNum}`);
  }
};

// Loading skeleton - matches content layout to prevent layout shift
const StepLoader = memo(function StepLoader() {
  return (
    <div className="step-loader">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />
      <div className="skeleton skeleton-text" />
    </div>
  );
});

// Create dynamic imports with loading state
const createStepComponent = (stepNum: number) =>
  dynamic(() => import(`@/app/steps/Step${stepNum}`), {
    loading: () => <StepLoader />,
    ssr: false, // Disable SSR for faster client-side loading
  });

// Pre-create all step components (they're still lazy-loaded)
const stepComponents = Array.from({ length: 17 }, (_, i) => createStepComponent(i + 1));

// Memoized navigation button
const NavButton = memo(function NavButton({
  direction,
  onClick,
  disabled
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="nav-arrow"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous step' : 'Next step'}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
});

// Memoized footer button
const FooterButton = memo(function FooterButton({
  direction,
  onClick
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  return (
    <button
      className={`footer-btn ${direction}`}
      onClick={onClick}
    >
      {direction === 'prev' ? '← Previous' : 'Next →'}
    </button>
  );
});

function CourseContent() {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTicking = useRef(false);

  // Parse step from URL
  const getInitialStep = () => {
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 1 && parsed <= 17) return parsed;
    }
    return 1;
  };

  const [currentStep, setCurrentStep] = useState(getInitialStep);

  // Update when URL changes
  useEffect(() => {
    const newStep = getInitialStep();
    if (newStep !== currentStep) {
      setCurrentStep(newStep);
    }
  }, [stepParam]);

  // Preload adjacent steps when current step changes
  useEffect(() => {
    preloadStep(currentStep + 1);
    preloadStep(currentStep - 1);
  }, [currentStep]);

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTicking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingUp = currentScrollY < lastScrollY.current;

          if (scrollingUp || currentScrollY < 100) {
            setHeaderVisible(true);
          } else if (currentScrollY > 100) {
            setHeaderVisible(false);
          }

          lastScrollY.current = currentScrollY;
          scrollTicking.current = false;
        });
        scrollTicking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToStep = useCallback((stepId: number) => {
    setCurrentStep(stepId);
    setHeaderVisible(true);
    window.scrollTo({ top: 0, behavior: 'instant' }); // instant is faster than smooth
    window.history.pushState({}, '', `/?step=${stepId}`);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 17) goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (val >= 1 && val <= 17) goToStep(val);
  }, [goToStep]);

  const StepComponent = stepComponents[currentStep - 1];
  const step = STEPS[currentStep - 1];

  return (
    <div className="course-page">
      {/* Top navigation */}
      <header className={`course-header ${headerVisible ? 'visible' : 'hidden'}`}>
        <nav className="course-nav">
          <NavButton direction="prev" onClick={prevStep} disabled={currentStep === 1} />

          <div className="step-pagination">
            <input
              type="number"
              className="step-input"
              value={currentStep}
              onChange={handleInputChange}
              min={1}
              max={17}
            />
            <span className="step-total">of 17</span>
          </div>

          <NavButton direction="next" onClick={nextStep} disabled={currentStep === 17} />
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
            <StepComponent />
          </div>

          {/* Bottom navigation */}
          <div className="step-footer">
            {currentStep > 1 && <FooterButton direction="prev" onClick={prevStep} />}
            <div className="footer-spacer" />
            {currentStep < 17 && <FooterButton direction="next" onClick={nextStep} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show skeleton on initial load to prevent flash
  if (!mounted) {
    return (
      <div className="course-page">
        <header className="course-header visible">
          <nav className="course-nav">
            <div className="nav-arrow" style={{ opacity: 0.3 }}>←</div>
            <div className="step-pagination">
              <div className="step-input" style={{ background: '#f3f4f6' }} />
              <span className="step-total">of 17</span>
            </div>
            <div className="nav-arrow" style={{ opacity: 0.3 }}>→</div>
          </nav>
        </header>
        <main className="course-main">
          <div className="course-content">
            <div className="step-header-section">
              <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '10px' }} />
              <div className="skeleton" style={{ width: '60%', height: '32px' }} />
            </div>
            <StepLoader />
          </div>
        </main>
      </div>
    );
  }

  return <CourseContent />;
}
