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

export default function Step4({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasBias = /bias\s*=\s*0\.1/.test(code) || /bias\s*=\s*\.1/.test(code);
    const hasZ = /z\s*=/.test(code);
    const hasAddition = /\+\s*bias/.test(code) || /bias\s*\+/.test(code);

    if (hasBias && hasZ && hasAddition) {
      return {
        success: true,
        output: `Bias added successfully!

inputs = [0.7, 0.8]  (temperature, humidity)
weights = [-0.3, 0.9]  (learned importance)
bias = 0.1  (baseline rain tendency)

Calculation:
  weighted_sum = (0.7 × -0.3) + (0.8 × 0.9) = -0.21 + 0.72 = 0.51
  z = weighted_sum + bias = 0.51 + 0.1 = 0.61

The pre-activation value z = 0.61

What's this number mean? It's the "raw signal" before transformation.
- Positive z (like 0.61) leans toward "yes, rain"
- Negative z would lean toward "no rain"
- The bias of 0.1 adds a slight "baseline raininess"

This z value will be transformed by the sigmoid function (Step 7)
to give us a probability between 0 and 1.`,
      };
    }

    if (hasBias && !hasZ) {
      return {
        success: false,
        output: `Good! You created the bias.

Now calculate z (the pre-activation value):
z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias

Or if you already have weighted_sum:
z = weighted_sum + bias`,
      };
    }

    return {
      success: false,
      output: `Create a variable called 'bias' with value 0.1

Then calculate z = weighted_sum + bias
(where weighted_sum = inputs[0]*weights[0] + inputs[1]*weights[1])`,
    };
  };

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

      <ExplanationBox title="The Geometric Interpretation">
        <p>
          Here&apos;s a beautiful way to understand bias geometrically. A neuron with two inputs
          can be visualized as drawing a line (decision boundary) in 2D space. Points on one
          side of the line predict &quot;rain&quot;; points on the other side predict &quot;no rain.&quot;
        </p>
        <p>
          Without bias, this line must pass through the origin (0,0). But many patterns require
          decision boundaries that don&apos;t pass through the origin! Bias shifts the line, allowing
          it to be placed anywhere in the space. It adds a crucial degree of freedom.
        </p>
        <p>
          Mathematically: the equation <code>w₁×temp + w₂×humid = 0</code> always passes through (0,0).
          But <code>w₁×temp + w₂×humid + bias = 0</code> can be shifted by adjusting bias.
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
        <p>Same weighted sum (0.51), different biases:</p>

        <CalcStep number={1}>bias = 0.5: z = 0.51 + 0.5 = 1.01 (strongly predicts rain)</CalcStep>
        <CalcStep number={2}>bias = 0.0: z = 0.51 + 0.0 = 0.51 (neutral baseline)</CalcStep>
        <CalcStep number={3}>bias = -0.5: z = 0.51 - 0.5 = 0.01 (barely positive)</CalcStep>
        <CalcStep number={4}>bias = -1.0: z = 0.51 - 1.0 = -0.49 (predicts no rain!)</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          See how bias controls the &quot;baseline&quot;? With bias = -1.0, even moderate humidity
          isn&apos;t enough to predict rain. The region might be in a desert where rain is rare!
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

      <TaskBox>
        <p>
          Add a bias term and calculate the pre-activation value z. This completes the
          linear part of the neuron computation.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Keep your inputs and weights from before</li>
          <li>Create <code>bias = 0.1</code> (slight baseline rain tendency)</li>
          <li>Calculate <code>z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias</code></li>
          <li>Print z to verify you get 0.61</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`inputs = [0.7, 0.8]
weights = [-0.3, 0.9]
bias = 0.1

# Calculate z (pre-activation)
z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias

print("Pre-activation z =", z)
# Should output: Pre-activation z = 0.61`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`# Your weather inputs and weights
inputs = [0.7, 0.8]
weights = [-0.3, 0.9]

# Add a bias term (baseline rain tendency)


# Calculate z = weighted sum + bias
# z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias


# Print z

`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Add bias and calculate z..."
        minHeight={200}
      />

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
