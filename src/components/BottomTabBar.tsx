import { Link } from "react-router";

const BottomTabBar = () => {
  return (
    <div className="fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-2 flex justify-around">
      <Link
        to="/app"
        className="flex flex-col items-center p-3 rounded-2xl bg-teal-500/20 text-teal-600"
      >
        <div className="text-xl mb-1">📚</div>
        <span className="text-xs font-semibold">Modules</span>
      </Link>
      <Link
        to="/app/challenge"
        className="flex flex-col items-center p-3 rounded-2xl text-gray-600 hover:text-teal-600"
      >
        <div className="text-xl mb-1">⚡</div>
        <span className="text-xs">Challenge</span>
      </Link>
      <Link
        to="/app/settings"
        className="flex flex-col items-center p-3 rounded-2xl text-gray-600 hover:text-teal-600"
      >
        <div className="text-xl mb-1">⚙️</div>
        <span className="text-xs">Settings</span>
      </Link>
    </div>
  );
};

export default BottomTabBar;
