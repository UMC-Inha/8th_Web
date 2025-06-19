- Props-Drilling 🍠
    - Props-Drilling은 무엇인가요?
        
        React 어플리케이션에서 데이터를 전달하기 위해 필요한 과정을 설명하는 용어이다. 이는 컴포넌트 트리에서 데이터를 하위 컴포넌트로 전달하기 위해서 중간 컴포넌트를 통해 property 를 내려주는 것을 의미합니다. 이런 중간 컴포넌트는 원하는 자식 컴포넌트에게 property 를 전달하기 위해 필요하지만, 해당 값을 직접 사용하지 않는 경우에도 property 를 받고 전달해야 합니다.
        
        Props-Drilling 의 문제점 :  
        
        props 전달이 3~5 개 정도 되는 컴포넌트라면 이 방식은 문제가 되지 않습니다. 하지만 props 전달이 그 이상으로 더 많은 전달 과정을 거치게 된다면 코드를 읽을 때 props 를 추적하기 어려워진다는 문제점이 있습니다.
        
        장점 
        
        1. 명시적인 값의 사용
            
            Props-Drilling 을 통해서 값을 전달하는 방식은 어디서 데이터가 사용되는지 명확하게 보여줍니다. 각 컴포넌트에서 어떤 property 를 받아 사용하는지 확인할 수 있기 때문에, 코드의 의도를 더욱 명확하게 파악할 수 있습니다.
            
        2. 값 추적의 용이성
            
            Props-Drilling 을 사용하면 값의 흐름을 쉽게 추적할 수 있습니다. 값이 어떤 컴포넌트를 거쳐 전달되는지 알 수 있기 때문에 버그를 디버깅하거나 코드를 변경할 때 용이합니다.
            
        3. 코드 변경 파악 용이성 
            
            Props-Drilling 을 통해 데이터가 전달되는 경로를 알 수 있기 때문에 코드 변경이 어플리케이션의 다른 부분에 어떤 영향을 주는지 파악하는 것이 용이합니다. 데이터의 흐름을 명확하게 파악할 수 있으므로 변경 사항에 따른 영향을 사전에 예측하고 관리할 수 있습니다.
            
        
        단점
        
        1. property 데이터 형식 변경의 불편함
            
            Props-Drilling 데이터의 데이터 형식을 변경해야 하는 경우, 컴포넌트 계층 전체에서 업데이트 하는 것이 어려울 수 있습니다.
            
        2. 중간 컴포넌트에서 불필요한 property 전달
            
            컴포넌트 분리 과정에서 중간 컴포넌트를 통해 불필요한 property 가 전달될 수 있어 불필요한 복잡성을 초래할 수 있습니다.
            
        3. 누락된 property 에 대한 인지 어려움
            
            필요한 property 가 타겟 컴포넌트에 전달되지 않은 상황을 인지하기 어려울 수 있기 때문에 잠재적인 문제를 발견하기 어려울 수 있습니다.
            
        4. property 이름 변경의 추적이 어려움
            
            property 이름이 계층에서 변경되면 해당 값을 추적하고 업데이트 하는 것이 어려울 수 있습니다.
            
        
    - 이를 어떻게 해결할 수 있을까요?
        1. Context API
            
            이를 이용하여 데이터를 전역적으로 공유할 수 있습니다. Context 를 생성하고 값을 제공하는 컴포넌트를 작성한 후 필요한 컴포넌트에서 useContext 훅을 사용하여 해당 값을 직접 접근할 수 있습니다. 이를 통해 중간 과정을 거치지 않고도 데이터를 전달할 수 있습니다.
            
        2. Redux 또는 다른 상태 관리 라이브러리
            
            Redux 와 같은 상태 관리 라이브러리 (Mobx, recoli 등 존재) 를 사용하면 애플리케이션 상태를 중앙에서 관리할 수 있습니다. 상태를 저장하고 필요한 컴포넌트에서 상태를 가져와 사용할 수 있습니다. 이를 통해 Prop-Drilling 을 피하고 상태를 전역적으로 공유할 수 있습니다.
            
        3. Custom Hooks
            
            Custom Hooks 를 사용하면 관련된 로직을 재사용 가능한 함수로 추상화할 수 있습니다. 커스텀 훅내에서 상태와 로직을 처리하고, 필요한 컴포넌트에서 해당 훅을 호출하여 데이터를 가져올 수 있습니다. 이를 통해 Props-Driilling 을 해소하고 데이터 전달을 간편하게 할 수 있습니다.
            
        4. Render Props 패턴과 Children Props
            
            Render Props 패턴이나 Children Props 패턴을 사용하면 데이터를 부모 컴포넌트에서 자식 컴포넌트로 전달할 수 있습니다. 
            
            1. Render Props 패턴 : 부모 컴포넌트에서 함수를 정의하고, 자식 컴포넌트에서 해당 함수를 호출하여 데이터를 전달 받을 수 있습니다. 
            2. Children Props 패턴 : 부모 컴포넌트에서 컴포넌트 태그 사이의 내용을 자식 컴포넌트로 전달합니다. Children 은 태그와 태그 사이에 모든 내용을 표기하기 위한 특수한 Props 입니다.

