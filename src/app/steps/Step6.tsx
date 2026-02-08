'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';

interface StepProps {
  onComplete: () => void;
}

export default function Step6({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="What Is Bias?">
        <p>
          Bias is simply a number that gets added after the weighted sum. It shifts the result
          up or down before we squish it into a probability.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why Bias Adds Flexibility">
        <p>
          Without bias, neurons are limited in what they can learn. Bias gives each neuron
          the flexibility to adjust its &quot;default&quot; behavior — making it more or less likely
          to activate regardless of the inputs.
        </p>
        <p>
          In a network with many neurons, different biases create <strong>variety</strong>:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Positive bias → neuron activates more easily (lower threshold)</li>
          <li>Negative bias → neuron is harder to activate (higher threshold)</li>
          <li>Zero bias → neutral, purely driven by inputs</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          This variety is essential. Some neurons become &quot;eager&quot; detectors, others become
          &quot;skeptical&quot; — and the network needs both to capture complex patterns.
        </p>
      </ExplanationBox>

      <MathFormula label="Pre-activation (z)">
        z = (temperature × w₁) + (humidity × w₂) + bias
      </MathFormula>

      <ExplanationBox title="Why 'z' and 'Pre-activation'?">
        <p>
          The value we calculate (weighted sum plus bias) is commonly called <strong>z</strong>
          in neural network literature. It&apos;s also called the <strong>pre-activation</strong> because
          it&apos;s the value <em>before</em> we apply the activation function.
        </p>
        <p>
          The sequence is: inputs → weights → weighted sum → add bias → z (pre-activation) →
          activation function → output (rain probability). We&apos;re building toward the activation function,
          but first we need to compute z correctly.
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing z Step by Step">
        <p>With inputs = [0.7, 0.8], weights = [-0.3, 0.9], and bias = 0.1:</p>

        <CalcStep number={1}>Temperature contribution: 0.7 × -0.3 = -0.21</CalcStep>
        <CalcStep number={2}>Humidity contribution: 0.8 × 0.9 = 0.72</CalcStep>
        <CalcStep number={3}>Weighted sum: -0.21 + 0.72 = 0.51</CalcStep>
        <CalcStep number={4}>Add bias: z = 0.51 + 0.1 = 0.61</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Our pre-activation value is <strong>z = 0.61</strong>. This positive number suggests
          the neuron is leaning toward &quot;rain.&quot; After passing through sigmoid (Step 7),
          this will become a probability around 65% rain chance.
        </p>
      </WorkedExample>

      <ExplanationBox title="Bias Can Be Negative Too">
        <p>
          Like weights, bias can be positive or negative. A positive bias makes the neuron
          more likely to predict rain (shifts output upward). A negative bias makes it less
          likely to predict rain (shifts output downward, making the neuron more &quot;skeptical&quot;).
        </p>
        <p>
          During training, the network learns appropriate bias values along with weights.
          Some neurons end up with positive biases (easily activated), others with negative
          biases (hard to activate). This diversity helps the network represent complex patterns.
        </p>
      </ExplanationBox>

      <WorkedExample title="Effect of Different Bias Values">
        <p>Same weighted sum (0.51), different biases — watch how bias determines how &quot;confident&quot; this neuron becomes:</p>

        <CalcStep number={1}>bias = 0.5: z = 0.51 + 0.5 = 1.01 → this neuron strongly predicts rain</CalcStep>
        <CalcStep number={2}>bias = 0.0: z = 0.51 + 0.0 = 0.51 → this neuron has a neutral baseline</CalcStep>
        <CalcStep number={3}>bias = -0.5: z = 0.51 - 0.5 = 0.01 → this neuron is barely activated</CalcStep>
        <CalcStep number={4}>bias = -1.0: z = 0.51 - 1.0 = -0.49 → this neuron predicts no rain</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          See how bias controls each neuron&apos;s &quot;personality&quot;? With bias = 0.5, this neuron becomes
          a confident rain predictor. With bias = -1.0, this neuron becomes skeptical — even moderate
          humidity isn&apos;t enough to convince it. In a full network, having neurons with different biases
          means some will fire strongly while others stay quiet, creating a rich mix of signals.
        </p>
      </WorkedExample>

      <ExplanationBox title="One Bias Per Neuron">
        <p>
          Each neuron has exactly one bias value, regardless of how many inputs it has.
          If a neuron has 100 inputs (like 100 weather measurements), it has 100 weights
          (one per input) but still just 1 bias.
        </p>
        <p>
          The bias is added after all the weighted inputs are summed. It&apos;s a single final
          adjustment to the total, not separate adjustments per input.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Computing z (Pre-activation)">
        <p>
          Now compute the pre-activation value by combining weights, inputs, and bias:
        </p>
        <CodeRunner code={`# Set up inputs = [0.7, 0.8]

# Set up weights = [-0.3, 0.9]

# Set bias = 0.1

# Calculate z (pre-activation):
# z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias

# Print the result: "Pre-activation z =", z
`} />
      </ExplanationBox>

      <ExplanationBox title="Where We Are Now">
        <p>
          You&apos;ve computed the <strong>pre-activation value z = 0.61</strong>. This represents
          the raw &quot;signal strength&quot; for our rain prediction before any transformation.
          But neural networks need something more — they need non-linearity.
        </p>
        <p>
          In the next step, we&apos;ll learn about the <strong>dot product</strong> — a cleaner way
          to compute what we just did. Then we&apos;ll explore <em>why</em> non-linearity is essential
          (spoiler: without it, deep networks are useless), before finally implementing the
          sigmoid activation function in Step 7.
        </p>
      </ExplanationBox>
    </div>
  );
}
