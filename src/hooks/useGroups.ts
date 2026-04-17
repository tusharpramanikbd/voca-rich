import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import { listGroupsByModule, createGroup } from "../db/crudGroups";
import type { Group } from "../db/vocarichDb";

const ALL_GROUP_ID = "ALL";

const useGroups = () => {
  const { module } = useParams();
  const moduleId = module ? module.split("+")[0] : null;

  const [selectedGroupId, setSelectedGroupId] = useState<string>(ALL_GROUP_ID);

  // live groups from DB
  const groups =
    useLiveQuery(async () => {
      if (!moduleId) return [];
      return await listGroupsByModule(moduleId);
    }, [moduleId]) ?? [];

  // inject "All" group at the beginning
  const groupsWithAll: Group[] = [
    {
      id: ALL_GROUP_ID,
      moduleId: moduleId ?? "",
      name: "All",
      createdAt: 0,
      updatedAt: 0,
    },
    ...groups,
  ];

  const handleCreateGroup = async (name: string) => {
    if (!moduleId) return;
    const trimmed = name.trim();
    if (!trimmed) return;

    await createGroup(moduleId, trimmed);
  };

  return {
    groups: groupsWithAll,
    selectedGroupId,
    setSelectedGroupId,
    handleCreateGroup,
    isAllSelected: selectedGroupId === ALL_GROUP_ID,
  };
};

export default useGroups;
