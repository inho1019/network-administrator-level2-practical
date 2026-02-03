import { useState } from "react";
import "./App.css";

interface Question {
  question: string;
  answer: string;
  description: string;
}

type PageType = "start" | "quiz" | "result";

const allQuestions: Question[] = [
  {
    question: "네트워크 상태를 확인하는 명령어는?",
    answer: "netstat",
    description: "네트워크 상태 확인",
  },
  {
    question:
      "도메인에 대한 네트워크 경로 확인/라우팅 경로를 추적하는 명령어는? (Windows)",
    answer: "tracert",
    description: "도메인에 대한 네트워크 경로 확인/라우팅 경로 추적 (Windows)",
  },
  {
    question:
      "도메인에 대한 네트워크 경로 확인/라우팅 경로를 추적하는 명령어는? (Linux)",
    answer: "traceroute",
    description: "도메인에 대한 네트워크 경로 확인/라우팅 경로 추적 (Linux)",
  },
  {
    question:
      "웹 애플리케이션을 보호하는 방화벽으로, 트래픽을 감지하여 해킹을 차단하는 기술은?",
    answer: "waf",
    description: "Web Application Firewall - 방화벽, 트래픽 감지하여 해킹 차단",
  },
  {
    question: "메모리 소비율과 CPU 점유율을 실시간으로 모니터링하는 명령어는?",
    answer: "top",
    description: "메모리 소비율과 cpu 점유율 실시간 모니터링",
  },
  {
    question: "논리적 LAN을 구성하는 기술로, VTP 키워드와 관련이 있는 것은?",
    answer: "vlan",
    description: "논리 LAN, VTP 키워드 확인",
  },
  {
    question:
      "가상 보안 네트워크를 구성하며, '터널' 키워드와 관련이 있는 기술은?",
    answer: "vpn",
    description: "가상 보안 네트워크, 터널 키워드 확인",
  },
  {
    question: "최단거리 네트워크 프로토콜로, '홉수' 키워드와 관련이 있는 것은?",
    answer: "rip",
    description: "최단거리 네트워크, 홉수 키워드 확인",
  },
  {
    question:
      "최단거리 네트워크 프로토콜로, 'Link State' 키워드와 관련이 있는 것은?",
    answer: "ospf",
    description: "최단거리 네트워크, Link State 키워드 확인",
  },
  {
    question: "명령어의 메뉴얼을 확인하는 명령어는?",
    answer: "man",
    description: "메뉴얼 확인 명령어",
  },
  {
    question: "IP 주소를 변환하는 기술은?",
    answer: "nat",
    description: "ip주소 변환 기술",
  },
  {
    question:
      "원격 시스템 명령을 실행하는 프로토콜로, Telnet과 같은 역할을 하며 22번 포트를 사용하는 것은?",
    answer: "ssh",
    description: "원격시스템 명령 실행, Telnet 과 같은 프로토콜, 22번 포트",
  },
  {
    question:
      "데이터를 안전하게 주고받기 위한 프로토콜로, http를 https로 만들며 443번 포트를 사용하는 것은?",
    answer: "ssl",
    description:
      "데이터를 안전하게 주고 받기 위한 프로토콜, 적용되면 http → https, 443번 포트",
  },
  {
    question: "현재 디렉토리 위치를 알려주는 명령어는?",
    answer: "pwd",
    description: "현재 디렉토리 위치 알려줌",
  },
  {
    question: "계정의 비밀번호를 변경하는 명령어는?",
    answer: "passwd",
    description: "계정 생성 과정",
  },
  {
    question: "네트워크 침입을 차단하는 시스템은?",
    answer: "ips",
    description: "네트워크 침입 차단",
  },
  {
    question:
      "허가되지 않은 도청이나 데이터 변경을 방지하며, VPN 구축에 주로 사용되는 프로토콜은?",
    answer: "ipsec",
    description:
      "허가되지 않은 도청이나 데이터 변경 방지, VPN 구축에 주로 사용",
  },
  {
    question:
      "특정 도메인에 대한 목적지 IP와의 데이터 통신을 확인하는 명령어는?",
    answer: "ping",
    description: "특정 도메인에 대한 목적지 ip와의 데이터 통신 확인",
  },
  {
    question: "패키지를 설치하는 명령어는?",
    answer: "install",
    description: "패키지 설치",
  },
  {
    question: "파일이나 디렉토리를 제거하는 Windows 명령어는?",
    answer: "del",
    description: "제거 (Windows)",
  },
  {
    question: "디렉토리를 제거하는 Windows 명령어는?",
    answer: "rmdir",
    description: "제거 (Windows/Linux 공통)",
  },
  {
    question: "파일이나 디렉토리를 제거하는 Linux 명령어는?",
    answer: "rm",
    description: "제거 (Linux)",
  },
  {
    question:
      "VLAN을 자동으로 동기화하는 프로토콜로, 'VLAN' 키워드와 관련이 있는 것은?",
    answer: "vtp",
    description: "VLAN 자동 동기화 프로토콜, VLAN 키워드 확인",
  },
  {
    question:
      "다양한 보안 솔루션을 하나로 묶어서 운영하는 통합 위협 관리 시스템은?",
    answer: "utm",
    description: "통합 위협 관리 - 다양한 보안 솔루션을 하나로 묶어서 운영",
  },
  {
    question: "IPv6가 IPv4와 호환성을 유지하는 방법은?",
    answer: "dualstack",
    description: "IPv6가 IPv4와 호환성을 유지하는 방법",
  },
  {
    question: "파일이나 디렉토리의 권한을 설정하는 명령어는?",
    answer: "chmod",
    description: "권한 설정 명령어",
  },
  {
    question: "신뢰성 있는 전송을 제공하지만 느린 전송 프로토콜은?",
    answer: "tcp",
    description: "신뢰성 But 느림 | 웹 브라우징 파일 전송 등",
  },
  {
    question: "빠른 전송을 제공하지만 비신뢰성인 전송 프로토콜은?",
    answer: "udp",
    description: "비신뢰성 But 빠름 | 스트리밍 및 게임 등",
  },
];

function App() {
  const [page, setPage] = useState<PageType>("start");
  const [quizMode, setQuizMode] = useState<"all" | "random">("all");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(0);

  const getRandomQuestions = (
    questions: Question[],
    count: number,
  ): Question[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

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

  const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    return (
      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) {
      alert("답변을 입력해주세요!");
      return;
    }

    const isCorrect = checkAnswer(
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

  // 시작 페이지
  if (page === "start") {
    return (
      <div className="container">
        <div className="start-page">
          <h1 className="title">📚 네트워크 관리사 2급 실기</h1>
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
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="question-header">
            <span className="question-number">
              문제 {currentQuestionIndex + 1} / {selectedQuestions.length}
            </span>
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
              const isCorrect = checkAnswer(userAnswer, q.answer);

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
