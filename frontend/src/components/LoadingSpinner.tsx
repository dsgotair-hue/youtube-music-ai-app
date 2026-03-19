interface LoadingSpinnerProps {
  loading: boolean;
}

export default function LoadingSpinner({ loading }: LoadingSpinnerProps) {
  if (!loading) return null;

  return (
    <div className="spinner-wrap" role="status" aria-label="Loading">
      <div className="spinner" />
      <span>Finding music for you…</span>
    </div>
  );
}
