- Props-Drilling 🍠
    - Props-Drilling은 무엇인가요?
        
        **:** 여러 컴포넌트가 중첩되어 있는 구조에서, 상위 컴포넌트에서 하위 컴포넌트로 Props를 전달해야 할 때, 중간 컴포넌트들을 계속해서 props로 전달해야 하는 상황을 말합니다. 
        
        예를 들어, A → B → C → D 구조에서, 컴포넌트만 user 데이터를 필요로 하는데 A에서 받은 user 데이터를 B, C를 통해 억지로 넘겨줘야 할 때가 이에 해당합니다.
        
    - 이를 어떻게 해결할 수 있을까요?
        
        Context API처럼 전역 상태 관리 기법을 사용합니다.
        
- **`useReducer`** 🍠
    
    https://youtu.be/9ISInVDo5m0?si=Y43GTVSDerVncPBi
    
    <aside>
    🍠
    
    위의 영상을 보고 **`useReducer`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useReducer
    
    </aside>
    
    - **`useReducer`** 에 대하여 정리해주세요! 🍠
        
        : React에서 복잡한 상태관리를 하기 위한 Hook
        
        Q. 상태 관리를 위해 UseState를 사용하면 되지, 굳이 useReducer를 사용해야할까요?
        → 사실 useState로 상태 관리를 할 수 있는 코드는 useReducer로도 구현이 가능하고, 그 반대도 가능합니다.
        
        그렇다면, 둘의 차이는 무엇일까요?… 가장 큰 차이점은 용도입니다! 
        
        먼저 useState는 단일의 상태를 관리할 때 유용합니다. 단순히 숫자, 문자열, 불리안 등 작은 단위의 상태를 관리할 때 useState를 활용하면 간편하게 관리가 가능합니다
        
        반면, useReducer는 복잡한, 여러 상태가 서로 묶여있는 상태일 때 유용합니다. 단순히 카운터의 증가만 다루는 것이 아니라 증가, 감소, 리셋 등 여러 가지 상태를 복합적 관리할 때 사용합니다.
        
