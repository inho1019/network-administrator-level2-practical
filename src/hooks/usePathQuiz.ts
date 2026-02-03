import { useState, useEffect } from "react";

/**
 * 윈도우 설정 경로 퀴즈를 위한 커스텀 훅
 * 경로 섞기 및 사용자 선택 경로 관리
 */
export function usePathQuiz(accessPath: string[] | undefined) {
  const [userPath, setUserPath] = useState<string[]>([]);
  const [availableSteps, setAvailableSteps] = useState<string[]>([]);

  // 문제가 바뀔 때마다 경로 섞기
  useEffect(() => {
    if (!accessPath) return;
    const shuffled = [...accessPath].sort(() => Math.random() - 0.5);
    setAvailableSteps(shuffled);
    setUserPath([]);
  }, [accessPath]);

  const selectStep = (step: string) => {
    setUserPath([...userPath, step]);
    setAvailableSteps(availableSteps.filter((s) => s !== step));
  };

  const removeStep = (index: number) => {
    const removedStep = userPath[index];
    setUserPath(userPath.filter((_, i) => i !== index));
    setAvailableSteps([...availableSteps, removedStep]);
  };

  const resetPath = () => {
    if (accessPath) {
      const shuffled = [...accessPath].sort(() => Math.random() - 0.5);
      setAvailableSteps(shuffled);
      setUserPath([]);
    }
  };

  return {
    userPath,
    availableSteps,
    selectStep,
    removeStep,
    resetPath,
  };
}
