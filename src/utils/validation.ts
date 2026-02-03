import type {
  WindowsSettingsProblem,
  AllAnswerTypes,
  UserAnswers,
} from "../types";

/**
 * 윈도우 설정 문제의 답안을 검증합니다.
 */
export const checkWindowsAnswers = (
  problem: WindowsSettingsProblem,
  inputs: Partial<AllAnswerTypes>,
  userPath: string[],
): boolean => {
  const { correctAnswers } = problem;

  // 접근 경로 체크
  if (userPath.length !== problem.accessPath.length) return false;
  const pathCorrect = problem.accessPath.every(
    (step, index) => step === userPath[index],
  );
  if (!pathCorrect) return false;

  // 배열 비교 (groups 필드)
  if ("groups" in correctAnswers && Array.isArray(correctAnswers.groups)) {
    const userGroups = (inputs as Partial<UserAnswers>).groups || [];
    const correctGroups = correctAnswers.groups;
    if (userGroups.length !== correctGroups.length) return false;
    if (!correctGroups.every((g) => userGroups.includes(g))) return false;
  }

  return Object.keys(correctAnswers).every((key) => {
    if (key === "groups") return true; // 이미 위에서 체크함
    if (key === "serviceName") return true; // 서비스 이름은 체크하지 않음 (이미 주어진 값)
    const inputValue = inputs[key as keyof AllAnswerTypes];
    const correctValue = correctAnswers[key as keyof AllAnswerTypes];
    if (correctValue === undefined) return true;
    return (
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim()
    );
  });
};

/**
 * 라우터 명령어를 검증합니다. Cisco IOS 축약형도 지원합니다.
 */
export const checkRouterCommands = (
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

    // 축약형 허용 (Cisco IOS 명령어)
    const abbreviations: { [key: string]: string[] } = {
      enable: ["en", "ena", "enable"],
      "configure terminal": [
        "conf t",
        "config t",
        "conf term",
        "configure terminal",
      ],
      exit: ["ex", "exit"],
      end: ["end"],
      "interface fastethernet": [
        "int fa",
        "int fast",
        "int fastethernet",
        "interface fa",
        "interface fast",
        "interface fastethernet",
      ],
      "interface gigabitethernet": [
        "int gi",
        "int gig",
        "int gigabitethernet",
        "interface gi",
        "interface gig",
        "interface gigabitethernet",
      ],
      "interface serial": [
        "int s",
        "int se",
        "int ser",
        "int serial",
        "interface s",
        "interface se",
        "interface ser",
        "interface serial",
      ],
      "interface ethernet": [
        "int e",
        "int eth",
        "int ethernet",
        "interface e",
        "interface eth",
        "interface ethernet",
      ],
      "no shutdown": ["no sh", "no shut", "no shutdown"],
      shutdown: ["sh", "shut", "shutdown"],
      "copy running-config startup-config": [
        "copy run start",
        "copy r s",
        "copy running-config startup-config",
        "wr",
        "write",
        "write memory",
      ],
      "show running-config": [
        "sh run",
        "sh running",
        "sh running-config",
        "show run",
        "show running",
        "show running-config",
      ],
      "show startup-config": [
        "sh start",
        "sh startup",
        "sh startup-config",
        "show start",
        "show startup",
        "show startup-config",
      ],
      "line console": ["line con", "line console"],
      "line vty": ["line vty"],
      "ip address": ["ip add", "ip addr", "ip address"],
      "ip default-gateway": ["ip def", "ip default", "ip default-gateway"],
      "ip route": ["ip rou", "ip route"],
      "router ospf": ["rou ospf", "router ospf"],
      "router rip": ["rou rip", "router rip"],
      "router eigrp": ["rou eigrp", "router eigrp"],
      network: ["net", "netw", "network"],
      "show ip interface brief": [
        "sh ip int br",
        "sh ip int brief",
        "show ip int br",
        "show ip int brief",
        "show ip interface br",
        "show ip interface brief",
      ],
      "show ip route": [
        "sh ip rou",
        "sh ip route",
        "show ip rou",
        "show ip route",
      ],
      "show version": ["sh ver", "sh version", "show ver", "show version"],
      "show flash": ["sh flash", "show flash"],
      "show users": ["sh users", "show users"],
      "show processes": [
        "sh proc",
        "sh process",
        "sh processes",
        "show proc",
        "show process",
        "show processes",
      ],
      "show interfaces": [
        "sh int",
        "sh inter",
        "sh interfaces",
        "show int",
        "show inter",
        "show interfaces",
      ],
      "show protocols": [
        "sh prot",
        "sh protocol",
        "sh protocols",
        "show prot",
        "show protocol",
        "show protocols",
      ],
      description: ["desc", "descr", "description"],
      "clock rate": ["clock", "clock rate"],
      bandwidth: ["band", "bandw", "bandwidth"],
      "ip dhcp pool": ["ip dhcp pool"],
      "ip dhcp excluded-address": ["ip dhcp excl", "ip dhcp excluded-address"],
      "service password-encryption": [
        "serv pass",
        "serv password",
        "service pass",
        "service password-encryption",
      ],
      password: ["pass", "password"],
      "enable secret": ["ena sec", "enable sec", "enable secret"],
      "enable password": ["ena pass", "enable pass", "enable password"],
      login: ["login"],
      "no login": ["no login"],
      "logging synchronous": [
        "logg sync",
        "logging sync",
        "logging synchronous",
      ],
      "exec-timeout": ["exec", "exec-timeout"],
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

/**
 * 단답형 문제의 답안을 검증합니다.
 */
export const checkShortAnswer = (
  userAnswer: string,
  correctAnswer: string,
): boolean => {
  const normalizedUser = userAnswer.toLowerCase().replace(/\s+/g, "").trim();
  const normalizedCorrect = correctAnswer
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
  return normalizedUser === normalizedCorrect;
};

/**
 * 문제 배열에서 랜덤하게 N개를 선택합니다.
 */
export const getRandomQuestions = <T>(items: T[], count: number): T[] => {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
