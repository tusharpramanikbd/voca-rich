import type { Module } from "../../db/vocarichDb";
import EmptyState from "../Common/EmptyState";
import ModuleItem from "./ModuleItem";

type TModuleList = {
  modules: Module[];
  onAskDelete: (id: string) => void;
};

const ModuleList = ({ modules, onAskDelete }: TModuleList) => {
  return (
    <div className="px-6 space-y-4 pb-24">
      {(modules ?? []).map((module) => (
        <ModuleItem
          key={module?.id}
          module={module}
          onAskDelete={onAskDelete}
        />
      ))}

      {modules && modules.length === 0 && <EmptyState emptyType="module" />}
    </div>
  );
};

export default ModuleList;
