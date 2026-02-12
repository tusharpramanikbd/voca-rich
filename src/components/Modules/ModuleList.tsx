import { useLiveQuery } from "dexie-react-hooks";
import type { Module } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import ModuleItem from "./ModuleItem";
import { getWordCountsByModule } from "../../db/crudModules";

type TModuleList = {
  modules: Module[] | undefined;
  setEditingModule: React.Dispatch<React.SetStateAction<Module | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAskDelete: (id: string) => void;
};

const ModuleList = ({
  modules,
  setEditingModule,
  setIsEditSheetOpen,
  onAskDelete,
}: TModuleList) => {
  const wordCounts = useLiveQuery(() => getWordCountsByModule(), []) ?? {};
  return (
    <BaseList
      items={modules}
      renderEmpty={<EmptyState emptyType="module" />}
      renderItem={(module) => (
        <ModuleItem
          key={module.id}
          module={module}
          setEditingModule={setEditingModule}
          setIsEditSheetOpen={setIsEditSheetOpen}
          onAskDelete={onAskDelete}
          wordCount={wordCounts[module.id] ?? 0}
        />
      )}
    />
  );
};

export default ModuleList;
