'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';

interface StepProps {
  onComplete: () => void;
}

export default function Step4({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

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

      <ExplanationBox title="Weights Start Random">
        <p>
          Before training, weights are initialized to small random values (typically between -1 and 1).
          Why random? In networks with multiple neurons per layer, if all weights started at the same
          value, every neuron would compute the exact same thing and receive the exact same gradient
          updates during training — they&apos;d be completely redundant. Random initialization breaks this
          symmetry, allowing different neurons to specialize and learn different patterns.
        </p>
        <p>
          For now, we&apos;re using hand-picked weights (-0.3, 0.9) that make meteorological sense so you
          can see meaningful results. But in Steps 16-17, you&apos;ll see the network discover its own
          weights through training — starting from random values and gradually adjusting them to
          make accurate predictions!
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

      <ExplanationBox title="Applying Weights to Inputs">
        <p>
          Let's see how we apply weights to our weather inputs to compute each feature's contribution:
        </p>
        <pre><code>{`# Keep your inputs from before
inputs = [0.7, 0.8]

# Create a weights list: -0.3 for temperature, 0.9 for humidity
weights = [-0.3, 0.9]

# Multiply each input by its weight
temp_contribution = inputs[0] * weights[0]
humidity_contribution = inputs[1] * weights[1]

print("Temperature contribution:", temp_contribution)
print("Humidity contribution:", humidity_contribution)`}</code></pre>
        <CodeRunner code={`# Keep your inputs from before
inputs = [0.7, 0.8]

# Create a weights list: -0.3 for temperature, 0.9 for humidity
weights = [-0.3, 0.9]

# Multiply each input by its weight
temp_contribution = inputs[0] * weights[0]
humidity_contribution = inputs[1] * weights[1]

print("Temperature contribution:", temp_contribution)
print("Humidity contribution:", humidity_contribution)`} />
        <p>
          The weights encode the RELATIONSHIP between inputs and rain prediction!
        </p>
      </ExplanationBox>

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
