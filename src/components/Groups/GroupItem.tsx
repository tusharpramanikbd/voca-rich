import type { Group } from "../../db/vocarichDb";

type TGroupItem = {
  group: Group;
  selectedGroupId: string | undefined;
  setSelectedGroupId: (id: string) => void;
};

const GroupItem = ({
  group,
  selectedGroupId,
  setSelectedGroupId,
}: TGroupItem) => {
  return (
    <button
      onClick={() => setSelectedGroupId(group.id)}
      className={`px-4 py-2 rounded-xl border whitespace-nowrap
        ${
          selectedGroupId === group.id
            ? "bg-teal-500 text-white"
            : "bg-white text-gray-700"
        }
      `}
    >
      {group.name}
    </button>
  );
};

export default GroupItem;
