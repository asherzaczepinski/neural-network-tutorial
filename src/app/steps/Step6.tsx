'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';


export default function Step6() {
  return (
    <div>
      <ExplanationBox title="Putting It All Together">
        <p>
          We now have all the pieces: inputs, weights, and bias. The <strong>pre-activation</strong> (also
          called <strong>z</strong>) is simply the result of combining them all — multiply each input by
          its weight, add them up, then add the bias.
        </p>
        <p>
          This value z tells us the neuron&apos;s &quot;raw signal&quot; before we convert it to a probability.
        </p>
      </ExplanationBox>

      <MathFormula label="Pre-activation (z)">
        z = (input₁ × weight₁) + (input₂ × weight₂) + bias
      </MathFormula>

      <ExplanationBox title="The Dot Product">
        <p>
          The &quot;multiply each pair and add them up&quot; part of this formula has a name:
          the <strong>dot product</strong>. It takes two lists — inputs and weights — and turns
          them into a single number.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          So pre-activation is really just: <em>dot product of inputs and weights, plus bias</em>.
          In code, you&apos;d write it as:
        </p>
        <p style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
          import numpy as np<br/>
          z = np.dot(inputs, weights) + bias
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          The dot product shows up everywhere in neural networks — every neuron uses it to combine
          inputs and weights, and later we&apos;ll see it used for entire layers at once through
          matrix multiplication.
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing z Step by Step">
        <p>Let&apos;s calculate z with our weather data:</p>

        <CalcStep number={1}>Inputs: temperature = 0.7, humidity = 0.8</CalcStep>
        <CalcStep number={2}>Weights: w_temp = -0.3, w_humid = 0.9</CalcStep>
        <CalcStep number={3}>Bias: 0.1</CalcStep>
        <CalcStep number={4}>Temperature contribution: 0.7 × -0.3 = -0.21</CalcStep>
        <CalcStep number={5}>Humidity contribution: 0.8 × 0.9 = 0.72</CalcStep>
        <CalcStep number={6}>Weighted sum (dot product): -0.21 + 0.72 = 0.51</CalcStep>
        <CalcStep number={7}>Add bias: z = 0.51 + 0.1 = 0.61</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Our pre-activation is <strong>z = 0.61</strong>. This positive number means the neuron is
          leaning toward predicting rain. But what does 0.61 actually mean? Is that a lot? A little?
          That&apos;s why we need an activation function next.
        </p>
      </WorkedExample>
    </div>
  );
}
