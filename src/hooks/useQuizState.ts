import { useState } from "react";

/**
 * 퀴즈 상태 관리를 위한 커스텀 훅
 * 메뉴 표시, 문제 선택, 진행 상태 등을 관리합니다.
 */
export function useQuizState<T>(allProblems: T[]) {
  const [showMenu, setShowMenu] = useState(true);
  const [selectedProblems, setSelectedProblems] = useState<T[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startQuiz = (mode: "all" | "random", randomCount: number = 5) => {
    if (mode === "all") {
      setSelectedProblems(allProblems);
    } else {
      const shuffled = [...allProblems].sort(() => Math.random() - 0.5);
      setSelectedProblems(shuffled.slice(0, randomCount));
    }
    setShowMenu(false);
    setCurrentProblemIndex(0);
    setShowResult(false);
    setIsCorrect(false);
  };

  const resetQuiz = () => {
    setShowMenu(true);
    setSelectedProblems([]);
    setCurrentProblemIndex(0);
    setShowResult(false);
    setIsCorrect(false);
  };

  const goToNextProblem = () => {
    if (currentProblemIndex < selectedProblems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const currentProblem = selectedProblems[currentProblemIndex];

  return {
    showMenu,
    setShowMenu,
    selectedProblems,
    currentProblem,
    currentProblemIndex,
    showResult,
    setShowResult,
    isCorrect,
    setIsCorrect,
    startQuiz,
    resetQuiz,
    goToNextProblem,
  };
}
