'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step4({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="What Are Weights?">
        <p>
          A weight is a number that controls how much an input affects the output. Higher weight
          = more influence. Lower weight = less influence. Negative weight = works against the output.
        </p>
        <p>
          Weights decide what variables matter in the final prediction. We&apos;ll keep coming back
          to them throughout this course.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Weights for Rain Prediction">
        <p>
          For predicting rain, we&apos;ll use these weights:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Temperature weight: -0.3</strong> — Higher temperature slightly <em>reduces</em> rain
            prediction (hot air holds more moisture before condensing). Conversely, lower temperatures
            increase the rain signal.</li>
          <li><strong>Humidity weight: 0.9</strong> — Higher humidity strongly <em>increases</em> rain
            prediction (more moisture = more likely to rain). Lower humidity decreases the rain signal.</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          <strong>Side note:</strong> We&apos;re manually setting these weights to values that make sense.
          In practice, weights start as small random numbers (typically between -1 and 1), and the
          network <em>learns</em> the right values through training. We&apos;ll see this later.
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

    </div>
  );
}
