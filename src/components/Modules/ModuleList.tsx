import type { Module } from "../../db/vocarichDb";
import EmptyState from "../Common/EmptyState";
import ModuleItem from "./ModuleItem";

type TModuleList = {
  modules: Module[];
  handleDeleteModule: (moduleId: string) => void;
};

const ModuleList = ({ modules, handleDeleteModule }: TModuleList) => {
  return (
    <div className="px-6 space-y-4 pb-24">
      {(modules ?? []).map((module) => (
        <ModuleItem
          key={module?.id}
          module={module}
          handleDeleteModule={handleDeleteModule}
        />
      ))}

      {modules && modules.length === 0 && <EmptyState emptyType="module" />}
    </div>
  );
};

export default ModuleList;
