import { Link } from "react-router";
import type { Module } from "../../db/vocarichDb";

type TModuleItem = {
  module: Module;
  handleDeleteModule: (moduleId: string) => void;
};

const ModuleItem = ({ module, handleDeleteModule }: TModuleItem) => {
  return (
    <Link
      to={`/app/m/${module?.id}`}
      className="block bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-white/50 group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-teal-600">
            {module?.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Created {new Date(module?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteModule?.(module?.id);
          }}
          className="text-red-500 hover:text-red-600 p-2 -m-2 rounded-xl hover:bg-red-100 transition-colors"
        >
          ✕
        </button>
      </div>
    </Link>
  );
};

export default ModuleItem;
