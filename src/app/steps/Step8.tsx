'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';

function SigmoidGraph() {
  // Generate sigmoid curve points
  const points: [number, number][] = [];
  for (let i = -80; i <= 80; i++) {
    const z = i / 10;
    const sig = 1 / (1 + Math.exp(-z));
    // Map z [-8, 8] to x [40, 440], sig [0, 1] to y [260, 20]
    const x = 40 + (z + 8) * (400 / 16);
    const y = 260 - sig * 240;
    points.push([x, y]);
  }
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  // Highlighted zone: z = -4 to +4
  const xLeft = 40 + (-4 + 8) * (400 / 16);   // z=-4
  const xRight = 40 + (4 + 8) * (400 / 16);    // z=+4

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
      <svg width="500" height="300" viewBox="0 0 500 300" style={{ background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        {/* Highlighted effective zone */}
        <rect x={xLeft} y="20" width={xRight - xLeft} height="240" fill="#3b82f6" opacity="0.12" rx="4" />
        <line x1={xLeft} y1="20" x2={xLeft} y2="260" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6,4" />
        <line x1={xRight} y1="20" x2={xRight} y2="260" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6,4" />
        <text x={xLeft - 4} y="275" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="600">-4</text>
        <text x={xRight + 4} y="275" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="600">+4</text>

        {/* Label for highlighted zone */}
        <text x={(xLeft + xRight) / 2} y="14" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="700">
          Effective Learning Zone
        </text>

        {/* Axes */}
        <line x1="40" y1="140" x2="460" y2="140" stroke="#94a3b8" strokeWidth="1" />
        <line x1="240" y1="20" x2="240" y2="260" stroke="#94a3b8" strokeWidth="1" />

        {/* Axis labels */}
        <text x="465" y="144" fontSize="12" fill="#64748b" fontWeight="600">z</text>
        <text x="248" y="16" fontSize="12" fill="#64748b" fontWeight="600">σ(z)</text>

        {/* Tick marks and labels on z axis */}
        {[-6, -4, -2, 0, 2, 4, 6].map(z => {
          const x = 40 + (z + 8) * (400 / 16);
          return (
            <g key={z}>
              <line x1={x} y1="137" x2={x} y2="143" stroke="#94a3b8" strokeWidth="1" />
              {z !== -4 && z !== 4 && (
                <text x={x} y="275" textAnchor="middle" fontSize="10" fill="#94a3b8">{z}</text>
              )}
            </g>
          );
        })}

        {/* σ labels: 0, 0.5, 1 */}
        <text x="30" y="264" textAnchor="middle" fontSize="10" fill="#94a3b8">0</text>
        <text x="30" y="144" textAnchor="middle" fontSize="10" fill="#94a3b8">0.5</text>
        <text x="30" y="24" textAnchor="middle" fontSize="10" fill="#94a3b8">1</text>

        {/* Saturation zone labels */}
        <text x={xLeft / 2 + 10} y="50" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">Saturated</text>
        <text x={xLeft / 2 + 10} y="63" textAnchor="middle" fontSize="10" fill="#ef4444">(gradient ≈ 0)</text>
        <text x={(xRight + 460) / 2} y="230" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">Saturated</text>
        <text x={(xRight + 460) / 2} y="243" textAnchor="middle" fontSize="10" fill="#ef4444">(gradient ≈ 0)</text>

        {/* Sigmoid curve */}
        <path d={pathD} fill="none" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Step8() {
  return (
    <div>
      <ExplanationBox title="Our Goal: Keep z in the Effective Zone">
        <p>
          In the previous steps, we gave you a <strong>brief overview</strong> of how weights, biases,
          and normalization fit into the big picture. Now let&apos;s go deeper into the <em>actual math</em> behind
          why these things work the way they do.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Everything comes back to one key insight: <strong>sigmoid is only useful when z is roughly
          between -4 and +4.</strong> Look at the graph below — in that middle zone (highlighted in blue),
          the curve is steep, meaning small changes in z produce meaningful changes in the output.
          Outside that zone, the function flattens out — the gradient approaches zero, the neuron
          &quot;saturates&quot; at 0 or 1, and <strong>learning stops.</strong>
        </p>

        <SigmoidGraph />

        <p style={{ marginTop: '0.5rem' }}>
          So our entire goal with normalization and weight initialization is to ensure that z values
          land inside this effective zone. If we get this right, the network can learn. If we get
          it wrong, neurons saturate and gradients vanish. Let&apos;s see exactly how the math makes this happen.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Recall: The z Equation">
        <p>
          From our earlier overview, you learned that z is the weighted sum of inputs:
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
        <p style={{ marginTop: '0.75rem' }}>
          Each term w<sub>i</sub>x<sub>i</sub> is a weight times an input. The final z is the sum of
          all these terms plus a bias. To control where z lands, we need to control <em>both</em> the
          inputs (via normalization) and the weights (via initialization).
        </p>
      </ExplanationBox>

      <ExplanationBox title="Deep Dive: Normalization">
        <p>
          From the brief overview, you learned that normalization is for: <strong>scaling all input
          values so they fall within a predictable range, ensuring z stays in the effective zone.</strong>
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          But <em>how</em> exactly do we normalize? Here&apos;s the precise mathematical process:
        </p>

        <div style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem'
        }}>
          <p><strong>Step 1: Compute the mean (μ) of your data:</strong></p>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', textAlign: 'center', margin: '0.5rem 0' }}>
            μ = (x<sub>1</sub> + x<sub>2</sub> + ... + x<sub>n</sub>) / n
          </div>
          <p style={{ marginTop: '0.75rem' }}><strong>Step 2: Compute the standard deviation (σ):</strong></p>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', textAlign: 'center', margin: '0.5rem 0' }}>
            σ = √[ Σ(x<sub>i</sub> - μ)² / n ]
          </div>
          <p style={{ marginTop: '0.75rem' }}><strong>Step 3: Normalize each value:</strong></p>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', textAlign: 'center', margin: '0.5rem 0' }}>
            x<sub>normalized</sub> = (x<sub>i</sub> - μ) / σ
          </div>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          After this transformation, your data has <strong>mean ≈ 0</strong> and <strong>standard
          deviation ≈ 1</strong>. By the properties of a normal distribution, this means:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>68%</strong> of input values fall in <strong>[-1, 1]</strong></li>
          <li><strong>95%</strong> of input values fall in <strong>[-2, 2]</strong></li>
          <li><strong>99.7%</strong> of input values fall in <strong>[-3, 3]</strong></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Without normalization, your raw inputs could be anything — house prices in the hundreds of
          thousands, ages between 0 and 100, pixel values from 0 to 255. These wildly different
          scales would make z unpredictable and almost certainly push it out of the effective zone.
          Normalization brings <em>every</em> feature onto the same playing field.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Deep Dive: Weight Initialization">
        <p>
          From the brief overview, you learned that: <strong>each weight must be a separate random
          value — not the same number for every neuron.</strong> If all weights started identical,
          every neuron would compute the same thing, learn the same gradients, and stay identical
          forever. The network would never learn different features.
        </p>

        <p style={{ marginTop: '0.75rem' }}>
          But we can&apos;t just pick <em>any</em> random values. This is where <strong>Xavier/Glorot
          initialization</strong> comes in. The key formula is:
        </p>
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem',
          textAlign: 'center'
        }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
            Variance of weights = 1 / n
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '0.25rem' }}>
            where n = number of inputs to the neuron
          </div>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          Concretely, weights are drawn from a distribution with standard deviation = 1/√n:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>2 inputs →</strong> std dev = 1/√2 ≈ 0.71, so weights are roughly in [-0.7, +0.7]</li>
          <li><strong>10 inputs →</strong> std dev = 1/√10 ≈ 0.32, so weights are roughly in [-0.3, +0.3]</li>
          <li><strong>100 inputs →</strong> std dev = 1/√100 = 0.1, so weights are roughly in [-0.1, +0.1]</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Notice the pattern: <strong>more inputs → smaller weights.</strong> This is critical because
          z is a <em>sum</em> of n terms. More terms in the sum means each term needs to be smaller
          to keep the total in range.
        </p>

        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem'
        }}>
          <p><strong>What goes wrong without proper initialization?</strong></p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li><strong>Weights too large →</strong> z values explode to ±100 or more. Sigmoid saturates completely. Gradients vanish. <em>Network cannot learn.</em></li>
            <li><strong>Weights too small →</strong> z values shrink to ≈ 0. All outputs cluster around 0.5. The network outputs the same thing regardless of input. <em>Network cannot learn.</em></li>
            <li><strong>All weights identical →</strong> Every neuron computes the same function. They all update the same way. You effectively have one neuron, not a network. <em>Network cannot learn anything useful.</em></li>
          </ul>
        </div>
      </ExplanationBox>

      <ExplanationBox title="Putting It Together: Why z Stays in Range">
        <p>
          Here&apos;s the beautiful math that ties it all together. Consider one term in the z sum: w<sub>i</sub>x<sub>i</sub>.
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
          <li>After normalization: x<sub>i</sub> has variance = 1</li>
          <li>After Xavier init: w<sub>i</sub> has variance = 1/n</li>
          <li>For independent variables: Var(w<sub>i</sub>x<sub>i</sub>) = Var(w<sub>i</sub>) × Var(x<sub>i</sub>) = 1/n × 1 = <strong>1/n</strong></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Since z is the sum of n such terms:
        </p>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.5rem',
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: '18px'
        }}>
          Var(z) = n × (1/n) = <strong>1</strong>
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          So z has <strong>standard deviation ≈ 1</strong>, which means 99.7% of z values fall
          between <strong>-3 and +3</strong> — safely inside the effective learning zone of sigmoid!
          This isn&apos;t a coincidence. It&apos;s the entire reason these techniques exist: normalization
          and Xavier initialization are designed together to keep z exactly where sigmoid works best.
        </p>
      </ExplanationBox>
    </div>
  );
}
