import { useEffect, useRef } from "react";
import type { Word } from "../../db/vocarichDb";

type Props = {
  word: Word | null;
};

const WordAudioPlayer = ({ word }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // clear previous audio
    audio.pause();
    audio.removeAttribute("src");
    audio.load();

    // revoke old url safely
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    // no recording
    if (!word?.audioBlob) return;

    // create new url
    const url = URL.createObjectURL(word.audioBlob);
    objectUrlRef.current = url;

    // IMPORTANT: attach directly to element
    audio.src = url;
    audio.load();

    // cleanup ONLY when component unmounts
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.id]); // only when different word is opened

  if (!word?.audioBlob) return null;

  return (
    <div className="mt-5 border-t pt-4 space-y-3">
      <h3 className="font-semibold text-gray-800">Pronunciation</h3>

      <audio ref={audioRef} controls preload="metadata" className="w-full" />
    </div>
  );
};

export default WordAudioPlayer;
