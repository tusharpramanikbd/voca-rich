import { useEffect, useEffectEvent, useState } from "react";
import type { Word } from "../db/vocarichDb";

export const useChallengeEngine = (challengeWords: Word[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentWord = challengeWords[currentIndex];

  const setClearForNextQuestion = useEffectEvent(() => {
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(null);
  });

  // reset when next question loads
  useEffect(() => {
    setClearForNextQuestion();
  }, [currentIndex]);

  const selectOption = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (!currentWord || !selectedOption || showResult) return;

    const correct = selectedOption === currentWord.meaning;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    const isLast = currentIndex === challengeWords.length - 1;

    if (isLast) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((i) => i + 1);
  };

  return {
    // state
    currentIndex,
    currentWord,
    selectedOption,
    showResult,
    isCorrect,
    isFinished,
    score,

    // actions
    selectOption,
    submitAnswer,
    nextQuestion,
  };
};
