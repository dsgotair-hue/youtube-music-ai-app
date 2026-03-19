import { MusicResult } from "../types";
import MusicResultItem from "./MusicResultItem";

interface PlaylistViewProps {
  playlist: MusicResult[];
  currentIndex: number | null;
  onSelect: (index: number) => void;
}

export default function PlaylistView({ playlist, currentIndex, onSelect }: PlaylistViewProps) {
  if (playlist.length === 0) return null;

  return (
    <div className="playlist-container">
      <div className="playlist-header">Results — {playlist.length} tracks</div>
      <ul className="playlist-list">
        {playlist.map((result, index) => (
          <li key={result.url || index}>
            <MusicResultItem
              result={result}
              isActive={currentIndex === index}
              onSelect={() => onSelect(index)}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
