import { createContext, useContext, useMemo, useState } from "react";
import type { Module } from "../db/vocarichDb";
import { renameModule, deleteModuleCascade } from "../db/crudModules";
import ModuleBottomSheet from "../components/Modules/ModuleBottomSheet";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet";
import ActionsBottomSheet from "../components/Common/BottomSheet/ActionsBottomSheet";

type ContextType = {
  openRenameModule: (module: Module) => void;
  openDeleteModule: (id: string) => void;
  openActions: (module: Module) => void;
};

const ModulesModalContext = createContext<ContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useModulesModal = () => {
  const ctx = useContext(ModulesModalContext);
  if (!ctx)
    throw new Error("useModulesModal must be used inside ModulesModalProvider");
  return ctx;
};

export const ModulesModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionModule, setActionModule] = useState<Module | null>(null);

  // ---------- openers ----------

  const openRenameModule = (module: Module) => {
    setEditingModule(module);
  };

  const openDeleteModule = (id: string) => {
    setDeleteId(id);
  };

  const openActions = (module: Module) => {
    setActionModule(module);
  };

  // ---------- actions ----------

  const handleRename = async (title: string) => {
    if (!editingModule) return;
    await renameModule(editingModule.id, title);
    setEditingModule(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteModuleCascade(deleteId);
    setDeleteId(null);
  };

  const value = useMemo(
    () => ({
      openRenameModule,
      openDeleteModule,
      openActions,
    }),
    [],
  );

  return (
    <ModulesModalContext.Provider value={value}>
      {children}

      {/* RENAME */}
      <ModuleBottomSheet
        isOpen={!!editingModule}
        onClose={() => setEditingModule(null)}
        onSave={handleRename}
        initialWord={editingModule?.name ?? ""}
      />

      {/* DELETE */}
      <ConfirmBottomSheet
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete this module?"
        message="This will permanently remove the module."
        confirmLabel="Delete"
      />

      {/* ACTIONS */}
      <ActionsBottomSheet
        isOpen={!!actionModule}
        onClose={() => setActionModule(null)}
        onEdit={() => {
          if (!actionModule) return;
          setEditingModule(actionModule);
          setActionModule(null);
        }}
        onDelete={() => {
          if (!actionModule) return;
          setDeleteId(actionModule.id);
          setActionModule(null);
        }}
      />
    </ModulesModalContext.Provider>
  );
};
