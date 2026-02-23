import { memo } from "react";
import type { QuestionRendererProps } from "./types";

const MultipleChoiceRenderer = ({
  question,
  selectedOption,
  showResult,
  onSelect,
}: QuestionRendererProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {question.options?.map((opt, index) => (
        <button
          key={index}
          onClick={() => {
            if (showResult) return;
            onSelect(opt);
          }}
          className={`w-full text-left px-5 py-4 rounded-2xl border shadow-sm transition
          ${
            showResult
              ? opt === question.correctAnswer
                ? "bg-green-100 border-green-500"
                : opt === selectedOption
                  ? "bg-red-100 border-red-500"
                  : "bg-white"
              : selectedOption === opt
                ? "border-teal-500 bg-teal-50"
                : "bg-white hover:bg-gray-50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default memo(MultipleChoiceRenderer);
