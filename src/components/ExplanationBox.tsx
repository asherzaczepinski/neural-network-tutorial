'use client';

interface ExplanationBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function ExplanationBox({ title, children }: ExplanationBoxProps) {
  return (
    <div className="explanation-box">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
