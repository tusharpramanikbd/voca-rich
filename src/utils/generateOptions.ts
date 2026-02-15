import type { Word } from "../db/vocarichDb";

export const generateOptions = (word: Word, allWords: Word[]) => {
  const correctMeaning = word.meaning;

  // remove current word
  const otherWords = allWords.filter((w) => w.id !== word.id);

  // shuffle
  const shuffled = [...otherWords].sort(() => Math.random() - 0.5);

  // 3 wrong meanings
  const wrongMeanings = shuffled.slice(0, 3).map((w) => w.meaning);

  // combine + shuffle again
  return [correctMeaning, ...wrongMeanings].sort(() => Math.random() - 0.5);
};
