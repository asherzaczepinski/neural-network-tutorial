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

export default function Step3({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasWeights = /weights\s*=\s*\[\s*-?0\.3\s*,\s*0\.9\s*\]/.test(code);
    const hasMultiply = /inputs\s*\[\s*0\s*\]\s*\*\s*weights\s*\[\s*0\s*\]/.test(code) ||
                        /weights\s*\[\s*0\s*\]\s*\*\s*inputs\s*\[\s*0\s*\]/.test(code);

    if (hasWeights && hasMultiply) {
      return {
        success: true,
        output: `Weights created and applied!

inputs = [0.7, 0.8]  (temperature, humidity)
weights = [-0.3, 0.9]  (temperature weight, humidity weight)

Weighted values:
  temperature × w_temp = 0.7 × -0.3 = -0.21
  humidity × w_humid = 0.8 × 0.9 = 0.72

Interesting! The temperature contribution is NEGATIVE (-0.21).
The humidity contribution is POSITIVE and larger (0.72).

This captures intuition about weather:
- Higher humidity → more likely to rain (positive weight 0.9)
- Higher temperature → slightly less likely to rain (negative weight -0.3)
  (Hot air can hold more moisture before condensing)

The weights encode the RELATIONSHIP between inputs and rain prediction!`,
      };
    }

    if (hasWeights && !hasMultiply) {
      return {
        success: false,
        output: `Good! You created the weights list.

Now multiply each input by its corresponding weight:
  inputs[0] * weights[0]  →  temperature's contribution
  inputs[1] * weights[1]  →  humidity's contribution

Store these or print them to see the results.`,
      };
    }

    return {
      success: false,
      output: `Create a list called 'weights' with values [-0.3, 0.9]

Then multiply:
  inputs[0] * weights[0]
  inputs[1] * weights[1]`,
    };
  };

  return (
    <div>
      <ExplanationBox title="What Are Weights, Really?">
        <p>
          Weights are the most important concept in neural networks. When someone says a neural
          network has &quot;175 billion parameters,&quot; they&apos;re mostly talking about weights. When we
          &quot;train&quot; a network, we&apos;re finding the right weight values. When we &quot;save&quot; a trained
          model, we&apos;re saving its weights.
        </p>
        <p>
          A weight is simply a number that controls how much an input influences the output.
          Think of it as a volume knob — turning it up makes that input louder in the final mix,
          turning it down makes it quieter, and turning it negative makes it work in reverse
          (opposing the output instead of supporting it).
        </p>
      </ExplanationBox>

      <ExplanationBox title="Weights for Rain Prediction">
        <p>
          For predicting rain, we&apos;ll use these weights:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Temperature weight: -0.3</strong> — Higher temperature slightly reduces rain prediction
            (hot air can hold more moisture before condensing)</li>
          <li><strong>Humidity weight: 0.9</strong> — Higher humidity strongly increases rain prediction
            (more moisture = more likely to rain)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          These weights capture real meteorological relationships! Of course, in reality,
          the network would <em>learn</em> these weights from data rather than us setting them.
        </p>
      </ExplanationBox>

      <MathFormula label="Weighted Input">
        weighted_value = input × weight
      </MathFormula>

      <WorkedExample title="Understanding Weight Effects">
        <p>Let&apos;s see how different weights would affect our humidity reading of 0.8:</p>

        <CalcStep number={1}>Weight = 1.0: 0.8 × 1.0 = 0.8 (unchanged)</CalcStep>
        <CalcStep number={2}>Weight = 2.0: 0.8 × 2.0 = 1.6 (doubled importance)</CalcStep>
        <CalcStep number={3}>Weight = 0.5: 0.8 × 0.5 = 0.4 (halved importance)</CalcStep>
        <CalcStep number={4}>Weight = 0.0: 0.8 × 0.0 = 0.0 (completely ignored!)</CalcStep>
        <CalcStep number={5}>Weight = -1.0: 0.8 × -1.0 = -0.8 (works AGAINST prediction)</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          That last one is key — negative weights let us express &quot;this input should DECREASE
          the output.&quot; For temperature, we use -0.3 because hot days are slightly less rainy
          (the heat can evaporate moisture before it becomes rain).
        </p>
      </WorkedExample>

      <ExplanationBox title="The Mathematics of Importance">
        <p>
          Multiplication is the mathematical operation that expresses &quot;importance&quot; or &quot;scaling.&quot;
          When you multiply a value by 2, you&apos;re saying &quot;this counts double.&quot; When you multiply
          by 0.5, you&apos;re saying &quot;this counts half.&quot; When you multiply by 0, you&apos;re saying
          &quot;this doesn&apos;t count at all.&quot;
        </p>
        <p>
          This is why weights work: multiplying an input by its weight scales the input&apos;s
          contribution. A large weight amplifies the input; a small weight diminishes it.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Weights Start Random">
        <p>
          Before training, weights are initialized to small random values. Why random? If all
          weights started at the same value, all neurons would compute the same thing and learn
          the same features — they&apos;d be redundant. Random initialization breaks this symmetry,
          allowing different neurons to specialize.
        </p>
        <p>
          For now, we&apos;re using hand-picked weights (-0.3, 0.9) that make meteorological sense.
          But in Step 16-17, you&apos;ll see the network learn its own weights through training!
        </p>
      </ExplanationBox>

      <WorkedExample title="Our Specific Calculation">
        <p>With inputs = [0.7, 0.8] (temp, humidity) and weights = [-0.3, 0.9]:</p>

        <CalcStep number={1}>Temperature: input[0] × weight[0] = 0.7 × -0.3</CalcStep>
        <CalcStep number={2}>Calculate: 0.7 × -0.3 = -0.21</CalcStep>
        <CalcStep number={3}>Humidity: input[1] × weight[1] = 0.8 × 0.9</CalcStep>
        <CalcStep number={4}>Calculate: 0.8 × 0.9 = 0.72</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Humidity contributes much more (0.72 vs -0.21). The high humidity is pushing
          toward &quot;rain,&quot; while the warm temperature is slightly pushing against it.
          When we sum these (next step), we&apos;ll see the combined effect.
        </p>
      </WorkedExample>

      <TaskBox>
        <p>
          Create weights and apply them to your weather inputs. This is the core operation that
          makes neural networks work — scaling inputs by importance.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>You should already have <code>inputs = [0.7, 0.8]</code> from before</li>
          <li>Create <code>weights = [-0.3, 0.9]</code></li>
          <li>Calculate <code>inputs[0] * weights[0]</code> (temperature contribution) and print</li>
          <li>Calculate <code>inputs[1] * weights[1]</code> (humidity contribution) and print</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`inputs = [0.7, 0.8]
weights = [-0.3, 0.9]

# Multiply each input by its weight
temp_contribution = inputs[0] * weights[0]
humidity_contribution = inputs[1] * weights[1]

print("Temperature contribution:", temp_contribution)
print("Humidity contribution:", humidity_contribution)`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`# Keep your inputs from before
inputs = [0.7, 0.8]

# Create a weights list: -0.3 for temperature, 0.9 for humidity


# Multiply inputs[0] by weights[0] and print


# Multiply inputs[1] by weights[1] and print

`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Create weights and multiply them with inputs..."
        minHeight={200}
      />

      <ExplanationBox title="What Comes Next">
        <p>
          You now have two weighted values: -0.21 (temperature&apos;s contribution) and 0.72
          (humidity&apos;s contribution). But a neuron produces a single output, not two separate values.
          In the next step, we&apos;ll add these weighted values together, plus a &quot;bias&quot; term,
          to create one combined prediction signal.
        </p>
        <p>
          This addition step is called the <strong>weighted sum</strong> or <strong>dot product</strong>,
          and it&apos;s mathematically beautiful — we&apos;ll see why it&apos;s the perfect way to combine
          multiple inputs into one number.
        </p>
      </ExplanationBox>
    </div>
  );
}