- **`Redux`** vs **`Redux Toolkit`** 🍠
    
    <aside>
    💡 Redux Toolkit은 한 번에 완벽히 이해하기 어려울 수 있습니다. 공식 문서와  다양한 블로그 글을 차근차근 살펴보시면서, 워크북의 토글을 꼼꼼히 정리해 보세요. (⚠️ 복사 붙여넣기 금지 ⚠️)
    
    이번 챕터에서는 개념 정리를 제공하지 않았습니다. 앞으로의 개발 과정에서 필요한 내용을 직접 찾아보고 기록하는 습관을 기르는 것이 중요하기 때문입니다. 스스로 공식문서 위주로 탐색하시며 워크북의 내용을 작성해 보시는 것을 추천드립니다.
    
    혹시 막막하시다면, 아래 미션 강의 영상을 보며 실습 순서에 맞춰 따라 해 보시기를 바랍니다! 영상 속 단계별 설명과 함께 정리하시면 이해가 훨씬 수월할 것입니다!
    
    </aside>
    
    [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
    
    - redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
        1. **보일러플레이트 대폭 감소**
            - 순수 Redux로는 액션 타입 선언 → 액션 생성 함수 → 리듀서 작성 → 스토어 설정까지 많은 반복 코드가 필요했습니다.
            - RTK의 createSlice 하나로 액션 타입·액션 크리에이터·리듀서를 한꺼번에 정의할 수 있어 코드가 훨씬 간결해집니다.
        2. **불변성 관리가 자동**
            - Redux에선 state = { …state, foo: newFoo } 같은 불변 복사를 직접 해야 했지만,
            - RTK 내부에 Immer가 내장되어 있어 “state.foo = newFoo”처럼 마치 가변 처리하듯 작성해도 실제론 불변 복사된 새 상태가 만들어집니다.
        3. **미들웨어 기본 포함**
            - RTK의 configureStore로 스토어를 만들면 redux-thunk, 개발 도구용 로깅·디버깅 미들웨어가 자동 적용되어, 별도 설치·등록 작업이 필요 없습니다.
        4. **표준화된 비동기 흐름**
            - RTK Query나 createAsyncThunk 같은 도구로 비동기 요청(서버 통신)을 “추가 액션 / 성공 액션 / 실패 액션” 패턴으로 쉽게 처리할 수 있어, thunk를 수작업으로 짜는 번거로움이 줄어듭니다.
        5. **타입스크립트 친화적**
            - 액션·리듀서가 한곳에 모여 타입 유추가 쉽고, 별도 제네릭 반복 선언 없이도 강력한 타입 지원을 받습니다.
    - redux-toolkit 사용법 (자세하게)
        - Provider
            
            : 리액트 컨텍스트를 통해, 하위 모든 컴포넌트가 store에 접근할 수 있도록 감싸줍니다.
            
            ```tsx
            import { Provider } from 'react-redux'
            import { store } from './store'
            import App from './App'
            
            ReactDOM.createRoot(rootEl).render(
              <Provider store={store}>
                <App />
              </Provider>
            )
            ```
            
        - configureStore
            
            : 애플리케이션 전체에서 사용할 리듀서들을 모아 store를 생성, 해당 store는 애플리케이션의 전역 상태 저장소가 됨.
            
            ```tsx
            import { configureStore } from '@reduxjs/toolkit'
            import counterReducer from './counterSlice'
            
            export const store = configureStore({
              reducer: {
                counter: counterReducer,
              }
            })
            ```
            
        - createSlice
            
            : 액션 타입, 액션 생성자(action creator), reducer 함수 선언
            
            ```tsx
            const counterSlice = createSlice({
              name: 'counter',
              initialState: 0,
              reducers: {
                increment: state => state + 1,
                decrement: state => state - 1,
              }
            })
            export const { increment, decrement } = counterSlice.actions
            export default counterSlice.reducer
            ```
            
        - useSelector
            
            : 스토어의 특정 상태를 구독(subscribe)하고, 그 부분이 바뀔 때마다 자동으로 해당 컴포넌트를 리렌더링
            
            ```tsx
            import { useSelector } from 'react-redux'
            import { RootState } from './store'
            
            function CounterDisplay() {
              const count = useSelector((state: RootState) => state.counter)
              return <div>현재: {count}</div>
            }
            ```
            
        - useDispatch
            
            :  컴포넌트 내부에서 action 생성자를 실행시키고, 그 결과 액션 객체를 스토어로 보내(redux의 dispatch), 상태 변경을 요청
            
            ```tsx
            import { useDispatch } from 'react-redux'
            import { increment } from './counterSlice'
            
            function CounterButton() {
              const dispatch = useDispatch()
              return <button onClick={() => dispatch(increment())}>+</button>
            }
            ```
            
        - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요
            - Action
                
                : “무엇이 일어났는지”를 묘사하는 단순한 자바스크립트 객체
                dispatch(action) 형태로 스토어에 전달되어, 이후 리듀서가 이 액션을 받아 처리하게 함
                
                - 구성 요소
                
                ```tsx
                {
                  type: string;      // 어떤 종류의 이벤트인지 식별하는 필수 속성
                  payload?: any;     // (선택) 해당 이벤트와 함께 전달할 추가 데이터
                }
                ```
                
            - Reducer
                
                : “이벤트(Action)가 들어오면 현재 상태(State)를 어떻게 바꿀지” 결정하는 순수 함수입니다.
                
                - 구성 요소
                
                ```tsx
                (state: StateType, action: ActionType) => StateType
                ```
                
            - State
                
                : 애플리케이션의 **전역 데이터**를 담고 있는 단일 객체(혹은 여러 객체들의 트리 구조)입니다.
                
                - UI 컴포넌트나 비즈니스 로직이 “현재 어떤 값인지” 조회(useSelector)하거나,
                - “이 값을 기반으로 화면을 어떻게 그릴지” 결정하게 해 주는 근원(Source of Truth)
                - 액션이 디스패치되고 리듀서가 새 상태를 반환하면, 스토어가 이 새 상태로 교체
- **`Zustand`** 🍠
    
    https://youtu.be/NOdAIlFreOI?si=958aros8pbEXNVsJ
    
    <aside>
    🍠
    
    위의 영상을 보고 **`Zustand`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://zustand-demo.pmnd.rs/
    
    </aside>
    
    - **`Zustand`**에 대하여 정리해주세요! 🍠
        
        : “가장 단순하고 가벼운” 전역 상태 관리 기법. 
        
        **핵심 API**
        
        - const useStore = create(set ⇒ ({ /* state & actions */ }))
        - 컴포넌트에서 const foo = useStore(state ⇒ state.foo) 또는 const { foo, setFoo } = useStore()
        
        **특징**
        
        - **Provider 불필요**: 커스텀 훅만 임포트하면 어디서든 같은 스토어에 접근 가능
        - **멤버별 구독(Selectors)**: useStore(s ⇒ s.foo)처럼 특정 상태만 골라 구독 → 불필요한 리렌더링 최소화
        - **미들웨어**:
            - immer (불변성 자동 처리)
            - persist (localStorage 동기화)
            - devtools (Redux DevTools 연동)- Props-Drilling 🍠
    - Props-Drilling은 무엇인가요?
        
        **:** 여러 컴포넌트가 중첩되어 있는 구조에서, 상위 컴포넌트에서 하위 컴포넌트로 Props를 전달해야 할 때, 중간 컴포넌트들을 계속해서 props로 전달해야 하는 상황을 말합니다. 
        
        예를 들어, A → B → C → D 구조에서, 컴포넌트만 user 데이터를 필요로 하는데 A에서 받은 user 데이터를 B, C를 통해 억지로 넘겨줘야 할 때가 이에 해당합니다.
        
    - 이를 어떻게 해결할 수 있을까요?
        
        Context API처럼 전역 상태 관리 기법을 사용합니다.
        
- **`useReducer`** 🍠
    
    https://youtu.be/9ISInVDo5m0?si=Y43GTVSDerVncPBi
    
    <aside>
    🍠
    
    위의 영상을 보고 **`useReducer`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useReducer
    
    </aside>
    
    - **`useReducer`** 에 대하여 정리해주세요! 🍠
        
        : React에서 복잡한 상태관리를 하기 위한 Hook
        
        Q. 상태 관리를 위해 UseState를 사용하면 되지, 굳이 useReducer를 사용해야할까요?
        → 사실 useState로 상태 관리를 할 수 있는 코드는 useReducer로도 구현이 가능하고, 그 반대도 가능합니다.
        
        그렇다면, 둘의 차이는 무엇일까요?… 가장 큰 차이점은 용도입니다! 
        
        먼저 useState는 단일의 상태를 관리할 때 유용합니다. 단순히 숫자, 문자열, 불리안 등 작은 단위의 상태를 관리할 때 useState를 활용하면 간편하게 관리가 가능합니다
        
        반면, useReducer는 복잡한, 여러 상태가 서로 묶여있는 상태일 때 유용합니다. 단순히 카운터의 증가만 다루는 것이 아니라 증가, 감소, 리셋 등 여러 가지 상태를 복합적 관리할 때 사용합니다.
        
- **`Redux`** vs **`Redux Toolkit`** 🍠
    
    <aside>
    💡 Redux Toolkit은 한 번에 완벽히 이해하기 어려울 수 있습니다. 공식 문서와  다양한 블로그 글을 차근차근 살펴보시면서, 워크북의 토글을 꼼꼼히 정리해 보세요. (⚠️ 복사 붙여넣기 금지 ⚠️)
    
    이번 챕터에서는 개념 정리를 제공하지 않았습니다. 앞으로의 개발 과정에서 필요한 내용을 직접 찾아보고 기록하는 습관을 기르는 것이 중요하기 때문입니다. 스스로 공식문서 위주로 탐색하시며 워크북의 내용을 작성해 보시는 것을 추천드립니다.
    
    혹시 막막하시다면, 아래 미션 강의 영상을 보며 실습 순서에 맞춰 따라 해 보시기를 바랍니다! 영상 속 단계별 설명과 함께 정리하시면 이해가 훨씬 수월할 것입니다!
    
    </aside>
    
    [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
    
    - redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
        1. **보일러플레이트 대폭 감소**
            - 순수 Redux로는 액션 타입 선언 → 액션 생성 함수 → 리듀서 작성 → 스토어 설정까지 많은 반복 코드가 필요했습니다.
            - RTK의 createSlice 하나로 액션 타입·액션 크리에이터·리듀서를 한꺼번에 정의할 수 있어 코드가 훨씬 간결해집니다.
        2. **불변성 관리가 자동**
            - Redux에선 state = { …state, foo: newFoo } 같은 불변 복사를 직접 해야 했지만,
            - RTK 내부에 Immer가 내장되어 있어 “state.foo = newFoo”처럼 마치 가변 처리하듯 작성해도 실제론 불변 복사된 새 상태가 만들어집니다.
        3. **미들웨어 기본 포함**
            - RTK의 configureStore로 스토어를 만들면 redux-thunk, 개발 도구용 로깅·디버깅 미들웨어가 자동 적용되어, 별도 설치·등록 작업이 필요 없습니다.
        4. **표준화된 비동기 흐름**
            - RTK Query나 createAsyncThunk 같은 도구로 비동기 요청(서버 통신)을 “추가 액션 / 성공 액션 / 실패 액션” 패턴으로 쉽게 처리할 수 있어, thunk를 수작업으로 짜는 번거로움이 줄어듭니다.
        5. **타입스크립트 친화적**
            - 액션·리듀서가 한곳에 모여 타입 유추가 쉽고, 별도 제네릭 반복 선언 없이도 강력한 타입 지원을 받습니다.
    - redux-toolkit 사용법 (자세하게)
        - Provider
            
            : 리액트 컨텍스트를 통해, 하위 모든 컴포넌트가 store에 접근할 수 있도록 감싸줍니다.
            
            ```tsx
            import { Provider } from 'react-redux'
            import { store } from './store'
            import App from './App'
            
            ReactDOM.createRoot(rootEl).render(
              <Provider store={store}>
                <App />
              </Provider>
            )
            ```
            
        - configureStore
            
            : 애플리케이션 전체에서 사용할 리듀서들을 모아 store를 생성, 해당 store는 애플리케이션의 전역 상태 저장소가 됨.
            
            ```tsx
            import { configureStore } from '@reduxjs/toolkit'
            import counterReducer from './counterSlice'
            
            export const store = configureStore({
              reducer: {
                counter: counterReducer,
              }
            })
            ```
            
        - createSlice
            
            : 액션 타입, 액션 생성자(action creator), reducer 함수 선언
            
            ```tsx
            const counterSlice = createSlice({
              name: 'counter',
              initialState: 0,
              reducers: {
                increment: state => state + 1,
                decrement: state => state - 1,
              }
            })
            export const { increment, decrement } = counterSlice.actions
            export default counterSlice.reducer
            ```
            
        - useSelector
            
            : 스토어의 특정 상태를 구독(subscribe)하고, 그 부분이 바뀔 때마다 자동으로 해당 컴포넌트를 리렌더링
            
            ```tsx
            import { useSelector } from 'react-redux'
            import { RootState } from './store'
            
            function CounterDisplay() {
              const count = useSelector((state: RootState) => state.counter)
              return <div>현재: {count}</div>
            }
            ```
            
        - useDispatch
            
            :  컴포넌트 내부에서 action 생성자를 실행시키고, 그 결과 액션 객체를 스토어로 보내(redux의 dispatch), 상태 변경을 요청
            
            ```tsx
            import { useDispatch } from 'react-redux'
            import { increment } from './counterSlice'
            
            function CounterButton() {
              const dispatch = useDispatch()
              return <button onClick={() => dispatch(increment())}>+</button>
            }
            ```
            
        - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요
            - Action
                
                : “무엇이 일어났는지”를 묘사하는 단순한 자바스크립트 객체
                dispatch(action) 형태로 스토어에 전달되어, 이후 리듀서가 이 액션을 받아 처리하게 함
                
                - 구성 요소
                
                ```tsx
                {
                  type: string;      // 어떤 종류의 이벤트인지 식별하는 필수 속성
                  payload?: any;     // (선택) 해당 이벤트와 함께 전달할 추가 데이터
                }
                ```
                
            - Reducer
                
                : “이벤트(Action)가 들어오면 현재 상태(State)를 어떻게 바꿀지” 결정하는 순수 함수입니다.
                
                - 구성 요소
                
                ```tsx
                (state: StateType, action: ActionType) => StateType
                ```
                
            - State
                
                : 애플리케이션의 **전역 데이터**를 담고 있는 단일 객체(혹은 여러 객체들의 트리 구조)입니다.
                
                - UI 컴포넌트나 비즈니스 로직이 “현재 어떤 값인지” 조회(useSelector)하거나,
                - “이 값을 기반으로 화면을 어떻게 그릴지” 결정하게 해 주는 근원(Source of Truth)
                - 액션이 디스패치되고 리듀서가 새 상태를 반환하면, 스토어가 이 새 상태로 교체
- **`Zustand`** 🍠
    
    https://youtu.be/NOdAIlFreOI?si=958aros8pbEXNVsJ
    
    <aside>
    🍠
    
    위의 영상을 보고 **`Zustand`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://zustand-demo.pmnd.rs/
    
    </aside>
    
    - **`Zustand`**에 대하여 정리해주세요! 🍠
        
        : “가장 단순하고 가벼운” 전역 상태 관리 기법. 
        
        **핵심 API**
        
        - const useStore = create(set ⇒ ({ /* state & actions */ }))
        - 컴포넌트에서 const foo = useStore(state ⇒ state.foo) 또는 const { foo, setFoo } = useStore()
        
        **특징**
        
        - **Provider 불필요**: 커스텀 훅만 임포트하면 어디서든 같은 스토어에 접근 가능
        - **멤버별 구독(Selectors)**: useStore(s ⇒ s.foo)처럼 특정 상태만 골라 구독 → 불필요한 리렌더링 최소화
        - **미들웨어**:
            - immer (불변성 자동 처리)
            - persist (localStorage 동기화)
            - devtools (Redux DevTools 연동)