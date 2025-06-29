### 키워드 정리 🍠

- **`Referential Equality` (참조 동일성)** 🍠
    - **Referential Equality 는 무엇인가요?** 🍠
        
        `===` or `Object.is()`로 두 값을 비교했을 때 두 값이 **같은 메모리 주소를 가리키면** 참조가 동일하다고 한다. array, function, object에 적용된다.
        
        ```jsx
        const a = { key: 'value' };
        const b = { key: 'value' };
        const c = a;
        
        console.log(a === b); // false -> 내용은 같아도 참조는 다름
        console.log(a === c); // true -> 같은 객체를 참조
        ```
        
    - 렌더링 최적화와 어떤 관계가 있을까요? 🍠
        
        React는 성능 최적화를 위해 state나 props가 바뀌었는지 얕은 비교(shallow comparison)를 한다.
        
        즉, 객체가 이전과 같은 참조를 가지면 "바뀌지 않았다"고 판단. → 이로 인해 **내부 내용이 바뀌었어도 참조가 동일하면 리렌더링되지 않는다.**
        
        ```jsx
        import { useState } from 'react';
        import './App.css';
        
        const App = () => {
          const [mySelf, setMySelf] = useState<{ name: string, age: number }>({ name: 'David', age: 30 });
        
          const changeNameToJohn = () => {
            mySelf.name = "John"; // 직접 변경, 참조는 그대로
            mySelf.age = 30;
            console.log(mySelf);
        	    setMySelf(mySelf); // React는 변화 없다고 판단, 리렌더링 XX
          }
        
          return (
            <div className="container">
              <div className="row">
                <div className="col-sm-12" style={{ textAlign: 'center', padding: 30 }}>
                  <p>My name is {mySelf.name} and I am {mySelf.age} years of age.</p>
                  <button className="btn btn-primary" onClick={changeNameToJohn}>Change My Name To John</button>
                </div>
              </div>
            </div>
          );
        }
        
        export default App;
        ```
        
        ![image.png](attachment:f8f04229-d6b3-44ac-a523-25c306b3f5f8:image.png)
        
        ![image.png](attachment:fe1a8378-7738-4298-a4ce-8c34510804a9:image.png)
        
        그렇다면 어떻게 해결하나?
        
        ```jsx
        const changeNameToJohn = () => {
          setMySelf({ ...mySelf, name: 'John' });
        };
        ```
        
        스프레드 문법 (`{...}`)으로 새로운 객체를 생성 → 참조 변경됨 → 리렌더링 OO


컴포넌트 최적화를 위해 사용되는 대표적인 hooks: `useCallback`, `useMemo`

** 메모이제이션: 동일한 값을 리턴하는 함수를 반복적으로 호출할 경우, 맨 처음 값을 메모리에 저장하고(캐싱), 필요할 때마다 꺼내서 재사용(캐시에서 꺼내 사용)하는 기법. 동일한 결과를 불필요하게 다시 계산하지 않고 캐시된 결과를 반환한다.

- **`useCallback`과 `memo`**
    
    - **`useCallabck`** 에 대하여 정리해주세요! 🍠
        
        메모이제이션된 콜백 함수, 즉 이미 생성된 함수를 반환(함수 재사용)하는 리액트 훅이다.
        
        ```jsx
        const handleClick = useCallback(() => {
          console.log("clicked!"); // 콜백 함수
        	}, []); // 의존성 배열: 빈 배열은 "이 함수는 절대 안 바뀌게 해"의 의도, memo와 자주쓴다.
        ```
        
        `useCallback`은 의존성이 변경되었을 때만 메모지제이션 된 새 함수를 생성한다.
        
        의존성 배열이 바뀌지 않는 한, 콜백 함수는 계속 같은 참조를 유지한다. 주로 props로 함수를 전달할 때 유용 (자식 컴포넌트가 불필요하게 리렌더링 되는 것을 방지)
        
        *** 주의
        
        1. 의존성 배열을 신중하게 설정할 것. 
        - 값을 넣지 않으면 최신 값이 반영되지 않을 수도 있다.
        - 너무 많은 변수를 넣으면, 최적화 효과가 사라질 수 있다.
        2. useCallback TradeOff: 
        - useCallback 함수가 메모리에 저장되기 때문에 메모리를 많이 사용. 정말 필요할 때 사용하기.

    - **`memo`**에 대하여 정리해주세요!🍠
        
        컴포넌트를 메모지제이션해서 props가 바뀌지 않으면 리렌더링하지 않도록 막아주는 최적화 기법.
        
        ```jsx
        const Parent = () => {
          const handleClick = useCallback(() => {
            console.log("clicked");
          }, []);
        
          return <Child onClick={handleClick} />;
        };
        
        const Child = React.memo(({ onClick }) => {
          console.log("Child 렌더링");
          return <button onClick={onClick}>Click</button>;
        });
        
        ```
        
        `useCallback`과 `memo`를 사용하면 `handleClick`의 참조가 유지되어 `Child`는 props가 변하지 않았다고 판단한다. → 리렌더링 생략 성공!


- **`useMemo`**
    
    - **`useMemo`** 에 대하여 정리해주세요! 🍠
        
        메모이제이션된 값을 반환(결과 재사용)하는 리액트 훅이다. 두 개의 인자를 받는다.
        
        ```jsx
        const expensiveValue = useMemo(() => {
          return heavyCalculation(input); // 콜백 함수
        }, [input]); // 의존성 배열: 내부 요소가 변경되었을 때 다시 계산하라고 알려주는 배열
        ```
        
        `useMemo`는 의존성이 변경되었을 때만 메모이제이션된 값을 다시 계산한다. 따라서 기존에 매번 렌더링마다 실행되었던 복잡한 계산을 방지한다.
        
        “`useMemo` 내 콜백함수 계산 수행 → 결과를 메모리에 저장 → 
        의존성 배열 내부의 값이 바뀔 때만 다시 계산하고, 그렇지 않으면 이전 계산 값을 그대로 재사용”
        
        결과는 항상 최신 상태로 유지 & 불필요한 재연산을 피할 수 있다. 무거운 계산에 최적화.
        
        ** 주의
        
        1. 의존성 배열을 신중하게 설정할 것. 
        - 값을 넣지 않으면 최신 값이 반영되지 않을 수도 있다.
        - 너무 많은 변수를 넣으면, 최적화 효과가 사라질 수 있다.
        2. useMemo TradeOff: 
        - useMemo 값이 메모리에 저장되기 때문에 메모리를 많이 사용. 정말 필요할 때 사용하기.