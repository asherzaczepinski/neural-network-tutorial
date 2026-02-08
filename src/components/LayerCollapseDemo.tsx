'use client';

import { useState } from 'react';

export default function LayerCollapseDemo() {
  const [temp, setTemp] = useState(0.7);
  const [humid, setHumid] = useState(0.8);

  const E = 2.71828;
  const sigmoid = (z: number) => 1 / (1 + Math.pow(E, -z));

  // For LINEAR: simple weights that give a diagonal boundary
  const linearW = [0.8, 0.8];  // equal weight on both inputs
  const linearB = -0.6;

  // Linear prediction (just weighted sum)
  const linearOutput = temp * linearW[0] + humid * linearW[1] + linearB;

  // For SIGMOID network: 2 hidden neurons to create curved boundary
  // These weights create an AND-like pattern (need BOTH high humidity AND moderate temp)
  const h1_w = [2.0, 6.0];   // neuron 1: strongly wants high humidity
  const h1_b = -4.0;
  const h2_w = [-6.0, 2.0];  // neuron 2: strongly wants LOW temperature
  const h2_b = 3.0;
  // Output: needs BOTH neurons to fire (AND gate behavior)
  const out_w = [8.0, 8.0];
  const out_b = -10.0;

  // Sigmoid forward pass
  const h1_pre = temp * h1_w[0] + humid * h1_w[1] + h1_b;
  const h1_out = sigmoid(h1_pre);
  const h2_pre = temp * h2_w[0] + humid * h2_w[1] + h2_b;
  const h2_out = sigmoid(h2_pre);
  const out_pre = h1_out * out_w[0] + h2_out * out_w[1] + out_b;
  const sigmoidOutput = sigmoid(out_pre);

  // Helper to compute sigmoid prediction for any point
  const getSigmoidPred = (t: number, h: number) => {
    const h1 = sigmoid(t * h1_w[0] + h * h1_w[1] + h1_b);
    const h2 = sigmoid(t * h2_w[0] + h * h2_w[1] + h2_b);
    return sigmoid(h1 * out_w[0] + h2 * out_w[1] + out_b);
  };

  // Decision boundary for linear: where output = 0.5
  // temp * linearW[0] + humid * linearW[1] + linearB = 0.5
  // humid = (0.5 - linearB - temp * linearW[0]) / linearW[1]
  const getLinearBoundaryHumid = (t: number) => {
    return (0.5 - linearB - t * linearW[0]) / linearW[1];
  };

  // Graph dimensions
  const graphSize = 320;
  const padding = 45;
  const innerSize = graphSize - padding * 2;

  const toSvgX = (val: number) => padding + val * innerSize;
  const toSvgY = (val: number) => graphSize - padding - val * innerSize;

  // Generate heatmap for sigmoid version
  const heatmapCells = [];
  const cellSize = innerSize / 20;
  for (let ti = 0; ti < 20; ti++) {
    for (let hi = 0; hi < 20; hi++) {
      const t = ti / 20 + 0.025;
      const h = hi / 20 + 0.025;
      const pred = getSigmoidPred(t, h);
      heatmapCells.push({ ti, hi, pred });
    }
  }

  // Check if current point is in "rain" zone
  const linearPrediction = linearOutput >= 0.5 ? 'RAIN' : 'NO RAIN';
  const sigmoidPrediction = sigmoidOutput >= 0.5 ? 'RAIN' : 'NO RAIN';

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Sliders */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Temperature (t): {temp.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temp}
            onChange={(e) => setTemp(parseFloat(e.target.value))}
            style={{ width: '180px' }}
          />
          <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
            {temp < 0.3 ? '❄️ Cold' : temp < 0.6 ? '🌤️ Cool' : temp < 0.8 ? '☀️ Warm' : '🔥 Hot'}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Humidity (h): {humid.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={humid}
            onChange={(e) => setHumid(parseFloat(e.target.value))}
            style={{ width: '180px' }}
          />
          <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
            {humid < 0.3 ? '🏜️ Dry' : humid < 0.6 ? '🌤️ Normal' : humid < 0.8 ? '💧 Humid' : '💦 Very Humid'}
          </div>
        </div>
      </div>

      {/* DESMOS-STYLE EQUATION DISPLAY */}
      <div style={{
        background: '#1e1e1e',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        fontFamily: 'monospace'
      }}>
        <div style={{ color: '#888', fontSize: '12px', marginBottom: '0.75rem' }}>
          LINEAR DECISION BOUNDARY EQUATION
        </div>

        <div style={{ color: '#fff', fontSize: '16px', lineHeight: '2' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: '#4ade80' }}>y</span>
            <span style={{ color: '#888' }}> = </span>
            <span style={{ color: '#f472b6' }}>{linearW[0].toFixed(2)}</span>
            <span style={{ color: '#888' }}>·</span>
            <span style={{ color: '#60a5fa' }}>t</span>
            <span style={{ color: '#888' }}> + </span>
            <span style={{ color: '#f472b6' }}>{linearW[1].toFixed(2)}</span>
            <span style={{ color: '#888' }}>·</span>
            <span style={{ color: '#60a5fa' }}>h</span>
            <span style={{ color: '#888' }}> + </span>
            <span style={{ color: '#c084fc' }}>{linearB.toFixed(2)}</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #333'
          }}>
            <div>
              <span style={{ color: '#888' }}>t = </span>
              <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{temp.toFixed(2)}</span>
            </div>
            <div>
              <span style={{ color: '#888' }}>h = </span>
              <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{humid.toFixed(2)}</span>
            </div>
            <div>
              <span style={{ color: '#888' }}>y = </span>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{linearOutput.toFixed(3)}</span>
            </div>
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: linearOutput >= 0.5 ? '#1e3a5f' : '#3f2c1b',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <span style={{ color: '#888' }}>If </span>
            <span style={{ color: '#4ade80' }}>y</span>
            <span style={{ color: '#888' }}> ≥ 0.5 → </span>
            <span style={{ color: '#60a5fa' }}>RAIN</span>
            <span style={{ color: '#888' }}> | If </span>
            <span style={{ color: '#4ade80' }}>y</span>
            <span style={{ color: '#888' }}> &lt; 0.5 → </span>
            <span style={{ color: '#fbbf24' }}>NO RAIN</span>
            <div style={{
              marginTop: '0.5rem',
              fontSize: '18px',
              color: linearOutput >= 0.5 ? '#60a5fa' : '#fbbf24'
            }}>
              {linearOutput.toFixed(3)} {linearOutput >= 0.5 ? '≥' : '<'} 0.5 → <strong>{linearPrediction}</strong> {linearOutput >= 0.5 ? '🌧️' : '☀️'}
            </div>
          </div>
        </div>
      </div>

      {/* Calculation boxes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* LINEAR */}
        <div style={{
          background: '#fef2f2',
          border: '2px solid #fca5a5',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#dc2626' }}>
            LINEAR (One Straight Line)
          </h4>

          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <div style={{
              background: '#fff',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              <strong>Simple weighted sum:</strong><br />
              <span style={{color: '#2563eb'}}>{temp.toFixed(2)}</span>×(<span style={{color: '#dc2626'}}>{linearW[0]}</span>) + <span style={{color: '#2563eb'}}>{humid.toFixed(2)}</span>×(<span style={{color: '#dc2626'}}>{linearW[1]}</span>) + <span style={{color: '#9333ea'}}>{linearB}</span><br />
              = <strong>{linearOutput.toFixed(3)}</strong>
            </div>

            <div style={{
              background: '#fee2e2',
              padding: '0.75rem',
              borderRadius: '8px',
              borderLeft: '4px solid #dc2626'
            }}>
              <strong>Can only draw ONE straight line</strong><br />
              <span style={{ fontSize: '13px', color: '#991b1b' }}>
                No matter how many linear layers you stack, it&apos;s still just one line!
              </span>
            </div>
          </div>
        </div>

        {/* WITH SIGMOID */}
        <div style={{
          background: '#f0fdf4',
          border: '2px solid #86efac',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#16a34a' }}>
            WITH Sigmoid (Curved Boundary)
          </h4>

          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <div style={{
              background: '#fff',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '0.25rem'
            }}>
              <strong>Hidden neuron 1:</strong> sigmoid({(temp * h1_w[0] + humid * h1_w[1] + h1_b).toFixed(2)}) = <strong>{h1_out.toFixed(3)}</strong>
            </div>

            <div style={{
              background: '#fff',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '0.25rem'
            }}>
              <strong>Hidden neuron 2:</strong> sigmoid({(temp * h2_w[0] + humid * h2_w[1] + h2_b).toFixed(2)}) = <strong>{h2_out.toFixed(3)}</strong>
            </div>

            <div style={{
              background: '#dcfce7',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              marginBottom: '0.25rem',
              textAlign: 'center',
              fontSize: '13px'
            }}>
              ↓ <strong>Combine: {h1_out.toFixed(2)}×3 + {h2_out.toFixed(2)}×3 - 3 = {out_pre.toFixed(2)}</strong> ↓
            </div>

            <div style={{
              background: '#fff',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              <strong>Output:</strong> sigmoid({out_pre.toFixed(2)}) = <strong>{sigmoidOutput.toFixed(3)}</strong>
            </div>

            <div style={{
              background: '#bbf7d0',
              padding: '0.75rem',
              borderRadius: '8px',
              borderLeft: '4px solid #16a34a'
            }}>
              <strong>{(sigmoidOutput * 100).toFixed(1)}% rain chance</strong><br />
              <span style={{ fontSize: '13px', color: '#166534' }}>Curved boundary = more expressive!</span>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPHS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Linear Decision Boundary Graph */}
        <div style={{
          background: '#fff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '1rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '15px', color: '#374151' }}>
            Linear: Just One Line
          </h4>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
            Boundary: {linearW[0]}t + {linearW[1]}h + {linearB} = 0.5
          </div>
          <svg width={graphSize} height={graphSize} style={{ display: 'block', margin: '0 auto' }}>
            <defs>
              <clipPath id="graphClipLinear">
                <rect x={padding} y={padding} width={innerSize} height={innerSize} />
              </clipPath>
            </defs>

            {/* Rain region (blue) */}
            <polygon
              points={`${padding},${padding} ${padding},${toSvgY(getLinearBoundaryHumid(0))} ${graphSize-padding},${toSvgY(getLinearBoundaryHumid(1))} ${graphSize-padding},${padding}`}
              fill="#dbeafe"
              clipPath="url(#graphClipLinear)"
            />

            {/* No rain region (yellow) */}
            <polygon
              points={`${padding},${toSvgY(getLinearBoundaryHumid(0))} ${padding},${graphSize-padding} ${graphSize-padding},${graphSize-padding} ${graphSize-padding},${toSvgY(getLinearBoundaryHumid(1))}`}
              fill="#fef3c7"
              clipPath="url(#graphClipLinear)"
            />

            {/* Grid */}
            {[0, 0.25, 0.5, 0.75, 1].map(v => (
              <g key={v}>
                <line x1={toSvgX(v)} y1={padding} x2={toSvgX(v)} y2={graphSize-padding} stroke="#e5e7eb" strokeWidth="1" />
                <line x1={padding} y1={toSvgY(v)} x2={graphSize-padding} y2={toSvgY(v)} stroke="#e5e7eb" strokeWidth="1" />
                <text x={toSvgX(v)} y={graphSize - padding + 15} textAnchor="middle" fontSize="10" fill="#666">{v}</text>
                <text x={padding - 8} y={toSvgY(v) + 4} textAnchor="end" fontSize="10" fill="#666">{v}</text>
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={graphSize-padding} x2={graphSize-padding} y2={graphSize-padding} stroke="#374151" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={graphSize-padding} stroke="#374151" strokeWidth="2" />

            {/* Decision boundary line */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(getLinearBoundaryHumid(0))}
              x2={toSvgX(1)}
              y2={toSvgY(getLinearBoundaryHumid(1))}
              stroke="#dc2626"
              strokeWidth="3"
              clipPath="url(#graphClipLinear)"
            />

            {/* Current point */}
            <circle cx={toSvgX(temp)} cy={toSvgY(humid)} r="10" fill={linearPrediction === 'RAIN' ? '#2563eb' : '#f59e0b'} stroke="#fff" strokeWidth="3" />

            {/* Labels */}
            <text x={graphSize/2} y={graphSize - 5} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">Temperature (t)</text>
            <text x={15} y={graphSize/2} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600" transform={`rotate(-90, 15, ${graphSize/2})`}>Humidity (h)</text>

            {/* Region labels */}
            <text x={padding + 15} y={padding + 20} fontSize="13" fill="#1e40af" fontWeight="600">🌧️ RAIN</text>
            <text x={graphSize - padding - 70} y={graphSize - padding - 10} fontSize="13" fill="#b45309" fontWeight="600">☀️ NO RAIN</text>
          </svg>
        </div>

        {/* Sigmoid Heatmap Graph */}
        <div style={{
          background: '#fff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '1rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '15px', color: '#374151' }}>
            With Sigmoid: Gradient of Predictions
          </h4>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.75rem' }}>
            Color = rain probability (darker = more likely)
          </div>
          <svg width={graphSize} height={graphSize} style={{ display: 'block', margin: '0 auto' }}>
            {/* Heatmap cells */}
            {heatmapCells.map(({ ti, hi, pred }) => (
              <rect
                key={`${ti}-${hi}`}
                x={padding + ti * cellSize}
                y={graphSize - padding - (hi + 1) * cellSize}
                width={cellSize + 0.5}
                height={cellSize + 0.5}
                fill={`hsl(${200 - pred * 160}, ${60 + pred * 30}%, ${85 - pred * 45}%)`}
              />
            ))}

            {/* Grid labels */}
            {[0, 0.25, 0.5, 0.75, 1].map(v => (
              <g key={v}>
                <text x={toSvgX(v)} y={graphSize - padding + 15} textAnchor="middle" fontSize="10" fill="#666">{v}</text>
                <text x={padding - 8} y={toSvgY(v) + 4} textAnchor="end" fontSize="10" fill="#666">{v}</text>
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={graphSize-padding} x2={graphSize-padding} y2={graphSize-padding} stroke="#374151" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={graphSize-padding} stroke="#374151" strokeWidth="2" />

            {/* 50% contour line for sigmoid - scan horizontally for each t value */}
            {(() => {
              // For each temperature value, find the humidity where prediction = 0.5
              const contourPoints: {x: number, y: number}[] = [];
              for (let ti = 0; ti <= 40; ti++) {
                const t = ti / 40;
                // Binary search for humidity where pred ≈ 0.5
                let lowH = 0, highH = 1;
                for (let iter = 0; iter < 20; iter++) {
                  const midH = (lowH + highH) / 2;
                  const pred = getSigmoidPred(t, midH);
                  if (pred < 0.5) {
                    lowH = midH;
                  } else {
                    highH = midH;
                  }
                }
                const h = (lowH + highH) / 2;
                if (h > 0.01 && h < 0.99) {
                  contourPoints.push({ x: toSvgX(t), y: toSvgY(h) });
                }
              }
              if (contourPoints.length > 2) {
                const pathD = `M ${contourPoints.map(p => `${p.x},${p.y}`).join(' L ')}`;
                return <path d={pathD} stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
              }
              return null;
            })()}

            {/* Current point */}
            <circle cx={toSvgX(temp)} cy={toSvgY(humid)} r="10" fill={sigmoidPrediction === 'RAIN' ? '#2563eb' : '#f59e0b'} stroke="#fff" strokeWidth="3" />

            {/* Labels */}
            <text x={graphSize/2} y={graphSize - 5} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">Temperature (t)</text>
            <text x={15} y={graphSize/2} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600" transform={`rotate(-90, 15, ${graphSize/2})`}>Humidity (h)</text>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '12px' }}>
            <span>0%</span>
            <div style={{
              width: '120px',
              height: '12px',
              background: 'linear-gradient(to right, hsl(200, 60%, 85%), hsl(40, 90%, 40%))',
              borderRadius: '4px'
            }}></div>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#f0f9ff',
        borderRadius: '8px',
        fontSize: '14px',
        border: '1px solid #bae6fd'
      }}>
        <strong>🎯 Key Insight:</strong>
        <ul style={{ marginTop: '0.5rem', marginLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>The <span style={{color: '#dc2626', fontWeight: 600}}>red line</span> in the left graph is the ONLY thing a linear network can learn — one straight boundary</li>
          <li>The <span style={{color: '#16a34a', fontWeight: 600}}>gradient</span> in the right graph shows sigmoid can learn smooth transitions — not just &quot;yes/no&quot;</li>
          <li><span style={{color: '#9333ea', fontWeight: 600}}>Biases</span> shift where the boundary sits (try imagining moving the line up/down)</li>
          <li><span style={{color: '#dc2626', fontWeight: 600}}>Weights</span> control the angle/steepness of the boundary</li>
        </ul>
      </div>
    </div>
  );
}
