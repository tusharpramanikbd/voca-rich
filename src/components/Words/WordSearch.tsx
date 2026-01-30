import { XMarkIcon } from "@heroicons/react/24/outline";

type TWordSearch = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const WordSearch = ({ searchTerm, setSearchTerm }: TWordSearch) => {
  return (
    <div className="px-5 py-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg relative">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search words..."
          className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 pr-12 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 peer"
        />

        {/* Clear button - shows only when text exists */}
        {searchTerm.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors group peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WordSearch;
