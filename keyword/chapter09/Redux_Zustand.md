### 키워드 정리 🍠

- Props-Drilling 🍠
    - Props-Drilling은 무엇인가요?
        
        ** props: 부모가 자식에게 전달해주는 값, 파라미터(paramenter)
        
        props를 ‘하위 컴포넌트로 전달하는 용도로만 쓰이는’ 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 한 부분으로 데이터를 전달하는 과정.
        
        props를 통해 데이터를 전달하는 과정에서 중간 컴포넌트는 그 데이터가 필요하지 않음에도 자식 컴포넌트에 전달하기 위해 props 전달해야 하는 과정.
        
        ```jsx
        import React from 'react';
        
        function App() {
          return <GrandFather />;
        }
        
        function GrandFather() {
          const name = '전상국';
          return <Mother grandFatherName={name} />;
        }
        
        function Mother(props) {
          return <Child grandFatherName={props.grandFatherName} />;
        }
        
        function Child({ grandFatherName }) {
          return <div>{grandFatherName}</div>;
        }
        
        export default App;
        ```
        
        - 장점: 
        컴포넌트 간에 데이터를 가장 쉽고 빠르게 전달하는 방법
        작은 규모에서는 → 어떤 데이터가 어디서 사용되는지 쉽게 파악 가능하고 수정 용이
        - 문제점:
        규모가 커지면 → 컴포넌트의 숫자가 많아지고, 그에 따라 props도 많은 구간을 이동해야 하므로 코드가 훨씬 복잡해짐
    - 이를 어떻게 해결할 수 있을까요?
        - **상태관리 도구 사용** - React의 ContextAPI, Redux, Recoli 등
        - **Children 사용** - 하나의 컴포넌트에서 값을 관리하고 그 값을 하위요소로 전달할 때 코드추적이 어려워지지 않게 된다.
        ** children: A 컴포넌트 사이에 B 컴포넌트가 있을 때, A에서 B의 내용을 보여주려고 사용하는 props.
            
            ```jsx
            import React from 'react';
            
            function App() {
              const name = '김할아';
              return (
              <GrandFather>
                <Mother>
                	<Child grandFathername={name}/>
                </Mother>
              </GrandFather>);
            }
            
            function GrandFather() {
              return (
                <div>
                	<h3>1번 컴포넌트<h3>
                    { children }
                </div>
              );
            }
            
            function Mother(props) {
              return (
                <div>
                	<h3>2번 컴포넌트<h3>
                    { children }
                </div>
              );
            }
            
            function Child({ name }) {
              return <div>{ name }</div>;
            }
            
            export default App;
            ```
            
        - 렌더링 될 컴포넌트를 불필요하게 여러 컴포넌트로 나누지 않는다.
        - defaultProps를 필수 컴포넌트에 사용하지 않는다. 필요한 props가 전달되지 못한 상황임에도 오류가 가려지게 된다.



