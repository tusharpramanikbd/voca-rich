import { useLiveQuery } from "dexie-react-hooks";
import type { Module } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import ModuleItem from "./ModuleItem";
import { getWordCountsByModule } from "../../db/crudModules";

type TModuleList = {
  modules: Module[] | undefined;
};

const ModuleList = ({ modules }: TModuleList) => {
  const wordCounts = useLiveQuery(() => getWordCountsByModule(), []) ?? {};

  return (
    <BaseList
      items={modules}
      renderEmpty={<EmptyState emptyType="module" />}
      renderItem={(module) => (
        <ModuleItem module={module} wordCount={wordCounts[module.id] ?? 0} />
      )}
      bottomPadding={32}
    />
  );
};

export default ModuleList;
