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
        <p style={{ marginTop: '12px' }}>
          We&apos;ve been doing this the whole time — it&apos;s just a name for &quot;multiply pairs, then sum.&quot;
          Let&apos;s build it up step by step:
        </p>

        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '12px', fontFamily: 'monospace', fontSize: '15px', lineHeight: '2.2' }}>
          <span style={{ color: '#64748b', fontSize: '13px', fontFamily: 'inherit' }}>Set the actual values:</span><br />
          inputs = [0.7, 0.8]<br />
          weights = [-0.3, 0.9]<br /><br />
          <span style={{ color: '#64748b', fontSize: '13px', fontFamily: 'inherit' }}>The equation with just variable names:</span><br />
          temp × temp_weight + humidity × humidity_weight = <strong>dot product</strong><br /><br />
          <span style={{ color: '#64748b', fontSize: '13px', fontFamily: 'inherit' }}>Using array notation:</span><br />
          inputs[0] × weights[0] + inputs[1] × weights[1] = <strong>dot product</strong><br /><br />
          <span style={{ color: '#64748b', fontSize: '13px', fontFamily: 'inherit' }}>What each index gives you:</span><br />
          print(inputs[0]) → 0.7<br />
          print(inputs[1]) → 0.8<br />
          print(weights[0]) → -0.3<br />
          print(weights[1]) → 0.9<br /><br />
          <span style={{ color: '#64748b', fontSize: '13px', fontFamily: 'inherit' }}>Plug in the numbers:</span><br />
          (0.7 × -0.3) + (0.8 × 0.9) = -0.21 + 0.72 = <strong>0.51</strong>
        </div>
      </ExplanationBox>

      <ExplanationBox title="Why Use It?">
        <p>
          It&apos;s how neurons multiply inputs by weights. Each input gets scaled by how important
          it is, then everything becomes one signal. Works for 2 inputs or 2 million.
        </p>
        <p>
          Every neuron in every neural network uses the dot product. When you hear about
          &quot;matrix multiplication&quot; in deep learning, that&apos;s just doing many dot products at once.
          We will get into how matrix multiplication works exactly later.
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
