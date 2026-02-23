import MultipleChoiceRenderer from "./MultipleChoiceRenderer";
import TypingRenderer from "./TypingRenderer";
import type { ChallengeQuestionType } from "../../../types/challengeQuestion";
import type { QuestionRendererProps } from "./types";
import type { ComponentType } from "react";

export const QUESTION_RENDERERS: Record<
  ChallengeQuestionType,
  ComponentType<QuestionRendererProps>
> = {
  WORD_TO_MEANING: MultipleChoiceRenderer,
  MEANING_TO_WORD: MultipleChoiceRenderer,
  TYPE_WORD_FROM_MEANING: TypingRenderer,
};
