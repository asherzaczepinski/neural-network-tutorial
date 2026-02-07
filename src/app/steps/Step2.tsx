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

export default function Step2({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasInputs = /inputs\s*=\s*\[\s*0\.7\s*,\s*0\.8\s*\]/.test(code);
    const hasAccess = /inputs\s*\[\s*0\s*\]/.test(code) && /inputs\s*\[\s*1\s*\]/.test(code);
    const hasPrint = /print/.test(code);

    if (hasInputs && hasAccess && hasPrint) {
      return {
        success: true,
        output: `Weather data list created and accessed!

inputs = [0.7, 0.8]
inputs[0] = 0.7  (temperature - first element)
inputs[1] = 0.8  (humidity - second element)

You've just built your first data structure from scratch! This list holds
our weather measurements together in one neat package.

The neural network will process these numbers the same way regardless of
whether you have 2 inputs or 2 million — the math scales up identically!`,
      };
    }

    if (hasInputs && !hasAccess) {
      return {
        success: false,
        output: `Good start! You created the list correctly.

Now you need to access the elements:
- inputs[0] gives you the temperature (0.7)
- inputs[1] gives you the humidity (0.8)

Try printing both values to verify they work.`,
      };
    }

    return {
      success: false,
      output: `Create a list called 'inputs' containing [0.7, 0.8]

In Python, lists use square brackets:
inputs = [value1, value2]

Then access elements with inputs[0] and inputs[1]`,
    };
  };

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

      <TaskBox>
        <p>
          Create a list to hold our weather data. This is how real neural networks store their inputs —
          as ordered collections of numbers.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Create a list called <code>inputs</code> containing <code>[0.7, 0.8]</code></li>
          <li>Access the temperature using <code>inputs[0]</code></li>
          <li>Access the humidity using <code>inputs[1]</code></li>
          <li>Print both values to verify they work</li>
        </ol>
      </TaskBox>

      <Hint>
        <p>Here&apos;s the structure you need:</p>
        <pre style={{ marginTop: '0.5rem' }}>
{`# Create the list
inputs = [0.7, 0.8]

# Access elements
temperature = inputs[0]
humidity = inputs[1]

# Print them
print("Temperature:", inputs[0])
print("Humidity:", inputs[1])`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`# Create a list called 'inputs' with temperature (0.7) and humidity (0.8)


# Access and print the temperature (index 0)


# Access and print the humidity (index 1)

`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Build your weather inputs list and access its elements..."
        minHeight={180}
      />

      <ExplanationBox title="Looking Ahead">
        <p>
          You&apos;ve created a list that holds your weather data. This is exactly how neural networks
          receive information — as lists (or arrays, or tensors) of numbers.
        </p>
        <p>
          In the next step, we&apos;ll introduce <strong>weights</strong> — the numbers that determine
          how important each input is for predicting rain. Should humidity matter more than temperature?
          The weights decide! And when we &quot;train&quot; the network, we&apos;re finding the right weight values.
        </p>
      </ExplanationBox>
    </div>
  );
}
