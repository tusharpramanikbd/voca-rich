import type { ChallengeQuestion } from "../../../types/challengeQuestion";

export type QuestionRendererProps = {
  question: ChallengeQuestion;
  selectedOption: string | null;
  showResult: boolean;
  isCorrect: boolean | null;
  onSelect: (value: string) => void;
};