- **`useReducer`** 에 대하여 정리해주세요! 🍠
    
    React 컴포넌트 내부에서의 상태 관리, 상태 업데이트 훅(hook). `useState` 활용목적과 같다.
    
    변경할 값이 많을 때, 즉 상태 관리할 데이터가 많을 때 사용을 고민해 볼 필요가 있다.
    
    조금 더 구조화된 방식으로 상태 관리를 하고 싶을 때 사용할 수 있다. 
    (ex. “INCREASE” 타입은 무조건 더하기 , “DECREASE” 타입은 무조건 빼기)
    
    - 선언 형태
    
    ```tsx
    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    
    //useState와 비교
    const [state, useState] = useState(initialState);
    ```
    
    `state` : 상태 이름 (컴포넌트에서 사용할 상태) > 빵(재료) 담는 접시
    
    `dispatch` : 상태(state)를 변경 시 필요한 정보를 전달하는 '함수' > 주문서
    
    `reducer` : dispatch를 확인해서 state를 변경해 주는 '함수' > 주방(공장)
    
    `initialState` : state에 전달할 초기 값 > 빵(및 재료 등) 개수 설정
    
    - `useReducer` 사용 예제
    
    ```tsx
    import { useReducer, useState } from "react";
    
    // 1. state에 대한 interface
    interface IState {
      counter: number;
    }
    // 2. reducer에 대한 interface
    interface IAction {
      type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
      payload?: number; // 정한 숫자만큼 변화하는
    }
    
    function reducer(state: IState, action: IAction) {
      const { type, payload } = action; // 구조 분해 할당
    
      switch (type) {
        case "INCREASE": {
          return { ...state, counter: state.counter + payload, };
        }
        case "DECREASE": {
          return { ...state, counter: state.counter - 1 };
        }
        case "RESET_TO_ZERO": {
          return { ...state, counter: 0 };
          // ...state -> 기존 상태 객체를 전개하여 새로운 객체 생성,
          // counter: ~~ -> counter 속성만 변경
        }
        default:
          return state; // 초기상태
      }
    }
    
    export default function UseReducerPage() {
    
      // 1. useState
      const [count, setCount] = useState(0);
      const handleIncrease = (): void => {
        setCount(count + 1);
      };
    
      // 2. useReducer
      const [state, dispatch] = useReducer(reducer, { counter: 0 });
    
      return (
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-3xl">useState</h2>
            <h2>UseState hook 사용:{count}</h2>
            <button onClick={handleIncrease}>Increase</button>
          </div>
    
          <div>
            <h2 className="text-3xl">useReducer</h2>
            <h2>UseReducer hook 사용:{state.counter}</h2>
            <button
              onClick={() => dispatch({type: "INCREASE", payload: 3 })}>Increase
            </button>
            <button
              onClick={() => dispatch({ type: "DECREASE" })}>Decrease
            </button>
            <button
              onClick={() => dispatch({ type: "RESET_TO_ZERO" })}>Reset
            </button>
          </div>
        </div>
      );
    }
    ```

