# WebView App with React Native

React Native와 Expo를 사용한 WebView 애플리케이션입니다. 이 프로젝트는 TypeScript, Zustand, TanStack Query, NativeWind 등 현대적인 개발 도구들을 활용합니다.

## 기술 스택

- React Native
- Expo
- TypeScript
- Zustand (상태 관리)
- TanStack Query (서버 상태 관리)
- NativeWind (스타일링)
- React Native WebView

## 프로젝트 설정 과정

### 1. 프로젝트 생성
```bash
npx create-expo-app webview-app
cd webview-app
```

### 2. WebView 설정
```bash
npm install react-native-webview
```

### 3. TypeScript 설정
```bash
npm install --save-dev typescript @types/react @types/react-native @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- tsconfig.json 설정
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 4. 상태 관리 설정

#### Zustand 설치
```bash
npm install zustand
```

#### TanStack Query 설치
```bash
npm install @tanstack/react-query
```

### 5. 스타일링 설정 (NativeWind)
```bash
npm install nativewind
npm install --save-dev tailwindcss
```

- tailwind.config.js 설정
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- babel.config.js 설정
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

## 주요 기능

1. WebView 기본 기능
   - 웹 페이지 로딩
   - 자바스크립트 활성화
   - DOM 스토리지 활성화

2. 네비게이션 컨트롤
   - 뒤로가기
   - 앞으로가기
   - 네비게이션 상태 관리

3. 사용자 경험
   - 로딩 인디케이터
   - 에러 핸들링
   - 반응형 UI

4. 상태 관리
   - Zustand를 사용한 전역 상태 관리
   - TanStack Query를 사용한 서버 상태 관리

5. 스타일링
   - NativeWind (Tailwind CSS)를 사용한 모던한 UI
   - 반응형 디자인
   - 다크/라이트 모드 지원 가능

## 프로젝트 구조

```
webview-app/
├── App.tsx                # 메인 앱 컴포넌트
├── src/
│   ├── store/
│   │   └── useStore.ts   # Zustand store
│   └── lib/
│       └── queryClient.ts # TanStack Query 설정
├── babel.config.js        # Babel 설정
├── tailwind.config.js     # TailwindCSS 설정
├── tsconfig.json         # TypeScript 설정
└── app.d.ts             # 타입 선언 파일
```

## 실행 방법

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm start
```

3. 실행 옵션
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`
