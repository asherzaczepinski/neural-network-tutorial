'use client';

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Learn Machine Learning<br />from First Principles</h1>
          <p className="hero-subtitle">
            Build a neural network from scratch. No libraries, no magic—just
            the math and code you need to understand how ML actually works.
          </p>
          <a href="/?step=1" className="cta-button">Start Learning →</a>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="who-section">
        <div className="container">
          <h2>Who This Is For</h2>
          <ul className="who-list">
            <li>CS students curious about what's happening inside neural networks</li>
            <li>Self-taught programmers who want to go beyond copying tutorials</li>
            <li>Anyone comfortable with basic Python and high school math</li>
          </ul>
        </div>
      </section>

      {/* Course Overview */}
      <section className="overview-section">
        <div className="container">
          <h2>17 Modules in 4 Parts</h2>

          <div className="part">
            <div className="part-header">
              <span className="part-label">Part 1</span>
              <h3>Foundations</h3>
            </div>
            <ol className="modules" start={1}>
              <li><strong>Neuron Basics</strong> — What a neuron is and how it processes information</li>
              <li><strong>Data & Inputs</strong> — How real-world data becomes numbers</li>
              <li><strong>Weights</strong> — The learnable parameters that give networks power</li>
              <li><strong>Bias</strong> — Why neurons need an extra adjustable term</li>
            </ol>
          </div>

          <div className="part">
            <div className="part-header">
              <span className="part-label">Part 2</span>
              <h3>The Math That Makes It Work</h3>
            </div>
            <ol className="modules" start={5}>
              <li><strong>Dot Product</strong> — The fundamental operation behind every neuron</li>
              <li><strong>Non-linearity</strong> — Why linear math alone can't solve interesting problems</li>
              <li><strong>Sigmoid Function</strong> — Squashing outputs into probabilities</li>
              <li><strong>Your First Neuron</strong> — Putting it all together in working code</li>
            </ol>
          </div>

          <div className="part">
            <div className="part-header">
              <span className="part-label">Part 3</span>
              <h3>Building Networks</h3>
            </div>
            <ol className="modules" start={9}>
              <li><strong>Layers</strong> — Organizing neurons into structured groups</li>
              <li><strong>Network Architecture</strong> — Connecting layers into a complete network</li>
              <li><strong>Forward Pass</strong> — How data flows to make predictions</li>
              <li><strong>Loss Functions</strong> — Measuring how wrong your predictions are</li>
            </ol>
          </div>

          <div className="part">
            <div className="part-header">
              <span className="part-label">Part 4</span>
              <h3>Learning</h3>
            </div>
            <ol className="modules" start={13}>
              <li><strong>Derivatives & Gradients</strong> — The calculus that tells us which way to adjust</li>
              <li><strong>Chain Rule</strong> — Connecting gradients across layers</li>
              <li><strong>Backpropagation</strong> — The algorithm that makes deep learning possible</li>
              <li><strong>Gradient Descent</strong> — Iteratively improving weights to reduce error</li>
              <li><strong>Training Loop</strong> — Bringing it all together into a learning system</li>
            </ol>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="how-grid">
            <div className="how-item">
              <span className="how-value">~8 hours</span>
              <span className="how-desc">At your own pace</span>
            </div>
            <div className="how-item">
              <span className="how-value">Interactive</span>
              <span className="how-desc">Code in your browser</span>
            </div>
            <div className="how-item">
              <span className="how-value">Basic Python</span>
              <span className="how-desc">Only prerequisite</span>
            </div>
            <div className="how-item">
              <span className="how-value">Real Network</span>
              <span className="how-desc">Predicts rain from data</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2>FAQ</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Do I need to know calculus?</summary>
              <p>Not really. We explain derivatives from scratch when we need them. If you understand that a derivative measures "how fast something is changing," you're ready.</p>
            </details>
            <details className="faq-item">
              <summary>Why not just use PyTorch or TensorFlow?</summary>
              <p>You should—eventually. But using a library before understanding the fundamentals is like using a calculator before learning arithmetic. This course gives you the foundation that makes everything else click.</p>
            </details>
            <details className="faq-item">
              <summary>What if I get stuck?</summary>
              <p>Each module includes hints and worked examples. The code editors let you experiment and see results immediately.</p>
            </details>
            <details className="faq-item">
              <summary>Is this actually free?</summary>
              <p>Yes. No account required, no email signup, no upsells.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to understand ML for real?</h2>
          <a href="/?step=1" className="cta-button">Start the Course →</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <span>Neural Network Tutorial</span>
          <span>© 2024</span>
        </div>
      </footer>

      <style jsx>{`
        .landing {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #222;
          background: #fff;
          font-size: 16px;
          line-height: 1.5;
        }

        .container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero */
        .hero {
          padding: 64px 0 48px;
          border-bottom: 1px solid #eee;
        }

        .hero h1 {
          font-size: 36px;
          font-weight: 600;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
          color: #222;
        }

        .hero-subtitle {
          font-size: 17px;
          color: #555;
          margin: 0 0 24px;
          max-width: 480px;
        }

        .cta-button {
          display: inline-block;
          background: #2563eb;
          color: #fff;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 6px;
        }

        .cta-button:hover {
          background: #1d4ed8;
        }

        /* Section base */
        section {
          padding: 48px 0;
        }

        section h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 20px;
          color: #222;
        }

        /* Who Section */
        .who-section {
          border-bottom: 1px solid #eee;
        }

        .who-list {
          margin: 0;
          padding-left: 20px;
        }

        .who-list li {
          margin-bottom: 8px;
          color: #444;
        }

        .who-list li:last-child {
          margin-bottom: 0;
        }

        /* Overview Section */
        .overview-section {
          background: #fff;
          border-bottom: 1px solid #eee;
        }

        .part {
          margin-bottom: 32px;
        }

        .part:last-child {
          margin-bottom: 0;
        }

        .part-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 12px;
        }

        .part-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #2563eb;
        }

        .part-header h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          color: #222;
        }

        .modules {
          margin: 0;
          padding-left: 24px;
        }

        .modules li {
          padding: 6px 0;
          color: #444;
          font-size: 15px;
        }

        .modules strong {
          color: #222;
          font-weight: 500;
        }

        /* How Section */
        .how-section {
          border-bottom: 1px solid #eee;
        }

        .how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .how-item {
          text-align: left;
        }

        .how-value {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .how-desc {
          font-size: 13px;
          color: #666;
        }

        /* FAQ Section */
        .faq-section {
          border-bottom: 1px solid #eee;
        }

        .faq-list {
          border-top: 1px solid #eee;
        }

        .faq-item {
          border-bottom: 1px solid #eee;
        }

        .faq-item summary {
          padding: 14px 0;
          font-weight: 500;
          cursor: pointer;
          list-style: none;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item summary::before {
          content: '+';
          margin-right: 12px;
          font-weight: 400;
          color: #888;
        }

        .faq-item[open] summary::before {
          content: '−';
        }

        .faq-item p {
          margin: 0;
          padding: 0 0 14px 20px;
          color: #555;
          font-size: 15px;
        }

        /* Final CTA */
        .final-cta {
          text-align: center;
          padding: 56px 0;
          background: #fff;
        }

        .final-cta h2 {
          margin-bottom: 20px;
        }

        /* Footer */
        .footer {
          border-top: 1px solid #eee;
          padding: 24px 0;
        }

        .footer .container {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #888;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .hero {
            padding: 48px 0 40px;
          }

          .hero h1 {
            font-size: 28px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          section {
            padding: 40px 0;
          }

          section h2 {
            font-size: 20px;
          }

          .how-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 400px) {
          .how-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
