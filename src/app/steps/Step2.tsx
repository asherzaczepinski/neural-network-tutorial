'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';

interface StepProps {
  onComplete: () => void;
}

export default function Step2({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Everything is Numbers">
        <p>
          Neural networks only understand numbers. They can&apos;t see images, read text, or sense weather —
          they only process numerical data. This means before we can use a neural network, we must
          convert our data into numbers. This conversion is called <strong>encoding</strong> or
          <strong> representation</strong>.
        </p>
        <p>
          For our rain prediction task, the conversion is straightforward: temperature becomes a
          decimal (0.7 = warm), humidity becomes a decimal (0.8 = 80% humidity). But the same principle
          applies to everything neural networks process.
        </p>
      </ExplanationBox>

      <ExplanationBox title="How Real Weather Data Becomes Numbers">
        <p><strong>Temperature:</strong> We normalize to 0-1 scale. If typical temperatures range from 0°C to 40°C,
          then 28°C becomes 28/40 = 0.7. This &quot;normalization&quot; is crucial for neural networks.</p>

        <p><strong>Humidity:</strong> Already a percentage! 80% humidity = 0.8. Easy conversion.</p>
      </ExplanationBox>

      <ExplanationBox title="Why Normalization Matters">
        <p>
          Notice we&apos;re using values between 0 and 1 (0.7 and 0.8), not large numbers like 28 or 50000.
          This is called <strong>normalization</strong>, and it&apos;s crucial for neural network performance.
        </p>
        <p>
          Imagine if temperature ranged from 0-40 and humidity from 0-100. The larger humidity values would
          completely dominate the calculations, making it nearly impossible to learn from temperature.
          By scaling all inputs to similar ranges (typically 0-1 or -1 to 1), we give each feature
          a fair chance to influence the output.
        </p>
      </ExplanationBox>

      <MathFormula label="Normalization Formula">
        normalized = (value - min) / (max - min)
      </MathFormula>

      <WorkedExample title="Normalizing Temperature">
        <p>Let&apos;s normalize 28°C when our expected range is 0°C to 40°C:</p>
        <CalcStep number={1}>Original value: 28°C, min: 0°C, max: 40°C</CalcStep>
        <CalcStep number={2}>normalized = (28 - 0) / (40 - 0)</CalcStep>
        <CalcStep number={3}>normalized = 28 / 40 = 0.7</CalcStep>
        <p style={{ marginTop: '1rem' }}>
          A temperature of 28°C becomes 0.7 — 70% of the way between minimum and maximum.
          This makes intuitive sense and keeps our numbers in a nice range.
        </p>
      </WorkedExample>

      <ExplanationBox title="Storing Inputs in a List">
        <p>
          Real neural networks store their inputs as lists (or arrays). Here&apos;s how we create a list
          to hold our weather data:
        </p>
        <pre><code>{`# Create a list with temperature and humidity
inputs = [0.7, 0.8]

# Access elements by index (starting from 0)
temperature = inputs[0]  # 0.7
humidity = inputs[1]     # 0.8

print("Temperature:", temperature)
print("Humidity:", humidity)`}</code></pre>
        <CodeRunner code={`# Create a list with temperature and humidity
inputs = [0.7, 0.8]

# Access elements by index (starting from 0)
temperature = inputs[0]  # 0.7
humidity = inputs[1]     # 0.8

print("Temperature:", temperature)
print("Humidity:", humidity)`} />
        <p>
          This is exactly how neural networks receive information — as ordered lists of numbers.
          Whether you have 2 inputs or 2 million, the structure is the same.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Looking Ahead">
        <p>
          You&apos;ve seen how to store weather data in a list. In the next step, we&apos;ll introduce
          <strong> weights</strong> — the numbers that determine how important each input is for predicting rain.
          Should humidity matter more than temperature? The weights decide!
        </p>
      </ExplanationBox>
    </div>
  );
}
