import useModules from "../hooks/useModules.js";
import Header from "../components/Common/Header.js";
import AddModule from "../components/Modules/AddModule.js";
import ModuleList from "../components/Modules/ModuleList.js";
import ConfirmBottomSheet from "../components/Common/BottomSheet/ConfirmBottomSheet.js";
import ModuleBottomSheet from "../components/Modules/ModuleBottomSheet.js";

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
    setEditingWord,
    setIsEditSheetOpen,
    isEditSheetOpen,
    editingWord,
    handleRenameModule,
  } = useModules();

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <div className="flex-0">
        <Header
          title="Modules"
          unit={modules?.length > 1 ? "modules" : "module"}
          itemCount={modules?.length ?? 0}
          classes="pt-12"
        />

        <AddModule
          newModuleName={newModuleName}
          setNewModuleName={setNewModuleName}
          handleCreateModule={handleCreateModule}
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-16">
        <ModuleList
          modules={modules}
          setEditingWord={setEditingWord}
          setIsEditSheetOpen={setIsEditSheetOpen}
          onAskDelete={requestDelete}
        />
      </div>

      {/* Edit Bottom Sheet */}
      <ModuleBottomSheet
        isOpen={isEditSheetOpen}
        onClose={() => {
          setIsEditSheetOpen(false);
        }}
        onSave={handleRenameModule}
        initialWord={editingWord?.name || ""}
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
