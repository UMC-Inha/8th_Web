# ⚛️ Redux Tookit, Zustand

## ❓ Props-Drilling이란?

> **Props-Drilling**은 React에서 컴포넌트 계층 구조가 깊어질 때, **상위 컴포넌트의 props를 중간 컴포넌트를 거쳐 하위 컴포넌트에 전달해야 하는 상황**을 의미합니다.

### 📌 예시

```jsx
function App() {
  const user = { name: "Alice" };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <p>Hello, {user.name}!</p>;
}
```

- 이 구조에서는 `GrandChild`가 `user`를 필요로 하지만, 직접 전달받을 수 없고 `App → Parent → Child`를 거쳐야 합니다.
- 중간 컴포넌트들은 `user`를 사용하지 않지만, **그저 전달만 하는** 역할로 부담이 증가합니다.

---

## 🛠️ 해결 방법

### ✅ 1. **React Context API 사용**

- 전역적으로 데이터를 공유할 수 있는 방법.
- 중간 컴포넌트를 거치지 않고도 하위 컴포넌트에서 데이터 접근 가능.

```jsx
const UserContext = createContext();

function App() {
  const user = { name: "Alice" };
  return (
    <UserContext.Provider value={user}>
      <GrandParent />
    </UserContext.Provider>
  );
}

function GrandChild() {
  const user = useContext(UserContext);
  return <p>Hello, {user.name}!</p>;
}
```

✅ 중간 단계 없이 바로 `useContext`로 접근 가능!

---

### ✅ 2. **상태 관리 라이브러리 도입 (Redux, Recoil 등)**

> Props-Drilling이 단순한 상태 전달이 아닌, **복잡한 상태 흐름과 다양한 컴포넌트 간 공유**가 필요한 상황으로 발전하면, Context API만으로는 한계가 있습니다.

- 앱 규모가 커지고 **비즈니스 로직과 상태 공유가 복잡해지면**, Context 대신 더 구조화된 상태 관리 솔루션을 사용하는 것이 유지보수에 유리합니다.
- 예: Redux, Zustand, Recoil 등

---

## ⚠️ 언제 Context를 쓰고, 언제 Redux를 쓸까?

| 상황                                   | 추천 방법                   |
| -------------------------------------- | --------------------------- |
| Props-Drilling 해결만 필요             | Context API                 |
| 상태 공유가 많고, 비즈니스 로직이 복잡 | Redux / Zustand / Recoil 등 |

---

## 📌 useReducer이란?

- `useReducer`는 컴포넌트에 **리듀서 기반의 상태 업데이트 로직**을 추가할 수 있는 React 훅이다.
- `useState`보다 **복잡한 상태, 다양한 액션 처리**에 적합하다.
- 초기 상태는 단순 값(`initialArg`) 또는 **초기화 함수**(`init`)로 설정 가능.
- `dispatch(action)`을 호출하면 `reducer(state, action)` 함수가 호출되어 **새로운 상태**를 반환한다.
- `useReducer`는 항상 **불변성(immutability)**을 유지해야 하며, 상태를 직접 변경하면 안 된다.

## 💡 사용법

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Reducer 함수 예시

```js
function reducer(state, action) {
  switch (action.type) {
    case "incremented_age":
      return { ...state, age: state.age + 1 };
    case "changed_name":
      return { ...state, name: action.nextName };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}
```

## 🆚 useState vs useReducer 비교표

| 항목                   | `useState`                        | `useReducer`                                        |
| ---------------------- | --------------------------------- | --------------------------------------------------- |
| **사용 목적**          | 간단한 상태 관리                  | 복잡한 상태, 다양한 액션 처리 필요할 때             |
| **초기 설정**          | 상태 변수, set함수                | `state`, `dispatch`, `reducer`, `initialState` 필요 |
| **상태 구조**          | 단일 값 또는 객체                 | 복수 속성을 가진 구조적인 객체                      |
| **업데이트 방식**      | 직접 `setState` 호출              | `dispatch({ type, payload })`로 리듀서 함수 호출    |
| **불변성 처리**        | 직접 수정 시 실수 위험            | 반드시 새로운 객체 반환 (스프레드/immer 사용 권장)  |
| **로직 응집도**        | 컴포넌트 내부에 흩어짐            | 리듀서 함수에 집중되어 명확함                       |
| **유지보수**           | 상태 많아지면 복잡                | 상태 구조화에 유리, 협업 시 명확한 로직 공유 가능   |
| **추가 기능**          | 액션별 처리 불편                  | `payload` 활용해 다양한 사용자 인터랙션 처리 가능   |
| **추천 시점**          | 단순한 값 제어 (토글, 폼 필드 등) | 조건 분기, 에러 처리, 다중 상태 변화 등 복합 상황   |
| **확장성 (전역 관리)** | 제한적 (Context 조합 필요)        | Redux Toolkit 등과 자연스럽게 연계 가능             |

### 🧪 실전 예제

```jsx
import { useReducer } from "react";

const initialState = { name: "Taylor", age: 42 };

function reducer(state, action) {
  switch (action.type) {
    case "incremented_age":
      return { ...state, age: state.age + 1 };
    case "changed_name":
      return { ...state, name: action.nextName };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <input
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "changed_name", nextName: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "incremented_age" })}>
        Increase Age
      </button>
      <p>
        {state.name} is {state.age} years old.
      </p>
    </>
  );
}
```

## 🆚 Redux vs Redux Toolkit 비교

