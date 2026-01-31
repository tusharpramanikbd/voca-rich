import type { Module } from "../../db/vocarichDb";
import BaseList from "../Common/BaseList";
import EmptyState from "../Common/EmptyState";
import ModuleItem from "./ModuleItem";

type TModuleList = {
  modules: Module[];
  setEditingWord: React.Dispatch<React.SetStateAction<Module | null>>;
  setIsEditSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAskDelete: (id: string) => void;
};

const ModuleList = ({
  modules,
  setEditingWord,
  setIsEditSheetOpen,
  onAskDelete,
}: TModuleList) => {
  return (
    <BaseList
      items={modules}
      renderEmpty={<EmptyState emptyType="module" />}
      renderItem={(module) => (
        <ModuleItem
          key={module.id}
          module={module}
          setEditingWord={setEditingWord}
          setIsEditSheetOpen={setIsEditSheetOpen}
          onAskDelete={onAskDelete}
        />
      )}
    />
  );
};

export default ModuleList;
