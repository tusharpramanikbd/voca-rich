import { db, type Group } from "./vocarichDb";
import { v4 as uuidv4 } from "uuid";

export const createGroup = async (
  moduleId: string,
  name: string,
): Promise<Group> => {
  const now = Date.now();

  const group: Group = {
    id: uuidv4(),
    moduleId,
    name,
    createdAt: now,
    updatedAt: now,
  };

  await db.groups.add(group);
  return group;
};

export const renameGroup = async (id: string, name: string): Promise<void> => {
  await db.groups.update(id, { name, updatedAt: Date.now() });
};

export const deleteGroup = async (groupId: string): Promise<void> => {
  await db.transaction("rw", db.groups, db.words, async () => {
    // 1. reset groupId for all words in this group
    await db.words
      .where("groupId")
      .equals(groupId)
      .modify((word) => {
        word.groupId = undefined;
        word.updatedAt = Date.now();
      });

    // 2. delete the group
    await db.groups.delete(groupId);
  });
};

export const listGroupsByModule = async (
  moduleId: string,
): Promise<Group[]> => {
  return await db.groups.where("moduleId").equals(moduleId).toArray();
};
