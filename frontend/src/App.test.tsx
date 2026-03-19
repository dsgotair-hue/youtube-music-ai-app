import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock react-youtube to avoid iframe loading issues in jsdom
vi.mock('react-youtube', () => ({
  default: ({ videoId }: { videoId: string }) => (
    <div data-testid="youtube-player" data-video-id={videoId} />
  ),
}));

// Mock fetch globally
const mockFetch = vi.fn();
beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ results: [], message: null }),
  });
});

describe('App smoke test', () => {
  it('renders the search input', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
