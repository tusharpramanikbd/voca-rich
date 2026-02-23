import Header from "../components/Common/Header";
import useWords from "../hooks/useWords";
import { useChallengeWords } from "../hooks/useChallengeWords";
import { useChallengeEngine } from "../hooks/useChallengeEngine";
// import { useChallengeOptions } from "../hooks/useChallengeOptions";
import ChallengeQuestionCard from "../components/Challenges/ChallengeQuestionCard";
import ChallengeResult from "../components/Challenges/ChallengeResult";
import LeaveChallengeSheet from "../components/Challenges/LeaveChallengeSheet";
import { useState } from "react";
import { useNavigate } from "react-router";

const ChallengePage = () => {
  const navigate = useNavigate();

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const { module, moduleId, moduleName } = useWords();
  const { challengeQuestions, loading } = useChallengeWords(moduleId);
  const {
    currentIndex,
    currentQuestion,
    selectedOption,
    showResult,
    isCorrect,
    isFinished,
    score,
    selectOption,
    submitAnswer,
    nextQuestion,
  } = useChallengeEngine(challengeQuestions);
  // const options = useChallengeOptions(currentQuestion, challengeQuestions);

  const handleGoBack = () => {
    // if challenge already finished
    if (isFinished) {
      navigate(-1);
      return;
    }

    // otherwise ask confirmation
    setShowExitConfirm(true);
  };

  if (!currentQuestion) return null;
  if (!module) return <div>Invalid module</div>;

  if (isFinished) {
    return (
      <ChallengeResult score={score} totalWords={challengeQuestions.length} />
    );
  }

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <Header
        title={`${moduleName} Challenge`}
        canGoBack={true}
        onGoBack={handleGoBack}
      />

      {loading || !currentQuestion ? (
        <div className="flex-1 overflow-y-auto flex items-center justify-center text-gray-500 text-lg px-6">
          Preparing your challenge...
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ChallengeQuestionCard
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            showResult={showResult}
            isCorrect={isCorrect}
            currentIndex={currentIndex}
            total={challengeQuestions.length}
            onSelect={selectOption}
            onSubmit={submitAnswer}
            onNext={nextQuestion}
          />
        </div>
      )}

      <LeaveChallengeSheet
        isOpen={showExitConfirm}
        onContinue={() => setShowExitConfirm(false)}
        onLeave={() => navigate(-1)}
      />
    </div>
  );
};

export default ChallengePage;
