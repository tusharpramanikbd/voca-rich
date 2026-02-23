import { memo } from "react";
import type { QuestionRendererProps } from "./types";

const TypingRenderer = ({
  selectedOption,
  showResult,
  onSelect,
}: QuestionRendererProps) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={selectedOption ?? ""}
        disabled={showResult}
        onChange={(e) => onSelect(e.target.value)}
        placeholder="Type your answer..."
        className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};

export default memo(TypingRenderer);
