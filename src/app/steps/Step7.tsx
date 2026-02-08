'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';
import LayerCollapseDemo from '@/components/LayerCollapseDemo';

interface StepProps {
  onComplete: () => void;
}

export default function Step7({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="The Problem: Our Numbers Are All Over the Place">
        <p>
          In Step 4, we computed our neuron&apos;s pre-activation value: <strong>z = 0.61</strong>.
          But what does 0.61 actually mean? Is that a high chance of rain? Low? We have no idea!
        </p>
        <p>
          The problem is that z can be <em>any</em> number. With different inputs and weights, you might get:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>z = 0.61 (like our weather example)</li>
          <li>z = -5.2 (different weather, different weights)</li>
          <li>z = 47.3 (extreme inputs)</li>
          <li>z = -0.001 (nearly balanced inputs)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          We need a function that takes <em>any</em> number and converts it to a probability
          between 0 and 1. That&apos;s exactly what the <strong>sigmoid function</strong> does.
        </p>
      </ExplanationBox>

      <ExplanationBox title="What Sigmoid Does: Squish Everything to 0-1">
        <p>
          Think of sigmoid as a &quot;squishing&quot; function. No matter what number you give it,
          it outputs something between 0 and 1:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Large positive numbers</strong> (like 10) → get squished toward 1 (confident &quot;yes, rain&quot;)</li>
          <li><strong>Large negative numbers</strong> (like -10) → get squished toward 0 (confident &quot;no rain&quot;)</li>
          <li><strong>Zero</strong> → becomes exactly 0.5 (completely uncertain, 50/50)</li>
          <li><strong>Small positive</strong> (like our 0.61) → becomes slightly above 0.5 (leaning toward rain)</li>
        </ul>
      </ExplanationBox>


      <WorkedExample title="Let's Apply Sigmoid to Our Weather Calculation">
        <p>Remember our pre-activation from Step 4? Let&apos;s convert it to a rain probability:</p>

        <CalcStep number={1}>Our neuron computed z = 0.61</CalcStep>
        <CalcStep number={2}>Apply sigmoid: sigmoid(0.61) = 0.648</CalcStep>
        <CalcStep number={3}>Interpretation: 64.8% chance of rain!</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Now our output actually means something! On this warm (0.7), humid (0.8) day,
          the neuron predicts a <strong>64.8% chance of rain</strong>. That&apos;s a real,
          interpretable probability.
        </p>
      </WorkedExample>

      <WorkedExample title="How Sigmoid Handles Different Signals">
        <p>Let&apos;s see what sigmoid does to various neuron outputs:</p>

        <CalcStep number={1}>z = -10 → sigmoid(-10) = 0.00005 → &quot;Almost certainly NO rain&quot;</CalcStep>
        <CalcStep number={2}>z = -2 → sigmoid(-2) = 0.12 → &quot;12% chance, probably dry&quot;</CalcStep>
        <CalcStep number={3}>z = 0 → sigmoid(0) = 0.50 → &quot;50/50, completely uncertain&quot;</CalcStep>
        <CalcStep number={4}>z = 0.61 → sigmoid(0.61) = 0.65 → &quot;65% chance, likely rain&quot;</CalcStep>
        <CalcStep number={5}>z = 2 → sigmoid(2) = 0.88 → &quot;88% chance, probably rain&quot;</CalcStep>
        <CalcStep number={6}>z = 10 → sigmoid(10) = 0.99995 → &quot;Almost certainly rain&quot;</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          See the pattern? The more positive z is, the closer to 1 (certain rain).
          The more negative z is, the closer to 0 (certain no rain).
          And z = 0 is the perfect tipping point at 50%.
        </p>
      </WorkedExample>

      <MathFormula label="The Sigmoid Formula">
        sigmoid(z) = 1 / (1 + e^(-z))
      </MathFormula>

      <ExplanationBox title="Breaking Down the Math (Step by Step)">
        <p>
          The formula looks scary, but let&apos;s trace through it with z = 2:
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Step 1: Negate the input</strong><br />
          -z = -2
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Step 2: Raise e to that power</strong><br />
          e is approximately 2.718 (a special math constant). So e^(-2) ≈ 0.135
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Step 3: Add 1</strong><br />
          1 + 0.135 = 1.135
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Step 4: Divide 1 by that</strong><br />
          1 / 1.135 = 0.88
        </p>
        <p style={{ marginTop: '1rem' }}>
          So sigmoid(2) = 0.88, meaning an 88% probability. The negative z in the exponent
          is what makes positive inputs give high probabilities and negative inputs give low ones.
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing sigmoid(0.61) for Our Weather Example">
        <p>Let&apos;s trace through our actual weather calculation:</p>

        <CalcStep number={1}>Start with z = 0.61</CalcStep>
        <CalcStep number={2}>Negate: -0.61</CalcStep>
        <CalcStep number={3}>e^(-0.61) = 2.718^(-0.61) ≈ 0.543</CalcStep>
        <CalcStep number={4}>Add 1: 1 + 0.543 = 1.543</CalcStep>
        <CalcStep number={5}>Divide: 1 / 1.543 = 0.648</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Our warm, humid day has a <strong>64.8% predicted rain probability</strong>.
          The positive z (0.61) pushed us above 50%, but not by a huge amount since
          0.61 is a relatively small positive number.
        </p>
      </WorkedExample>

      <ExplanationBox title="Why Sigmoid Also Enables Deep Learning">
        <p>
          Sigmoid doesn&apos;t just give us nice probabilities — it&apos;s also what makes
          multi-layer networks actually work. Let&apos;s see this with our weather example.
        </p>
      </ExplanationBox>

      <WorkedExample title="Without Sigmoid: Layers Collapse">
        <p>Imagine a two-layer network for rain prediction, but WITHOUT sigmoid:</p>

        <p style={{ marginTop: '1rem' }}><strong>Layer 1:</strong></p>
        <CalcStep number={1}>Input: [temp=0.7, humid=0.8], weights=[-0.3, 0.9]</CalcStep>
        <CalcStep number={2}>Output: 0.7×(-0.3) + 0.8×0.9 = 0.51</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Layer 2:</strong></p>
        <CalcStep number={3}>Input: 0.51, weight=0.5</CalcStep>
        <CalcStep number={4}>Output: 0.51 × 0.5 = 0.255</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>But here&apos;s the problem:</strong></p>
        <p>
          We can get the EXACT same result with just ONE layer using combined weights:
        </p>
        <CalcStep number={5}>Combined weights: [-0.3×0.5, 0.9×0.5] = [-0.15, 0.45]</CalcStep>
        <CalcStep number={6}>Single layer: 0.7×(-0.15) + 0.8×0.45 = 0.255</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          <strong>Same answer!</strong> The second layer did nothing useful. We wasted
          computation on a layer that added zero capability.
        </p>
      </WorkedExample>

      <WorkedExample title="With Sigmoid: Each Layer Adds Power">
        <p>Now the SAME network, but with sigmoid after each layer:</p>

        <p style={{ marginTop: '1rem' }}><strong>Layer 1:</strong></p>
        <CalcStep number={1}>Linear: 0.7×(-0.3) + 0.8×0.9 = 0.51</CalcStep>
        <CalcStep number={2}>After sigmoid: sigmoid(0.51) = 0.625</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Layer 2:</strong></p>
        <CalcStep number={3}>Linear: 0.625 × 0.5 = 0.3125</CalcStep>
        <CalcStep number={4}>After sigmoid: sigmoid(0.3125) = 0.578</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Can we replicate this with one layer?</strong></p>
        <p>
          Try to find ANY weights that give 0.578 from inputs [0.7, 0.8] in one step.
          <strong> You can&apos;t!</strong> The sigmoid transformation creates a result
          that no single linear combination can produce.
        </p>

        <p style={{ marginTop: '1rem' }}>
          This is why sigmoid matters for deep learning: it makes each layer genuinely
          add computational power. A 10-layer network with sigmoid can learn patterns
          that a 1-layer network simply cannot represent.
        </p>
      </WorkedExample>

      <ExplanationBox title="What This Means for Weather Prediction">
        <p>
          Think about what a single layer without sigmoid can do. It can only learn
          <strong> one simple rule</strong>. Something like:
        </p>
        <p style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
          &quot;If humidity is above 0.6, predict rain. Otherwise, predict no rain.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          That&apos;s it. One rule. One cutoff. The network looks at humidity, checks if it&apos;s
          above or below 0.6, and makes its prediction. It completely ignores any
          complex relationships between temperature AND humidity together.
        </p>
      </ExplanationBox>

      <ExplanationBox title="But Real Weather Doesn't Follow One Simple Rule">
        <p>
          Real rain depends on <strong>combinations</strong> of things:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li>High humidity AND moderate temperature → rain</li>
          <li>High humidity BUT freezing cold → snow, not rain</li>
          <li>High humidity BUT extremely hot → the moisture evaporates, no rain</li>
          <li>Low humidity → no rain, regardless of temperature</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          See how the answer depends on checking multiple conditions together?
          A single layer can&apos;t do this. It can only check one thing at a time.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why Sigmoid Makes Each Layer 'Mean Something Different'">
        <p>
          Here&apos;s the key insight: sigmoid <strong>warps</strong> the numbers.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Without sigmoid, if layer 1 outputs 0.51, layer 2 just multiplies it.
          The 0.51 passes through unchanged in meaning — it&apos;s still just &quot;0.51&quot;.
        </p>
        <p style={{ marginTop: '1rem' }}>
          With sigmoid, that 0.51 gets transformed to 0.625. But here&apos;s the magic:
          sigmoid doesn&apos;t transform all numbers the same way. Small numbers get
          pushed toward 0.5. Big positive numbers get pushed toward 1. Big negative
          numbers get pushed toward 0.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This &quot;warping&quot; means <strong>each layer&apos;s output now has a different meaning</strong>.
          Layer 1&apos;s output of 0.625 isn&apos;t just a number anymore — it&apos;s been squeezed
          into a range where it represents &quot;how confident am I about this first question?&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          When layer 2 receives 0.625, it&apos;s receiving a <em>confidence level</em>, not just
          a raw number. It can then ask its own question and output its own confidence.
          The layers stay separate because each one is working with transformed,
          meaningful values — not just raw numbers that can be collapsed.
        </p>
      </ExplanationBox>

      <ExplanationBox title="See It For Yourself">
        <p>
          Play with the sliders below. Watch how the linear version always collapses
          to one layer, but the sigmoid version creates something unique:
        </p>
        <LayerCollapseDemo />
      </ExplanationBox>

      <ExplanationBox title="How This Lets Us Check Multiple Conditions">
        <p>
          Because sigmoid keeps each layer&apos;s meaning separate, we can stack layers
          where each one asks a different question:
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Layer 1 asks:</strong> &quot;Is it warm enough for rain?&quot;
          <br />
          Outputs high confidence (near 1) if yes, low confidence (near 0) if no.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Layer 2 asks:</strong> &quot;Is it too hot for rain?&quot;
          <br />
          Outputs high confidence (near 1) if yes, low confidence (near 0) if no.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Layer 3 asks:</strong> &quot;Is humidity high enough?&quot;
          <br />
          Outputs high confidence (near 1) if yes, low confidence (near 0) if no.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Final layer combines them:</strong> &quot;Warm enough AND not too hot AND humid?&quot;
          <br />
          Only if ALL conditions are right, predict rain.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Without sigmoid, all these layers would mathematically collapse into one.
          You&apos;d be stuck with one simple rule. Sigmoid is what keeps each layer&apos;s
          question separate and meaningful.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Simple Summary">
        <p>
          <strong>Without sigmoid:</strong> Your network can only learn one simple rule,
          no matter how many layers you add. &quot;If X is above some number, predict yes.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>With sigmoid:</strong> Each layer can ask a new question. More layers
          means you can check more conditions. &quot;Is A true? Is B true? Is C true?
          Only if all of them, predict yes.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          That&apos;s why sigmoid (and activation functions like it) are essential.
          They let neural networks learn complex patterns instead of just simple rules.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Implementing Sigmoid">
        <p>
          Here&apos;s how we implement the sigmoid function:
        </p>
        <pre><code>{`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

# Test with our weather example
z = 0.61
rain_probability = sigmoid(z)
print("z =", z)
print("Rain probability =", rain_probability)

# Try other values
print("sigmoid(-2) =", sigmoid(-2))
print("sigmoid(0) =", sigmoid(0))
print("sigmoid(2) =", sigmoid(2))`}</code></pre>
        <CodeRunner code={`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

# Test with our weather example
z = 0.61
rain_probability = sigmoid(z)
print("z =", z)
print("Rain probability =", rain_probability)

# Try other values
print("sigmoid(-2) =", sigmoid(-2))
print("sigmoid(0) =", sigmoid(0))
print("sigmoid(2) =", sigmoid(2))`} />
      </ExplanationBox>

      <ExplanationBox title="The Complete Picture So Far">
        <p>
          You now have all the pieces for a complete neuron:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Inputs</strong> — temperature (0.7) and humidity (0.8)</li>
          <li><strong>Weights</strong> — how much each input matters (-0.3 and 0.9)</li>
          <li><strong>Bias</strong> — the baseline tendency (0.1)</li>
          <li><strong>Weighted sum + bias</strong> — gives us z = 0.61</li>
          <li><strong>Sigmoid</strong> — converts z to probability = 0.648 (64.8%)</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          In the next step, we&apos;ll combine all these pieces into a single, reusable
          <code>neuron()</code> function. Then we&apos;ll build layers of neurons and
          connect them into a full network!
        </p>
      </ExplanationBox>
    </div>
  );
}
