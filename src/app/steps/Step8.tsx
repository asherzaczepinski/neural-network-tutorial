'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';

export default function Step8() {
  return (
    <div>
      <ExplanationBox title="More on The Math Behind z Value Ranges">
        <p>
          Let&apos;s understand exactly how z values stay in a predictable range. Recall that z is the weighted sum:
        </p>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem',
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          textAlign: 'center'
        }}>
          z = w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + ... + w<sub>n</sub>x<sub>n</sub> + b
        </div>
      </ExplanationBox>

      <ExplanationBox title="After Normalization">
        <p>
          Most ML pipelines normalize inputs to have mean ≈ 0 and standard deviation ≈ 1. This means:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>68%</strong> of input values fall in [-1, 1]</li>
          <li><strong>95%</strong> of input values fall in [-2, 2]</li>
          <li><strong>99.7%</strong> of input values fall in [-3, 3]</li>
        </ul>
      </ExplanationBox>

      <ExplanationBox title="Weight Initialization">
        <p>
          When a neural network first starts, it doesn&apos;t know anything yet — so weights are set
          to small random values. But not just any random values! Networks use <strong>Xavier/Glorot
          initialization</strong>, which picks random weights from a specific range.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Example: If you have 2 inputs, Xavier initialization might pick random weights between
          roughly -0.7 and +0.7. If you have 10 inputs, it uses a tighter range like -0.3 to +0.3.
          The formula is variance ≈ 1/n (where n = number of inputs).
        </p>
        <ul style={{ marginTop: '0.75rem', lineHeight: '1.8' }}>
          <li><strong>Why?</strong> If weights are too large, signals &quot;explode&quot; (get huge).</li>
          <li>If weights are too small, signals &quot;vanish&quot; (get tiny).</li>
          <li>Xavier initialization keeps them just right!</li>
        </ul>
      </ExplanationBox>

      <ExplanationBox title="The Result: z Distribution">
        <p>
          When you multiply normalized inputs (standard deviation ≈ 1) by properly initialized weights,
          the math works out so that z values also have a standard deviation ≈ 1. This means most
          z values naturally fall between -3 and +3, right in the range where sigmoid is most sensitive!
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why This Matters for Sigmoid">
        <p>
          Sigmoid is most sensitive (has the steepest slope) when z is between -4 and +4. Outside that
          range, the gradient approaches zero and the neuron &quot;saturates&quot; at 0 or 1. Good
          initialization tries to keep z inside this sensitive window so the network can learn effectively!
        </p>
      </ExplanationBox>
    </div>
  );
}
