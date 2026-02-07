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

export default function Step15({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasBackward = /def\s+backward\s*\(/.test(code);
    const hasOutputDelta = /output_delta|delta_output|delta2|d2/.test(code.toLowerCase());
    const hasHiddenDelta = /hidden_delta|delta_hidden|delta1|d1/.test(code.toLowerCase());
    const hasGradient = /gradient|grad|dw/.test(code.toLowerCase());
    const hasReturn = /return/.test(code);

    if (hasBackward && hasOutputDelta && hasHiddenDelta && hasReturn) {
      return {
        success: true,
        output: `Backpropagation implemented!

Forward pass: [0.5, 0.8] → hidden [0.69, 0.38, 0.69] → output 0.70
Target: 1.0, Loss: 0.09

Backward pass:
1. Output layer delta:
   δ_out = (0.70 - 1.0) × sigmoid'(z) = -0.3 × 0.21 = -0.063

2. Output weight gradients:
   ∂L/∂w₂[0] = δ_out × hidden[0] = -0.063 × 0.69 = -0.043
   (Similar for other output weights)

3. Hidden layer deltas (backpropagated):
   δ_h[i] = δ_out × w₂[i] × sigmoid'(z_h[i])

4. Hidden weight gradients:
   ∂L/∂w₁[i][j] = δ_h[i] × input[j]

The gradients tell us:
- Negative gradient → increase the weight to reduce loss
- Positive gradient → decrease the weight to reduce loss

This is THE algorithm that trains every neural network. Error flows backward
from output to input, computing how each weight contributed to the error.`,
      };
    }

    if (hasBackward && hasOutputDelta && !hasHiddenDelta) {
      return {
        success: false,
        output: `Good! You computed the output layer delta.

Now backpropagate to the hidden layer:
For each hidden neuron i:
  delta_hidden[i] = output_delta × w2[0][i] × sigmoid_derivative(z1[i])

This tells us how the error flows back to each hidden neuron.`,
      };
    }

    return {
      success: false,
      output: `Implement backpropagation step by step:

1. Compute output_delta = (prediction - target) × sigmoid'(z2)
2. Compute output weight gradients
3. Backpropagate: hidden_delta[i] = output_delta × w2[i] × sigmoid'(z1[i])
4. Compute hidden weight gradients`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Backpropagation: The Complete Algorithm">
        <p>
          <strong>Backpropagation</strong> is the algorithm that makes neural network training
          possible. It efficiently computes how each weight in the network affects the final
          loss, allowing us to update all weights to improve performance.
        </p>
        <p>
          The key insight: we compute derivatives in reverse order, from output back to input.
          Each layer&apos;s delta is computed using the delta from the layer ahead of it.
        </p>
      </ExplanationBox>

      <MathFormula label="Backpropagation Flow">
        Loss → Output Delta → Hidden Deltas → Weight Gradients
      </MathFormula>

      <ExplanationBox title="The Algorithm Step by Step">
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2.2' }}>
          <li>
            <strong>Forward pass</strong>: Compute all activations, storing z and a for each layer
          </li>
          <li>
            <strong>Output delta</strong>: δ_output = (prediction - target) × sigmoid&apos;(z_output)
          </li>
          <li>
            <strong>Output gradients</strong>: ∂L/∂w₂[j] = δ_output × hidden[j]
          </li>
          <li>
            <strong>Hidden deltas</strong>: δ_hidden[i] = (δ_output × w₂[i]) × sigmoid&apos;(z_hidden[i])
          </li>
          <li>
            <strong>Hidden gradients</strong>: ∂L/∂w₁[i][j] = δ_hidden[i] × input[j]
          </li>
        </ol>
      </ExplanationBox>

      <WorkedExample title="Full Backprop Example">
        <p>Network: 2 inputs → 3 hidden → 1 output. Input [0.5, 0.8], target = 1.0</p>

        <p style={{ marginTop: '1rem' }}><strong>Forward pass (stored values):</strong></p>
        <CalcStep number={1}>z₁ = [0.78, -0.30, 0.79] (pre-activations)</CalcStep>
        <CalcStep number={2}>a₁ = [0.686, 0.426, 0.688] (hidden outputs)</CalcStep>
        <CalcStep number={3}>z₂ = 0.847, a₂ = 0.700 (output)</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Output layer backward:</strong></p>
        <CalcStep number={4}>error = 0.700 - 1.0 = -0.30</CalcStep>
        <CalcStep number={5}>δ₂ = -0.30 × sigmoid&apos;(0.847) = -0.30 × 0.21 = -0.063</CalcStep>
        <CalcStep number={6}>∂L/∂w₂[0] = δ₂ × a₁[0] = -0.063 × 0.686 = -0.043</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Hidden layer backward:</strong></p>
        <CalcStep number={7}>δ₁[0] = δ₂ × w₂[0] × sigmoid&apos;(z₁[0])</CalcStep>
        <CalcStep number={8}>δ₁[0] = -0.063 × 0.4 × 0.215 = -0.0054</CalcStep>
        <CalcStep number={9}>∂L/∂w₁[0][0] = δ₁[0] × input[0] = -0.0054 × 0.5 = -0.0027</CalcStep>
      </WorkedExample>

      <ExplanationBox title="Why Backward?">
        <p>
          We compute backwards because of efficiency. To find how a weight in layer 1 affects
          the loss, we need to know how layer 2&apos;s output affects the loss first. The chain
          rule naturally flows backward: each delta depends on the delta ahead of it.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This backward flow is why it&apos;s called &quot;back&quot;-propagation! The error signal
          propagates from the output back through each layer.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Storing Values During Forward Pass">
        <p>
          Notice that backprop needs values from the forward pass (z values and activations).
          In practice, we store these during forward pass so they&apos;re available for backward.
          This is why neural networks use significant memory during training.
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Implement a simplified backpropagation function. We&apos;ll compute deltas and gradients
          for our two-layer network.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Create <code>backward(inputs, hidden, z1, output, z2, target)</code></li>
          <li>Compute output_delta using the chain rule</li>
          <li>Compute gradients for output weights</li>
          <li>Backpropagate to get hidden deltas</li>
          <li>Compute gradients for hidden weights</li>
          <li>Return the gradients</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`def backward(inputs, hidden, z1, output, z2, target, w2):
    # Output layer
    output_error = output - target
    output_delta = output_error * sigmoid_derivative(z2)

    # Output weight gradients
    grad_w2 = []
    for j in range(len(hidden)):
        grad_w2.append(output_delta * hidden[j])

    # Hidden layer (backpropagate)
    hidden_deltas = []
    for i in range(len(hidden)):
        # Error flows back through w2
        backprop_error = output_delta * w2[0][i]
        hidden_deltas.append(backprop_error * sigmoid_derivative(z1[i]))

    # Hidden weight gradients
    grad_w1 = []
    for i in range(len(hidden_deltas)):
        neuron_grads = []
        for j in range(len(inputs)):
            neuron_grads.append(hidden_deltas[i] * inputs[j])
        grad_w1.append(neuron_grads)

    return grad_w1, grad_w2, hidden_deltas, output_delta`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)

# Simplified backpropagation
def backward(inputs, hidden, z1, output, z2, target, w2):
    # Step 1: Output layer delta
    output_error = output - target
    output_delta = output_error * sigmoid_derivative(z2)
    print("Output delta:", output_delta)

    # Step 2: Output weight gradients (one per hidden neuron)
    grad_w2 = []
    for j in range(len(hidden)):
        grad = output_delta * hidden[j]
        grad_w2.append(grad)
    print("Output weight gradients:", grad_w2)

    # Step 3: Backpropagate to hidden layer
    hidden_deltas = []
    for i in range(len(hidden)):
        # Error flows back through the weight connecting to output
        backprop_error = output_delta * w2[0][i]
        delta = backprop_error * sigmoid_derivative(z1[i])
        hidden_deltas.append(delta)
    print("Hidden deltas:", hidden_deltas)

    # Step 4: Hidden weight gradients
    grad_w1 = []
    for i in range(len(hidden_deltas)):
        neuron_grads = []
        for j in range(len(inputs)):
            neuron_grads.append(hidden_deltas[i] * inputs[j])
        grad_w1.append(neuron_grads)
    print("Hidden weight gradients:", grad_w1)

    return grad_w1, grad_w2, hidden_deltas, output_delta

# Test backpropagation
inputs = [0.5, 0.8]
hidden = [0.686, 0.426, 0.688]
z1 = [0.78, -0.30, 0.79]
output = 0.70
z2 = 0.847
target = 1.0
w2 = [[0.4, 0.3, 0.5]]

print("=== Backpropagation ===")
print("Input:", inputs)
print("Target:", target)
print("Output:", output)
print("Error:", output - target)
print()

grad_w1, grad_w2, h_deltas, o_delta = backward(
    inputs, hidden, z1, output, z2, target, w2
)
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement backpropagation..."
        minHeight={600}
      />

      <ExplanationBox title="You've Implemented Backpropagation!">
        <p>
          Congratulations! You just implemented the core algorithm that trains all neural networks.
          Every time you use ChatGPT, image recognition, or any ML model - this same algorithm
          (with optimizations) computed all the weight updates during training.
        </p>
        <p>
          The gradients tell us which direction to adjust each weight. Now we need to actually
          <em> apply</em> these updates. That&apos;s gradient descent - the final piece!
        </p>
      </ExplanationBox>
    </div>
  );
}
