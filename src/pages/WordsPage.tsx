import { useParams } from "react-router";

const WordsPage = () => {
  const { moduleId } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Words (Module: {moduleId})</h1>
      <p>Words page coming soon...</p>
    </div>
  );
};

export default WordsPage;
