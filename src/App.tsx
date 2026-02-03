import { useState } from "react";
import "./App.css";

interface Question {
  question: string;
  answer: string;
  description: string;
}

type PageType =
  | "start"
  | "menu"
  | "quiz"
  | "result"
  | "windows-settings"
  | "router-settings"
  | "cable-making"
  | "mock-exam"
  | "exam-info";

// 윈도우 설정 문제 타입
interface NetworkAnswers {
  ip: string;
  subnet: string;
  gateway: string;
  dns?: string;
}

interface WindowsSettingsProblem {
  id: number;
  type: "network" | "dhcp" | "ftp" | "dns" | "security" | "website" | "user";
  title: string;
  description: string;
  correctAnswers: AllAnswerTypes;
}

// DHCP 설정 답안 타입
interface DHCPAnswers {
  startIP: string;
  endIP: string;
  subnet: string;
  excludeStart?: string;
  excludeEnd?: string;
  leaseHours?: string;
  gateway?: string;
}

// FTP 설정 답안 타입
interface FTPAnswers {
  siteName: string;
  ip: string;
  port: string;
  welcomeMessage?: string;
  exitMessage?: string;
}

// DNS 설정 답안 타입
interface DNSAnswers {
  zoneName: string;
  zoneType: string;
  hostName?: string;
  hostIP?: string;
}

// 로컬 보안 정책 답안 타입
interface SecurityAnswers {
  loginMessage?: string;
  minPasswordAge?: string;
  maxPasswordAge?: string;
  lockoutAttempts?: string;
  lockoutDuration?: string;
}

// 웹사이트 설정 답안 타입
interface WebsiteAnswers {
  siteName: string;
  ip: string;
  port: string;
  physicalPath: string;
  defaultDocument?: string;
}

// 사용자 및 그룹 답안 타입
interface UserAnswers {
  username: string;
  fullName: string;
  password: string;
  groups: string[];
  sessionMinutes?: string;
}

type AllAnswerTypes =
  | NetworkAnswers
  | DHCPAnswers
  | FTPAnswers
  | DNSAnswers
  | SecurityAnswers
  | WebsiteAnswers
  | UserAnswers;

// 라우터 설정 문제 타입
interface RouterProblem {
  id: number;
  category: string;
  question: string;
  commands: string[];
  explanation: string;
}

// 케이블 제작 문제 타입
interface CableProblem {
  id: number;
  device1: string;
  device2: string;
  cableType: "direct" | "cross";
  correctAnswer: {
    side1: string[];
    side2: string[];
  };
}

// 케이블 색상 정의
const CABLE_COLORS = {
  주띠: "#FFE4B5",
  주: "#FFA500",
  초띠: "#90EE90",
  초: "#008000",
  파: "#0000FF",
  파띠: "#87CEEB",
  갈띠: "#D2B48C",
  갈: "#8B4513",
};

const DIRECT_CABLE = ["주띠", "주", "초띠", "파", "파띠", "초", "갈띠", "갈"];
const CROSS_CABLE_SIDE2 = [
  "초띠",
  "초",
  "주띠",
  "파",
  "파띠",
  "주",
  "갈띠",
  "갈",
];

const windowsProblems: WindowsSettingsProblem[] = [
  {
    id: 1,
    type: "network",
    title: "#1 네트워크 속성 설정",
    description:
      "IP 192.168.100.56/29\nIP: 사용 가능한 첫번째 IP 주소\nGateway: 사용 가능한 마지막 IP 주소",
    correctAnswers: {
      ip: "192.168.100.57",
      subnet: "255.255.255.248",
      gateway: "192.168.100.62",
    },
  },
  {
    id: 2,
    type: "network",
    title: "#2 네트워크 속성 설정",
    description:
      "IP: 192.168.100.59\nSubnet: 하나의 서브넷은 6개의 호스트를 갖는다\nGateway: 192.168.100.62\nDNS: 192.168.100.245",
    correctAnswers: {
      ip: "192.168.100.59",
      subnet: "255.255.255.248",
      gateway: "192.168.100.62",
      dns: "192.168.100.245",
    },
  },
  {
    id: 3,
    type: "dhcp",
    title: "#3 DHCP 서버 설정",
    description:
      "범위 이름: TestScope\n시작 IP: 192.168.100.100\n종료 IP: 192.168.100.200\n서브넷 마스크: 255.255.255.0\n제외 IP 시작: 192.168.100.150\n제외 IP 종료: 192.168.100.160\n임대 기간: 8시간\n게이트웨이: 192.168.100.1",
    correctAnswers: {
      startIP: "192.168.100.100",
      endIP: "192.168.100.200",
      subnet: "255.255.255.0",
      excludeStart: "192.168.100.150",
      excludeEnd: "192.168.100.160",
      leaseHours: "8",
      gateway: "192.168.100.1",
    },
  },
  {
    id: 4,
    type: "ftp",
    title: "#4 FTP 사이트 설정",
    description:
      "FTP 사이트 이름: MyFTPSite\nIP 주소: 192.168.100.50\n포트: 21\n시작 메시지: Welcome to FTP Server\n종료 메시지: Goodbye",
    correctAnswers: {
      siteName: "MyFTPSite",
      ip: "192.168.100.50",
      port: "21",
      welcomeMessage: "Welcome to FTP Server",
      exitMessage: "Goodbye",
    },
  },
  {
    id: 5,
    type: "dns",
    title: "#6 DNS 설정",
    description:
      "영역 이름: test.com\n영역 유형: 주 영역\n호스트 이름: www\n호스트 IP: 192.168.100.10",
    correctAnswers: {
      zoneName: "test.com",
      zoneType: "주 영역",
      hostName: "www",
      hostIP: "192.168.100.10",
    },
  },
  {
    id: 6,
    type: "security",
    title: "#7 로컬 보안 정책 설정",
    description:
      "로그온 시 표시할 메시지: Authorized Access Only\n최소 암호 사용 기간: 7일\n최대 암호 사용 기간: 42일\n계정 잠금 임계값: 5회\n계정 잠금 기간: 30분",
    correctAnswers: {
      loginMessage: "Authorized Access Only",
      minPasswordAge: "7",
      maxPasswordAge: "42",
      lockoutAttempts: "5",
      lockoutDuration: "30",
    },
  },
  {
    id: 7,
    type: "website",
    title: "#8 웹사이트 추가 설정",
    description:
      "사이트 이름: TestWebSite\nIP 주소: 192.168.100.80\n포트: 80\n실제 경로: C:\\inetpub\\wwwroot\n기본 문서: index.html",
    correctAnswers: {
      siteName: "TestWebSite",
      ip: "192.168.100.80",
      port: "80",
      physicalPath: "C:\\inetpub\\wwwroot",
      defaultDocument: "index.html",
    },
  },
  {
    id: 8,
    type: "user",
    title: "#9 로컬 사용자 및 그룹 설정",
    description:
      "사용자 이름: testuser\n전체 이름: Test User\n암호: P@ssw0rd\n소속 그룹: Administrators, Users\n세션 제한: 60분",
    correctAnswers: {
      username: "testuser",
      fullName: "Test User",
      password: "P@ssw0rd",
      groups: ["Administrators", "Users"],
      sessionMinutes: "60",
    },
  },
];

