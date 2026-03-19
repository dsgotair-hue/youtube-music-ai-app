interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <span className="error-banner-icon">⚠️</span>
      <span className="error-banner-text">{message}</span>
      <button className="error-dismiss-btn" onClick={onDismiss}>Dismiss</button>
    </div>
  );
}
