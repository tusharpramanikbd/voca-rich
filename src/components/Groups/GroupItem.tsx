import type { Group } from "../../db/vocarichDb";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ALL_GROUP_ID } from "../../hooks/useGroups";
import { useGroupsContext } from "../../providers/GroupsProvider";

type TGroupItem = {
  group: Group & {
    count?: number;
  };
  selectedGroupId: string | undefined;
  setSelectedGroupId: (id: string) => void;
};

const GroupItem = ({
  group,
  selectedGroupId,
  setSelectedGroupId,
}: TGroupItem) => {
  const { openActions } = useGroupsContext();
  return (
    <div
      onClick={() => setSelectedGroupId(group.id)}
      className={`px-2 py-2 rounded-xl border whitespace-nowrap flex items-center justify-between gap-3 ${
        group.id === ALL_GROUP_ID ? "px-4" : "pl-4"
      }
        ${
          selectedGroupId === group.id
            ? "bg-teal-500 text-white"
            : "bg-white text-gray-700"
        }
      `}
    >
      <div>
        {group.name}
        {group.count !== undefined && `(${group.count})`}
      </div>

      {group.id !== ALL_GROUP_ID && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openActions(group);
          }}
          className="px-2"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default GroupItem;
