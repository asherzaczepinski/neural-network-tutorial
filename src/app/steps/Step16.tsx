'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step16({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Backpropagation: The Complete Algorithm">
        <p>
          <strong>Backpropagation</strong> is the algorithm that makes neural network training
          possible. It efficiently computes how each weight in the network affects the final
          loss, allowing us to update all weights to improve performance.
        </p>
        <p>
          The key insight: we compute derivatives in reverse order, from output back to input.
          Each layer&apos;s delta is computed using the delta from the layer ahead of it.
        </p>
      </ExplanationBox>

      <MathFormula label="Backpropagation Flow">
        Loss → Output Delta → Hidden Deltas → Weight Gradients
      </MathFormula>

      <ExplanationBox title="The Algorithm Step by Step">
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2.2' }}>
          <li>
            <strong>Forward pass</strong>: Compute all activations, storing z and a for each layer
          </li>
          <li>
            <strong>Output delta</strong>: δ_output = (prediction - target) × sigmoid&apos;(z_output)
          </li>
          <li>
            <strong>Output gradients</strong>: ∂L/∂w₂[j] = δ_output × hidden[j]
          </li>
          <li>
            <strong>Hidden deltas</strong>: δ_hidden[i] = (δ_output × w₂[i]) × sigmoid&apos;(z_hidden[i])
          </li>
          <li>
            <strong>Hidden gradients</strong>: ∂L/∂w₁[i][j] = δ_hidden[i] × input[j]
          </li>
        </ol>
      </ExplanationBox>

      <WorkedExample title="Full Backprop Example">
        <p>Network: 2 inputs → 3 hidden → 1 output. Input [0.5, 0.8], target = 1.0</p>

        <p style={{ marginTop: '1rem' }}><strong>Forward pass (stored values):</strong></p>
        <CalcStep number={1}>z₁ = [0.78, -0.30, 0.79] (pre-activations)</CalcStep>
        <CalcStep number={2}>a₁ = [0.686, 0.426, 0.688] (hidden outputs)</CalcStep>
        <CalcStep number={3}>z₂ = 0.847, a₂ = 0.700 (output)</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Output layer backward:</strong></p>
        <CalcStep number={4}>error = 0.700 - 1.0 = -0.30</CalcStep>
        <CalcStep number={5}>δ₂ = -0.30 × sigmoid&apos;(0.847) = -0.30 × 0.21 = -0.063</CalcStep>
        <CalcStep number={6}>∂L/∂w₂[0] = δ₂ × a₁[0] = -0.063 × 0.686 = -0.043</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Hidden layer backward:</strong></p>
        <CalcStep number={7}>δ₁[0] = δ₂ × w₂[0] × sigmoid&apos;(z₁[0])</CalcStep>
        <CalcStep number={8}>δ₁[0] = -0.063 × 0.4 × 0.215 = -0.0054</CalcStep>
        <CalcStep number={9}>∂L/∂w₁[0][0] = δ₁[0] × input[0] = -0.0054 × 0.5 = -0.0027</CalcStep>
      </WorkedExample>

      <ExplanationBox title="Why Backward?">
        <p>
          We compute backwards because of efficiency. To find how a weight in layer 1 affects
          the loss, we need to know how layer 2&apos;s output affects the loss first. The chain
          rule naturally flows backward: each delta depends on the delta ahead of it.
        </p>
        <p style={{ marginTop: '1rem' }}>
          This backward flow is why it&apos;s called &quot;back&quot;-propagation! The error signal
          propagates from the output back through each layer.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Storing Values During Forward Pass">
        <p>
          Notice that backprop needs values from the forward pass (z values and activations).
          In practice, we store these during forward pass so they&apos;re available for backward.
          This is why neural networks use significant memory during training.
        </p>
      </ExplanationBox>

      <ExplanationBox title="You've Implemented Backpropagation!">
        <p>
          Congratulations! You just implemented the core algorithm that trains all neural networks.
          Every time you use ChatGPT, image recognition, or any ML model - this same algorithm
          (with optimizations) computed all the weight updates during training.
        </p>
        <p>
          The gradients tell us which direction to adjust each weight. Now we need to actually
          <em> apply</em> these updates. That&apos;s gradient descent - the final piece!
        </p>
      </ExplanationBox>
    </div>
  );
}
