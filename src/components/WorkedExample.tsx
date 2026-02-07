'use client';

interface WorkedExampleProps {
  title?: string;
  children: React.ReactNode;
}

export default function WorkedExample({ title = 'Worked Example', children }: WorkedExampleProps) {
  return (
    <div className="worked-example">
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.5rem' }}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
