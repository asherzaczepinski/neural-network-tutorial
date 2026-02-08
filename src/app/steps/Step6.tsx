'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step6({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="The Problem with Linear Networks">
        <p>
          Here&apos;s one of the most important insights in deep learning: <strong>without non-linearity,
          depth is useless</strong>. You could stack 100 linear layers and get exactly the same
          expressive power as 1 layer. Let&apos;s prove this mathematically.
        </p>
        <p>
          A &quot;linear&quot; neuron is one without an activation function — it just computes the
          weighted sum plus bias and outputs that directly. Everything we&apos;ve built so far
          (dot products, bias addition) is linear. If we chain linear operations, we get...
          another linear operation.
        </p>
      </ExplanationBox>

      <MathFormula label="Linear Composition Collapses">
        y = W₂ × (W₁ × x) = (W₂ × W₁) × x = W_combined × x
      </MathFormula>

      <ExplanationBox title="The Mathematical Proof">
        <p>
          Consider two linear layers in sequence:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li>Layer 1: h = W₁ · x (where x is input, W₁ is first weights, h is hidden output)</li>
          <li>Layer 2: y = W₂ · h (where h is input to layer 2, W₂ is second weights)</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          Substituting: y = W₂ · (W₁ · x) = (W₂ · W₁) · x
        </p>
        <p>
          The product W₂ · W₁ is just another set of weights! We could precompute it once and use
          that single combined layer. Two layers collapse into one. This extends to any
          number of layers — they all collapse into a single linear transformation.
        </p>
      </ExplanationBox>

      <WorkedExample title="Proving It With Weather Data">
        <p>Let&apos;s trace through a two-layer linear network for rain prediction:</p>

        <p style={{ marginTop: '1rem' }}><strong>Setup:</strong></p>
        <CalcStep number={1}>Input: [temperature=0.7, humidity=0.8]</CalcStep>
        <CalcStep number={2}>Layer 1 weights: [-0.3, 0.9]</CalcStep>
        <CalcStep number={3}>Layer 2 weight: 0.5</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Two-layer computation:</strong></p>
        <CalcStep number={4}>Hidden: h = 0.7×(-0.3) + 0.8×0.9 = -0.21 + 0.72 = 0.51</CalcStep>
        <CalcStep number={5}>Output: y = 0.51 × 0.5 = 0.255</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Collapsing to one layer:</strong></p>
        <CalcStep number={6}>Effective w_temp = -0.3 × 0.5 = -0.15</CalcStep>
        <CalcStep number={7}>Effective w_humid = 0.9 × 0.5 = 0.45</CalcStep>
        <CalcStep number={8}>Direct: y = 0.7×(-0.15) + 0.8×0.45 = -0.105 + 0.36 = 0.255</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          <strong>Same answer!</strong> The two-layer network computed the exact same thing as a
          single-layer network with combined weights. The extra layer added no capability.
        </p>
      </WorkedExample>

      <ExplanationBox title="Why This Matters for Weather Prediction">
        <p>
          Think about real weather patterns. When does it rain? It&apos;s not a simple formula like
          &quot;more humidity = more rain.&quot; Real weather is complex:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>A <strong>warm, humid</strong> day might have thunderstorms</li>
          <li>A <strong>warm, dry</strong> day stays clear</li>
          <li>A <strong>cool, humid</strong> day might have light drizzle</li>
          <li>A <strong>cool, dry</strong> day is probably clear</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Notice the pattern? Whether it rains depends on the <em>combination</em> of temperature
          AND humidity, not just adding them together. A linear model can only draw straight lines —
          it can&apos;t learn &quot;rain when BOTH conditions are right.&quot;
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Imagine plotting temperature on one axis and humidity on another. The &quot;will it rain?&quot;
          boundary isn&apos;t a straight line — it&apos;s curved. Linear models can only draw straight
          boundaries, so they&apos;ll always make mistakes on real weather data.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Solution: Activation Functions">
        <p>
          The fix is elegant: after each linear transformation, we apply a <strong>non-linear
          function</strong> (called an activation function). This breaks the chain of linearity,
          preventing layers from collapsing into one.
        </p>
        <p>
          With activation functions, each layer can learn something that couldn&apos;t be represented
          by previous layers combined. More layers = more expressive power = ability to learn
          more complex weather patterns. <em>This is why deep learning works.</em>
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Key Insight">
        <p>
          This is arguably the most important insight in understanding neural networks:
        </p>
        <p style={{
          background: '#f9fafb',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          fontWeight: '600',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          Depth without non-linearity is meaningless.
          Non-linearity is what makes deep learning deep.
        </p>
      </ExplanationBox>
    </div>
  );
}
