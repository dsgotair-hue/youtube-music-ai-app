import { useState } from 'react';
import { QueryInput } from './components/QueryInput';
import LoadingSpinner from './components/LoadingSpinner';
import { ErrorBanner } from './components/ErrorBanner';
import PlaylistView from './components/PlaylistView';
import Player from './components/Player';
import { useQuery } from './hooks/useQuery';

function extractVideoId(url: string): string {
  try {
    return new URL(url).searchParams.get('v') ?? '';
  } catch {
    return '';
  }
}

function App() {
  const { loading, playlist, error, submitQuery, clearError } = useQuery();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleQuerySubmit = (query: string) => {
    submitQuery(query);
    setCurrentIndex(null);
  };

  const handlePlayerEnd = () => {
    if (currentIndex !== null && currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎵 Music AI</h1>
        <p className="app-subtitle">Discover YouTube music with natural language</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <QueryInput onSubmit={handleQuerySubmit} disabled={loading} />
          <LoadingSpinner loading={loading} />
          {error && <ErrorBanner message={error} onDismiss={clearError} />}
          {playlist.length === 0 && !loading && (
            <div className="empty-state">
              <span className="empty-state-icon">🎧</span>
              <p className="empty-state-text">Try "chill lo-fi beats" or "90s hip hop classics"</p>
            </div>
          )}
          <PlaylistView
            playlist={playlist}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </aside>

        <section className="content">
          {currentIndex !== null && playlist[currentIndex] && (
            <Player
              videoId={extractVideoId(playlist[currentIndex].url)}
              onEnd={handlePlayerEnd}
            />
          )}
          {currentIndex === null && (
            <div className="empty-state" style={{ flex: 1 }}>
              <span className="empty-state-icon">▶️</span>
              <p className="empty-state-text">Select a track to start playing</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
