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

export default function Step12({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasMSE = /def\s+mse_loss\s*\(/.test(code);
    const hasSubtract = /prediction\s*-\s*target/.test(code) || /target\s*-\s*prediction/.test(code);
    const hasSquare = /\*\*\s*2/.test(code);
    const hasReturn = /return/.test(code);
    const hasTest = /mse_loss\s*\(/.test(code) && /print/.test(code);

    if (hasMSE && hasSquare && hasReturn && hasTest) {
      return {
        success: true,
        output: `Loss function implemented!

Testing mse_loss:
  mse_loss(0.7, 1.0) = (0.7 - 1.0)² = (-0.3)² = 0.09
  mse_loss(0.2, 0.0) = (0.2 - 0.0)² = (0.2)² = 0.04
  mse_loss(0.9, 1.0) = (0.9 - 1.0)² = (-0.1)² = 0.01
  mse_loss(1.0, 1.0) = (1.0 - 1.0)² = (0.0)² = 0.00 (perfect!)

Key insights:
1. Loss = 0 means perfect prediction
2. Larger errors → larger loss (squared makes big errors hurt more)
3. We want to MINIMIZE this value

For our XOR network:
  If output = 0.65 but target = 0:
  loss = (0.65 - 0)² = 0.4225 (pretty bad!)

  If output = 0.65 but target = 1:
  loss = (0.65 - 1)² = 0.1225 (still wrong but less)

The loss tells us exactly how wrong we are. Training will adjust
weights to make this number as small as possible.`,
      };
    }

    if (hasMSE && !hasSquare) {
      return {
        success: false,
        output: `Good start! But the loss needs to be SQUARED.

The formula is: (prediction - target) ** 2

Squaring makes all errors positive and penalizes large errors more.`,
      };
    }

    return {
      success: false,
      output: `Create a loss function:

def mse_loss(prediction, target):
    return (prediction - target) ** 2

Then test it with various prediction/target pairs.`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Measuring Error: The Loss Function">
        <p>
          To train a neural network, we need to know <strong>how wrong it is</strong>. This is
          what the loss function (also called cost function or error function) measures. It
          takes the network&apos;s prediction and the correct answer (target) and returns a single
          number representing how bad the prediction was.
        </p>
        <p>
          A good loss function has these properties:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Returns 0 when prediction equals target (perfect)</li>
          <li>Returns larger values for worse predictions</li>
          <li>Is differentiable (we need to compute gradients)</li>
        </ul>
      </ExplanationBox>

      <MathFormula label="Mean Squared Error (MSE)">
        Loss = (prediction - target)²
      </MathFormula>

      <ExplanationBox title="Why Squared Error?">
        <p>
          We could just use <code>|prediction - target|</code> (absolute difference), but we
          square it instead. Here&apos;s why:
        </p>
        <p>
          <strong>1. Makes all errors positive:</strong> Whether we overshoot (prediction &gt; target)
          or undershoot (prediction &lt; target), squaring gives a positive number. We don&apos;t want
          errors to cancel out.
        </p>
        <p>
          <strong>2. Penalizes large errors more:</strong> An error of 0.1 gives loss 0.01, but an
          error of 0.5 gives loss 0.25 (25x worse, not 5x). This pushes the network hard to fix
          big mistakes.
        </p>
        <p>
          <strong>3. Smooth derivative:</strong> The derivative of x² is 2x, which is simple and
          smooth. This makes gradient computation easy.
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing Loss">
        <CalcStep number={1}>prediction = 0.7, target = 1.0</CalcStep>
        <CalcStep number={2}>error = 0.7 - 1.0 = -0.3</CalcStep>
        <CalcStep number={3}>loss = (-0.3)² = 0.09</CalcStep>

        <p style={{ marginTop: '1rem' }}>Compare to a better prediction:</p>

        <CalcStep number={4}>prediction = 0.9, target = 1.0</CalcStep>
        <CalcStep number={5}>error = 0.9 - 1.0 = -0.1</CalcStep>
        <CalcStep number={6}>loss = (-0.1)² = 0.01</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          The second prediction (0.9) has 1/9th the loss of the first (0.7), even though
          the raw error only decreased by a factor of 3. Squaring emphasizes improvement.
        </p>
      </WorkedExample>

      <ExplanationBox title="Loss Over the Whole Dataset">
        <p>
          For XOR, we have 4 training examples. We compute loss for each one and typically
          average them:
        </p>
        <pre style={{
          background: 'var(--bg-code)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
{`total_loss = 0
for each (input, target) in training_data:
    prediction = forward(input)
    total_loss += mse_loss(prediction, target)
average_loss = total_loss / 4`}
        </pre>
        <p style={{ marginTop: '1rem' }}>
          This average loss tells us how well the network is doing overall. Training aims
          to minimize this average.
        </p>
      </ExplanationBox>

      <WorkedExample title="XOR Loss with Random Weights">
        <p>With untrained network outputting ~0.65 for everything:</p>

        <CalcStep number={1}>[0,0]: pred=0.65, target=0, loss=(0.65-0)²=0.4225</CalcStep>
        <CalcStep number={2}>[0,1]: pred=0.65, target=1, loss=(0.65-1)²=0.1225</CalcStep>
        <CalcStep number={3}>[1,0]: pred=0.65, target=1, loss=(0.65-1)²=0.1225</CalcStep>
        <CalcStep number={4}>[1,1]: pred=0.65, target=0, loss=(0.65-0)²=0.4225</CalcStep>
        <CalcStep number={5}>Total: 0.4225+0.1225+0.1225+0.4225=1.09</CalcStep>
        <CalcStep number={6}>Average: 1.09/4 = 0.2725</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          After training, we want average loss near 0. Getting from 0.27 to ~0.01 is what
          training accomplishes!
        </p>
      </WorkedExample>

      <TaskBox>
        <p>
          Implement the Mean Squared Error loss function. This will tell us how wrong
          our network&apos;s predictions are.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Create <code>mse_loss(prediction, target)</code></li>
          <li>Return <code>(prediction - target) ** 2</code></li>
          <li>Test with various prediction/target pairs</li>
          <li>Verify: perfect prediction (pred == target) gives loss 0</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`def mse_loss(prediction, target):
    return (prediction - target) ** 2

# Test cases
print("Loss tests:")
print("mse_loss(0.7, 1.0) =", mse_loss(0.7, 1.0))  # 0.09
print("mse_loss(0.2, 0.0) =", mse_loss(0.2, 0.0))  # 0.04
print("mse_loss(1.0, 1.0) =", mse_loss(1.0, 1.0))  # 0.0 (perfect!)
print("mse_loss(0.0, 0.0) =", mse_loss(0.0, 0.0))  # 0.0 (perfect!)`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`# Create the Mean Squared Error loss function
def mse_loss(prediction, target):
    # Return (prediction - target) squared
    pass

# Test your loss function
print("Testing loss function:")
print("mse_loss(0.7, 1.0) =", mse_loss(0.7, 1.0))
print("mse_loss(0.2, 0.0) =", mse_loss(0.2, 0.0))
print("mse_loss(0.9, 1.0) =", mse_loss(0.9, 1.0))
print("mse_loss(1.0, 1.0) =", mse_loss(1.0, 1.0))
print("mse_loss(0.0, 0.0) =", mse_loss(0.0, 0.0))
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement the loss function..."
        minHeight={280}
      />

      <ExplanationBox title="The Training Objective">
        <p>
          We now have:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>✓ Forward pass - compute predictions from inputs</li>
          <li>✓ Loss function - measure how wrong predictions are</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          What we need next:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>A way to know which direction to change weights (derivatives)</li>
          <li>A way to propagate error backward through layers (chain rule)</li>
          <li>A method to actually update the weights (gradient descent)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The next step introduces derivatives - the mathematical tool that tells us how
          changing a weight affects the loss.
        </p>
      </ExplanationBox>
    </div>
  );
}
