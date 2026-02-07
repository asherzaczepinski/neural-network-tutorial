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

export default function Step1({ onComplete }: StepProps) {
  const validateCode = (code: string) => {
    const hasTemp = /temperature\s*=\s*0\.7/.test(code);
    const hasHumidity = /humidity\s*=\s*0\.8/.test(code);

    if (hasTemp && hasHumidity) {
      return {
        success: true,
        output: `Variables created successfully!

temperature = 0.7 (70% of max scale - a warm day)
humidity = 0.8 (80% humidity - quite humid)

These are your first inputs to a neural network! Throughout this tutorial,
we'll build a neural network that predicts whether it will rain based on
these two weather measurements.

Real weather prediction uses hundreds of inputs (pressure, wind speed,
satellite data, historical patterns), but the fundamental math is identical
to what you'll learn here with just two inputs.`,
      };
    }

    return {
      success: false,
      output: `Not quite right yet.

Make sure you create:
- temperature = 0.7
- humidity = 0.8

These exact variable names and values are needed for the next steps.`,
    };
  };

  return (
    <div>
      <ExplanationBox title="Our Mission: Predict Rain">
        <p>
          In this tutorial, we&apos;re going to build a neural network that predicts whether
          it will rain based on two simple measurements: <strong>temperature</strong> and
          <strong> humidity</strong>. By the end, you&apos;ll have built every piece yourself —
          no libraries, no magic, just math you truly understand.
        </p>
        <p>
          Why rain prediction? Because it&apos;s intuitive. You already know that hot, humid
          days often lead to thunderstorms. Cold, dry days usually stay clear. Our neural
          network will learn these patterns from data, just like you learned them from experience.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Inspiration: Your Brain">
        <p>
          Before we dive into code, let&apos;s understand <strong>why</strong> we call it a &quot;neural&quot; network.
          Your brain contains roughly 86 billion neurons — specialized cells that process information.
          Each biological neuron does something remarkably simple: it receives electrical signals from
          other neurons, and if those signals are strong enough, it &quot;fires&quot; and sends its own signal
          to connected neurons.
        </p>
        <p>
          In 1943, Warren McCulloch and Walter Pitts realized this could be modeled mathematically.
          A neuron is essentially a decision-maker: it takes inputs, weighs their importance, and
          produces an output. That&apos;s it. The magic of neural networks comes not from complex
          individual neurons, but from connecting many simple neurons together.
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Mathematical Model">
        <p>
          An artificial neuron does exactly four things, in order:
        </p>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '2' }}>
          <li><strong>Receives inputs</strong> — Numbers flow in (temperature, humidity, or any data)</li>
          <li><strong>Multiplies each input by a weight</strong> — Some inputs matter more than others</li>
          <li><strong>Adds everything up</strong> — Creates a single summary number</li>
          <li><strong>Applies an activation function</strong> — Decides how &quot;excited&quot; the neuron should be</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          That&apos;s the entire algorithm. Everything else in neural networks — layers, backpropagation,
          gradient descent — is just organizing and training these simple units.
        </p>
      </ExplanationBox>

      <MathFormula label="The Neuron Formula">
        output = activation( (temperature × w₁) + (humidity × w₂) + bias )
      </MathFormula>

      <ExplanationBox title="Breaking Down the Formula">
        <p>
          Let&apos;s decode each part of this formula because understanding it deeply is crucial:
        </p>
        <p>
          <strong>temperature, humidity</strong> are your <em>inputs</em>. These are just numbers — data flowing into the neuron.
          We normalize them to a 0-1 scale so that temperature=0.7 means &quot;70% of the maximum temperature we expect&quot;
          and humidity=0.8 means &quot;80% humidity.&quot;
        </p>
        <p>
          <strong>w₁, w₂</strong> are the <em>weights</em>. This is where learning happens. A weight is a
          number that says &quot;how important is this input?&quot; A large positive weight on humidity might mean
          &quot;high humidity strongly suggests rain.&quot; A negative weight might mean &quot;this factor works against rain.&quot;
        </p>
        <p>
          <strong>bias</strong> is an offset — it shifts the decision boundary. It lets us control the
          &quot;baseline&quot; prediction even when inputs are zero.
        </p>
        <p>
          <strong>activation()</strong> is a function that &quot;squishes&quot; the output into a useful range.
          We&apos;ll explore this deeply in Step 7, but for now, know that it adds &quot;non-linearity&quot; —
          the secret sauce that lets neural networks learn complex patterns.
        </p>
      </ExplanationBox>

      <WorkedExample title="A Concrete Example">
        <p>
          Imagine our trained network has learned weights: w₁ = -0.5 (temperature) and w₂ = 0.9
          (humidity), and bias = 0.2. Let&apos;s predict rain for a warm, humid day:
        </p>
        <CalcStep number={1}>
          Temperature = 0.7 (warm), Humidity = 0.8 (humid)
        </CalcStep>
        <CalcStep number={2}>
          Weighted sum = (0.7 × -0.5) + (0.8 × 0.9) + 0.2
        </CalcStep>
        <CalcStep number={3}>
          = -0.35 + 0.72 + 0.2 = 0.57
        </CalcStep>
        <CalcStep number={4}>
          After activation: approximately 0.64 → &quot;moderate chance of rain&quot;
        </CalcStep>
        <p style={{ marginTop: '1rem' }}>
          The negative weight on temperature means hot days actually <em>decrease</em> the rain
          prediction slightly (maybe it evaporates moisture?), while high humidity strongly
          <em> increases</em> it. The network learned these relationships from data!
        </p>
      </WorkedExample>

      <ExplanationBox title="Why Start with Inputs?">
        <p>
          We&apos;re starting at the very beginning: creating input variables. This might seem trivially
          simple, but it&apos;s foundational. In neural networks, <strong>everything is a number</strong>.
          Weather becomes temperature and humidity values. Images become grids of pixel values.
          Text becomes sequences of numbers. Sound becomes amplitude values over time.
        </p>
        <p>
          The inputs you create now will flow through weights, biases, and activation functions.
          By the end of this tutorial, you&apos;ll have built every piece yourself — no libraries,
          no magic, just math you understand completely.
        </p>
      </ExplanationBox>

      <TaskBox>
        <p>
          Let&apos;s create your first inputs — weather measurements that will flow into our neuron.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Create two variables:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><code>temperature = 0.7</code> (normalized temperature, where 0.7 = warm day)</li>
          <li><code>humidity = 0.8</code> (80% humidity)</li>
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          We use values between 0 and 1 because that&apos;s a common practice in neural networks —
          it keeps numbers manageable and helps training converge faster.
        </p>
      </TaskBox>

      <Hint>
        <p>
          In Python, you create a variable by writing the name, an equals sign, and the value:
        </p>
        <pre style={{ marginTop: '0.5rem' }}>
          <code>variable_name = value</code>
        </pre>
        <p style={{ marginTop: '0.5rem' }}>
          So for temperature with value 0.7, you would write: <code>temperature = 0.7</code>
        </p>
      </Hint>

      <CodeEditor
        initialCode={`# Create your weather input variables here
# temperature should equal 0.7 (a warm day)
# humidity should equal 0.8 (80% humidity)

`}
        onValidate={validateCode}
        onSuccess={onComplete}
        placeholder="# Create temperature and humidity variables with the specified values..."
      />

      <ExplanationBox title="What&apos;s Next?">
        <p>
          You&apos;ve just created the weather data that will flow through our neural network. In the next step,
          we&apos;ll learn how to store these inputs in a list (like a tiny array) — the standard way
          neural networks handle multiple inputs together.
        </p>
        <p>
          Then we&apos;ll introduce weights — the knobs that control how much each weather measurement matters
          for predicting rain. That&apos;s where the real learning begins.
        </p>
      </ExplanationBox>
    </div>
  );
}
