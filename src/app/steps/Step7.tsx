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
    const hasImport = /import\s+math/.test(code);
    const hasDef = /def\s+sigmoid\s*\(/.test(code);
    const hasFormula = /1\s*\/\s*\(1\s*\+/.test(code) && /math\.exp\s*\(/.test(code);
    const hasReturn = /return/.test(code);
    const hasTest = /sigmoid\s*\(/.test(code) && /print/.test(code);

    if (hasImport && hasDef && hasFormula && hasReturn && hasTest) {
      return {
        success: true,
        output: `Sigmoid function implemented perfectly!

Testing sigmoid at various inputs:
  sigmoid(-5)  = 0.0067  (very close to 0 → confident "no")
  sigmoid(-2)  = 0.1192  (low probability)
  sigmoid(0)   = 0.5000  (exactly 50/50 — completely uncertain!)
  sigmoid(2)   = 0.8808  (high probability)
  sigmoid(5)   = 0.9933  (very close to 1 → confident "yes")

Notice the S-curve behavior:
• Biggest changes happen near 0 (most sensitive when uncertain)
• Extremes flatten out (stable when confident)
• Any input gets squished into (0, 1) — perfect for probabilities!

Your Step 6 layer outputs can now be converted to meaningful
probabilities that we can interpret and use for predictions.`,
      };
    }

    if (hasImport && hasDef && !hasFormula) {
      return {
        success: false,
        output: `Good! You have math imported and the function started.

Now implement the formula inside the function:
  return 1 / (1 + math.exp(-z))

math.exp(-z) calculates e raised to the power of -z.`,
      };
    }

    if (!hasImport) {
      return {
        success: false,
        output: `First, import the math library:
import math

This gives us math.exp() which calculates e raised to a power.`,
      };
    }

    return {
      success: false,
      output: `Create the sigmoid function step by step:

1. import math
2. Create def sigmoid(z):
3. Return 1 / (1 + math.exp(-z))
4. Test it with various values`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Introducing the Sigmoid Function">
        <p>
          Remember in Step 6, you built a layer with multiple neurons? Each neuron computed
          a weighted sum plus bias — but those raw numbers could be anything: -50, 1000, whatever.
          How do we turn these into meaningful predictions like &quot;70% chance of rain&quot;?
        </p>
        <p>
          The sigmoid function solves this problem perfectly. It takes any number and
          &quot;squishes&quot; it into a probability between 0 and 1:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Probability output</strong> — no matter what your neuron computes, sigmoid converts it to a value between 0 and 1</li>
          <li><strong>Interpretable</strong> — 0.7 directly means &quot;70% chance of rain&quot; — no extra conversion needed</li>
          <li><strong>Prevents layer collapse</strong> — this is crucial! Because sigmoid is curved, stacking layers creates genuinely more powerful networks</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Very negative inputs become close to 0 (confident &quot;no&quot;). Very positive inputs become
          close to 1 (confident &quot;yes&quot;). Zero becomes exactly 0.5 (completely uncertain).
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why the Curve Prevents Layer Collapse">
        <p>
          Let&apos;s trace through a concrete weather example to see why sigmoid&apos;s curve is essential.
          We&apos;ll predict rain using temperature and humidity, first without sigmoid, then with it.
        </p>

        <p style={{ marginTop: '1rem' }}>
          <strong>Our weather data (normalized to 0-1 range):</strong>
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Temperature: 25°C → normalized to <strong>0.7</strong> (where 0 = freezing, 1 = very hot)</li>
          <li>Humidity: 80% → normalized to <strong>0.8</strong> (where 0 = dry, 1 = saturated)</li>
        </ul>

        <p style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <strong>WITHOUT SIGMOID (linear only) — The Problem:</strong>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Our hidden layer has two neurons. Think of them as trying to detect different weather patterns:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Hidden neuron 1</strong> (&quot;warm and somewhat humid&quot; detector):<br />
            weights [0.5, 0.3], bias 0.1<br />
            Computes: 0.7 × 0.5 + 0.8 × 0.3 + 0.1 = 0.35 + 0.24 + 0.1 = <strong>0.69</strong></li>
          <li style={{ marginTop: '0.5rem' }}><strong>Hidden neuron 2</strong> (&quot;humid but not too hot&quot; detector):<br />
            weights [-0.2, 0.6], bias 0.2<br />
            Computes: 0.7 × (-0.2) + 0.8 × 0.6 + 0.2 = -0.14 + 0.48 + 0.2 = <strong>0.54</strong></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Output layer</strong> (combines the hidden signals into final prediction):<br />
          weights [0.4, 0.7], bias 0.05<br />
          Computes: 0.69 × 0.4 + 0.54 × 0.7 + 0.05 = 0.276 + 0.378 + 0.05 = <strong>0.704</strong>
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          So our two-layer network says: 0.704 chance of rain. Seems useful, right?
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Here&apos;s the devastating problem:</strong> We can find a SINGLE layer that produces the
          exact same answer! If we work out the algebra, a single layer with weights [0.06, 0.54] and
          bias 0.232 applied directly to our inputs gives:
        </p>
        <p style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          0.7 × 0.06 + 0.8 × 0.54 + 0.232 = 0.042 + 0.432 + 0.23 = <strong>0.704</strong>
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Identical! The hidden layer did absolutely nothing useful. All those extra neurons and weights
          collapsed into what one simple layer could do. This isn&apos;t a coincidence — it happens with ANY
          purely linear operations. Mathematically, stacking linear transformations always collapses into
          a single linear transformation.
        </p>

        <p style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <strong>WITH SIGMOID (non-linear) — The Solution:</strong>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Same network, same weights, same inputs. But now we apply sigmoid after each neuron:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Hidden neuron 1:</strong><br />
            Linear part: 0.7 × 0.5 + 0.8 × 0.3 + 0.1 = 0.69<br />
            After sigmoid: sigmoid(0.69) = <strong>0.666</strong></li>
          <li style={{ marginTop: '0.5rem' }}><strong>Hidden neuron 2:</strong><br />
            Linear part: 0.7 × (-0.2) + 0.8 × 0.6 + 0.2 = 0.54<br />
            After sigmoid: sigmoid(0.54) = <strong>0.632</strong></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>Output layer:</strong><br />
          Linear part: 0.666 × 0.4 + 0.632 × 0.7 + 0.05 = 0.266 + 0.442 + 0.05 = 0.759<br />
          After sigmoid: sigmoid(0.759) = <strong>0.681</strong>
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Now try to find a single layer that replicates 0.681 — <strong>you can&apos;t!</strong> The curved
          sigmoid transformations in the middle create a result that no single linear combination of
          temperature and humidity can produce. The hidden layer genuinely adds computational power.
        </p>

        <p style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <strong>Why This Matters for Weather Prediction:</strong>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          A single layer can only learn simple rules like &quot;more humidity = more rain&quot; — straight-line
          relationships. But real weather is more complex: rain is likely when temperature is moderate
          (not too hot, not too cold) AND humidity is high. That&apos;s a curved boundary that requires
          combining features in non-obvious ways.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          With sigmoid between layers, the network can learn these complex patterns. The hidden neurons
          can each detect different conditions, and those curved outputs combine in the output layer
          to create decision boundaries that curve, bend, and capture real-world complexity.
        </p>
      </ExplanationBox>

      <MathFormula label="The Sigmoid Function">
        output = 1 / (1 + e^(-input))
      </MathFormula>

      <ExplanationBox title="Breaking Down the Formula">
        <p>
          This looks intimidating, but it&apos;s actually four simple operations chained together:
        </p>
        <p>
          <strong>Step 1: Flip the sign of your input</strong><br />
          If your weighted sum was 2.5, you compute -2.5. If it was -3, you get 3.
          This flip is what makes positive inputs become high probabilities and negative inputs become low probabilities.
        </p>
        <p>
          <strong>Step 2: Raise e to that power</strong><br />
          e is a special number (approximately 2.71828) called Euler&apos;s number. You might wonder: why e instead of 2 or 10?
          We could make a &quot;squishing function&quot; with any base.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          The answer is about training. When we train the network, we need to figure out: &quot;If I nudge this weight
          up a tiny bit, does the error go up or down?&quot; This is called computing the derivative. Here&apos;s where
          e is magical — when you use e as the base, the derivative of sigmoid can be calculated using just the
          sigmoid value you already computed:
        </p>
        <p style={{
          background: 'var(--bg-tertiary)',
          padding: '0.75rem',
          borderRadius: '6px',
          fontFamily: 'monospace',
          margin: '0.75rem 0',
          textAlign: 'center'
        }}>
          derivative = output × (1 - output)
        </p>
        <p>
          That&apos;s it! If your sigmoid output was 0.7, the derivative is just 0.7 × 0.3 = 0.21. No need to redo
          any exponential calculations. With base 2 or 10, you&apos;d need extra steps involving logarithms every
          single time. When training millions of weights billions of times, this efficiency matters enormously.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          When you raise e to a negative power, you get a small number. When you raise it to a positive power, you get a big number:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
          <li>A positive input (like 5) becomes e^(-5) which is tiny (about 0.007)</li>
          <li>A negative input (like -5) becomes e^(5) which is huge (about 148)</li>
        </ul>
        <p>
          <strong>Step 3: Add 1</strong><br />
          This shifts everything so the smallest possible value is 1 (instead of 0). Now our range is 1 to infinity.
        </p>
        <p>
          <strong>Step 4: Divide 1 by that result</strong><br />
          This is the magic step! Dividing 1 by a number between 1 and infinity gives you a number between 0 and 1 —
          exactly the probability range we need. If the denominator is close to 1, you get close to 1 (high probability).
          If the denominator is huge, you get close to 0 (low probability).
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing Rain Probability — Extreme Examples">
        <p>Let&apos;s see sigmoid handle extreme signals. Imagine your network produces a massive positive signal of 10:</p>

        <CalcStep number={1}>input = 10 (extremely strong &quot;yes&quot; signal)</CalcStep>
        <CalcStep number={2}>Flip sign → -10</CalcStep>
        <CalcStep number={3}>e^(-10) ≈ 0.000045 (incredibly tiny!)</CalcStep>
        <CalcStep number={4}>1 + 0.000045 = 1.000045</CalcStep>
        <CalcStep number={5}>1 / 1.000045 = 0.99995 → 99.995% confidence!</CalcStep>

        <p style={{ marginTop: '1rem' }}>Now an extreme negative signal of -10:</p>

        <CalcStep number={1}>input = -10 (extremely strong &quot;no&quot; signal)</CalcStep>
        <CalcStep number={2}>Flip sign → 10</CalcStep>
        <CalcStep number={3}>e^(10) ≈ 22,026 (enormous!)</CalcStep>
        <CalcStep number={4}>1 + 22,026 = 22,027</CalcStep>
        <CalcStep number={5}>1 / 22,027 = 0.000045 → 0.0045% confidence</CalcStep>

        <p style={{ marginTop: '1rem' }}>And what about 0 (completely neutral)?</p>

        <CalcStep number={1}>input = 0 (no signal either way)</CalcStep>
        <CalcStep number={2}>Flip sign → 0</CalcStep>
        <CalcStep number={3}>e^(0) = 1 (any number to the 0 power is 1)</CalcStep>
        <CalcStep number={4}>1 + 1 = 2</CalcStep>
        <CalcStep number={5}>1 / 2 = 0.5 → exactly 50%!</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          The sigmoid converts any input into a meaningful probability. This is exactly what
          we need to make the outputs from Step 6 interpretable!
        </p>
      </WorkedExample>

      <ExplanationBox title="Understanding Sigmoid's Shape">
        <p>
          <strong>The key insight:</strong> Small changes in the input cause the biggest changes in probability
          when you&apos;re near 0. Moving from input 0 to input 1 changes the probability from 50% to 73% — a 23% jump!
          But moving from input 5 to input 6 only changes probability from 99.3% to 99.75% — less than half a percent.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          At the edges, the curve becomes nearly flat. Once the network is already very confident, additional
          evidence barely moves the needle. This matches how we want predictions to work: be responsive when
          uncertain, stable when confident.
        </p>
      </ExplanationBox>

      <WorkedExample title="Sigmoid for Different Input Signals">
        <CalcStep number={1}>sigmoid(-10) = 0.00005 → ~0% (extremely confident no)</CalcStep>
        <CalcStep number={2}>sigmoid(-2) = 0.119 → 12%</CalcStep>
        <CalcStep number={3}>sigmoid(-1) = 0.269 → 27%</CalcStep>
        <CalcStep number={4}>sigmoid(0) = 0.500 → 50% (completely uncertain)</CalcStep>
        <CalcStep number={5}>sigmoid(1) = 0.731 → 73%</CalcStep>
        <CalcStep number={6}>sigmoid(2) = 0.881 → 88%</CalcStep>
        <CalcStep number={7}>sigmoid(10) = 0.99995 → ~100% (extremely confident yes)</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Notice how the biggest jumps happen near 0: from -1 to 0 is a 23% jump (27% → 50%),
          and from 0 to 1 is another 23% jump (50% → 73%). But from 2 to 10? Only an 11% change
          (88% → 99.995%). The function is most sensitive when uncertain!
        </p>
      </WorkedExample>

      <TaskBox>
        <p>
          Implement the sigmoid function. Python&apos;s math library has <code>math.exp(x)</code> which
          calculates e raised to the power of x — perfect for our formula!
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Import the math library</li>
          <li>Create <code>def sigmoid(z):</code></li>
          <li>Return <code>1 / (1 + math.exp(-z))</code></li>
          <li>Test it with various values to see the S-curve behavior</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

# Test at various points
print("sigmoid(-5) =", sigmoid(-5))
print("sigmoid(0) =", sigmoid(0))
print("sigmoid(2) =", sigmoid(2))
print("sigmoid(5) =", sigmoid(5))`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`import math

# Create the sigmoid function
def sigmoid(z):
    # Return 1 / (1 + math.exp(-z))
    pass

# Test your sigmoid function
# Try various inputs to see the S-curve behavior
print("sigmoid(-5) =")
print("sigmoid(0) =")
print("sigmoid(2) =")
print("sigmoid(5) =")
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement sigmoid..."
        minHeight={250}
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
