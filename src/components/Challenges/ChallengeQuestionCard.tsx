import type { Word } from "../../db/vocarichDb";

type TChallengeQuestionCard = {
  currentWord: Word;
  options: string[];
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
  currentWord,
  options,
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

  return (
    <div className="max-w-md mx-auto flex flex-col text-center gap-8">
      {/* progress */}
      <div className="text-gray-500">
        {currentIndex + 1} / {total}
      </div>

      {/* word */}
      <div className="text-4xl font-bold text-gray-800 wrap-break-words">
        {currentWord.word}
      </div>

      {/* options */}
      <div className="w-full flex flex-col gap-3">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => {
              if (showResult) return;
              onSelect(opt);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl border shadow-sm transition
            ${
              showResult
                ? opt === currentWord.meaning
                  ? "bg-green-100 border-green-500"
                  : opt === selectedOption
                    ? "bg-red-100 border-red-500"
                    : "bg-white"
                : selectedOption === opt
                  ? "border-teal-500 bg-teal-50"
                  : "bg-white hover:bg-gray-50"
            }
          `}
          >
            {opt}
          </button>
        ))}
      </div>

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
              <span className="font-semibold">{currentWord.meaning}</span>
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
