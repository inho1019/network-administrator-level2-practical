// Page Types
export type PageType =
  | "start"
  | "menu"
  | "quiz"
  | "result"
  | "windows-settings"
  | "router-settings"
  | "cable-making"
  | "mock-exam"
  | "exam-info";

// Quiz Question Types
export type QuestionType = "short-answer" | "multiple-choice";

export interface Question {
  question: string;
  answer: string | string[];
  description: string;
  type: QuestionType;
  options?: string[]; // 선택형 문제의 보기 목록
}

// Windows Settings Types
export interface NetworkAnswers {
  ip: string;
  subnet: string;
  gateway: string;
  dns?: string;
}

export interface DHCPAnswers {
  startIP: string;
  endIP: string;
  subnet: string;
  excludeStart?: string;
  excludeEnd?: string;
  leaseHours?: string;
  gateway?: string;
}

export interface FTPAnswers {
  siteName: string;
  ip: string;
  port: string;
  welcomeMessage?: string;
  exitMessage?: string;
}

export interface DNSAnswers {
  zoneName?: string;
  zoneType: string;
  hostName?: string;
  hostIP?: string;
  // 역방향 조회 영역용
  networkID?: string;
  ptrIP?: string;
  ptrHostName?: string;
}

export interface SecurityAnswers {
  loginMessage?: string;
  minPasswordAge?: string;
  maxPasswordAge?: string;
  lockoutAttempts?: string;
  lockoutDuration?: string;
  // 계정 잠금 정책용
  lockoutThreshold?: string;
  resetCounter?: string;
  // 암호 정책용
  minPasswordLength?: string;
  passwordComplexity?: string;
}

export interface WebsiteAnswers {
  siteName: string;
  ip: string;
  port: string;
  physicalPath: string;
  defaultDocument?: string;
}

export interface UserAnswers {
  username: string;
  fullName: string;
  password: string;
  groups: string[];
  sessionMinutes?: string;
}

export interface ServiceAnswers {
  serviceName: string;
  startupType?: string;
  serviceStatus?: string;
}

// 방화벽 규칙
export interface FirewallAnswers {
  ruleName: string;
  port: string;
  protocol: string;
  action: string;
}

// 공유 폴더
export interface ShareAnswers {
  folderPath: string;
  shareName: string;
  sharePermission: string;
  ntfsPermission: string;
}

// 디스크 관리
export interface DiskAnswers {
  volumeSize: string;
  driveLetter: string;
  fileSystem: string;
  raidType?: string;
}

// IIS 설정
export interface IISAnswers {
  siteName: string;
  defaultDoc1?: string;
  defaultDoc2?: string;
  defaultDoc3?: string;
  directoryBrowsing?: string;
}

export type AllAnswerTypes =
  | NetworkAnswers
  | DHCPAnswers
  | FTPAnswers
  | DNSAnswers
  | SecurityAnswers
  | WebsiteAnswers
  | UserAnswers
  | ServiceAnswers
  | FirewallAnswers
  | ShareAnswers
  | DiskAnswers
  | IISAnswers;

export interface WindowsSettingsProblem {
  id: number;
  type:
    | "network"
    | "dhcp"
    | "ftp"
    | "dns"
    | "security"
    | "website"
    | "user"
    | "service"
    | "firewall"
    | "share"
    | "disk"
    | "iis";
  title: string;
  description: string;
  accessPath: string[];
  correctAnswers: AllAnswerTypes;
}

// Router Settings Types
export interface RouterProblem {
  id: number;
  category: string;
  question: string;
  commands: string[];
  explanation: string;
}

// Cable Making Types
export interface CableProblem {
  id: number;
  device1: string;
  device2: string;
  cableType: "direct" | "cross";
  correctAnswer: {
    side1: string[];
    side2: string[];
  };
}

export interface CableColors {
  [key: string]: string;
}

// Mock Exam Types
export interface MockExamProblem {
  id: number;
  type: "short-answer" | "windows" | "router" | "cable";
  problem: Question | WindowsSettingsProblem | RouterProblem | CableProblem;
  points: number;
}