- **`Redux`** vs **`Redux Toolkit`** 🍠
    
    ```tsx
    // redux toolkit과 redux 설치
    pnpm install @reduxjs/toolkit react-redux
    ```
    
    - redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
        - Redux (Reducer + Flux)
            
            useReducer가 React 컴포넌트 내부에서 로컬 상태를 관리하는 데 사용하는 거라면, 
            Redux는 JS 어플리케이션에서 전역 상태 관리를 도와주는 라이브러리.  ** 상태: 바뀌는 어떤 값
            
            기존의 Flux 디자인 패턴에 Reducer가 추가된 디자인 패턴이다.
            
            ![image.png](attachment:53dc9fd7-f341-4cb1-9f9e-862b8398af7e:image.png)
            
            사용자의 Action 발생 → Reducer가 액션에 맞는 데이터를 가공 → Store에서 가공된 데이터의 상태 저장 → View에 반영 (데이터를 전달해야 할 컴포넌트의 상태를 곧 바로 바꿔준다)
            
            Redux는 여러 컴포넌트가 있는 상황에서, 데이터의 변경사항을 전달하기 위해 불필요하게 여러 컴포넌트를 거쳐야 하는 props-drilling 현상을 해소할 수 있다!
            
            - Redux 사용 예제
                1. store 생성 - `createStore` 사용
                
                ```tsx
                import { createStore } from "redux";
                
                export const rootReducer = combineReducers({
                  counter: counterReducer,
                  todoList: todoReducer,
                });
                
                // 위에서 정의 먼저 해주고 타입지정 해야함.
                export interface RootState { 
                  counter: Counter;
                  todoList: TodoState;
                }
                
                export const store = createStore(rootReducer);
                ```
                
                1. action - 직접 만들긔
                
                ```tsx
                export enum TodoActionType {
                  tapAdd,
                  tapDelete,
                  tapUpdate,
                  modalOpen,
                  modalClose,
                }
                
                export type TodoPayload = {
                  todo: Todo;
                  selectedIndex: number;
                };
                
                export type TodoAction = {
                  type: TodoActionType;
                  payload: TodoPayload;
                };
                ```
                
                1. reducer - 직접 만들긔 (switch문 사용)
                
                ```tsx
                const todoReducer = (
                  state: TodoState = initialState,
                  action: TodoAction,
                ): TodoState => {
                  let newTodos = state.todos;
                  switch (action.type) {
                    case TodoActionType.tapAdd:
                      newTodos.push(action.payload.todo);
                      return {
                        ...state,
                        todos: newTodos,
                        isModalVisible: false,
                      };
                    case TodoActionType.tapDelete:
                      newTodos.splice(action.payload.selectedIndex, 1);
                      return {
                        ...state,
                        todos: newTodos,
                      };
                    case TodoActionType.tapUpdate:
                      newTodos[action.payload.selectedIndex] = action.payload.todo;
                      return {
                        ...state,
                        todos: newTodos,
                        selectedIndex: action.payload.selectedIndex,
                        isModalVisible: false,
                      };
                    case TodoActionType.modalClose:
                      return {
                        ...state,
                        isModalVisible: false,
                        selectedIndex: -1,
                      };
                    case TodoActionType.modalOpen:
                      return {
                        ...state,
                        isModalVisible: true,
                        selectedIndex: action.payload.selectedIndex,
                      };
                    default:
                      return state;
                  }
                };
                ```
                
                1. dispatch - 직접 만들긔 (action을 reducer에 전달)
                
                ```tsx
                const act = (type: TodoActionType, selectedIndex: number) => {
                    const payload: TodoPayload = {
                      todo: todoState.todos[selectedIndex],
                      selectedIndex: selectedIndex,
                    };
                    const action: TodoAction = {
                      type: type,
                      payload: payload,
                    };
                    dispatch(action);
                  };
                  
                  // action 타입 지정
                  act(TodoActionType.modalOpen, -1)
                ```
                
            
        - Redux-toolkit
            
            Redux를 효율적으로 사용하기 위한 공식 라이브러리. 
            
            Redux의 코드 복잡성을 줄이고 보일러플레이트 코드를 최소화하며 개발자 경험을 향상할 수 있다.  **보일러플레이트: 반복적이고 틀이 정해진 코드, 개발자가 기능을 만들기 전에 반드시 작성해야하는 기본 구조나 형식적인 코드
            
        - 왜 Redux-toolkit을 사용해야 하는가?
            - Redux 문제점:
                
                Redux의 Store 구성이 너무 복잡하다.
                
                Redux에서 유용한 작업을 수행하려면 많은 패키지를 추가해야 한다.
                
                Redux에는 너무 많은 상용구 코드가 필요하다.
                
            
            → Redux-toolkit을 사용하면 해결 가능!
            
            1. 간결한 코드 
            `configureStore`, `createSlice`와 같은 간편한 함수들을 제공하여 보일러플레이트 코드를 최소화한다.  
            2. 불변성 유지
            `createSlice`는 내부적으로 Immer 라이브러리를 사용한다. 기존에 불변성 유지를 위해 새로운 객체를 생성한 것과 달리 (`useReducer`예제 참고), Immer 라이브러리에서는 기존 객체를 직접적으로 수정해도 불변성을 유지할 수 있다.
                
                ```tsx
                 function reducer(state = initialState, action) {
                	 const { type, payload } = action
                	 
                   switch(type) {
                     case ADD:
                       return {
                         ...state, // 기존 상태 객체를 전개하여 새로운 객체 생성
                         value: state.value + 1 // value 속성만 변경
                       }
                     case SUBTRACT:
                       return { ...state, value: state.value - payload }
                     default:
                       return state;
                   }
                 }
                ```
                
                ```tsx
                const counterSlice = createSlice({
                  name: 'counter',
                  initialState: { value: 0 },
                  reducers: {
                    add: state => {
                      state.value += 1; // 상태를 직접 변경하여도 새로운 객체가 생성됨
                    },
                    subtract: (state, action) => {
                      state.value -= action.payload;
                    }
                  }
                })
                ```
                
            3. 통합된 비동기 처리
            `createAsyncThunk`를 사용하여 비동기 작업을 쉽게 처리할 수 있다.
            
        
    - redux-toolkit 사용법 (자세하게 / Redux 예제 코드랑 비교해서 얼마나 간결해졌는지 확인)
        
        (React에서 Redux-toolkit 사용할 때 기준으로 작성)
        
        ```tsx
        src/
        ├── store/
        │   ├── index.ts              // 전체 스토어 설정
        │   └── slices/
        │       ├── todoSlice.ts      // todo 관련 상태
        │       └── counterSlice.ts   // (예시로 다른 slice)
        ├── components/
        │   ├── TodoList.ts
        │   ├── ...
        
        ```
        
        - Provider
            
            작성한 store를 전역에서 사용할 수 있도록 App 시작점에 `Provider`로 감싸준다.
            
            ```tsx
            // main.tsx
            import { StrictMode } from 'react'
            import { createRoot } from 'react-dom/client'
            import App from './App.tsx'
            
            import {Provider} from "react-redux"
            import {store} from './store/index'
            
            createRoot(document.getElementById('root')!).render(
              <StrictMode>
            	  <Provider store={store}>
            	    <App />
                </Provider>
              </StrictMode>,
            )
            ```
            
        - configureStore
            1. store 생성 - `configureStore` 사용
            
            ```tsx
            // /store/index.ts
            import { configureStore } from "@reduxjs/toolkit";
            
            export const store = configureStore({
              reducer: {
                counter: counterSlice.reducer,
                todoList: todoSlice.reducer,
              },
            });
            
            // 반환타입을 자동으로 추론해서 지정
            export type RootState = ReturnType<typeof store.getState>;
            ```
            
             
            
        - createSlice
            
            2&3.   action과 reducer 함수를 동시에 생성 - `createSlice` 사용
            
            - `name`: 모듈 이름
            - `initialState`:  state의 초기값
            - `reducers`: reducer 함수 작성. 이때 key 값으로 action 함수가 자동으로 생성된다. (slice object)
            
            ** 참고로 `createAction`과 `createReducer`로 action과 reducer를 각각 생성할 수 있다.
            
            ```tsx
            // /store/slices/todoSlice.ts
            import { createSlice, PayloadAction } from "@reduxjs/toolkit";
            
            export const todoSlice = createSlice({
              name: 'todoList',
              initialState,
              reducers: {
                add: (state, action: PayloadAction<TodoPayload>) => {
                  state.todos.push(action.payload.todo!);
                  state.isModalVisible = false;
                },
                delete: (state, action: PayloadAction<TodoPayload>) => {
                  state.todos.splice(action.payload.selectedIndex!, 1);
                },
                edit: (state, action: PayloadAction<TodoPayload>) => {
                  state.todos[action.payload.selectedIndex!] = action.payload.todo!;
                  state.isModalVisible = false;
                },
                modalOpen: (state, action: PayloadAction<TodoPayload>) => {
                  state.isModalVisible = true;
                  state.selectedIndex = action.payload.selectedIndex!;
                },
                modalClose: state => {
                  state.isModalVisible = false;
                  state.selectedIndex = -1;
                },
              },
            });
            
            export const { add, delete: deleteTodo, edit, modalOpen, modalClose } = 
            	todoSlice.actions;
            export default todoSlice.reducer;
            ```
            
            외부에서 action을 사용할 때 이렇게 전달한다.
            
            ```tsx
            import {todoSlice} from './store/slices/todoSlice';
            
            const action = todoSlice.actions;
            // 그리구 action.add, action.delete 등으로 사용
            ```
            
        - useSelector
            
            `useSelector`로 store의 특정 state에 접근할 수 있다.
            
            ```tsx
            const state = useSelector(state => state.슬라이스key.해당슬라이스의초기state);
            ```
            
            ```tsx
            // /components/TodoList.ts
            import { useSelector } from "react-redux";
            import type { RootState } from './store/index';
            
            export const TodoList = () => {
            	const todos = useSelector((state: RootState) => state.todoList.todos);
            	
            	return ( 
            	 <ul>
                  {todos.map((todo, i) => (
                    <li key={i}>{todo}</li>
                  ))}
               </ul> 
              );
            };
            ```
            
        - useDispatch
            
            `useDispatch`로 store의 특정 action에 접근할 수 있다.
            
            ```tsx
            const dispatch = useDispatch();
            dispatch(액션.리듀서함수(payload));
            ```
            
            ```tsx
            // /components/TodoList.ts
            import { useState } from "react";
            import { useSelector, useDispatch } from "react-redux";
            import type { RootState } from './store/index';
            import { add, deleteTodo } from "./store/slices/todoSlice"; 
            
            export const TodoList = () => {
            	const todos = useSelector((state: RootState) => state.todoList.todos);
            	const dispatch = useDispatch();
            	const [input, setInput] = useState("");
            	
            	const addHandler = () => {
            		if (input.trim() === "") return;
            		dispatch(add({ todo:"새로운 할 일" }));
            		setInput("");
            	};
            	const deleteHandler = () => {
            	 if (todos.length === 0) return;
            	 // 마지막 할일 삭제
            	 dispatch(deleteTodo({ selectedIndex: todos.length - 1 }));
            	};
            	
            	return ( 
            		<div>
                  <h2>📝 Todo List</h2>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="할 일을 입력하세요"
                  />
                  <button onClick={addHandler}>할일 추가</button>
                  <button onClick={deleteHandler}>할일 삭제</button>
            
                  <ul>
                    {todos.map((todo, i) => (
                      <li key={i}>{todo}</li>
                    ))}
                  </ul>
                </div>
            	 );
            };
            ```
            
            ```tsx
            [ 📝 Todo List              ]
            [ 공부하기                ] <- 리스트 아이템 (li)
            -----------------------------
            [ 할 일을 입력하세요 ] [추가] [삭제]
            
            ```
            
        - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요


