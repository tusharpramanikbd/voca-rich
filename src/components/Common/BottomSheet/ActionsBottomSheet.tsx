import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import BaseBottomSheet from "./BaseBottomSheet";
import { memo } from "react";

type TActionsBottomSheet = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsBottomSheet = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: TActionsBottomSheet) => (
  <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
    <div className="px-6 pb-8">
      <button
        onClick={onEdit}
        className="w-full py-4 px-2 text-lg font-semibold text-gray-900 flex items-center gap-3"
      >
        <PencilIcon className="w-6 h-6" /> Edit
      </button>

      <button
        onClick={onDelete}
        className="w-full py-4 px-2 text-lg font-semibold text-red-600 flex items-center gap-3"
      >
        <TrashIcon className="w-6 h-6" /> Delete
      </button>
    </div>
  </BaseBottomSheet>
);

export default memo(ActionsBottomSheet);
