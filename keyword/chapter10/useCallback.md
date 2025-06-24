- **`useCallabck`** 에 대하여 정리해주세요! 🍠
  `useCallback` : **함수의 참조를 기억**하기 위한 React Hook
  **문법**
  ```jsx
  const memoizedCallback = useCallback(() => {
    // 함수 내용
  }, [dependencies]);
  ```
  위에서 dependencies 값이 바뀌지 않으면 함수가 재생성되지 않고 사용된다.
  **언제 효율적인가?**
  React는 컴포넌트가 렌더링될 때마다 함수를 새로 만들기 때문에, 자식 컴포넌트가 `React.memo`여도 불필요한 리렌더링이 발생할 수 있다.
  ⇒ `useCallback`을 사용하면 함수의 참조를 유지할 수 있어서 이런 리렌더링을 방지할 수 있다.
