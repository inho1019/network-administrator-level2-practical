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
export interface Question {
  question: string;
  answer: string;
  description: string;
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
  zoneName: string;
  zoneType: string;
  hostName?: string;
  hostIP?: string;
}

export interface SecurityAnswers {
  loginMessage?: string;
  minPasswordAge?: string;
  maxPasswordAge?: string;
  lockoutAttempts?: string;
  lockoutDuration?: string;
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

export type AllAnswerTypes =
  | NetworkAnswers
  | DHCPAnswers
  | FTPAnswers
  | DNSAnswers
  | SecurityAnswers
  | WebsiteAnswers
  | UserAnswers
  | ServiceAnswers;

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
    | "service";
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
