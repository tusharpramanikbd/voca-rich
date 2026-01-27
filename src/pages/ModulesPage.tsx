import useModules from "../hooks/useModules.js";
import Header from "../components/Common/Header.js";
import AddModule from "../components/Modules/AddModule.js";
import ModuleList from "../components/Modules/ModuleList.js";

const ModulesPage = () => {
  const {
    newModuleName,
    setNewModuleName,
    modules,
    handleCreateModule,
    handleDeleteModule,
  } = useModules();

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-white">
      <Header title="Modules" unit="modules" itemCount={modules?.length ?? 0} />

      <AddModule
        newModuleName={newModuleName}
        setNewModuleName={setNewModuleName}
        handleCreateModule={handleCreateModule}
      />

      <ModuleList modules={modules} handleDeleteModule={handleDeleteModule} />
    </div>
  );
};

export default ModulesPage;
