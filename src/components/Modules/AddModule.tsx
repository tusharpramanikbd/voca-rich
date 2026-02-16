type TAddModule = {
  newModuleName: string;
  setNewModuleName: (name: string) => void;
  handleCreateModule: () => void;
};

const AddModule = ({
  newModuleName,
  setNewModuleName,
  handleCreateModule,
}: TAddModule) => {
  return (
    <div className="px-4 py-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
        <div className="flex gap-3">
          <input
            value={newModuleName}
            onChange={(e) => setNewModuleName?.(e.target.value)}
            placeholder="New module name..."
            className="flex-1 min-w-0 bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onKeyDown={(e) => e.key === "Enter" && handleCreateModule?.()}
          />
          <button
            onClick={handleCreateModule}
            disabled={!newModuleName.trim()}
            className="shrink-0 bg-linear-to-r from-teal-500 to-blue-600 text-white text-3xl px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModule;
