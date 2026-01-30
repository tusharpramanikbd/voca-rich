import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, type Module } from "../db/vocarichDb";
import {
  createModule,
  deleteModuleCascade,
  renameModule,
} from "../db/crudModules";

const useModules = () => {
  const [newModuleName, setNewModuleName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Module | null>(null);

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

  const handleRenameModule = async (title: string) => {
    if (!editingWord?.id) return;
    await renameModule(editingWord.id, title);
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
    setEditingWord,
    setIsEditSheetOpen,
    isEditSheetOpen,
    editingWord,
    handleRenameModule,
  };
};
export default useModules;
