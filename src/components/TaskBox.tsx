'use client';

interface TaskBoxProps {
  children: React.ReactNode;
}

export default function TaskBox({ children }: TaskBoxProps) {
  return (
    <section className="content-section task-section">
      <h2>Your Task</h2>
      <div>{children}</div>
    </section>
  );
}
