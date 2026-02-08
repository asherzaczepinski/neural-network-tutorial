'use client';

import ExplanationBox from '@/components/ExplanationBox';

interface StepProps {
  onComplete: () => void;
}

export default function Step2({ onComplete }: StepProps) {
  // Auto-complete this step when component mounts
  setTimeout(() => onComplete(), 100);

  return (
    <div>
      <ExplanationBox title="The Quick Overview">
        <p>
          You&apos;ve probably heard bits and pieces of how neural networks work. Before we dive into
          the actual math and code, here&apos;s a quick non-technical overview of what&apos;s actually
          happening when a neural network learns.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 1: Data Goes In">
        <p>
          Everything starts with <strong>inputs</strong> — numbers that represent something real.
          For our rain prediction project, that&apos;s temperature and humidity. For image recognition,
          it might be pixel values. For language models, it&apos;s numbers representing words.
        </p>
        <p>
          The key insight: <strong>everything becomes numbers</strong>. Neural networks don&apos;t
          &quot;see&quot; images or &quot;read&quot; text — they process lists of numbers.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 2: Numbers Get Weighted">
        <p>
          Each input gets multiplied by a <strong>weight</strong> — a number that says &quot;how
          important is this input?&quot; High weight means the input matters a lot. Low weight
          means it barely affects the output. Negative weight means it works against the prediction.
        </p>
        <p>
          Think of it like voting: each input casts a vote, but some votes count more than others.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 3: Add It All Up">
        <p>
          All those weighted inputs get added together into a single number. This is called the
          <strong> weighted sum</strong>. It&apos;s basically asking: &quot;considering all the evidence
          and how much each piece matters, what&apos;s our total signal?&quot;
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 4: Squish It">
        <p>
          That sum could be any number — positive, negative, huge, tiny. We pass it through an
          <strong> activation function</strong> (like sigmoid) that squishes it into a useful range,
          like 0 to 1. Now we have an actual probability: &quot;65% chance of rain.&quot;
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 5: Check How Wrong We Were">
        <p>
          We compare our prediction to reality. Did it actually rain? The <strong>loss function</strong>
          measures how far off we were. Big difference = big loss. Perfect prediction = zero loss.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 6: Figure Out Who&apos;s Responsible">
        <p>
          Here&apos;s where the magic happens. We work backwards through the network asking:
          &quot;which weights caused this error?&quot; This is called <strong>backpropagation</strong>.
          It figures out exactly how much each weight contributed to the mistake.
        </p>
      </ExplanationBox>

      <ExplanationBox title="Step 7: Adjust and Repeat">
        <p>
          We nudge each weight slightly in the direction that reduces the error. This is
          <strong> gradient descent</strong> — literally descending toward lower error, step by step.
        </p>
        <p>
          Then we do it again. And again. Thousands of times. Each cycle, the weights get a little
          better. Eventually, the network &quot;learns&quot; the pattern.
        </p>
      </ExplanationBox>

      <ExplanationBox title="That&apos;s It. That&apos;s Neural Networks.">
        <p>
          Data in → multiply by weights → add up → squish → check error → adjust weights → repeat.
        </p>
        <p>
          Everything else is details. Important details that we&apos;ll cover, but the core loop is
          exactly this simple. In the next few steps, we&apos;ll turn each of these concepts into
          actual code you can run.
        </p>
      </ExplanationBox>
    </div>
  );
}
