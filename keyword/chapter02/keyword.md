- React의 동작 원리  🍠
    
    ### React의 동작 원리
    
    React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.
    
    <aside>
    💡
    
    각 특징들이 무엇인지, 어떠한 이점이 있는지 정리해주세요
    
    - UMC 웹 파트장 매튜 / 김용민 - 
    
    </aside>
    
    1. SPA (Single Page Application)
    - 정리
        
        한 개의 HTML 페이지에서 필요한 부분만 동적으로 변경하여 웹 애플리케이션을 실행하는 방식
        
    1. User Interface Library 
    - 정리
        
        사용자 인터페이스(UI)를 쉽고 효율적으로 개발할 수 있도록 도와주는 라이브러리 모음
        
    1. Functional Component (함수형 컴포넌트)
    - 정리
        
        React에서 UI를 정의하는 가장 기본적인 방식
        
    1. Virtual DOM (가상 DOM)
    - 정리
        
        React가 효율적으로 UI를 업데이트하기 위해 사용하는 가상 메모리 내의 돔 객체
        
        (실제 DOM을 직접 변경하는 것이 아니라, 가상 DOM을 먼저 수정한 후 최소한의 변경만 실제 DOM에 적용)
        
    1. 동시성 렌더링
    - 정리
        
        기존의 동기 렌더링의 렌더링이 시작되면 끝날 때까지 중단할 수 없었던 문제점을 개선해 동시성 렌더링에서는 렌더링을 중단할 수 있는 작업으로 변경함
        
        → 우선 순위가 높은 작업을 먼저 처리할 수 있게 됨
        
    1. React의 렌더링 조건
    - 정리
        
        리렌더링
        
        - React의 useState 또는 클래스형 컴포넌트의 setState가 호출되면 컴포넌트가 다시 렌더링 됨
        - 부모 컴포넌트에서 전달된 props가 변경되면 자식 컴포넌트가 다시 렌더링 됨
        - 부모가 렌더링 되면 자식도 자동으로 렌더링 됨

        - **위의 영상을 보고 Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠
    
    const [count, setCount] = useState(() => heavyFunction());
    
    useState의 초기값을 함수로 감싸서 전달하면 최초 렌더링 시에만 실행됨
    
    이후 setCount로 상태를 변경해도 heavyFunction()이 다시 실행되지 않음
    
- **`App.tsx`** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 `App.tsx` 파일을 올려주세요!
        
        ```tsx
        import { useState } from "react";
        
        function App() {
          const [count, setCount] = useState(0);
        
          return (
            <div>
              <h1>{count}</h1>
              <button onClick={() => setCount(count + 1)}>+ 1 증가</button>
              <button onClick={() => setCount(count - 1)}>- 1 감소</button>
            </div>
          );
        }
        
        export default App;
        
        ```
