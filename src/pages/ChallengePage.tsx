import Header from "../components/Common/Header";
import useWords from "../hooks/useWords";
import { useEffect, useEffectEvent, useState } from "react";
import { listWordsByModule } from "../db/crudWords";
import type { Word } from "../db/vocarichDb";
import { useNavigate } from "react-router";

const generateOptions = (word: Word, allWords: Word[]) => {
  // correct answer
  const correctMeaning = word.meaning;

  // get other words except current
  const otherWords = allWords.filter((w) => w.id !== word.id);

  // shuffle other words
  const shuffled = [...otherWords].sort(() => Math.random() - 0.5);

  // pick first 3 wrong meanings
  const wrongMeanings = shuffled.slice(0, 3).map((w) => w.meaning);

  // combine + shuffle final options
  const allOptions = [correctMeaning, ...wrongMeanings].sort(
    () => Math.random() - 0.5,
  );

  return allOptions;
};

const ChallengePage = () => {
  const { module, moduleId, moduleName } = useWords();
  const navigate = useNavigate();

  const [challengeWords, setChallengeWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const [score, setScore] = useState(0);

  const currentWord = challengeWords[currentIndex];

  const setOptionsEvent = useEffectEvent((newOptions: string[]) => {
    setOptions(newOptions);
  });

  useEffect(() => {
    if (!moduleId) return;

    const load = async () => {
      const allWords = await listWordsByModule(moduleId);

      // safety (should never happen because button disabled)
      if (allWords.length < 4) {
        navigate(-1);
        return;
      }

      // shuffle
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);

      // challenge size
      const limit = Math.min(10, shuffled.length);

      setChallengeWords(shuffled.slice(0, limit));
      setLoading(false);
    };

    load();
  }, [moduleId, navigate]);

  useEffect(() => {
    if (!currentWord || !challengeWords.length) return;

    const newOptions = generateOptions(currentWord, challengeWords);
    setOptionsEvent(newOptions);
  }, [currentWord, challengeWords]);

  const setClearForNextQuestion = useEffectEvent(() => {
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(null);
  });

  useEffect(() => {
    setClearForNextQuestion();
  }, [currentIndex]);

  if (!currentWord) return null;
  if (!module) return <div>Invalid module</div>;

  if (isFinished) {
    const total = challengeWords.length;
    const percentage = Math.round((score / total) * 100);

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
              {score} / {total}
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
  }

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-teal-50 to-white">
      <Header title={`${moduleName} Challenge`} canGoBack={true} />

      {loading || !currentWord ? (
        <div className="flex-1 overflow-y-auto flex items-center justify-center text-gray-500 text-lg px-6">
          Preparing your challenge...
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-md mx-auto flex flex-col text-center gap-8">
            {/* progress */}
            <div className="text-gray-500">
              {currentIndex + 1} / {challengeWords.length}
            </div>

            {/* question word */}
            <div className="text-4xl font-bold text-gray-800 wrap-break-words">
              {currentWord.word}
            </div>

            {/* options */}
            <div className="w-full flex flex-col gap-3">
              {options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (showResult) return;
                    setSelectedOption(opt);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-2xl border shadow-sm transition
                  ${
                    showResult
                      ? opt === currentWord.meaning
                        ? "bg-green-100 border-green-500"
                        : opt === selectedOption
                          ? "bg-red-100 border-red-500"
                          : "bg-white"
                      : selectedOption === opt
                        ? "border-teal-500 bg-teal-50"
                        : "bg-white hover:bg-gray-50"
                  }
                `}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* submit */}
            <button
              disabled={!selectedOption || showResult}
              onClick={() => {
                const correct = selectedOption === currentWord.meaning;

                setIsCorrect(correct);
                setShowResult(true);

                if (correct) {
                  setScore((s) => s + 1);
                }
              }}
              className="mt-2 w-full py-4 rounded-2xl bg-teal-600 text-white font-semibold disabled:opacity-40"
            >
              Submit
            </button>

            {/* result message */}
            {showResult && (
              <div
                className={`text-lg font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Correct!" : "Wrong!"}

                {!isCorrect && (
                  <div className="text-gray-700 font-normal mt-2">
                    Correct answer:{" "}
                    <span className="font-semibold">{currentWord.meaning}</span>
                  </div>
                )}
              </div>
            )}

            {/* next button */}
            {showResult && (
              <button
                onClick={() => {
                  const isLast = currentIndex === challengeWords.length - 1;

                  if (isLast) {
                    setIsFinished(true);
                    return;
                  }

                  setCurrentIndex((i) => i + 1);
                }}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold"
              >
                {currentIndex === challengeWords.length - 1 ? "Done" : "Next"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
