'use client';

import CodeEditor from '@/components/CodeEditor';
import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import TaskBox from '@/components/TaskBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';
import Hint from '@/components/Hint';

interface StepProps {
  onComplete: () => void;
}

export default function Step9({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasDef = /def\s+layer\s*\(/.test(code);
    const hasLoop = /for\s+/.test(code);
    const hasNeuron = /neuron\s*\(/.test(code);
    const hasReturn = /return/.test(code);
    const hasTest = /layer\s*\(/.test(code) && /print/.test(code);

    if (hasDef && hasLoop && hasNeuron && hasReturn && hasTest) {
      return {
        success: true,
        output: `Layer function created successfully!

Testing layer with 3 neurons, each with its own weights and bias:
  inputs = [0.7, 0.8]  (temperature, humidity)

Neuron 1 (humidity detector):
  weights=[0.1, 0.9], bias=-0.3 → output=0.64 (moisture focused)

Neuron 2 (temperature detector):
  weights=[0.9, 0.1], bias=-0.4 → output=0.54 (heat focused)

Neuron 3 (combined pattern):
  weights=[0.5, 0.5], bias=0.1 → output=0.69 (balanced view)

Layer output: [0.64, 0.54, 0.69]

This is the essence of neural network layers:
- Multiple neurons process the SAME inputs in parallel
- Each neuron has DIFFERENT weights, learning different patterns
- Together, they create a RICH representation of the input

For weather prediction:
- One neuron might detect "high humidity → rain"
- Another might detect "cold fronts"
- A third might detect "tropical conditions"

The next layer combines these detected features to make the final prediction!`,
      };
    }

    if (hasDef && !hasLoop) {
      return {
        success: false,
        output: `Good start! You defined the layer function.

Now loop through each neuron's parameters and compute their outputs:

outputs = []
for i in range(len(weights)):
    output = neuron(inputs, weights[i], biases[i])
    outputs.append(output)
return outputs`,
      };
    }

    return {
      success: false,
      output: `Create a function called 'layer' that applies multiple neurons:

def layer(inputs, weights, biases):
    # weights is a list of weight lists (one per neuron)
    # biases is a list of biases (one per neuron)
    # Return a list of outputs

    outputs = []
    for i in range(len(weights)):
        # Compute each neuron's output
        # Append to outputs
    return outputs`,
    };
  };

  return (
    <div>
      <ExplanationBox title="What Is a Layer?">
        <p>
          A <strong>layer</strong> is a group of neurons that all receive the same inputs and
          process them in parallel. Each neuron in the layer has its own weights and bias,
          so each can learn to detect a different pattern in the data.
        </p>
        <p>
          Think of it like having multiple weather experts, each with a different specialty:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>Expert 1:</strong> Focuses mainly on humidity → &quot;moisture detector&quot;</li>
          <li><strong>Expert 2:</strong> Focuses mainly on temperature → &quot;heat detector&quot;</li>
          <li><strong>Expert 3:</strong> Balances both → &quot;overall weather analyzer&quot;</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Each expert gives their opinion, and the network uses all opinions to make the final prediction.
        </p>
      </ExplanationBox>

      <MathFormula label="Layer Output">
        layer_output = [neuron₁(inputs), neuron₂(inputs), ..., neuronₙ(inputs)]
      </MathFormula>

      <ExplanationBox title="Why Multiple Neurons?">
        <p>
          A single neuron can only learn one pattern — like &quot;humidity causes rain.&quot; But real
          weather is more nuanced. Rain depends on combinations of factors: temperature AND
          humidity AND pressure AND season. To capture these complexities, we need multiple
          neurons that can each specialize in different aspects.
        </p>
        <p>
          The key insight: by having each neuron learn a <strong>different</strong> pattern,
          the layer creates a richer representation of the input than any single neuron could.
          Later layers can combine these patterns to make sophisticated predictions.
        </p>
      </ExplanationBox>

      <WorkedExample title="Three Neurons Analyzing Weather">
        <p>Let&apos;s trace through a 3-neuron layer with inputs=[0.7, 0.8]:</p>

        <p style={{ marginTop: '1rem' }}><strong>Neuron 1: Humidity Detector</strong></p>
        <CalcStep number={1}>weights=[0.1, 0.9], bias=-0.3</CalcStep>
        <CalcStep number={2}>z = (0.7×0.1 + 0.8×0.9) - 0.3 = 0.07 + 0.72 - 0.3 = 0.49</CalcStep>
        <CalcStep number={3}>output₁ = sigmoid(0.49) = 0.62</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Neuron 2: Temperature Detector</strong></p>
        <CalcStep number={4}>weights=[0.9, 0.1], bias=-0.4</CalcStep>
        <CalcStep number={5}>z = (0.7×0.9 + 0.8×0.1) - 0.4 = 0.63 + 0.08 - 0.4 = 0.31</CalcStep>
        <CalcStep number={6}>output₂ = sigmoid(0.31) = 0.58</CalcStep>

        <p style={{ marginTop: '1rem' }}><strong>Neuron 3: Combined Detector</strong></p>
        <CalcStep number={7}>weights=[0.5, 0.5], bias=0.1</CalcStep>
        <CalcStep number={8}>z = (0.7×0.5 + 0.8×0.5) + 0.1 = 0.35 + 0.40 + 0.1 = 0.85</CalcStep>
        <CalcStep number={9}>output₃ = sigmoid(0.85) = 0.70</CalcStep>

        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Layer output: [0.62, 0.58, 0.70]
        </p>
        <p>
          Three different &quot;opinions&quot; about the weather: moderate humidity signal (0.62),
          moderate temperature signal (0.58), and strong combined signal (0.70).
        </p>
      </WorkedExample>

      <ExplanationBox title="The Weight Matrix">
        <p>
          For a layer with multiple neurons, we organize weights into a 2D structure
          (a list of lists, or matrix):
        </p>
        <pre style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
{`weights = [
    [w₁_temp, w₁_humid],  # Neuron 1's weights
    [w₂_temp, w₂_humid],  # Neuron 2's weights
    [w₃_temp, w₃_humid],  # Neuron 3's weights
]

biases = [b₁, b₂, b₃]  # One bias per neuron`}
        </pre>
        <p style={{ marginTop: '1rem' }}>
          Each row is one neuron&apos;s weights. The layer function loops through each row,
          using those weights to compute that neuron&apos;s output.
        </p>
      </ExplanationBox>

      <ExplanationBox title="This Is Matrix Multiplication!">
        <p>
          Computing a layer&apos;s output is actually <strong>matrix multiplication</strong> plus bias,
          followed by applying sigmoid to each element. In NumPy, you&apos;d write:
        </p>
        <pre style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          fontFamily: 'monospace'
        }}>
          output = sigmoid(np.dot(weights, inputs) + biases)
        </pre>
        <p style={{ marginTop: '1rem' }}>
          We&apos;re building this from scratch with loops, but understanding that it&apos;s matrix
          multiplication explains why GPUs (which are optimized for matrix math) are so important
          for neural networks.
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Create a <code>layer</code> function that applies multiple neurons to the same inputs.
          Each neuron has its own weights and bias, producing multiple outputs.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>You should have the <code>neuron</code> function from before</li>
          <li>Create <code>def layer(inputs, weights, biases):</code></li>
          <li>Loop through each neuron (use <code>range(len(weights))</code>)</li>
          <li>Call <code>neuron(inputs, weights[i], biases[i])</code> for each</li>
          <li>Collect outputs in a list and return it</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`def layer(inputs, weights, biases):
    outputs = []
    for i in range(len(weights)):
        output = neuron(inputs, weights[i], biases[i])
        outputs.append(output)
    return outputs

# Test with 3 neurons
inputs = [0.7, 0.8]
weights = [
    [0.1, 0.9],   # Humidity-focused
    [0.9, 0.1],   # Temperature-focused
    [0.5, 0.5],   # Balanced
]
biases = [-0.3, -0.4, 0.1]

result = layer(inputs, weights, biases)
print("Layer output:", result)`}
        </pre>
      </Hint>

      <CodeEditor
        initialCode={`E = 2.71828

def sigmoid(z):
    return 1 / (1 + E**(-z))

def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

def neuron(inputs, weights, bias):
    z = dot_product(inputs, weights) + bias
    return sigmoid(z)

# Create the layer function
def layer(inputs, weights, biases):
    # Loop through each neuron and compute its output
    # Return a list of all outputs
    pass

# Test with 3 neurons
inputs = [0.7, 0.8]  # temperature, humidity

weights = [
    [0.1, 0.9],   # Neuron 1: humidity-focused
    [0.9, 0.1],   # Neuron 2: temperature-focused
    [0.5, 0.5],   # Neuron 3: balanced
]

biases = [-0.3, -0.4, 0.1]

result = layer(inputs, weights, biases)
print("Layer output:", result)
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Create the layer function..."
        minHeight={400}
      />

      <ExplanationBox title="Building Toward Deep Networks">
        <p>
          You&apos;ve now built a complete layer! The output of one layer can become the input
          to the next layer. This is how we build deep networks:
        </p>
        <pre style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
{`Input Layer:    [temp, humidity]      (raw weather data)
       ↓
Hidden Layer 1: [h1, h2, h3]           (detected patterns)
       ↓
Hidden Layer 2: [h4, h5]               (combined patterns)
       ↓
Output Layer:   [rain_probability]     (final prediction)`}
        </pre>
        <p style={{ marginTop: '1rem' }}>
          In the next step, we&apos;ll connect multiple layers to build a complete neural network
          for rain prediction!
        </p>
      </ExplanationBox>
    </div>
  );
}
