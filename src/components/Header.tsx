import type { Module } from "../db/vocarichDb";

type THeader = {
  title: string;
  unit: string;
  items: Module[];
};

const Header = ({ title, unit, items }: THeader) => {
  return (
    <div className="bg-linear-to-r from-teal-500 to-blue-600 px-6 pt-12 pb-6 rounded-b-3xl mx-4 shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-teal-100 text-lg">
        {(items ?? []).length} {unit}
      </p>
    </div>
  );
};

export default Header;
