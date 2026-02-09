'use client';

import ExplanationBox from '@/components/ExplanationBox';

interface StepProps {
  onComplete: () => void;
}

export default function Step2({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="The Simple Version">
        <p>
          A neuron takes in numbers, does some math, and spits out one number between 0 and 1.
          That&apos;s it. The output is called the <strong>activation</strong>—think of it as the
          neuron&apos;s confidence level. Let&apos;s say we want a neuron that predicts rain. We feed
          it temperature and humidity, it does some math we haven&apos;t learned yet, and
          outputs <strong>0.82</strong>—meaning &quot;I&apos;m 82% confident it&apos;s going to rain.&quot;
          Feed it a dry day and it might output 0.15. Same neuron, different inputs, different answer.
        </p>
      </ExplanationBox>

      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '16px',
        padding: '40px 24px',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <svg width="440" height="160" viewBox="0 0 440 160">
          {/* Input boxes */}
          <rect x="10" y="25" width="90" height="36" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5"/>
          <text x="55" y="40" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">temperature</text>
          <text x="55" y="54" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="600">72°F</text>

          <rect x="10" y="99" width="90" height="36" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5"/>
          <text x="55" y="114" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">humidity</text>
          <text x="55" y="128" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="600">85%</text>

          {/* Input arrows */}
          <line x1="100" y1="43" x2="155" y2="75" stroke="#cbd5e1" strokeWidth="2"/>
          <line x1="100" y1="117" x2="155" y2="85" stroke="#cbd5e1" strokeWidth="2"/>

          {/* The neuron - gradient circle */}
          <defs>
            <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
            <filter id="neuronShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7c3aed" floodOpacity="0.3"/>
            </filter>
          </defs>
          <circle cx="200" cy="80" r="40" fill="url(#neuronGradient)" filter="url(#neuronShadow)"/>
          <text x="200" y="75" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="500">neuron</text>
          <text x="200" y="92" textAnchor="middle" fill="#ede9fe" fontSize="18" fontWeight="700">?</text>

          {/* Output arrow */}
          <line x1="240" y1="80" x2="310" y2="80" stroke="#86efac" strokeWidth="3"/>
          <polygon points="310,80 300,74 300,86" fill="#22c55e"/>

          {/* Output box */}
          <rect x="320" y="50" width="110" height="60" rx="10" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
          <text x="375" y="70" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="500">activation</text>
          <text x="375" y="88" textAnchor="middle" fill="#15803d" fontSize="18" fontWeight="700">0.82</text>
          <text x="375" y="102" textAnchor="middle" fill="#16a34a" fontSize="9" fontWeight="500">chance of rain</text>
        </svg>
      </div>

      <ExplanationBox title="The Big Picture">
        <p>
          One neuron can only do so much. It looks at inputs and makes a simple judgment call.
        </p>
        <p>
          But here&apos;s the trick: you can chain neurons together. One neuron&apos;s confidence
          becomes another neuron&apos;s input. That second neuron can detect patterns in how confident
          the first neurons are. Stack hundreds of them in layers, and suddenly you can recognize
          faces, understand speech, or beat humans at chess.
        </p>
        <p>
          We&apos;ll get into all that later. For now, we need to understand what&apos;s happening
          inside that purple circle. What math is the neuron actually doing?
        </p>
      </ExplanationBox>
    </div>
  );
}
