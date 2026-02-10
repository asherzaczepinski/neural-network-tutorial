'use client';

import { useState, useEffect, useRef } from 'react';

interface CodeRunnerProps {
  code: string;
}

export default function CodeRunner({ code }: CodeRunnerProps) {
  const [editableCode, setEditableCode] = useState(code);
  const [output, setOutput] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    // Load Pyodide once when component mounts
    const loadPyodide = async () => {
      if (pyodideRef.current) return;

      try {
        const pyodide = await (window as any).loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
        });
        pyodideRef.current = pyodide;
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
      }
    };

    loadPyodide();
  }, []);

  const runCode = async () => {
    setIsLoading(true);
    setOutput(null);

    try {
      // Wait for Pyodide to be loaded
      if (!pyodideRef.current) {
        const pyodide = await (window as any).loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
        });
        pyodideRef.current = pyodide;
      }

      const pyodide = pyodideRef.current;

      // Capture print output
      let outputBuffer = '';
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // Run the user's code
      await pyodide.runPythonAsync(editableCode);

      // Get the captured output
      outputBuffer = pyodide.runPython('sys.stdout.getvalue()');

      setOutput(outputBuffer || 'Code executed successfully!');
      setHasRun(true);
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
      setHasRun(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCode = () => {
    setEditableCode(code);
    setOutput(null);
    setHasRun(false);
  };

  // Count lines for line numbers
  const lineCount = editableCode.split('\n').length;

  return (
    <div className="code-runner-inline">
      <div className="code-editor-container">
        <div className="code-line-numbers">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="line-number">{i + 1}</div>
          ))}
        </div>
        <textarea
          className="code-editor"
          value={editableCode}
          onChange={(e) => setEditableCode(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className="code-actions">
        <button
          className="run-btn"
          onClick={runCode}
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
        {hasRun && (
          <button className="reset-btn" onClick={resetCode}>
            Reset
          </button>
        )}
      </div>

      {output !== null && (
        <div className="code-output">
          <div className="output-label">Output</div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
