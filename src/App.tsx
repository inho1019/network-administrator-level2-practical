import { useState } from "react";
import "./App.css";
import type {
  Question,
  PageType,
  WindowsSettingsProblem,
  RouterProblem,
  CableProblem,
  AllAnswerTypes,
  NetworkAnswers,
  DHCPAnswers,
  FTPAnswers,
  DNSAnswers,
  SecurityAnswers,
  WebsiteAnswers,
  UserAnswers,
  ServiceAnswers,
} from "./types";
import {
  windowsProblems,
  routerProblems,
  cableProblems,
  allQuestions,
  CABLE_COLORS,
} from "./data";
import {
  checkWindowsAnswers,
  checkRouterCommands,
  checkShortAnswer,
  getRandomQuestions,
} from "./utils";
import {
  useQuizState,
  usePathQuiz,
  useRouterTerminal,
  useCableWiring,
} from "./hooks";
import {
  NetworkSettingsGUI,
  DHCPSettingsGUI,
  FTPSettingsGUI,
  DNSSettingsGUI,
  SecuritySettingsGUI,
  WebsiteSettingsGUI,
  UserSettingsGUI,
  ServiceSettingsGUI,
} from "./components/windows";

// 윈도우 설정 퀴즈 컴포넌트
function WindowsSettingsQuiz({ onBack }: { onBack: () => void }) {
  const {
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
    goToNextProblem,
  } = useQuizState<WindowsSettingsProblem>(windowsProblems);

  const { userPath, availableSteps, selectStep, removeStep } = usePathQuiz(
    currentProblem?.accessPath,
  );

  const [userInputs, setUserInputs] = useState<Partial<AllAnswerTypes>>({});

  const handleSubmit = () => {
    const correct = checkWindowsAnswers(currentProblem, userInputs, userPath);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    setUserInputs({});
    goToNextProblem();
  };

  // 메뉴 화면
  if (showMenu) {
    return (
      <div className="container">
        <div className="start-page">
          <h1 className="title">🪟 윈도우 설정 문제</h1>
          <p className="subtitle">네트워크, DHCP, DNS, 서비스 관리 등</p>

          <div className="mode-selection">
            <button
              className="mode-button all"
              onClick={() => startQuiz("all")}
            >
              <div className="mode-icon">📝</div>
              <h3>전체 문제 풀기</h3>
              <p>{windowsProblems.length}문제</p>
            </button>

            <button
              className="mode-button random"
              onClick={() => startQuiz("random")}
            >
              <div className="mode-icon">🎲</div>
              <h3>랜덤 5문제 풀기</h3>
              <p>5문제</p>
            </button>
          </div>

          <div className="info-box">
            <p>💡 실제 윈도우 서버 설정과 유사한 GUI로 연습하세요</p>
            <p>💡 접근 경로를 올바르게 정렬해야 합니다</p>
          </div>

          <button className="back-button" onClick={onBack}>
            ← 뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  // 문제가 없으면 로딩 표시
  if (!currentProblem) {
    return (
      <div className="container">
        <div className="start-page">
          <h1 className="title">로딩 중...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="windows-settings-page">
        <div className="windows-header">
          <button
            className="back-button-small"
            onClick={() => setShowMenu(true)}
          >
            ← 뒤로
          </button>
          <h1 className="windows-title">🪟 윈도우 설정 문제</h1>
          <div className="problem-counter">
            {currentProblemIndex + 1} / {selectedProblems.length}
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentProblemIndex + 1) / selectedProblems.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="windows-problem-card">
          <h2 className="problem-title">{currentProblem.title}</h2>

          {/* 접근 경로 드래그 앤 드롭 */}
          {!showResult && (
            <div className="access-path-quiz">
              <div className="access-path-label">
                📍 설정 화면 접근 경로를 순서대로 정렬하세요
              </div>

              {/* 사용자가 정렬한 경로 */}
              <div className="path-drop-zone">
                <div className="drop-zone-label">
                  여기에 순서대로 클릭하세요
                </div>
                <div className="user-path-container">
                  {userPath.map((step, index) => (
                    <div
                      key={`user-${index}`}
                      className="path-item placed"
                      onClick={() => removeStep(index)}
                    >
                      <span className="path-number">{index + 1}</span>
                      {step}
                      {index < userPath.length - 1 && (
                        <span className="path-arrow">→</span>
                      )}
                    </div>
                  ))}
                  {userPath.length === 0 && (
                    <div className="empty-placeholder">
                      경로 단계를 선택해주세요
                    </div>
                  )}
                </div>
              </div>

              {/* 선택 가능한 경로 단계 */}
              <div className="path-options">
                <div className="options-label">선택 가능한 단계</div>
                <div className="options-container">
                  {availableSteps.map((step, index) => (
                    <div
                      key={`option-${index}`}
                      className="path-item option"
                      onClick={() => selectStep(step)}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 결과 표시 시 정답 경로 보여주기 */}
          {showResult && (
            <div className="access-path-result">
              <div className="access-path-label">
                {isCorrect ? "✅ 올바른 접근 경로" : "❌ 정답 접근 경로"}
              </div>
              <div className="correct-path">
                {currentProblem.accessPath.map((step, index) => (
                  <span key={index} className="path-step">
                    {step}
                    {index < currentProblem.accessPath.length - 1 && (
                      <span className="path-arrow">→</span>
                    )}
                  </span>
                ))}
              </div>
              {!isCorrect && userPath.length > 0 && (
                <div className="user-wrong-path">
                  <div className="wrong-path-label">입력한 경로:</div>
                  <div className="wrong-path">
                    {userPath.map((step, index) => (
                      <span key={index} className="path-step wrong">
                        {step}
                        {index < userPath.length - 1 && (
                          <span className="path-arrow">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="problem-description">
            {currentProblem.description.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {currentProblem.type === "network" && (
            <NetworkSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as NetworkAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "dhcp" && (
            <DHCPSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as DHCPAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "ftp" && (
            <FTPSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as FTPAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "dns" && (
            <DNSSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as DNSAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "security" && (
            <SecuritySettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as SecurityAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "website" && (
            <WebsiteSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as WebsiteAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "user" && (
            <UserSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as UserAnswers}
              showResult={showResult}
            />
          )}

          {currentProblem.type === "service" && (
            <ServiceSettingsGUI
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              correctAnswers={currentProblem.correctAnswers as ServiceAnswers}
              showResult={showResult}
            />
          )}

          <div className="button-group">
            {!showResult ? (
              <button className="submit-button-windows" onClick={handleSubmit}>
                제출하기
              </button>
            ) : (
              <div className="result-feedback">
                {isCorrect ? (
                  <>
                    <div className="feedback-message correct">
                      ✅ 정답입니다!
                    </div>
                    {currentProblemIndex < selectedProblems.length - 1 && (
                      <button className="next-button" onClick={handleNext}>
                        다음 문제 →
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="feedback-message incorrect">
                      ❌ 오답입니다. 다시 확인해주세요.
                    </div>
                    <div className="correct-answers-box">
                      <h4>정답:</h4>
                      {Object.entries(currentProblem.correctAnswers).map(
                        ([key, value]) => (
                          <p key={key}>
                            <strong>{key}:</strong>{" "}
                            {Array.isArray(value)
                              ? value.join(", ")
                              : (value as string)}
                          </p>
                        ),
                      )}
                    </div>
                    <div className="button-row">
                      <button
                        className="retry-button"
                        onClick={() => setShowResult(false)}
                      >
                        다시 시도
                      </button>
                      {currentProblemIndex < windowsProblems.length - 1 && (
                        <button className="skip-button" onClick={handleNext}>
                          건너뛰기 →
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 라우터 설정 퀴즈 컴포넌트
function RouterSettingsQuiz({ onBack }: { onBack: () => void }) {
  const {
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
    goToNextProblem,
  } = useQuizState<RouterProblem>(routerProblems);

  const {
    userCommands,
    currentCommand,
    setCurrentCommand,
    addCommand,
    removeCommand,
    clearCommands,
    resetTerminal,
  } = useRouterTerminal();

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCommand(currentCommand);
  };

  const handleCheck = () => {
    // 현재 입력 중인 명령어가 있으면 추가
    let commandsToCheck = userCommands;
    if (currentCommand.trim()) {
      addCommand(currentCommand);
      commandsToCheck = [...userCommands, currentCommand.trim()];
    }

    const correct = checkRouterCommands(
      currentProblem.commands,
      commandsToCheck,
    );
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    resetTerminal();
    goToNextProblem();
  };

  const handleReset = () => {
    clearCommands();
    setShowResult(false);
  };

  const handleDeleteLastLine = () => {
    if (userCommands.length > 0) {
      removeCommand(userCommands.length - 1);
    }
  };

  // 메뉴 화면
  if (showMenu) {
    return (
      <div className="container">
        <div className="start-page">
          <h1 className="title">🔧 라우터 설정 문제</h1>
          <p className="subtitle">Cisco IOS 명령어 연습</p>

          <div className="mode-selection">
            <button
              className="mode-button all"
              onClick={() => startQuiz("all")}
            >
              <div className="mode-icon">📝</div>
              <h3>전체 문제 풀기</h3>
              <p>{routerProblems.length}문제</p>
            </button>

            <button
              className="mode-button random"
              onClick={() => startQuiz("random")}
            >
              <div className="mode-icon">🎲</div>
              <h3>랜덤 5문제 풀기</h3>
              <p>5문제</p>
            </button>
          </div>

          <div className="info-box">
            <p>💡 Cisco IOS 명령어를 순서대로 입력하세요</p>
            <p>💡 축약형 명령어도 인식됩니다</p>
          </div>

          <button className="back-button" onClick={onBack}>
            ← 뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="router-settings-page">
        <div className="router-header">
          <button
            className="back-button-small"
            onClick={() => setShowMenu(true)}
          >
            ← 뒤로
          </button>
          <h1 className="router-title">🔧 라우터 설정 문제</h1>
          <div className="problem-counter">
            {currentProblemIndex + 1} / {selectedProblems.length}
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentProblemIndex + 1) / selectedProblems.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="router-problem-card">
          <div className="problem-category">{currentProblem.category}</div>
          <h2 className="problem-title">문제 {currentProblemIndex + 1}</h2>
          <div className="problem-description">
            <p>{currentProblem.question}</p>
          </div>

          <div className="router-terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button red"></span>
                <span className="terminal-button yellow"></span>
                <span className="terminal-button green"></span>
              </div>
              <span className="terminal-title">Router CLI</span>
            </div>

            <div className="terminal-body">
              <div className="terminal-output">
                {userCommands.map((cmd, index) => (
                  <div key={index} className="terminal-line">
                    Router&gt; {cmd}
                  </div>
                ))}
              </div>

              {!showResult && (
                <form
                  onSubmit={handleCommandSubmit}
                  className="terminal-input-form"
                >
                  <span className="terminal-prompt">Router&gt; </span>
                  <input
                    type="text"
                    className="terminal-input"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    placeholder="명령어를 입력하세요..."
                    autoFocus
                  />
                </form>
              )}

              {userCommands.length > 0 && !showResult && (
                <div className="command-info">
                  <p>입력된 명령어: {userCommands.length}개</p>
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            {!showResult ? (
              <>
                <button
                  className="delete-line-button-router"
                  onClick={handleDeleteLastLine}
                  disabled={userCommands.length === 0}
                >
                  한 줄 지우기
                </button>
                <button className="reset-button-router" onClick={handleReset}>
                  초기화
                </button>
                <button className="submit-button-router" onClick={handleCheck}>
                  제출하기
                </button>
              </>
            ) : (
              <div className="result-feedback">
                {isCorrect ? (
                  <>
                    <div className="feedback-message correct">
                      ✅ 정답입니다!
                    </div>
                    <div className="explanation-box">
                      <h4>💡 해설</h4>
                      <p>{currentProblem.explanation}</p>
                    </div>
                    {currentProblemIndex < selectedProblems.length - 1 && (
                      <button className="next-button" onClick={handleNext}>
                        다음 문제 →
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="feedback-message incorrect">
                      ❌ 오답입니다. 명령어를 확인하세요.
                    </div>
                    <div className="correct-commands-box">
                      <h4>정답 명령어:</h4>
                      <div className="command-list">
                        {currentProblem.commands.map((cmd, index) => (
                          <div key={index} className="command-item">
                            <span className="command-number">{index + 1}.</span>
                            <code>{cmd}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="explanation-box">
                      <h4>💡 해설</h4>
                      <p>{currentProblem.explanation}</p>
                    </div>
                    <div className="button-row">
                      <button className="retry-button" onClick={handleReset}>
                        다시 시도
                      </button>
                      {currentProblemIndex < selectedProblems.length - 1 && (
                        <button className="skip-button" onClick={handleNext}>
                          건너뛰기 →
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 케이블 제작 퀴즈 컴포넌트
const CableMakingQuiz = ({ onBack }: { onBack: () => void }) => {
  const [currentProblem] = useState(() => {
    const randomIndex = Math.floor(Math.random() * cableProblems.length);
    return cableProblems[randomIndex];
  });

  const { side1Wires, side2Wires, selectColor, resetWiring } = useCableWiring();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const [colorKeys] = useState(() =>
    Object.keys(CABLE_COLORS).sort(() => Math.random() - 0.5),
  );

  const handleColorSelect = (
    side: "side1" | "side2",
    position: number,
    color: string,
  ) => {
    selectColor(side, position, color);
    setShowResult(false);
  };

  const checkAnswer = () => {
    const correct1 = side1Wires.every(
      (wire, idx) => wire === currentProblem.correctAnswer.side1[idx],
    );
    const correct2 = side2Wires.every(
      (wire, idx) => wire === currentProblem.correctAnswer.side2[idx],
    );
    const result = correct1 && correct2;
    setIsCorrect(result);
    setShowResult(true);
  };

  const resetProblem = () => {
    resetWiring();
    setIsCorrect(null);
    setShowResult(false);
  };

  return (
    <div className="container">
      <div className="cable-making-page">
        <div className="cable-header">
          <button className="back-button-small" onClick={onBack}>
            ← 뒤로
          </button>
          <h1 className="cable-title">🔌 케이블 제작 실습</h1>
          <div style={{ width: "5rem" }} />
        </div>

        <div className="cable-problem-header">
          <p className="cable-instruction">
            {currentProblem.device1}와 {currentProblem.device2}를 연결할
            케이블을 제작하시오.
          </p>
          <p className="cable-hint">각 위치에 알맞은 색상을 선택하세요.</p>
        </div>

        <div className="cable-workspace">
          {/* Side 1 */}
          <div className="cable-side">
            <h3>{currentProblem.device1} 측</h3>
            <div className="cable-connector">
              {side1Wires.map((color, idx) => (
                <div key={`side1-${idx}`} className="wire-slot">
                  <div className="wire-position">{idx + 1}</div>
                  <div
                    className="wire-display"
                    style={{
                      backgroundColor: color
                        ? CABLE_COLORS[color as keyof typeof CABLE_COLORS]
                        : "#ddd",
                    }}
                  >
                    {color && <span className="wire-label">{color}</span>}
                  </div>
                  <select
                    value={color}
                    onChange={(e) =>
                      handleColorSelect("side1", idx, e.target.value)
                    }
                    className="color-select"
                  >
                    <option value="">선택</option>
                    {colorKeys.map((colorKey) => (
                      <option key={colorKey} value={colorKey}>
                        {colorKey}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Side 2 */}
          <div className="cable-side">
            <h3>{currentProblem.device2} 측</h3>
            <div className="cable-connector">
              {side2Wires.map((color, idx) => (
                <div key={`side2-${idx}`} className="wire-slot">
                  <div className="wire-position">{idx + 1}</div>
                  <div
                    className="wire-display"
                    style={{
                      backgroundColor: color
                        ? CABLE_COLORS[color as keyof typeof CABLE_COLORS]
                        : "#ddd",
                    }}
                  >
                    {color && <span className="wire-label">{color}</span>}
                  </div>
                  <select
                    value={color}
                    onChange={(e) =>
                      handleColorSelect("side2", idx, e.target.value)
                    }
                    className="color-select"
                  >
                    <option value="">선택</option>
                    {colorKeys.map((colorKey) => (
                      <option key={colorKey} value={colorKey}>
                        {colorKey}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cable-controls">
          <button onClick={checkAnswer} className="check-button">
            제출
          </button>
          <button onClick={resetProblem} className="reset-button">
            초기화
          </button>
        </div>

        {showResult && (
          <div
            className={`result-message ${isCorrect ? "correct" : "incorrect"}`}
          >
            {isCorrect ? (
              <>
                <h3>✅ 정답입니다!</h3>
                <p>케이블이 올바르게 제작되었습니다.</p>
              </>
            ) : (
              <>
                <h3>❌ 오답입니다</h3>
                <p>케이블 배선을 다시 확인하세요.</p>
                <div className="correct-answer-display">
                  <p>
                    <strong>정답:</strong>
                  </p>
                  <div className="answer-sides">
                    <div>
                      <p>{currentProblem.device1} 측:</p>
                      <div className="answer-wires">
                        {currentProblem.correctAnswer.side1.map(
                          (color, idx) => (
                            <div key={idx} className="answer-wire">
                              <span>{idx + 1}:</span>
                              <div
                                className="answer-wire-color"
                                style={{
                                  backgroundColor:
                                    CABLE_COLORS[
                                      color as keyof typeof CABLE_COLORS
                                    ],
                                }}
                              />
                              <span>{color}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <p>{currentProblem.device2} 측:</p>
                      <div className="answer-wires">
                        {currentProblem.correctAnswer.side2.map(
                          (color, idx) => (
                            <div key={idx} className="answer-wire">
                              <span>{idx + 1}:</span>
                              <div
                                className="answer-wire-color"
                                style={{
                                  backgroundColor:
                                    CABLE_COLORS[
                                      color as keyof typeof CABLE_COLORS
                                    ],
                                }}
                              />
                              <span>{color}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 모의고사 문제 타입
type MockExamProblem =
  | {
      type: "cable";
      problem: CableProblem;
      points: number;
      questionNumber: number;
    }
  | {
      type: "windows";
      problem: WindowsSettingsProblem;
      points: number;
      questionNumber: number;
    }
  | {
      type: "shortAnswer";
      problem: Question;
      points: number;
      questionNumber: number;
    }
  | {
      type: "router";
      problem: RouterProblem;
      points: number;
      questionNumber: number;
    };

// 모의고사 컴포넌트
const MockExam = ({ onBack }: { onBack: () => void }) => {
  const [examProblems] = useState<MockExamProblem[]>(() => {
    const problems: MockExamProblem[] = [];

    // 1번: 케이블 제작 (1문제, 6.5점)
    const randomCable =
      cableProblems[Math.floor(Math.random() * cableProblems.length)];
    problems.push({
      type: "cable",
      problem: randomCable,
      points: 6.5,
      questionNumber: 1,
    });

    // 2~9번: 윈도우 설정 (8문제, 각 5점)
    const shuffledWindows = [...windowsProblems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    shuffledWindows.forEach((problem, idx) => {
      problems.push({
        type: "windows",
        problem,
        points: 5,
        questionNumber: idx + 2,
      });
    });

    // 10~15번: 단답형 (6문제, 각 5점)
    const shuffledQuestions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    shuffledQuestions.forEach((problem, idx) => {
      problems.push({
        type: "shortAnswer",
        problem,
        points: 5,
        questionNumber: idx + 10,
      });
    });

    // 16~18번: 라우터 설정 (3문제, 각 5.5점)
    const shuffledRouter = [...routerProblems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    shuffledRouter.forEach((problem, idx) => {
      problems.push({
        type: "router",
        problem,
        points: 5.5,
        questionNumber: idx + 16,
      });
    });

    return problems;
  });

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);

  const currentProblem = examProblems[currentProblemIndex];

  const handleCableSubmit = (side1: string[], side2: string[]) => {
    if (currentProblem.type !== "cable") return false;

    const correct1 = side1.every(
      (wire, idx) => wire === currentProblem.problem.correctAnswer.side1[idx],
    );
    const correct2 = side2.every(
      (wire, idx) => wire === currentProblem.problem.correctAnswer.side2[idx],
    );
    const isCorrect = correct1 && correct2;

    setScores((prev) => ({
      ...prev,
      [currentProblemIndex]: isCorrect ? currentProblem.points : 0,
    }));
    return isCorrect;
  };

  const handleWindowsSubmit = (
    inputs: Partial<AllAnswerTypes>,
    userPath: string[],
  ) => {
    if (currentProblem.type !== "windows") return false;

    const isCorrect = checkWindowsAnswers(
      currentProblem.problem,
      inputs,
      userPath,
    );
    setScores((prev) => ({
      ...prev,
      [currentProblemIndex]: isCorrect ? currentProblem.points : 0,
    }));
    return isCorrect;
  };

  const handleShortAnswerSubmit = (answer: string) => {
    if (currentProblem.type !== "shortAnswer") return false;

    const isCorrect = checkShortAnswer(answer, currentProblem.problem.answer);
    setScores((prev) => ({
      ...prev,
      [currentProblemIndex]: isCorrect ? currentProblem.points : 0,
    }));
    return isCorrect;
  };

  const handleRouterSubmit = (commands: string[]) => {
    if (currentProblem.type !== "router") return false;

    const isCorrect = checkRouterCommands(
      currentProblem.problem.commands,
      commands,
    );
    setScores((prev) => ({
      ...prev,
      [currentProblemIndex]: isCorrect ? currentProblem.points : 0,
    }));
    return isCorrect;
  };

  const goToNextProblem = () => {
    if (currentProblemIndex < examProblems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1);
      setShowResult(false);
    } else {
      setIsExamFinished(true);
    }
  };

  const totalScore = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0,
  );

  if (isExamFinished) {
    return (
      <div className="container">
        <div className="result-page">
          <h1 className="result-title">📊 모의고사 결과</h1>
          <div className="result-emoji">{totalScore >= 60 ? "🎉" : "📚"}</div>
          <div className="score-display">
            <p className="score-label">총점</p>
            <p className="score-value">{totalScore.toFixed(1)}점</p>
            <p className="score-total">/ 100점</p>
          </div>

          <div className="exam-result-summary">
            <h3>문제별 결과</h3>
            {examProblems.map((problem, idx) => {
              const isCorrect = (scores[idx] || 0) > 0;

              return (
                <div key={idx} className="exam-result-wrapper">
                  <div
                    className={`exam-result-item ${isCorrect ? "correct" : "incorrect"}`}
                  >
                    <span className="result-number">
                      {problem.questionNumber}번
                    </span>
                    <span className="result-type">
                      {problem.type === "cable"
                        ? "케이블"
                        : problem.type === "windows"
                          ? "윈도우"
                          : problem.type === "shortAnswer"
                            ? "단답형"
                            : "라우터"}
                    </span>
                    <span
                      className={`result-score ${isCorrect ? "correct" : "incorrect"}`}
                    >
                      {(scores[idx] || 0).toFixed(1)} / {problem.points}점
                    </span>
                  </div>

                  {!isCorrect && (
                    <details className="result-details">
                      <summary className="details-summary">
                        ❌ 오답 상세보기
                      </summary>
                      <div className="details-content">
                        {problem.type === "shortAnswer" && (
                          <>
                            <p className="problem-title">
                              ❓ 문제: {problem.problem.question}
                            </p>
                            <p className="correct-answer">
                              ✅ 정답: <span>{problem.problem.answer}</span>
                            </p>
                            <p className="answer-description">
                              💡 해설: {problem.problem.description}
                            </p>
                          </>
                        )}
                        {problem.type === "windows" && (
                          <>
                            <p className="problem-title">
                              ❓ 문제: {problem.problem.title}
                            </p>
                            <p className="correct-answer">
                              ✅ 설명: {problem.problem.description}
                            </p>
                          </>
                        )}
                        {problem.type === "router" && (
                          <>
                            <p className="problem-title">
                              ❓ 문제: {problem.problem.question}
                            </p>
                            <p className="answer-description">
                              💡 해설: {problem.problem.explanation}
                            </p>
                          </>
                        )}
                        {problem.type === "cable" && (
                          <p className="problem-title">
                            ❓ 문제: {problem.problem.device1}와{" "}
                            {problem.problem.device2} 연결
                          </p>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              );
            })}
          </div>

          {totalScore >= 60 ? (
            <p className="result-message success">🎊 합격입니다!</p>
          ) : (
            <p className="result-message fail">조금 더 연습이 필요합니다.</p>
          )}

          <button className="restart-button" onClick={onBack}>
            시작 화면으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mock-exam-page">
        <div className="mock-exam-header">
          <div>
            <button className="back-button-small" onClick={onBack}>
              ← 나가기
            </button>
            <button
              style={{ marginLeft: 10, paddingLeft: 10, paddingRight: 10 }}
              className="back-button-small"
              onClick={goToNextProblem}
            >
              →
            </button>
          </div>
          <h1 className="mock-exam-title">📝 모의고사</h1>
          <div
            style={{ width: 140, display: "flex", justifyContent: "flex-end" }}
          >
            <div className="problem-counter">
              {currentProblem.questionNumber} / 18
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(currentProblem.questionNumber / 18) * 100}%`,
            }}
          ></div>
        </div>

        <div className="mock-exam-info">
          <div className="exam-info-item">
            <span className="info-label">문제 번호</span>
            <span className="info-value">
              {currentProblem.questionNumber}번
            </span>
          </div>
          <div className="exam-info-item">
            <span className="info-label">배점</span>
            <span className="info-value">{currentProblem.points}점</span>
          </div>
          <div className="exam-info-item">
            <span className="info-label">현재 점수</span>
            <span className="info-value">{totalScore.toFixed(1)}점</span>
          </div>
        </div>

        {currentProblem.type === "cable" && (
          <CableProblemInExam
            key={`cable-${currentProblemIndex}`}
            problem={currentProblem.problem}
            onSubmit={handleCableSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}

        {currentProblem.type === "windows" && (
          <WindowsProblemInExam
            key={`windows-${currentProblemIndex}`}
            problem={currentProblem.problem}
            onSubmit={handleWindowsSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}

        {currentProblem.type === "shortAnswer" && (
          <ShortAnswerProblemInExam
            key={`short-${currentProblemIndex}`}
            problem={currentProblem.problem}
            onSubmit={handleShortAnswerSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}

        {currentProblem.type === "router" && (
          <RouterProblemInExam
            key={`router-${currentProblemIndex}`}
            problem={currentProblem.problem}
            onSubmit={handleRouterSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}
      </div>
    </div>
  );
};

// 모의고사용 케이블 문제 컴포넌트
const CableProblemInExam = ({
  problem,
  onSubmit,
  onNext,
  showResult,
  setShowResult,
}: {
  problem: CableProblem;
  onSubmit: (side1: string[], side2: string[]) => boolean;
  onNext: () => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
}) => {
  const [side1Wires, setSide1Wires] = useState<string[]>(Array(8).fill(""));
  const [side2Wires, setSide2Wires] = useState<string[]>(Array(8).fill(""));
  const [isCorrect, setIsCorrect] = useState(false);

  const [colorKeys] = useState(() =>
    Object.keys(CABLE_COLORS).sort(() => Math.random() - 0.5),
  );

  const handleColorSelect = (
    side: "side1" | "side2",
    position: number,
    color: string,
  ) => {
    if (side === "side1") {
      const newWires = [...side1Wires];
      newWires[position] = color;
      setSide1Wires(newWires);
    } else {
      const newWires = [...side2Wires];
      newWires[position] = color;
      setSide2Wires(newWires);
    }
    setShowResult(false);
  };

  const handleSubmit = () => {
    const result = onSubmit(side1Wires, side2Wires);
    setIsCorrect(result);
    setShowResult(true);
  };

  return (
    <div className="exam-problem-content">
      <h2 className="exam-problem-title">케이블 제작</h2>
      <p className="exam-problem-instruction">
        {problem.device1}와 {problem.device2}를 연결할 케이블을 제작하시오.
      </p>

      <div className="cable-workspace">
        <div className="cable-side">
          <h3>{problem.device1} 측</h3>
          <div className="cable-connector">
            {side1Wires.map((color, idx) => (
              <div key={`side1-${idx}`} className="wire-slot">
                <div className="wire-position">{idx + 1}</div>
                <div
                  className="wire-display"
                  style={{
                    backgroundColor: color
                      ? CABLE_COLORS[color as keyof typeof CABLE_COLORS]
                      : "#ddd",
                  }}
                >
                  {color && <span className="wire-label">{color}</span>}
                </div>
                <select
                  value={color}
                  onChange={(e) =>
                    handleColorSelect("side1", idx, e.target.value)
                  }
                  className="color-select"
                  disabled={showResult}
                >
                  <option value="">선택</option>
                  {colorKeys.map((colorKey) => (
                    <option key={colorKey} value={colorKey}>
                      {colorKey}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="cable-side">
          <h3>{problem.device2} 측</h3>
          <div className="cable-connector">
            {side2Wires.map((color, idx) => (
              <div key={`side2-${idx}`} className="wire-slot">
                <div className="wire-position">{idx + 1}</div>
                <div
                  className="wire-display"
                  style={{
                    backgroundColor: color
                      ? CABLE_COLORS[color as keyof typeof CABLE_COLORS]
                      : "#ddd",
                  }}
                >
                  {color && <span className="wire-label">{color}</span>}
                </div>
                <select
                  value={color}
                  onChange={(e) =>
                    handleColorSelect("side2", idx, e.target.value)
                  }
                  className="color-select"
                  disabled={showResult}
                >
                  <option value="">선택</option>
                  {colorKeys.map((colorKey) => (
                    <option key={colorKey} value={colorKey}>
                      {colorKey}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!showResult ? (
        <button onClick={handleSubmit} className="submit-exam-button">
          제출
        </button>
      ) : (
        <div className={`exam-result ${isCorrect ? "correct" : "incorrect"}`}>
          <p>{isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다"}</p>
          <button onClick={onNext} className="next-exam-button">
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
};

// 모의고사용 윈도우 문제 컴포넌트
const WindowsProblemInExam = ({
  problem,
  onSubmit,
  onNext,
  showResult,
  setShowResult,
}: {
  problem: WindowsSettingsProblem;
  onSubmit: (inputs: Partial<AllAnswerTypes>, userPath: string[]) => boolean;
  onNext: () => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
}) => {
  const [userInputs, setUserInputs] = useState<Partial<AllAnswerTypes>>({});
  const { userPath, availableSteps, selectStep, removeStep } = usePathQuiz(
    problem.accessPath,
  );
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const result = onSubmit(userInputs, userPath);
    setIsCorrect(result);
    setShowResult(true);
  };

  const renderGUI = () => {
    switch (problem.type) {
      case "network":
        return (
          <NetworkSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as NetworkAnswers}
            showResult={showResult}
          />
        );
      case "dhcp":
        return (
          <DHCPSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as DHCPAnswers}
            showResult={showResult}
          />
        );
      case "ftp":
        return (
          <FTPSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as FTPAnswers}
            showResult={showResult}
          />
        );
      case "dns":
        return (
          <DNSSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as DNSAnswers}
            showResult={showResult}
          />
        );
      case "security":
        return (
          <SecuritySettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as SecurityAnswers}
            showResult={showResult}
          />
        );
      case "website":
        return (
          <WebsiteSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as WebsiteAnswers}
            showResult={showResult}
          />
        );
      case "user":
        return (
          <UserSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as UserAnswers}
            showResult={showResult}
          />
        );
      case "service":
        return (
          <ServiceSettingsGUI
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            correctAnswers={problem.correctAnswers as ServiceAnswers}
            showResult={showResult}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="exam-problem-content">
      <h2 className="exam-problem-title">{problem.title}</h2>

      {/* 접근 경로 드래그 앤 드롭 */}
      {!showResult && (
        <div className="access-path-quiz">
          <div className="access-path-label">
            📍 설정 화면 접근 경로를 순서대로 정렬하세요
          </div>

          {/* 사용자가 정렬한 경로 */}
          <div className="path-drop-zone">
            <div className="drop-zone-label">여기에 순서대로 클릭하세요</div>
            <div className="user-path-container">
              {userPath.map((step, index) => (
                <div
                  key={`user-${index}`}
                  className="path-item placed"
                  onClick={() => removeStep(index)}
                >
                  <span className="path-number">{index + 1}</span>
                  {step}
                  {index < userPath.length - 1 && (
                    <span className="path-arrow">→</span>
                  )}
                </div>
              ))}
              {userPath.length === 0 && (
                <div className="empty-placeholder">
                  경로 단계를 선택해주세요
                </div>
              )}
            </div>
          </div>

          {/* 선택 가능한 경로 단계들 (섞인 상태) */}
          <div className="available-steps">
            <div className="available-steps-label">선택 가능한 단계</div>
            <div className="steps-container">
              {availableSteps.map((step, index) => (
                <div
                  key={`option-${index}`}
                  className="path-item option"
                  onClick={() => selectStep(step)}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 결과 표시 시 정답 경로 보여주기 */}
      {showResult && (
        <div className="access-path-result">
          <div className="access-path-label">
            {isCorrect ? "✅ 올바른 접근 경로" : "❌ 정답 접근 경로"}
          </div>
          <div className="correct-path">
            {problem.accessPath.map((step, index) => (
              <span key={index} className="path-step">
                {step}
                {index < problem.accessPath.length - 1 && (
                  <span className="path-arrow">→</span>
                )}
              </span>
            ))}
          </div>
          {!isCorrect && userPath.length > 0 && (
            <div className="user-wrong-path">
              <div className="wrong-path-label">입력한 경로:</div>
              <div className="wrong-path">
                {userPath.map((step, index) => (
                  <span key={index} className="path-step wrong">
                    {step}
                    {index < userPath.length - 1 && (
                      <span className="path-arrow">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="exam-problem-description">
        {problem.description.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {renderGUI()}

      {!showResult ? (
        <button onClick={handleSubmit} className="submit-exam-button">
          제출
        </button>
      ) : (
        <div className={`exam-result ${isCorrect ? "correct" : "incorrect"}`}>
          <p>{isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다"}</p>
          <button onClick={onNext} className="next-exam-button">
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
};

// 모의고사용 단답형 문제 컴포넌트
const ShortAnswerProblemInExam = ({
  problem,
  onSubmit,
  onNext,
  showResult,
  setShowResult,
}: {
  problem: Question;
  onSubmit: (answer: string) => boolean;
  onNext: () => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
}) => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const result = onSubmit(answer);
    setIsCorrect(result);
    setShowResult(true);
  };

  return (
    <div className="exam-problem-content">
      <h2 className="exam-problem-title">단답형</h2>
      <p className="exam-problem-question">{problem.question}</p>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="exam-answer-input"
        placeholder="답을 입력하세요"
        disabled={showResult}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !showResult) {
            handleSubmit();
          }
        }}
      />

      {!showResult ? (
        <button onClick={handleSubmit} className="submit-exam-button">
          제출
        </button>
      ) : (
        <div className={`exam-result ${isCorrect ? "correct" : "incorrect"}`}>
          <p>
            {isCorrect
              ? "✅ 정답입니다!"
              : `❌ 오답입니다. 정답: ${problem.answer}`}
          </p>
          <button onClick={onNext} className="next-exam-button">
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
};

// 모의고사용 라우터 문제 컴포넌트
const RouterProblemInExam = ({
  problem,
  onSubmit,
  onNext,
  showResult,
  setShowResult,
}: {
  problem: RouterProblem;
  onSubmit: (commands: string[]) => boolean;
  onNext: () => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
}) => {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim()) {
      setCommands([...commands, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleSubmit = () => {
    // 현재 입력 중인 명령어가 있으면 추가
    let commandsToCheck = commands;
    if (currentInput.trim()) {
      commandsToCheck = [...commands, currentInput.trim()];
      setCommands(commandsToCheck);
      setCurrentInput("");
    }

    const result = onSubmit(commandsToCheck);
    setIsCorrect(result);
    setShowResult(true);
  };

  const clearCommands = () => {
    setCommands([]);
    setCurrentInput("");
  };

  const removeLastCommand = () => {
    if (commands.length > 0) {
      setCommands(commands.slice(0, -1));
    }
  };

  return (
    <div className="exam-problem-content">
      <div className="exam-problem-category">{problem.category}</div>
      <h2 className="exam-problem-title">라우터 설정</h2>
      <p className="exam-problem-question">{problem.question}</p>

      <div className="router-terminal">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button red"></span>
            <span className="terminal-button yellow"></span>
            <span className="terminal-button green"></span>
          </div>
          <span className="terminal-title">Router CLI</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-output">
            {commands.map((cmd, idx) => (
              <div key={idx} className="terminal-line">
                <span className="terminal-prompt">Router&gt;</span>
                <span className="terminal-command">{cmd}</span>
              </div>
            ))}
          </div>
          <div className="terminal-input-line">
            <span className="terminal-prompt">Router&gt;</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleCommandSubmit}
              className="terminal-input"
              placeholder="명령어를 입력하세요 (Enter로 추가)"
              disabled={showResult}
            />
          </div>
        </div>
      </div>

      {!showResult ? (
        <div className="exam-terminal-controls">
          <button
            onClick={removeLastCommand}
            className="clear-exam-button"
            disabled={commands.length === 0}
          >
            한줄 지우기
          </button>
          <button onClick={clearCommands} className="clear-exam-button">
            초기화
          </button>
          <button onClick={handleSubmit} className="submit-exam-button">
            제출
          </button>
        </div>
      ) : (
        <div className={`exam-result ${isCorrect ? "correct" : "incorrect"}`}>
          <p>{isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다"}</p>
          {!isCorrect && (
            <div className="correct-commands">
              <p>
                <strong>정답 명령어:</strong>
              </p>
              {problem.commands.map((cmd: string, idx: number) => (
                <div key={idx} className="correct-command">
                  {cmd}
                </div>
              ))}
            </div>
          )}
          <button onClick={onNext} className="next-exam-button">
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
};

// 시험 정보 페이지 컴포넌트
const ExamInfo = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="container">
      <div className="exam-info-page">
        <div className="exam-info-header">
          <button className="back-button-small" onClick={onBack}>
            ← 뒤로
          </button>
          <h1 className="exam-info-title">📚 시험 정보</h1>
        </div>

        <div className="exam-info-content">
          <section className="info-section">
            <h2>네트워크 관리사 2급 실기 시험</h2>
            <p className="info-intro">
              네트워크 관리사 2급 시험은 필기와 실기로 구성되어 있으며, 실무
              기반 지식과 기본적인 이론을 함께 요구합니다.
            </p>
          </section>

          <section className="info-section">
            <h3>📝 필기 시험</h3>
            <p>
              객관식 4지선다형 문제로 출제되며, OSI 7계층, TCP/UDP 포트 번호,
              네트워크 장비, 명령어, 케이블 종류 등 암기 중심의 전통적인 문제가
              많습니다.
            </p>
          </section>

          <section className="info-section">
            <h3>💻 실기 시험</h3>
            <p>
              서술형 및 구성도 작성 형태로, 실제 네트워크 구성 및 운영 능력,
              윈도우/리눅스 명령어 사용 능력, IP 주소 계산 및 라우터 설정에 대한
              실무 감각을 평가합니다.
            </p>
          </section>

          <section className="info-section highlight">
            <h3>📌 실기 시험 구성 (총 18문제)</h3>

            <div className="exam-structure-table">
              <div className="table-header">
                <div className="col-number">번호 구간</div>
                <div className="col-item">항목</div>
                <div className="col-count">문제 수</div>
                <div className="col-score">배점</div>
                <div className="col-type">출제 유형</div>
              </div>

              <div className="table-row">
                <div className="col-number">1번</div>
                <div className="col-item">케이블 제작</div>
                <div className="col-count">1문제</div>
                <div className="col-score">6.5점</div>
                <div className="col-type">직접 제작</div>
              </div>

              <div className="table-row">
                <div className="col-number">2~9번</div>
                <div className="col-item">윈도우 설정</div>
                <div className="col-count">8문제</div>
                <div className="col-score">각 5점</div>
                <div className="col-type">서술형/실습</div>
              </div>

              <div className="table-row">
                <div className="col-number">10~15번</div>
                <div className="col-item">단답/선택형 (리눅스)</div>
                <div className="col-count">6문제</div>
                <div className="col-score">각 5점</div>
                <div className="col-type">명령어 문제</div>
              </div>

              <div className="table-row">
                <div className="col-number">16~18번</div>
                <div className="col-item">라우터 설정</div>
                <div className="col-count">3문제</div>
                <div className="col-score">각 5.5점</div>
                <div className="col-type">에뮬레이터 실습</div>
              </div>

              <div className="table-footer">
                <div className="total-info">
                  <strong>총 18문제, 배점 총합 100점</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section tips">
            <h3>💡 합격 팁</h3>
            <ul className="tips-list">
              <li>
                <strong>합격 기준:</strong> 60점 이상
              </li>
              <li>
                <strong>실수 허용치:</strong> 각 파트별 실수 허용치가 적고, 모든
                영역에서 골고루 점수를 획득해야 안정적인 합격이 가능합니다.
              </li>
              <li>
                <strong>케이블 제작 (1번):</strong> 실기 중 유일하게 직접 손으로
                만드는 작업이며, 정확한 색상 순서, 테스터기 작동 여부까지
                확인하므로 사전 연습이 매우 중요합니다.
              </li>
              <li>
                <strong>윈도우 설정 (2~9번):</strong> GUI 기반 설정 문제로,
                정확한 IP 주소, 서브넷 마스크, 게이트웨이 입력이 필요합니다.
              </li>
              <li>
                <strong>리눅스 명령어 (10~15번):</strong> 기본 명령어와 네트워크
                관련 명령어를 숙지해야 합니다.
              </li>
              <li>
                <strong>라우터 설정 (16~18번):</strong> 라우팅 테이블 작성, IP
                및 서브넷 설정, 게이트웨이 구성 등이 포함되며, Router Emulator
                프로그램을 통해 실습합니다.
              </li>
            </ul>
          </section>

          <section className="info-section warning">
            <h3>⚠️ 주의사항</h3>
            <ul className="warning-list">
              <li>
                모든 문제는 정확도가 중요하며, 오타나 띄어쓰기 실수도 감점
                대상이 될 수 있습니다.
              </li>
              <li>
                시간 배분이 중요합니다. 각 문제 유형별로 충분한 연습을 통해 시간
                감각을 익히세요.
              </li>
              <li>
                실기 시험장에는 필기구와 수험표만 지참 가능하며, 별도의 계산기나
                참고 자료는 사용할 수 없습니다.
              </li>
            </ul>
          </section>

          <div className="practice-cta">
            <p>이 프로그램으로 실전과 동일한 환경에서 연습하세요!</p>
            <button className="start-practice-button" onClick={onBack}>
              연습 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// App 컴포넌트
function App() {
  const [page, setPage] = useState<PageType>("start");
  const [quizMode, setQuizMode] = useState<"all" | "random">("all");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(0);

  const startQuiz = (mode: "all" | "random") => {
    setQuizMode(mode);
    const questions =
      mode === "all" ? allQuestions : getRandomQuestions(allQuestions, 5);
    setSelectedQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer("");
    setScore(0);
    setPage("quiz");
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) {
      alert("답변을 입력해주세요!");
      return;
    }

    const isCorrect = checkShortAnswer(
      currentAnswer,
      selectedQuestions[currentQuestionIndex].answer,
    );
    const newUserAnswers = [...userAnswers, currentAnswer];
    setUserAnswers(newUserAnswers);

    if (isCorrect) {
      const pointsPerQuestion =
        quizMode === "all" ? Math.round(100 / selectedQuestions.length) : 20;
      setScore(score + pointsPerQuestion);
    }

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    } else {
      setPage("result");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitAnswer();
    }
  };

  const resetQuiz = () => {
    setPage("start");
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer("");
    setScore(0);
  };

  // 윈도우 설정 문제 페이지
  if (page === "windows-settings") {
    return <WindowsSettingsQuiz onBack={() => setPage("start")} />;
  }

  // 라우터 설정 문제 페이지
  if (page === "router-settings") {
    return <RouterSettingsQuiz onBack={() => setPage("start")} />;
  }

  // 케이블 제작 페이지
  if (page === "cable-making") {
    return <CableMakingQuiz onBack={() => setPage("start")} />;
  }

  // 모의고사 페이지
  if (page === "mock-exam") {
    return <MockExam onBack={() => setPage("start")} />;
  }

  // 시험 정보 페이지
  if (page === "exam-info") {
    return <ExamInfo onBack={() => setPage("start")} />;
  }

  // 시작 페이지 - 문제 유형 선택
  if (page === "start") {
    return (
      <div className="container">
        <div className="start-page">
          <h1 className="title">📚 네트워크 관리사 2급 실기</h1>
          <p className="subtitle">시험 연습 프로그램</p>

          <div className="mode-selection">
            <button
              className="mode-button mock-exam"
              onClick={() => setPage("mock-exam")}
            >
              <div className="mode-icon">📝</div>
              <h3>모의고사</h3>
              <p>실전 모의고사 (18문제 100점)</p>
            </button>

            <button className="mode-button all" onClick={() => setPage("menu")}>
              <div className="mode-icon">✏️</div>
              <h3>단답형 문제</h3>
              <p>명령어 및 기술 퀴즈</p>
            </button>

            <button
              className="mode-button random"
              onClick={() => setPage("windows-settings")}
            >
              <div className="mode-icon">🪟</div>
              <h3>윈도우 설정 문제</h3>
              <p>GUI 기반 설정 실습</p>
            </button>

            <button
              className="mode-button router"
              onClick={() => setPage("router-settings")}
            >
              <div className="mode-icon">🔧</div>
              <h3>라우터 설정 문제</h3>
              <p>Cisco IOS 명령어 실습</p>
            </button>

            <button
              className="mode-button cable"
              onClick={() => setPage("cable-making")}
            >
              <div className="mode-icon">🔌</div>
              <h3>케이블 제작 문제</h3>
              <p>LAN 케이블 배선 실습</p>
            </button>

            <button
              className="mode-button exam-info"
              onClick={() => setPage("exam-info")}
            >
              <div className="mode-icon">📖</div>
              <h3>시험 정보</h3>
              <p>실기 시험 구성 및 합격 팁</p>
            </button>
          </div>

          <div className="info-box">
            <p>💡 실제 시험과 유사한 환경으로 연습하세요</p>
            <p>💡 각 문제 유형을 선택하여 시작하세요</p>
          </div>
        </div>
      </div>
    );
  }

  // 단답형 문제 메뉴
  if (page === "menu") {
    return (
      <div className="container">
        <div className="start-page">
          <h1 className="title">✏️ 단답형 문제</h1>
          <p className="subtitle">명령어 및 기술 퀴즈</p>

          <div className="mode-selection">
            <button
              className="mode-button all"
              onClick={() => startQuiz("all")}
            >
              <div className="mode-icon">📝</div>
              <h3>전체 문제 풀기</h3>
              <p>{allQuestions.length}문제</p>
            </button>

            <button
              className="mode-button random"
              onClick={() => startQuiz("random")}
            >
              <div className="mode-icon">🎲</div>
              <h3>랜덤 5문제 풀기</h3>
              <p>5문제 (각 20점)</p>
            </button>
          </div>

          <div className="info-box">
            <p>💡 답변은 소문자로 입력하세요</p>
            <p>💡 Enter 키로 빠르게 제출할 수 있습니다</p>
          </div>

          <button className="back-button" onClick={() => setPage("start")}>
            ← 뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  // 퀴즈 페이지
  if (page === "quiz") {
    const progress =
      ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    return (
      <div className="container">
        <div className="quiz-page">
          <div className="quiz-header">
            <button
              className="back-button-small"
              onClick={() => setPage("menu")}
            >
              ← 뒤로
            </button>
            <h1 className="quiz-title">✏️ 단답형 문제</h1>
            <div className="problem-counter">
              {currentQuestionIndex + 1} / {selectedQuestions.length}
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="question-info">
            <span className="current-score">현재 점수: {score}점</span>
          </div>

          <div className="question-card">
            <h2 className="question-text">{currentQuestion.question}</h2>

            <div className="answer-input-container">
              <input
                type="text"
                className="answer-input"
                placeholder="답변을 입력하세요..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <button className="submit-button" onClick={handleSubmitAnswer}>
                {currentQuestionIndex < selectedQuestions.length - 1
                  ? "다음 문제"
                  : "결과 보기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 결과 페이지
  if (page === "result") {
    let message = "";
    let emoji = "";
    if (score === 100) {
      message = "완벽합니다! 만점을 달성하셨습니다!";
      emoji = "🏆";
    } else if (score >= 80) {
      message = "훌륭합니다! 잘 하셨어요!";
      emoji = "🎉";
    } else if (score >= 60) {
      message = "괜찮습니다! 조금만 더 공부하세요!";
      emoji = "👍";
    } else if (score >= 40) {
      message = "더 공부가 필요합니다!";
      emoji = "📖";
    } else {
      message = "다시 한번 도전해보세요!";
      emoji = "💪";
    }

    return (
      <div className="container">
        <div className="result-page">
          <div className="result-header">
            <div className="result-emoji">{emoji}</div>
            <h1 className="result-title">퀴즈 완료!</h1>
            <div className="result-score">
              <span className="score-value">{score}</span>
              <span className="score-max">/ 100점</span>
            </div>
            <p className="result-message">{message}</p>
          </div>

          <div className="review-section">
            <h2 className="review-title">📝 문제 복습</h2>
            {selectedQuestions.map((q, index) => {
              const userAnswer = userAnswers[index] || "";
              const isCorrect = checkShortAnswer(userAnswer, q.answer);

              return (
                <div
                  key={index}
                  className={`review-card ${isCorrect ? "correct" : "incorrect"}`}
                >
                  <div className="review-header">
                    <span className="review-number">문제 {index + 1}</span>
                    <span
                      className={`review-badge ${isCorrect ? "correct" : "incorrect"}`}
                    >
                      {isCorrect ? "✅ 정답" : "❌ 오답"}
                    </span>
                  </div>
                  <p className="review-question">{q.question}</p>
                  <div className="review-answers">
                    {!isCorrect && userAnswer && (
                      <p className="user-answer">
                        내 답변: <span>{userAnswer}</span>
                      </p>
                    )}
                    <p className="correct-answer">
                      정답: <span>{q.answer}</span>
                    </p>
                    <p className="answer-description">{q.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="restart-button" onClick={resetQuiz}>
            🔄 처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
