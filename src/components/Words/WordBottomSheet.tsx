import { useState, memo, useEffect, useMemo } from "react";
import BaseBottomSheet from "../Common/BottomSheet/BaseBottomSheet";
import useAudioRecorder from "../../hooks/useAudioRecorder";

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

  const previewUrl = useMemo(() => {
    if (!audioBlob) return null;
    return URL.createObjectURL(audioBlob);
  }, [audioBlob]);

  const handleClose = async () => {
    if (isRecording) {
      await stopRecording();
    }

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

  useEffect(() => {
    if (!isOpen) return;

    setWord(initialWord ?? "");
    setMeaning(initialMeaning ?? "");
    setSentence(initialSentence ?? "");
    setAudioBlob(initialAudio ?? null);
  }, [isOpen, initialWord, initialMeaning, initialSentence, initialAudio]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
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
          <div className="border-t pt-4 space-y-3">
            <h3 className="font-semibold text-gray-800">
              Pronunciation (optional)
            </h3>

            {!isRecording && (
              <button
                onClick={handleStartRecording}
                className="w-full bg-teal-600 text-white py-3 rounded-xl"
              >
                🎙 Record pronunciation
              </button>
            )}

            {isRecording && (
              <button
                onClick={handleStopRecording}
                className="w-full bg-red-600 text-white py-3 rounded-xl animate-pulse"
              >
                ⏹ Stop recording
              </button>
            )}

            {previewUrl && (
              <>
                <audio controls className="w-full">
                  <source src={previewUrl} type="audio/webm" />
                </audio>

                <button
                  onClick={handleDeleteRecording}
                  className="w-full bg-gray-200 py-2 rounded-xl"
                >
                  Delete recording
                </button>
              </>
            )}
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
