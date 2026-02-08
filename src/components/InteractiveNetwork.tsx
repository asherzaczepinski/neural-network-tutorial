'use client';

import { useState, useMemo } from 'react';

// Sigmoid activation function
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

// Network weights (pre-trained for weather prediction)
// Architecture: 2 inputs → 3 hidden (layer 1) → 3 hidden (layer 2) → 1 output
const WEIGHTS = {
  // Input to hidden layer 1 (2 inputs → 3 neurons)
  inputToHidden1: [
    [-0.3, 0.9],   // Hidden1 neuron 1: temp weight, humidity weight
    [0.5, 0.7],    // Hidden1 neuron 2
    [-0.4, 0.8],   // Hidden1 neuron 3
  ],
  // Hidden layer 1 to hidden layer 2 (3 → 3 neurons)
  hidden1ToHidden2: [
    [0.6, -0.3, 0.5],   // Hidden2 neuron 1 receives from all 3 in layer 1
    [0.4, 0.7, -0.2],   // Hidden2 neuron 2
    [-0.5, 0.6, 0.8],   // Hidden2 neuron 3
  ],
  // Hidden layer 2 to output (3 → 1)
  hidden2ToOutput: [0.7, 0.5, 0.6],
  // Biases
  hidden1Bias: [0.1, -0.2, 0.15],
  hidden2Bias: [-0.1, 0.2, -0.15],
  outputBias: -0.2,
};

interface NodeInfo {
  title: string;
  description: string;
  value: number;
  formula?: string;
}

