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

export default function Step5({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasDef = /def\s+dot_product\s*\(/.test(code);
    const hasLoop = /for\s+/.test(code);
    const hasReturn = /return/.test(code);
    const hasCall = /dot_product\s*\(/.test(code);

    if (hasDef && hasLoop && hasReturn && hasCall) {
      return {
        success: true,
        output: `Dot product function created!

def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

Testing with inputs=[0.7, 0.8] and weights=[-0.3, 0.9]:
dot_product(inputs, weights) = 0.51

This is the same as:
  inputs[0]*weights[0] + inputs[1]*weights[1]
  = 0.7*(-0.3) + 0.8*0.9
  = -0.21 + 0.72
  = 0.51

You just implemented a fundamental operation from linear algebra! The dot product
is used billions of times in every neural network forward pass. NumPy does this
with optimized C code, but you now understand exactly what's happening inside.

For rain prediction, this dot product combines:
- How warm it is × how much temperature matters
- How humid it is × how much humidity matters
Into one single "weather signal" number!`,
      };
    }

    if (hasDef && !hasLoop) {
      return {
        success: false,
        output: `Good start! You defined the function.

Now use a for loop to iterate through the elements:

for i in range(len(a)):
    # multiply a[i] * b[i] and add to result

Don't forget to initialize result = 0 before the loop!`,
      };
    }

    if (hasDef && hasLoop && !hasReturn) {
      return {
        success: false,
        output: `Almost there! You have the loop.

Don't forget to return the result at the end of the function:

return result`,
      };
    }

    return {
      success: false,
      output: `Create a function called dot_product that takes two lists (a and b):

def dot_product(a, b):
    # your code here

It should multiply corresponding elements and sum them up.`,
    };
  };

  return (
    <div>
      <ExplanationBox title="What Is a Dot Product?">
        <p>
          The dot product (also called inner product or scalar product) is one of the most
          important operations in mathematics and machine learning. It takes two lists of
          numbers and produces a single number by multiplying corresponding elements and
          summing the results.
        </p>
        <p>
          We&apos;ve actually been computing dot products all along! When we calculated
          <code>inputs[0]*weights[0] + inputs[1]*weights[1]</code>, that <em>is</em> the dot
          product of inputs and weights. Now we&apos;ll create a reusable function that works
          for lists of any length — whether you have 2 weather measurements or 2 million.
        </p>
      </ExplanationBox>

      <MathFormula label="Dot Product Definition">
        a · b = a₀×b₀ + a₁×b₁ + a₂×b₂ + ... + aₙ×bₙ
      </MathFormula>

      <ExplanationBox title="Why the Dot Product Matters">
        <p>
          The dot product is everywhere in neural networks:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Every neuron</strong> computes a dot product of inputs and weights</li>
          <li><strong>Matrix multiplication</strong> (used between layers) is many dot products</li>
          <li><strong>Attention mechanisms</strong> in transformers use dot products to measure similarity</li>
          <li><strong>Convolutional layers</strong> compute dot products between filters and image patches</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          For our rain prediction, the dot product asks: &quot;How well do these weather conditions
          match the pattern for rain?&quot; A high positive result = likely rain. Negative = likely dry.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Geometric Meaning">
        <p>
          The dot product has a beautiful geometric interpretation: it measures how &quot;aligned&quot;
          two vectors are. If two vectors point in the same direction, their dot product is
          large and positive. If they&apos;re perpendicular, it&apos;s zero. If they point in opposite
          directions, it&apos;s large and negative.
        </p>
        <p>
          In neural networks, this means: the dot product of inputs and weights is large when
          the input pattern &quot;matches&quot; what the weights are looking for. A rain-predicting neuron
          essentially asks &quot;how similar is this weather to rainy weather patterns?&quot;
        </p>
      </ExplanationBox>

      <WorkedExample title="Computing Dot Product By Hand">
        <p>Let&apos;s compute dot_product([0.7, 0.8], [-0.3, 0.9]):</p>

        <CalcStep number={1}>First pair: 0.7 × -0.3 = -0.21</CalcStep>
        <CalcStep number={2}>Second pair: 0.8 × 0.9 = 0.72</CalcStep>
        <CalcStep number={3}>Sum: -0.21 + 0.72 = 0.51</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          Result: <strong>0.51</strong>
        </p>
        <p>
          With 3 elements [a, b, c] · [x, y, z]: a×x + b×y + c×z
        </p>
        <p>
          With 100 weather measurements: same pattern, just more terms to add.
        </p>
      </WorkedExample>

      <ExplanationBox title="Building the Function">
        <p>
          We&apos;ll build a <code>dot_product</code> function step by step:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Initialize a result variable to 0</strong> — we&apos;ll accumulate the sum here</li>
          <li><strong>Loop through each index</strong> — using <code>range(len(a))</code> to get indices 0, 1, 2...</li>
          <li><strong>Multiply corresponding elements</strong> — <code>a[i] * b[i]</code></li>
          <li><strong>Add to the running total</strong> — <code>result = result + a[i] * b[i]</code></li>
          <li><strong>Return the final sum</strong></li>
        </ol>
      </ExplanationBox>

      <WorkedExample title="Tracing Through the Loop">
        <p>Let&apos;s trace dot_product([0.7, 0.8], [-0.3, 0.9]):</p>

        <CalcStep number={1}>Initialize: result = 0</CalcStep>
        <CalcStep number={2}>i=0: result = 0 + (0.7 × -0.3) = 0 + (-0.21) = -0.21</CalcStep>
        <CalcStep number={3}>i=1: result = -0.21 + (0.8 × 0.9) = -0.21 + 0.72 = 0.51</CalcStep>
        <CalcStep number={4}>Loop ends, return 0.51</CalcStep>

        <p style={{ marginTop: '1rem' }}>
          The loop accumulates each product into the running total. This pattern is called
          an &quot;accumulator&quot; and it&apos;s fundamental to many algorithms.
        </p>
      </WorkedExample>

      <ExplanationBox title="Why We're Building This Ourselves">
        <p>
          In production code, you&apos;d use NumPy&apos;s <code>np.dot()</code> which is 100x faster
          because it&apos;s implemented in optimized C and uses CPU vector instructions. But by
          building it ourselves:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>You understand exactly what&apos;s happening — no magic</li>
          <li>You can see how simple the core operation really is</li>
          <li>You could implement this in any language, on any platform</li>
          <li>Debugging becomes easier when you understand the fundamentals</li>
        </ul>
      </ExplanationBox>

      <TaskBox>
        <p>
          Create a <code>dot_product</code> function that takes two lists and returns their
          dot product. This function will be used throughout the rest of the tutorial.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>Define <code>def dot_product(a, b):</code></li>
          <li>Initialize <code>result = 0</code></li>
          <li>Loop through indices with <code>for i in range(len(a)):</code></li>
          <li>Inside the loop: <code>result = result + a[i] * b[i]</code></li>
          <li><code>return result</code></li>
          <li>Test it with inputs and weights to verify you get 0.51</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

# Test it
inputs = [0.7, 0.8]
weights = [-0.3, 0.9]
print("Dot product:", dot_product(inputs, weights))
# Should print: Dot product: 0.51`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`# Create the dot_product function
def dot_product(a, b):
    # Initialize result to 0

    # Loop through each index

        # Add a[i] * b[i] to result

    # Return the result
    pass

# Test your function
inputs = [0.7, 0.8]
weights = [-0.3, 0.9]

result = dot_product(inputs, weights)
print("Dot product:", result)
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Implement the dot_product function..."
        minHeight={280}
      />

      <ExplanationBox title="A Reusable Building Block">
        <p>
          Congratulations! You&apos;ve implemented your first reusable neural network building block.
          The <code>dot_product</code> function will appear again and again:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Computing a single neuron&apos;s output (weather signal)</li>
          <li>Computing an entire layer&apos;s output (matrix multiplication)</li>
          <li>Computing gradients during backpropagation (training)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Next, we&apos;ll explore <strong>why non-linearity is essential</strong> — without it,
          all our careful weight calculations would be pointless. This is a crucial insight
          that explains why neural networks need activation functions at all.
        </p>
      </ExplanationBox>
    </div>
  );
}
