'use client';

interface ExplanationBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function ExplanationBox({ title, children }: ExplanationBoxProps) {
  return (
    <section className="content-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
