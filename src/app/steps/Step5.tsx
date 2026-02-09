'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step5({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="What is Bias?">
        <p>
          We&apos;ve seen how weights control the importance of each input. But there&apos;s a problem:
          what if all our inputs are zero? The neuron would output zero no matter what the weights are.
        </p>
        <p>
          <strong>Bias</strong> is a number that gets added after all the weighted inputs are combined.
          Think of it as the neuron&apos;s &quot;baseline&quot; or &quot;starting point&quot; — it lets the
          neuron fire even when inputs are low, or stay quiet even when inputs are high.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why Do We Need Bias?">
        <p>
          Imagine predicting rain. Without bias, if temperature and humidity are both 0, the prediction
          would always be 0. But maybe in your location, there&apos;s a 30% base chance of rain regardless
          of conditions. Bias captures that baseline.
        </p>
        <p>
          Bias gives the neuron flexibility to shift its output up or down independent of the inputs.
          It&apos;s like the &quot;b&quot; in y = mx + b — the y-intercept that shifts the whole line.
        </p>
      </ExplanationBox>

      <MathFormula label="Neuron Calculation (so far)">
        output = (input₁ × weight₁) + (input₂ × weight₂) + bias
      </MathFormula>

      <WorkedExample title="Adding Bias to Our Weather Neuron">
        <p>Let&apos;s use our weather data with a bias of 0.1:</p>

        <CalcStep number={1}>Inputs: temperature = 0.7, humidity = 0.8</CalcStep>
        <CalcStep number={2}>Weights: w_temp = -0.3, w_humid = 0.9</CalcStep>
        <CalcStep number={3}>Bias: 0.1</CalcStep>
        <CalcStep number={4}>Weighted sum: (0.7 × -0.3) + (0.8 × 0.9) = -0.21 + 0.72 = 0.51</CalcStep>
        <CalcStep number={5}>Add bias: 0.51 + 0.1 = 0.61</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          The bias of 0.1 shifted our output from 0.51 to 0.61. This small adjustment can make a big
          difference in the final prediction — it&apos;s one more knob the network can tune during learning.
        </p>
      </WorkedExample>

      <ExplanationBox title="Bias in the Big Picture">
        <p>
          So now our neuron has three types of learnable parameters:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Inputs</strong> — The data we feed in (temperature, humidity)</li>
          <li><strong>Weights</strong> — How much each input matters</li>
          <li><strong>Bias</strong> — The baseline adjustment</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          During training, the network will automatically adjust the weights AND the bias to make
          better predictions. But we&apos;re not done yet — the output 0.61 could be any number.
          We need a way to squish it into a probability between 0 and 1.
        </p>
      </ExplanationBox>
    </div>
  );
}
