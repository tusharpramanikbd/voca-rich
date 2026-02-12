import { db, type Module } from "./vocarichDb.js";
import { v4 as uuidv4 } from "uuid";

export const createModule = async (name: string): Promise<Module> => {
  const now = Date.now();
  const module: Module = {
    id: uuidv4(),
    name,
    createdAt: now,
    updatedAt: now,
  };
  await db.modules.add(module);
  return module;
};

export const renameModule = async (id: string, name: string): Promise<void> => {
  await db.modules.update(id, { name, updatedAt: Date.now() });
};

export const deleteModuleCascade = async (moduleId: string): Promise<void> => {
  await db.transaction("rw", db.words, db.modules, async () => {
    // Delete all words in this module first
    await db.words.where("moduleId").equals(moduleId).delete();
    // Then delete the module
    await db.modules.delete(moduleId);
  });
};

export const listModules = async (): Promise<Module[]> => {
  return await db.modules.toArray();
};

export async function getWordCountsByModule() {
  const words = await db.words.toArray();

  const counts: Record<string, number> = {};

  for (const w of words) {
    counts[w.moduleId] = (counts[w.moduleId] || 0) + 1;
  }

  return counts;
}