export default function InteractiveNetwork() {
  const [temperature, setTemperature] = useState(0.7);
  const [humidity, setHumidity] = useState(0.8);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);

  // Compute forward pass through 2 hidden layers
  const computation = useMemo(() => {
    const inputs = [temperature, humidity];

    // Hidden layer 1 pre-activations and activations
    const hidden1Z: number[] = [];
    const hidden1A: number[] = [];

    for (let i = 0; i < 3; i++) {
      const z = inputs[0] * WEIGHTS.inputToHidden1[i][0] +
                inputs[1] * WEIGHTS.inputToHidden1[i][1] +
                WEIGHTS.hidden1Bias[i];
      hidden1Z.push(z);
      hidden1A.push(sigmoid(z));
    }

    // Hidden layer 2 pre-activations and activations
    const hidden2Z: number[] = [];
    const hidden2A: number[] = [];

    for (let i = 0; i < 3; i++) {
      const z = hidden1A[0] * WEIGHTS.hidden1ToHidden2[i][0] +
                hidden1A[1] * WEIGHTS.hidden1ToHidden2[i][1] +
                hidden1A[2] * WEIGHTS.hidden1ToHidden2[i][2] +
                WEIGHTS.hidden2Bias[i];
      hidden2Z.push(z);
      hidden2A.push(sigmoid(z));
    }

    // Output layer
    const outputZ = hidden2A[0] * WEIGHTS.hidden2ToOutput[0] +
                    hidden2A[1] * WEIGHTS.hidden2ToOutput[1] +
                    hidden2A[2] * WEIGHTS.hidden2ToOutput[2] +
                    WEIGHTS.outputBias;
    const outputA = sigmoid(outputZ);

    return { inputs, hidden1Z, hidden1A, hidden2Z, hidden2A, outputZ, outputA };
  }, [temperature, humidity]);

  // Get info for hovered element
  const getNodeInfo = (nodeId: string): NodeInfo | null => {
    switch (nodeId) {
      case 'input-temp':
        return {
          title: 'Temperature Input',
          description: 'Normalized temperature value (0 = cold, 1 = hot). This raw input will be weighted differently by each neuron in the first hidden layer.',
          value: temperature,
        };
      case 'input-humid':
        return {
          title: 'Humidity Input',
          description: 'Normalized humidity value (0 = dry, 1 = very humid). Higher humidity typically increases rain probability.',
          value: humidity,
        };
      case 'hidden1-0':
        return {
          title: 'Hidden Layer 1, Neuron 1',
          description: 'This neuron learned to detect "humid but cool" patterns. It has a negative temperature weight (-0.3) and strong humidity weight (0.9).',
          value: computation.hidden1A[0],
          formula: `z = (${temperature.toFixed(2)} × -0.3) + (${humidity.toFixed(2)} × 0.9) + 0.1 = ${computation.hidden1Z[0].toFixed(3)}`,
        };
      case 'hidden1-1':
        return {
          title: 'Hidden Layer 1, Neuron 2',
          description: 'This neuron activates when both inputs are moderate-to-high. It has positive weights for both temperature (0.5) and humidity (0.7).',
          value: computation.hidden1A[1],
          formula: `z = (${temperature.toFixed(2)} × 0.5) + (${humidity.toFixed(2)} × 0.7) + (-0.2) = ${computation.hidden1Z[1].toFixed(3)}`,
        };
      case 'hidden1-2':
        return {
          title: 'Hidden Layer 1, Neuron 3',
          description: 'Similar to neuron 1, this detects humid conditions with cooler temperatures. Weight: temp (-0.4), humidity (0.8).',
          value: computation.hidden1A[2],
          formula: `z = (${temperature.toFixed(2)} × -0.4) + (${humidity.toFixed(2)} × 0.8) + 0.15 = ${computation.hidden1Z[2].toFixed(3)}`,
        };
      case 'hidden2-0':
        return {
          title: 'Hidden Layer 2, Neuron 1',
          description: 'This neuron combines patterns from layer 1. It amplifies signals from neurons 1 and 3, but suppresses neuron 2.',
          value: computation.hidden2A[0],
          formula: `z = (${computation.hidden1A[0].toFixed(2)} × 0.6) + (${computation.hidden1A[1].toFixed(2)} × -0.3) + (${computation.hidden1A[2].toFixed(2)} × 0.5) + (-0.1) = ${computation.hidden2Z[0].toFixed(3)}`,
        };
      case 'hidden2-1':
        return {
          title: 'Hidden Layer 2, Neuron 2',
          description: 'This neuron strongly responds to layer 1 neuron 2, while slightly suppressing neuron 3.',
          value: computation.hidden2A[1],
          formula: `z = (${computation.hidden1A[0].toFixed(2)} × 0.4) + (${computation.hidden1A[1].toFixed(2)} × 0.7) + (${computation.hidden1A[2].toFixed(2)} × -0.2) + 0.2 = ${computation.hidden2Z[1].toFixed(3)}`,
        };
      case 'hidden2-2':
        return {
          title: 'Hidden Layer 2, Neuron 3',
          description: 'This neuron suppresses layer 1 neuron 1 but amplifies neurons 2 and 3, detecting a different pattern combination.',
          value: computation.hidden2A[2],
          formula: `z = (${computation.hidden1A[0].toFixed(2)} × -0.5) + (${computation.hidden1A[1].toFixed(2)} × 0.6) + (${computation.hidden1A[2].toFixed(2)} × 0.8) + (-0.15) = ${computation.hidden2Z[2].toFixed(3)}`,
        };
      case 'output':
        return {
          title: 'Output: Rain Probability',
          description: 'The final prediction! This neuron combines all layer 2 signals with its own weights to produce a probability between 0 and 1.',
          value: computation.outputA,
          formula: `z = (${computation.hidden2A[0].toFixed(2)} × 0.7) + (${computation.hidden2A[1].toFixed(2)} × 0.5) + (${computation.hidden2A[2].toFixed(2)} × 0.6) + (-0.2) = ${computation.outputZ.toFixed(3)}`,
        };
      default:
        return null;
    }
  };

  const getConnectionInfo = (connId: string): { title: string; description: string; weight: number; signal: number } | null => {
    const parts = connId.split('-');
    // Input to hidden1: conn-input-{inputIdx}-to-hidden1-{neuronIdx}
    if (parts[0] === 'conn' && parts[1] === 'input' && parts[3] === 'to' && parts[4] === 'hidden1') {
      const inputIdx = parseInt(parts[2]);
      const neuronIdx = parseInt(parts[5]);
      const weight = WEIGHTS.inputToHidden1[neuronIdx][inputIdx];
      const signal = computation.inputs[inputIdx];
      const inputName = inputIdx === 0 ? 'Temperature' : 'Humidity';
      return {
        title: `${inputName} → Layer 1, Neuron ${neuronIdx + 1}`,
        description: `This connection carries the ${inputName.toLowerCase()} signal (${signal.toFixed(2)}) multiplied by weight ${weight.toFixed(1)}. Contribution: ${(signal * weight).toFixed(3)}`,
        weight,
        signal,
      };
    }
    // Hidden1 to hidden2: conn-hidden1-{fromIdx}-to-hidden2-{toIdx}
    if (parts[0] === 'conn' && parts[1] === 'hidden1' && parts[3] === 'to' && parts[4] === 'hidden2') {
      const fromIdx = parseInt(parts[2]);
      const toIdx = parseInt(parts[5]);
      const weight = WEIGHTS.hidden1ToHidden2[toIdx][fromIdx];
      const signal = computation.hidden1A[fromIdx];
      return {
        title: `Layer 1 Neuron ${fromIdx + 1} → Layer 2 Neuron ${toIdx + 1}`,
        description: `This connection carries the activation from layer 1 neuron ${fromIdx + 1} (${signal.toFixed(3)}) multiplied by weight ${weight.toFixed(1)}. Contribution: ${(signal * weight).toFixed(3)}`,
        weight,
        signal,
      };
    }
    // Hidden2 to output: conn-hidden2-{idx}-to-output
    if (parts[0] === 'conn' && parts[1] === 'hidden2' && parts[3] === 'to' && parts[4] === 'output') {
      const neuronIdx = parseInt(parts[2]);
      const weight = WEIGHTS.hidden2ToOutput[neuronIdx];
      const signal = computation.hidden2A[neuronIdx];
      return {
        title: `Layer 2 Neuron ${neuronIdx + 1} → Output`,
        description: `This connection carries the activation from layer 2 neuron ${neuronIdx + 1} (${signal.toFixed(3)}) multiplied by weight ${weight.toFixed(1)}. Contribution: ${(signal * weight).toFixed(3)}`,
        weight,
        signal,
      };
    }
    return null;
  };

  // Get color based on activation value
  const getActivationColor = (value: number): string => {
    const intensity = Math.round(value * 255);
    return `rgb(${255 - intensity}, ${100 + intensity * 0.6}, ${100 + intensity * 0.6})`;
  };

  // Get line thickness based on signal strength
  const getLineThickness = (signal: number, weight: number): number => {
    return 1 + Math.abs(signal * weight) * 4;
  };

  // Get line color based on weight sign and signal
  const getLineColor = (signal: number, weight: number): string => {
    const strength = Math.abs(signal * weight);
    if (weight >= 0) {
      return `rgba(34, 197, 94, ${0.3 + strength * 0.7})`; // Green for positive
    }
    return `rgba(239, 68, 68, ${0.3 + strength * 0.7})`; // Red for negative
  };

  const nodeInfo = hoveredNode ? getNodeInfo(hoveredNode) : null;
  const connectionInfo = hoveredConnection ? getConnectionInfo(hoveredConnection) : null;
  const activeInfo = nodeInfo || connectionInfo;

  // SVG coordinates for 2 hidden layers
  const inputX = 60;
  const hidden1X = 180;
  const hidden2X = 320;
  const outputX = 440;
  const inputY = [100, 200];
  const hiddenY = [60, 150, 240];
  const outputY = 150;

  return (
    <div className="interactive-network">
      <div className="controls">
        <div className="control-group">
          <label>
            Temperature: <strong>{temperature.toFixed(2)}</strong>
            <span className="control-hint">(0 = cold, 1 = hot)</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>
            Humidity: <strong>{humidity.toFixed(2)}</strong>
            <span className="control-hint">(0 = dry, 1 = humid)</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={humidity}
            onChange={(e) => setHumidity(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="network-container">
        <svg viewBox="0 0 520 300" className="network-svg">
          {/* Connections: Input to Hidden Layer 1 */}
          {[0, 1].map(inputIdx =>
            [0, 1, 2].map(neuronIdx => {
              const connId = `conn-input-${inputIdx}-to-hidden1-${neuronIdx}`;
              const weight = WEIGHTS.inputToHidden1[neuronIdx][inputIdx];
              const signal = computation.inputs[inputIdx];
              return (
                <line
                  key={connId}
                  x1={inputX + 18}
                  y1={inputY[inputIdx]}
                  x2={hidden1X - 18}
                  y2={hiddenY[neuronIdx]}
                  stroke={getLineColor(signal, weight)}
                  strokeWidth={getLineThickness(signal, weight)}
                  className={`connection ${hoveredConnection === connId ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredConnection(connId)}
                  onMouseLeave={() => setHoveredConnection(null)}
                />
              );
            })
          )}

          {/* Connections: Hidden Layer 1 to Hidden Layer 2 */}
          {[0, 1, 2].map(fromIdx =>
            [0, 1, 2].map(toIdx => {
              const connId = `conn-hidden1-${fromIdx}-to-hidden2-${toIdx}`;
              const weight = WEIGHTS.hidden1ToHidden2[toIdx][fromIdx];
              const signal = computation.hidden1A[fromIdx];
              return (
                <line
                  key={connId}
                  x1={hidden1X + 18}
                  y1={hiddenY[fromIdx]}
                  x2={hidden2X - 18}
                  y2={hiddenY[toIdx]}
                  stroke={getLineColor(signal, weight)}
                  strokeWidth={getLineThickness(signal, weight)}
                  className={`connection ${hoveredConnection === connId ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredConnection(connId)}
                  onMouseLeave={() => setHoveredConnection(null)}
                />
              );
            })
          )}

          {/* Connections: Hidden Layer 2 to Output */}
          {[0, 1, 2].map(neuronIdx => {
            const connId = `conn-hidden2-${neuronIdx}-to-output`;
            const weight = WEIGHTS.hidden2ToOutput[neuronIdx];
            const signal = computation.hidden2A[neuronIdx];
            return (
              <line
                key={connId}
                x1={hidden2X + 18}
                y1={hiddenY[neuronIdx]}
                x2={outputX - 22}
                y2={outputY}
                stroke={getLineColor(signal, weight)}
                strokeWidth={getLineThickness(signal, weight)}
                className={`connection ${hoveredConnection === connId ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredConnection(connId)}
                onMouseLeave={() => setHoveredConnection(null)}
              />
            );
          })}

          {/* Input nodes */}
          <g
            className={`node ${hoveredNode === 'input-temp' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredNode('input-temp')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx={inputX} cy={inputY[0]} r={18} fill={getActivationColor(temperature)} stroke="#333" strokeWidth={2} />
            <text x={inputX} y={inputY[0] + 4} textAnchor="middle" fontSize={11} fontWeight="bold">{temperature.toFixed(1)}</text>
            <text x={inputX - 22} y={inputY[0] + 4} textAnchor="end" fontSize={9} fill="#666">Temp</text>
          </g>
          <g
            className={`node ${hoveredNode === 'input-humid' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredNode('input-humid')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx={inputX} cy={inputY[1]} r={18} fill={getActivationColor(humidity)} stroke="#333" strokeWidth={2} />
            <text x={inputX} y={inputY[1] + 4} textAnchor="middle" fontSize={11} fontWeight="bold">{humidity.toFixed(1)}</text>
            <text x={inputX - 22} y={inputY[1] + 4} textAnchor="end" fontSize={9} fill="#666">Humid</text>
          </g>

          {/* Hidden Layer 1 nodes */}
          {[0, 1, 2].map(i => (
            <g
              key={`hidden1-${i}`}
              className={`node ${hoveredNode === `hidden1-${i}` ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredNode(`hidden1-${i}`)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle cx={hidden1X} cy={hiddenY[i]} r={18} fill={getActivationColor(computation.hidden1A[i])} stroke="#333" strokeWidth={2} />
              <text x={hidden1X} y={hiddenY[i] + 4} textAnchor="middle" fontSize={10} fontWeight="bold">{computation.hidden1A[i].toFixed(2)}</text>
            </g>
          ))}

          {/* Hidden Layer 2 nodes */}
          {[0, 1, 2].map(i => (
            <g
              key={`hidden2-${i}`}
              className={`node ${hoveredNode === `hidden2-${i}` ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredNode(`hidden2-${i}`)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle cx={hidden2X} cy={hiddenY[i]} r={18} fill={getActivationColor(computation.hidden2A[i])} stroke="#333" strokeWidth={2} />
              <text x={hidden2X} y={hiddenY[i] + 4} textAnchor="middle" fontSize={10} fontWeight="bold">{computation.hidden2A[i].toFixed(2)}</text>
            </g>
          ))}

          {/* Output node */}
          <g
            className={`node ${hoveredNode === 'output' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredNode('output')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx={outputX} cy={outputY} r={22} fill={getActivationColor(computation.outputA)} stroke="#2563eb" strokeWidth={3} />
            <text x={outputX} y={outputY + 5} textAnchor="middle" fontSize={11} fontWeight="bold">{(computation.outputA * 100).toFixed(0)}%</text>
            <text x={outputX + 28} y={outputY + 4} textAnchor="start" fontSize={9} fill="#666">Rain</text>
          </g>

          {/* Layer labels */}
          <text x={inputX} y={280} textAnchor="middle" fontSize={9} fill="#999">INPUT</text>
          <text x={hidden1X} y={280} textAnchor="middle" fontSize={9} fill="#999">HIDDEN 1</text>
          <text x={hidden2X} y={280} textAnchor="middle" fontSize={9} fill="#999">HIDDEN 2</text>
          <text x={outputX} y={280} textAnchor="middle" fontSize={9} fill="#999">OUTPUT</text>
        </svg>

        {/* Info panel */}
        <div className={`info-panel ${activeInfo ? 'visible' : ''}`}>
          {activeInfo && (
            <>
              <h4>{nodeInfo?.title || connectionInfo?.title}</h4>
              <p>{nodeInfo?.description || connectionInfo?.description}</p>
              {nodeInfo?.formula && (
                <div className="formula">
                  <code>{nodeInfo.formula}</code>
                  <div className="activation">
                    {hoveredNode?.startsWith('hidden1-') && (
                      <>σ({computation.hidden1Z[parseInt(hoveredNode?.split('-')[1] || '0')].toFixed(3)}) = <strong>{nodeInfo.value.toFixed(4)}</strong></>
                    )}
                    {hoveredNode?.startsWith('hidden2-') && (
                      <>σ({computation.hidden2Z[parseInt(hoveredNode?.split('-')[1] || '0')].toFixed(3)}) = <strong>{nodeInfo.value.toFixed(4)}</strong></>
                    )}
                    {hoveredNode === 'output' && (
                      <>σ({computation.outputZ.toFixed(3)}) = <strong>{nodeInfo.value.toFixed(4)}</strong></>
                    )}
                  </div>
                </div>
              )}
              {connectionInfo && (
                <div className="weight-info">
                  <span className={connectionInfo.weight >= 0 ? 'positive' : 'negative'}>
                    Weight: {connectionInfo.weight.toFixed(1)}
                  </span>
                  <span>Signal: {connectionInfo.signal.toFixed(3)}</span>
                  <span>Contribution: {(connectionInfo.signal * connectionInfo.weight).toFixed(3)}</span>
                </div>
              )}
            </>
          )}
          {!activeInfo && (
            <p className="hint">Hover over nodes or connections to see details</p>
          )}
        </div>
      </div>

      <div className="prediction-summary">
        <div className="prediction-value">
          Rain Probability: <strong>{(computation.outputA * 100).toFixed(1)}%</strong>
        </div>
        <div className="prediction-interpretation">
          {computation.outputA > 0.7 ? 'High chance of rain - bring an umbrella!' :
           computation.outputA > 0.4 ? 'Moderate chance - maybe bring an umbrella.' :
           'Low chance of rain - probably safe to leave the umbrella.'}
        </div>
      </div>

      <style jsx>{`
        .interactive-network {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .controls {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .control-group {
          flex: 1;
          min-width: 200px;
        }

        .control-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 14px;
          color: #444;
        }

        .control-group strong {
          color: #2563eb;
          font-size: 16px;
        }

        .control-hint {
          display: block;
          font-size: 11px;
          color: #888;
          margin-top: 2px;
        }

        .control-group input[type="range"] {
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          background: #e2e8f0;
          border-radius: 4px;
          outline: none;
        }

        .control-group input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
        }

        .network-container {
          position: relative;
        }

        .network-svg {
          width: 100%;
          max-width: 500px;
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .network-svg .node {
          cursor: pointer;
          transition: transform 0.15s;
        }

        .network-svg .node.hovered circle {
          stroke-width: 4;
          filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.5));
        }

        .network-svg .connection {
          cursor: pointer;
          transition: stroke-width 0.15s;
        }

        .network-svg .connection.hovered {
          stroke-width: 6 !important;
          filter: drop-shadow(0 0 4px currentColor);
        }

        .info-panel {
          margin-top: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          min-height: 100px;
          transition: opacity 0.2s;
        }

        .info-panel h4 {
          margin: 0 0 0.5rem 0;
          color: #2563eb;
          font-size: 15px;
        }

        .info-panel p {
          margin: 0;
          font-size: 14px;
          color: #555;
          line-height: 1.5;
        }

        .info-panel .hint {
          color: #999;
          font-style: italic;
          text-align: center;
        }

        .formula {
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: #f1f5f9;
          border-radius: 6px;
          font-size: 13px;
        }

        .formula code {
          display: block;
          color: #334155;
          font-family: 'SF Mono', Monaco, monospace;
        }

        .formula .activation {
          margin-top: 0.5rem;
          color: #666;
        }

        .formula .activation strong {
          color: #2563eb;
        }

        .weight-info {
          margin-top: 0.75rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 13px;
        }

        .weight-info span {
          padding: 0.25rem 0.5rem;
          background: #f1f5f9;
          border-radius: 4px;
        }

        .weight-info .positive {
          color: #16a34a;
          background: #f0fdf4;
        }

        .weight-info .negative {
          color: #dc2626;
          background: #fef2f2;
        }

        .prediction-summary {
          margin-top: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          border-radius: 8px;
          color: white;
          text-align: center;
        }

        .prediction-value {
          font-size: 18px;
        }

        .prediction-value strong {
          font-size: 28px;
          display: block;
          margin-top: 0.25rem;
        }

        .prediction-interpretation {
          margin-top: 0.5rem;
          font-size: 14px;
          opacity: 0.9;
        }

        @media (max-width: 640px) {
          .controls {
            flex-direction: column;
            gap: 1rem;
          }

          .network-svg {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
