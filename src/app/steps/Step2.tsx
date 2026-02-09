'use client';

import ExplanationBox from '@/components/ExplanationBox';

export default function Step2() {
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
        padding: '40px 16px',
        margin: '20px 0',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <svg
          viewBox="0 0 480 160"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
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

          {/* Input boxes */}
          <rect x="20" y="22" width="90" height="40" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5"/>
          <text x="65" y="38" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">temperature</text>
          <text x="65" y="54" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="600">72°F</text>

          <rect x="20" y="98" width="90" height="40" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5"/>
          <text x="65" y="114" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">humidity</text>
          <text x="65" y="130" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="600">85%</text>

          {/* Input connectors - with gap from boxes and neuron */}
          <line x1="120" y1="42" x2="192" y2="72" stroke="#cbd5e1" strokeWidth="2"/>
          <line x1="120" y1="118" x2="192" y2="88" stroke="#cbd5e1" strokeWidth="2"/>

          {/* The neuron */}
          <circle cx="240" cy="80" r="40" fill="url(#neuronGradient)" filter="url(#neuronShadow)"/>
          <text x="240" y="88" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="700">?</text>

          {/* Output connector - with gap from neuron and output box */}
          <line x1="290" y1="80" x2="340" y2="80" stroke="#86efac" strokeWidth="2"/>

          {/* Output box */}
          <rect x="350" y="62" width="100" height="36" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
          <text x="400" y="85" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="600">82% rain</text>
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
