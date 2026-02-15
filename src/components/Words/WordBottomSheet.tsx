import { useState, memo, useEffect, useRef } from "react";
import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import {
  MicrophoneIcon,
  StopIcon,
  PlayIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

type TWordBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    word: string,
    meaning: string,
    sentence: string,
    audioBlob: Blob | null,
  ) => Promise<void>;
  mode?: "add" | "edit";
  initialWord?: string;
  initialMeaning?: string;
  initialSentence?: string;
  initialAudio?: Blob | null;
};

const WordBottomSheet = ({
  isOpen,
  onClose,
  onSave,
  mode = "add",
  initialWord = "",
  initialMeaning = "",
  initialSentence = "",
  initialAudio = null,
}: TWordBottomSheet) => {
  const {
    startRecording,
    stopRecording,
    clearRecording,
    isRecording,
    recordedBlob,
  } = useAudioRecorder();

  const [saving, setSaving] = useState(false);

  const [word, setWord] = useState(initialWord);
  const [meaning, setMeaning] = useState(initialMeaning);
  const [sentence, setSentence] = useState(initialSentence);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(initialAudio);

  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClose = async () => {
    if (isRecording) {
      await stopRecording();
    }

    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
      audioPreviewRef.current.currentTime = 0;
    }

    setIsPlayingPreview(false);

    onClose();
  };

  const handleSave = async () => {
    const trimmedWord = word.trim();
    const trimmedMeaning = meaning.trim();
    const trimmedSentence = sentence.trim();

    if (!trimmedWord || !trimmedMeaning) return;

    setSaving(true);
    try {
      await onSave(trimmedWord, trimmedMeaning, trimmedSentence, audioBlob);
      handleClose();
    } finally {
      setSaving(false);
    }
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = async () => {
    await stopRecording();
  };

  const handleDeleteRecording = () => {
    clearRecording();
    setAudioBlob(null);
  };

  const handlePlayPreview = () => {
    if (!audioPreviewRef.current || !previewUrl) return;

    audioPreviewRef.current.currentTime = 0;
    audioPreviewRef.current.play();
    setIsPlayingPreview(true);
  };

  const handleStopPreview = () => {
    if (!audioPreviewRef.current) return;

    audioPreviewRef.current.pause();
    audioPreviewRef.current.currentTime = 0;
    setIsPlayingPreview(false);
  };

  useEffect(() => {
    if (!audioBlob) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(audioBlob);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioBlob]);

  useEffect(() => {
    if (!isOpen) return;

    setWord(initialWord ?? "");
    setMeaning(initialMeaning ?? "");
    setSentence(initialSentence ?? "");
    setAudioBlob(initialAudio ?? null);
  }, [isOpen, initialWord, initialMeaning, initialSentence, initialAudio]);

  useEffect(() => {
    const audio = audioPreviewRef.current;
    if (!audio) return;

    const onEnded = () => setIsPlayingPreview(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (recordedBlob) {
      setAudioBlob(recordedBlob);
    }
  }, [recordedBlob]);

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="px-6 pb-8 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 text-center">
          {mode === "add" ? "Add New Word" : "Edit Word"}
        </h3>

        <div className="space-y-3">
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Word..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <input
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            placeholder="Meaning..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <div className="pt-4 space-y-4">
            <h3 className="text-sm text-gray-500">Pronunciation (optional)</h3>

            <div className="flex items-center justify-center gap-6">
              {/* RECORD BUTTON */}
              {!audioBlob && !isRecording && (
                <button
                  onClick={handleStartRecording}
                  className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition"
                >
                  <MicrophoneIcon className="w-6 h-6" />
                </button>
              )}

              {/* RECORDING */}
              {isRecording && (
                <button
                  onClick={handleStopRecording}
                  className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg animate-pulse active:scale-95 transition"
                >
                  <StopIcon className="w-6 h-6" />
                </button>
              )}

              {/* PLAY / STOP */}
              {audioBlob && !isRecording && (
                <>
                  {!isPlayingPreview ? (
                    <button
                      onClick={handlePlayPreview}
                      className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow active:scale-95 transition"
                    >
                      <PlayIcon className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={handleStopPreview}
                      className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow active:scale-95 transition"
                    >
                      <StopIcon className="w-6 h-6" />
                    </button>
                  )}

                  <button
                    onClick={handleDeleteRecording}
                    className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center active:scale-95 transition"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* hidden preview player */}
            <audio
              ref={audioPreviewRef}
              src={previewUrl ?? undefined}
              preload="auto"
            />
          </div>
          <textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Example sentence (optional)..."
            rows={3}
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!word.trim() || !meaning.trim() || saving}
              className="flex-1 bg-linear-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving..."
                : mode === "add"
                  ? "Add Word"
                  : "Save Changes"}
            </button>
            <button
              onClick={handleClose}
              disabled={saving}
              className="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default memo(WordBottomSheet);
