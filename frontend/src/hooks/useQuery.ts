import { useState } from 'react';
import { MusicResult, QueryResponse } from '../types';

export function useQuery() {
  const [loading, setLoading] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<MusicResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const submitQuery = async (query: string) => {
    setLoading(true);
    setPlaylist([]);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        let detail: string | undefined;
        try {
          const body = await response.json();
          detail = body?.detail;
        } catch {
          // ignore parse errors
        }
        setError(detail ?? 'An unexpected error occurred');
        return;
      }

      const data: QueryResponse = await response.json();
      setPlaylist(data.results);
    } catch {
      setError('Network error: unable to reach the server');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { loading, playlist, error, submitQuery, clearError };
}