- **`useReducer`** 에 대하여 정리해주세요! 🍠
    
    useReducer 은 useState 처럼 상태를 관리, 상태 업데이트 Hook 입니다. 상태를 관리할 데이터의 양이 많아질 때 사용하며, 조금 더 구조화된 방식으로 상태를 관리하고 싶을 때 사용할 수 있습니다. 아래와 같이 선언하여 사용합니다.
    
    ```jsx
    const [state, dispatch] = useReducer(reducer, initialState);
    ```
    
    - `state` : 상태 이름
    - `dispatch` : 상태를 변경할 시 필요한 정보를 전달하는 함수
    - `reducer` : dispatch 를 확인하여 state 를 변경하는 함수
    - `initialState` : state 에 전달할 초기값 (객체, 배열 등 다양한 값으로 전달 가능)
    
    주로 복잡한 상태 관리 로직을 다루거나 여러 컴포넌트 간의 상태를 공유할 때 사용합니다. useReducer 는 클래스 컴포넌트에서 setState 와 유사한 역할을 수행하지만, 좀 더 구조화된 방식으로 상태를 관리할 수 있도록 합니다.

- redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
    
    먼저 redux-toolkit 이란, redux 의 아래의 세 가지 문제점을 보완하기 위해 제작되었습니다.
    
    1. redux 스토어 구성의 복잡성
    2. redux 를 사용할 때 많은 패키지를 추가해야 하는 불편함
    3. redux 사용 시 많은 상용 코드 필요
    
    즉, 간단하게 요약하자면 redux 가 대규모 프로젝트에서는 편리하게 사용되지만, redux 를 사용할 시 필요한 코드의 작성이 증가하고 필요로하는 라이브러리의 양이 굉장히 많다는 단점이 있고, 이를 보완하기 위해 redux-toolkit 이 개발되었습니다.
    
    **redux-toolkit 이 지원하는 기능**
    
    - **redux-action**
        
        액션 생성 함수를 더 짧은 코드로 작성할 수 있도록 도와줍니다.                                             reducer 를 작성할 때, switch 문이 아닌 `handleActions` 라는 함수를 사용할 수 있게 합니다.
        
        설치 : `npm add redux-actions`
        
        `createAction` : 액션 생성 함수, 직접 객체를 만들 필요가 없어 간단합니다. (action 생성 자동화)
        
        → 사용하지 않을 시 : Redux 의 action 생성자를 하나씩 제작하여야 합니다.
        
        → 사용할 시 : 파라미터로 전달 받은 값을 객체에 넣는 패턴을 이 함수로 간단히 해결 가능합니다.
        
        handleActions : reducer 를 더욱 간단하게 작성 가능
        
        → 사용하지 않을 시 : switch 문으로 복잡하게 구현하여야 합니다.
        
        → 사용할 시 : createAction() 을 사용하여 기존 방식과 다른 payload 방식을 사용하여야 합니다.
        
    - **reselect**
        
        redux 가 store 에서 값을 가져와 객체의 값 중 일부만 가져올 때, 리렌더링을 일으키지 않도록 도와줍니다.
        
        필요로 하는 state 를 첫 번째 인자로 사용하고, 그 state 에서 어떤 값을 필요로 하는지 필터링 해 줄 콜백 함수를 넣어줍니다. 기존에는 reference 만 비교하여, 값이 바뀌지 않고 참조하는 object 의 reference 값만 바뀌어도 함수가 다시 실행되고, 리렌더링 되었지만 createSelector 를 통해 값을 가져올 시에는 그 값이 캐싱되어 값이 바뀌었는지 여부를 확인할 수 있게 되어 최적화할 수 있습니다.
        
    - immer 의 producer
        
        redux 또한 reference 값을 얕은 비교로 판별합니다. 따라서 redux 에서는 직접적으로 상태를 변경해서는 안 되고, 이를 실시하면 아래와 같은 문제가 발생합니다.
        
        1. UI 가 최신값으로 업데이트 되지 않습니다.
        2. 상태가 업데이트된 이유와 방법을 이해하기 어렵습니다.
        3. 테스트 작성이 어렵습니다.
        4. 시간 디버깅을 올바르게 사용하는 기능이 중단됩니다.
        
        redux-toolkit 에서 createReducer API 는 내부에서 자동으로 immer 를 사용합니다. 따라서 직접 값을 push 하는 것도 가능합니다.
        
        → 주의할 점 : immer 에서는 기존의 draft 값을 변경하려는 시도를 추적하지만, 기존 상태를 변경했음에도 불구하고 상태값을 직접적으로 반환하면 오류가 발생합니다.
        
        따라서 immer 은 실제 변경을 수행하지 않습니다.
        
    
    - Flux Standard Action 강제화
        
        Flux 디자인 패턴을 사용하지 않으면 무조건적으로 에러를 띄우게 되며, 값은 action.payload 를 통해서만 접근할 수 있습니다.
        
    - Type Definition
        
        type 에 관한 정의들을 내장 타입으로 지원하여 type 에 대해 신경써야하는 번거로움이 사라졌습니다.

