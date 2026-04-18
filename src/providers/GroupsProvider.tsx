import { createContext, useContext, useMemo, useState } from "react";
import useGroups from "../hooks/useGroups";
import CreateGroupBottomSheet from "../components/Groups/CreateGroupBottomSheet";
import { createGroup } from "../db/crudGroups";
import { useParams } from "react-router";

type ContextType = ReturnType<typeof useGroups> & {
  openCreateGroup: () => void;
};

const GroupsContext = createContext<ContextType | null>(null);

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;

  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const groupsState = useGroups();

  // ---------- actions ----------

  const openCreateGroup = () => setShowCreateGroup(true);

  // ---------- save ----------
  const handleCreateGroup = async (name: string) => {
    if (!moduleId) return;
    const trimmed = name.trim();
    if (!trimmed) return;

    await createGroup(moduleId, trimmed);
  };

  const value = useMemo(
    () => ({
      openCreateGroup,
      ...groupsState,
    }),
    [groupsState],
  );

  return (
    <GroupsContext.Provider value={value}>
      {children}

      {/* Create */}
      <CreateGroupBottomSheet
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
    </GroupsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGroupsContext = () => {
  const ctx = useContext(GroupsContext);
  if (!ctx)
    throw new Error("useGroupsContext must be used inside GroupsProvider");
  return ctx;
};
