import { useState } from "react";

/**
 * 라우터 터미널 인터페이스를 위한 커스텀 훅
 * 명령어 입력, 히스토리 관리 등
 */
export function useRouterTerminal() {
  const [userCommands, setUserCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const addCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (trimmedCommand) {
      setUserCommands([...userCommands, trimmedCommand]);
      setCommandHistory([...commandHistory, trimmedCommand]);
      setCurrentCommand("");
    }
  };

  const removeCommand = (index: number) => {
    setUserCommands(userCommands.filter((_, i) => i !== index));
  };

  const clearCommands = () => {
    setUserCommands([]);
    setCurrentCommand("");
  };

  const resetTerminal = () => {
    setUserCommands([]);
    setCurrentCommand("");
    setCommandHistory([]);
  };

  return {
    userCommands,
    currentCommand,
    setCurrentCommand,
    commandHistory,
    addCommand,
    removeCommand,
    clearCommands,
    resetTerminal,
  };
}
