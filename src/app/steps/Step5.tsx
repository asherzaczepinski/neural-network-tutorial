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
          Weights control how much each input matters. But what if we want the neuron to have a
          starting assumption <em>before</em> it even looks at the inputs?
        </p>
        <p>
          <strong>Bias</strong> is a number that shifts the neuron&apos;s decision threshold. It&apos;s
          added after the weighted sum, and it lets the neuron say &quot;I&apos;m already leaning toward
          yes&quot; or &quot;I&apos;m already leaning toward no&quot; before considering any evidence.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The y = mx + b Analogy">
        <p>
          Remember y = mx + b from algebra? Without the &quot;+ b&quot; part, the line <em>has</em> to
          pass through the origin (0,0). The bias term lets you shift the whole line up or down.
        </p>
        <p>
          Neural networks work the same way. Without bias, the neuron&apos;s decision boundary is
          stuck passing through zero. With bias, we can shift that boundary anywhere we need it.
        </p>
        <p>
          During training, the network learns the best bias values automatically — just like it
          learns the weights. Both get adjusted through backpropagation to make better predictions.
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
