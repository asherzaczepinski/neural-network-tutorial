'use client';

import { useState, useCallback, useEffect } from 'react';

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
  minHeight = 300,
  onSuccess,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('Click "Run Code" to see output...');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const runCode = useCallback(() => {
    const result = onValidate(code);
    setOutput(result.output);
    setStatus(result.success ? 'success' : 'error');

    if (result.success && !hasSucceeded) {
      setHasSucceeded(true);
      onSuccess?.();
    }
  }, [code, onValidate, hasSucceeded, onSuccess]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput('Click "Run Code" to see output...');
    setStatus('idle');
  };

  return (
    <>
      {/* Collapsed view - clickable code preview */}
      <div className="code-editor-preview" onClick={() => setIsOpen(true)}>
        <div className="preview-header">
          <div className="preview-dots">
            <div className="dot red" />
            <div className="dot yellow" />
            <div className="dot green" />
          </div>
          <span className="preview-filename">script.py</span>
          {hasSucceeded && (
            <span className="preview-completed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </span>
          )}
          <span className="preview-expand">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </span>
        </div>
        <div className="preview-code">
          <pre><code>{code.split('\n').slice(0, 5).join('\n')}{code.split('\n').length > 5 ? '\n...' : ''}</code></pre>
        </div>
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div className="code-editor-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="code-editor-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="modal-header">
              <div className="modal-title">
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
                <span>script.py</span>
              </div>
              <button className="modal-close" onClick={() => setIsOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Editor area */}
            <div className="modal-editor-container">
              <div className="modal-editor">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={placeholder}
                  style={{ minHeight }}
                  spellCheck={false}
                />
              </div>

              {/* Output area */}
              <div className="modal-output-container">
                <div className="modal-output-header">
                  <span>Output</span>
                  {status === 'success' && <span className="output-status success">Success</span>}
                  {status === 'error' && <span className="output-status error">Try Again</span>}
                </div>
                <div className={`modal-output ${status}`}>
                  {output}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={resetCode}>
                Reset
              </button>
              <div className="modal-footer-right">
                {hasSucceeded && (
                  <span className="success-text">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Completed
                  </span>
                )}
                <button className="btn btn-success" onClick={runCode}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Run
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
