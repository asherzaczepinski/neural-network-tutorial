'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';

export default function Step8() {
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

      <ExplanationBox title="Implementing Sigmoid">
        <p>
          Now implement the sigmoid function yourself. Remember: sigmoid(z) = 1 / (1 + e^(-z))
        </p>
        <CodeRunner code={`# Euler's number
E = 2.71828

# Sigmoid: 1 / (1 + e^(-z))
z = 0.61
sigmoid_z = 1 / (1 + E ** (-z))
print("z =", z)
print("Rain probability =", sigmoid_z)

# Try other values
z2 = -2
print("sigmoid(-2) =", 1 / (1 + E ** (-z2)))

z3 = 0
print("sigmoid(0) =", 1 / (1 + E ** (-z3)))

z4 = 2
print("sigmoid(2) =", 1 / (1 + E ** (-z4)))
`} />
      </ExplanationBox>
    </div>
  );
}
