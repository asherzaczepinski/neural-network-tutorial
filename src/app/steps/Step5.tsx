'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

export default function Step5() {
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

      <ExplanationBox title="Weights + Bias = The Full Picture">
        <p>
          Here&apos;s how weights and bias work together to make predictions:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Weights</strong> decide which inputs matter and by how much. High weight on humidity?
            Humidity has a big influence. Negative weight on temperature? Higher temps push the prediction down.</li>
          <li><strong>Bias</strong> is our starting assumption about how important this neuron is. Before
            looking at any inputs, should this neuron already be leaning toward firing or staying quiet?</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Together, they answer: &quot;Which inputs matter, how much do they matter, and what&apos;s our
          starting assumption?&quot; During training, the network adjusts both weights AND bias to find
          the combination that makes the best predictions.
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
