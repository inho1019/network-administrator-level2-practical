import type { Question } from "../types";

export const allQuestions: Question[] = [
  // ==================== 리눅스 명령어 ====================
  {
    question: "네트워크 상태를 확인하는 명령어는?",
    answer: "netstat",
    description: "네트워크 상태 확인",
    type: "short-answer",
  },
  {
    question:
      "도메인에 대한 네트워크 경로 확인/라우팅 경로를 추적하는 명령어는? (Windows)",
    answer: "tracert",
    description: "도메인에 대한 네트워크 경로 확인/라우팅 경로 추적 (Windows)",
    type: "short-answer",
  },
  {
    question:
      "도메인에 대한 네트워크 경로 확인/라우팅 경로를 추적하는 명령어는? (Linux)",
    answer: "traceroute",
    description: "도메인에 대한 네트워크 경로 확인/라우팅 경로 추적 (Linux)",
    type: "short-answer",
  },
  {
    question: "메모리 소비율과 CPU 점유율을 실시간으로 모니터링하는 명령어는?",
    answer: "top",
    description: "메모리 소비율과 cpu 점유율 실시간 모니터링",
    type: "short-answer",
  },
  {
    question: "명령어의 메뉴얼을 확인하는 명령어는?",
    answer: "man",
    description: "메뉴얼 확인 명령어",
    type: "short-answer",
  },
  {
    question: "현재 디렉토리 위치를 알려주는 명령어는?",
    answer: "pwd",
    description: "현재 디렉토리 위치 알려줌",
    type: "short-answer",
  },
  {
    question: "계정의 비밀번호를 변경하는 명령어는?",
    answer: "passwd",
    description: "계정 생성 과정",
    type: "short-answer",
  },
  {
    question:
      "특정 도메인에 대한 목적지 IP와의 데이터 통신을 확인하는 명령어는?",
    answer: "ping",
    description: "특정 도메인에 대한 목적지 ip와의 데이터 통신 확인",
    type: "short-answer",
  },
  {
    question: "패키지를 설치하는 명령어는?",
    answer: "install",
    description: "패키지 설치",
    type: "short-answer",
  },
  {
    question: "파일이나 디렉토리를 제거하는 Windows 명령어는?",
    answer: "del",
    description: "제거 (Windows)",
    type: "short-answer",
  },
  {
    question: "디렉토리를 제거하는 Windows 명령어는?",
    answer: "rmdir",
    description: "제거 (Windows/Linux 공통)",
    type: "short-answer",
  },
  {
    question: "파일이나 디렉토리를 제거하는 Linux 명령어는?",
    answer: "rm",
    description: "제거 (Linux)",
    type: "short-answer",
  },
  {
    question: "파일이나 디렉토리의 권한을 설정하는 명령어는?",
    answer: "chmod",
    description: "권한 설정 명령어",
    type: "short-answer",
  },
  {
    question:
      "리눅스에서 사용자는 파일에 모든 권한을 가지고 그룹 및 다른 사용자에게는 읽기, 실행 권한만을 부여하도록 접근 권한을 설정하는 명령어를 작성하시오. (파일이름은 ICQA)",
    answer: "chmod 755 icqa",
    description: "chmod 755 ICQA - 사용자 rwx(7), 그룹/기타 r-x(5)",
    type: "short-answer",
  },
  {
    question:
      "ping을 정상적으로 사용할 수 있도록 (A)를 채우시오. `#echo (A) > /proc/sys/net/icmp_echo_ignore_all`",
    answer: "0",
    description: "0 = ping 허용, 1 = ping 차단",
    type: "short-answer",
  },
  {
    question:
      "init은 리눅스 기본 프로세스이다. 시스템을 종료하기 위한 init의 옵션은 무엇인가?",
    answer: "0",
    description: "init 0 - 시스템 종료 (또는 poweroff, halt, shutdown -h now)",
    type: "short-answer",
  },

  // ==================== 네트워크 보안 기술 ====================
  {
    question:
      "웹 애플리케이션을 보호하는 방화벽으로, 트래픽을 감지하여 해킹을 차단하는 기술은?",
    answer: "waf",
    description: "Web Application Firewall - 방화벽, 트래픽 감지하여 해킹 차단",
    type: "short-answer",
  },
  {
    question: "네트워크 침입을 차단하는 시스템은?",
    answer: "ips",
    description: "네트워크 침입 차단",
    type: "short-answer",
  },
  {
    question:
      "허가되지 않은 도청이나 데이터 변경을 방지하며, VPN 구축에 주로 사용되는 프로토콜은?",
    answer: "ipsec",
    description:
      "허가되지 않은 도청이나 데이터 변경 방지, VPN 구축에 주로 사용",
    type: "short-answer",
  },
  {
    question:
      "다양한 보안 솔루션을 하나로 묶어서 운영하는 통합 위협 관리 시스템은?",
    answer: "utm",
    description: "통합 위협 관리 - 다양한 보안 솔루션을 하나로 묶어서 운영",
    type: "short-answer",
  },
  {
    question: "네트워크 트래픽을 모니터링하고 제어하는 네트워크 보안 시스템은?",
    answer: "방화벽",
    description: "Firewall - 네트워크 트래픽 모니터링 및 제어",
    type: "short-answer",
  },

  // ==================== 네트워크 기술 ====================
  {
    question: "논리적 LAN을 구성하는 기술로, VTP 키워드와 관련이 있는 것은?",
    answer: "vlan",
    description: "논리 LAN, VTP 키워드 확인",
    type: "short-answer",
  },
  {
    question:
      "가상 보안 네트워크를 구성하며, '터널' 키워드와 관련이 있는 기술은?",
    answer: "vpn",
    description: "가상 보안 네트워크, 터널 키워드 확인",
    type: "short-answer",
  },
  {
    question: "IP 주소를 변환하는 기술은?",
    answer: "nat",
    description: "ip주소 변환 기술",
    type: "short-answer",
  },
  {
    question:
      "VLAN을 자동으로 동기화하는 프로토콜로, 'VLAN' 키워드와 관련이 있는 것은?",
    answer: "vtp",
    description: "VLAN 자동 동기화 프로토콜, VLAN 키워드 확인",
    type: "short-answer",
  },
  {
    question:
      "IPv6가 IPv4와 호환성을 유지하기 위해 두 프로토콜을 동시에 사용하는 기술은?",
    answer: "dual stack",
    description:
      "IPv6와 IPv4를 동시에 사용하는 기술 (dualstack 또는 dual stack)",
    type: "short-answer",
  },
  {
    question:
      "vtp는 연결된 스위치들끼리 정보를 주고받아 자동으로 동기화하게 해주는 프로토콜인데 vtp에서 v의 의미는 무엇인가?",
    answer: "vlan",
    description: "VTP = VLAN Trunking Protocol",
    type: "short-answer",
  },
  {
    question:
      "네트워크에 연결된 장치에 IP주소를 자동으로 할당하기 위해 사용되는 네트워크 관리 프로토콜은?",
    answer: "dhcp",
    description: "Dynamic Host Configuration Protocol - IP 자동 할당",
    type: "short-answer",
  },

  // ==================== 라우팅 프로토콜 ====================
  {
    question: "최단거리 네트워크 프로토콜로, '홉수' 키워드와 관련이 있는 것은?",
    answer: "rip",
    description: "최단거리 네트워크, 홉수 키워드 확인",
    type: "short-answer",
  },
  {
    question:
      "최단거리 네트워크 프로토콜로, 'Link State' 키워드와 관련이 있는 것은?",
    answer: "ospf",
    description: "최단거리 네트워크, Link State 키워드 확인",
    type: "short-answer",
  },
  {
    question:
      "Distance Vector를 사용하며 최대 지원 가능한 홉 수가 15개이고 업데이트 주기는 30초인 라우팅 프로토콜은?",
    answer: "rip",
    description: "RIP (Routing Information Protocol)",
    type: "short-answer",
  },
  {
    question:
      "대표적인 링크 상태 라우팅 프로토콜로 라우터 자신을 네트워크의 중심에 두고 최단 경로를 도출해 내는 프로토콜은?",
    answer: "ospf",
    description: "OSPF (Open Shortest Path First)",
    type: "short-answer",
  },

  // ==================== 원격 접속 및 전송 프로토콜 ====================
  {
    question:
      "원격 시스템 명령을 실행하는 프로토콜로, Telnet과 같은 역할을 하며 22번 포트를 사용하는 것은?",
    answer: "ssh",
    description: "원격시스템 명령 실행, Telnet 과 같은 프로토콜, 22번 포트",
    type: "short-answer",
  },
  {
    question:
      "데이터를 안전하게 주고받기 위한 프로토콜로, http를 https로 만들며 443번 포트를 사용하는 것은?",
    answer: "ssl",
    description:
      "데이터를 안전하게 주고 받기 위한 프로토콜, 적용되면 http → https, 443번 포트",
    type: "short-answer",
  },
  {
    question: "신뢰성 있는 전송을 제공하지만 느린 전송 프로토콜은?",
    answer: "tcp",
    description: "신뢰성 But 느림 | 웹 브라우징 파일 전송 등",
    type: "short-answer",
  },
  {
    question: "빠른 전송을 제공하지만 비신뢰성인 전송 프로토콜은?",
    answer: "udp",
    description: "비신뢰성 But 빠름 | 스트리밍 및 게임 등",
    type: "short-answer",
  },
  {
    question:
      "브라우저 사이에 전송되는 데이터를 암호화하여 인터넷 연결을 보호하기 위한 기술은?",
    answer: "ssl",
    description: "SSL (Secure Sockets Layer) 또는 TLS",
    type: "short-answer",
  },
  {
    question:
      "인증서를 기반으로 암호화된 데이터를 전송하는 프로토콜로, SSL/TLS 인증서로 보호되는 HTTP통신을 하는 프로토콜은?",
    answer: "https",
    description: "HTTPS (HTTP Secure)",
    type: "short-answer",
  },

  // ==================== RAID ====================
  {
    question:
      "RAID의 구성에서 미러링 모드 구성이라고도 하며 디스크에 있는 모든 데이터는 동시에 다른 디스크에도 백업되어 하나의 디스크가 손상되어도 다른 디스크의 데이터를 사용할 수 있게 한 RAID 구성은?",
    answer: "raid 1",
    description: "RAID 1 - 미러링 모드, 데이터 이중화",
    type: "multiple-choice",
    options: ["RAID 0", "RAID 1", "RAID 2", "RAID 3", "RAID 4", "RAID 5"],
  },

  // ==================== 메모리 ====================
  {
    question:
      "한번 기록한 정보가 전원 유지와 상관없이 반영구적으로 기억되며, 삭제나 수정이 불가능한 기억장치는?",
    answer: "rom",
    description: "ROM (Read Only Memory)",
    type: "short-answer",
  },
  {
    question: "임의의 영역에 접근하여 읽고 쓰기가 가능한 주기억 장치는?",
    answer: "ram",
    description: "RAM (Random Access Memory)",
    type: "short-answer",
  },
  {
    question:
      "전력소모가 적고 고속 프로그래밍 및 대용량 저장이 가능한 메모리는?",
    answer: "flash",
    description: "FLASH Memory",
    type: "short-answer",
  },
  {
    question: "화상정보를 기억하기 위한 전용 메모리는?",
    answer: "vram",
    description: "VRAM (Video RAM)",
    type: "short-answer",
  },

  // ==================== IPv6 ====================
  {
    question: "IPv6의 설명으로 올바른 것을 모두 고르시오.",
    answer: ["주소크기가 128비트이다", "애니캐스트를 지원한다"],
    description: "IPv6: 128비트, 유니캐스트/멀티캐스트/애니캐스트 지원",
    type: "multiple-choice",
    options: [
      "주소크기가 32비트이다",
      "주소크기가 128비트이다",
      "8비트씩 네부분 10진수로 표현한다",
      "애니캐스트를 지원한다",
      "브로드캐스트를 지원한다",
    ],
  },
  {
    question: "IPv6의 특징으로 옳은 것을 모두 고르시오.",
    answer: [
      "확장 헤더 옵션이 있다",
      "유니캐스트-멀티캐스트-애니캐스트",
      "이동성이 좋아졌다",
      "보안성이 좋아졌다",
    ],
    description:
      "IPv6 특징: 128비트, 확장헤더, 유니/멀티/애니캐스트, 이동성, 보안성 향상",
    type: "multiple-choice",
    options: [
      "64비트로 이루어져 있다",
      "확장 헤더 옵션이 있다",
      "유니캐스트-멀티캐스트-애니캐스트",
      "유니캐스트-멀티캐스트-브로드캐스트",
      "이동성이 좋아졌다",
      "보안성이 좋아졌다",
    ],
  },

  // ==================== ICMP ====================
  {
    question: "ICMP echo message에 대한 설명으로 올바른 것을 고르시오.",
    answer: "echo reply/request - 에코응답, 요구",
    description: "Echo Reply/Request가 에코응답, 요구에 해당",
    type: "multiple-choice",
    options: [
      "Echo Reply/Request - 에코응답, 요구",
      "Destination Unreachable - 발신제한",
      "Source Quench - 시간 초과",
      "Redirect - 목적지 도달 불가능",
      "Time Exeeded - 라우트 변경",
    ],
  },
  {
    question: "다음 중 ICMP Type 3번의 Message는 무엇인가?",
    answer: "destination unreachable",
    description: "Type 3 = Destination Unreachable (목적지 도달 불가능)",
    type: "multiple-choice",
    options: [
      "Redirect",
      "Destination Unreachable",
      "Echo Request",
      "Time Exeeded",
    ],
  },
  {
    question:
      "인터넷 그룹 관리 프로토콜로 컴퓨터가 멀티캐스트 그룹을 인근의 라우터들에게 알리는 수단을 제공하는 인터넷 프로토콜은?",
    answer: "igmp",
    description: "IGMP (Internet Group Management Protocol)",
    type: "short-answer",
  },

  // ==================== 사설 IP 주소 ====================
  {
    question: "사설 C 클래스 주소로 유효한 것은 무엇인가?",
    answer: "192.168.100.1",
    description: "사설 C클래스: 192.168.0.0 ~ 192.168.255.255",
    type: "multiple-choice",
    options: [
      "192.168.100.1",
      "10.172.192.24",
      "172.18.244.100",
      "224.45.67.129",
    ],
  },
  {
    question: "다음 중 사설 B클래스 주소로 유효한 것을 고르시오.",
    answer: "172.30.200.36",
    description: "사설 B클래스: 172.16.0.0 ~ 172.31.255.255",
    type: "multiple-choice",
    options: [
      "192.168.100.0",
      "224.24.194,18",
      "10.14.36.100",
      "172.30.200.36",
    ],
  },
  {
    question: "사설 A클래스 주소인 것을 고르시오.",
    answer: "10.14.36.100",
    description: "사설 A클래스: 10.0.0.0 ~ 10.255.255.255",
    type: "multiple-choice",
    options: [
      "192.168.100.0",
      "224.24.194,18",
      "10.14.36.100",
      "172.30.200.36",
    ],
  },

  // ==================== 네트워크 ID 계산 ====================
  {
    question:
      "아래 조건에 따라 네트워크 IP 주소를 구하시오. 호스트 IP: 192.168.1.10, 서브넷 IP: 255.255.255.240",
    answer: "192.168.1.0",
    description: "192.168.1.10 AND 255.255.255.240 = 192.168.1.0",
    type: "short-answer",
  },
  {
    question: "192.168.100.150/25의 네트워크 ID를 구하시오.",
    answer: "192.168.100.128",
    description: "/25 = 255.255.255.128, 네트워크 ID: 192.168.100.128",
    type: "short-answer",
  },
  {
    question: "172.168.200.100/18의 네트워크 ID를 구하시오.",
    answer: "172.168.192.0",
    description: "/18 = 255.255.192.0, 네트워크 ID: 172.168.192.0",
    type: "short-answer",
  },
  {
    question: "172.50.48.6/255.255.224.0의 네트워크 ID를 구하시오.",
    answer: "172.50.32.0",
    description: "172.50.48.6 AND 255.255.224.0 = 172.50.32.0",
    type: "short-answer",
  },
  {
    question: "192.xxx.xx.xxx/26의 서브네트워크 수를 구하시오.",
    answer: "4",
    description: "/26은 호스트부 2비트를 서브넷에 사용, 2^2 = 4개",
    type: "short-answer",
  },

  // ==================== OSI 7계층 ====================
  {
    question:
      "OSI 7 계층에서 코드화, 암호화, 복호화, 압축, 인증을 수행하는 계층은 무엇인가?",
    answer: "표현 계층",
    description: "Presentation Layer (표현 계층, 6계층)",
    type: "short-answer",
  },
  {
    question:
      "OSI 7계층 중 실제 물리적인 매체(케이블, 무선 신호 등)를 통해 비트 스트림을 전송하는 역할을 담당하는 최하위 계층은?",
    answer: "물리 계층",
    description: "Physical Layer (물리 계층, 1계층)",
    type: "short-answer",
  },
  {
    question:
      "OSI 7계층 중 물리 계층을 통해 데이터를 안전하게 전송하며, MAC 주소를 사용하여 노드 간의 데이터 프레임 전송 및 오류 제어, 흐름 제어를 담당하는 계층은?",
    answer: "데이터 링크 계층",
    description: "Data Link Layer (데이터 링크 계층, 2계층)",
    type: "short-answer",
  },
  {
    question:
      "OSI 7계층 중 IP 주소를 사용하여 패킷을 한 네트워크에서 다른 네트워크로 라우팅하는 역할을 담당하며, 최적의 경로를 결정하는 계층은?",
    answer: "네트워크 계층",
    description: "Network Layer (네트워크 계층, 3계층)",
    type: "short-answer",
  },
  {
    question:
      "OSI 7계층 중 프로세스 간의 신뢰성 있는 데이터 전송을 보장하고, 포트 번호를 사용하여 여러 애플리케이션의 데이터를 다중화 및 역다중화하는 계층은?",
    answer: "전송 계층",
    description: "Transport Layer (전송 계층, 4계층)",
    type: "short-answer",
  },

  // ==================== TCP/IP 계층 프로토콜 ====================
  {
    question: "네트워크 계층에 포함되는 프로토콜 종류를 3가지 적으시오.",
    answer: ["ip", "icmp", "arp"],
    description: "IP, ICMP, ARP (또는 RARP, IGMP)",
    type: "short-answer",
  },
  {
    question: "TCP/IP 계층에서 전송계층에 속하는 프로토콜을 두 가지 적으시오.",
    answer: ["tcp", "udp"],
    description: "TCP, UDP",
    type: "short-answer",
  },
  {
    question: "TCP/IP 4계층에서 인터넷 계층인 프로토콜을 모두 고르시오.",
    answer: ["arp", "igmp", "icmp"],
    description: "인터넷 계층: ARP, IGMP, ICMP (IP도 포함)",
    type: "multiple-choice",
    options: ["ARP", "SMTP", "TCP", "IGMP", "ICMP", "HTTP"],
  },

  // ==================== IPSec ====================
  {
    question:
      "IPSec의 프로토콜 구조에서 (A) IP 패킷에 대한 인증을 제공하고 데이터의 무결성을 보장하는 프로토콜 헤더, (B) IP패킷에 대한 인증과 암호화를 실시하고 데이터의 무결성과 기밀성을 보장하는 프로토콜 헤더, (C) IPSec 서비스를 구현할 때 암호화 및 인증에 사용할 요소를 정의하는 것을 각각 적으시오.",
    answer: ["ah", "esp", "sa"],
    description: "(A): AH, (B): ESP, (C): SA",
    type: "short-answer",
  },

  // ==================== 리눅스 부팅 관련 ====================
  {
    question: "GNU하에 개발된 리눅스 부트로더는 무엇인가?",
    answer: "grub",
    description: "GRUB (GRand Unified Bootloader)",
    type: "short-answer",
  },
  {
    question:
      "리눅스 커널 부팅이 완료된 뒤 실행되는 첫 번째 프로세스이자 커널이 직접 실행하는 유일한 프로세스는?",
    answer: "init",
    description: "init (또는 systemd)",
    type: "short-answer",
  },
  {
    question: "부팅 시 자동으로 마운트 되도록 설정해야 하는 파일은?",
    answer: "/etc/fstab",
    description: "/etc/fstab - 파일 시스템 테이블",
    type: "short-answer",
  },

  // ==================== TCP 특징 ====================
  {
    question: "TCP의 특징으로 알맞은 것을 모두 고르시오.",
    answer: ["연결성", "신뢰성", "송신과 수신이 동일하다"],
    description: "TCP: 연결 지향, 신뢰성 보장, 흐름 제어, 혼잡 제어",
    type: "multiple-choice",
    options: [
      "연결성",
      "비연결성",
      "신뢰성",
      "송신과 수신이 다르다",
      "송신과 수신이 동일하다",
    ],
  },
  {
    question:
      "연결 지향적이며 데이터의 신뢰성 있는 전송을 보장하기 위해 3-way Handshake를 사용하고 흐름 제어, 혼잡 제어 기능을 제공하는 전송 계층 프로토콜은?",
    answer: "tcp",
    description: "TCP (Transmission Control Protocol)",
    type: "short-answer",
  },

  // ==================== UDP 특징 ====================
  {
    question: "UDP에 관한 설명으로 옳은 것을 모두 고르시오.",
    answer: [
      "비연결형 방식으로 전송한다",
      "tcp 방식에 비해 전송속도가 빠르다",
      "혼잡제어를 지원하지 않는다",
    ],
    description: "UDP: 비연결형, 빠른 전송, 흐름/혼잡제어 미지원",
    type: "multiple-choice",
    options: [
      "신뢰성이 높다",
      "비연결형 방식으로 전송한다",
      "오류를 감지하고 수정한다",
      "TCP 방식에 비해 전송속도가 빠르다",
      "흐름제어를 지원한다",
      "혼잡제어를 지원하지 않는다",
    ],
  },
  {
    question:
      "비연결형 프로토콜로, 데이터 전송 전에 연결 설정 과정이 없으며, TCP에 비해 빠르지만 신뢰성이나 흐름 제어를 보장하지 않는 전송 계층 프로토콜은?",
    answer: "udp",
    description: "UDP (User Datagram Protocol)",
    type: "short-answer",
  },

  // ==================== 기타 ====================
  {
    question:
      "IP 주소 192.168.10.0/27 네트워크에서 사용할 수 있는 유효한 호스트 IP 주소의 최대 개수는?",
    answer: "30",
    description: "/27 = 32-2 = 30개 (네트워크, 브로드캐스트 제외)",
    type: "short-answer",
  },
  {
    question:
      "IP 주소 172.20.150.30과 서브넷 마스크 255.255.240.0을 사용하는 네트워크의 네트워크 ID를 구하시오.",
    answer: "172.20.144.0",
    description: "172.20.150.30 AND 255.255.240.0 = 172.20.144.0",
    type: "short-answer",
  },

  // ==================== 추가 문제 (2025 기출) ====================

  // 네트워크 연결 확인
  {
    question:
      "네트워크 연결 상태를 확인하기 위해 대상 호스트에게 ICMP Echo Request 메시지를 보내고, Echo Reply 메시지를 받는 방식으로 동작하는 명령어는?",
    answer: "ping",
    description: "ping - ICMP Echo Request/Reply로 연결 상태 확인",
    type: "short-answer",
  },

  // 사설 IP C클래스 추가 문제
  {
    question: "사설 C클래스에 속하는 IP 주소를 고르시오.",
    answer: "192.168.13.87",
    description: "사설 C클래스: 192.168.0.0 ~ 192.168.255.255",
    type: "multiple-choice",
    options: [
      "33.114.17.24",
      "128.46.83.25",
      "192.168.13.87",
      "222.248.255.34",
    ],
  },

  // 사설 A클래스 추가 문제
  {
    question: "사설 A클래스 주소로 유효한 것은 무엇인가?",
    answer: "10.172.192.24",
    description: "사설 A클래스: 10.0.0.0 ~ 10.255.255.255",
    type: "multiple-choice",
    options: [
      "192.100.2.134",
      "10.172.192.24",
      "172.18.244.100",
      "224.45.67.129",
    ],
  },

  // IPv6 추가 문제
  {
    question: "다음 중 IPv6에 대한 설명으로 옳은 것을 모두 고르시오.",
    answer: [
      "헤더확장으로 이동성이 좋아졌다",
      "유니캐스트, 애니캐스트, 멀티캐스트",
      "보안성이 좋아졌다",
    ],
    description:
      "IPv6: 128비트, 확장헤더, 유니/멀티/애니캐스트, 이동성/보안성 향상",
    type: "multiple-choice",
    options: [
      "주소크기가 64비트이다",
      "헤더확장으로 이동성이 좋아졌다",
      "유니캐스트, 애니캐스트, 멀티캐스트",
      "유니캐스트, 브로드캐스트, 멀티캐스트",
      "브로드캐스트",
      "보안성이 좋아졌다",
    ],
  },

  // ICMP 메시지 테이블 문제
  {
    question:
      "ICMP 메시지에서 Type 0은 에코 응답(Echo Reply), Type 3은 목적지 도달 불가능(Destination Unreachable), Type 4는 발신제한(Source Quench), Type 5는 라우트 변경(Redirect), Type 8은 에코 요구(Echo Request), Type 11은 시간 초과(Time Exceeded)입니다. Type 8의 메시지는 무엇인가?",
    answer: "echo request",
    description: "ICMP Type 8 = Echo Request (에코 요구)",
    type: "short-answer",
  },

  // 드래그앤드롭 유형 - NAT, DHCP, 방화벽, VPN
  {
    question: "사설 IP를 공인 IP로 변경에 필요한 주소 변환 서비스는 무엇인가?",
    answer: "nat",
    description: "NAT (Network Address Translation) - 주소 변환 서비스",
    type: "short-answer",
  },

  // SSL/TLS와 HTTPS 구분 문제
  {
    question:
      "웹사이트가 SSL/TLS 인증서로 보호되는 HTTP통신을 하는 프로토콜은 무엇인가?",
    answer: "https",
    description: "HTTPS - SSL/TLS로 암호화된 HTTP 통신",
    type: "short-answer",
  },

  // 리눅스 top 명령어 추가 설명
  {
    question:
      "리눅스에서 가장 우선순위가 높은 프로세스를 보여주며, CPU 사용량, 메모리 사용량, 프로세스 목록 등을 실시간으로 모니터링하는 명령어는?",
    answer: "top",
    description: "top - 실시간 시스템 리소스 및 프로세스 모니터링",
    type: "short-answer",
  },

  // 데이터 링크 계층 답안 변형
  {
    question:
      "OSI 7계층에서 MAC 주소를 사용하여 노드 간의 데이터 프레임 전송, 오류 제어, 흐름 제어를 담당하는 계층은?",
    answer: "데이터링크 계층",
    description: "Data Link Layer (데이터 링크 계층, 2계층)",
    type: "short-answer",
  },

  // 세션 계층
  {
    question:
      "OSI 7계층 중 통신 세션(대화)의 수립, 관리, 종료를 담당하며, 동기화와 대화 제어를 수행하는 계층은?",
    answer: "세션 계층",
    description: "Session Layer (세션 계층, 5계층)",
    type: "short-answer",
  },

  // 응용 계층
  {
    question:
      "OSI 7계층 중 사용자 인터페이스를 제공하고, HTTP, FTP, SMTP, DNS 등의 프로토콜이 동작하는 최상위 계층은?",
    answer: "응용 계층",
    description: "Application Layer (응용 계층, 7계층)",
    type: "short-answer",
  },

  // BGP 라우팅 프로토콜
  {
    question:
      "경로 벡터(Path Vector) 방식을 사용하며, 인터넷 백본 라우팅에 사용되고 TCP 포트를 이용하는 외부 게이트웨이 프로토콜은?",
    answer: "bgp",
    description: "BGP (Border Gateway Protocol) - 외부 게이트웨이 프로토콜",
    type: "short-answer",
  },

  // ARP 프로토콜
  {
    question: "IP 주소를 MAC 주소로 변환하는 프로토콜은?",
    answer: "arp",
    description: "ARP (Address Resolution Protocol) - IP → MAC 변환",
    type: "short-answer",
  },

  // RARP 프로토콜
  {
    question: "MAC 주소를 IP 주소로 변환하는 프로토콜은?",
    answer: "rarp",
    description: "RARP (Reverse ARP) - MAC → IP 변환",
    type: "short-answer",
  },

  // DNS
  {
    question: "도메인 이름을 IP 주소로 변환하는 프로토콜은?",
    answer: "dns",
    description: "DNS (Domain Name System) - 도메인 → IP 변환",
    type: "short-answer",
  },

  // SNMP
  {
    question: "네트워크 장비를 관리하고 모니터링하는 프로토콜은?",
    answer: "snmp",
    description: "SNMP (Simple Network Management Protocol)",
    type: "short-answer",
  },

  // 네트워크 장비 - 허브/리피터
  {
    question:
      "OSI 물리 계층(L1)에서 동작하며, 신호를 증폭하고 재전송하는 장비 2가지는?",
    answer: ["허브", "리피터"],
    description: "허브(Hub), 리피터(Repeater) - L1 장비",
    type: "short-answer",
  },

  // 네트워크 장비 - 스위치/브리지
  {
    question:
      "OSI 데이터링크 계층(L2)에서 동작하며, MAC 주소 기반으로 필터링/포워딩하는 장비 2가지는?",
    answer: ["스위치", "브리지"],
    description: "스위치(Switch), 브리지(Bridge) - L2 장비",
    type: "short-answer",
  },

  // 네트워크 장비 - 라우터
  {
    question:
      "OSI 네트워크 계층(L3)에서 동작하며, IP 주소를 기반으로 라우팅하는 장비는?",
    answer: "라우터",
    description: "라우터(Router) - L3 장비",
    type: "short-answer",
  },

  // 게이트웨이
  {
    question: "서로 다른 프로토콜 간의 통신을 가능하게 하는 장비는?",
    answer: "게이트웨이",
    description: "게이트웨이(Gateway) - 이종 프로토콜 간 통신",
    type: "short-answer",
  },

  // IDS vs IPS
  {
    question: "침입을 탐지하는 시스템은?",
    answer: "ids",
    description: "IDS (Intrusion Detection System) - 침입 탐지",
    type: "short-answer",
  },

  // IDS 탐지 기법 - 오용 탐지
  {
    question:
      "IDS 탐지 기법 중 이미 알려진 공격 패턴을 기반으로 탐지하며, 새로운 공격은 탐지하기 어려운 방식은?",
    answer: "오용 탐지",
    description:
      "오용 탐지 (Signature-based/Knowledge-based) - 알려진 패턴 기반",
    type: "short-answer",
  },

  // IDS 탐지 기법 - 비정상 행위 탐지
  {
    question:
      "IDS 탐지 기법 중 정상적인 행위를 정의하고, 이를 벗어나는 행위를 비정상으로 탐지하는 방식은?",
    answer: "비정상 행위 탐지",
    description: "비정상 행위 탐지 (Anomaly-based) - 새로운 공격 탐지 가능",
    type: "short-answer",
  },

  // 포트 미러링
  {
    question: "트래픽을 복제하여 모니터링 용도로 사용하는 기술은?",
    answer: "포트 미러링",
    description: "포트 미러링 (Port Mirroring) - 트래픽 복제",
    type: "short-answer",
  },

  // 스푸핑
  {
    question: "IP 주소, MAC 주소 등을 속여 시스템에 침입하는 공격 방식은?",
    answer: "스푸핑",
    description: "스푸핑 (Spoofing) - 주소 위조 공격",
    type: "short-answer",
  },

  // DoS 공격
  {
    question: "시스템에 과도한 부하를 주어 서비스를 마비시키는 공격은?",
    answer: "dos",
    description: "DoS (Denial of Service) - 서비스 거부 공격",
    type: "short-answer",
  },

  // 피싱
  {
    question:
      "이메일 등을 통해 가짜 웹사이트로 유도하여 개인 정보를 탈취하는 공격은?",
    answer: "피싱",
    description: "Phishing (피싱) - 가짜 사이트 유도",
    type: "short-answer",
  },

  // 파밍
  {
    question:
      "웹사이트 주소 자체를 위조하여 정상 사이트로 오인하게 한 후 정보를 탈취하는 공격은?",
    answer: "파밍",
    description: "Pharming (파밍) - 주소 자체 위조",
    type: "short-answer",
  },

  // DMZ
  {
    question:
      "내부 네트워크와 외부 네트워크 사이에 위치하여 외부 공격으로부터 내부 서버를 보호하는 구간은?",
    answer: "dmz",
    description: "DMZ (Demilitarized Zone) - 비무장지대",
    type: "short-answer",
  },

  // Hot Swap
  {
    question:
      "고장난 부품을 진단/제거/교체하는 동안 장치 나머지 부분이 정상 작동하게 하는 기능은?",
    answer: "hot swap",
    description: "Hot Swap - 무중단 부품 교체",
    type: "short-answer",
  },

  // RAID 0
  {
    question:
      "RAID 구성 중 스트라이핑 방식을 사용하여 여러 디스크에 데이터를 분산 저장하며, 속도는 빠르지만 내결함성이 없는 방식은?",
    answer: "raid 0",
    description: "RAID 0 - 스트라이핑, 속도 향상, 내결함성 없음",
    type: "short-answer",
  },

  // RAID 5
  {
    question:
      "RAID 구성 중 패리티 정보를 분산 저장하여 하나의 디스크 장애 시 데이터를 복구할 수 있는 방식은?",
    answer: "raid 5",
    description: "RAID 5 - 분산 패리티, 내결함성 제공",
    type: "short-answer",
  },

  // 유비쿼터스
  {
    question:
      "실세계 각종 사물과 물리 공간에 컴퓨터를 장착하되 컴퓨터의 겉모습은 드러나지 않도록 환경 내에 심어지고 융합된 개념은?",
    answer: "유비쿼터스",
    description: "유비쿼터스 (Ubiquitous) - 어디서나 컴퓨팅",
    type: "short-answer",
  },

  // 블루투스
  {
    question:
      "무선 개인 근거리 통신 기술로, 페어링을 통해 기기를 연결하며 USB 대체 개념으로 사용되는 것은?",
    answer: "블루투스",
    description: "블루투스 (Bluetooth) - 무선 근거리 통신",
    type: "short-answer",
  },

  // Ad-Hoc
  {
    question: "중앙 집중식 인프라 없이 임시로 구성되는 무선 네트워크 방식은?",
    answer: "ad-hoc",
    description: "Ad-Hoc - 임시 무선 네트워크",
    type: "short-answer",
  },

  // 쿠키
  {
    question:
      "웹사이트가 사용자의 하드디스크에 집어넣는 특별한 텍스트 파일로, 사용자 정보를 저장하는 것은?",
    answer: "쿠키",
    description: "Cookie (쿠키) - 사용자 정보 저장 파일",
    type: "short-answer",
  },

  // PLC
  {
    question: "기존 전력 송배전 선로를 이용한 유선 통신 방식은?",
    answer: "plc",
    description: "PLC (Power Line Communication) - 전력선 통신",
    type: "short-answer",
  },

  // Dead Lock (교착상태)
  {
    question: "너무 많은 패킷이 서브넷상에 존재하여 속도를 저하시키는 상태는?",
    answer: "교착상태",
    description: "Dead Lock (교착상태) - 혼잡으로 인한 속도 저하",
    type: "short-answer",
  },

  // AS (Autonomous System)
  {
    question: "동일한 내부 라우팅과 보안 정책을 사용하는 망들의 집합은?",
    answer: "as",
    description: "AS (Autonomous System) - 자율 시스템",
    type: "short-answer",
  },

  // TCP/IP 4계층 - 네트워크 액세스 계층
  {
    question:
      "TCP/IP 4계층에서 물리적인 네트워크 접근과 데이터를 물리적 매체에 싣고 내리는 기능을 담당하며, OSI의 물리 계층과 데이터링크 계층에 대응하는 계층은?",
    answer: "네트워크 액세스 계층",
    description: "Network Access Layer - OSI L1, L2 대응",
    type: "short-answer",
  },

  // TCP/IP 4계층 - 인터넷 계층
  {
    question:
      "TCP/IP 4계층에서 패킷의 논리적 주소(IP 주소)를 이용한 경로 설정(라우팅) 및 전송을 담당하며, OSI의 네트워크 계층에 대응하는 계층은?",
    answer: "인터넷 계층",
    description: "Internet Layer - OSI L3 대응",
    type: "short-answer",
  },

  // TCP/IP 4계층 - 응용 계층
  {
    question:
      "TCP/IP 4계층에서 사용자에게 네트워크 서비스를 제공하며, OSI의 세션, 표현, 응용 계층에 대응하는 계층은?",
    answer: "응용 계층",
    description: "Application Layer - OSI L5, L6, L7 대응",
    type: "short-answer",
  },

  // 데이터 단위 - 비트
  {
    question: "OSI 물리 계층에서 사용하는 데이터 단위는?",
    answer: "비트",
    description: "Bit - 물리 계층(L1) 데이터 단위",
    type: "short-answer",
  },

  // 데이터 단위 - 프레임
  {
    question: "OSI 데이터링크 계층에서 사용하는 데이터 단위는?",
    answer: "프레임",
    description: "Frame - 데이터링크 계층(L2) 데이터 단위",
    type: "short-answer",
  },

  // 데이터 단위 - 패킷
  {
    question: "OSI 네트워크 계층에서 사용하는 데이터 단위는?",
    answer: "패킷",
    description: "Packet - 네트워크 계층(L3) 데이터 단위",
    type: "short-answer",
  },

  // 데이터 단위 - 세그먼트
  {
    question: "OSI 전송 계층에서 TCP가 사용하는 데이터 단위는?",
    answer: "세그먼트",
    description: "Segment - 전송 계층(L4) TCP 데이터 단위",
    type: "short-answer",
  },

  // 데이터 단위 - 데이터그램
  {
    question: "OSI 전송 계층에서 UDP가 사용하는 데이터 단위는?",
    answer: "데이터그램",
    description: "Datagram - 전송 계층(L4) UDP 데이터 단위",
    type: "short-answer",
  },

  // 프로토콜 - HDLC
  {
    question:
      "데이터링크 계층의 프로토콜 중 고급 데이터 통신 제어 절차로, 비트 방식의 동기 전송을 제공하는 것은?",
    answer: "hdlc",
    description: "HDLC (High-level Data Link Control)",
    type: "short-answer",
  },

  // 프로토콜 - PPP
  {
    question:
      "데이터링크 계층의 프로토콜 중 점대점(Point-to-Point) 연결에서 사용되며, 인증 기능을 제공하는 것은?",
    answer: "ppp",
    description: "PPP (Point-to-Point Protocol)",
    type: "short-answer",
  },

  // 지그비
  {
    question:
      "통신 프로토콜의 일종으로, 저전력 근거리 통신에 사용되며 IoT 기기 연결에 많이 활용되는 규격은?",
    answer: "지그비",
    description: "ZigBee (지그비) - 저전력 근거리 통신",
    type: "short-answer",
  },

  // 와이브로
  {
    question:
      "무선 인터넷 접속 규격 중 하나로, TDD 다중 접속 방식을 사용하며 무선 인터넷에 이동성을 더한 것은?",
    answer: "와이브로",
    description: "WiBro (Wireless Broadband) - 이동 무선 인터넷",
    type: "short-answer",
  },

  // IPTV
  {
    question:
      "광대역 연결상에서 인터넷 프로토콜을 사용하여 소비자에게 디지털 텔레비전 서비스를 제공하는 시스템은?",
    answer: "iptv",
    description: "IPTV (Internet Protocol Television)",
    type: "short-answer",
  },

  // DDNS
  {
    question:
      "유동 IP 주소를 사용하는 컴퓨터의 DNS 정보를 쉽게 관리하여, 가정 네트워크와 회사 환경에서 부드럽게 연결할 수 있도록 하는 서비스는?",
    answer: "ddns",
    description: "DDNS (Dynamic DNS) - 유동 IP DNS 관리",
    type: "short-answer",
  },

  // GPS
  {
    question:
      "위성 시스템을 이용하여 위치와 시간 정보를 얻을 수 있는 시스템은?",
    answer: "gps",
    description: "GPS (Global Positioning System) - 위성 위치 확인",
    type: "short-answer",
  },
];
