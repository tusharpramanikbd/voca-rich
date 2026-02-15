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

  if (!module) return <div>Invalid module</div>;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-linear-to-b from-teal-50 to-white">
      <Header title={`${moduleName} Challenge`} canGoBack={true} />

      {loading || !currentWord ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
          Preparing your challenge...
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">
          {/* progress */}
          <div className="text-sm text-gray-500">
            {currentIndex + 1} / {challengeWords.length}
          </div>

          {/* question word */}
          <div className="text-4xl font-bold text-gray-800 wrap-break-word">
            {currentWord.word}
          </div>

          <div className="w-full max-w-md flex flex-col gap-3">
            {options.map((opt, index) => (
              <button
                key={index}
                className="w-full text-left px-5 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-teal-50 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
