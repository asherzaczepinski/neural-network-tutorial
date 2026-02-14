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
          range where sigmoid actually works.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          We already learned about weights and normalization in earlier steps — now we&apos;re going
          to learn the precise math behind how to set them up so z stays in range. Let&apos;s start
          with the weights.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Solution 1: Xavier Initialization (Fixing the Weights)">
        <p>
          We know each weight needs to be a small random number. But <em>how</em> small?
          <strong> Xavier initialization</strong> gives us the exact formula:
        </p>
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '0.75rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '0.5rem' }}>
            Pick each weight randomly from a bell curve centered at 0, with:
          </div>
          <div style={{ fontFamily: 'Georgia, serif' }}>
            <span style={{ fontSize: '18px' }}>standard deviation = </span>
            <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
              <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
              <div style={{ borderTop: '2px solid #1e293b', width: '40px' }}></div>
              <div style={{ fontSize: '20px', paddingTop: '2px' }}>√n</div>
            </span>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '0.5rem' }}>
            where n = number of inputs to the neuron
          </div>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          Let&apos;s see exactly what this does. Say we have a neuron with <strong>10 inputs</strong>:
        </p>

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '0.75rem'
        }}>
          <p style={{ fontWeight: '700', marginBottom: '1rem' }}>Example: initializing weights for a neuron with 10 inputs</p>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              Step 1: Calculate the standard deviation
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '18px' }}>standard deviation = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '40px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>√10</div>
              </span>
              <span style={{ fontSize: '18px' }}> = </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '50px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>3.16</div>
              </span>
              <span style={{ fontSize: '18px' }}> = <strong style={{ color: '#2563eb' }}>0.316</strong></span>
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              This means most weights will land between -0.316 and +0.316.
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              Step 2: The algorithm picks 10 random weights from a bell curve with this standard deviation
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '0.75rem' }}>
              A bell curve centered at 0 means most numbers cluster near 0, some land a bit
              further out, and very few land far away — like throwing darts at a target where
              most hit near the bullseye. Here&apos;s what 10 weights might look like:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              {[
                { label: 'w₁', value: '-0.21' },
                { label: 'w₂', value: '+0.08' },
                { label: 'w₃', value: '+0.35' },
                { label: 'w₄', value: '-0.14' },
                { label: 'w₅', value: '+0.29' },
                { label: 'w₆', value: '-0.03' },
                { label: 'w₇', value: '+0.18' },
                { label: 'w₈', value: '-0.31' },
                { label: 'w₉', value: '+0.11' },
                { label: 'w₁₀', value: '-0.25' },
              ].map(w => (
                <div key={w.label} style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{w.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Georgia, serif', color: '#1e293b' }}>{w.value}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '0.75rem' }}>
              Notice: all small numbers, all different, all clustered around 0. Most are within
              ±0.316, with a few slightly outside. Every time you train the network, you get
              a <em>different</em> set of random weights — but they&apos;ll always be in this same range.
            </p>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', fontSize: '16px' }}>
              What about different numbers of inputs?
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
              <span style={{ fontSize: '18px' }}>2 inputs: </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '30px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>√2</div>
              </span>
              <span style={{ fontSize: '18px' }}> = <strong style={{ color: '#2563eb' }}>0.71</strong></span>
              <span style={{ fontSize: '14px', color: '#64748b' }}> → weights between ±0.7</span>
            </div>
            <div style={{ fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
              <span style={{ fontSize: '18px' }}>10 inputs: </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '40px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>√10</div>
              </span>
              <span style={{ fontSize: '18px' }}> = <strong style={{ color: '#2563eb' }}>0.32</strong></span>
              <span style={{ fontSize: '14px', color: '#64748b' }}> → weights between ±0.3</span>
            </div>
            <div style={{ fontFamily: 'Georgia, serif' }}>
              <span style={{ fontSize: '18px' }}>100 inputs: </span>
              <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
                <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
                <div style={{ borderTop: '2px solid #1e293b', width: '50px' }}></div>
                <div style={{ fontSize: '20px', paddingTop: '2px' }}>√100</div>
              </span>
              <span style={{ fontSize: '18px' }}> = <strong style={{ color: '#2563eb' }}>0.10</strong></span>
              <span style={{ fontSize: '14px', color: '#64748b' }}> → weights between ±0.1</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '0.75rem' }}>
              More inputs = more terms adding up in z = each weight needs to be smaller so the
              total doesn&apos;t explode.
            </p>
          </div>
        </div>
      </ExplanationBox>

      <ExplanationBox title="Why 1/√n and Not Just 1/n?">
        <p>
          You might wonder: if we have n inputs and want to keep z small, why not just make each
          weight 1/n? Why the square root?
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Here&apos;s the key: when you add up random numbers, they don&apos;t just stack on top of each
          other perfectly. Some are positive, some are negative — they partially cancel out. So
          adding 100 random terms doesn&apos;t make the total 100× bigger, it makes it about <strong>√100
          = 10×</strong> bigger. This is a fundamental property of randomness.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          So if each input × weight term has a certain size, and we add up n of them:
        </p>
        <ul style={{ marginTop: '0.5rem', lineHeight: '2' }}>
          <li>The total z grows by a factor of <strong>√n</strong> (not n)</li>
          <li>We want z to stay around 1</li>
          <li>So each term needs to be <strong>1/√n</strong> to cancel out the √n growth</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          If we used 1/n instead, the weights would be <em>too small</em>. With 100 inputs,
          1/n = 0.01 — those weights are so tiny that z would always be close to 0, and every
          neuron would output ~0.5 no matter what. The network couldn&apos;t tell any inputs apart.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          1/√n is the sweet spot: small enough that z doesn&apos;t explode, big enough that
          the neuron can still tell its inputs apart.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why Good Starting Weights Matter">
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1rem'
        }}>
          <p><strong>What goes wrong with bad weights:</strong></p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li>
              <strong>Weights too big</strong> — if each weight is large and you&apos;re adding up
              many input × weight terms, z explodes. sigmoid(50) = basically 1. The neuron is stuck.
            </li>
            <li style={{ marginTop: '0.5rem' }}>
              <strong>Weights too small</strong> — tiny weights make z ≈ 0 no matter the input.
              Every neuron outputs ~0.5. The network can&apos;t tell inputs apart.
            </li>
            <li style={{ marginTop: '0.5rem' }}>
              <strong>All weights the same</strong> — every neuron computes the same thing and
              learns the same way forever. You basically have one neuron pretending to be many.
            </li>
          </ul>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          You might think: &quot;Can&apos;t the network just <em>fix</em> bad weights during
          training?&quot; The problem is that learning depends on the <strong>gradient</strong> — how
          much the output changes when you tweak a weight. If z is way out in sigmoid&apos;s flat
          zone (like z = 50), the gradient is basically <strong>zero</strong>. The network has no
          signal telling it which direction to move. It&apos;s like being lost in a perfectly flat
          desert — you know you need to go somewhere, but there&apos;s no slope to follow. You&apos;re stuck.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Even if the gradient isn&apos;t completely zero, a bad starting point means the network
          wastes tons of training steps just getting weights to a reasonable range before it can
          start learning useful patterns. Starting smart with Xavier saves all of that.
        </p>
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
