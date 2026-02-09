'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import CodeRunner from '@/components/CodeRunner';

export default function Step7() {
  return (
    <div>
      <ExplanationBox title="What Is It?">
        <p>
          The dot product takes two lists and turns them into one number. Multiply each pair,
          add up the results. That&apos;s it.
        </p>
        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '12px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
            inputs: [0.7 (temp), 0.8 (humidity)] &nbsp;·&nbsp; weights: [-0.3 (temp weight), 0.9 (humidity weight)]
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '15px', margin: 0 }}>
            (0.7 × -0.3) + (0.8 × 0.9) = -0.21 + 0.72 = <strong>0.51</strong>
          </p>
        </div>
        <p style={{ marginTop: '12px' }}>
          We&apos;ve been doing this the whole time — it&apos;s just a name for &quot;multiply pairs, then sum.&quot;
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why Use It?">
        <p>
          It&apos;s how neurons multiply inputs by weights. Each input gets scaled by how important
          it is, then everything becomes one signal. Works for 2 inputs or 2 million.
        </p>
        <p>
          Every neuron in every neural network uses the dot product. When you hear about
          &quot;matrix multiplication&quot; in deep learning, that&apos;s just doing many dot products at once.
          Master this and you&apos;ve understood the core of how neural networks compute.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Build the Function">
        <CodeRunner code={`def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

# Test it
inputs = [0.7, 0.8]
weights = [-0.3, 0.9]
print("Dot product:", dot_product(inputs, weights))
`} />
      </ExplanationBox>

      <ExplanationBox title="In Practice">
        <p>
          In real code, you&apos;d use NumPy instead of writing the loop yourself:
        </p>
        <p style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
          import numpy as np<br/>
          np.dot(inputs, weights) &nbsp;# returns 0.51
        </p>
        <p style={{ marginTop: '12px' }}>
          It&apos;s faster and cleaner — but now you know exactly what it&apos;s doing under the hood.
        </p>
      </ExplanationBox>
    </div>
  );
}
