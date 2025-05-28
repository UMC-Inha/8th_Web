- Props-Drilling 🍠

  - Props-Drilling은 무엇인가요?
    **Prop Drilling이란 props를 '하위 컴포넌트로 전달하는 용도로만 쓰이는' 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정이다.**
    **다시말해 props를 통해 데이터를 전달하는 과정에서 중간 컴포넌트는 그 데이터가 필요하지 않음에도 자식 컴포넌트에 전달하기 위해 props를 전달해야하는 과정을 말한다.**
  - 이를 어떻게 해결할 수 있을까요?
    1. **Context API**
    React의 Context API를 사용하여 데이터를 전역적으로 공유할 수 있다. Context를 생성하고 값을 제공하는 컴포넌트를 작성한 다음, 필요한 컴포넌트에서 useContext 훅을 사용하여 해당 값을 직접 접근할 수 있다.이를 통해 중간 컴포넌트를 거치지 않고도 데이터를 전달할 수 있다.
    2. **Redux 또는 다른 상태 관리 라이브러리**
    Redux와 같은 상태 관리 라이브러리를 사용하면 애플리케이션의 상태를 중앙에서 관리할 수 있다. 상태를 저장하고 필요한 컴포넌트에서 상태를 가져와 사용할 수 있다.이를 통해 prop drilling을 피하고 상태를 전역적으로 공유할 수 있다.
    3. **Custom Hooks**
    Custom Hooks를 사용하여 관련된 로직을 재사용 가능한 함수로 추상화할 수 있다. 커스텀 훅 내에서 상태와 로직을 처리하고, 필요한 컴포넌트에서 해당 훅을 호출하여 데이터를 가져올 수 있다. 이를 통해 prop drilling을 해소하고 데이터 전달을 보다 간편하게 할 수 있다.
    4. **Render Props 패턴과 Children props**
    Render Props 패턴이나 Children props를 활용하여 데이터를 부모 컴포넌트에서 자식 컴포넌트로 전달할 수 있다. Render Props 패턴은 부모 컴포넌트에서 함수를 정의하고, 자식 컴포넌트에서 해당 함수를 호출하여 데이터를 전달받을 수 있다. Children props는 부모 컴포넌트에서 컴포넌트 태그 사이의 내용을 자식 컴포넌트로 전달한다.

