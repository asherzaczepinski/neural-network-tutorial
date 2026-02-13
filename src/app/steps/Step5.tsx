'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

export default function Step5() {
  return (
    <div>
      <ExplanationBox title="What is Bias?">
        <p>
          Weights control how much each input matters. But what if we want the neuron to have a
          starting assumption <em>before</em> it even looks at the inputs?
        </p>
        <p>
          <strong>Bias</strong> is a number that shifts the neuron&apos;s decision threshold. It&apos;s
          added after the weighted sum, and it lets the neuron say &quot;I&apos;m already leaning toward
          yes&quot; or &quot;I&apos;m already leaning toward no&quot; before considering any evidence.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Weights + Bias = The Full Picture">
        <p>
          Here&apos;s how weights and bias work together to make predictions:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Weights</strong> decide which inputs matter and by how much. High weight on humidity?
            Humidity has a big influence. Negative weight on temperature? Higher temps push the prediction down.</li>
          <li><strong>Bias</strong> is our starting assumption about how important this neuron is. Before
            looking at any inputs, should this neuron already be leaning toward firing or staying quiet?</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Together, they answer: &quot;Which inputs matter, how much do they matter, and what&apos;s our
          starting assumption?&quot; During training, the network adjusts both weights AND bias to find
          the combination that makes the best predictions.
        </p>
      </ExplanationBox>

      <MathFormula label="Neuron Calculation (so far)">
        output = (input₁ × weight₁) + (input₂ × weight₂) + bias
      </MathFormula>


      <ExplanationBox title="How Neural Networks Initialize Bias">
        <p>
          When a neural network first starts, it doesn&apos;t know anything yet—so how should bias
          be set? The most common approach is to initialize all biases to <strong>zero</strong>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Why zero? Starting at zero means the neuron begins with no preference—it&apos;s completely
          neutral. This works well because:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>The weights (which start as small random values) can still create diverse initial
            behaviors across different neurons</li>
          <li>Zero bias lets the network learn the right threshold during training without any assumptions</li>
          <li>It prevents neurons from being too active or too quiet at the start</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Some specialized architectures use different initialization strategies (like initializing
          bias to a small positive value for certain activation functions), but zero is the standard
          default that works well in most cases.
        </p>
      </ExplanationBox>
    </div>
  );
}
