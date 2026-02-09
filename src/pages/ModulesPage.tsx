import useModules from "../hooks/useModules.js";
import Header from "../components/Common/Header.js";
import AddModule from "../components/Modules/AddModule.js";
import ModuleList from "../components/Modules/ModuleList.js";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet.js";
import ModuleBottomSheet from "../components/Modules/ModuleBottomSheet.js";
import useIsPWA from "../hooks/useIsPWA.js";

const ModulesPage = () => {
  const {
    newModuleName,
    setNewModuleName,
    modules,
    handleCreateModule,
    requestDelete,
    confirmDelete,
    isDeleteSheetOpen,
    setIsDeleteSheetOpen,
    setDeleteId,
    setEditingModule,
    setIsEditSheetOpen,
    isEditSheetOpen,
    editingModule,
    handleRenameModule,
  } = useModules();

  const isPWA = useIsPWA();

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <p className="text-center text-sm text-gray-300 mb-4">
        PWA Status: {isPWA ? "Yes" : "No"}
      </p>
      <p className="text-center text-sm text-gray-300 mb-4">
        Testing Version: 2
      </p>
      <div className="flex-0">
        <Header
          title="Modules"
          unit={modules && modules?.length > 1 ? "modules" : "module"}
          itemCount={modules?.length ?? 0}
          classes="pt-12"
        />

        <AddModule
          newModuleName={newModuleName}
          setNewModuleName={setNewModuleName}
          handleCreateModule={handleCreateModule}
        />
      </div>

      <ModuleList
        modules={modules}
        setEditingModule={setEditingModule}
        setIsEditSheetOpen={setIsEditSheetOpen}
        onAskDelete={requestDelete}
      />

      {/* Edit Bottom Sheet */}
      <ModuleBottomSheet
        isOpen={isEditSheetOpen}
        onClose={() => {
          setIsEditSheetOpen(false);
        }}
        onSave={handleRenameModule}
        initialWord={editingModule?.name || ""}
      />

      {/* Delete Confirmation Bottom Sheet */}
      <ConfirmBottomSheet
        isOpen={isDeleteSheetOpen}
        onCancel={() => {
          setIsDeleteSheetOpen(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete this module?"
        message="This will permanently remove the module."
        confirmLabel="Delete"
      />
    </div>
  );
};

export default ModulesPage;
