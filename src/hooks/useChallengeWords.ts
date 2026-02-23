import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listWordsByModule } from "../db/crudWords";
import type { ChallengeQuestion } from "../types/challengeQuestion";
import { generateChallengeQuestions } from "../utils/challengeQuestionFactory";

export const useChallengeWords = (moduleId: string | null) => {
  const navigate = useNavigate();

  const [challengeQuestions, setChallengeQuestions] = useState<
    ChallengeQuestion[]
  >([]);
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

      const selectedWords = shuffled.slice(0, limit);
      const questions = generateChallengeQuestions(selectedWords);

      setChallengeQuestions(questions);
      setLoading(false);
    };

    load();
  }, [moduleId, navigate]);

  return { challengeQuestions, loading };
};
