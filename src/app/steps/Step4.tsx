'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step4({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Why Do We Need Bias?">
        <p>
          Imagine a neuron with no bias, just inputs multiplied by weights. If all the inputs
          are zero, the output is always zero, no matter what the weights are. This is a problem
          because sometimes we want the neuron to &quot;fire&quot; (produce a non-zero output) even when
          the inputs are all zero or very small.
        </p>
        <p>
          For rain prediction: maybe your region has a baseline 30% chance of rain on any given day,
          regardless of current temperature and humidity. The bias captures this baseline tendency.
          Without it, a day with temp=0 and humidity=0 would always predict 0% rain chance.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Bias as a 'Super Weight'">
        <p>
          Think of bias as a weight that&apos;s always multiplied by 1. While regular weights scale
          the inputs, bias adds a constant shift — and this shift is incredibly powerful. It lets
          a neuron have a strong opinion even when inputs are weak or neutral.
        </p>
        <p>
          In a network with many neurons, each neuron can have a different bias. A neuron with a
          large positive bias becomes &quot;eager&quot; — it activates strongly and contributes more to
          the network&apos;s decision. A neuron with a large negative bias becomes &quot;reluctant&quot; — it
          needs strong input evidence to activate at all. This diversity is what lets different
          neurons specialize: some become strong rain predictors, others become cautious detectors
          that only fire under specific conditions.
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
          Here's how we compute the pre-activation value with bias:
        </p>
        <pre><code>{`inputs = [0.7, 0.8]
weights = [-0.3, 0.9]
bias = 0.1

# Calculate z (pre-activation)
z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias

print("Pre-activation z =", z)
# Should output: Pre-activation z = 0.61`}</code></pre>
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
