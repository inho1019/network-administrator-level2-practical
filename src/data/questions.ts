import type { Question } from "../types";

export const allQuestions: Question[] = [
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
    question:
      "IPv6가 IPv4와 호환성을 유지하기 위해 두 프로토콜을 동시에 사용하는 기술은?",
    answer: "dual stack",
    description:
      "IPv6와 IPv4를 동시에 사용하는 기술 (dualstack 또는 dual stack)",
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
