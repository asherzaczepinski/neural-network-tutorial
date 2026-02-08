'use client';

import { useState } from 'react';

interface CodeRunnerProps {
  code: string;
}

export default function CodeRunner({ code }: CodeRunnerProps) {
  const [editableCode, setEditableCode] = useState(code);
  const [output, setOutput] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const runCode = () => {
    try {
      const lines = editableCode.split('\n');
      const outputs: string[] = [];
      const variables: Record<string, number | string | number[]> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Handle function definitions
        const funcMatch = trimmed.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
        if (funcMatch) {
          // Skip function definitions for now - they're handled in eval
          continue;
        }

        // Handle variable assignments
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const [, varName, value] = assignMatch;
          try {
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
        const varList = Object.entries(variables)
          .map(([k, v]) => `${k} = ${Array.isArray(v) ? `[${v.join(', ')}]` : v}`)
          .join('\n');
        setOutput(varList ? `Variables defined:\n${varList}` : 'Code executed successfully!');
      }
      setHasRun(true);
    } catch (err) {
      setOutput(`Error: ${err}`);
      setHasRun(true);
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
        <button className="run-btn" onClick={runCode}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run Code
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
