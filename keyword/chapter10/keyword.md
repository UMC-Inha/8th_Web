- **Referential Equality 는 무엇인가요?** 🍠
    
    자바 스크립트에서의 참조 비교는 두 값이 메모리 상 동일한 위치인지를 비교하는 것입니다. 즉, 두 변수가 실제로 동일한 객체 instance 를 참조하는지 여부를 확인합니다. 주로 `===` 연산자를 통해 확인하고, 객체의 내용이 아닌 객체 자체의 동일성을 판별합니다.
    
    다음과 같은 상황에서 React 는 참조 비교를 수행합니다.
    
    1. 컴포넌트 리렌더링 발생
    2. 의존성 배열 검사
    3. memoization 된 값 비교
    
    ```tsx
    const object1 = { name : "chichi" };
    const object2 = { name : "chichi" };
    const object3 = object1;
    
    console.log(object1 === object2); //false
    console.log(object1 === object3); //true - 객체3 이 객체1 의 주소를 참조하기 때문
    ```
    
- 렌더링 최적화와 어떤 관계가 있을까요? 🍠
    
    리액트는 props 나 state 가 바뀌었는지에 따라서 컴포넌트를 리렌더링 합니다. 이때 변경 여부를 확인하기 위해서 참조 동일성을 사용합니다.
    
    ```tsx
    <MyComponent data={ object } />
    ```
    
    - 객체가 이전 렌더링 때의 참조와 같으면 React 는 props 가 바뀌지 않았다고 판단하여 렌더링 하지 않습니다.
    - 참조와 다를 경우 바뀌었다고 판단하여 리렌더링을 시작합니다.
    
    `useMemo` 와 `useCallback` 또한 참조 유지를 통해 불필요한 리렌더링을 방지합니다.
    
    `React.memo()` 도 내부에서 props 의 참조 비교를 최적화합니다.

- **`useCallabck`** 에 대하여 정리해주세요! 🍠
    
    useCallback 은 memoization 기법 중 하나로, 컴포넌트 성능을 최적화 시키는 도구입니다.
    
    useMemo 와 달리 useCallback 은 인자로 전달한 콜백 함수 그 자체를 memoization 하는 기법으로, 컴포넌트가 처음 렌더링 될 때만 함수 객체를 만들어 함수를 초기화 해 주고 이후 렌더링에서 변수가 새로운 함수 객체를 할당 받는 것이 아니라 이전에 할당 받은 함수 객체를 계속 지닌 채로 재사용하는 것을 말합니다.
    
    **useCallback 의 구조**
    
    - useCallback 은 두 개의 인자를 받는다.
    - 첫 번째 인자로는 memoization 해 줄 콜백 함수를 받는다.
    - 두 번째 인자로는 의존성 배열을 받는다.
    - 함수를 useCallback 으로 감싸준다.
        - 그럼 함수가 memoization 된 함수를 가지게 되고, 그 함수는 의존성 배열 내부의 값이 변경되지 않는 이상 초기화되지 않는다.
        - 만약, 의존성 배열 내부의 값이 변경된다면, 함수는 새로 만들어진 객체로 초기화 된다.
- **`memo`**에 대하여 정리해주세요!🍠
    
    `React.memo()` 는 memoization 기법으로 동작하며, **고차 컴포넌트**입니다.
    
    컴포넌트가 props 로 동일한 결과를 렌더링 할 경우 React.memo 를 호출하고, 결과를 memoizaing 하도록 래핑하여 성능을 향상시킵니다. 즉, React 는 컴포넌트를 리렌더링 하지 않고 마지막에 렌더링 된 결과를 재사용합니다. (불필요한 렌더링을 줄입니다.)
    
    React.memo 는 props 변화에만 영향을 주며, 함수 컴포넌트 안에서 구현한 state 나 context 가 변할 때에만 리렌더링 됩니다. 
    
    **React.memo() 를 사용할 필요가 없는 경우**
    
    - 클래스형 컴포넌트인 경우 `PureComponent` 를 확장하여 사용하거나 `shouldComponentUpdate()` 를 사용합니다.
    - 컴포넌트가 다른 props 로 자주 렌더링 되는 경우
    - 가벼운 프로젝트인 경우
-

- **`useMemo`** 에 대하여 정리해주세요! 🍠
    
    React 에서 컴포넌트 성능을 최적화하는데 사용되는 hook 입니다. useMemo 는 처음에 계산된 값을 메모리에 저장하여 컴포넌트가 계속 렌더링 되어도 함수를 다시 호출하지 않고 메모리에 저장되어 있는 값을 가져와 재사용하도록 해 줍니다.
    
    ```tsx
    const value = useMemo(() => {
    	return function();
    }, [item])
    ```
    
    useMemo 는 useState 와 같이 첫 번째 인자로 콜백 함수, 두 번째 인자로 의존성 배열을 받습니다.
    
    의존성 배열 안에 있는 값이 업데이트 될 때에만 콜백 함수를 다시 호출하여 메모리에 저장된 값을 업데이트 하도록 해 줍니다. 만약 빈 배열을 넣을 시 useEffect 와 마찬가지로 마운트 될 때에만 값을 계산하고 그 이후로는 계속 memoization 된 값을 꺼내와서 사용합니다.
    
    하지만, **useMemo 도 무분별하게 사용할 시 성능적인 측면에서 좋지 않을 수 있습니다.** useMemo 를 사용한다는 것은 값을 재활용하기 위해서 따로 메모리를 소비하여 저장하는 것인데, 불필요한 값까지 전부 메모이징 하면 성능에 좋지 않기 때문입니다.
    
    - **`React.memo()` 와 `useMemo` 의 공통점**
        - props 가 변하지 않으면 리렌더링 되지 않고 이전에 메모이징 된 결과를 반환합니다.
    - **`React.memo()` 와 `useMemo` 의 차이점**
        - React.memo 는 고차 컴포넌트이며 useMemo 는 React 의 훅 입니다.
        - React.memo 는 함수형 / 클래스형 컴포넌트 모두에서 사용 가능하지만                     
        - useMemo 는 함수형 컴포넌트에서만 사용할 수 있습니다.