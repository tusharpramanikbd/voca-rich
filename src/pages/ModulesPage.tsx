import useModules from "../hooks/useModules.js";
import Header from "../components/Header.js";
import AddModule from "../components/AddModule.js";
import ModuleList from "../components/ModuleList.js";
import BottomTabBar from "../components/BottomTabBar.js";

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
      <Header title="Modules" unit="modules" items={modules} />

      <AddModule
        newModuleName={newModuleName}
        setNewModuleName={setNewModuleName}
        handleCreateModule={handleCreateModule}
      />

      <ModuleList modules={modules} handleDeleteModule={handleDeleteModule} />

      <BottomTabBar />
    </div>
  );
};

export default ModulesPage;
