import type { Word } from "../../db/vocarichDb";

type TWordList = {
  words: Word[];
  setEditingWord: React.Dispatch<React.SetStateAction<Word | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteWord: (id: string) => Promise<void>;
};

const WordList = ({
  words,
  setEditingWord,
  setIsEditSheetOpen,
  handleDeleteWord,
}: TWordList) => {
  return (
    <div className="px-6 space-y-4 pb-24">
      {(words ?? []).map((word) => (
        <div
          key={word.id}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 group"
        >
          <div className="flex items-start justify-between group-hover:bg-teal-50 p-4 rounded-xl transition-colors">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {word.word}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {word.meaning}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Added {new Date(word.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <button
                onClick={() => {
                  setEditingWord(word);
                  setIsEditSheetOpen(true);
                }}
                className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteWord(word.id)}
                className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;
