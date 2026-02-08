'use client';

import MathFormula from '@/components/MathFormula';
import ExplanationBox from '@/components/ExplanationBox';
import WorkedExample from '@/components/WorkedExample';
import CalcStep from '@/components/CalcStep';

interface StepProps {
  onComplete: () => void;
}

export default function Step1({ onComplete }: StepProps) {
  // Auto-complete this step when component mounts
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="Our Mission: Predict Rain">
        <p>
          Throughout this course, we&apos;re building a neural network that predicts whether it will
          rain based on two weather measurements: <strong>temperature</strong> and <strong>humidity</strong>.
        </p>
        <p>
          Think about it intuitively. When you step outside on a hot, sticky summer afternoon and
          the air feels thick with moisture, you might think &quot;it&apos;s probably going to rain later.&quot;
          That&apos;s exactly what our neural network will learn to do — but with math instead of intuition.
        </p>
      </ExplanationBox>

      <ExplanationBox title="What is a Neuron?">
        <p>
          A neuron is the basic building block of a neural network. It&apos;s inspired by how brain cells work,
          but don&apos;t worry — we&apos;re not doing biology here. An artificial neuron is just a simple
          mathematical function that takes in numbers, does some math, and outputs a number.
        </p>
        <p>
          Imagine you&apos;re trying to decide if you should bring an umbrella. You consider the temperature
          (is it warm enough for rain?), the humidity (is there moisture in the air?), and maybe how cloudy
          it looks. You weigh these factors in your head and make a decision.
        </p>
        <p>
          A neuron does the same thing: it takes inputs (like temperature and humidity), gives each input
          an importance score (called a <strong>weight</strong>), adds them up, and produces an output
          (like &quot;70% chance of rain&quot;).
        </p>
      </ExplanationBox>

      <ExplanationBox title="The Neuron Formula">
        <p>
          Every neuron follows the same simple pattern. Let&apos;s see it with our weather example:
        </p>
      </ExplanationBox>

      <MathFormula label="How a Neuron Makes Predictions">
        output = activation( (temperature × weight₁) + (humidity × weight₂) + bias )
      </MathFormula>

      <ExplanationBox title="Understanding Each Part">
        <p>
          <strong>Inputs (temperature, humidity)</strong> — These are the raw data flowing into the neuron.
          We normalize them to values between 0 and 1, so temperature = 0.7 means &quot;70% of the maximum
          temperature we&apos;d expect&quot; and humidity = 0.8 means &quot;80% humidity.&quot;
        </p>
        <p>
          <strong>Weights (weight₁, weight₂)</strong> — These tell the neuron how important each input is.
          A large weight on humidity might mean &quot;humidity matters a lot for predicting rain.&quot;
          Weights can be negative too — a negative weight on temperature might mean &quot;higher temperatures
          actually make rain less likely.&quot;
        </p>
        <p>
          <strong>Bias</strong> — This is an adjustable offset. It lets the neuron say &quot;even with no
          temperature or humidity info, there&apos;s still some baseline chance of rain.&quot;
        </p>
        <p>
          <strong>Activation</strong> — This squishes the result into a useful range (like 0 to 1 for
          a probability). We&apos;ll explore this in detail later.
        </p>
      </ExplanationBox>

      <WorkedExample title="Let's Walk Through an Example">
        <p>
          Suppose our neuron has learned these values: weight₁ = -0.5, weight₂ = 0.9, and bias = 0.2.
          Now let&apos;s predict rain for a warm, humid day where temperature = 0.7 and humidity = 0.8:
        </p>
        <CalcStep number={1}>
          Start with our inputs: temperature = 0.7, humidity = 0.8
        </CalcStep>
        <CalcStep number={2}>
          Multiply each input by its weight: (0.7 × -0.5) + (0.8 × 0.9)
        </CalcStep>
        <CalcStep number={3}>
          Calculate: -0.35 + 0.72 = 0.37
        </CalcStep>
        <CalcStep number={4}>
          Add the bias: 0.37 + 0.2 = 0.57
        </CalcStep>
        <CalcStep number={5}>
          After activation: approximately 0.64 → &quot;64% chance of rain&quot;
        </CalcStep>
        <p style={{ marginTop: '1rem' }}>
          Notice that the negative weight on temperature means hotter days slightly <em>decrease</em> the
          rain prediction, while high humidity strongly <em>increases</em> it. The network learned these
          relationships from data!
        </p>
      </WorkedExample>

      <ExplanationBox title="Creating Our First Inputs">
        <p>
          Let&apos;s represent a warm, humid day that might lead to rain. In Python, we create variables
          like this:
        </p>
        <pre><code>{`# Our weather inputs
temperature = 0.7    # A warm day (70% of max)
humidity = 0.8       # 80% humidity`}</code></pre>
        <p>
          These two numbers are our first neural network inputs. They&apos;ll flow through weights,
          get added up, and eventually produce a rain prediction.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Why These Values Matter">
        <p>
          You just saw the data that will flow through your neural network. In the real world,
          this data might come from weather sensors, but the principle is the same: <strong>everything
          in a neural network is a number</strong>.
        </p>
        <p>
          In the next module, we&apos;ll learn how to organize multiple inputs together and introduce
          <strong> weights</strong> — the values that tell our neuron how much each input matters for
          predicting rain.
        </p>
      </ExplanationBox>
    </div>
  );
}
