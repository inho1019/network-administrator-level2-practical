# 📚 네트워크 관리사 2급 실기 연습 사이트

네트워크 관리사 2급 자격증 실기 시험을 대비할 수 있는 인터랙티브 웹 기반 연습 프로그램입니다.

🌐 **배포 주소**: [https://network-administrator-level2-practica.netlify.app/](https://network-administrator-level2-practica.netlify.app/)

## ✨ 주요 기능

### 📝 모의고사
실제 시험과 동일한 구성의 모의고사를 제공합니다 (18문제, 100점 만점)
- 케이블 제작 (1문제, 6.5점)
- 윈도우 설정 (8문제, 각 5점)
- 단답형 문제 (6문제, 각 5점)
- 라우터 설정 (3문제, 각 5.5점)

### 🪟 윈도우 설정 문제
실제 Windows GUI를 시뮬레이션한 인터랙티브 실습 환경
- 네트워크 설정 (IP, 서브넷 마스크, 게이트웨이, DNS)
- DHCP 서버 설정
- DNS 서버 설정
- FTP 서버 설정
- 웹 사이트 관리
- 사용자 관리
- 보안 정책
- 서비스 관리

### 🔧 라우터 설정 문제
Cisco IOS 명령어를 연습할 수 있는 터미널 시뮬레이터
- 인터페이스 설정 (IP 주소, 서브넷 마스크)
- DHCP 풀 설정
- 라우팅 테이블 설정
- 실시간 명령어 검증

### 🔌 케이블 제작 문제
LAN 케이블 배선을 시각적으로 연습
- 다이렉트 케이블 (T568B 양쪽 동일)
- 크로스 케이블 (T568B ↔ T568A)
- 드래그 앤 드롭으로 선 배치
- 실시간 정답 확인

### ✏️ 단답형 문제
네트워크 관련 명령어 및 기술 용어 퀴즈
- 전체 문제 풀기 모드
- 랜덤 5문제 모드

### 📖 시험 정보
실기 시험 구성 및 합격 팁 제공

## 🛠 기술 스택

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: CSS
- **Deployment**: Netlify

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone https://github.com/inho1019/network-administrator-level2-practical.git
cd network-administrator-level2-practical

# 의존성 설치
yarn install
# 또는
npm install
```

### 개발 서버 실행
```bash
yarn dev
# 또는
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드
```bash
yarn build
# 또는
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 프리뷰
```bash
yarn preview
# 또는
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   └── windows/     # Windows GUI 시뮬레이션 컴포넌트
├── data/            # 문제 데이터 및 상수
│   ├── cableProblems.ts
│   ├── constants.ts
│   ├── questions.ts
│   ├── routerProblems.ts
│   └── windowsProblems.ts
├── hooks/           # 커스텀 React 훅
│   ├── useCableWiring.ts
│   ├── usePathQuiz.ts
│   ├── useQuizState.ts
│   └── useRouterTerminal.ts
├── types/           # TypeScript 타입 정의
├── utils/           # 유틸리티 함수
│   └── validation.ts
├── App.tsx          # 메인 애플리케이션 컴포넌트
└── main.tsx         # 엔트리 포인트
```

## 💡 사용 방법

1. 홈페이지에서 원하는 문제 유형을 선택합니다
2. 각 문제를 풀고 정답을 제출합니다
3. 실시간으로 채점 결과를 확인합니다
4. 모의고사 모드에서는 실전과 동일한 환경으로 연습할 수 있습니다

## 🎯 학습 팁

- 윈도우 설정 문제: GUI 경로를 정확히 기억하는 것이 중요합니다
- 라우터 설정 문제: Cisco IOS 명령어를 정확하게 입력해야 합니다
- 케이블 제작 문제: T568B와 T568A 표준을 숙지하세요
- 모의고사로 실전 감각을 키우세요

## 👨‍💻 개발

이 프로젝트는 **Claude Sonnet 4.5**를 활용하여 **Vibe 코딩** 방식으로 개발되었습니다.

## 📄 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.

## 🙏 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요.

---

**네트워크 관리사 2급 자격증 취득을 응원합니다! 📡✨**
