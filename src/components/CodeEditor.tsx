'use client';

import { useState, useCallback } from 'react';

interface ValidationResult {
  success: boolean;
  output: string;
  feedback?: string;
}

interface CodeEditorProps {
  initialCode: string;
  onValidate: (code: string) => ValidationResult;
  placeholder?: string;
  minHeight?: number;
  onSuccess?: () => void;
}

export default function CodeEditor({
  initialCode,
  onValidate,
  placeholder = '# Write your code here...',
  minHeight = 200,
  onSuccess,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('Output will appear here...');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasSucceeded, setHasSucceeded] = useState(false);

  const runCode = useCallback(() => {
    const result = onValidate(code);
    setOutput(result.output);
    setStatus(result.success ? 'success' : 'error');

    if (result.success && !hasSucceeded) {
      setHasSucceeded(true);
      onSuccess?.();
    }
  }, [code, onValidate, hasSucceeded, onSuccess]);

  return (
    <div className="my-6">
      <div className="code-editor">
        <div className="code-editor-header">
          <div className="code-editor-dot" style={{ background: '#ff5f57' }} />
          <div className="code-editor-dot" style={{ background: '#febc2e' }} />
          <div className="code-editor-dot" style={{ background: '#28c840' }} />
          <span style={{ marginLeft: '1rem', color: '#808090', fontSize: '0.85rem' }}>
            script.py
          </span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          spellCheck={false}
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn btn-success" onClick={runCode}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run Code
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setCode(initialCode);
            setOutput('Output will appear here...');
            setStatus('idle');
          }}
        >
          Reset
        </button>
      </div>

      <div className={`output-box ${status}`}>
        {output}
      </div>

      {hasSucceeded && (
        <div className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <p className="text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Great job! You can now proceed to the next step.
          </p>
        </div>
      )}
    </div>
  );
}
