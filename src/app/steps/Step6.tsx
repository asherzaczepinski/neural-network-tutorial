'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';

interface StepProps {
  onComplete: () => void;
}

export default function Step6({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

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

      <MathFormula label="Dot Product for Weather">
        weather_signal = (temp × temp_weight) + (humidity × humidity_weight)
      </MathFormula>

      <ExplanationBox title="Why Use the Dot Product?">
        <p>
          The dot product is the perfect operation for what we&apos;re trying to do: combine multiple
          pieces of information, each with its own importance, into a single number. Think about
          what we want our neuron to compute for rain prediction:
        </p>
        <p style={{ marginTop: '1rem' }}>
          &quot;Take the temperature, scale it by how much temperature matters for rain. Take the
          humidity, scale it by how much humidity matters for rain. Add these together to get
          one overall rain signal.&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          That&apos;s exactly what the dot product does! It pairs each input with its corresponding
          weight, multiplies them, and sums everything up. The result is a single number that
          represents the combined &quot;vote&quot; of all inputs, weighted by their importance.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Dot Product as Pattern Matching">
        <p>
          Here&apos;s a powerful way to think about it: the weights represent a &quot;rainy weather pattern&quot;
          that we&apos;re looking for. Our weights [-0.3, 0.9] say: &quot;Rainy weather tends to have
          lower temperatures (negative weight) and high humidity (large positive weight).&quot;
        </p>
        <p style={{ marginTop: '1rem' }}>
          When we compute the dot product of today&apos;s weather [0.7, 0.8] with this pattern [-0.3, 0.9],
          we&apos;re asking: &quot;How well does today&apos;s weather match the rainy pattern?&quot; A large positive
          result means good match (likely rain). A large negative result means opposite of the
          pattern (likely dry). Near zero means the evidence is mixed.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Our result of 0.51 is moderately positive — today&apos;s weather somewhat matches the rainy
          pattern, mainly because the high humidity (0.8 × 0.9 = 0.72) outweighs the warm
          temperature&apos;s slight vote against rain (0.7 × -0.3 = -0.21).
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

      <ExplanationBox title="Implementing the Dot Product">
        <p>
          Build the dot_product function yourself:
        </p>
        <CodeRunner code={`# Define a function called dot_product that takes two lists (a, b)
# def dot_product(a, b):

    # Initialize result = 0

    # Loop through each index i using range(len(a))

        # Add a[i] * b[i] to result

    # Return the final result

# Test it with:
# inputs = [0.7, 0.8]
# weights = [-0.3, 0.9]
# print("Dot product:", dot_product(inputs, weights))
`} />
      </ExplanationBox>

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
