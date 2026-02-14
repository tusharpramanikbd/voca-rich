import useModules from "../hooks/useModules.js";
import Header from "../components/Common/Header.js";
import AddModule from "../components/Modules/AddModule.js";
import ModuleList from "../components/Modules/ModuleList.js";

const ModulesPage = () => {
  const { newModuleName, setNewModuleName, modules, handleCreateModule } =
    useModules();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-linear-to-b from-teal-50 to-white">
      <div className="flex-0">
        <Header
          title="Language Modules"
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

      <ModuleList modules={modules} />
    </div>
  );
};

export default ModulesPage;
