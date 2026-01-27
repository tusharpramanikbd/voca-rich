import { Link } from "react-router";

type THeader = {
  title: string;
  unit: string;
  itemCount: number;
  canGoBack?: boolean;
};

const Header = ({ title, unit, itemCount, canGoBack }: THeader) => {
  return (
    <div className="bg-linear-to-r from-teal-500 to-blue-600 px-6 pt-12 pb-6 rounded-b-3xl mx-4 shadow-2xl">
      {canGoBack && (
        <Link
          to="/app"
          className="inline-flex items-center text-white/90 hover:text-white mb-2"
        >
          ← Back to Modules
        </Link>
      )}
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-teal-100 text-lg">
        {itemCount} {unit}
      </p>
    </div>
  );
};

export default Header;
