'use client';

import ExplanationBox from '@/components/ExplanationBox';

export default function Step1() {
  return (
    <div>
      <ExplanationBox title="Hey, I'm Asher Zaczepinski">
        <p>
          I&apos;m a 10th grader who got frustrated. I wanted to understand how neural networks
          <em> actually</em> work—not just use them and hope for the best.
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
          This is the tutorial I wish existed. We break down neural networks from the ground up—no
          hand-waving, no &quot;just trust me.&quot; Every concept is explained with real math you can
          actually follow.
        </p>
        <p>
          By the end, you&apos;ll understand every equation that makes a neural network work.
          You&apos;ll know what backpropagation <em>really</em> does, not just that it
          &quot;propagates errors backward.&quot;
        </p>
      </ExplanationBox>

      <ExplanationBox title="What You Need to Know">
        <p>
          <strong>Algebra</strong> — Seriously, that&apos;s it. We&apos;ll explain derivatives
          from scratch when we need them. No calculus prerequisite.
        </p>
        <p>
          If you remember what y = mx + b means, you&apos;re ready.
        </p>
      </ExplanationBox>

      <ExplanationBox title="What We'll Cover">
        <p>
          This course has two parts:
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Part 1: The Neuron</strong> — We start with the smallest building block. You&apos;ll
          understand exactly what a single neuron does—how it takes inputs, applies weights, adds a
          bias, and squishes the result through an activation function. Once you truly get the neuron,
          everything else builds on top.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Part 2: The Network</strong> — Then we zoom out. You&apos;ll see how neurons connect
          into layers, how data flows forward through the whole network, how we measure mistakes, and
          how the network learns to fix them through backpropagation and gradient descent.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Each concept gets <em>proven</em>. Not &quot;trust me, this works&quot;—we derive it,
          visualize it, and build intuition for <em>why</em> it has to be that way.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Project: Predicting Rain">
        <p>
          Throughout this course, we use one example: a neural network that predicts whether
          it will rain based on temperature and humidity.
        </p>
        <p>
          It&apos;s simple enough to understand completely, but complex enough to teach you
          everything that matters. By module 18, you&apos;ll understand how a network learns
          from data—and exactly how every piece works.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Let's Go">
        <p>
          No account required. No email signup. No upsells. Just scroll down and let&apos;s
          learn something real.
        </p>
      </ExplanationBox>
    </div>
  );
}
