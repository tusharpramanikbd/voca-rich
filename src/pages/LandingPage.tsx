const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-teal-500 to-blue-600 text-white p-8">
      <h1 className="text-5xl font-bold mb-6 text-center">VocaRich</h1>
      <p className="text-xl mb-8 max-w-md text-center">
        Your offline vocabulary notebook with daily practice
      </p>
      <div className="space-x-4">
        <a
          href="/app"
          className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          Open on Mobile
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
