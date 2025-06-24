- **`useMemo`** 에 대하여 정리해주세요! 🍠
  `useMemo` : 값을 메모이제이션(기억)하는 React Hook
  컴포넌트가 리렌더링될 때, 불필요한 값 재계산을 방지하는 역할.
  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```
  [a, b] 가 의존성 배열 ⇒ 바뀌면 다시 계산, 안 바뀌면 저장된 값 재사용
