import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, type Module } from "../db/vocarichDb";
import { createModule, deleteModuleCascade } from "../db/crudModules";

const useModules = () => {
  const [newModuleName, setNewModuleName] = useState("");

  const modules = useLiveQuery(
    () => db.modules.orderBy("updatedAt").reverse().toArray(),
    [],
    [],
  ) as Module[];

  async function handleCreateModule() {
    const name = newModuleName.trim();
    if (!name) return;
    await createModule(name);
    setNewModuleName("");
  }

  async function handleDeleteModule(moduleId: string) {
    if (!confirm("Delete this module and all words?")) return;
    await deleteModuleCascade(moduleId);
  }

  return {
    newModuleName,
    setNewModuleName,
    modules,
    handleCreateModule,
    handleDeleteModule,
  };
};
export default useModules;
