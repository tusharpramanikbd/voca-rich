import type { Word } from "../db/vocarichDb";

export type ChallengeQuestionType = "WORD_TO_MEANING" | "MEANING_TO_WORD";

export type ChallengeQuestion = {
  id: string;

  type: ChallengeQuestionType;

  word: Word; // original source word

  prompt: string; // what user sees as question
  options: string[];
  correctAnswer: string;
};