// 라우터 설정 문제 데이터
const routerProblems: RouterProblem[] = [
  {
    id: 1,
    category: "기본 라우터 설정",
    question: "ROUTER2의 호스트 이름을 'ICQA'로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "hostname ICQA",
      "exit",
      "copy running-config startup-config",
    ],
    explanation:
      "호스트 이름 설정: enable → conf t → hostname [이름] → exit → copy run start",
  },
  {
    id: 2,
    category: "기본 라우터 설정",
    question: "console 0의 패스워드를 ICQA로 설정하고 로그인하시오.",
    commands: [
      "enable",
      "configure terminal",
      "line console 0",
      "password ICQA",
      "login",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation:
      "콘솔 패스워드: conf t → line console 0 → password [암호] → login → exit → copy run start",
  },
  {
    id: 3,
    category: "기본 라우터 설정",
    question:
      "Hostname을 network2로 변경하고 console 0의 password를 route5로 변경 후 로그인하시오.",
    commands: [
      "enable",
      "configure terminal",
      "hostname network2",
      "line console 0",
      "password route5",
      "login",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "호스트명 변경 후 콘솔 패스워드 설정",
  },
  {
    id: 4,
    category: "기본 라우터 설정",
    question: "console 0의 도메인 명을 AAA로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "ip domain-name AAA",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "도메인 설정: conf t → ip domain-name [도메인명]",
  },
  {
    id: 5,
    category: "인터페이스 설정",
    question:
      "ROUTER 1의 FastEthernet 0/0의 IP를 192.168.0.100/24로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface fastethernet 0/0",
      "ip address 192.168.0.100 255.255.255.0",
      "no shutdown",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation:
      "인터페이스 IP 설정: int fa0/0 → ip address [IP] [서브넷마스크] → no sh",
  },
  {
    id: 6,
    category: "인터페이스 설정",
    question:
      "ROUTER1의 FastEthernet 0/0의 IP Address를 192.168.100.1/24로 설정하고 활성화 하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface fastethernet 0/0",
      "ip address 192.168.100.1 255.255.255.0",
      "no shutdown",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "인터페이스 활성화 포함",
  },
  {
    id: 7,
    category: "인터페이스 설정",
    question:
      "ROUTER1의 FastEthernet 0/0을 사용가능하게 IP 주소를 192.168.0.101/24와 두번째 IP 192.168.0.102/24로 설정하고 활성화 하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface fastethernet 0/0",
      "ip address 192.168.0.101 255.255.255.0",
      "ip address 192.168.0.102 255.255.255.0 secondary",
      "no shutdown",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "보조 IP 설정: secondary 키워드 사용",
  },
  {
    id: 8,
    category: "인터페이스 설정",
    question: "FastEthernet 0/0의 Description을 설정하시오. Description: ICQA",
    commands: [
      "enable",
      "configure terminal",
      "interface fastethernet 0/0",
      "description ICQA",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "설명 추가: description [설명]",
  },
  {
    id: 9,
    category: "인터페이스 설정",
    question: "access-list 1이 설정되어 있을 때 FastEthernet 0/0에 적용하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface fastethernet 0/0",
      "ip access-group 1 out",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "ACL 적용: ip access-group [번호] [in|out]",
  },
  {
    id: 10,
    category: "시리얼 인터페이스",
    question: "ROUTER2의 Serial 2/0의 대역폭을 2048로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface serial 2/0",
      "bandwidth 2048",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "대역폭 설정: bandwidth [값]",
  },
  {
    id: 11,
    category: "시리얼 인터페이스",
    question: "ROUTER1의 Serial 2/0의 클럭 속도를 72K로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface serial 2/0",
      "clock rate 72000",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "클럭 속도: clock rate [값] (단위: bps)",
  },
  {
    id: 12,
    category: "시리얼 인터페이스",
    question:
      "ROUTER1의 Serial 2/0을 사용가능하게 IP 주소를 192.168.0.101/24와 두번째 IP 192.168.0.102/24로 설정하고 활성화 하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface serial 2/0",
      "ip address 192.168.0.101 255.255.255.0",
      "ip address 192.168.0.102 255.255.255.0 secondary",
      "no shutdown",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "시리얼 인터페이스도 보조 IP 설정 가능",
  },
  {
    id: 13,
    category: "시리얼 인터페이스",
    question: "ROUTER1 Serial 2/0을 활성화 시키시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface serial 2/0",
      "no shutdown",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "인터페이스 활성화: no shutdown",
  },
  {
    id: 14,
    category: "시리얼 인터페이스",
    question: "serial 2/0에 frame relay 방식으로 캡슐화 하시오.",
    commands: [
      "enable",
      "configure terminal",
      "interface serial 2/0",
      "encapsulation frame-relay",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "프레임 릴레이: encapsulation frame-relay",
  },
  {
    id: 15,
    category: "게이트웨이 설정",
    question: "기본 게이트웨이를 설정하시오. IP: 192.168.0.10",
    commands: [
      "enable",
      "configure terminal",
      "ip default-gateway 192.168.0.10",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "기본 게이트웨이: ip default-gateway [IP]",
  },
  {
    id: 16,
    category: "DHCP 설정",
    question:
      "ROUTER1의 DHCP 네트워크를 192.168.100.0/24 서버이름은 'icqa'로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "ip dhcp pool icqa",
      "network 192.168.100.0 255.255.255.0",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "DHCP 풀: ip dhcp pool [이름] → network [네트워크] [마스크]",
  },
  {
    id: 17,
    category: "정적 라우팅",
    question:
      "Router에 목적지 네트워크(24.48.200.0/24) 및 게이트웨이 IP(100.150.100.2)로 정적 라우팅을 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "ip route 24.48.200.0 255.255.255.0 100.150.100.2",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "정적 라우팅: ip route [목적지] [마스크] [게이트웨이]",
  },
  {
    id: 18,
    category: "네트워크 설정",
    question: "Default Network를 192.168.0.10으로 설정 하시오.",
    commands: [
      "enable",
      "configure terminal",
      "ip default-network 192.168.0.10",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "기본 네트워크: ip default-network [IP]",
  },
  {
    id: 19,
    category: "네트워크 설정",
    question:
      "RIP 환경이 구성되어 있을 때 라우팅 테이블에 등록되지 않는 목적지로 향하는 패킷은 192.168.1.1 네트워크로 보내도록 ROUTER1에 디폴트 네트워크를 설정하시오. (단, ip route 0.0.0.0 명령어를 사용해서는 안됨)",
    commands: [
      "enable",
      "configure terminal",
      "ip default-network 192.168.1.1",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "RIP에서 디폴트 네트워크 설정",
  },
  {
    id: 20,
    category: "OSPF 설정",
    question:
      "네트워크가 구성되어 있을 때 OSPF를 설정하시오 (Process ID와 Area ID는 1)",
    commands: [
      "enable",
      "configure terminal",
      "router ospf 1",
      "network 0.0.0.0 255.255.255.255 area 1",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation:
      "OSPF: router ospf [ID] → network [네트워크] [와일드카드] area [영역]",
  },
  {
    id: 21,
    category: "OSPF 설정",
    question:
      "ROUTER1에 OSPF를 설정하시오. (Process ID와 Area id는 1, 연결된 네트워크는 192.70.100.0/24와 193.150.60.0/24)",
    commands: [
      "enable",
      "configure terminal",
      "router ospf 1",
      "network 192.70.100.0 0.0.0.255 area 1",
      "network 193.150.60.0 0.0.0.255 area 1",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "여러 네트워크를 OSPF에 추가",
  },
  {
    id: 22,
    category: "SNMP 설정",
    question:
      "Router1에 SNMP 설정을 다음과 같이 구성하시오. SNMP 통신 시 Community 이름을 'ICQA'로 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "snmp-server community ICQA ro",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "SNMP 커뮤니티: snmp-server community [이름] [ro|rw]",
  },
  {
    id: 23,
    category: "텔넷 설정",
    question:
      "ROUTER1 Telnet에 접근하는 Password를 icqa로 설정하고 로그인 하시오.",
    commands: [
      "enable",
      "configure terminal",
      "line vty 0 4",
      "password icqa",
      "login",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "텔넷 패스워드: line vty 0 4 → password [암호] → login",
  },
  {
    id: 24,
    category: "텔넷 설정",
    question:
      "Telnet에 연결 후 3분 50초 동안 입력이 없으면 세션이 자동 종료되도록 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "line vty 0 4",
      "exec-timeout 3 50",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "세션 타임아웃: exec-timeout [분] [초]",
  },
  {
    id: 25,
    category: "텔넷 설정",
    question:
      "라우터에서 Telnet 접속을 SSH로 변경하여 VTY 0 4 포트에서 SSH로 접속 가능하도록 설정하시오.",
    commands: [
      "enable",
      "configure terminal",
      "line vty 0 4",
      "transport input ssh",
      "exit",
      "exit",
      "copy running-config startup-config",
    ],
    explanation: "SSH 전환: transport input ssh",
  },
  {
    id: 26,
    category: "확인 명령어",
    question: "인터페이스 정보를 확인하고 저장하시오.",
    commands: [
      "enable",
      "show ip interface brief",
      "copy running-config startup-config",
    ],
    explanation: "인터페이스 확인: show ip interface brief",
  },
  {
    id: 27,
    category: "확인 명령어",
    question: "접속한 사용자 정보를 확인하고 저장하시오.",
    commands: ["enable", "show users", "copy running-config startup-config"],
    explanation: "사용자 확인: show users",
  },
  {
    id: 28,
    category: "확인 명령어",
    question: "라우팅 테이블 정보를 확인하고 저장하시오.",
    commands: ["enable", "show ip route", "copy running-config startup-config"],
    explanation: "라우팅 테이블: show ip route",
  },
  {
    id: 29,
    category: "확인 명령어",
    question: "플래쉬 내용을 확인하고 저장하시오.",
    commands: ["enable", "show flash", "copy running-config startup-config"],
    explanation: "플래시 확인: show flash",
  },
  {
    id: 30,
    category: "확인 명령어",
    question: "프로세스 정보를 확인하고 저장하시오.",
    commands: [
      "enable",
      "show processes",
      "copy running-config startup-config",
    ],
    explanation: "프로세스 확인: show processes",
  },
  {
    id: 31,
    category: "확인 명령어",
    question: "소프트웨어 버전과 IOS 버전 등을 확인하십시오.",
    commands: ["enable", "show version", "copy running-config startup-config"],
    explanation: "버전 확인: show version",
  },
];

// 케이블 제작 문제 데이터
const cableProblems: CableProblem[] = [
  {
    id: 1,
    device1: "PC",
    device2: "Hub",
    cableType: "direct",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: DIRECT_CABLE,
    },
  },
  {
    id: 2,
    device1: "Hub",
    device2: "Router",
    cableType: "direct",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: DIRECT_CABLE,
    },
  },
  {
    id: 3,
    device1: "PC",
    device2: "Router",
    cableType: "direct",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: DIRECT_CABLE,
    },
  },
  {
    id: 4,
    device1: "PC",
    device2: "PC",
    cableType: "cross",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: CROSS_CABLE_SIDE2,
    },
  },
  {
    id: 5,
    device1: "Hub",
    device2: "Hub",
    cableType: "cross",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: CROSS_CABLE_SIDE2,
    },
  },
  {
    id: 6,
    device1: "Router",
    device2: "Router",
    cableType: "cross",
    correctAnswer: {
      side1: DIRECT_CABLE,
      side2: CROSS_CABLE_SIDE2,
    },
  },
];

// 윈도우 설정 퀴즈 컴포넌트
function WindowsSettingsQuiz({ onBack }: { onBack: () => void }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Partial<AllAnswerTypes>>({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentProblem = windowsProblems[currentProblemIndex];

  const handleSubmit = () => {
    const correct = checkWindowsAnswers(currentProblem, userInputs);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentProblemIndex < windowsProblems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserInputs({});
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const checkWindowsAnswers = (
    problem: WindowsSettingsProblem,
    inputs: Partial<AllAnswerTypes>,
  ): boolean => {
    const { correctAnswers } = problem;

    // 배열 비교 (groups 필드)
    if ("groups" in correctAnswers && Array.isArray(correctAnswers.groups)) {
      const userGroups = (inputs as Partial<UserAnswers>).groups || [];
      const correctGroups = correctAnswers.groups;
      if (userGroups.length !== correctGroups.length) return false;
      if (!correctGroups.every((g) => userGroups.includes(g))) return false;
    }

    return Object.keys(correctAnswers).every((key) => {
      if (key === "groups") return true; // 이미 위에서 체크함
      const inputValue = inputs[key as keyof AllAnswerTypes];
      const correctValue = correctAnswers[key as keyof AllAnswerTypes];
      if (correctValue === undefined) return true;
      return (
        String(inputValue)?.toLowerCase().trim() ===
        String(correctValue)?.toLowerCase().trim()
      );
    });
  };

  return (
    <div className="container">
      <div className="windows-settings-page">
        <div className="windows-header">
          <button className="back-button-small" onClick={onBack}>
            ← 뒤로
          </button>
          <h1 className="windows-title">🪟 윈도우 설정 문제</h1>
          <div className="problem-counter">
            {currentProblemIndex + 1} / {windowsProblems.length}
          </div>
        </div>

        <div className="windows-problem-card">
          <h2 className="problem-title">{currentProblem.title}</h2>
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
                    {currentProblemIndex < windowsProblems.length - 1 && (
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

// 네트워크 설정 GUI 컴포넌트
function NetworkSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: NetworkAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<NetworkAnswers>;

  const handleChange = (field: keyof NetworkAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof NetworkAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">
            인터넷 프로토콜 버전 4 (TCP/IPv4) 속성
          </span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <label className="radio-option">
              <input type="radio" checked readOnly />
              <span>다음 IP 주소 사용:</span>
            </label>

            <div className="input-group">
              <label className="input-label">IP 주소(I):</label>
              <input
                type="text"
                className={getInputClass("ip")}
                value={inputs.ip || ""}
                onChange={(e) => handleChange("ip", e.target.value)}
                placeholder="192.168.100.57"
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">서브넷 마스크(U):</label>
              <input
                type="text"
                className={getInputClass("subnet")}
                value={inputs.subnet || ""}
                onChange={(e) => handleChange("subnet", e.target.value)}
                placeholder="255.255.255.0"
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">기본 게이트웨이(D):</label>
              <input
                type="text"
                className={getInputClass("gateway")}
                value={inputs.gateway || ""}
                onChange={(e) => handleChange("gateway", e.target.value)}
                placeholder="192.168.100.1"
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.dns && (
            <div className="dialog-section">
              <label className="radio-option">
                <input type="radio" checked readOnly />
                <span>다음 DNS 서버 주소 사용:</span>
              </label>

              <div className="input-group">
                <label className="input-label">기본 설정 DNS 서버(P):</label>
                <input
                  type="text"
                  className={getInputClass("dns")}
                  value={inputs.dns || ""}
                  onChange={(e) => handleChange("dns", e.target.value)}
                  placeholder="8.8.8.8"
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DHCP 설정 GUI 컴포넌트
function DHCPSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: DHCPAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<DHCPAnswers>;

  const handleChange = (field: keyof DHCPAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof DHCPAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 범위 마법사</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">IP 주소 범위</h4>

            <div className="input-group">
              <label className="input-label">시작 IP 주소:</label>
              <input
                type="text"
                className={getInputClass("startIP")}
                value={inputs.startIP || ""}
                onChange={(e) => handleChange("startIP", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">종료 IP 주소:</label>
              <input
                type="text"
                className={getInputClass("endIP")}
                value={inputs.endIP || ""}
                onChange={(e) => handleChange("endIP", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">서브넷 마스크:</label>
              <input
                type="text"
                className={getInputClass("subnet")}
                value={inputs.subnet || ""}
                onChange={(e) => handleChange("subnet", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.excludeStart && (
            <div className="dialog-section">
              <h4 className="section-title">제외할 주소</h4>

              <div className="input-group">
                <label className="input-label">시작 IP:</label>
                <input
                  type="text"
                  className={getInputClass("excludeStart")}
                  value={inputs.excludeStart || ""}
                  onChange={(e) => handleChange("excludeStart", e.target.value)}
                  disabled={showResult}
                />
              </div>

              <div className="input-group">
                <label className="input-label">종료 IP:</label>
                <input
                  type="text"
                  className={getInputClass("excludeEnd")}
                  value={inputs.excludeEnd || ""}
                  onChange={(e) => handleChange("excludeEnd", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}

          {correctAnswers.leaseHours && (
            <div className="dialog-section">
              <h4 className="section-title">임대 기간</h4>

              <div className="input-group">
                <label className="input-label">시간:</label>
                <input
                  type="text"
                  className={getInputClass("leaseHours")}
                  value={inputs.leaseHours || ""}
                  onChange={(e) => handleChange("leaseHours", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}

          {correctAnswers.gateway && (
            <div className="dialog-section">
              <h4 className="section-title">라우터 (기본 게이트웨이)</h4>

              <div className="input-group">
                <label className="input-label">IP 주소:</label>
                <input
                  type="text"
                  className={getInputClass("gateway")}
                  value={inputs.gateway || ""}
                  onChange={(e) => handleChange("gateway", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// FTP 설정 GUI 컴포넌트
function FTPSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: FTPAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<FTPAnswers>;

  const handleChange = (field: keyof FTPAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof FTPAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">FTP 사이트 추가</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">FTP 사이트 이름:</label>
              <input
                type="text"
                className={getInputClass("siteName")}
                value={inputs.siteName || ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">IP 주소:</label>
              <input
                type="text"
                className={getInputClass("ip")}
                value={inputs.ip || ""}
                onChange={(e) => handleChange("ip", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">포트:</label>
              <input
                type="text"
                className={getInputClass("port")}
                value={inputs.port || ""}
                onChange={(e) => handleChange("port", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.welcomeMessage && (
            <div className="dialog-section">
              <h4 className="section-title">메시지</h4>

              <div className="input-group">
                <label className="input-label">시작 메시지:</label>
                <input
                  type="text"
                  className={getInputClass("welcomeMessage")}
                  value={inputs.welcomeMessage || ""}
                  onChange={(e) =>
                    handleChange("welcomeMessage", e.target.value)
                  }
                  disabled={showResult}
                />
              </div>

              {correctAnswers.exitMessage && (
                <div className="input-group">
                  <label className="input-label">종료 메시지:</label>
                  <input
                    type="text"
                    className={getInputClass("exitMessage")}
                    value={inputs.exitMessage || ""}
                    onChange={(e) =>
                      handleChange("exitMessage", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DNS 설정 GUI 컴포넌트
function DNSSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: DNSAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<DNSAnswers>;

  const handleChange = (field: keyof DNSAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof DNSAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 영역 마법사</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">영역 이름:</label>
              <input
                type="text"
                className={getInputClass("zoneName")}
                value={inputs.zoneName || ""}
                onChange={(e) => handleChange("zoneName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">영역 유형:</label>
              <input
                type="text"
                className={getInputClass("zoneType")}
                value={inputs.zoneType || ""}
                onChange={(e) => handleChange("zoneType", e.target.value)}
                placeholder="주 영역"
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.hostName && (
            <div className="dialog-section">
              <h4 className="section-title">새 호스트</h4>

              <div className="input-group">
                <label className="input-label">호스트 이름:</label>
                <input
                  type="text"
                  className={getInputClass("hostName")}
                  value={inputs.hostName || ""}
                  onChange={(e) => handleChange("hostName", e.target.value)}
                  disabled={showResult}
                />
              </div>

              {correctAnswers.hostIP && (
                <div className="input-group">
                  <label className="input-label">IP 주소:</label>
                  <input
                    type="text"
                    className={getInputClass("hostIP")}
                    value={inputs.hostIP || ""}
                    onChange={(e) => handleChange("hostIP", e.target.value)}
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 로컬 보안 정책 GUI 컴포넌트
function SecuritySettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: SecurityAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<SecurityAnswers>;

  const handleChange = (field: keyof SecurityAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof SecurityAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">로컬 보안 정책</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          {correctAnswers.loginMessage && (
            <div className="dialog-section">
              <h4 className="section-title">보안 옵션</h4>

              <div className="input-group">
                <label className="input-label">로그온 메시지 제목:</label>
                <input
                  type="text"
                  className={getInputClass("loginMessage")}
                  value={inputs.loginMessage || ""}
                  onChange={(e) => handleChange("loginMessage", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}

          {(correctAnswers.minPasswordAge || correctAnswers.maxPasswordAge) && (
            <div className="dialog-section">
              <h4 className="section-title">암호 정책</h4>

              {correctAnswers.minPasswordAge && (
                <div className="input-group">
                  <label className="input-label">
                    최소 암호 사용 기간 (일):
                  </label>
                  <input
                    type="text"
                    className={getInputClass("minPasswordAge")}
                    value={inputs.minPasswordAge || ""}
                    onChange={(e) =>
                      handleChange("minPasswordAge", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}

              {correctAnswers.maxPasswordAge && (
                <div className="input-group">
                  <label className="input-label">
                    최대 암호 사용 기간 (일):
                  </label>
                  <input
                    type="text"
                    className={getInputClass("maxPasswordAge")}
                    value={inputs.maxPasswordAge || ""}
                    onChange={(e) =>
                      handleChange("maxPasswordAge", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}

          {(correctAnswers.lockoutAttempts ||
            correctAnswers.lockoutDuration) && (
            <div className="dialog-section">
              <h4 className="section-title">계정 잠금 정책</h4>

              {correctAnswers.lockoutAttempts && (
                <div className="input-group">
                  <label className="input-label">계정 잠금 임계값 (회):</label>
                  <input
                    type="text"
                    className={getInputClass("lockoutAttempts")}
                    value={inputs.lockoutAttempts || ""}
                    onChange={(e) =>
                      handleChange("lockoutAttempts", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}

              {correctAnswers.lockoutDuration && (
                <div className="input-group">
                  <label className="input-label">계정 잠금 기간 (분):</label>
                  <input
                    type="text"
                    className={getInputClass("lockoutDuration")}
                    value={inputs.lockoutDuration || ""}
                    onChange={(e) =>
                      handleChange("lockoutDuration", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 웹사이트 설정 GUI 컴포넌트
function WebsiteSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: WebsiteAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<WebsiteAnswers>;

  const handleChange = (field: keyof WebsiteAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof WebsiteAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">사이트 추가</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">사이트 이름:</label>
              <input
                type="text"
                className={getInputClass("siteName")}
                value={inputs.siteName || ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">IP 주소:</label>
              <input
                type="text"
                className={getInputClass("ip")}
                value={inputs.ip || ""}
                onChange={(e) => handleChange("ip", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">포트:</label>
              <input
                type="text"
                className={getInputClass("port")}
                value={inputs.port || ""}
                onChange={(e) => handleChange("port", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">실제 경로:</label>
              <input
                type="text"
                className={getInputClass("physicalPath")}
                value={inputs.physicalPath || ""}
                onChange={(e) => handleChange("physicalPath", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.defaultDocument && (
            <div className="dialog-section">
              <h4 className="section-title">기본 문서</h4>

              <div className="input-group">
                <label className="input-label">파일 이름:</label>
                <input
                  type="text"
                  className={getInputClass("defaultDocument")}
                  value={inputs.defaultDocument || ""}
                  onChange={(e) =>
                    handleChange("defaultDocument", e.target.value)
                  }
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 사용자 및 그룹 설정 GUI 컴포넌트
function UserSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: UserAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<UserAnswers>;

  const handleChange = (field: keyof UserAnswers, value: string | string[]) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const handleGroupsChange = (value: string) => {
    const groups = value
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g);
    handleChange("groups", groups);
  };

  const getInputClass = (field: keyof UserAnswers) => {
    if (!showResult) return "windows-input";
    if (field === "groups") {
      const userGroups = inputs.groups || [];
      const correctGroups = correctAnswers.groups;
      const isCorrect =
        userGroups.length === correctGroups.length &&
        correctGroups.every((g) => userGroups.includes(g));
      return `windows-input ${isCorrect ? "input-correct" : "input-incorrect"}`;
    }
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 사용자</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">사용자 이름:</label>
              <input
                type="text"
                className={getInputClass("username")}
                value={inputs.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">전체 이름:</label>
              <input
                type="text"
                className={getInputClass("fullName")}
                value={inputs.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">암호:</label>
              <input
                type="password"
                className={getInputClass("password")}
                value={inputs.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          <div className="dialog-section">
            <h4 className="section-title">소속 그룹</h4>

            <div className="input-group">
              <label className="input-label">그룹 (쉼표로 구분):</label>
              <input
                type="text"
                className={getInputClass("groups")}
                value={inputs.groups?.join(", ") || ""}
                onChange={(e) => handleGroupsChange(e.target.value)}
                placeholder="Administrators, Users"
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.sessionMinutes && (
            <div className="dialog-section">
              <h4 className="section-title">세션 설정</h4>

              <div className="input-group">
                <label className="input-label">세션 제한 (분):</label>
                <input
                  type="text"
                  className={getInputClass("sessionMinutes")}
                  value={inputs.sessionMinutes || ""}
                  onChange={(e) =>
                    handleChange("sessionMinutes", e.target.value)
                  }
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 라우터 설정 퀴즈 컴포넌트
function RouterSettingsQuiz({ onBack }: { onBack: () => void }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userCommands, setUserCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const currentProblem = routerProblems[currentProblemIndex];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const newCommands = [...userCommands, currentCommand.trim()];
    setUserCommands(newCommands);
    setCommandHistory([...commandHistory, `Router> ${currentCommand}`]);
    setCurrentCommand("");
  };

  const handleCheck = () => {
    const correct = checkRouterCommands(currentProblem.commands, userCommands);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentProblemIndex < routerProblems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserCommands([]);
      setCurrentCommand("");
      setShowResult(false);
      setIsCorrect(false);
      setCommandHistory([]);
    }
  };

  const handleReset = () => {
    setUserCommands([]);
    setCurrentCommand("");
    setShowResult(false);
    setCommandHistory([]);
  };

  const checkRouterCommands = (
    correctCommands: string[],
    userCommands: string[],
  ): boolean => {
    if (userCommands.length !== correctCommands.length) return false;

    return correctCommands.every((correctCmd, index) => {
      const userCmd = userCommands[index];
      // 공백 제거 후 소문자로 비교
      const normalizedCorrect = correctCmd
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      const normalizedUser = userCmd.toLowerCase().replace(/\s+/g, " ").trim();

      // 축약형 명령어 처리
      if (normalizedUser === normalizedCorrect) return true;

      // 축약형 허용 (예: conf t = configure terminal)
      const abbreviations: { [key: string]: string[] } = {
        enable: ["en", "enable"],
        "configure terminal": ["conf t", "config t", "configure terminal"],
        "interface fastethernet": [
          "int fa",
          "int fastethernet",
          "interface fa",
          "interface fastethernet",
        ],
        "interface serial": [
          "int s",
          "int serial",
          "interface s",
          "interface serial",
        ],
        "no shutdown": ["no sh", "no shut", "no shutdown"],
        "copy running-config startup-config": [
          "copy run start",
          "copy running-config startup-config",
          "wr",
        ],
        "line console": ["line con", "line console"],
        "line vty": ["line vty"],
        "ip address": ["ip add", "ip addr", "ip address"],
        "router ospf": ["r ospf", "router ospf"],
        "show ip interface brief": [
          "sh ip int br",
          "show ip int br",
          "show ip interface brief",
        ],
        "show ip route": ["sh ip ro", "sh ip route", "show ip route"],
        "show version": ["sh ver", "sh version", "show version"],
        "show flash": ["sh flash", "show flash"],
        "show users": ["sh users", "show users"],
        "show processes": ["sh proc", "sh processes", "show processes"],
      };

      // 각 축약형 체크
      for (const [fullCmd, abbrs] of Object.entries(abbreviations)) {
        if (normalizedCorrect.includes(fullCmd)) {
          for (const abbr of abbrs) {
            const testCmd = normalizedCorrect.replace(fullCmd, abbr);
            if (normalizedUser === testCmd) return true;
          }
        }
      }

      return false;
    });
  };

  return (
    <div className="container">
      <div className="router-settings-page">
        <div className="router-header">
          <button className="back-button-small" onClick={onBack}>
            ← 뒤로
          </button>
          <h1 className="router-title">🔧 라우터 설정 문제</h1>
          <div className="problem-counter">
            {currentProblemIndex + 1} / {routerProblems.length}
          </div>
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
                {commandHistory.map((cmd, index) => (
                  <div key={index} className="terminal-line">
                    {cmd}
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
                    {currentProblemIndex < routerProblems.length - 1 && (
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
                      {currentProblemIndex < routerProblems.length - 1 && (
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

  const [side1Wires, setSide1Wires] = useState<string[]>(Array(8).fill(""));
  const [side2Wires, setSide2Wires] = useState<string[]>(Array(8).fill(""));
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const colorKeys = Object.keys(CABLE_COLORS);

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
    setSide1Wires(Array(8).fill(""));
    setSide2Wires(Array(8).fill(""));
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
    const shuffledWindows = [...windowsProblems].sort(
      () => Math.random() - 0.5,
    );
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

  const checkWindowsAnswers = (
    problem: WindowsSettingsProblem,
    inputs: Partial<AllAnswerTypes>,
  ): boolean => {
    const { correctAnswers } = problem;

    if ("groups" in correctAnswers && Array.isArray(correctAnswers.groups)) {
      const userGroups = (inputs as Partial<UserAnswers>).groups || [];
      const correctGroups = correctAnswers.groups;
      if (userGroups.length !== correctGroups.length) return false;
      if (!correctGroups.every((g) => userGroups.includes(g))) return false;
    }

    return Object.keys(correctAnswers).every((key) => {
      if (key === "groups") return true;
      const inputValue = inputs[key as keyof AllAnswerTypes];
      const correctValue = correctAnswers[key as keyof AllAnswerTypes];
      if (correctValue === undefined) return true;
      return (
        String(inputValue)?.toLowerCase().trim() ===
        String(correctValue)?.toLowerCase().trim()
      );
    });
  };

  const handleWindowsSubmit = (inputs: Partial<AllAnswerTypes>) => {
    if (currentProblem.type !== "windows") return false;

    const isCorrect = checkWindowsAnswers(currentProblem.problem, inputs);
    setScores((prev) => ({
      ...prev,
      [currentProblemIndex]: isCorrect ? currentProblem.points : 0,
    }));
    return isCorrect;
  };

  const handleShortAnswerSubmit = (answer: string) => {
    if (currentProblem.type !== "shortAnswer") return false;

    const isCorrect =
      answer.trim().toLowerCase() ===
      currentProblem.problem.answer.toLowerCase();
    setScores((prev) => ({
      ...prev,
      [currentProblemIndex]: isCorrect ? currentProblem.points : 0,
    }));
    return isCorrect;
  };

  const checkRouterCommands = (
    correctCommands: string[],
    userCommands: string[],
  ): boolean => {
    if (userCommands.length !== correctCommands.length) return false;

    return correctCommands.every((correctCmd, index) => {
      const userCmd = userCommands[index];
      const normalizedCorrect = correctCmd
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      const normalizedUser = userCmd.toLowerCase().replace(/\s+/g, " ").trim();

      if (normalizedUser === normalizedCorrect) return true;

      const abbreviations: { [key: string]: string[] } = {
        enable: ["en", "enable"],
        "configure terminal": ["conf t", "config t", "configure terminal"],
        "interface fastethernet": [
          "int fa",
          "int fastethernet",
          "interface fa",
          "interface fastethernet",
        ],
        "interface serial": [
          "int s",
          "int serial",
          "interface s",
          "interface serial",
        ],
        "no shutdown": ["no sh", "no shut", "no shutdown"],
        "copy running-config startup-config": [
          "copy run start",
          "copy running-config startup-config",
          "wr",
        ],
        "line console": ["line con", "line console"],
        "line vty": ["line vty"],
        "ip address": ["ip add", "ip addr", "ip address"],
        "router ospf": ["r ospf", "router ospf"],
        "show ip interface brief": [
          "sh ip int br",
          "show ip int br",
          "show ip interface brief",
        ],
        "show ip route": ["sh ip ro", "sh ip route", "show ip route"],
        "show version": ["sh ver", "sh version", "show version"],
        "show flash": ["sh flash", "show flash"],
        "show users": ["sh users", "show users"],
        "show processes": ["sh proc", "sh processes", "show processes"],
      };

      for (const [fullCmd, abbrs] of Object.entries(abbreviations)) {
        if (normalizedCorrect.includes(fullCmd)) {
          for (const abbr of abbrs) {
            const testCmd = normalizedCorrect.replace(fullCmd, abbr);
            if (normalizedUser === testCmd) return true;
          }
        }
      }

      return false;
    });
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
            {examProblems.map((problem, idx) => (
              <div key={idx} className="exam-result-item">
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
                  className={`result-score ${(scores[idx] || 0) > 0 ? "correct" : "incorrect"}`}
                >
                  {(scores[idx] || 0).toFixed(1)} / {problem.points}점
                </span>
              </div>
            ))}
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
          <button className="back-button-small" onClick={onBack}>
            ← 뒤로
          </button>
          <h1 className="mock-exam-title">📝 모의고사</h1>
          <div className="problem-counter">
            {currentProblem.questionNumber} / 18
          </div>
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
            problem={currentProblem.problem}
            onSubmit={handleCableSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}

        {currentProblem.type === "windows" && (
          <WindowsProblemInExam
            problem={currentProblem.problem}
            onSubmit={handleWindowsSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}

        {currentProblem.type === "shortAnswer" && (
          <ShortAnswerProblemInExam
            problem={currentProblem.problem}
            onSubmit={handleShortAnswerSubmit}
            onNext={goToNextProblem}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        )}

        {currentProblem.type === "router" && (
          <RouterProblemInExam
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

  const colorKeys = Object.keys(CABLE_COLORS);

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
  onSubmit: (inputs: Partial<AllAnswerTypes>) => boolean;
  onNext: () => void;
  showResult: boolean;
  setShowResult: (show: boolean) => void;
}) => {
  const [userInputs, setUserInputs] = useState<Partial<AllAnswerTypes>>({});
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const result = onSubmit(userInputs);
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
      default:
        return null;
    }
  };

  return (
    <div className="exam-problem-content">
      <h2 className="exam-problem-title">{problem.title}</h2>
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
      <p className="exam-problem-hint">💡 {problem.description}</p>

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
    const result = onSubmit(commands);
    setIsCorrect(result);
    setShowResult(true);
  };

  const clearCommands = () => {
    setCommands([]);
    setCurrentInput("");
  };

  return (
    <div className="exam-problem-content">
      <div className="exam-problem-category">{problem.category}</div>
      <h2 className="exam-problem-title">라우터 설정</h2>
      <p className="exam-problem-question">{problem.question}</p>

      <div className="router-terminal">
        <div className="terminal-header">
          <span>Router Configuration</span>
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

      <div className="terminal-hint">💡 {problem.explanation}</div>

      {!showResult ? (
        <div className="exam-terminal-controls">
          <button onClick={handleSubmit} className="submit-exam-button">
            제출
          </button>
          <button onClick={clearCommands} className="clear-exam-button">
            초기화
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
