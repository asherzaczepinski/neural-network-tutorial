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

export default function Step8({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasDef = /def\s+neuron\s*\(/.test(code);
    const hasDot = /dot_product/.test(code);
    const hasSigmoid = /sigmoid/.test(code);
    const hasReturn = /return/.test(code);
    const hasTest = /neuron\s*\(/.test(code) && /print/.test(code);

    if (hasDef && hasDot && hasSigmoid && hasReturn && hasTest) {
      return {
        success: true,
        output: `Complete neuron function created!

def neuron(inputs, weights, bias):
    z = dot_product(inputs, weights) + bias
    return sigmoid(z)

Testing with weather data:
  inputs = [0.7, 0.8]    (temperature, humidity)
  weights = [-0.3, 0.9]  (learned importance)
  bias = 0.1             (baseline rain tendency)

Step-by-step:
  1. Dot product: 0.7×(-0.3) + 0.8×0.9 = -0.21 + 0.72 = 0.51
  2. Add bias: z = 0.51 + 0.1 = 0.61
  3. Sigmoid: sigmoid(0.61) = 0.648

rain_probability = neuron([0.7, 0.8], [-0.3, 0.9], 0.1) = 0.648

Your neuron says: "There's about a 65% chance of rain given
temperature=0.7 and humidity=0.8!"

This single function encapsulates everything a neuron does:
receive inputs → weight them → sum them → add bias → activate

Congratulations! You've built a complete artificial neuron from scratch!`,
      };
    }

    if (hasDef && !hasDot) {
      return {
        success: false,
        output: `Good! You started the neuron function.

Now use dot_product to compute the weighted sum:
z = dot_product(inputs, weights) + bias

Then apply sigmoid: return sigmoid(z)`,
      };
    }

    return {
      success: false,
      output: `Create a function called 'neuron' that takes inputs, weights, and bias:

def neuron(inputs, weights, bias):
    # Compute z = dot_product(inputs, weights) + bias
    # Return sigmoid(z)`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Assembling the Complete Neuron">
        <p>
          We&apos;ve built all the individual pieces. Now it&apos;s time to assemble them into a complete,
          reusable neuron function. This is a milestone — this single function captures everything
          we&apos;ve learned about how a neuron processes information.
        </p>
        <p>
          A complete neuron does three things in sequence:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li><strong>Computes the weighted sum</strong> — dot product of inputs and weights</li>
          <li><strong>Adds the bias</strong> — shifts the decision threshold</li>
          <li><strong>Applies the activation</strong> — sigmoid converts to probability</li>
        </ol>
      </ExplanationBox>

      <MathFormula label="The Complete Neuron">
        output = sigmoid(dot_product(inputs, weights) + bias)
      </MathFormula>

      <ExplanationBox title="Function Composition">
        <p>
          Notice how we&apos;re composing (combining) smaller functions to build larger ones. This is
          a fundamental programming pattern called <strong>function composition</strong>, and it&apos;s
          exactly how neural networks are structured:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><code>dot_product</code> — a mathematical operation</li>
          <li><code>+ bias</code> — a simple addition</li>
          <li><code>sigmoid</code> — the activation function</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          By combining these, we get <code>neuron</code> — a higher-level abstraction. Later,
          we&apos;ll combine neurons into <code>layers</code>, and layers into <code>networks</code>.
          Each level builds on the previous one.
        </p>
      </ExplanationBox>

      <WorkedExample title="Complete Neuron Calculation">
        <p>Let&apos;s trace through neuron([0.7, 0.8], [-0.3, 0.9], 0.1):</p>

        <CalcStep number={1}>
          <strong>Inputs:</strong> [temperature=0.7, humidity=0.8]
        </CalcStep>
        <CalcStep number={2}>
          <strong>Weights:</strong> [-0.3, 0.9]
        </CalcStep>
        <CalcStep number={3}>
          <strong>Bias:</strong> 0.1
        </CalcStep>
        <CalcStep number={4}>
          <strong>Dot product:</strong> (0.7 × -0.3) + (0.8 × 0.9) = -0.21 + 0.72 = 0.51
        </CalcStep>
        <CalcStep number={5}>
          <strong>Add bias:</strong> z = 0.51 + 0.1 = 0.61
        </CalcStep>
        <CalcStep number={6}>
          <strong>Sigmoid:</strong> sigmoid(0.61) = 1/(1 + e^(-0.61)) = 0.648
        </CalcStep>

        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Final output: 0.648 (64.8% chance of rain)
        </p>
      </WorkedExample>

      <ExplanationBox title="What Each Parameter Does">
        <p>
          <strong>inputs</strong> — The weather data. For rain prediction: [temperature, humidity].
          Could be any measurements the neuron should consider.
        </p>
        <p>
          <strong>weights</strong> — How important each input is. Learned during training.
          [-0.3, 0.9] means humidity matters more than temperature.
        </p>
        <p>
          <strong>bias</strong> — The baseline tendency. 0.1 means there&apos;s a slight tendency
          toward predicting rain even with neutral inputs.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Trying Different Weights">
        <p>
          By changing weights, the same neuron can learn different patterns:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li><strong>weights = [0, 1]</strong> → Only humidity matters</li>
          <li><strong>weights = [1, 0]</strong> → Only temperature matters</li>
          <li><strong>weights = [-1, 0]</strong> → Cold temperatures predict rain</li>
          <li><strong>weights = [0.5, 0.5]</strong> → Both matter equally</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Training a neural network means finding the weights and biases that produce accurate
          predictions. We&apos;ll learn how to do this in later steps!
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Create a complete <code>neuron</code> function that combines everything. This reusable
          function will be the building block for all our neural networks.
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>You should have <code>dot_product</code> and <code>sigmoid</code> from before</li>
          <li>Create <code>def neuron(inputs, weights, bias):</code></li>
          <li>Compute <code>z = dot_product(inputs, weights) + bias</code></li>
          <li>Return <code>sigmoid(z)</code></li>
          <li>Test with our weather data to verify you get ~0.648</li>
        </ol>
      </TaskBox>

      <Hint>
        <pre>
{`E = 2.71828

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

# Test with weather data
inputs = [0.7, 0.8]    # temperature, humidity
weights = [-0.3, 0.9]  # learned importance
bias = 0.1             # baseline

rain_prob = neuron(inputs, weights, bias)
print("Rain probability:", rain_prob)`}
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

# Create the complete neuron function
def neuron(inputs, weights, bias):
    # Step 1: Compute z = dot_product(inputs, weights) + bias

    # Step 2: Apply sigmoid and return

    pass

# Test with weather data
inputs = [0.7, 0.8]    # temperature=0.7, humidity=0.8
weights = [-0.3, 0.9]  # temperature weight, humidity weight
bias = 0.1             # baseline rain tendency

rain_prob = neuron(inputs, weights, bias)
print("Rain probability:", rain_prob)
# Should output approximately 0.648
`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Assemble the complete neuron..."
        minHeight={350}
      />

      <ExplanationBox title="From Neuron to Network">
        <p>
          Congratulations! You&apos;ve built a complete artificial neuron from scratch — the fundamental
          unit of all neural networks. A single neuron can learn simple patterns: &quot;humid = rain.&quot;
        </p>
        <p>
          But real weather prediction (and most interesting problems) requires more complexity.
          In the next steps, we&apos;ll:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '2' }}>
          <li>Build <strong>layers</strong> — multiple neurons working in parallel</li>
          <li>Connect layers to form <strong>networks</strong></li>
          <li>Implement <strong>forward propagation</strong> — data flowing through the network</li>
          <li>Add <strong>loss functions</strong> — measuring prediction accuracy</li>
          <li>Learn <strong>backpropagation</strong> — teaching the network to improve</li>
        </ol>
      </ExplanationBox>
    </div>
  );
}
