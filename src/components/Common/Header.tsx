import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import VisibilitySelector, { type VisibilityMode } from "./VisibilitySelector";

type THeader = {
  title: string;
  unit?: string;
  itemCount?: number;
  canGoBack?: boolean;
  classes?: string;
  onGoBack?: () => void;
  showVisibilitySelector?: boolean;
  visibilityMode?: VisibilityMode;
  onChangeVisibilityMode?: (mode: VisibilityMode) => void;
};

const Header = ({
  title,
  unit,
  itemCount,
  canGoBack,
  classes,
  onGoBack,
  showVisibilitySelector,
  visibilityMode = "BOTH",
  onChangeVisibilityMode,
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
      className={`bg-linear-to-r from-teal-500 to-blue-600 p-4 rounded-3xl mx-4 mt-1 shadow-2xl flex flex-col items-start gap-4 ${classes || ""}`}
    >
      <div className="flex items-center justify-center gap-4">
        {canGoBack && (
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-white/90"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>

      <div className="flex w-full items-center justify-between">
        {unit && itemCount !== undefined && (
          <p className="text-teal-100 text-lg">
            {itemCount} {unit}
          </p>
        )}

        {showVisibilitySelector && (
          <VisibilitySelector
            value={visibilityMode}
            onChange={(mode) => onChangeVisibilityMode?.(mode)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