- **`useReducer`** 에 대하여 정리해주세요! 🍠

  `useReducer`컴포넌트에 reducer를 추가할 수 있는 React Hook이다.

  ```tsx
  useReducer(reducer,initialArg, init?)
  ```

  useReducer 구성요소의 최상위 수준에서 호출하여 리듀서를 사용하여 상태를 관리한다.

  - `reducer`
    : 상태가 업데이트되는 방식을 지정하는 리듀서 함수. 순수 함수여야 하며, 상태와 동작을 인수로 받고 다음 상태를 반환해야 한다. 상태와 동작은 어떤 유형이든 가능하다.
  - `initialArginit`
    : 초기 상태를 계산하는 값. 모든 유형의 값이 될 수 있다. 초기 상태를 계산하는 방식은 다음 init 인수에 따라 달라집니다.
  - optional `init`

  : 초기 상태를 반환해야 하는 초기화 함수입니다. 지정하지 않으면 초기 상태가 initioaArg 로 설정된다. 지정한다면 초기 상태는 init(initialArg)를 호출하는 상태가 된다.

  ### 반환값

  useReducer는 정확히 두 개의 값을 가진 배열로 반환된다.

  1. 현재 상태를 반환한다. 첫 렌더링 시에 init(initialArg)나 initArg둘 중 하나로 설정된다.
  2. 새로운 값으로의 상태 업데이트, 리렌더링을 일으키는 dispatch 함수를 반환한다.

  ### 주의사항

  - `useReducer`는 Hook이므로 **컴포넌트의 최상위** 또는 커스텀 Hook에서만 호출할 수 있다. 반복문이나 조건문에서는 사용할 수 없다. 필요한 경우 새로운 컴포넌트를 추출하고 해당 컴포넌트로 State를 옮겨서 사용할 수 있다.
  - `dispatch` 함수는 안정된 식별성을 가지고 있기 때문에, 흔히 Effect의 의존성에서 제외하는 것을 볼 수 있다. 하지만 포함해도 Effect를 실행하지는 않는다.
  - Strict Mode에서는 우연한 비순수성을 찾아내기 위해 Reducer와 `init` 함수를 두번 호출한다. 개발 환경에서만 한정된 동작이며, 배포 환경에는 영향을 미치지 않는다. Reducer와 `init` 함수가 순수 함수라면 로직에 어떠한 영향도 미치지 않는다. 호출 중 하나의 결과는 무시한다.

  # **`dispatch` 함수**

  `useReducer`에 의해 반환되는 `dispatch` 함수는 state를 새로운 값으로 업데이트하고 리렌더링을 일으킨다. `dispatch`의 유일한 인수는 action이다.

  ```tsx
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  function handleClick() {
    dispatch({ type: 'incremented_age' });
    // ...
  ```

  React는 현재 `state`와 `dispatch`를 통해 전달된 action을 제공받아 호출된 `reducer`의 반환값을 통해 다음 state값을 설정한다.

  ### **매개변수**

  - `action`: 사용자에 의해 수행된 활동이다. 모든 데이터 타입이 할당될 수 있다. 컨벤션에 의해 action은 일반적으로 action을 정의하는 `type` 프로퍼티와 추가적인 정보를 표현하는 기타 프로퍼티를 포함한 객체로 구성된다.

  ###

  - `dispatch` 함수는 **오직 _다음_ 렌더링에 사용할 state 변수만 업데이트 한다.** 만약 `dispatch` 함수를 호출한 직후에 state 변수를 읽는다면 호출 이전의 값을 참조한다.
  - `Object.is` 비교를 통해 새롭게 제공된 값과 현재 `state`를 비교한 값이 같을 경우, React는 컴포넌트와 해당 컴포넌트의 자식 요소들의 리렌더링을 건너뛴다. 이것은 최적화에 관련된 동작으로써 결과를 무시하기 전에 컴포넌트가 호출되지만, 호출된 결과가 코드에 영향을 미치지는 않는다.
  - React는 state 업데이트를 batch한다. **이벤트 핸들러의 모든 코드가 수행**되고 `set` 함수가 모두 호출된 후에 화면을 업데이트 한다. 이는 하나의 이벤트에 리렌더링이 여러번 일어나는 것을 방지한다. DOM 접근 등 이른 화면 업데이트를 강제해야할 특수한 상황이 있을 경우 flushSyn를 사용할 수 있다.

  # 사용법

  state를 reducer로 관리하기 위해 `useReducer`를 컴포넌트의 최상단에서 호출한다

  .

  ```tsx
  import { useReducer } from 'react';

  function reducer(state, action) {
    // ...
  }

  function MyComponent() {
    const [state, dispatch] = useReducer(reducer, { age: 42 });
    // ...
  ```

  화면을 업데이트하려면 action 객체를 인수로 하여 dispatch 함수를 호출한다.

  ```tsx
  function handleClick() {
    dispatch({ type: "incremented_age" });
  }
  ```

  `useReducer`는 `useState`와 매우 유사하지만, state 업데이트 로직을 이벤트 핸들러에서 컴포넌트 외부의 단일함수로 분리할 수 있다는 차이점이 있다.

  reducer 함수는 다음과 같이 선언한다.

  ```tsx
  function reducer(state, action) {
    // ...
  }
  ```

  이후 다음 state를 계산할 코드를 작성하고, 계산된 state를 반환한다. 보통은 컨벤션에 따라 `switch` 문을 사용한다. `switch`는 각 `case`를 이용해 다음 state를 계산하고 반환한다.

  ```tsx
  function reducer(state, action) {
    switch (action.type) {
      case "incremented_age": {
        return {
          name: state.name,
          age: state.age + 1,
        };
      }
      case "changed_name": {
        return {
          name: action.nextName,
          age: state.age,
        };
      }
    }
    throw Error("Unknown action: " + action.type);
  }
  ```

  - redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)

  **Redux를 더 쉽게 사용할 수 있도록 만들어진 툴킷**

  Redux 로직을 작성하는 공식적인 방법이다. Redux의 복잡성을 줄이고 효율적인 개발을 위해 설계되었으며, 새로운 Redux 프로젝트에서 강력히 권장된다.

  Redux Toolkit은 Redux의 핵심 기능을 간결하게 제공하며, 불변성 처리, 리듀서 작성, 액션 생성, 스토어 설정 등을 쉽게 할 수 있도록 도와준다. 덕분에 Redux를 처음 접하는 개발자나, 기존 Redux 코드의 유지보수를 하는 개발자 모두에게 편리하게 사용할 수 있다.

  Redux를 사용하면서 겪는 복잡한 설정과 보일러플레이트 코드를 줄여 Redux 개발에 집중할 수 있도록 도와준다.

