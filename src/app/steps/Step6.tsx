'use client';

import CodeEditor from '@/components/CodeEditor';
import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import TaskBox from '@/components/TaskBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import Hint from '@/components/Hint';

interface StepProps {
  onComplete: () => void;
}

export default function Step6({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasLinear = /def\s+linear_neuron/.test(code);
    const hasTest = /linear_neuron\s*\(/.test(code);
    const hasPrint = /print/.test(code);

    if (hasLinear && hasTest && hasPrint) {
      return {
        success: true,
        output: `Linear neuron demonstration complete!

You've proven that stacking linear neurons is equivalent to a single linear neuron.

Two-layer network:
  Hidden: h = 0.7×(-0.3) + 0.8×0.9 = -0.21 + 0.72 = 0.51
  Output: out = h × 0.5 = 0.51 × 0.5 = 0.255

But we can collapse this to one operation:
  Effective weight for temp = -0.3 × 0.5 = -0.15
  Effective weight for humid = 0.9 × 0.5 = 0.45
  Direct: out = 0.7×(-0.15) + 0.8×0.45 = -0.105 + 0.36 = 0.255

Same answer! This proves the devastating fact:
No matter how many linear layers you stack, you can always
collapse them into a single linear layer.

THIS IS WHY WE NEED NON-LINEARITY!

For rain prediction, a linear model could only learn simple patterns like
"more humidity = more rain." But real weather is complex! Rain depends on
combinations of factors in non-linear ways. That's why we need activation functions.`,
      };
    }

    if (hasLinear && !hasTest) {
      return {
        success: false,
        output: `Good! You created the linear_neuron function.

Now test it by calling linear_neuron with your inputs, weights, and bias.
Print the result to see the output.`,
      };
    }

    return {
      success: false,
      output: `Create a function linear_neuron(inputs, weights, bias) that:
1. Computes the dot product of inputs and weights
2. Adds the bias
3. Returns the result (NO activation function - just linear!)

def linear_neuron(inputs, weights, bias):
    ...`,
    };
  };

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

      <ExplanationBox title="What Linear Networks Cannot Learn">
        <p>
          Linear functions can only learn linear relationships — straight lines (in 2D),
          flat planes (in 3D), or hyperplanes (in higher dimensions). They cannot learn:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Complex weather patterns</strong> — like &quot;rain when humid AND cool&quot;</li>
          <li><strong>Curves</strong> — any relationship that isn&apos;t a straight line</li>
          <li><strong>XOR-like patterns</strong> — where the combination of inputs matters</li>
          <li><strong>Edges in images</strong> — detecting features requires non-linearity</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Real weather is full of non-linear relationships. A hot, humid day might have
          thunderstorms, but a hot, dry day stays clear. A linear model can&apos;t capture this!
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
        <p style={{ marginTop: '1rem' }}>
          In the next step, we&apos;ll implement the sigmoid activation function and see exactly
          how it adds the non-linearity we need for accurate rain prediction.
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Let&apos;s verify that linear layers collapse by building a linear neuron (no activation)
          and showing that stacking them is equivalent to a single computation.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Create <code>linear_neuron(inputs, weights, bias)</code> that returns dot_product + bias</li>
          <li>Compute a two-layer result: hidden = linear_neuron(...), then output = hidden * weight2</li>
          <li>Compute the collapsed single-layer equivalent</li>
          <li>Verify both give the same answer!</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

def linear_neuron(inputs, weights, bias):
    return dot_product(inputs, weights) + bias

# Two-layer calculation
inputs = [0.7, 0.8]
w1 = [-0.3, 0.9]
b1 = 0  # using 0 bias to simplify
w2 = 0.5

hidden = linear_neuron(inputs, w1, b1)  # = 0.51
output = hidden * w2  # = 0.255

# Collapsed to one layer
effective_w = [w1[0]*w2, w1[1]*w2]  # [-0.15, 0.45]
direct = dot_product(inputs, effective_w)  # = 0.255

print("Two layers:", output)
print("Collapsed:", direct)
print("Same?", abs(output - direct) < 0.0001)`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

# Create a linear neuron (no activation function!)
def linear_neuron(inputs, weights, bias):
    # Just return weighted sum + bias, nothing else
    pass

# Test: show that two linear layers collapse to one
inputs = [0.7, 0.8]
w1 = [-0.3, 0.9]
b1 = 0
w2 = 0.5

# Calculate through two layers


# Calculate the collapsed single-layer equivalent


# Print both to show they're equal

`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Prove that linear layers collapse..."
        minHeight={350}
      />

      <ExplanationBox title="The Key Insight">
        <p>
          This is arguably the most important insight in understanding neural networks:
        </p>
        <p style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Depth without non-linearity is meaningless.
          Non-linearity is what makes deep learning deep.
        </p>
        <p style={{ marginTop: '1rem' }}>
          In the next step, we&apos;ll implement the sigmoid function — the classic activation
          function that adds the non-linearity we need. You&apos;ll see exactly how it transforms
          our weather signal into a rain probability between 0 and 1.
        </p>
      </ExplanationBox>
    </div>
  );
}
