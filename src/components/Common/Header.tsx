import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type THeader = {
  title: string;
  unit?: string;
  itemCount?: number;
  canGoBack?: boolean;
  classes?: string;
  onGoBack?: () => void;
};

const Header = ({
  title,
  unit,
  itemCount,
  canGoBack,
  classes,
  onGoBack,
}: THeader) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }
    navigate(-1);
  };

  return (
    <div
      className={`bg-linear-to-r from-teal-500 to-blue-600 px-6 pt-6 pb-6 rounded-3xl mx-4 mt-1 shadow-2xl flex flex-col items-start gap-6 ${classes || ""}`}
    >
      {canGoBack && (
        <button
          onClick={handleGoBack}
          className="inline-flex items-center text-white/90"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        {unit && itemCount !== undefined && (
          <p className="text-teal-100 text-lg">
            {itemCount} {unit}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
