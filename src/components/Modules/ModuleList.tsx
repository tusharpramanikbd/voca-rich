import type { Module } from "../../db/vocarichDb";
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
    <div className="px-6 space-y-4 pb-24">
      {(modules ?? []).map((module) => (
        <ModuleItem
          key={module?.id}
          module={module}
          setEditingWord={setEditingWord}
          setIsEditSheetOpen={setIsEditSheetOpen}
          onAskDelete={onAskDelete}
        />
      ))}

      {modules && modules.length === 0 && <EmptyState emptyType="module" />}
    </div>
  );
};

export default ModuleList;
