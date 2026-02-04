import type { WindowsSettingsProblem } from "../types";

export const windowsProblems: WindowsSettingsProblem[] = [
  {
    id: 1,
    type: "network",
    title: "#1 네트워크 속성 설정",
    description:
      "네트워크: 192.168.100.56/29\n서브넷 마스크: /29에 해당하는 값\nIP: 사용 가능한 첫번째 호스트 IP 주소\nGateway: 사용 가능한 마지막 호스트 IP 주소",
    accessPath: [
      "제어판",
      "네트워크 및 인터넷",
      "네트워크 연결",
      "이더넷 우클릭",
      "속성",
      "IPv4 속성",
    ],
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
    accessPath: [
      "제어판",
      "네트워크 및 인터넷",
      "네트워크 연결",
      "이더넷 우클릭",
      "속성",
      "IPv4 속성",
    ],
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
    accessPath: ["서버 관리자", "도구", "DHCP", "IPv4 우클릭", "새 범위"],
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
    accessPath: [
      "서버 관리자",
      "도구",
      "IIS(인터넷 정보 서비스) 관리자",
      "사이트 우클릭",
      "FTP 사이트 추가",
    ],
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
    accessPath: [
      "서버 관리자",
      "도구",
      "DNS",
      "정방향 조회 영역 우클릭",
      "새 영역",
    ],
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
    accessPath: ["제어판", "관리 도구", "로컬 보안 정책", "로컬 정책"],
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
    accessPath: [
      "서버 관리자",
      "도구",
      "IIS(인터넷 정보 서비스) 관리자",
      "사이트 우클릭",
      "웹 사이트 추가",
    ],
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
    accessPath: [
      "제어판",
      "관리 도구",
      "컴퓨터 관리",
      "로컬 사용자 및 그룹",
      "사용자 우클릭",
      "새 사용자",
    ],
    correctAnswers: {
      username: "testuser",
      fullName: "Test User",
      password: "P@ssw0rd",
      groups: ["Administrators", "Users"],
      sessionMinutes: "60",
    },
  },
  {
    id: 9,
    type: "service",
    title: "#10 Windows 푸시 알림 시스템 서비스 (2022년 3회)",
    description:
      "이 서비스는 세션 0에서 실행되며 디바이스와 WNS 서버 사이의 연결을 처리하는 알림 플랫폼 및 연결 공급자를 호스트합니다.\n\n설정 요구사항:\n시작 유형: 사용안함\n서비스 상태: 중지",
    accessPath: [
      "서버 관리자",
      "도구",
      "서비스",
      "Windows Push Notifications System Service 더블클릭",
    ],
    correctAnswers: {
      serviceName: "Windows Push Notifications System Service",
      startupType: "사용안함",
      serviceStatus: "중지",
    },
  },
  {
    id: 10,
    type: "service",
    title: "#11 IP Helper 서비스 (2022년 2회)",
    description:
      "IPv6 전환 기술과 IP-HTTPS를 사용하여 터널 연결을 제공합니다.\n\n설정 요구사항:\n서비스 상태: 실행 중",
    accessPath: ["서버 관리자", "도구", "서비스", "IP Helper 더블클릭"],
    correctAnswers: {
      serviceName: "IP Helper",
      serviceStatus: "실행 중",
    },
  },
  {
    id: 11,
    type: "service",
    title: "#12 Windows Process Activation Service (2022년 1회)",
    description:
      "메시지로 활성화되는 응용프로그램에 프로세스 활성화, 리소스 관리 및 상태 관리 서비스를 제공합니다.\n\n설정 요구사항:\n서비스 상태: 실행 중",
    accessPath: [
      "서버 관리자",
      "도구",
      "서비스",
      "Windows Process Activation Service 더블클릭",
    ],
    correctAnswers: {
      serviceName: "Windows Process Activation Service",
      serviceStatus: "실행 중",
    },
  },
  {
    id: 12,
    type: "service",
    title: "#13 Microsoft iSCSI Initiator Service (2021년 3회)",
    description:
      "NAS에서 하드디스크로 데이터 전송을 위해 iSCSI 서비스를 실행하고 재부팅 이후에도 서비스가 유지되도록 설정하시오.\n\n설정 요구사항:\n시작 유형: 자동\n서비스 상태: 실행 중",
    accessPath: [
      "서버 관리자",
      "도구",
      "서비스",
      "Microsoft iSCSI Initiator Service 더블클릭",
    ],
    correctAnswers: {
      serviceName: "Microsoft iSCSI Initiator Service",
      startupType: "자동",
      serviceStatus: "실행 중",
    },
  },
  {
    id: 13,
    type: "service",
    title: "#14 Encrypting File System (EFS) (2021년 2회)",
    description:
      "암호화된 파일을 NTFS 파일 시스템 볼륨에 저장하는데 사용되는 핵심 파일 암호화 기술을 제공합니다. 이 서비스를 중지하거나 사용하지 않도록 설정하면 응용프로그램에서 암호화된 파일에 액세스하지 못하게 됩니다.\n\n설정 요구사항:\n서비스 상태: 실행 중",
    accessPath: [
      "서버 관리자",
      "도구",
      "서비스",
      "Encrypting File System (EFS) 더블클릭",
    ],
    correctAnswers: {
      serviceName: "Encrypting File System (EFS)",
      serviceStatus: "실행 중",
    },
  },
  {
    id: 14,
    type: "service",
    title: "#15 Performance Logs & Alerts (2021년 1회)",
    description:
      "성능 로그 및 경고는 미리 구성된 일정 매개 변수에 따라 로컬 또는 원격 컴퓨터에서 성능 데이터를 수집한 다음 이 데이터를 로그에 기록하거나 경고를 트리거 합니다. 이 서비스가 중지되면 성능 정보가 수집되지 않습니다.\n\n설정 요구사항:\n서비스 상태: 실행 중",
    accessPath: [
      "서버 관리자",
      "도구",
      "서비스",
      "Performance Logs & Alerts 더블클릭",
    ],
    correctAnswers: {
      serviceName: "Performance Logs & Alerts",
      serviceStatus: "실행 중",
    },
  },
  {
    id: 15,
    type: "service",
    title: "#16 World Wide Web Publishing Service (2020년 2회)",
    description:
      "인터넷 정보 서비스 관리자를 사용하여 웹 연결 및 관리를 제공하는 서비스를 현재 시스템에서 '중지'시키고, 시작 유형을 '사용 안함'으로 설정하시오.\n\n설정 요구사항:\n시작 유형: 사용안함\n서비스 상태: 중지",
    accessPath: [
      "서버 관리자",
      "도구",
      "서비스",
      "World Wide Web Publishing Service 더블클릭",
    ],
    correctAnswers: {
      serviceName: "World Wide Web Publishing Service",
      startupType: "사용안함",
      serviceStatus: "중지",
    },
  },
  {
    id: 16,
    type: "service",
    title: "#17 Telnet 서비스 중지",
    description:
      "원격 사용자가 Telnet을 이용하여 파일을 삭제해 왔으나 정책이 변경되어 원격 사용자가 더 이상 로그온 할 필요가 없어졌다. 해당 기능을 중지시키고, 다시 시작할 수 없게 설정하시오.\n\n설정 요구사항:\n시작 유형: 사용안함\n서비스 상태: 중지",
    accessPath: ["서버 관리자", "도구", "서비스", "Telnet 더블클릭"],
    correctAnswers: {
      serviceName: "Telnet",
      startupType: "사용안함",
      serviceStatus: "중지",
    },
  },
  {
    id: 17,
    type: "dns",
    title: "#18 DNS 역방향 조회 영역 설정",
    description:
      "역방향 조회 영역을 설정하시오.\n네트워크 ID: 192.168.100\n영역 유형: 주 영역\nPTR 레코드 - IP: 192.168.100.10\nPTR 레코드 - 호스트 이름: www.test.com",
    accessPath: [
      "서버 관리자",
      "도구",
      "DNS",
      "역방향 조회 영역 우클릭",
      "새 영역",
    ],
    correctAnswers: {
      networkID: "192.168.100",
      zoneType: "주 영역",
      ptrIP: "192.168.100.10",
      ptrHostName: "www.test.com",
    },
  },
  {
    id: 18,
    type: "firewall",
    title: "#19 방화벽 인바운드 규칙 설정",
    description:
      "Windows 방화벽에서 HTTP(포트 80) 트래픽을 허용하는 인바운드 규칙을 생성하시오.\n\n규칙 이름: HTTP Allow\n포트: 80\n프로토콜: TCP\n작업: 연결 허용",
    accessPath: [
      "제어판",
      "Windows Defender 방화벽",
      "고급 설정",
      "인바운드 규칙 우클릭",
      "새 규칙",
    ],
    correctAnswers: {
      ruleName: "HTTP Allow",
      port: "80",
      protocol: "TCP",
      action: "연결 허용",
    },
  },
  {
    id: 19,
    type: "firewall",
    title: "#20 방화벽 아웃바운드 규칙 설정",
    description:
      "Windows 방화벽에서 FTP(포트 21) 트래픽을 차단하는 아웃바운드 규칙을 생성하시오.\n\n규칙 이름: FTP Block\n포트: 21\n프로토콜: TCP\n작업: 연결 차단",
    accessPath: [
      "제어판",
      "Windows Defender 방화벽",
      "고급 설정",
      "아웃바운드 규칙 우클릭",
      "새 규칙",
    ],
    correctAnswers: {
      ruleName: "FTP Block",
      port: "21",
      protocol: "TCP",
      action: "연결 차단",
    },
  },
  {
    id: 20,
    type: "share",
    title: "#21 공유 폴더 설정",
    description:
      "폴더를 공유하고 권한을 설정하시오.\n\n폴더 경로: C:\\SharedFolder\n공유 이름: SharedData\n공유 권한: Everyone - 읽기\nNTFS 권한: Administrators - 모든 권한",
    accessPath: ["파일 탐색기", "폴더 우클릭", "속성", "공유 탭", "고급 공유"],
    correctAnswers: {
      folderPath: "C:\\SharedFolder",
      shareName: "SharedData",
      sharePermission: "Everyone - 읽기",
      ntfsPermission: "Administrators - 모든 권한",
    },
  },
  {
    id: 21,
    type: "disk",
    title: "#22 디스크 미러링(RAID 1) 설정",
    description:
      "디스크 관리에서 두 개의 동적 디스크를 사용하여 미러 볼륨을 생성하시오.\n\n볼륨 크기: 10GB\n드라이브 문자: E\n파일 시스템: NTFS",
    accessPath: [
      "서버 관리자",
      "도구",
      "컴퓨터 관리",
      "디스크 관리",
      "디스크 우클릭",
      "새 미러 볼륨",
    ],
    correctAnswers: {
      volumeSize: "10GB",
      driveLetter: "E",
      fileSystem: "NTFS",
      raidType: "미러(RAID 1)",
    },
  },
  {
    id: 22,
    type: "iis",
    title: "#23 IIS 기본 문서 설정",
    description:
      "IIS 웹 사이트의 기본 문서 우선순위를 설정하시오.\n\n사이트 이름: Default Web Site\n기본 문서 순서:\n1. index.html\n2. default.htm\n3. default.asp",
    accessPath: [
      "서버 관리자",
      "도구",
      "IIS(인터넷 정보 서비스) 관리자",
      "사이트 선택",
    ],
    correctAnswers: {
      siteName: "Default Web Site",
      defaultDoc1: "index.html",
      defaultDoc2: "default.htm",
      defaultDoc3: "default.asp",
    },
  },
  {
    id: 23,
    type: "iis",
    title: "#24 IIS 디렉터리 검색 설정",
    description:
      "IIS에서 웹 사이트의 디렉터리 검색 기능을 활성화하시오.\n\n사이트 이름: Default Web Site\n디렉터리 검색: 사용",
    accessPath: [
      "서버 관리자",
      "도구",
      "IIS(인터넷 정보 서비스) 관리자",
      "사이트 선택",
      "디렉터리 검색",
    ],
    correctAnswers: {
      siteName: "Default Web Site",
      directoryBrowsing: "사용",
    },
  },
  {
    id: 24,
    type: "security",
    title: "#25 계정 잠금 정책 설정",
    description:
      "로컬 보안 정책에서 계정 잠금 정책을 설정하시오.\n\n계정 잠금 임계값: 3회\n계정 잠금 기간: 30분\n다음 시간 후 계정 잠금 수를 원래대로 설정: 30분",
    accessPath: ["제어판", "관리 도구", "로컬 보안 정책"],
    correctAnswers: {
      lockoutThreshold: "3",
      lockoutDuration: "30",
      resetCounter: "30",
    },
  },
  {
    id: 25,
    type: "security",
    title: "#26 암호 정책 설정",
    description:
      "로컬 보안 정책에서 암호 정책을 설정하시오.\n\n최소 암호 길이: 8자\n암호는 복잡성을 만족해야 함: 사용\n최대 암호 사용 기간: 90일\n최소 암호 사용 기간: 1일",
    accessPath: ["제어판", "관리 도구", "로컬 보안 정책"],
    correctAnswers: {
      minPasswordLength: "8",
      passwordComplexity: "사용",
      maxPasswordAge: "90",
      minPasswordAge: "1",
    },
  },
];
