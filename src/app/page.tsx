'use client';

import { useState, useEffect, useRef } from 'react';
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
  const { completedSteps, completeStep } = useTutorialStore();
  const [currentStep, setCurrentStep] = useState(0); // 0 = home, 1-17 = steps
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle header visibility on scroll
  useEffect(() => {
    if (currentStep === 0) return; // Don't apply to home page

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY.current);

      // Show header when scrolling up fast or at top
      if (scrollingUp && scrollSpeed > 5) {
        setHeaderVisible(true);
      } else if (!scrollingUp && currentScrollY > 60) {
        setHeaderVisible(false);
      }

      // Always show at top
      if (currentScrollY < 10) {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  const goToStep = (stepId: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(stepId);
      setIsTransitioning(false);
      setHeaderVisible(true);
      lastScrollY.current = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const nextStep = () => {
    if (currentStep < 17) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // Home page
  if (currentStep === 0) {
    return (
      <div className={`home-page ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="home-content">
          <div className="home-hero">
            <h1 className="home-title">
              Build a Neural Network
              <span className="home-title-highlight">From Scratch</span>
            </h1>
            <p className="home-subtitle">
              Learn how neural networks actually work by building one yourself.
              No libraries, no magic — just math you can understand.
            </p>
          </div>

          <div className="home-section">
            <h2>What You&apos;ll Build</h2>
            <p className="home-description">
              A neural network that predicts whether it will rain based on temperature and humidity.
              By the end, you&apos;ll understand every single line of code and the math behind it.
            </p>
          </div>

          <div className="home-features">
            <div className="home-feature">
              <div className="home-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>
              <h3>Interactive Code</h3>
              <p>Write and run real Python code in your browser. See your neural network come to life.</p>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3>Step by Step</h3>
              <p>17 focused lessons that build on each other. No jumping ahead or getting lost.</p>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>Zero Libraries</h3>
              <p>No NumPy, TensorFlow, or PyTorch. Just pure Python so you understand everything.</p>
            </div>
          </div>

{completedSteps.length > 0 && (
            <div className="home-progress-section">
              <div className="home-progress-info">
                <span>Your Progress</span>
                <span className="home-progress-count">{completedSteps.length} / {STEPS.length}</span>
              </div>
              <div className="home-progress-bar">
                <div
                  className="home-progress-fill"
                  style={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="home-cta">
            <button className="btn btn-primary btn-large" onClick={() => goToStep(completedSteps.length > 0 ? Math.min(Math.max(...completedSteps) + 1, 17) : 1)}>
              {completedSteps.length > 0 ? 'Continue Learning' : 'Start the Tutorial'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step view
  const StepComponent = stepComponents[currentStep - 1];
  const step = STEPS[currentStep - 1];
  const isCompleted = completedSteps.includes(currentStep);

  return (
    <div className={`step-page ${isTransitioning ? 'transitioning' : ''}`}>
      {/* Top navigation bar */}
      <header className={`step-header ${headerVisible ? 'visible' : 'hidden'}`}>
        <button className="home-btn" onClick={() => goToStep(0)} title="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>

        <div className="step-nav">
          <button
            className="nav-arrow"
            onClick={prevStep}
            disabled={currentStep === 1}
            title="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <div className="step-dots">
            {STEPS.map((s) => (
              <button
                key={s.id}
                className={`step-dot ${currentStep === s.id ? 'active' : ''} ${completedSteps.includes(s.id) ? 'completed' : ''}`}
                onClick={() => goToStep(s.id)}
                title={s.shortTitle}
              />
            ))}
          </div>

          <button
            className="nav-arrow"
            onClick={nextStep}
            disabled={currentStep === 17}
            title="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>

        <span className="step-counter">{currentStep} / {STEPS.length}</span>
      </header>

      {/* Main content area */}
      <main className="step-main">
        <div className="step-content-wrapper">
          <div className="step-title-section">
            <span className="step-badge">Step {currentStep}</span>
            <h1>{step.title}</h1>
            {isCompleted && (
              <span className="completed-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Completed
              </span>
            )}
          </div>

          <div className="step-content">
            <StepComponent onComplete={() => completeStep(currentStep)} />
          </div>
        </div>
      </main>
    </div>
  );
}
