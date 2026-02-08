'use client';

import { useState, useEffect, useRef } from 'react';
import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

// Neural network implementation
class NeuralNetwork {
  E = 2.71828;
  w1: number[][];
  b1: number[];
  w2: number[][];
  b2: number[];
  z1: number[] = [];
  a1: number[] = [];
  z2: number = 0;
  a2: number = 0;

  constructor() {
    // Random initialization
    this.w1 = [
      [Math.random() * 2 - 1, Math.random() * 2 - 1],
      [Math.random() * 2 - 1, Math.random() * 2 - 1],
      [Math.random() * 2 - 1, Math.random() * 2 - 1],
      [Math.random() * 2 - 1, Math.random() * 2 - 1],
    ];
    this.b1 = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.w2 = [[Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1]];
    this.b2 = [Math.random() * 2 - 1];
  }

  sigmoid(z: number): number {
    return 1 / (1 + Math.pow(this.E, -Math.max(-500, Math.min(500, z))));
  }

  sigmoidDerivative(z: number): number {
    const s = this.sigmoid(z);
    return s * (1 - s);
  }

  forward(inputs: number[]): number {
    // Hidden layer
    this.z1 = [];
    this.a1 = [];
    for (let i = 0; i < 4; i++) {
      const z = inputs[0] * this.w1[i][0] + inputs[1] * this.w1[i][1] + this.b1[i];
      this.z1.push(z);
      this.a1.push(this.sigmoid(z));
    }

    // Output layer
    this.z2 = this.a1.reduce((sum, a, j) => sum + a * this.w2[0][j], 0) + this.b2[0];
    this.a2 = this.sigmoid(this.z2);
    return this.a2;
  }

  backward(inputs: number[], target: number, lr: number): number {
    // Output layer
    const error = this.a2 - target;
    const d2 = error * this.sigmoidDerivative(this.z2);

    // Update output weights
    for (let j = 0; j < 4; j++) {
      this.w2[0][j] -= lr * d2 * this.a1[j];
    }
    this.b2[0] -= lr * d2;

    // Hidden layer
    for (let i = 0; i < 4; i++) {
      const d1 = d2 * this.w2[0][i] * this.sigmoidDerivative(this.z1[i]);
      for (let j = 0; j < 2; j++) {
        this.w1[i][j] -= lr * d1 * inputs[j];
      }
      this.b1[i] -= lr * d1;
    }

    return error * error;
  }
}

