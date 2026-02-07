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

export default function Step14({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasChain = /dL_dz\s*=/.test(code) || /dl_dz\s*=/.test(code) || /dLoss/.test(code);
    const hasMultiply = /\*/.test(code);
    const hasPrint = /print/.test(code);
    const hasOutput = /output_error|error_output|dL_da/.test(code.toLowerCase()) ||
                      /sigmoid_derivative/.test(code);

    if (hasChain && hasMultiply && hasPrint && hasOutput) {
      return {
        success: true,
        output: `Chain rule applied!

Given:
  prediction = 0.7, target = 1.0
  z (pre-activation) = 0.847 (since sigmoid(0.847) ≈ 0.7)

Step 1: Loss derivative w.r.t. prediction
  dL/da = 2 × (0.7 - 1.0) = -0.6

Step 2: Sigmoid derivative at z
  da/dz = sigmoid(0.847) × (1 - sigmoid(0.847))
  da/dz = 0.7 × 0.3 = 0.21

Step 3: Chain rule - multiply them!
  dL/dz = dL/da × da/dz
  dL/dz = -0.6 × 0.21 = -0.126

Interpretation:
  - The loss changes by -0.126 for each unit increase in z
  - Negative means: INCREASING z would DECREASE loss
  - So we should increase z to improve the prediction!

This is the essence of backpropagation: chain derivatives backward
through the network to find how each parameter affects the final loss.`,
      };
    }

    if (hasChain && !hasOutput) {
      return {
        success: false,
        output: `Good start! Remember the chain rule multiplies derivatives:

dL/dz = dL/da × da/dz

where:
- dL/da is the MSE derivative
- da/dz is the sigmoid derivative`,
      };
    }

    return {
      success: false,
      output: `Apply the chain rule:

1. Compute dL/da = mse_derivative(prediction, target)
2. Compute da/dz = sigmoid_derivative(z)
3. Multiply: dL/dz = dL/da * da/dz

This tells us how the loss changes with respect to the pre-activation z.`,
    };
  };

  return (
    <div>
      <ExplanationBox title="The Chain Rule: Connecting Derivatives">
        <p>
          In our network, the loss depends on the output, which depends on z, which depends
          on weights. These are nested functions:
        </p>
        <pre style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          Loss(sigmoid(weighted_sum(inputs, weights) + bias))
        </pre>
        <p style={{ marginTop: '1rem' }}>
          The <strong>chain rule</strong> tells us how to find the derivative of such
          composed functions: multiply the derivatives of each step together.
        </p>
      </ExplanationBox>

      <MathFormula label="The Chain Rule">
        dL/dz = dL/da × da/dz
      </MathFormula>

      <ExplanationBox title="Understanding the Notation">
        <p>
          The notation <code>dL/dz</code> means &quot;derivative of L with respect to z&quot; or
          &quot;how much does L change when z changes.&quot;
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>L</strong> = Loss (what we want to minimize)</li>
          <li><strong>a</strong> = activation output (after sigmoid)</li>
          <li><strong>z</strong> = pre-activation (weighted sum + bias)</li>
          <li><strong>dL/da</strong> = how loss changes with activation (MSE derivative)</li>
          <li><strong>da/dz</strong> = how activation changes with z (sigmoid derivative)</li>
        </ul>
      </ExplanationBox>

      <WorkedExample title="Chain Rule in Action">
        <p>Let&apos;s compute dL/dz for prediction = 0.7, target = 1.0, z = 0.847:</p>

        <p style={{ marginTop: '1rem' }}><strong>Step 1: Loss derivative w.r.t. activation</strong></p>
        <CalcStep number={1}>dL/da = 2 × (prediction - target)</CalcStep>
        <CalcStep number={2}>dL/da = 2 × (0.7 - 1.0) = -0.6</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Step 2: Sigmoid derivative</strong></p>
        <CalcStep number={3}>da/dz = sigmoid(z) × (1 - sigmoid(z))</CalcStep>
        <CalcStep number={4}>da/dz = 0.7 × (1 - 0.7) = 0.7 × 0.3 = 0.21</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Step 3: Chain rule</strong></p>
        <CalcStep number={5}>dL/dz = dL/da × da/dz</CalcStep>
        <CalcStep number={6}>dL/dz = -0.6 × 0.21 = -0.126</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          <strong>Result: dL/dz = -0.126</strong>
        </p>
        <p>
          The negative value tells us: if we increase z, the loss decreases!
          Since we want to minimize loss, we should increase z.
        </p>
      </WorkedExample>

      <ExplanationBox title="Why Multiply?">
        <p>
          The chain rule multiplication makes intuitive sense. Imagine a chain of cause and effect:
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          If z increases by 1 → a increases by 0.21 (da/dz = 0.21)
        </p>
        <p>
          If a increases by 1 → L decreases by 0.6 (dL/da = -0.6)
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          So if z increases by 1 → a increases by 0.21 → L changes by 0.21 × (-0.6) = -0.126
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          The effects multiply through the chain!
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Delta (δ) Notation">
        <p>
          In backpropagation, we often call dL/dz the &quot;delta&quot; (δ) for a neuron.
          It represents the &quot;error signal&quot; that flows backward:
        </p>
        <div className="math-formula" style={{ margin: '1rem 0' }}>
          δ = (output error) × (local gradient)
        </div>
        <p>
          This delta gets propagated back to compute gradients for weights in earlier layers.
          That&apos;s why it&apos;s called <strong>backpropagation</strong> - the error flows backward!
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Apply the chain rule to compute dL/dz. This is the core computation that makes
          backpropagation work.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Set prediction = 0.7, target = 1.0</li>
          <li>Compute z such that sigmoid(z) = 0.7 (approximately 0.847)</li>
          <li>Compute dL/da using mse_derivative</li>
          <li>Compute da/dz using sigmoid_derivative</li>
          <li>Multiply them to get dL/dz (the delta)</li>
          <li>Verify: negative delta means we should increase z</li>
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

# Our values
prediction = 0.7
target = 1.0
z = 0.847  # sigmoid(0.847) ≈ 0.7

# Step 1: Loss derivative w.r.t. activation
dL_da = mse_derivative(prediction, target)
print("dL/da =", dL_da)

# Step 2: Sigmoid derivative
da_dz = sigmoid_derivative(z)
print("da/dz =", da_dz)

# Step 3: Chain rule!
dL_dz = dL_da * da_dz
print("dL/dz =", dL_dz)

print("\\nInterpretation:", "increase z" if dL_dz < 0 else "decrease z")`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)

def mse_derivative(prediction, target):
    return 2 * (prediction - target)

# Setup
prediction = 0.7
target = 1.0
z = 0.847  # chosen so sigmoid(z) ≈ 0.7

print("Given:")
print("  prediction =", prediction)
print("  target =", target)
print("  z =", z)
print("  sigmoid(z) =", sigmoid(z))

# Step 1: Compute dL/da (loss derivative w.r.t. activation)
dL_da = # YOUR CODE

# Step 2: Compute da/dz (sigmoid derivative)
da_dz = # YOUR CODE

# Step 3: Apply chain rule to get dL/dz
dL_dz = # YOUR CODE

print("\\nChain rule computation:")
print("  dL/da =", dL_da)
print("  da/dz =", da_dz)
print("  dL/dz = dL/da × da/dz =", dL_dz)
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Apply the chain rule..."
        minHeight={420}
      />

      <ExplanationBox title="From Delta to Weight Gradients">
        <p>
          Now we know how the loss changes with z. But we want to know how the loss
          changes with <em>weights</em> - those are what we can actually adjust!
        </p>
        <p>
          Since z = Σ(input × weight) + bias, one more chain rule step gives us:
        </p>
        <div className="math-formula" style={{ margin: '1rem 0' }}>
          dL/dw = dL/dz × dz/dw = δ × input
        </div>
        <p>
          The weight gradient is simply the delta multiplied by the input that weight connects to!
          In the next step, we&apos;ll put this all together into the full backpropagation algorithm.
        </p>
      </ExplanationBox>
    </div>
  );
}
