type TWordSearch = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const WordSearch = ({ searchTerm, setSearchTerm }: TWordSearch) => {
  return (
    <div className="px-6 py-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search words..."
          className="w-full bg-white/50 border border-gray-200 rounded-xl px-5 py-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );
};

export default WordSearch;
