import { Link } from "react-router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type THeader = {
  title: string;
  unit: string;
  itemCount: number;
  canGoBack?: boolean;
  classes?: string;
};

const Header = ({ title, unit, itemCount, canGoBack, classes }: THeader) => {
  return (
    <div
      className={`bg-linear-to-r from-teal-500 to-blue-600 px-6 pt-6 pb-6 rounded-3xl mx-4 mt-1 shadow-2xl flex flex-col items-start gap-6 ${classes || ""}`}
    >
      {canGoBack && (
        <Link to="/app" className="inline-flex items-center text-white/90">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
      )}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-teal-100 text-lg">
          {itemCount} {unit}
        </p>
      </div>
    </div>
  );
};

export default Header;
