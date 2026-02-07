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

export default function Step7({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasE = /E\s*=\s*2\.71828/.test(code) || /e\s*=\s*2\.71828/.test(code);
    const hasDef = /def\s+sigmoid\s*\(/.test(code);
    const hasFormula = /1\s*\/\s*\(1\s*\+/.test(code);
    const hasReturn = /return/.test(code);
    const hasTest = /sigmoid\s*\(/.test(code) && /print/.test(code);

    if (hasE && hasDef && hasFormula && hasReturn && hasTest) {
      return {
        success: true,
        output: `Sigmoid function implemented perfectly!

E = 2.71828 (Euler's number)

Testing sigmoid at various inputs:
  sigmoid(-5)  = 0.0067  (very close to 0 → definitely no rain)
  sigmoid(-2)  = 0.1192  (low → probably no rain)
  sigmoid(0)   = 0.5000  (exactly in the middle → 50/50!)
  sigmoid(0.61)= 0.6478  (our z value → ~65% rain chance)
  sigmoid(2)   = 0.8808  (high → probably rain)
  sigmoid(5)   = 0.9933  (very close to 1 → definitely rain)

For our weather prediction with z = 0.61:
  rain_probability = sigmoid(0.61) = 1/(1 + e^(-0.61)) = 0.648

The sigmoid transformed our raw "weather signal" (0.61) into
a rain probability (64.8%). This is a meaningful number we can
interpret: "There's about a 65% chance of rain today."

The sigmoid squishes ANY input into the range (0, 1), perfect for probabilities!`,
      };
    }

    if (hasE && hasDef && !hasFormula) {
      return {
        success: false,
        output: `Good! You have E defined and the function started.

Now implement the formula inside the function:
  return 1 / (1 + E**(-z))

Remember: ** is the power operator in Python.
E**(-z) means E raised to the power of negative z.`,
      };
    }

    if (!hasE) {
      return {
        success: false,
        output: `First, define Euler's number:
E = 2.71828

This is the base of the natural logarithm. We need it for the sigmoid formula.
(In production code, you'd import this from the math library, but we're building from scratch!)`,
      };
    }

    return {
      success: false,
      output: `Create the sigmoid function step by step:

1. Define E = 2.71828 (Euler's number)
2. Create def sigmoid(z):
3. Return 1 / (1 + E**(-z))
4. Test it with various values`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Introducing the Sigmoid Function">
        <p>
          The sigmoid function is one of the oldest and most intuitive activation functions.
          It takes any real number and &quot;squishes&quot; it into the range (0, 1). Very negative
          numbers become close to 0; very positive numbers become close to 1; zero becomes
          exactly 0.5.
        </p>
        <p>
          This &quot;squishing&quot; property makes sigmoid perfect for rain prediction:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Probability output</strong> — outputs between 0 and 1 represent rain probability</li>
          <li><strong>Interpretable</strong> — 0.7 means &quot;70% chance of rain&quot;</li>
          <li><strong>Smooth gradient</strong> — important for training (we&apos;ll see why later)</li>
        </ul>
      </ExplanationBox>

      <MathFormula label="The Sigmoid Function">
        σ(z) = 1 / (1 + e⁻ᶻ)
      </MathFormula>

      <ExplanationBox title="Decoding the Formula">
        <p>
          Let&apos;s break down each part of this formula to understand why it works:
        </p>
        <p>
          <strong>e</strong> (Euler&apos;s number ≈ 2.71828) is a special mathematical constant,
          like π. It&apos;s the base of the natural logarithm and appears throughout mathematics.
          We use it because exponential functions have nice derivative properties (crucial for training).
        </p>
        <p>
          <strong>e⁻ᶻ</strong> (e to the power of negative z) creates an exponential decay.
          When z is large and positive (strong rain signal), e⁻ᶻ is tiny. When z is large and
          negative (strong no-rain signal), e⁻ᶻ is huge.
        </p>
        <p>
          <strong>1 + e⁻ᶻ</strong> shifts the range from (0, ∞) to (1, ∞).
        </p>
        <p>
          <strong>1 / (1 + e⁻ᶻ)</strong> flips the range from (1, ∞) to (0, 1). Brilliant!
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing Rain Probability">
        <p>Let&apos;s compute sigmoid(0.61) — our z value from the weather data:</p>

        <CalcStep number={1}>z = 0.61 (our weather signal)</CalcStep>
        <CalcStep number={2}>-z = -0.61</CalcStep>
        <CalcStep number={3}>e⁻⁰·⁶¹ = 2.71828^(-0.61) ≈ 0.543</CalcStep>
        <CalcStep number={4}>1 + e⁻⁰·⁶¹ = 1 + 0.543 = 1.543</CalcStep>
        <CalcStep number={5}>1 / 1.543 = 0.648</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          So sigmoid(0.61) ≈ <strong>0.648</strong>
        </p>
        <p>
          Our weather signal of 0.61 (moderately positive) became a rain probability of 64.8%.
          The sigmoid &quot;interpreted&quot; our weather data as &quot;likely to rain, but not certain.&quot;
        </p>
      </WorkedExample>

      <ExplanationBox title="Understanding Sigmoid's Shape">
        <p>
          Sigmoid forms an &quot;S-curve&quot; (sigmoid means &quot;S-shaped&quot; in Greek):
        </p>
        <div style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          marginTop: '1rem',
          lineHeight: '1.5'
        }}>
          <pre style={{ background: 'transparent', padding: 0 }}>
{`Rain Probability
1.0 |                 ___________ (definitely rain)
    |              __/
0.5 |           __/     <-- sigmoid(0) = 0.5 (50/50)
    |        __/
0.0 |_______/                     (definitely no rain)
    +------|------|------|-------> Weather Signal (z)
         -4     0      4`}
          </pre>
        </div>
        <p style={{ marginTop: '1rem' }}>
          The curve is steepest around z = 0 (where small changes in weather signal cause the biggest
          changes in probability) and flattens out at the extremes (very certain predictions).
        </p>
      </ExplanationBox>

      <WorkedExample title="Sigmoid for Different Weather Signals">
        <CalcStep number={1}>sigmoid(-10) = 0.00005 → 0% rain (very cold, very dry)</CalcStep>
        <CalcStep number={2}>sigmoid(-2) = 0.119 → 12% rain (cool, low humidity)</CalcStep>
        <CalcStep number={3}>sigmoid(-1) = 0.269 → 27% rain</CalcStep>
        <CalcStep number={4}>sigmoid(0) = 0.500 → 50% rain (uncertain)</CalcStep>
        <CalcStep number={5}>sigmoid(1) = 0.731 → 73% rain</CalcStep>
        <CalcStep number={6}>sigmoid(2) = 0.881 → 88% rain (humid, moderate temp)</CalcStep>
        <CalcStep number={7}>sigmoid(10) = 0.99995 → 100% rain (tropical monsoon!)</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Notice the symmetry: sigmoid(-x) = 1 - sigmoid(x). The function is perfectly
          balanced around the point (0, 0.5).
        </p>
      </WorkedExample>

      <ExplanationBox title="Why Euler's Number?">
        <p>
          You might wonder: why e specifically? Why not 2 or 10 as the base?
        </p>
        <p>
          The answer lies in calculus: e is the unique number where the derivative of eˣ
          equals eˣ itself. This makes the derivative of sigmoid beautifully simple:
        </p>
        <p style={{
          background: 'var(--bg-tertiary)',
          padding: '0.75rem',
          borderRadius: '6px',
          fontFamily: 'monospace',
          margin: '1rem 0',
          textAlign: 'center'
        }}>
          sigmoid&apos;(z) = sigmoid(z) × (1 - sigmoid(z))
        </p>
        <p>
          We can compute the derivative using just the output! No need to recalculate the
          exponential. This efficiency matters when training networks with millions of neurons.
          We&apos;ll use this derivative during backpropagation.
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Implement the sigmoid function from scratch. We&apos;ll define Euler&apos;s number ourselves
          (no math library!) and build the function to convert weather signals into rain probabilities.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Define <code>E = 2.71828</code> (Euler&apos;s number)</li>
          <li>Create <code>def sigmoid(z):</code></li>
          <li>Return <code>1 / (1 + E**(-z))</code></li>
          <li>Test it with various values including our z = 0.61</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`# Euler's number (base of natural logarithm)
E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

# Test at various points
print("sigmoid(-5) =", sigmoid(-5))
print("sigmoid(0) =", sigmoid(0))
print("sigmoid(0.61) =", sigmoid(0.61))  # Our weather signal!
print("sigmoid(5) =", sigmoid(5))`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`# Define Euler's number (approximately 2.71828)
# This is the base of the natural logarithm


# Create the sigmoid function
def sigmoid(z):
    # Return 1 / (1 + E**(-z))
    pass

# Test your sigmoid function
# Try various inputs to see the S-curve behavior
print("sigmoid(-5) =")
print("sigmoid(0) =")
print("sigmoid(0.61) =")  # Our weather signal!
print("sigmoid(5) =")
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement sigmoid from scratch..."
        minHeight={280}
      />

      <ExplanationBox title="You've Built the Core Components!">
        <p>
          With sigmoid implemented, you now have all the pieces for a complete neuron:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li>✓ Inputs (temperature, humidity)</li>
          <li>✓ Weights (importance of each measurement)</li>
          <li>✓ Dot product (weighted combination)</li>
          <li>✓ Bias (baseline rain tendency)</li>
          <li>✓ Sigmoid (converts to probability)</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          In the next step, we&apos;ll combine these into a complete, reusable neuron function
          that takes weather data and produces a rain probability. Then we&apos;ll start building
          layers and full networks!
        </p>
      </ExplanationBox>
    </div>
  );
}
