import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Word } from "../db/vocarichDb";
import { listWordsByModule } from "../db/crudWords";

export const useChallengeWords = (moduleId: string | null) => {
  const navigate = useNavigate();

  const [challengeWords, setChallengeWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moduleId) return;

    const load = async () => {
      const allWords = await listWordsByModule(moduleId);

      // safety guard
      if (allWords.length < 4) {
        navigate(-1);
        return;
      }

      // shuffle
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);

      // challenge size
      const limit = Math.min(10, shuffled.length);

      setChallengeWords(shuffled.slice(0, limit));
      setLoading(false);
    };

    load();
  }, [moduleId, navigate]);

  return { challengeWords, loading };
};
