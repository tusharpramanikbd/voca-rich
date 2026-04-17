import type { Group } from "../../db/vocarichDb";
import HorizontalList from "../Common/HorizontalList";
import GroupItem from "./GroupItem";
import { PlusIcon } from "@heroicons/react/24/solid";

type TGroupList = {
  groups: Group[] | undefined;
  selectedGroupId: string | undefined;
  setSelectedGroupId: (id: string) => void;
  onAddGroup: () => void;
};

const GroupList = ({
  groups,
  selectedGroupId,
  setSelectedGroupId,
  onAddGroup,
}: TGroupList) => {
  return (
    <div className="relative">
      {/* Horizontal list */}
      <HorizontalList
        items={groups}
        renderItem={(group) => (
          <GroupItem
            group={group}
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
          />
        )}
      />

      {/* Right fade + button overlay */}
      <div className="pointer-events-none absolute right-0 top-0 h-full flex items-center">
        {/* Fade effect */}
        <div className="w-20 h-full bg-linear-to-l from-white via-white/80 to-transparent" />

        {/* Button */}
        <button
          onClick={onAddGroup}
          className="pointer-events-auto absolute right-3 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GroupList;
