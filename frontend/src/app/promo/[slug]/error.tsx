'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h2>pizdec</h2>
    </div>
  );
}
