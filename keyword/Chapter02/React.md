# 📘 React 핵심 개념 정리

## 1. SPA (Single Page Application)

**정의**: 단 하나의 웹 문서만 로드하고, 이후 페이지 이동 시 Fetch 등의 API로 콘텐츠만 업데이트하는 웹 앱 구조입니다.

### 예시 코드

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

- 전체 새로고침 없이 요청한 내용만 비동기적으로 받아서 화면을 업데이 할 수 있다.

  - 필요한 부분만 동적으로 갱신 가능능
  - 부드러운 UX제공

  AJAX, React Router가 주로 이러한 기능을 제공

### ❌ 단점

- 초기 로딩이 무거울 수 있음
  - SPA는 첫 로딩 시, 전체 애플리케이션에서 사용할 HTML, CSS, JavaScript 코드와 라우팅 정보 등을 한 번에 로딩
- SEO에 불리함 (SSR 필요)
  - 일반적인 웹 페이지(멀티 페이지 어플리케이션)의 경우 HTML 파일이 서버에 생성되어 있어 검색 엔진의 크롤러(bot)이 방문했을 때 해당 콘텐츠를 바로 받을 수 있음.
  - SPA의 경우 index.html 하나만 서버에서 응답하고 나머지는 js가 실행된 이후 동적 로딩
    - 봇이 방문했을 때 콘텐츠가 업로드 되지 않은 index.html을 보기 때문에 검색엔진에 불리

---

## 2. User Interface Library

**정의**: UI를 만들기 위한 JavaScript 기반 라이브러리. React는 선언형 UI, 컴포넌트 기반 구조를 가짐.

### 예시 코드

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

**설명**: React 초창기에는 컴포넌트를 만들 때 class 문법을 사용해야 했지만
Hook(`useState`, `useEffect`)이 도입되면서 더 간단한 함수 형태로 이를 대체

### 예시 코드

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### ✅ 장점

- 코드 간결, 직관적
- 클래스보다 가볍다.
- this 없이 동작작

---

## 4. Virtual DOM (가상 DOM)

**정의**: 실제 DOM이 아닌, 메모리에 있는 가상 DOM 트리를 이용해 변경 사항만 실제 DOM에 반영

### ✅ 작동 원리

1. 상태 변경
2. 가상 DOM 생성
3. 이전 가상 DOM과 비교(diff)
4. 변경점만 실제 DOM에 적용

## 📊 Virtual DOM vs 전통 DOM 방식 비교

| 항목          | 전통적인 방식                       | React (Virtual DOM) 방식           |
| ------------- | ----------------------------------- | ---------------------------------- |
| DOM 조작 방식 | 직접 실제 DOM 변경                  | Virtual DOM을 변경 후, 차이만 반영 |
| 업데이트 비용 | 높음 (전체 DOM 다시 그림)           | 낮음 (변경된 부분만 업데이트)      |
| 효율성        | 낮음                                | 높음                               |
| 코드 복잡도   | 상태 관리 & DOM 갱신 수동 처리 필요 | React가 알아서 갱신함              |
| 성능          | UI 변화 많을수록 성능 저하          | UI 변화 많아도 성능 안정적         |

DOM에 올리기 전에 변화한 데이터를 가지고 Virtual Dom이 가지고 있다가 최대한 적은 횟수로 사용자가 필요할 때때 업데이트하는 것이 고급 기술!

📚 dom에 대해 읽어보면 좋을 내용: [Virtual DOM이 동작하는 과정 – velog.io/@alldone](https://velog.io/@alldone/Virtual-DOM%EC%9D%B4-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-%EA%B3%BC%EC%A0%95)

---

## 5. 동시성 렌더링 (Concurrent Rendering)

React는 렌더링 작업을 **작은 단위로 나눠 처리**
중간에 **우선순위가 높은 작업(ex. 사용자 입력)** 이 발생하면  
👉 낮은 우선순위 작업은 **일시 중단(Pause)** 하고  
👉 중요한 작업을 먼저 처리한 뒤 **나중에 다시 이어서 렌더링**

=> 짧은 시간동안 작업을 번갈아가면서 처리!

### ✅ 기존 방식 (동기적 렌더링: Synchronous Rendering)

- 컴포넌트 렌더링은 **한 번 시작되면 중단할 수 없음**
- 긴 연산을 하거나 많은 컴포넌트가 한꺼번에 업데이트되면  
  👉 **브라우저가 멈춘 것처럼 느껴질 수 있음 (UI 응답성 저하)**

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

| 조건                                   | 설명                                              |
| -------------------------------------- | ------------------------------------------------- |
| 1. 부모 컴포넌트가 리렌더링됨          | 부모가 리렌더링되면 자식도 기본적으로 다시 호출됨 |
| 2. `props`가 변경됨                    | 전달받은 props의 값이 이전과 다를 경우            |
| 3. `useState`로 관리하는 상태가 변경됨 | `setState` 호출 시 해당 컴포넌트 리렌더링         |
| 4. `useReducer`의 dispatch 발생        | 상태 업데이트 시 컴포넌트 리렌더링                |
| 5. `useContext`의 값이 변경됨          | 구독 중인 Context의 값이 바뀌면 리렌더링          |

---

### ⚠️ 그 외

- **`key` 값이 변경**될 경우 (리스트 등에서 컴포넌트가 새로 마운트됨)
- **`React.memo()`로 감싼 컴포넌트도** props가 얕은 비교에서 달라지면 리렌더링

📚 읽어볼만한 내용: [이노그리드 기술블로그 - React 리렌더링 정리](https://blog.naver.com/innogrid/222674355706)

---

## 7. JSX 여러 태그 반환

### JSX에서 여러 태그 반환하는 방법

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

#### map으로 묶어서 전달해야한다고 생각했으나

```tsx
<>
  <h1>Title</h1>
  <p>내용</p>
</>
```

---

#### <></>로 묶으면 끝...

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
