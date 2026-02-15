import { useNavigate, useParams } from "react-router";
import useWords from "../../hooks/useWords";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

const ChallengeFAB = () => {
  const navigate = useNavigate();
  const { module } = useParams();
  const { wordCount } = useWords();

  const canStart = wordCount >= 4;

  const handleClick = () => {
    if (!canStart || !module) return;
    navigate(`/app/m/${module}/challenge`);
  };

  return (
    <div className="fixed bottom-26 right-6 z-40">
      <button
        onClick={handleClick}
        disabled={!canStart}
        className="w-16 h-16 bg-linear-to-r from-teal-500 to-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center text-2xl disabled:opacity-50"
      >
        <AcademicCapIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChallengeFAB;
