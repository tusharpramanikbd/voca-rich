import { useParams } from "react-router";
import Header from "../components/Common/Header";

const ChallengePage = () => {
  const { module } = useParams();

  const moduleName = module ? module.split("+")[1] : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-linear-to-b from-teal-50 to-white">
      <Header title={"Challenge: " + moduleName} canGoBack={true} />
    </div>
  );
};

export default ChallengePage;
