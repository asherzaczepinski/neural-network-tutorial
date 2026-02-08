'use client';

import ExplanationBox from '@/components/ExplanationBox';

interface StepProps {
  onComplete: () => void;
}

export default function Step1({ onComplete }: StepProps) {
  // Auto-complete this step when component mounts
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Hey, I'm Asher Zaczepinski">
        <p>
          I&apos;m a 10th grader who got frustrated. I wanted to understand how neural networks
          <em> actually</em> work—not just import TensorFlow and hope for the best.
        </p>
        <p>
          I tried everything. YouTube tutorials. The fancy 3Blue1Brown series (which is beautiful,
          but still didn&apos;t make it click for me). Stanford lectures. Blog posts. Nothing worked.
          Every explanation either hand-waved the hard parts or drowned me in notation without
          building intuition first.
        </p>
        <p>
          So I built this.
        </p>
      </ExplanationBox>

      <ExplanationBox title="What This Course Actually Is">
        <p>
          This is the tutorial I wish existed. We build a neural network from scratch—no PyTorch,
          no TensorFlow, no libraries doing magic behind the scenes. Just Python and math you can
          actually follow.
        </p>
        <p>
          By the end, you&apos;ll have written every line of code yourself and understood every
          equation. You&apos;ll know what backpropagation <em>really</em> does, not just that
          it &quot;propagates errors backward.&quot;
        </p>
      </ExplanationBox>

      <ExplanationBox title="What You Need to Know">
        <p>
          <strong>Basic Python</strong> — Variables, functions, loops. If you&apos;ve written a
          few scripts, you&apos;re good.
        </p>
        <p>
          <strong>Algebra</strong> — Seriously, that&apos;s it. We&apos;ll explain derivatives
          from scratch when we need them. No calculus prerequisite.
        </p>
        <p>
          That&apos;s the whole list. If you can write a for loop and you remember what
          y = mx + b means, you&apos;re ready.
        </p>
      </ExplanationBox>

      <ExplanationBox title="What We'll Cover">
        <p>
          We go deep on everything. Not surface-level overviews—actual understanding:
        </p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><strong>Matrix multiplication</strong> — Why neural networks use it and how it works</li>
          <li><strong>Forward propagation</strong> — How data flows through a network to make predictions</li>
          <li><strong>Loss functions</strong> — How we measure &quot;how wrong&quot; a prediction is</li>
          <li><strong>Derivatives &amp; gradients</strong> — The calculus that tells us which way to adjust</li>
          <li><strong>The chain rule</strong> — How gradients flow backward through layers</li>
          <li><strong>Backpropagation</strong> — The algorithm that makes deep learning possible</li>
          <li><strong>Gradient descent</strong> — How networks actually learn from their mistakes</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Each concept gets <em>proven</em>. Not &quot;trust me, this works&quot;—we derive it,
          visualize it, and build intuition for <em>why</em> it has to be that way.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Project: Predicting Rain">
        <p>
          Throughout this course, we build one thing: a neural network that predicts whether
          it will rain based on temperature and humidity.
        </p>
        <p>
          It&apos;s simple enough to understand completely, but complex enough to teach you
          everything that matters. By module 18, you&apos;ll have a working network that learns
          from data—and you&apos;ll understand exactly how every piece works.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Let's Go">
        <p>
          No account required. No email signup. No upsells. Just click Next and let&apos;s
          build something real.
        </p>
      </ExplanationBox>
    </div>
  );
}
