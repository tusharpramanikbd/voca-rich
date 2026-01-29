import useModules from "../hooks/useModules.js";
import Header from "../components/Common/Header.js";
import AddModule from "../components/Modules/AddModule.js";
import ModuleList from "../components/Modules/ModuleList.js";
import ConfirmBottomSheet from "../components/Common/ConfirmBottomSheet.js";

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
  } = useModules();

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-white">
      <Header title="Modules" unit="modules" itemCount={modules?.length ?? 0} />

      <AddModule
        newModuleName={newModuleName}
        setNewModuleName={setNewModuleName}
        handleCreateModule={handleCreateModule}
      />

      <ModuleList modules={modules} onAskDelete={requestDelete} />

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
