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

export default function Step11({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasForward = /def\s+forward\s*\(/.test(code);
    const hasHidden = /hidden\s*=/.test(code);
    const hasOutput = /output\s*=/.test(code);
    const hasReturn = /return/.test(code);
    const hasTests = /forward\s*\(\s*\[\s*0\s*,\s*0\s*\]/.test(code) ||
                     /forward\s*\(\s*\[\s*0\.0\s*,\s*0\.0\s*\]/.test(code);

    if (hasForward && hasHidden && hasOutput && hasReturn && hasTests) {
      return {
        success: true,
        output: `Forward propagation function complete!

Testing on XOR inputs:
  forward([0, 0]) = 0.652
  forward([0, 1]) = 0.673
  forward([1, 0]) = 0.648
  forward([1, 1]) = 0.667

XOR truth table:
  [0, 0] → should be 0 (got 0.652 - wrong!)
  [0, 1] → should be 1 (got 0.673 - somewhat right)
  [1, 0] → should be 1 (got 0.648 - wrong!)
  [1, 1] → should be 0 (got 0.667 - wrong!)

The network is just outputting values around 0.65 for everything!
This is because the weights are random - the network hasn't learned yet.

With random weights, the network has no idea what XOR is. All outputs
are similar because the random weights don't encode any useful pattern.

To fix this, we need to TRAIN the network - adjust the weights so they
produce the correct outputs. That's what backpropagation does!`,
      };
    }

    if (hasForward && (!hasHidden || !hasOutput)) {
      return {
        success: false,
        output: `Your forward function needs to:
1. Compute hidden = layer(inputs, w1, b1)
2. Compute output = layer(hidden, w2, b2)
3. Return the output

Make sure you're passing the right parameters!`,
      };
    }

    return {
      success: false,
      output: `Create a forward function that takes inputs and runs them through both layers:

def forward(inputs):
    hidden = layer(inputs, w1, b1)
    output = layer(hidden, w2, b2)
    return output[0]  # single output value`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Forward Propagation">
        <p>
          <strong>Forward propagation</strong> (or &quot;forward pass&quot;) is the process of running
          inputs through the network to produce outputs. Data flows forward: input layer →
          hidden layers → output layer. This is what we&apos;ve been building.
        </p>
        <p>
          We&apos;ll wrap our two-layer computation in a single <code>forward()</code> function
          that takes inputs and returns the prediction. This makes it easy to test our
          network on different inputs.
        </p>
      </ExplanationBox>

      <MathFormula label="Forward Pass">
        output = forward(x) = layer₂(layer₁(x, W₁, b₁), W₂, b₂)
      </MathFormula>

      <ExplanationBox title="Testing on XOR">
        <p>
          Remember our goal: learn the XOR function. Let&apos;s test our network on all four
          XOR inputs and see what it outputs:
        </p>
        <table style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Input</th>
              <th>Expected (XOR)</th>
              <th>What we want</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>[0, 0]</td><td>0</td><td>Output close to 0</td></tr>
            <tr><td>[0, 1]</td><td>1</td><td>Output close to 1</td></tr>
            <tr><td>[1, 0]</td><td>1</td><td>Output close to 1</td></tr>
            <tr><td>[1, 1]</td><td>0</td><td>Output close to 0</td></tr>
          </tbody>
        </table>
      </ExplanationBox>

      <ExplanationBox title="What Will Random Weights Produce?">
        <p>
          With random weights (which we haven&apos;t trained yet), the network will output
          essentially random values. All outputs will be somewhere around 0.5-0.7 because:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Random weights don&apos;t encode any useful pattern</li>
          <li>Sigmoid pushes most random sums toward the middle range</li>
          <li>The network has no idea what XOR is yet</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          This is expected! The point of this step is to see that untrained networks
          are useless - they need training to learn the correct weight values.
        </p>
      </ExplanationBox>

      <WorkedExample title="What Training Will Do">
        <p>After training, we want:</p>
        <CalcStep number={1}>forward([0, 0]) ≈ 0.05 (close to 0)</CalcStep>
        <CalcStep number={2}>forward([0, 1]) ≈ 0.95 (close to 1)</CalcStep>
        <CalcStep number={3}>forward([1, 0]) ≈ 0.95 (close to 1)</CalcStep>
        <CalcStep number={4}>forward([1, 1]) ≈ 0.05 (close to 0)</CalcStep>
        <p style={{ marginTop: '1rem' }}>
          Training adjusts the weights until these outputs match the XOR pattern.
          The next steps will show you exactly how this works!
        </p>
      </WorkedExample>

      <TaskBox>
        <p>
          Create a <code>forward</code> function that runs inputs through both layers.
          Then test it on all four XOR inputs to see the untrained outputs.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Define <code>forward(inputs)</code> that computes hidden then output</li>
          <li>Return the single output value (output[0])</li>
          <li>Test on all four XOR inputs: [0,0], [0,1], [1,0], [1,1]</li>
          <li>Compare to expected XOR values (all will be wrong - that&apos;s expected!)</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`def forward(inputs):
    hidden = layer(inputs, w1, b1)
    output = layer(hidden, w2, b2)
    return output[0]

# Test on all XOR inputs
print("XOR tests with untrained network:")
print("[0,0] ->", forward([0, 0]), "(should be 0)")
print("[0,1] ->", forward([0, 1]), "(should be 1)")
print("[1,0] ->", forward([1, 0]), "(should be 1)")
print("[1,1] ->", forward([1, 1]), "(should be 0)")`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`E = 2.71828

def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

def sigmoid(z):
    return 1 / (1 + E**(-z))

def neuron(inputs, weights, bias):
    z = dot_product(inputs, weights) + bias
    return sigmoid(z)

def layer(inputs, weights, biases):
    outputs = []
    for i in range(len(weights)):
        outputs.append(neuron(inputs, weights[i], biases[i]))
    return outputs

# Network parameters (random-ish values)
w1 = [[0.5, 0.5], [0.3, 0.7], [0.8, 0.2], [0.4, 0.6]]  # 4 hidden neurons
b1 = [0.1, 0.1, 0.1, 0.1]

w2 = [[0.4, 0.3, 0.5, 0.2]]  # 1 output neuron
b2 = [0.1]

# Create the forward function
def forward(inputs):
    # Compute hidden layer
    # Compute output layer
    # Return the single output value
    pass

# Test on XOR inputs
print("Testing untrained network on XOR:")
print("[0, 0] ->", forward([0, 0]), "(should be 0)")
print("[0, 1] ->", forward([0, 1]), "(should be 1)")
print("[1, 0] ->", forward([1, 0]), "(should be 1)")
print("[1, 1] ->", forward([1, 1]), "(should be 0)")
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Create the forward function..."
        minHeight={500}
      />

      <ExplanationBox title="The Gap Between Prediction and Reality">
        <p>
          You&apos;ve just seen the fundamental problem that training solves: untrained
          networks produce wrong answers. The outputs are nowhere near the XOR pattern.
        </p>
        <p>
          In the next steps, we&apos;ll learn how to:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Measure error</strong> - How wrong is the network? (Loss function)</li>
          <li><strong>Find the gradient</strong> - Which direction improves weights? (Derivatives)</li>
          <li><strong>Apply the chain rule</strong> - How do earlier weights affect final error?</li>
          <li><strong>Update weights</strong> - Adjust to reduce error (Gradient descent)</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          This is the backpropagation algorithm - the engine that powers all neural network training.
        </p>
      </ExplanationBox>
    </div>
  );
}
