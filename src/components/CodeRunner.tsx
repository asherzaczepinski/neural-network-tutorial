'use client';

import { useState, useEffect } from 'react';

interface CodeRunnerProps {
  code: string;
}

export default function CodeRunner({ code }: CodeRunnerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editableCode, setEditableCode] = useState(code);
  const [output, setOutput] = useState('Click "Run" to execute the code...');

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

  const runCode = () => {
    try {
      // Simple Python-like output simulation
      // In a real implementation, you'd send this to a backend
      const lines = editableCode.split('\n');
      const outputs: string[] = [];
      const variables: Record<string, number | string | number[]> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Handle variable assignments
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const [, varName, value] = assignMatch;
          try {
            // Try to evaluate the expression
            const evaluated = evalExpression(value, variables);
            variables[varName] = evaluated;
          } catch {
            // Skip if can't evaluate
          }
        }

        // Handle print statements
        const printMatch = trimmed.match(/^print\s*\(\s*(.+)\s*\)$/);
        if (printMatch) {
          const content = printMatch[1];
          const result = evalPrintContent(content, variables);
          outputs.push(result);
        }
      }

      if (outputs.length > 0) {
        setOutput(outputs.join('\n'));
      } else {
        setOutput('Code executed successfully!\n\nVariables defined:\n' +
          Object.entries(variables)
            .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
            .join('\n'));
      }
    } catch (err) {
      setOutput(`Error: ${err}`);
    }
  };

  const evalExpression = (expr: string, vars: Record<string, number | string | number[]>): number | string | number[] => {
    let e = expr.trim();

    // Handle lists
    if (e.startsWith('[') && e.endsWith(']')) {
      const inner = e.slice(1, -1);
      const items = inner.split(',').map(i => {
        const trimmed = i.trim();
        if (vars[trimmed] !== undefined) return vars[trimmed] as number;
        return parseFloat(trimmed);
      });
      return items as number[];
    }

    // Handle strings
    if ((e.startsWith('"') && e.endsWith('"')) || (e.startsWith("'") && e.endsWith("'"))) {
      return e.slice(1, -1);
    }

    // Replace variable names with values
    for (const [name, val] of Object.entries(vars)) {
      if (typeof val === 'number') {
        e = e.replace(new RegExp(`\\b${name}\\b`, 'g'), val.toString());
      }
    }

    // Handle array access like inputs[0]
    const arrayAccess = e.match(/(\w+)\[(\d+)\]/);
    if (arrayAccess) {
      const arr = vars[arrayAccess[1]];
      if (Array.isArray(arr)) {
        return arr[parseInt(arrayAccess[2])];
      }
    }

    // Simple math evaluation (basic)
    try {
      // Only allow safe characters
      if (/^[\d\s+\-*/().]+$/.test(e)) {
        return Function(`"use strict"; return (${e})`)();
      }
    } catch {
      // Fall through
    }

    return parseFloat(e) || e;
  };

  const evalPrintContent = (content: string, vars: Record<string, number | string | number[]>): string => {
    const parts = content.split(',').map(p => p.trim());
    return parts.map(part => {
      // String literal
      if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
        return part.slice(1, -1);
      }
      // Variable
      if (vars[part] !== undefined) {
        const val = vars[part];
        return Array.isArray(val) ? `[${val.join(', ')}]` : String(val);
      }
      // Array access
      const arrayAccess = part.match(/(\w+)\[(\d+)\]/);
      if (arrayAccess) {
        const arr = vars[arrayAccess[1]];
        if (Array.isArray(arr)) {
          return String(arr[parseInt(arrayAccess[2])]);
        }
      }
      // Try to evaluate
      try {
        let e = part;
        for (const [name, val] of Object.entries(vars)) {
          if (typeof val === 'number') {
            e = e.replace(new RegExp(`\\b${name}\\b`, 'g'), val.toString());
          }
        }
        if (/^[\d\s+\-*/().]+$/.test(e)) {
          return String(Function(`"use strict"; return (${e})`)());
        }
      } catch {
        // Fall through
      }
      return part;
    }).join(' ');
  };

  const resetCode = () => {
    setEditableCode(code);
    setOutput('Click "Run" to execute the code...');
  };

  return (
    <>
      <button className="run-code-btn" onClick={() => setIsOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        Run Code
      </button>

      {isOpen && (
        <div className="code-runner-overlay" onClick={() => setIsOpen(false)}>
          <div className="code-runner-modal" onClick={(e) => e.stopPropagation()}>
            <div className="code-runner-header">
              <span>Python Editor</span>
              <button className="code-runner-close" onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <div className="code-runner-body">
              <div className="code-runner-editor">
                <textarea
                  value={editableCode}
                  onChange={(e) => setEditableCode(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="code-runner-output">
                <div className="code-runner-output-label">Output</div>
                <pre>{output}</pre>
              </div>
            </div>

            <div className="code-runner-footer">
              <button className="code-runner-reset" onClick={resetCode}>Reset</button>
              <button className="code-runner-run" onClick={runCode}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
