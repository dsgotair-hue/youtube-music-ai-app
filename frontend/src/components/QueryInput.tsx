import { useState } from "react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  disabled?: boolean;
}

export function QueryInput({ onSubmit, disabled }: QueryInputProps) {
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      setValidationError("Please enter a search query");
      return;
    }
    setValidationError(null);
    onSubmit(value.trim());
  };

  return (
    <form className="query-form" onSubmit={handleSubmit}>
      <div className="query-input-row">
        <input
          className="query-input"
          type="text"
          maxLength={500}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. chill lo-fi beats for studying…"
          disabled={disabled}
        />
        <button className="search-btn" type="submit" disabled={disabled}>
          Search
        </button>
      </div>
      {validationError && (
        <span className="validation-error" role="alert" aria-live="polite">
          {validationError}
        </span>
      )}
    </form>
  );
}
