- edux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
  Redux:
  - JavaScript 애플리케이션에서 전역 상태(state)를 관리하는 라이브러리
  - 예측 가능한 상태 관리를 위해 액션(Action), 리듀서(Reducer), 스토어(Store)를 사용.
  - 단점: 복잡한 설정과 보일러플레이트 코드가 많다.
    (보일러플레이트란 ? 반복적이고 틀에 박힌 코드를 뜻함)
  Redux toolkit:
  - Redux의 공식 권장 툴킷으로, Redux를 더 쉽고 안전하게 사용하도록 도와줌.
  - `redux`, `redux-thunk`, `immer`, `reselect` 등의 기능이 통합되어 있어 설정이 간편
  - 보일러플레이트를 줄이고, 가독성과 유지보수성을 높여줌.
- redux-toolkit 사용법 (자세하게)
  - Provider
    Redux 상태를 앱 전체에 공급하기 위해 Provider 설정 필요
    ```tsx
    import React from "react";
    import ReactDOM from "react-dom/client";
    import { Provider } from "react-redux";
    import store from "./store";
    import App from "./App";

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    ```
  - configureStore
    스토어를 설정할 때 사용하는 함수
    ```tsx
    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from "./features/counterSlice";

    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });

    export default store;
    ```
  - createSlice
    액션과 리듀서를 한 번에 정의하는 함수
    ```tsx
    import { createSlice } from "@reduxjs/toolkit";

    const counterSlice = createSlice({
      name: "counter",
      initialState: {
        value: 0,
      },
      reducers: {
        increment: (state) => {
          state.value += 1;
        },
        decrement: (state) => {
          state.value -= 1;
        },
        incrementByAmount: (state, action) => {
          state.value += action.payload;
        },
      },
    });

    export const { increment, decrement, incrementByAmount } =
      counterSlice.actions;
    export default counterSlice.reducer;
    ```
  - useSelector
    Redux 상태를 가져오는 훅
    ```tsx
    import { useSelector } from "react-redux";

    const Counter = () => {
      const count = useSelector((state) => state.counter.value);
      return <div>{count}</div>;
    };
    ```
  - useDispatch
    액션을 디스패치하는 훅
    ```tsx
    import { useDispatch } from "react-redux";
    import { increment, decrement } from "./features/counterSlice";

    const CounterButtons = () => {
      const dispatch = useDispatch();

      return (
        <div>
          <button onClick={() => dispatch(increment())}>+1</button>
          <button onClick={() => dispatch(decrement())}>-1</button>
        </div>
      );
    };
    ```
  - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요
    비동기 API 요청 시 createAsyncThunk 사용
    정규화된 상태 관리 시 createEntityAdapter 사용
    - 게시글 목록, 사용자 목록처럼 객체 배열을 상태로 관리할 때
    - 각 항목에 빠르게 접근하거나 업데이트해야 할 때
    예시
    ```tsx
    import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

    const postsAdapter = createEntityAdapter();

    const initialState = postsAdapter.getInitialState({
      loading: false,
    });

    const postsSlice = createSlice({
      name: "posts",
      initialState,
      reducers: {
        addPost: postsAdapter.addOne,
        setAllPosts: postsAdapter.setAll,
        updatePost: postsAdapter.updateOne,
        removePost: postsAdapter.removeOne,
      },
    });

    export const { addPost, setAllPosts, updatePost, removePost } =
      postsSlice.actions;
    export default postsSlice.reducer;

    // 선택자 자동 생성
    export const { selectAll: selectAllPosts, selectById: selectPostById } =
      postsAdapter.getSelectors((state) => state.posts);
    ```
    `redux-devtools-extension` 자동 지원
