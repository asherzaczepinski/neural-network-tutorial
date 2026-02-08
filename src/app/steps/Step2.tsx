'use client';

import ExplanationBox from '@/components/ExplanationBox';

interface StepProps {
  onComplete: () => void;
}

export default function Step2({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="What is a Neuron?">
        <p>
          A <strong>neuron</strong> is the basic building block of a neural network. It does one simple thing:
          takes in some numbers, processes them, and outputs a single number that represents how
          &quot;activated&quot; or &quot;excited&quot; it is.
        </p>
        <p>
          Think of it like a sensor that measures how strongly it detects a pattern. The output
          tells us the <strong>activation strength</strong> — how confident the neuron is that
          it found what it&apos;s looking for.
        </p>
      </ExplanationBox>

      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '32px 24px',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #e5e7eb'
      }}>
        <svg width="420" height="160" viewBox="0 0 420 160">
          {/* Input arrows */}
          <line x1="40" y1="50" x2="130" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="40" y1="110" x2="130" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          {/* Input labels */}
          <text x="20" y="55" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="500">temp</text>
          <text x="20" y="115" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="500">humid</text>

          {/* The neuron */}
          <circle cx="170" cy="80" r="40" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
          <text x="170" y="75" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">process</text>
          <text x="170" y="90" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">&amp; combine</text>

          {/* Output arrow */}
          <line x1="210" y1="80" x2="300" y2="80" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead-green)"/>

          {/* Output label */}
          <text x="340" y="75" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="600">activation</text>
          <text x="340" y="92" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="600">strength</text>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/>
            </marker>
          </defs>
        </svg>
      </div>

      <ExplanationBox title="Inputs In, Activation Out">
        <p>
          Every neuron follows the same pattern:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Receive inputs</strong> — Numbers from sensors, data, or other neurons</li>
          <li><strong>Process them</strong> — Combine and transform the inputs</li>
          <li><strong>Output activation</strong> — A single number (usually 0 to 1)</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          The output is called the <strong>activation</strong> because it tells us how &quot;activated&quot;
          or &quot;triggered&quot; the neuron is by its inputs. High activation (close to 1) means the neuron
          strongly detected its pattern. Low activation (close to 0) means it didn&apos;t.
        </p>
      </ExplanationBox>

      <ExplanationBox title="A Weather Neuron Example">
        <p>
          Imagine a neuron designed to detect &quot;rainy conditions&quot;:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Inputs:</strong> temperature (0.7) and humidity (0.8)</li>
          <li><strong>Processing:</strong> combines them based on learned importance</li>
          <li><strong>Output:</strong> 0.85 (high activation = &quot;this looks rainy!&quot;)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          A different day with low humidity might produce 0.15 — low activation, meaning
          &quot;this doesn&apos;t look like rain to me.&quot;
        </p>
      </ExplanationBox>

      <ExplanationBox title="What You'll Learn Next">
        <p>
          Over the next several steps, you&apos;ll learn exactly how a neuron processes its inputs
          to produce that activation. We&apos;ll build a complete, working neuron piece by piece:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>How to represent data as numbers</li>
          <li>How <strong>weights</strong> control input importance</li>
          <li>How <strong>bias</strong> adds flexibility</li>
          <li>How the <strong>activation function</strong> produces the final output</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          By the end, you&apos;ll have built a fully functioning neuron from scratch. Then we&apos;ll
          connect multiple neurons together into a complete neural network.
        </p>
      </ExplanationBox>
    </div>
  );
}
