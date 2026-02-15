import { useNavigate } from "react-router";

type TChallengeResult = {
  score: number;
  totalWords: number;
};

const ChallengeResult = ({ score, totalWords }: TChallengeResult) => {
  const navigate = useNavigate();

  const percentage = Math.round((score / totalWords) * 100);

  let message = "Good effort!";
  if (percentage === 100) message = "Perfect!! 🔥";
  else if (percentage >= 80) message = "Excellent!";
  else if (percentage >= 60) message = "Nice work!";
  else if (percentage >= 40) message = "Keep practicing!";
  else message = "You need more review 🙂";

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-6 text-center">
        <div className="max-w-md w-full">
          <div className="text-5xl font-bold text-teal-600 mb-4">
            {score} / {totalWords}
          </div>

          <div className="text-xl text-gray-700 mb-2">{percentage}%</div>

          <div className="text-lg text-gray-600 mb-8">{message}</div>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-2xl bg-teal-600 text-white font-semibold shadow-lg"
          >
            Back to Words
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeResult;
