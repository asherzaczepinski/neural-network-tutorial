'use client';

interface WorkedExampleProps {
  title?: string;
  children: React.ReactNode;
}

export default function WorkedExample({ title = 'Worked Example', children }: WorkedExampleProps) {
  return (
    <section className="content-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