- **`Zustand`** 🍠
    
    ```jsx
    pnpm install zustand
    ```
    
    - **`Zustand`**에 대하여 정리해주세요! 🍠
        
        React 생태계에서 사용하는 상태 관리 라이브러리. 독일어로 ‘상태’라는 뜻이다.
        
        Redux 같은 복잡한 상태관리 솔루션을 피하고, 단순하고 사용하기 쉬운 프로젝트를 할 때 좋은 선택 사항이 된다.
        
        ```jsx
        // redux-toolkit에서 이렇게 관리
        src/
        ├── store/
        │   ├── store.ts              
        ├── slices/
        │   ├── cartSlice.ts  
        │   └── modalSlice.ts   
        ...
        ```
        
        ```jsx
        // zustand에서 이렇게 관리
        src/
        ├── store/
        │   ├── useCartStore.ts  
        │   └── useModalSlice.ts              
        ...
        ```
        
        ```jsx
        //modalSlice.ts (redux-toolkit)
        import { createSlice } from "@reduxjs/toolkit";
        
        const initialState = {
          isOpen: false,
        };
        
        const modalSlice = createSlice({
          name: "modal",
          initialState,
          reducers: {
            openModal: (state) => {
              state.isOpen = true;
            },
            closeModal: (state) => {
              state.isOpen = false;
            },
          },
        });
        
        export const { openModal, closeModal } = modalSlice.actions;
        
        const modalReducer = modalSlice.reducer;
        
        export default modalReducer;
        ```
        
        ```jsx
        // useModalSlice.ts (zustand)
        import { create } from "zustand";
        import { immer } from "zustand/middleware/immer";
        
        interface ModalActions {
            openModal: () => void;
            closeModal: () => void;
        }
        
        interface ModalState {
          isOpen: boolean;
          actions: ModalActions;
        }
        
        export const useModalStore = create<ModalState>()(
          immer((set, _) => ({
            isOpen: false,
            actions: {
              openModal: () => {
                set((state) => {
                  state.isOpen = true;
                });
              },
              closeModal: () => {
                set((state) => {
                  state.isOpen = false;
                });
              },
            },
          }))
        );
        
        // 외부에서 사용시
        export const useModalState = () => {
            return useModalStore((state) => state.isOpen);
        }
        export const useModalActions = () => {
            return useModalStore((state) => state.actions);
        }
        ```
        
    
    ```
     // redux-toolkit
     const isModalOpen = useSelector((state) => state.modal.isOpen);
     const dispatch = useDispatch();
    
     if (!isModalOpen) return null;
    
     const handleCloseModal = () => {
       dispatch(closeModal());
     };
     const handleClearCart = () => {
       dispatch(clearCart());
       dispatch(closeModal());
     };
    ```
    
    ```jsx
    //zustand
    const { closeModal } = useModalActions();
    const {clearCart } = useCartActions();
    
    const handleCloseModal = () => {
      closeModal();
    };
    const handleClearCart = () => {
      clearCart();
      closeModal();
    };
    ```