export default function Step17({ onComplete }: StepProps) {
  setTimeout(() => onComplete(), 100);

  const [network, setNetwork] = useState<NeuralNetwork | null>(null);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(0);
  const [predictions, setPredictions] = useState<number[]>([0.5, 0.5, 0.5, 0.5]);
  const [isTraining, setIsTraining] = useState(false);
  const [learningRate, setLearningRate] = useState(0.5);
  const [speed, setSpeed] = useState(50);
  const [hasCompleted, setHasCompleted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const XOR_INPUTS = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const XOR_TARGETS = [0, 1, 1, 0];

  useEffect(() => {
    resetNetwork();
  }, []);

  useEffect(() => {
    if (network) {
      drawNetwork();
    }
  }, [network, predictions]);

  const resetNetwork = () => {
    setIsTraining(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    const nn = new NeuralNetwork();
    setNetwork(nn);
    setEpoch(0);
    setLoss(0);
    setPredictions([0.5, 0.5, 0.5, 0.5]);
    setHasCompleted(false);
  };

  const trainStep = () => {
    if (!network) return;

    let totalLoss = 0;
    const newPreds: number[] = [];

    for (let i = 0; i < 4; i++) {
      network.forward(XOR_INPUTS[i]);
      newPreds.push(network.a2);
      totalLoss += network.backward(XOR_INPUTS[i], XOR_TARGETS[i], learningRate);
    }

    setEpoch((e) => e + 1);
    setLoss(totalLoss);
    setPredictions(newPreds);

    // Check if network has learned XOR
    const correct = newPreds.filter((p, i) =>
      (p > 0.5 && XOR_TARGETS[i] === 1) || (p < 0.5 && XOR_TARGETS[i] === 0)
    ).length;

    if (correct === 4 && !hasCompleted) {
      setHasCompleted(true);
      onComplete();
    }
  };

  const startTraining = () => {
    if (isTraining) {
      setIsTraining(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    setIsTraining(true);
    const train = () => {
      trainStep();
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(train, 101 - speed);
      });
    };
    train();
  };

  const drawNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas || !network) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#1e1e2e';
    ctx.fillRect(0, 0, width, height);

    // Layer positions
    const inputX = 80;
    const hiddenX = width / 2;
    const outputX = width - 80;

    const inputPositions = [[inputX, height / 3], [inputX, (2 * height) / 3]];
    const hiddenPositions = [
      [hiddenX, height / 5],
      [hiddenX, (2 * height) / 5],
      [hiddenX, (3 * height) / 5],
      [hiddenX, (4 * height) / 5],
    ];
    const outputPosition = [outputX, height / 2];

    // Draw connections
    // Input to hidden
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        const weight = network.w1[j][i];
        const intensity = Math.min(Math.abs(weight), 1);
        ctx.strokeStyle = weight > 0
          ? `rgba(76, 175, 80, ${0.3 + intensity * 0.7})`
          : `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`;
        ctx.lineWidth = 1 + Math.abs(weight) * 2;
        ctx.beginPath();
        ctx.moveTo(inputPositions[i][0], inputPositions[i][1]);
        ctx.lineTo(hiddenPositions[j][0], hiddenPositions[j][1]);
        ctx.stroke();
      }
    }

    // Hidden to output
    for (let i = 0; i < 4; i++) {
      const weight = network.w2[0][i];
      const intensity = Math.min(Math.abs(weight), 1);
      ctx.strokeStyle = weight > 0
        ? `rgba(76, 175, 80, ${0.3 + intensity * 0.7})`
        : `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`;
      ctx.lineWidth = 1 + Math.abs(weight) * 2;
      ctx.beginPath();
      ctx.moveTo(hiddenPositions[i][0], hiddenPositions[i][1]);
      ctx.lineTo(outputPosition[0], outputPosition[1]);
      ctx.stroke();
    }

    // Draw neurons
    const drawNeuron = (x: number, y: number, value: number, label: string) => {
      const radius = 25;
      const glow = Math.floor(value * 30);

      ctx.shadowBlur = glow;
      ctx.shadowColor = '#3b82f6';

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgb(${59 + value * 50}, ${130 + value * 50}, ${246})`);
      gradient.addColorStop(1, `rgb(${39 + value * 30}, ${100 + value * 30}, ${200})`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toFixed(2), x, y);

      ctx.fillStyle = '#a0a0b0';
      ctx.font = '10px sans-serif';
      ctx.fillText(label, x, y + radius + 12);
    };

    // Draw input neurons (use current XOR test)
    drawNeuron(inputPositions[0][0], inputPositions[0][1], 0.5, 'x₁');
    drawNeuron(inputPositions[1][0], inputPositions[1][1], 0.5, 'x₂');

    // Draw hidden neurons
    for (let i = 0; i < 4; i++) {
      drawNeuron(hiddenPositions[i][0], hiddenPositions[i][1], network.a1[i] || 0.5, `h${i + 1}`);
    }

    // Draw output neuron
    drawNeuron(outputPosition[0], outputPosition[1], network.a2 || 0.5, 'out');

    // Layer labels
    ctx.fillStyle = '#64b5f6';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Input', inputX, 25);
    ctx.fillText('Hidden', hiddenX, 25);
    ctx.fillText('Output', outputX, 25);
  };

  const getAccuracy = () => {
    return predictions.filter((p, i) =>
      (p > 0.5 && XOR_TARGETS[i] === 1) || (p < 0.5 && XOR_TARGETS[i] === 0)
    ).length;
  };

  return (
    <div>
      <ExplanationBox title="The Final Challenge: Learning XOR">
        <p>
          This is it - the moment everything comes together. XOR (exclusive or) is a classic
          problem that <strong>cannot be solved by a single neuron</strong> because it&apos;s not
          linearly separable. But a neural network with a hidden layer can learn it!
        </p>
        <p>
          Watch as your network starts with random weights (producing random outputs), then
          gradually learns the XOR pattern through backpropagation and gradient descent.
        </p>
      </ExplanationBox>

      <table style={{ marginBottom: '1.5rem' }}>
        <thead>
          <tr>
            <th>Input 1</th>
            <th>Input 2</th>
            <th>XOR (Target)</th>
            <th>Network Output</th>
            <th>Correct?</th>
          </tr>
        </thead>
        <tbody>
          {XOR_INPUTS.map((input, i) => {
            const pred = predictions[i];
            const target = XOR_TARGETS[i];
            const correct = (pred > 0.5 && target === 1) || (pred < 0.5 && target === 0);
            return (
              <tr key={i}>
                <td>{input[0]}</td>
                <td>{input[1]}</td>
                <td>{target}</td>
                <td style={{ color: correct ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {pred.toFixed(4)}
                </td>
                <td>{correct ? '✓' : '✗'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{epoch}</div>
          <div className="stat-label">Epoch</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{loss.toFixed(4)}</div>
          <div className="stat-label">Total Loss</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{getAccuracy()}/4</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{(getAccuracy() / 4 * 100).toFixed(0)}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} width={500} height={300} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button className="btn btn-success" onClick={startTraining}>
          {isTraining ? '⏸ Pause' : '▶ Start Training'}
        </button>
        <button className="btn btn-secondary" onClick={resetNetwork}>
          🔄 Reset
        </button>
        <button className="btn btn-secondary" onClick={trainStep} disabled={isTraining}>
          Step Once
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Speed:
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Learning Rate:
          <input
            type="range"
            min="1"
            max="200"
            value={learningRate * 100}
            onChange={(e) => setLearningRate(parseInt(e.target.value) / 100)}
          />
          {learningRate.toFixed(2)}
        </label>
      </div>

      {hasCompleted && (
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #34d399)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
          <h2 style={{ marginBottom: '0.5rem', color: 'white' }}>Congratulations!</h2>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}>
            Your neural network learned XOR from scratch!
          </p>
        </div>
      )}

      <ExplanationBox title="What Just Happened">
        <p>
          Your network started with random weights, producing essentially random outputs
          (around 0.5 for everything). Through thousands of tiny adjustments:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Forward pass</strong>: Computed predictions for each XOR input</li>
          <li><strong>Loss calculation</strong>: Measured how wrong each prediction was</li>
          <li><strong>Backpropagation</strong>: Computed gradients for every weight</li>
          <li><strong>Gradient descent</strong>: Updated weights to reduce loss</li>
          <li><strong>Repeat</strong>: Each cycle improved the network slightly</li>
        </ol>
      </ExplanationBox>

      <ExplanationBox title="Why XOR Needs a Hidden Layer">
        <p>
          XOR is special because you can&apos;t draw a single straight line to separate the 0s
          from the 1s:
        </p>
        <div style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          margin: '1rem 0',
          textAlign: 'center'
        }}>
          <pre style={{ background: 'transparent', padding: 0 }}>
{`    x₂
    1 |  1    0
      |
    0 |  0    1
      +---------> x₁
         0    1`}
          </pre>
        </div>
        <p>
          The 1s are at opposite corners! A single neuron can only draw one line (linear
          boundary), but XOR needs a curved or multi-line boundary. The hidden layer
          enables this by creating intermediate features that <em>are</em> linearly separable.
        </p>
      </ExplanationBox>

      <WorkedExample title="What the Hidden Neurons Learned">
        <p>After training, the hidden neurons typically specialize:</p>
        <CalcStep number={1}>Neuron 1: Detects when both inputs are similar (0,0) or (1,1)</CalcStep>
        <CalcStep number={2}>Neuron 2: Detects when inputs are different (0,1) or (1,0)</CalcStep>
        <CalcStep number={3}>Output: Combines these features to compute XOR</CalcStep>
        <p style={{ marginTop: '1rem' }}>
          The network discovered this decomposition on its own through gradient descent!
          Nobody told it this was a good strategy - it emerged from the learning process.
        </p>
      </WorkedExample>

      <ExplanationBox title="You Built a Neural Network From Scratch!">
        <p>
          In 17 steps, you implemented:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>✓ Neurons with weights, biases, and activation functions</li>
          <li>✓ Layers of multiple neurons</li>
          <li>✓ Multi-layer network architecture</li>
          <li>✓ Forward propagation</li>
          <li>✓ Loss functions</li>
          <li>✓ Derivatives and the chain rule</li>
          <li>✓ Backpropagation</li>
          <li>✓ Gradient descent</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          <strong>No numpy. No tensorflow. No pytorch.</strong> Just pure math that you wrote
          and understand completely. Every modern neural network, from GPT to image classifiers
          to AlphaGo, uses these exact same principles at massive scale.
        </p>
        <p>
          You now have the foundation to understand any neural network architecture.
          Go forth and build amazing things! 🚀
        </p>
      </ExplanationBox>
    </div>
  );
}