- redux-toolkit 사용법 (자세하게)

  - Provider
    React에서 redux상태를 사용할 수 있도록 해주는 컴포넌트이다.
    Redux를 사용하는 앱에서는 전역 상태를 관리하기 위해 **store**를 생성한다. 그런데 이 store를 React 컴포넌트들이 접근하려면 React의 Context 시스템을 이용해야 한다. 여기서 provider는 React의 Context API를 활용해서 store를 앱 전체에 주입해주는 역할을 한다.
    Provider는 store를 props로 받아서 React 앱의 최상위 컴포넌트를 감싸고,
    하위 컴포넌트들이 store에 접근할 수 있게 해 준다.
    ```tsx
    import React from "react";
    import ReactDOM from "react-dom";
    import { Provider } from "react-redux";
    import { store } from "./store"; // Redux store
    import App from "./App";

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
    ```
  - configureStore
    `configureStore`는 Redux Toolkit(RTK)에서 제공하는 함수로,
    **Redux의 store를 간단하고 안전하게 설정해주는 도구이다.**
    Redux의 기본 store 생성 방식인 `createStore`를 대체해서 사용된다.
    기존의 Redux에서는 store를 만들 때 `createStore`와 미들웨어, 리듀서를 직접 조합해야 해서 복잡했지만,
    `configureStore`는 그런 설정을 자동으로 해줘서 **보일러플레이트 코드를 줄여주는 역할을 한다.**
    - 기본적으로 `redux-thunk` 미들웨어를 포함해주기 때문에 비동기 액션도 따로 설정할 필요기 없다.
    - `devTools` 옵션을 자동으로 설정하기 때문에 개발자 도구 사용이 쉽다.
    - 여러 slice reducer들을 combineReducers로 합치는 것도 자동으로 해 준다.
    - TypeScript 지원이 잘 되어 있어 타입 안전성이 높다.
    ```tsx
    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from "./features/counter/counterSlice";

    export const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    ```
    reducer 필드에 객체를 전달. 각 slice의 reducer를 등록
    → configureStore가 내부적으로 combineReducer 동
  - createSlice
    createSlice는 Redux Toolkit(RTK)에서 리듀서 함수와 액션 생성자를 한번에 만드는 도구이다.
    즉, 리듀서를 더 간단하게 만들고, 액션 생성자(action creator)도 자동 생성해주는 함수다**.**
    기존 Redux에서는 액션 타입을 정의하고 액션 생성자 함수를 작성한 후 리듀서에서 `switch-case`로 처리하는 형태로 코드가 길고 복잡했지만, `createSlice`는 이걸 한 번에 처리할 수 있도록 도와준다.
    ```tsx
    import { createSlice } from "@reduxjs/toolkit";

    const counterSlice = createSlice({
      name: "counter", // slice 이름 (액션 타입의 prefix로 사용됨)
      initialState: { value: 0 }, // 초기 상태
      reducers: {
        increment: (state) => {
          state.value += 1; // immer 덕분에 직접 상태 변경 가능
        },
        decrement: (state) => {
          state.value -= 1;
        },
        incrementByAmount: (state, action) => {
          state.value += action.payload; // payload는 자동 전달됨
        },
      },
    });

    // 액션 생성자 및 리듀서 내보내기
    export const { increment, decrement, incrementByAmount } =
      counterSlice.actions;
    export default counterSlice.reducer;
    ```
    카운터 예제
  - useSelector
    useSelector는 React 컴포넌트에서 Redux의 상태를 꺼내오기 위해 사용하는 훅
    이다. 쉽게 말해, Redux store의 상태를 읽어오는 함수다.
    react-redux에서 제공하는 훅으로, Redux store에 있는 state 중에서 필요한 부분을 가져오는 역할을 한다.
    ```tsx
    const selectedData = useSelector((state) => state.someData);
    ```
    state는 store에 저장된 전체 state 객체이다.
    (state) ⇒ state.someData 는 선택자 함수이다.
    이 함수의 반환값이 컴포넌트에서 사용할 값이 된다.
  - useDispatch
    useDispatch는 react-redux에서 제공하는 훅으로, Redux store의 dispatch 함수를 가져오는 역할을 한다. dispatch 함수를 사용해서 액션을 store로 보내면 리듀서가 해당 액션을 처리하고 상태를 업데이트한다.
    ```tsx
    import { useDispatch } from "react-redux";
    import { increment } from "./counterSlice";

    const MyComponent = () => {
      const dispatch = useDispatch(); // dispatch 함수 가져오기

      const handleClick = () => {
        dispatch(increment()); // 액션 dispatch
      };

      return <button onClick={handleClick}>+</button>;
    };
    ```
    dispatch 함수는 액션 개체 또는 액션 생성자 함수의 결과를 인자로 받는다.

- **`Zustand`**에 대하여 정리해주세요! 🍠
  zustand는 가볍고 간단한 상태 관리 라이브러리이다. Redux보다 더 간단한 api와 적은 코드량으로 상태 관리가 가능하다. React에 종속되지 않아서 React 외부에서도 상태 접근이 가능하다.
  ```tsx
  import { create } from "zustand";

  const useStore = create((set) => ({
    count: 0, // 상태 변수
    increase: () => set((state) => ({ count: state.count + 1 })), // 상태 변경 함수
    decrease: () => set((state) => ({ count: state.count - 1 })),
  }));
  ```
  create() 함수로 상태와 변경 함수를 정의한다.
  set은 상태를 업데이트 하는 함수이며, state는 현재 상태 값을 나타낸다.
  ```tsx
  import React from "react";
  import useStore from "./store";

  function Counter() {
    const count = useStore((state) => state.count); // count 값 가져오기
    const increase = useStore((state) => state.increase); // increase 함수 가져오기

    return (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={increase}>+</button>
      </div>
    );
  }

  export default Counter;
  ```
  useStore를 불러와서 (state) ⇒ state.count 처럼 원하는 값만 가져올 수 있다.
  useSelector없이 바로 접근이 가능하다.
  ## 언제 사용하면 좋을까?
  1. 작은 프로젝트
  2. 빠른 프로토타입
  3. 상태관리가 단순한 경우
  4. Context API를 대체하고 싶을 때
  5. Redux를 쓰기에는 너무 복잡할 때
