import { useMemo } from "react";
import type { Word } from "../db/vocarichDb";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export const useChallengeOptions = (
  currentWord: Word | undefined,
  challengeWords: Word[],
) => {
  return useMemo(() => {
    if (!currentWord || challengeWords.length < 4) return [];

    const correctMeaning = currentWord.meaning;

    const otherWords = challengeWords.filter((w) => w.id !== currentWord.id);

    const wrongMeanings = shuffle(otherWords)
      .slice(0, 3)
      .map((w) => w.meaning);

    return shuffle([correctMeaning, ...wrongMeanings]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord?.id, challengeWords]);
};
