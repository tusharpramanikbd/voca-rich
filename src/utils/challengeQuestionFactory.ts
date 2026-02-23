import type { Word } from "../db/vocarichDb";
import type { ChallengeQuestion } from "../types/challengeQuestion";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createWordToMeaningQuestion(
  word: Word,
  allWords: Word[],
): ChallengeQuestion {
  const otherWords = allWords.filter((w) => w.id !== word.id);

  const wrong = shuffle(otherWords)
    .slice(0, 3)
    .map((w) => w.meaning);

  const options = shuffle([word.meaning, ...wrong]);

  return {
    id: crypto.randomUUID(),
    type: "WORD_TO_MEANING",
    word,
    prompt: word.word,
    options,
    correctAnswer: word.meaning,
  };
}

function createMeaningToWordQuestion(
  word: Word,
  allWords: Word[],
): ChallengeQuestion {
  const otherWords = allWords.filter((w) => w.id !== word.id);

  const wrong = shuffle(otherWords)
    .slice(0, 3)
    .map((w) => w.word);

  const options = shuffle([word.word, ...wrong]);

  return {
    id: crypto.randomUUID(),
    type: "MEANING_TO_WORD",
    word,
    prompt: word.meaning,
    options,
    correctAnswer: word.word,
  };
}

export function generateChallengeQuestions(words: Word[]): ChallengeQuestion[] {
  return words.map((word) => {
    // 50/50 random question type
    const random = Math.random() < 0.5;

    if (random) {
      return createWordToMeaningQuestion(word, words);
    } else {
      return createMeaningToWordQuestion(word, words);
    }
  });
}
