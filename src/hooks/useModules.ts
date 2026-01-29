import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, type Module } from "../db/vocarichDb";
import { createModule, deleteModuleCascade } from "../db/crudModules";

const useModules = () => {
  const [newModuleName, setNewModuleName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);

  const modules = useLiveQuery(
    () => db.modules.orderBy("updatedAt").reverse().toArray(),
    [],
    [],
  ) as Module[];

  const handleCreateModule = async () => {
    const name = newModuleName.trim();
    if (!name) return;
    await createModule(name);
    setNewModuleName("");
  };

  const requestDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteSheetOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteModuleCascade(deleteId);
    setIsDeleteSheetOpen(false);
    setDeleteId(null);
  };

  return {
    newModuleName,
    setNewModuleName,
    modules,
    handleCreateModule,
    requestDelete,
    confirmDelete,
    isDeleteSheetOpen,
    setIsDeleteSheetOpen,
    setDeleteId,
  };
};
export default useModules;
