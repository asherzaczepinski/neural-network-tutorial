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

export default function Step13({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasSigDeriv = /def\s+sigmoid_derivative\s*\(/.test(code);
    const hasMSEDeriv = /def\s+mse_derivative\s*\(/.test(code);
    const hasFormula = /\*\s*\(\s*1\s*-/.test(code) && /2\s*\*/.test(code);
    const hasTest = /sigmoid_derivative\s*\(/.test(code) && /print/.test(code);

    if (hasSigDeriv && hasMSEDeriv && hasFormula && hasTest) {
      return {
        success: true,
        output: `Derivative functions implemented!

Sigmoid derivative:
  At z=0: sigmoid=0.5, derivative = 0.5 × (1-0.5) = 0.25 (steepest!)
  At z=2: sigmoid=0.88, derivative = 0.88 × (1-0.88) = 0.105
  At z=-2: sigmoid=0.12, derivative = 0.12 × (1-0.12) = 0.105
  At z=5: sigmoid=0.99, derivative = 0.99 × (1-0.99) = 0.007 (nearly flat)

MSE derivative:
  pred=0.7, target=1.0: derivative = 2×(0.7-1.0) = -0.6
  pred=0.3, target=0.0: derivative = 2×(0.3-0.0) = 0.6

The negative derivative (-0.6) tells us: prediction is TOO LOW
The positive derivative (0.6) tells us: prediction is TOO HIGH

These derivatives are the "compass" for training - they point the direction
we need to move each weight to reduce the error!

Key insight: The sigmoid derivative is largest at z=0 (where the S-curve
is steepest) and smallest at extremes (where sigmoid "saturates").`,
      };
    }

    if (hasSigDeriv && !hasMSEDeriv) {
      return {
        success: false,
        output: `Good! You have sigmoid_derivative.

Now create mse_derivative(prediction, target):
  return 2 * (prediction - target)

This comes from the power rule: d/dx[x²] = 2x`,
      };
    }

    return {
      success: false,
      output: `Create two derivative functions:

1. sigmoid_derivative(z) = sigmoid(z) * (1 - sigmoid(z))

2. mse_derivative(prediction, target) = 2 * (prediction - target)

These are the gradients we'll use for backpropagation.`,
    };
  };

  return (
    <div>
      <ExplanationBox title="What Is a Derivative?">
        <p>
          A derivative tells you <strong>how fast something is changing</strong>. If y = f(x),
          then the derivative dy/dx tells you: &quot;if I increase x by a tiny amount, how much does y change?&quot;
        </p>
        <p>
          For neural networks, we care about: &quot;if I change this weight by a tiny amount, how much
          does the loss change?&quot; If we know that, we can adjust weights to reduce loss!
        </p>
        <p>
          A positive derivative means increasing the input increases the output.
          A negative derivative means increasing the input decreases the output.
          The magnitude tells us how sensitive the output is to the input.
        </p>
      </ExplanationBox>

      <MathFormula label="The Core Question">
        ∂Loss/∂weight = &quot;How much does loss change when we tweak this weight?&quot;
      </MathFormula>

      <ExplanationBox title="Derivatives We Need">
        <p>
          For our network, we need derivatives of two functions:
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>1. Sigmoid derivative:</strong> How does sigmoid&apos;s output change with its input?
        </p>
        <div className="math-formula" style={{ margin: '1rem 0' }}>
          d/dz[sigmoid(z)] = sigmoid(z) × (1 - sigmoid(z))
        </div>
        <p>
          This beautiful formula means we can compute the derivative using just the output!
          If s = sigmoid(z), then the derivative is s × (1 - s).
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>2. MSE derivative:</strong> How does loss change with prediction?
        </p>
        <div className="math-formula" style={{ margin: '1rem 0' }}>
          d/dp[(p - t)²] = 2 × (p - t)
        </div>
        <p>
          This comes from the power rule: the derivative of x² is 2x.
        </p>
      </ExplanationBox>

      <WorkedExample title="Why These Derivatives Matter">
        <p>Let&apos;s trace through an example. Say our prediction is 0.7 but target is 1.0:</p>

        <CalcStep number={1}>MSE derivative = 2 × (0.7 - 1.0) = 2 × (-0.3) = -0.6</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          The negative sign tells us: <em>prediction is too low</em>. To reduce loss,
          we need to increase the prediction. If we had pred=1.3 and target=1.0:
        </p>

        <CalcStep number={2}>MSE derivative = 2 × (1.3 - 1.0) = 2 × (0.3) = 0.6</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Positive sign means: <em>prediction is too high</em>. We need to decrease it.
          The derivative is our compass pointing toward improvement!
        </p>
      </WorkedExample>

      <ExplanationBox title="The Sigmoid Derivative Shape">
        <p>
          The sigmoid derivative has an interesting shape - it&apos;s largest in the middle
          and smallest at the extremes:
        </p>
        <div style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          marginTop: '1rem'
        }}>
          <pre style={{ background: 'transparent', padding: 0 }}>
{`Derivative
0.25|     *****
    |    *     *
0.1 |   *       *
    |  *         *
0.0 |**           **
    +------|------|------> z
         -2     0     2`}
          </pre>
        </div>
        <p style={{ marginTop: '1rem' }}>
          At z=0, the derivative is 0.25 (maximum). At z=±5, it&apos;s nearly 0.
          This means sigmoid &quot;saturates&quot; at extremes - small changes in z cause
          almost no change in output. This can slow down learning (the &quot;vanishing gradient&quot; problem).
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing Sigmoid Derivative">
        <p>At z = 0.78 (our earlier example):</p>

        <CalcStep number={1}>sigmoid(0.78) = 0.686</CalcStep>
        <CalcStep number={2}>derivative = 0.686 × (1 - 0.686)</CalcStep>
        <CalcStep number={3}>derivative = 0.686 × 0.314 = 0.215</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          This tells us: at z=0.78, a small increase in z causes the sigmoid output
          to increase by about 0.215 times that amount.
        </p>
      </WorkedExample>

      <TaskBox>
        <p>
          Implement the derivative functions for sigmoid and MSE. These are the building
          blocks for backpropagation.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Create <code>sigmoid_derivative(z)</code> that returns <code>sigmoid(z) * (1 - sigmoid(z))</code></li>
          <li>Create <code>mse_derivative(prediction, target)</code> that returns <code>2 * (prediction - target)</code></li>
          <li>Test both with various inputs to understand their behavior</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)

def mse_derivative(prediction, target):
    return 2 * (prediction - target)

# Test sigmoid derivative
print("Sigmoid derivatives:")
print("At z=0:", sigmoid_derivative(0))    # 0.25 (maximum)
print("At z=2:", sigmoid_derivative(2))    # ~0.1
print("At z=-2:", sigmoid_derivative(-2))  # ~0.1

# Test MSE derivative
print("\\nMSE derivatives:")
print("pred=0.7, target=1.0:", mse_derivative(0.7, 1.0))  # -0.6
print("pred=0.3, target=0.0:", mse_derivative(0.3, 0.0))  # 0.6`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

# Create sigmoid derivative
# Formula: sigmoid(z) * (1 - sigmoid(z))
def sigmoid_derivative(z):
    pass

# Create MSE derivative
# Formula: 2 * (prediction - target)
def mse_derivative(prediction, target):
    pass

# Test sigmoid derivative at various points
print("Sigmoid derivative tests:")
print("At z=0:", sigmoid_derivative(0))
print("At z=0.78:", sigmoid_derivative(0.78))
print("At z=2:", sigmoid_derivative(2))
print("At z=-2:", sigmoid_derivative(-2))
print("At z=5:", sigmoid_derivative(5))

# Test MSE derivative
print("\\nMSE derivative tests:")
print("pred=0.7, target=1.0:", mse_derivative(0.7, 1.0))
print("pred=0.3, target=0.0:", mse_derivative(0.3, 0.0))
print("pred=1.0, target=1.0:", mse_derivative(1.0, 1.0))
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement the derivative functions..."
        minHeight={380}
      />

      <ExplanationBox title="The Power of Derivatives">
        <p>
          You now have the mathematical tools to answer: &quot;which direction should I adjust
          this value to reduce error?&quot; But there&apos;s a problem: our network has many layers,
          and we need to know how the <em>final</em> loss depends on weights in <em>earlier</em>
          layers.
        </p>
        <p>
          This is where the <strong>chain rule</strong> comes in. It tells us how to
          combine derivatives when functions are composed (like layers in a network).
          That&apos;s the next step!
        </p>
      </ExplanationBox>
    </div>
  );
}
