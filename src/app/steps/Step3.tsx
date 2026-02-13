'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';


export default function Step3() {
  return (
    <div>
      <ExplanationBox title="Converting Data to Numbers">
        <p>
          Neural networks only understand numbers. Before we can predict rain, we need to convert
          our weather data into decimals between 0 and 1.
        </p>
        <p>
          <strong>Temperature:</strong> We normalize to a 0-1 scale. If temperatures range from 0°C to 40°C,
          then 28°C becomes 28/40 = 0.7.
        </p>
        <p>
          <strong>Humidity:</strong> Already a percentage! 80% humidity = 0.8.
        </p>
      </ExplanationBox>
      <MathFormula label="Normalization Formula">
        normalized = (value - min) / (max - min)
      </MathFormula>
      <ExplanationBox title="Why Normalization Matters">
        <p>
          Notice we&apos;re using values between 0 and 1 (0.7 and 0.8), not large numbers like 28 or 50000.
          This is called <strong>normalization</strong>, and it&apos;s crucial for neural network performance.
        </p>
        <p>
          Imagine if temperature ranged from 0-40 and humidity from 0-100. The larger humidity values would
          completely dominate the calculations, making it nearly impossible to learn from temperature.
          By scaling all inputs to similar ranges we give each feature
          a fair chance to influence the output.
        </p>
      </ExplanationBox>

      
    </div>
  );
}