- redux-toolkit 사용법 (자세하게)
    - Provider
        
        redux-toolkit 을 사용하기 위해서는 `Provider` 로 감쌀 필요가 있습니다.
        
        ```tsx
        import ReactDOM from "react-dom/client";
        import App from "./App";
        import { store } from "./app/store";
        import { Provider } from "react-redux";
        
        const root = ReactDOM.createRoot(
        	document.getElementById("root") as HTMLElement
        );
        
        root.render(
        	<Provider store = { store }>
        		<App />
        	</Provider>
        )
        ```
        
    - configureStore
        
        redux-toolkit 에서 `configureStore` 는 미들웨어 설정, DevTools 활성화, reducer 합치기 등을 간단하게 해줍니다.
        
        ```tsx
        import { configureStore } from "@reduxjs/toolkit";
        import counterReducer from "../features/counter/counterSlice";
        
        export const store = configureStore({
        	reducer : {
        		counter : counterReducer,
        	},
        })
        
        // 타입 추론을 위해서 타입을 export 해 줍니다.
        export type RootState = ReturnType<typeof store.getState>;
        export type AppDispatch = typeof store.dispatch;
        ```
        
    - createSlice
        
        `createSlice` 는 state, reducer, action creator 를 한 번에 만들어 줍니다.
        
        ```tsx
        import { createSlice } from '@reduxjs/toolkit';
        
        const counterSlice = createSlice({
          name: 'counter',
          initialState: { value: 0 },
          reducers: {
            increment: (state) => { state.value += 1 },
            decrement: (state) => { state.value -= 1 },
          },
        });
        
        export const { increment, decrement } = counterSlice.actions;
        export default counterSlice.reducer;
        ```
        
    - useSelector
        
        `useSelector` 는 redux 상태를 읽어옵니다. 
        
        ```tsx
        import { useSelector } from "react-redux";
        import type { RootState } from "../app/store";
        
        const Counter = () => {
          const count = useSelector((state: RootState) => state.counter.value);
        
          return <div>Count: {count}</div>;
        };
        ```
        
    - useDispatch
        
        `useDispatch` 를 사용하면 slice 에서 만든 액션을 컴포넌트에서 실행할 수 있습니다.
        
        ```tsx
        import { useDispatch } from "react-redux";
        import { increment, decrement, incrementByAmount } from "../features/counter/counterSlice";
        import type { AppDispatch } from "../app/store";
        
        const CounterControls = () => {
          const dispatch = useDispatch<AppDispatch>();
        
          return (
            <div>
              <button onClick={() => dispatch(decrement())}>-</button>
              <button onClick={() => dispatch(increment())}>+</button>
              <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
            </div>
          );
        };
        ```
        
    - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요
        
        redux-toolkit 에서는 비동기 로직을 `createAsyncThunk` 로 깔끔하게 처리할 수 있습니다.
        
        ```tsx
        import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
        import axios from "axios";
        
        export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
          const response = await axios.get("/api/users");
          return response.data;
        });
        
        const userSlice = createSlice({
          name: "user",
          initialState: {
            users: [],
            loading: false,
            error: null,
          },
          reducers: {},
          extraReducers: (builder) => {
            builder
              .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
              })
              .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
          },
        });
        
        export default userSlice.reducer;
        
        ```
        

    - **`Zustand`**에 대하여 정리해주세요! 🍠
        
        기존 라이브러리가 가지고 있는 복잡성과 상당한 코드량 등의 문제를 해결하기 위해 등장하였습니다. Zustand 는 단순하고 직관적인 API 를 제공하기 때문에, 어플리케이션의 상태 관리를 쉽게 할 수 있도록 해 줍니다. 
        
        `Zustand` 란?
        
        - React 를 위한 작고 빠르고 확장 가능한 상태 관리 라이브러리입니다.
        - store 중심 접근 방식으로 프로세스를 단순화했고, React 함수형 컴포넌트에서 context 와 hook 을 사용하여 추가적인 의존성이나 보일러플레이트 코드 없이 어플리케이션의 상태를 관리할 수 있게 되었습니다.
        - 단순하고 효율적이며, 사용하기에 쉽습니다. redux 나 mobX 의 복잡한 상태 관리 솔루션을 피하고 경량화된 대안을 찾는 개발자에게 좋은 선택입니다.
        
        **스토어 (Store)**
        
        : Zustand 의 어플리케이션 상태의 single source of truth 인 스토어는 어플리케이션의 상태를 관리하는 장소입니다. 이 스토어는 Zustand 가 제공하는 create 함수를 통해 생성됩니다.
        
        **상태 (State)**
        
        : Zustand 의 상태는 어플리케이션이 관리하고자 하는 데이터를 의미합니다. 시간이 지남에 따라 변할 수 있는 정보로, 객체, 배열, 원시 타입 등 어떤 타입이든지 될 수 있습니다.
        
        **액션 (Action)**
        
        : Zustand 의 액션은 상태를 수정할 수 있게 하는 함수들입니다. 이 함수들은 스토어 내에서 정의되고, 제어된 방식으로 상태를 업데이트하는 역할을 수행합니다. redux 의 reducer 와 비슷하지만 더 유연하고 정의하기 쉽습니다.
        
        **훅 (Hooks)**
        
        : Zustand 는 React 컴포넌트 내에서 상태와 액션에 접근할 수 있는 훅을 제공합니다. 이 훅은 일반적으로 useState 입니다. 이 훅을 사용하여 컴포넌트에서 상태값에 접근하고 업데이트 할 수 있게 됩니다.
        
        **구독 (Subscription)**
        
        : Zustand 는 컴포넌트 리렌더링을 효율적으로 처리합니다. useState 훅을 사용하면, Zustand 는 자동으로 이 컴포넌트를 구독 처리합니다. 이렇게 구독 처리를 두면, 관련한 상태값이 변경될 때만 컴포넌트가 리렌더링 되고 불필요한 리렌더링이 줄어들어 성능을 향상 시킬 수 있습니다.
        
        **타입 안정성 (Type Safety)**
        
        : Zustand 는 TS 와 잘 작동합니다. 상태와 액션에 대한 타입을 정의하며 어플리케이션 전체의 타입 안정성을 보장하고 런타임 에러를 줄입니다.
        
        **미들웨어 (Middleware)**
        
        : Zustand 는 스토어에 미들웨어를 추가할 수 있게 합니다. 이는 디버깅, 로깅, 또는 컴포넌트로 전달되기 전 상태 변화를 중간에서 가로채도록 하는 필요한 작업을 하게 해 줍니다.
        
        **스토어 구성 (Store Composition)**
        
        : 여러 Zustand 스토어를 생성하고 필요에 따라 구성할 수 있도록 하여 상태 관리를 체계적인 방법으로 진행할 수 있게 합니다.
        
        Zustand 의 핵심 기능
        
        1. 단순성 : 최소한의 API 기능을 가지고 있기 때문에 사용하기 쉽다.
        2. 보일러플레이트가 존재하지 않는다. 매우 적은 설정의 코드만을 필요로 한다.
        3. 훅 기반 : React 개발에 용이하다.
        4. TS 지원 
        5. 미들웨어 지원 : 기능을 확장할 수 있다.
        6. 개발자 도구 지원 : Redux DevTools 와 통합되어 강력한 디버깅을 지원한다.                                      → 상태 변화를 실시간으로 모니터링 가능, 상태 액션 히스토리 확인 가능 
        7. 확장성 : 주로 React 를 사용하지만, 모든 JS 환경에서 사용 가능하다.