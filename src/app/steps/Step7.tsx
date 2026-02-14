'use client';

import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

export default function Step8() {
  return (
    <div>
      <ExplanationBox title="The Problem: Our Numbers Are All Over the Place">
        <p>
          In the last step, we computed our neuron&apos;s pre‑activation value: <strong>z = 0.61</strong>.
          However, z can be any number. With different inputs and weights, you might get:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>z = 0.61 (our rain neuron)</li>
          <li>z = -5.2 (based on a cloud-free sky)</li>
          <li>z = 47.3 (another neuron with extreme confidence)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Here&apos;s the challenge: How do we compare all these neurons? If one neuron outputs
          z = 47.3 and another outputs z = 0.61, which is more confident? How much more? How can
          we compare a negative and a positive value? We can&apos;t just compare raw z values —
          we need a <strong>common scale</strong>!
        </p>
      </ExplanationBox>

      <WorkedExample title="What Sigmoid Does: Squish Everything to 0-1">
        <p>Let&apos;s see what sigmoid does to various neuron outputs:</p>

        <CalcStep number={1}>z = -10 → sigmoid(-10) = 0.00005 → &quot;Almost certainly NO rain&quot;</CalcStep>
        <CalcStep number={2}>z = -2 → sigmoid(-2) = 0.12 → &quot;12% chance, probably dry&quot;</CalcStep>
        <CalcStep number={3}>z = 0 → sigmoid(0) = 0.50 → &quot;50/50, completely uncertain&quot;</CalcStep>
        <CalcStep number={4}>z = 0.61→ sigmoid(0.61)= 0.65 → &quot;65% chance, likely rain&quot;</CalcStep>
        <CalcStep number={5}>z = 2 → sigmoid(2) = 0.88 → &quot;88% chance, probably rain&quot;</CalcStep>
        <CalcStep number={6}>z = 10 → sigmoid(10) = 0.99995 → &quot;Almost certainly rain&quot;</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          See the pattern? The more positive z is, the closer to 1 (certain rain).
          The more negative z is, the closer to 0 (certain no rain).
          And z = 0 is the perfect tipping point at 50%.
        </p>
      </WorkedExample>

      <ExplanationBox title="The Sigmoid Formula">
        <div style={{
          background: '#f8fafc',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontFamily: 'Georgia, serif',
            display: 'inline-block'
          }}>
            <div style={{ marginBottom: '8px' }}>
              sigmoid(z) =
              <span style={{
                display: 'inline-block',
                textAlign: 'center',
                verticalAlign: 'middle',
                marginLeft: '12px'
              }}>
                <div style={{ fontSize: '28px', paddingBottom: '4px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', margin: '0 auto', width: '140px' }}></div>
                <div style={{ fontSize: '28px', paddingTop: '4px' }}>1 + e<sup>−z</sup></div>
              </span>
            </div>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '14px', color: '#64748b' }}>
            where e ≈ 2.718 (Euler&apos;s number)
          </div>
        </div>
      </ExplanationBox>

      <WorkedExample title="How Sigmoid Transforms Different Values">
        <p>
          Let&apos;s see how sigmoid transforms different z values. Notice the pattern in the calculations:
        </p>

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '1rem'
        }}>
          {/* z = 0 */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              z = 0:
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '18px' }}>sigmoid(0) = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '80px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + e<sup>0</sup></div>
              </span>
              <span style={{ fontSize: '18px' }}> = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '60px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + 1</div>
              </span>
              <span style={{ fontSize: '18px' }}> = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '30px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>2</div>
              </span>
              <span style={{ fontSize: '18px' }}> = <strong style={{ color: '#2563eb' }}>0.5</strong></span>
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              When z = 0, we have neutral probabilities. Since e<sup>0</sup> = 1, we get 1/(1+1) = 1/2 = 50% chance!
            </div>
          </div>

          {/* z = 5 */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              z = 5:
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '18px' }}>sigmoid(5) = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '80px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + e<sup>-5</sup></div>
              </span>
              <span style={{ fontSize: '18px' }}> = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '110px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + 0.0067</div>
              </span>
              <span style={{ fontSize: '18px' }}> ≈ <strong style={{ color: '#2563eb' }}>0.993</strong></span>
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              e<sup>-5</sup> is very small (0.0067), so the denominator is close to 1, making the output close to 1
            </div>
          </div>

          {/* z = 10 */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              z = 10:
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '18px' }}>sigmoid(10) = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '90px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + e<sup>-10</sup></div>
              </span>
              <span style={{ fontSize: '18px' }}> = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '130px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + 0.000045</div>
              </span>
              <span style={{ fontSize: '18px' }}> ≈ <strong style={{ color: '#2563eb' }}>0.99995</strong></span>
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              e<sup>-10</sup> is extremely small, so the denominator is almost exactly 1, making the output almost exactly 1
            </div>
          </div>

          {/* z = 100 */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              z = 100:
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '18px' }}>sigmoid(100) = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '100px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + e<sup>-100</sup></div>
              </span>
              <span style={{ fontSize: '18px' }}> ≈ </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '60px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>1 + 0</div>
              </span>
              <span style={{ fontSize: '18px' }}> ≈ <strong style={{ color: '#2563eb' }}>1.0</strong></span>
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              e<sup>-100</sup> is so tiny it&apos;s essentially 0, so we get 1/1 = 1
            </div>
          </div>
        </div>
      </WorkedExample>

      <ExplanationBox title="The Pattern: Bigger z → Smaller Denominator → Bigger Output">
        <p>
          As z gets bigger, e<sup>-z</sup> gets smaller. When the bottom of the fraction (denominator)
          gets smaller by approaching 1, the overall fraction gets bigger (approaching 1). That&apos;s
          why large positive inputs give outputs close to 1, while large negative inputs give outputs
          close to 0!
        </p>
      </ExplanationBox>

      <ExplanationBox title="A Note on Extreme Values">
        <p>
          You may have noticed that z = 10 and z = 100 produce nearly the same result (0.99995 vs 1.0)
          even though they&apos;re very far apart. This would normally be an issue because both values
          would activate the neuron&apos;s confidence at essentially the same level, even though the
          inputs are quite different.
        </p>
        <p style={{ marginTop: '1rem' }}>
          However, even though we used z = 100 as an example, you would rarely ever have a z value
          above 10 in practice. Remember we used normalization at the start (turning values like 60
          degrees into 0.6), and weights are typically initialized to small values between -1 and 1.
          When you multiply normalized inputs (0 to 1) by small weights (-1 to 1) and add them
          together, you naturally get moderate z values, not extreme ones!
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Math Behind z Value Ranges">
        <p>
          Let&apos;s understand why z values stay in a predictable range. Recall that z is the weighted sum:
        </p>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem',
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          textAlign: 'center'
        }}>
          z = w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + ... + w<sub>n</sub>x<sub>n</sub> + b
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b' }}>
            After Normalization
          </div>
          <p>
            Most ML pipelines normalize inputs to have mean ≈ 0 and standard deviation ≈ 1. This means:
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li><strong>68%</strong> of input values fall in [-1, 1]</li>
            <li><strong>95%</strong> of input values fall in [-2, 2]</li>
            <li><strong>99.7%</strong> of input values fall in [-3, 3]</li>
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b' }}>
            Weight Initialization
          </div>
          <p>
            When a neural network first starts, it doesn&apos;t know anything yet — so weights are set
            to small random values. But not just any random values! Networks use <strong>Xavier/Glorot
            initialization</strong>, which picks random weights from a specific range.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Example: If you have 2 inputs, Xavier initialization might pick random weights between
            roughly -0.7 and +0.7. If you have 10 inputs, it uses a tighter range like -0.3 to +0.3.
            The formula is variance ≈ 1/n (where n = number of inputs).
          </p>
          <ul style={{ marginTop: '0.75rem', lineHeight: '1.8' }}>
            <li><strong>Why?</strong> If weights are too large, signals &quot;explode&quot; (get huge).</li>
            <li>If weights are too small, signals &quot;vanish&quot; (get tiny).</li>
            <li>Xavier initialization keeps them just right!</li>
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b' }}>
            The Result: z Distribution
          </div>
          <p>
            When you multiply normalized inputs (standard deviation ≈ 1) by properly initialized weights,
            the math works out so that z values also have a standard deviation ≈ 1. This means most
            z values naturally fall between -3 and +3, right in the range where sigmoid is most sensitive!
          </p>
        </div>
      </ExplanationBox>

      <ExplanationBox title="Why This Matters for Sigmoid">
        <p>
          Sigmoid is most sensitive (has the steepest slope) when z is between -4 and +4. Outside that
          range, the gradient approaches zero and the neuron &quot;saturates&quot; at 0 or 1. Good
          initialization tries to keep z inside this sensitive window so the network can learn effectively!
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why Use e (Euler's Number)?">
        <p>
          You might wonder: why use e ≈ 2.718 instead of a simpler number like 2 or 10?
        </p>
        <p style={{ marginTop: '1rem' }}>
          The answer has to do with <strong>backpropagation</strong> — the process where the neural
          network adjusts its weights to become more accurate. Using e makes the math for updating
          weights much simpler and more efficient. When we get to the backpropagation section later,
          you&apos;ll see exactly why e is the perfect choice!
        </p>
      </ExplanationBox>

    </div>
  );
}
