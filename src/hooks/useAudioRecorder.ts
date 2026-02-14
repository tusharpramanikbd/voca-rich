import { useRef, useState } from "react";

const MAX_RECORDING_TIME = 10000;

const useAudioRecorder = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<number | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const startRecording = async () => {
    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });

      // IMPORTANT: immutable stable blob
      const stableBlob = new Blob([blob], { type: blob.type });

      setRecordedBlob(stableBlob);
      setIsRecording(false);

      // release mic
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };

    recorder.start();
    setIsRecording(true);

    // auto stop
    timeoutRef.current = window.setTimeout(() => {
      stopRecording();
    }, MAX_RECORDING_TIME);
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;

    if (mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearRecording = () => {
    setRecordedBlob(null);
  };

  return {
    startRecording,
    stopRecording,
    clearRecording,
    isRecording,
    recordedBlob,
  };
};

export default useAudioRecorder;
