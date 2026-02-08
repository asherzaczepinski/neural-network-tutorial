'use client';

import ExplanationBox from '@/components/ExplanationBox';
import CodeRunner from '@/components/CodeRunner';

interface StepProps {
  onComplete: () => void;
}

export default function Step2({ onComplete }: StepProps) {
  // Auto-complete this step when component mounts
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Our Mission: Predict Rain">
        <p>
          Throughout this course, we&apos;re building a neural network that predicts whether it will
          rain based on two weather measurements: <strong>temperature</strong> and <strong>humidity</strong>.
        </p>
        <p>
          Think about it intuitively. When you step outside on a hot, sticky summer afternoon and
          the air feels thick with moisture, you might think &quot;it&apos;s probably going to rain later.&quot;
          That&apos;s exactly what our neural network will learn to do — but with math instead of intuition.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Representing Weather as Numbers">
        <p>
          Let&apos;s represent a warm, humid day that might lead to rain. Neural networks need everything
          as numbers between 0 and 1, so:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Temperature = 0.7</strong> means a warm day (70% of max expected temp)</li>
          <li><strong>Humidity = 0.8</strong> means 80% humidity</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Try creating these variables yourself:
        </p>
        <CodeRunner code={`# Create a variable called 'temperature' and set it to 0.7

# Create a variable called 'humidity' and set it to 0.8

# Print both values using print("Temperature:", temperature)
# and print("Humidity:", humidity)
`} />
        <p>
          These two numbers are our first neural network inputs. They&apos;ll flow through weights,
          get added up, and eventually produce a rain prediction.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why These Values Matter">
        <p>
          You just saw the data that will flow through your neural network. In the real world,
          this data might come from weather sensors, but the principle is the same: <strong>everything
          in a neural network is a number</strong>.
        </p>
        <p>
          In the next module, we&apos;ll learn how to organize multiple inputs together and introduce
          <strong> weights</strong> — the values that tell our neuron how much each input matters for
          predicting rain.
        </p>
      </ExplanationBox>
    </div>
  );
}
