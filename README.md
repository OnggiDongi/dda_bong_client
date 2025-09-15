## 따봉👍🏻 Client Repository
### 📂 폴더 구조

```
dda_bong_client/
├── 📁 .next/                # Next.js 빌드 결과물 (자동 생성)
├── 📁 .storybook/           # Storybook 설정 및 환경 구성
├── 📁 node_modules/         # 설치된 npm 패키지 모듈
├── 📁 public/               # 정적 리소스 (빌드 시 그대로 제공)
│   ├── 📁 fonts/            # 웹폰트 파일
│   ├── 📁 icons/            # 아이콘 파일 (SVG, PNG 등)
│   ├── 📁 images/           # 이미지 파일 (배너, 로고 등)
└── 📁 src/                  # 실제 개발 소스 코드
├── 📁 app/              # Next.js App Router 엔트리포인트
├── 📁 components/       # 공용 UI 컴포넌트
├── 📁 hooks/            # 커스텀 React 훅
├── 📁 lib/              # API 클라이언트, 외부 라이브러리 설정
├── 📁 stories/          # Storybook 컴포넌트 스토리
├── 📁 types/            # 전역 타입 정의 (TypeScript 인터페이스/타입)
├── 📁 utils/            # 유틸리티 함수 모음
└── setProxy.ts          # 개발 환경 프록시 설정 파일
```

### ✍️ 커밋 메시지 컨벤션

| 타입 | 설명 |
| --- | --- |
| 📌 **Feat** | 새로운 기능 추가 |
| ❗️ **Fix** | 버그 수정 |
| 🛠️ **Refactor** | 리팩토링(이름 변경, 파일 위치 변경, 로직 변경) |
| 🎨 **Design** | CSS 등 디자인 변경 |
| 🎀 **Style** | 코드 스타일 변경 (코드 형식, 세미콜론 추가 등) |
| 📁 **Docs** | 문서 추가, 수정, 삭제 |
| ✏️ **Test** | 테스트 코드 관련 변경 |
| 🎈 **Chore** | 기타 변경사항 (빌드 스크립트 수정 등) |
