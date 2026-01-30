import { Link } from "react-router";
import type { Module } from "../../db/vocarichDb";
import { memo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { countWordsByModule } from "../../db/crudWords";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import ActionsBottomSheet from "../Common/BottomSheet/ActionsBottomSheet";

type TModuleItem = {
  module: Module;
  setEditingWord: React.Dispatch<React.SetStateAction<Module | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAskDelete: (id: string) => void;
};

const ModuleItem = ({
  module,
  setEditingWord,
  setIsEditSheetOpen,
  onAskDelete,
}: TModuleItem) => {
  const [showMenu, setShowMenu] = useState(false);

  const wordCount =
    useLiveQuery(async () => {
      if (!module?.id) return 0;
      return await countWordsByModule(module.id);
    }, [module?.id]) ?? 0;

  return (
    <>
      <Link
        to={`/app/m/${module?.id}+${module?.name}`}
        className="block bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-white/50 group"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-teal-600">
              {module?.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {wordCount > 1 ? `${wordCount} words` : `${wordCount} word`}
            </p>
          </div>

          {/* Single 3-dots button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(true);
            }}
          >
            <EllipsisVerticalIcon className="w-6 h-6" />
          </button>
        </div>
      </Link>

      <ActionsBottomSheet
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onEdit={() => {
          setEditingWord(module);
          setIsEditSheetOpen(true);
          setShowMenu(false);
        }}
        onDelete={() => {
          onAskDelete(module?.id);
          setShowMenu(false);
        }}
      />
    </>
  );
};

export default memo(ModuleItem);
