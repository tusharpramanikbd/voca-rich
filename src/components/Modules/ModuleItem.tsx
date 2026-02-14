import { Link } from "react-router";
import type { Module } from "../../db/vocarichDb";
import { memo } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useModulesModal } from "../../providers/ModulesModalProvider";

type TModuleItem = {
  module: Module;
  wordCount: number;
};

const ModuleItem = ({ module, wordCount }: TModuleItem) => {
  const { openActions } = useModulesModal();

  return (
    <Link
      to={`/app/m/${module.id}+${module.name}`}
      className="block bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-white/50 group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-teal-600">
            {module.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {wordCount > 1 ? `${wordCount} words` : `${wordCount} word`}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openActions(module);
          }}
          className="p-4"
        >
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
      </div>
    </Link>
  );
};

export default memo(ModuleItem);
