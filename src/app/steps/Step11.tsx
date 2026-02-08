'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step11({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Connecting Layers">
        <p>
          The magic of deep learning happens when we connect layers together. The output
          of one layer becomes the input to the next. This creates a <strong>pipeline</strong>
          where data is progressively transformed, with each layer extracting more abstract features.
        </p>
        <p>
          In a two-layer network:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Raw inputs flow into the <strong>hidden layer</strong></li>
          <li>Hidden layer produces intermediate outputs (new features)</li>
          <li>Those outputs flow into the <strong>output layer</strong></li>
          <li>Output layer produces the final prediction</li>
        </ul>
      </ExplanationBox>

      <div style={{
        background: 'var(--bg-tertiary)',
        padding: '1.5rem',
        borderRadius: '12px',
        margin: '1.5rem 0',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Input</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="neuron-viz">x₁</div>
              <div className="neuron-viz">x₂</div>
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>→</div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Hidden</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="neuron-viz active">h₁</div>
              <div className="neuron-viz active">h₂</div>
              <div className="neuron-viz active">h₃</div>
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>→</div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Output</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="neuron-viz active">y</div>
            </div>
          </div>
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          2 inputs → 3 hidden neurons → 1 output
        </p>
      </div>

      <MathFormula label="Two-Layer Network">
        hidden = layer(inputs, W₁, b₁) → output = layer(hidden, W₂, b₂)
      </MathFormula>

      <ExplanationBox title="Why 'Hidden' Layer?">
        <p>
          The middle layer is called &quot;hidden&quot; because we don&apos;t directly observe its values -
          we only see the inputs and final outputs. The hidden layer&apos;s job is to create
          useful intermediate representations.
        </p>
        <p>
          Think of it like cooking: raw ingredients (inputs) → chopped/prepared ingredients
          (hidden layer) → final dish (output). The preparation step transforms ingredients
          into a form that&apos;s easier to combine into the final result.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Dimension Changes">
        <p>
          Notice how dimensions change through the network:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Input:</strong> 2 values [x₁, x₂]</li>
          <li><strong>Hidden weights (W₁):</strong> 3×2 (3 neurons, each with 2 weights)</li>
          <li><strong>Hidden output:</strong> 3 values [h₁, h₂, h₃]</li>
          <li><strong>Output weights (W₂):</strong> 1×3 (1 neuron with 3 weights)</li>
          <li><strong>Output:</strong> 1 value [y]</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The hidden layer &quot;expands&quot; 2 inputs to 3 features. The output layer &quot;compresses&quot;
          3 features to 1 output. This expansion then compression is a common pattern.
        </p>
      </ExplanationBox>

      <WorkedExample title="Full Network Trace">
        <p>Let&apos;s trace data through a complete 2-layer network:</p>

        <p style={{ marginTop: '1rem' }}><strong>Input:</strong> [0.5, 0.8]</p>

        <p style={{ marginTop: '1rem' }}><strong>Hidden Layer (3 neurons):</strong></p>
        <CalcStep number={1}>h₀ = sigmoid(0.5×0.4 + 0.8×0.6 + 0.1) = sigmoid(0.78) = 0.686</CalcStep>
        <CalcStep number={2}>h₁ = sigmoid(0.5×0.2 + 0.8×(-0.5) + (-0.2)) = sigmoid(-0.5) = 0.378</CalcStep>
        <CalcStep number={3}>h₂ = sigmoid(0.5×(-0.3) + 0.8×0.8 + 0.3) = sigmoid(0.79) = 0.688</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Hidden Output:</strong> [0.686, 0.378, 0.688]</p>

        <p style={{ marginTop: '1rem' }}><strong>Output Layer (1 neuron):</strong></p>
        <CalcStep number={4}>z = 0.686×0.4 + 0.378×0.3 + 0.688×0.5 + 0.1 = 0.831</CalcStep>
        <CalcStep number={5}>output = sigmoid(0.831) = 0.696</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          <strong>Final Output:</strong> 0.696
        </p>
      </WorkedExample>

      <ExplanationBox title="You Built a Deep Network!">
        <p>
          Congratulations! You&apos;ve built your first multi-layer neural network. This is
          fundamentally the same architecture used in:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Multi-layer perceptrons (MLPs)</li>
          <li>The dense/fully-connected layers in CNNs</li>
          <li>The feed-forward parts of transformers</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          The network can now transform inputs through multiple non-linear steps, giving
          it the power to learn complex patterns. In the next step, we&apos;ll wrap this in
          a clean &quot;forward&quot; function and start thinking about how to train it.
        </p>
      </ExplanationBox>
    </div>
  );
}
