### 키워드 정리 🍠

- Props-Drilling 🍠
    - Props-Drilling은 무엇인가요?
        - "부모 → 자식 → 그 자식 → 또 자식..." 이런 식으로 props를 계속 전달하는 것
        - **중간 컴포넌트들도 전혀 사용하지 않지만 그냥 넘기기 위해** props를 받아야 함
        - 데이터를 깊은 곳까지 "파이프처럼" 흘려보내는 방식이라 불편하고, 관리가 어렵고, 코드도 지저분해짐
        
        **-문제점**
        
        - 코드가 **장황하고 비효율적**임
        - 중간 컴포넌트들이 불필요하게 **데이터를 받아야 함**
        - props가 많아지면 **어디서 뭐 쓰는지 헷갈림**
        - 리팩토링 어려워짐 (컴포넌트 재사용성 ↓)
    - 이를 어떻게 해결할 수 있을까요?
        - Context API 사용 (가장 흔한 방법): **전역 데이터처럼** 사용할 수 있게 해주는 React의 공식 기능
        - 상태관리 라이브러리 사용 (Redux, Zustand 등)
        - Redux: 가장 유명함. 복잡한 앱에 적합, Zustand, Recoil: 더 간단하고 직관적. 작은 프로젝트에 좋음.
        - 컴포넌트 재구성
- **`useReducer`** 🍠
    
    https://youtu.be/9ISInVDo5m0?si=Y43GTVSDerVncPBi
    
    <aside>
    🍠
    
    위의 영상을 보고 **`useReducer`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useReducer
    
    </aside>
    
    - **`useReducer`** 에 대하여 정리해주세요! 🍠
        
        React에서 **상태(state)를 업데이트하는 고급 방식**
        
        → 복잡한 상태 로직이나 상태 값이 여러 개일 때 useState보다 더 깔끔하고 관리하기 좋음
        
- **`Redux`** vs **`Redux Toolkit`** 🍠
    
    <aside>
    💡 Redux Toolkit은 한 번에 완벽히 이해하기 어려울 수 있습니다. 공식 문서와  다양한 블로그 글을 차근차근 살펴보시면서, 워크북의 토글을 꼼꼼히 정리해 보세요. (⚠️ 복사 붙여넣기 금지 ⚠️)
    
    이번 챕터에서는 개념 정리를 제공하지 않았습니다. 앞으로의 개발 과정에서 필요한 내용을 직접 찾아보고 기록하는 습관을 기르는 것이 중요하기 때문입니다. 스스로 공식문서 위주로 탐색하시며 워크북의 내용을 작성해 보시는 것을 추천드립니다.
    
    혹시 막막하시다면, 아래 미션 강의 영상을 보며 실습 순서에 맞춰 따라 해 보시기를 바랍니다! 영상 속 단계별 설명과 함께 정리하시면 이해가 훨씬 수월할 것입니다!
    
    </aside>
    
    [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
    
    - redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
        
        redux가 대규모 프로젝트들에서 편리하긴 하지만 redux를 사용하게 되면 코드 작성양이 늘어나고 필요로하는 라이브러리들이 굉장히 많다는 단점을 보완하기 위해서 redux-toolkit이 출시되었다
        
        **redux-toolkit** 이 만들어진 이유
        
        - redux 스토어 구성의 복잡성
        - redux를 사용할 때 많은 패키지 추가의 필요성
        - redux 사용 시 많은 상용 코드 필요
        
        참고문헌: https://velog.io/@inwoong100/Redux-toolkit%EA%B3%BC-Redux%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
        
    - redux-toolkit 사용법 (자세하게)
        - Provider
            - 앱에 스토어를 주입함
            
            ```tsx
            import React from 'react'
            import ReactDOM from 'react-dom/client'
            import App from './App'
            import { Provider } from 'react-redux'
            import { store } from './app/store'
            
            ReactDOM.createRoot(document.getElementById('root')!).render(
              <React.StrictMode>
                <Provider store={store}>
                  <App />
                </Provider>
              </React.StrictMode>
            )
            
            ```
            
        - configureStore
            - 스토어를 생성함
            
            ```tsx
            import { configureStore } from '@reduxjs/toolkit'
            import counterReducer from '../features/counter/counterSlice'
            
            export const store = configureStore({
              reducer: {
                counter: counterReducer,
              },
            })
            
            export type RootState = ReturnType<typeof store.getState>
            export type AppDispatch = typeof store.dispatch
            ```
            
        - createSlice
            - slice(상태 조각) 만들기
            
            ```tsx
            import { createSlice } from '@reduxjs/toolkit'
            
            interface CounterState {
              value: number
            }
            
            const initialState: CounterState = {
              value: 0,
            }
            
            const counterSlice = createSlice({
              name: 'counter',
              initialState,
              reducers: {
                increment: (state) => {
                  state.value += 1
                },
                decrement: (state) => {
                  state.value -= 1
                },
                incrementByAmount: (state, action) => {
                  state.value += action.payload
                },
              },
            })
            
            export const { increment, decrement, incrementByAmount } = counterSlice.actions
            export default counterSlice.reducer
            ```
            
        - useSelector
            - 상태를 조회함
            
            ```tsx
            import { useSelector } from 'react-redux'
            import type { RootState } from '../app/store'
            
            const count = useSelector((state: RootState) => state.counter.value)
            
            ```
            
        - useDispatch
            - 액션 디스패치
            
            ```tsx
            import { useDispatch } from 'react-redux'
            import { increment } from '../features/counter/counterSlice'
            import type { AppDispatch } from '../app/store'
            
            const dispatch = useDispatch<AppDispatch>()
            dispatch(increment())
            
            ```
            
        - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요
            - `createAsyncThunk` – 비동기 요청 처리
            
            Redux에서 항상 복잡했던 비동기 처리(예: API 호출)을 Redux Toolkit에선 createAsyncThunk로 깔끔하게 해결해줌
            
            ```tsx
            import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
            
            // 1. 비동기 thunk 정의
            export const fetchUser = createAsyncThunk(
              'user/fetchUser',
              async (userId: string) => {
                const response = await fetch(`/api/user/${userId}`)
                return await response.json()
              }
            )
            
            interface UserState {
              data: null | { id: string; name: string }
              status: 'idle' | 'loading' | 'succeeded' | 'failed'
            }
            
            const initialState: UserState = {
              data: null,
              status: 'idle',
            }
            
            // 2. extraReducers에서 처리
            const userSlice = createSlice({
              name: 'user',
              initialState,
              reducers: {},
              extraReducers: (builder) => {
                builder
                  .addCase(fetchUser.pending, (state) => {
                    state.status = 'loading'
                  })
                  .addCase(fetchUser.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.data = action.payload
                  })
                  .addCase(fetchUser.rejected, (state) => {
                    state.status = 'failed'
                  })
              },
            })
            
            export default userSlice.reducer
            ```
            
- **`Zustand`** 🍠
    
    https://youtu.be/NOdAIlFreOI?si=958aros8pbEXNVsJ
    
    <aside>
    🍠
    
    위의 영상을 보고 **`Zustand`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://zustand-demo.pmnd.rs/
    
    </aside>
    
    - **`Zustand`**에 대하여 정리해주세요! 🍠
        
        React의 **전역 상태 관리**를 간단하게 해주는 라이브러리
        
        **특징**
        
        - Redux보다 **간단하고 코드 양이 적음**
        - `useState`처럼 훅 기반 API
        - 미들웨어 지원 (`persist`, `immer`, `devtools` 등)
        - **Context Provider 없이도 작동함**
        - 성능 최적화를 위한 `selector`, `shallow` 제공