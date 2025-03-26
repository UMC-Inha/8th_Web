# 📘 React 핵심 개념 정리

## 1. SPA (Single Page Application)

**정의**: 단 하나의 웹 문서만 로드하고, 이후 페이지 이동 시 Fetch 등의 API로 콘텐츠만 업데이트하는 웹 앱 구조입니다.

### ✅ 예시 코드

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### ✅ 장점

- 전체 새로고침 없이 빠른 사용자 경험
- 모바일 앱처럼 자연스러운 흐름

### ❌ 단점

- 초기 로딩이 무거울 수 있음
- SEO에 불리함 (SSR 필요)

---

## 2. User Interface Library

**정의**: UI를 만들기 위한 JavaScript 기반 라이브러리. React는 선언형 UI, 컴포넌트 기반 구조를 가짐.

### ✅ 예시 코드

```tsx
function Button() {
  return <button>클릭</button>;
}
```

### ✅ 장점

- 컴포넌트 중심 구조
- 선언형 방식으로 가독성 우수
- Virtual DOM 사용

---

## 3. Functional Component (함수형 컴포넌트)

**정의**: 함수처럼 생긴 컴포넌트로 Hook(`useState`, `useEffect`)을 사용해 상태 관리 가능

### ✅ 예시 코드

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### ✅ 장점

- 코드 간결
- 클래스보다 가볍다.

---

## 4. Virtual DOM (가상 DOM)

**정의**: 실제 DOM이 아닌, 메모리에 있는 가상 DOM 트리를 이용해 변경 사항만 실제 DOM에 반영

### ✅ 작동 원리

1. 상태 변경
2. 가상 DOM 생성
3. 이전 가상 DOM과 비교(diff)
4. 변경점만 실제 DOM에 적용

---

## 5. 동시성 렌더링 (Concurrent Rendering)

**정의**: 렌더링을 쪼개서 처리하고, 급한 작업이 끼어들 수 있도록 하는 React 18 기능

### ✅ 예시 코드

```tsx
const [input, setInput] = useState("");
const [results, setResults] = useState([]);

const handleChange = (e) => {
  const value = e.target.value;
  setInput(value);

  startTransition(() => {
    const filtered = expensiveSearch(value);
    setResults(filtered);
  });
};
```

### ✅ 장점

- 입력 중에도 끊김 없이 동작
- React 18 이후 기본 지원

---

## 6. React의 리렌더링 조건

| 조건          | 설명                              |
| ------------- | --------------------------------- |
| props 변경    | 부모로부터 전달된 값이 바뀔 때    |
| state 변경    | useState 등 내부 상태가 바뀔 때   |
| 부모 리렌더링 | 자식도 자동으로 리렌더링 됨       |
| context 변경  | 구독 중인 context 값이 바뀔 때    |
| forceUpdate() | 클래스 컴포넌트에서 강제 리렌더링 |

---

## 7. JSX 여러 태그 반환

### JSX에서 여러 태그 반환하는 방법법

```tsx
type Item = {
  tag: keyof React.JSX.IntrinsicElements;
  text: string;
};

const items: Item[] = [
  { tag: "h1", text: "UMC" },
  { tag: "p", text: "썬더" },
];

function App() {
  return (
    <div>
      {items.map((item, index) => {
        const Tag = item.tag;
        return <Tag key={index}>{item.text}</Tag>;
      })}
    </div>
  );
}
```

map으로 묶어서 전달해야한다고 생각했으나

```tsx
<>
  <h1>Title</h1>
  <p>내용</p>
</>
```

---

<></>로 묶으면 끝...

## 8. Props 구조 분해 할당

```tsx
interface ListProps {
  tech: string;
  name: string;
  food: string;
}

const List = ({ tech, name, food }: ListProps) => {
  return (
    <li>
      {tech} / {name} / {food}
    </li>
  );
};
```

> props를 구조 분해 하면 `props.tech` 대신 `tech`로 바로 사용 가능!

---

## 9. Lazy Initialization (게으른 초기화)

`useState`의 초기 값을 함수로 전달해, 첫 렌더링 시에만 실행되게 함

### ✅ 예시 코드

```tsx
const [count, setCount] = useState(() => {
  console.log("처음 한 번만 실행");
  return 0;
});
```

---

## 10. 카운터 예제 (증가/감소 기능)

```tsx
import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const handleIncreaseNumber = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecreaseNumber = () => {
    setCount((prev) => prev - 1);
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncreaseNumber}>숫자 증가</button>
      <button onClick={handleDecreaseNumber}>숫자 감소</button>
    </>
  );
}

export default App;
```
