import { db, type Module } from "./vocarichDb.js";
import { v4 as uuidv4 } from "uuid";

export async function createModule(name: string): Promise<Module> {
  const now = Date.now();
  const module: Module = {
    id: uuidv4(),
    name,
    createdAt: now,
    updatedAt: now,
  };
  await db.modules.add(module);
  return module;
}

export async function renameModule(id: string, name: string): Promise<void> {
  await db.modules.update(id, { name, updatedAt: Date.now() });
}

export async function deleteModuleCascade(moduleId: string): Promise<void> {
  await db.transaction("rw", db.words, db.modules, async () => {
    // Delete all words in this module first
    await db.words.where("moduleId").equals(moduleId).delete();
    // Then delete the module
    await db.modules.delete(moduleId);
  });
}

export async function listModules(): Promise<Module[]> {
  return await db.modules.toArray();
}
