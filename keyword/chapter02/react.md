### React 넌 어떻게 동작하니?

- React의 동작 원리  🍠
    
    ### React의 동작 원리
    
    React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.
   
    
    1.  **SPA (Single Page Application)**
        
        초기 로드 후 페이지를 다시 로드하지 않고 동적으로 변경하는 방식.
        
        새 페이지 이동시 전체 페이지를 새로 불러오는 것이 아니라, **필요한 부분만 업데이트하여** 빠른 UI 업데이트가 가능하다. React가 주로 SPA 형태로 동작한다.
        
        (MPA 방식: 페이지, js를 싹 다 찍어서 불러오는 것, SPA가 MPA보다 더 큰 부분)
        
    2. **User Interface Library**
        
        component 단위로 UI를 구성하고 **재사용성**을 높이는 데 집중한다. React는 UI 라이브러리.
        
        상태(state)와 속성(props)을 이용해 동적인 UI를 구현한다.
        
    3. **Functional Component (함수형 컴포넌트)**
        
        React의 컴포넌트 → 클래스형 컴포넌트 / 함수형 컴포넌트로 나뉘는데, 최근에는 React Hooks의 도입으로 인해, 함수형 컴포넌트가 주로 사용된다.
        
        `useState`, `useEffect` 등의 훅(Hook)을 이용해 상태 관리를 할 수 있다.
        
        (ex. `App.tsx` 같은 것)
        
    4. **Virtual DOM (가상 DOM)**
        
        가상 DOM을 사용하여 변경 사항을 효율적으로 업데이트한다. 이를 통해 렌더링 최적화가 가능하고 성능을 향상시킬 수 있다. 동작 과정은, 
        
        1. 상태(state)가 변경되면 새로운 Virtual DOM이 생성됨
        2. React는 이전 Virtual DOM과 새로운 Virtual DOM을 비교(diffing)
        3. 변경된 부분만 효율을 판단한 후 실제 DOM에 반영(reconciliation)

    5. **동시성 렌더링**
        
        렌더링이 CPU를 독점하지 않도록 유연하게 실행하는 기법이다.
        
        useTransition, useDeferredValue 같은 API를 사용해 렌더링 우선순위를 조정 가능하며, 특정 UI가 느릴 경우, 우선순위가 높은 UI를 먼저 렌더링할 수 있다.
        
        (js는 singlethread라서 한가지 일만 순서대로 작동할 수 있었는데, 중간에 우선순위를 바꿔서 계속 순서를 바꿔 렌더링을 할 수 있다)
        
    6. **React의 렌더링 조건**
        
        React는 다음과 같은 조건에서 컴포넌트를 다시 렌더링한다.
        
        - State 변경(`useState`, `useReducer`): `setState()`를 호출하면 React는 해당 컴포넌트와 하위 컴포넌트를 다시 렌더링한다.
        - Props 변경: 부모 컴포넌트에서 전달된 props가 변경되면, 해당 props를 사용하는 자식 컴포넌트가 다시 렌더링된다.
        - Context 값 변경(`useContext`): `React.createContext()`로 만든 Context의 값이 변경되면, 해당 Context를 구독하고 있는 모든 컴포넌트가 다시 렌더링된다.
        - 부모 컴포넌트가 렌더링될 때: 기본적으로 모든 자식 컴포넌트도 다시 렌더링된다. `React.memo()`를 사용하면 불필요한 렌더링을 방지할 수 있다.
        - Force Update (`useForceUpdate`): 강제로 렌더링을 트리거하는 방법. 일반적으로 사용X (함수형 컴포넌트에선 사용이 불가하다.)

### JSX 문법에 대해 배워보자! (단, tsx를 곁들인..) 🍠

- JSX 사용시 유의 사항 (기초)
    
    ### 1. React에서 JSX를 반환할 때 꼭 하나의 태그만 반환해야한다.

    **`⭕️ 가능한 경우`**

    ```jsx
    function App() {
    return (
        <strong>상명대학교</strong>
    )
    }

    export default App
    ```

    **`❌ 불가능한 경우`**

    ```jsx
    import './App.css'

    function App() {
    return (
        <strong>상명대학교</strong>
        <p>매튜/김용민</p>
    )
    }

    export default App

    ```

    <aside>
    💡
    여러개를 반환하고 싶은 경우는 어떻게 해야 할까요?
    코드와, 이유를 간략하게 작성해주세요.

    </aside>


    답변 🍠
    
    ```jsx
    // 코드 아래 첨부
    function App() {
    return (
        <div> or <> or <fragment>
        <strong>상명대학교</strong>
        <p>매튜/김용민</p>
        </div> or </> or </fragment>
    )
    }
    
    ```
        
        
        💡이유: 반환을 할 때 하나의 부모요소로 감싸면 여러개의 태그를 수용할 수 있다고 생각함. 그래서 <div>로 감싸주었음
        Context 같은 메소드에 들어갈 때는 무조건 하나의 태그만 반환할 수 있기 때문에, 묶어서 해줘야함!


### 나의 첫 번쨰 react-hook (useState) 🍠
        
**위의 영상을 보고 Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠
    
useState의 초기 값을 직접 전달할 때, 컴포넌트가 렌더링 될 때마다 해당 값이 평가되는데, 값이 단순할 경우는 괜찮지만 복잡한 연산을 할 때는 성능이 저하될 수 있다.

```tsx
import { useState } from 'react';
import './App.css'

function heavyComputation(): number {
    let result = 0;
    for (let i=0; i < 1_000_000; i++) {
        result += 1;
    }
    return result;
}
function App(): Element {
    const [count, setCount] = useState(heavyComputation());
    // 초기화 할때마다 heavyComputation()이 실행되어 불필요하게 연산 속도가 저하됨

    const handleIncrease = (): void => {
        setCount((prev): number => prev+1);
    };

    return (
        <>
            <h2>{count}</h2>
            <button onClick={handleIncrease}>증가</button>
        </>
    )
}

export default App;
```

이 때 **초기 상태를 인자 자체로 넘겨버리**면, 해당 함수는 **처음 한 번만 실행**되고 이후에는 다시 실행되지 않아서 성능 저하를 막을 수 있다!

```tsx
import { useState } from 'react';
import './App.css'

function heavyComputation(): number {
    let result = 0;
    for (let i=0; i < 1_000_000; i++) {
        result += 1;
    }
    return result;
}
function App(): Element {
    const [count, setCount] = useState(**heavyComputation**);
    // or " = useState(**(): number => heavyComputation()**);

    const handleIncrease = (): void => {
        setCount((prev): number => prev+1);
    };

    return (
        <>
            <h2>{count}</h2>
            <button onClick={handleIncrease}>증가</button>
        </>
    )
}

export default App;
```

- **`App.tsx`** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 `App.tsx` 파일을 올려주세요!
```tsx
import { useState } from 'react';
import './App.css'

function App(): Element {
    const [count, setCount] = useState(0);

    const handleIncrease = (): void => {
        setCount((prev): number => prev+1);
    };
    const handleDecrease = (): void => {
        setCount((prev):number => prev-1);
    };

    return (
        <>
            <h2>{count}</h2>
            <button onClick={handleIncrease}>증가</button>
            <button onClick={handleDecrease}>감소</button>

        </>
    )
}

export default App;
```