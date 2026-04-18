import { createContext, useContext, useMemo, useState } from "react";
import useGroups from "../hooks/useGroups";
import { createGroup, deleteGroup, renameGroup } from "../db/crudGroups";
import { useParams } from "react-router";
import ActionsBottomSheet from "../components/Common/BottomSheet/ActionsBottomSheet";
import type { Group } from "../db/vocarichDb";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet";
import CreateOrEditGroupBottomSheet from "../components/Groups/CreateOrEditGroupBottomSheet";

type ContextType = ReturnType<typeof useGroups> & {
  openCreateGroup: () => void;
  openActions: (group: Group) => void;
  openDeleteGroup: (id: string) => void;
  openEditGroup: (group: Group) => void;
};

const GroupsContext = createContext<ContextType | null>(null);

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [actionGroup, setActionGroup] = useState<Group | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const groupsState = useGroups();

  // ---------- actions ----------
  const openCreateGroup = () => setShowCreateGroup(true);

  const openActions = (group: Group) => setActionGroup(group);

  const openDeleteGroup = (id: string) => setDeleteId(id);

  const openEditGroup = (group: Group) => setEditingGroup(group);

  // ---------- save ----------
  const handleCreateGroup = async (name: string) => {
    if (!moduleId) return;
    const trimmed = name.trim();
    if (!trimmed) return;

    await createGroup(moduleId, trimmed);
  };

  const handleEditGroup = async (name: string) => {
    if (!editingGroup) return;
    const trimmed = name.trim();
    if (!trimmed) return;

    await renameGroup(editingGroup.id, trimmed);
    setEditingGroup(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteGroup(deleteId);
    setDeleteId(null);
  };

  const value = useMemo(
    () => ({
      openCreateGroup,
      openActions,
      openDeleteGroup,
      openEditGroup,
      ...groupsState,
    }),
    [groupsState],
  );

  return (
    <GroupsContext.Provider value={value}>
      {children}

      {/* Create */}
      <CreateOrEditGroupBottomSheet
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreate={handleCreateGroup}
      />

      {/* ACTIONS */}
      <ActionsBottomSheet
        isOpen={!!actionGroup}
        onClose={() => setActionGroup(null)}
        onEdit={() => {
          if (!actionGroup) return;
          openEditGroup(actionGroup);
          setActionGroup(null);
        }}
        onDelete={() => {
          if (!actionGroup) return;
          openDeleteGroup(actionGroup.id);
          setActionGroup(null);
        }}
      />

      {/* Edit */}
      <CreateOrEditGroupBottomSheet
        isOpen={!!editingGroup}
        onClose={() => setEditingGroup(null)}
        onCreate={handleEditGroup}
        mode="edit"
        initialGroupName={editingGroup?.name}
      />

      {/* DELETE */}
      <ConfirmBottomSheet
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete this group?"
        message="This will permanently remove the group from this module. But the words in this group will not be deleted."
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
