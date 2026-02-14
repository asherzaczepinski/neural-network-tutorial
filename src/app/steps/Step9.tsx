'use client';

import { useState } from 'react';
import ExplanationBox from '@/components/ExplanationBox';

// Generate a random number from a normal distribution using Box-Muller transform
function randomNormal(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

function BellCurveGraph({ stdDev, weights, onRegenerate }: { stdDev: number; weights: number[]; onRegenerate: () => void }) {
  const width = 600;
  const height = 240;
  const padding = 40;
  const graphW = width - padding * 2;
  const graphH = height - 60;

  const xMin = -stdDev * 3.5;
  const xMax = stdDev * 3.5;

  const toX = (v: number) => padding + ((v - xMin) / (xMax - xMin)) * graphW;
  const gaussian = (x: number) => Math.exp(-(x * x) / (2 * stdDev * stdDev));
  const topPad = 30;
  const toY = (gVal: number) => topPad + (1 - gVal) * graphH;

  const curvePoints: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = xMin + (i / 200) * (xMax - xMin);
    const y = gaussian(x);
    curvePoints.push(`${i === 0 ? 'M' : 'L'}${toX(x).toFixed(1)},${toY(y).toFixed(1)}`);
  }

  const baseY = topPad + graphH;
  const fillPath = curvePoints.join(' ') + ` L${toX(xMax).toFixed(1)},${baseY.toFixed(1)} L${toX(xMin).toFixed(1)},${baseY.toFixed(1)} Z`;
  const ticks = [-3, -2, -1, 0, 1, 2, 3].map(m => m * stdDev).filter(v => v >= xMin && v <= xMax);
  const y1Sigma = toY(gaussian(stdDev));

  return (
    <div style={{ margin: '1rem 0' }}>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        {/* Regenerate button */}
        <g onClick={onRegenerate} style={{ cursor: 'pointer' }}>
          <rect x="8" y="8" width="119" height="30" rx="6" fill="#2563eb" />
          <text x="68" y="28" textAnchor="middle" fontSize="15" fill="white" fontWeight="600">Regenerate ↻</text>
        </g>
        <path d={fillPath} fill="#3b82f6" opacity="0.1" />
        <path d={curvePoints.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={padding} y1={baseY} x2={width - padding} y2={baseY} stroke="#94a3b8" strokeWidth="1" />
        <line x1={toX(0)} y1={topPad - 5} x2={toX(0)} y2={baseY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
        {/* ±1σ shaded zone + dashed lines */}
        <rect x={toX(-stdDev)} y={topPad - 5} width={toX(stdDev) - toX(-stdDev)} height={graphH + 5} fill="#3b82f6" opacity="0.08" rx="3" />
        <line x1={toX(-stdDev)} y1={y1Sigma} x2={toX(-stdDev)} y2={baseY} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" />
        <line x1={toX(stdDev)} y1={y1Sigma} x2={toX(stdDev)} y2={baseY} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" />
        <text x={(toX(-stdDev) + toX(stdDev)) / 2} y={topPad - 10} textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="600">
          ~ 68% of weights
        </text>
        {ticks.map(v => (
          <g key={v}>
            <line x1={toX(v)} y1={baseY - 3} x2={toX(v)} y2={baseY + 3} stroke="#94a3b8" strokeWidth="1" />
            <text x={toX(v)} y={baseY + 16} textAnchor="middle" fontSize="10" fill="#94a3b8">
              {v === 0 ? '0' : v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2)}
            </text>
          </g>
        ))}
        {weights.map((w, i) => {
          const wx = toX(Math.max(xMin, Math.min(xMax, w)));
          const wy = baseY;
          return (
            <g key={i}>
              <text x={wx} y={wy - 12} textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="600">
                w{i + 1}
              </text>
              <circle cx={wx} cy={wy} r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function WeightGenerator() {
  const n = 5;
  const stdDev = 1 / Math.sqrt(n); // 0.447
  const [weights, setWeights] = useState<number[]>(() =>
    Array.from({ length: 5 }, () => randomNormal(0, stdDev))
  );

  const generateWeights = () => {
    const newWeights = Array.from({ length: 5 }, () => randomNormal(0, stdDev));
    setWeights(newWeights);
  };

  return (
    <div>
      <BellCurveGraph stdDev={stdDev} weights={weights} onRegenerate={generateWeights} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.5rem',
        marginTop: '0.5rem',
      }}>
        {weights.map((w, i) => (
          <div key={i} style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>w{i + 1}</div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Georgia, serif',
              color: '#1e293b'
            }}>
              {w >= 0 ? '+' : ''}{w.toFixed(3)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '0.75rem', fontStyle: 'italic' }}>
        Note: bell curve random uses a special formula that makes values near the center far more
        likely to be picked — it&apos;s not the same as generating random values evenly across the range.
      </div>

      <div style={{
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: '8px',
        padding: '0.75rem',
        marginTop: '0.75rem',
        fontSize: '14px'
      }}>
        <p style={{ color: '#64748b' }}>
          <strong style={{ color: '#1e293b' }}>Why random at all?</strong> If every neuron started
          with the same perfectly-spaced weights, they&apos;d all compute the exact same thing and
          learn the exact same way — you&apos;d have 100 identical neurons instead of 100 different
          ones. Randomness is what gives each neuron its own &quot;personality&quot; so they can
          specialize and learn different patterns.
        </p>
        <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
          <strong style={{ color: '#1e293b' }}>Why a bell curve specifically?</strong> We want
          most weights near 0 (to keep z small) but with enough variety that neurons behave
          differently. A bell curve does exactly that — it clusters most values near the center
          while still allowing some spread. If we used a flat/uniform distribution instead
          (every value equally likely), too many weights would end up near the extremes, making
          z less predictable.
        </p>
      </div>
    </div>
  );
}

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

      <ExplanationBox title="Improvement 1: Xavier Initialization (Fixing the Weights)">
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
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '0.25rem' }}>
            (standard deviation = the average distance each weight is from the mean)
          </div>
        </div>

        <div style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '0.75rem',
          marginTop: '0.75rem',
          fontSize: '14px'
        }}>
          <strong>Quick refresher: bell curves and standard deviation</strong>
          <p style={{ marginTop: '0.25rem', color: '#64748b' }}>
            A <strong style={{ color: '#1e293b' }}>bell curve</strong> (normal distribution) is a
            shape where values cluster near the center and get rarer the further out you go.
            The <strong style={{ color: '#1e293b' }}>standard deviation</strong> controls how wide
            the bell is — it tells you how far most values land from the center. For any bell curve:
          </p>
          <ul style={{ marginTop: '0.25rem', color: '#64748b', lineHeight: '1.8' }}>
            <li><strong style={{ color: '#1e293b' }}>68%</strong> of values fall within ±1 standard deviation</li>
            <li><strong style={{ color: '#1e293b' }}>95%</strong> of values fall within ±2 standard deviations</li>
            <li><strong style={{ color: '#1e293b' }}>99.7%</strong> of values fall within ±3 standard deviations</li>
          </ul>
          <p style={{ marginTop: '0.25rem', color: '#64748b' }}>
            So if our standard deviation is 0.447, about 68% of weights will land between
            -0.447 and +0.447, and almost all will be between -1.34 and +1.34. These are
            exactly the small values we need — when you multiply them by normalized inputs
            (also small) and add them up, z naturally stays in sigmoid&apos;s effective zone of -4 to +4!
          </p>
        </div>

        <p style={{ marginTop: '0.75rem' }}>
          Let&apos;s see exactly what this does. Say we have a neuron with <strong>5 inputs</strong>.
          First we calculate the standard deviation:
        </p>

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '0.75rem'
        }}>
          <div style={{ fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '18px' }}>standard deviation = </span>
            <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
              <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
              <div style={{ borderTop: '2px solid #1e293b', width: '40px' }}></div>
              <div style={{ fontSize: '20px', paddingTop: '2px' }}>√5</div>
            </span>
            <span style={{ fontSize: '18px' }}> = </span>
            <span style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}>
              <div style={{ fontSize: '20px', paddingBottom: '2px' }}>1</div>
              <div style={{ borderTop: '2px solid #1e293b', width: '50px' }}></div>
              <div style={{ fontSize: '20px', paddingTop: '2px' }}>2.24</div>
            </span>
            <span style={{ fontSize: '18px' }}> = <strong style={{ color: '#2563eb' }}>0.447</strong></span>
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            This means the algorithm will pick random weights from a bell curve where most
            values land between -0.447 and +0.447. Here&apos;s what that bell curve looks like — try
            generating weights from it:
          </div>
        </div>

        <WeightGenerator />

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
        </div>
      </ExplanationBox>

      <ExplanationBox title="Improvement 2: Better Normalization (Fixing the Inputs)">
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
          Here&apos;s why these two improvements work together so nicely:
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
