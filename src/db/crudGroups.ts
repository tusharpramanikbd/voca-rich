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

export const listGroupsByModule = async (
  moduleId: string,
): Promise<Group[]> => {
  return await db.groups.where("moduleId").equals(moduleId).toArray();
};
