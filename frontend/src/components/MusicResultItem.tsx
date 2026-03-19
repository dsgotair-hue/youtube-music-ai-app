import { MusicResult } from "../types";

interface MusicResultItemProps {
  result: MusicResult;
  isActive: boolean;
  onSelect: () => void;
  index: number;
}

export default function MusicResultItem({ result, isActive, onSelect, index }: MusicResultItemProps) {
  return (
    <div
      className={`music-result-item${isActive ? " active" : ""}`}
      aria-current={isActive ? "true" : undefined}
      onClick={onSelect}
    >
      <span className="track-number">{isActive ? "♪" : index + 1}</span>
      <div className="track-info">
        <span className="music-result-title">{result.title}</span>
        <span className="music-result-artist">{result.artist}</span>
      </div>
      <button
        className="play-btn"
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        aria-label={`Play ${result.title}`}
      >
        ▶
      </button>
    </div>
  );
}
