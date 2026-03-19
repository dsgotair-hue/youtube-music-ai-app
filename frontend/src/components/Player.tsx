import { useEffect, useState } from "react";
import YouTube from "react-youtube";

interface PlayerProps {
  videoId: string | null;
  onEnd: () => void;
}

export default function Player({ videoId, onEnd }: PlayerProps) {
  const [playerError, setPlayerError] = useState<string | null>(null);

  useEffect(() => {
    setPlayerError(null);
  }, [videoId]);

  if (videoId === null) return null;

  return (
    <div className="player-container">
      <YouTube
        videoId={videoId}
        onEnd={onEnd}
        onError={() => setPlayerError("This video is unavailable or restricted.")}
        opts={{ width: "100%", playerVars: { autoplay: 1 } }}
      />
      {playerError && <p className="player-error" role="alert">{playerError}</p>}
    </div>
  );
}