| 항목        | Redux                   | Redux Toolkit (RTK)               |
| ----------- | ----------------------- | --------------------------------- |
| 설치        | `redux`, `react-redux`  | `@reduxjs/toolkit`, `react-redux` |
| 스토어 생성 | `createStore()`         | `configureStore()`                |
| 리듀서 작성 | 수동 작성 (switch-case) | `createSlice()`로 자동 생성       |
| 액션 생성   | type 상수 + 액션 생성자 | 자동 생성됨 (슬라이스 내부에서)   |
| 불변성 처리 | 수동 (spread 등 사용)   | 자동 (Immer 내장)                 |
| 비동기 처리 | `redux-thunk` 수동 설정 | `createAsyncThunk()` 기본 내장    |
| 개발 편의성 | 설정 많고 반복적        | 간단하고 직관적, 생산성 ↑         |

---

### 🔁 Redux Toolkit 플로우 요약

1. **Redux 스토어 생성**: `configureStore()` 사용
   → Redux 전역 상태 저장소를 생성하며 미들웨어와 DevTools도 자동 설정됩니다.

2. **Slice 정의**: `createSlice()`로 상태 + 리듀서 + 액션 생성
   → 슬라이스 단위로 관련 상태와 로직을 하나의 파일로 관리하여 모듈화가 쉬워집니다.

3. **컴포넌트에서 사용**

   - 상태 조회: `useSelector`
     → Redux 상태를 읽어오는 표준 Hook입니다.
   - 액션 디스패치: `useDispatch`
     → 액션을 전달하여 상태를 업데이트할 수 있습니다.

4. **Provider로 앱 감싸기**: 스토어 연결
   → 컴포넌트 트리 전체에서 Redux 상태에 접근할 수 있도록 Context로 전달합니다.

---

### 🧰 Redux Toolkit 사용법 요약

#### 1. Provider로 스토어 전달

```tsx
// main.tsx
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

<Provider store={store}>
  <App />
</Provider>;
```

> 앱 전체에 Redux 상태를 주입해주는 역할을 합니다.

#### 2. configureStore

```ts
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

> 여러 슬라이스를 하나로 통합하고 미들웨어와 DevTools를 자동 설정합니다.

#### 3. createSlice

```ts
// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

> 액션 타입, 액션 생성자, 리듀서를 한 번에 선언할 수 있어 코드량이 대폭 감소합니다.

#### 4. useSelector (상태 조회)

```tsx
// Counter.tsx
import { useSelector } from "react-redux";

const count = useSelector((state) => state.counter.value);
```

> Redux 전역 상태에서 특정 값을 읽어올 수 있는 Hook입니다.

#### 5. useDispatch (액션 디스패치)

```tsx
import { useDispatch } from "react-redux";
import { increment } from "./counterSlice";

const dispatch = useDispatch();
dispatch(increment());
```

> Redux 액션을 컴포넌트에서 발생시킬 수 있도록 도와주는 Hook입니다.

#### 6. 비동기 로직: createAsyncThunk

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetch", async () => {
  const res = await fetch("/api/data");
  return await res.json();
});
```

> 비동기 요청에 대한 상태(`pending`, `fulfilled`, `rejected`)를 자동으로 생성해 줍니다.

#### 7. extraReducers로 비동기 상태 처리

```ts
extraReducers: (builder) => {
  builder
    .addCase(fetchData.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.value = action.payload;
    })
    .addCase(fetchData.rejected, (state) => {
      state.status = "failed";
    });
};
```

> 외부에서 생성된 액션에 반응하여 상태를 업데이트할 수 있는 설정입니다.

---

## 🆚 Zustand vs Redux (툴킷 포함) 비교

| 항목                 | Zustand                          | Redux / Redux Toolkit         |
| -------------------- | -------------------------------- | ----------------------------- |
| 📦 라이브러리 크기   | 매우 작음 (1kB 미만)             | 상대적으로 큼                 |
| 🧱 보일러플레이트    | 거의 없음                        | 많음 (slice, reducer 등 필요) |
| ⚙ 설정 편의성        | Provider 없이 바로 사용          | 설정 많음, Provider 필수      |
| 📚 학습 난이도       | 매우 낮음                        | 비교적 높음                   |
| ⚡ 성능              | 구독 기반, 리렌더링 최적화       | 전체 리렌더링 우려 있음       |
| 🔌 확장성            | Devtools, persist 등 가볍게 확장 | thunk, saga 등 풍부한 생태계  |
| 🧪 디버깅 도구       | Devtools 지원 쉬움               | Redux Devtools 강력함         |
| 🧠 사용 철학         | 실용적, 유연함                   | 구조적, 예측 가능한 상태 관리 |
| 🧩 타입스크립트 호환 | 매우 우수                        | Toolkit 기준 매우 우수        |
| 🛠 공식 문서          | 짧고 간결                        | 매우 체계적                   |

### 🧠 핵심 차이 요약

| 분류            | 설명                                                                         |
| --------------- | ---------------------------------------------------------------------------- |
| 설계 철학       | Redux: 예측 가능한 상태 관리<br>Zustand: 간편하고 빠르게 상태 공유           |
| 코드 구조       | Redux: 구조적<br>Zustand: 자유롭고 단순                                      |
| 리렌더링 제어   | Zustand: 필요한 값만 구독<br>Redux: 상태 변경 시 관련 컴포넌트 리렌더링 가능 |
| 적합한 프로젝트 | Zustand: 소규모/단순 앱<br>Redux: 복잡한 로직, 대규모 팀 협업                |

### 📝 결론 요약

#### ✅ Zustand가 적합한 경우

- 빠른 상태 공유 필요할 때
- 복잡하지 않은 상태 흐름
- 리렌더링 최적화가 중요한 경우
- Redux의 구조적 방식이 부담스러울 때

#### ✅ Redux가 적합한 경우

- 복잡한 상태 흐름 (ex: 여러 API 요청, 비동기 처리)
- 상태 추적 및 디버깅 중요할 때
- 기존 Redux 사용 중이거나 팀 전통이 있을 때
