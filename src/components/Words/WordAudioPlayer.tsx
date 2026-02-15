import { useEffect, useRef, useState } from "react";
import type { Word } from "../../db/vocarichDb";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

type Props = {
  word: Word | null;
};

const WordAudioPlayer = ({ word }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // cleanup previous
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";
    audio.load();

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (!word?.audioBlob) return;

    const url = URL.createObjectURL(word.audioBlob);
    objectUrlRef.current = url;
    audio.src = url;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.id]);

  if (!word?.audioBlob) return null;

  const handlePlay = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">Pronunciation</span>

      {!isPlaying ? (
        <button
          onClick={handlePlay}
          className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center shadow active:scale-95 transition"
        >
          <PlayIcon className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center shadow active:scale-95 transition"
        >
          <StopIcon className="w-6 h-6" />
        </button>
      )}

      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default WordAudioPlayer;
