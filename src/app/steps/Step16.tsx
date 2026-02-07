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

export default function Step16({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasLearningRate = /learning_rate|lr\s*=/.test(code);
    const hasUpdate = /w\s*-\s*=|w\s*=\s*w\s*-/.test(code) || /\-=\s*lr|\-=\s*learning_rate/.test(code);
    const hasLoop = /for\s+/.test(code);
    const hasPrint = /print/.test(code);
    const hasImprove = /loss|error/i.test(code);

    if (hasLearningRate && hasUpdate && hasLoop && hasPrint && hasImprove) {
      return {
        success: true,
        output: `Gradient descent working!

Training for 5 iterations with learning_rate = 0.5:

Iteration 0:
  Before: weight = 0.80, output = 0.622
  Gradient = -0.088
  Update: 0.80 - (0.5 × -0.088) = 0.80 + 0.044 = 0.844
  After: weight = 0.844, output = 0.635

Iteration 1:
  Gradient = -0.081
  New weight = 0.885, output = 0.646

Iteration 2:
  Gradient = -0.074
  New weight = 0.922, output = 0.656

... (continues improving)

After 5 iterations:
  Weight: 0.80 → ~1.05
  Output: 0.622 → ~0.72
  Loss: 0.143 → ~0.08

The output is moving toward the target (1.0)!
This is learning - the network adjusts its weights to reduce error.

Key insight: The learning rate (0.5) controls step size.
Too small = slow learning. Too large = overshooting.`,
      };
    }

    if (hasLearningRate && !hasUpdate) {
      return {
        success: false,
        output: `Good! You have a learning rate.

Now update the weight:
weight = weight - learning_rate * gradient

The minus sign is crucial - we go OPPOSITE to the gradient direction!`,
      };
    }

    return {
      success: false,
      output: `Implement gradient descent:

1. Set learning_rate = 0.5
2. In a loop:
   - Compute gradient
   - Update: weight = weight - learning_rate * gradient
   - Print to see improvement`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Gradient Descent: The Learning Algorithm">
        <p>
          We now know the gradient (direction of steepest increase in loss) for each weight.
          <strong>Gradient descent</strong> is the algorithm that uses this information to
          update weights: we step in the <em>opposite</em> direction of the gradient to reduce loss.
        </p>
        <p>
          Think of it like rolling a ball downhill. The gradient tells us which way is &quot;up&quot;
          (increasing loss), so we go the opposite way (decreasing loss).
        </p>
      </ExplanationBox>

      <MathFormula label="Gradient Descent Update">
        w_new = w_old - learning_rate × gradient
      </MathFormula>

      <ExplanationBox title="Why Subtract?">
        <p>
          The gradient points in the direction that <em>increases</em> the loss. But we want
          to <em>decrease</em> the loss, so we go the opposite direction - that&apos;s why we subtract.
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Positive gradient → weight too high → subtract to decrease</li>
          <li>Negative gradient → weight too low → subtracting negative = add to increase</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The math works out perfectly: subtracting the gradient always moves toward lower loss.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Learning Rate">
        <p>
          The <strong>learning rate</strong> controls how big each step is:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Too small (0.001)</strong>: Very slow learning, might get stuck</li>
          <li><strong>Too large (10.0)</strong>: Steps overshoot, loss oscillates wildly</li>
          <li><strong>Just right (0.1-1.0)</strong>: Smooth, steady improvement</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Finding a good learning rate is part art, part science. Common values range from
          0.0001 to 1.0 depending on the problem.
        </p>
      </ExplanationBox>

      <WorkedExample title="Single Weight Update">
        <p>Weight = 0.8, gradient = -0.088, learning_rate = 0.5:</p>

        <CalcStep number={1}>Current weight: w = 0.8</CalcStep>
        <CalcStep number={2}>Gradient: ∂L/∂w = -0.088 (negative = weight too low)</CalcStep>
        <CalcStep number={3}>Learning rate: lr = 0.5</CalcStep>
        <CalcStep number={4}>Update: w = 0.8 - (0.5 × -0.088)</CalcStep>
        <CalcStep number={5}>w = 0.8 - (-0.044) = 0.8 + 0.044 = 0.844</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          The weight increased from 0.8 to 0.844. Since the gradient was negative (weight too low),
          subtracting the negative value increased the weight. Perfect!
        </p>
      </WorkedExample>

      <ExplanationBox title="The Training Loop">
        <p>
          Training repeats this process many times:
        </p>
        <pre style={{
          background: 'var(--bg-code)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
{`for epoch in range(num_epochs):
    for (input, target) in training_data:
        # Forward pass
        output = forward(input)

        # Backward pass
        gradients = backward(...)

        # Update weights
        for each weight, gradient:
            weight = weight - learning_rate * gradient

    print(f"Epoch {epoch}, Loss: {total_loss}")`}
        </pre>
        <p style={{ marginTop: '1rem' }}>
          One pass through all training data is called an &quot;epoch.&quot; Training typically
          runs for hundreds or thousands of epochs until the loss stops improving.
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Implement gradient descent for a single weight. Watch the weight change over
          multiple iterations as it moves toward a better value.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Set <code>learning_rate = 0.5</code></li>
          <li>Start with <code>weight = 0.8</code></li>
          <li>In a loop (5 iterations):</li>
          <ul style={{ marginLeft: '1rem' }}>
            <li>Compute prediction using sigmoid(input × weight + bias)</li>
            <li>Compute gradient using chain rule</li>
            <li>Update: weight = weight - learning_rate × gradient</li>
            <li>Print the progress</li>
          </ul>
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

# Simple 1-weight example
input_val = 0.5
weight = 0.8
bias = 0.1
target = 1.0
learning_rate = 0.5

print("Training a single weight:")
print("Target:", target)
print()

for i in range(5):
    # Forward
    z = input_val * weight + bias
    output = sigmoid(z)

    # Backward (chain rule)
    error = output - target
    gradient = error * sigmoid_derivative(z) * input_val

    # Print before update
    print(f"Iteration {i}:")
    print(f"  Weight: {weight:.4f}, Output: {output:.4f}")
    print(f"  Gradient: {gradient:.4f}")

    # Update!
    weight = weight - learning_rate * gradient

    print(f"  New weight: {weight:.4f}")
    print()

print("Final output:", sigmoid(input_val * weight + bias))`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)

# Setup
input_val = 0.5
weight = 0.8
bias = 0.1
target = 1.0
learning_rate = 0.5  # Try changing this!

print("=== Gradient Descent Training ===")
print(f"Target: {target}")
print(f"Learning rate: {learning_rate}")
print()

# Training loop
for iteration in range(5):
    # Forward pass
    z = input_val * weight + bias
    output = sigmoid(z)
    loss = (output - target) ** 2

    # Backward pass (compute gradient)
    error = output - target
    gradient = error * sigmoid_derivative(z) * input_val

    print(f"Iteration {iteration}:")
    print(f"  Weight = {weight:.4f}")
    print(f"  Output = {output:.4f}")
    print(f"  Loss = {loss:.4f}")
    print(f"  Gradient = {gradient:.4f}")

    # Gradient descent update
    # YOUR CODE: weight = weight - learning_rate * gradient


    print(f"  Updated weight = {weight:.4f}")
    print()

# Final result
final_output = sigmoid(input_val * weight + bias)
print(f"Final output: {final_output:.4f} (target was {target})")
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement gradient descent..."
        minHeight={520}
      />

      <ExplanationBox title="You've Built All the Pieces!">
        <p>
          You now have everything needed to train a neural network:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>✓ Forward propagation (compute predictions)</li>
          <li>✓ Loss function (measure error)</li>
          <li>✓ Backpropagation (compute gradients)</li>
          <li>✓ Gradient descent (update weights)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          In the final step, we&apos;ll put everything together into a complete neural network
          that learns XOR from scratch. You&apos;ll watch it train and see the loss decrease
          as it figures out the pattern!
        </p>
      </ExplanationBox>
    </div>
  );
}
