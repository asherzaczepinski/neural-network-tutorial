'use client';

import ExplanationBox from '@/components/ExplanationBox';

export default function Step9() {
  return (
    <div>
      <ExplanationBox title="The Problem: z Can Go Anywhere">
        <p>
          We just saw that sigmoid only works well when z is between -4 and +4. But remember
          what z actually is:
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
          z = (input<sub>1</sub> × weight<sub>1</sub>) + (input<sub>2</sub> × weight<sub>2</sub>) + ... + bias
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          Since z is a sum of many input × weight terms, the more inputs you have, the more
          terms get added together — and z can easily become massive, way beyond the -4 to +4
          range where sigmoid actually works. That&apos;s exactly what weight initialization and
          normalization are designed to prevent.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Solution 1: Weight Initialization (Fixing the Weights)">
        <p>
          Before training starts, we need to pick starting values for every weight.
          This matters more than you&apos;d think.
        </p>

        <p style={{ marginTop: '0.75rem' }}>
          You might be thinking: &quot;Can&apos;t the network just <em>learn</em> its way to better weights
          during training? Why does the starting point matter?&quot;
        </p>

        <div style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem'
        }}>
          <p><strong>Why the network can&apos;t just fix bad weights on its own:</strong></p>
          <p style={{ marginTop: '0.5rem' }}>
            Remember how the network learns — it looks at how wrong it was, then nudges each weight
            a tiny bit in the right direction. But that nudge depends on the <strong>gradient</strong> (how
            much the output changes when you change a weight). If z is way out in the flat zone of
            sigmoid (like z = 50), the gradient is basically <strong>zero</strong>. Zero gradient means
            zero nudge. The network <em>wants</em> to fix the weights but it literally has no signal
            telling it which direction to move them.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            It&apos;s like being lost in a perfectly flat desert with no landmarks — you know you need
            to go somewhere, but there&apos;s no slope to follow, no hill to climb. You&apos;re stuck.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            And even if the gradient isn&apos;t completely zero, a bad starting point means the network
            has to waste tons of training steps just getting the weights to a reasonable range before
            it can start actually learning useful patterns. That&apos;s wasted time, wasted computation,
            and in deep networks with many layers, the tiny gradients can compound and become so
            small that the early layers <em>never</em> learn at all.
          </p>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          So we need to start smart. The solution is called <strong>Xavier initialization</strong>: pick
          small random numbers, where &quot;how small&quot; depends on how many inputs the neuron has.
          The core idea is simple:
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
            More inputs → smaller weights
          </div>
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          Why? Because z is a <em>sum</em>. If a neuron has 100 inputs, that&apos;s 100 terms being
          added together. Each term needs to be small so the total doesn&apos;t explode. If it only
          has 2 inputs, the weights can be a bit bigger since there are fewer terms adding up.
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>2 inputs →</strong> weights around ±0.7</li>
          <li><strong>10 inputs →</strong> weights around ±0.3</li>
          <li><strong>100 inputs →</strong> weights around ±0.1</li>
        </ul>

        <p style={{ marginTop: '0.75rem' }}>
          But where do those numbers come from? Here&apos;s the actual math behind Xavier initialization:
        </p>
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '0.75rem'
        }}>
          <p>
            We want z to end up with a <strong>spread of about 1</strong> (so it stays in the -3 to +3
            range). Each term in the z sum is input × weight. If our inputs already have a spread of
            1 (thanks to normalization), then:
          </p>
          <ul style={{ marginTop: '0.75rem', lineHeight: '2' }}>
            <li>The spread of one term = spread of input × spread of weight = 1 × spread of weight</li>
            <li>When you add up n terms, the total spread = n × (spread of one term)</li>
            <li>We want the total spread to be 1, so: n × (spread of weight) = 1</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>Solving for the spread of each weight:</p>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0.75rem 0',
            padding: '0.75rem',
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}>
            spread of weights = 1 / n
          </div>
          <p style={{ marginTop: '0.75rem' }}>
            The &quot;spread&quot; here is technically called <strong>variance</strong>. To get the actual
            size of the weights, we take the square root (called <strong>standard deviation</strong>):
          </p>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0.75rem 0',
            padding: '0.75rem',
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}>
            weight size = 1 / √n
          </div>
          <p style={{ marginTop: '0.75rem' }}>That&apos;s where our numbers come from:</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
            <li>2 inputs → 1/√2 ≈ <strong>0.71</strong></li>
            <li>10 inputs → 1/√10 ≈ <strong>0.32</strong></li>
            <li>100 inputs → 1/√100 = <strong>0.10</strong></li>
          </ul>
        </div>
      </ExplanationBox>

      <ExplanationBox title="Solution 2: Better Normalization (Fixing the Inputs)">
        <p>
          Back in Step 3, we learned to normalize inputs to a 0-1 range using:
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
          normalized = (value - min) / (max - min)
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          This works — it gets all our inputs onto the same scale so no single input dominates.
          But there&apos;s a problem: all the values end up between <strong>0 and 1</strong>. They&apos;re
          all positive. Look at what that does to z:
        </p>

        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem'
        }}>
          <p><strong>The problem with 0-1 normalization:</strong></p>
          <p style={{ marginTop: '0.5rem' }}>
            If all inputs are positive (between 0 and 1), and we multiply them by positive weights,
            every term in the z sum is positive. The terms can only <em>add up</em>, never cancel each
            other out. This pushes z away from 0 and toward the edges of sigmoid&apos;s effective zone.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            It also means the weights can only all increase together or all decrease together during
            learning — they can&apos;t move independently. This slows training down significantly.
          </p>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          A better approach is to center the values <strong>around 0</strong> instead:
        </p>
        <div style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem'
        }}>
          <p><strong>1. Find the average</strong> of all values for that input</p>
          <p style={{ marginTop: '0.5rem' }}><strong>2. Find the spread</strong> (how far values typically are from the average)</p>
          <p style={{ marginTop: '0.5rem' }}><strong>3. For each value:</strong> subtract the average, then divide by the spread</p>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            textAlign: 'center',
            margin: '0.75rem 0',
            padding: '0.5rem',
            background: 'white',
            borderRadius: '6px'
          }}>
            normalized value = (value - average) / spread
          </div>
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          Now values are centered around 0 — some positive, some negative. This means the terms
          in the z equation can cancel each other out, keeping z closer to 0 (right in the sweet
          spot of sigmoid). And because inputs can be positive or negative, weights can update
          independently during learning.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          For example, if we&apos;re predicting house purchases and we have incomes like
          $40,000, $85,000, and $120,000 — with an average of $81,667 and a spread of ~$32,800:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
          <li>$40,000 → (40,000 - 81,667) / 32,800 = <strong>-1.27</strong></li>
          <li>$85,000 → (85,000 - 81,667) / 32,800 = <strong>0.10</strong></li>
          <li>$120,000 → (120,000 - 81,667) / 32,800 = <strong>1.17</strong></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Most values end up between <strong>-3 and +3</strong> — safely inside sigmoid&apos;s effective zone!
        </p>
      </ExplanationBox>

      <ExplanationBox title="Putting It All Together">
        <p>
          Here&apos;s why these two techniques work together so nicely:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Better normalization</strong> makes inputs small and centered around 0</li>
          <li><strong>Xavier initialization</strong> makes weights small (scaled to the number of inputs)</li>
          <li><strong>Small × small = small</strong> — each input × weight term is a small number</li>
          <li><strong>Small terms added up = still small</strong> — z stays in the -3 to +3 range</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          And -3 to +3 is right in the middle of sigmoid&apos;s effective zone (-4 to +4). The neuron
          can produce meaningfully different outputs, tell its inputs apart, and actually learn.
          This isn&apos;t a coincidence — normalization and Xavier initialization were specifically
          designed to work together to keep z exactly where sigmoid works best.
        </p>
      </ExplanationBox>
    </div>
  );
}
