'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

export default function Step12() {
  return (
    <div>
      <ExplanationBox title="Forward Propagation">
        <p>
          <strong>Forward propagation</strong> (or &quot;forward pass&quot;) is the process of running
          inputs through the network to produce outputs. Data flows forward: input layer →
          hidden layer 1 → hidden layer 2 → output layer. This is what we&apos;ve been building.
        </p>
        <p>
          We&apos;ll wrap our computation in a single <code>forward()</code> function
          that takes inputs and returns the prediction. This makes it easy to test our
          network on different inputs.
        </p>
      </ExplanationBox>

      <MathFormula label="Forward Pass">
        output = forward(x) = layer₃(layer₂(layer₁(x, W₁, b₁), W₂, b₂), W₃, b₃)
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
