import type { ChallengeQuestion } from "../../types/challengeQuestion";
import { QUESTION_RENDERERS } from "./questionRenderers/questionRendererRegistry";

type TChallengeQuestionCard = {
  currentQuestion: ChallengeQuestion;
  selectedOption: string | null;
  showResult: boolean;
  isCorrect: boolean | null;
  currentIndex: number;
  total: number;

  onSelect: (opt: string) => void;
  onSubmit: () => void;
  onNext: () => void;
};

const ChallengeQuestionCard = ({
  currentQuestion,
  selectedOption,
  showResult,
  isCorrect,
  currentIndex,
  total,
  onSelect,
  onSubmit,
  onNext,
}: TChallengeQuestionCard) => {
  const isLast = currentIndex === total - 1;

  const Renderer = QUESTION_RENDERERS[currentQuestion.type];

  if (!Renderer) {
    throw new Error(`No renderer registered for type: ${currentQuestion.type}`);
  }

  return (
    <div className="max-w-md mx-auto flex flex-col text-center gap-8">
      {/* progress */}
      <div className="text-gray-500">
        {currentIndex + 1} / {total}
      </div>

      {/* prompt */}
      <div className="text-4xl font-bold text-gray-800 wrap-break-words">
        {currentQuestion?.prompt}
      </div>

      {/* question */}
      <Renderer
        question={currentQuestion}
        selectedOption={selectedOption}
        showResult={showResult}
        isCorrect={isCorrect}
        onSelect={onSelect}
      />

      {/* submit */}
      <button
        disabled={!selectedOption || showResult}
        onClick={onSubmit}
        className="mt-2 w-full py-4 rounded-2xl bg-teal-600 text-white font-semibold disabled:opacity-40"
      >
        Submit
      </button>

      {/* result */}
      {showResult && (
        <div
          className={`text-lg font-semibold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "Correct!" : "Wrong!"}

          {!isCorrect && (
            <div className="text-gray-700 font-normal mt-2">
              Correct answer:{" "}
              <span className="font-semibold">
                {currentQuestion?.correctAnswer}
              </span>
            </div>
          )}
        </div>
      )}

      {/* next / done */}
      {showResult && (
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold"
        >
          {isLast ? "Done" : "Next"}
        </button>
      )}
    </div>
  );
};

export default ChallengeQuestionCard;
