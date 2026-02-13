import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, type Module } from "../db/vocarichDb";
import { createModule } from "../db/crudModules";

const useModules = () => {
  const [newModuleName, setNewModuleName] = useState("");

  const modules = useLiveQuery(
    () => db.modules.orderBy("createdAt").reverse().toArray(),
    [],
    undefined,
  ) as Module[] | undefined;

  const handleCreateModule = async () => {
    const name = newModuleName.trim();
    if (!name) return;
    await createModule(name);
    setNewModuleName("");
  };

  return {
    newModuleName,
    setNewModuleName,
    modules,
    handleCreateModule,
  };
};
export default useModules;
