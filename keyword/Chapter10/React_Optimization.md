# React 최적화 정리: useMemo, useCallback, React.memo, Referential Equality

## Referential Equality (참조 동일성)

### 1. 정의

Referential Equality는 **두 값이 메모리에서 동일한 참조(주소)를 가리키는지** 판단하는 방식이다.

```js
const a = { value: 1 };
const b = { value: 1 };
console.log(a === b); // false (다른 참조)

const c = a;
console.log(a === c); // true (같은 참조)
```

- 객체, 배열, 함수는 참조형 데이터로 주소값을 비교 (`===`)
- 원시값은 값 자체를 비교

### 2. React 최적화와의 관계

- React는 `props`, `state` 등을 비교할 때 **참조 동일성** 기준으로 판단
- `React.memo`, `useCallback`, `useMemo`, `useEffect` 등의 **의존성 비교 기준도 참조 동일성**
- 같은 값을 새로 생성하면 참조가 달라져 **불필요한 리렌더링 발생**

```tsx
// 매번 새로운 객체 → memo 무효화
<Component data={{ id: 1 }} />
```

---

## useCallback

### 1. 개념 및 정의

`useCallback`은 함수형 컴포넌트가 리렌더링될 때 동일한 함수를 재사용할 수 있도록 하는 Hook이다.  
즉, **함수의 참조값을 유지**해 자식 컴포넌트의 **불필요한 리렌더링 방지**에 사용된다.

```tsx
const memoizedCallback = useCallback(() => {
  // 실행할 함수
}, [dependency1, dependency2]);
```

### 2. 사용 목적

- 자식에게 함수를 props로 전달할 때, 매번 새 함수가 생성되면 자식도 리렌더링됨
- `useCallback`을 사용하면 동일한 참조값을 유지할 수 있음

### 3. 의존성 배열

- `[]`: 컴포넌트가 처음 렌더링될 때만 생성
- `[state]`: state가 변경될 때마다 새 함수 생성

```tsx
// 잘못된 예시
const increment = useCallback(() => {
  setCount(count + 1); // stale closure 가능성
}, []);

// 올바른 예시
const increment = useCallback(() => {
  setCount((prev) => prev + 1);
}, []);
```

### 4. 사용 예시

```tsx
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);

<ChildComponent onClick={handleClick} />;
```

### 5. 주의사항

- 함수가 캐싱되므로 메모리 사용
- 불필요한 사용은 오히려 성능 저하
- 의존성 배열 정확하게 작성해야 함

---

## React.memo

### 1. 개념 및 정의

- `React.memo`는 고차 컴포넌트로, **props가 바뀌지 않으면 리렌더링을 건너뛰는 기능**을 제공한다.

```tsx
const MemoizedComponent = React.memo(MyComponent);
```

### 2. 사용 목적

- 리렌더링 비용이 큰 컴포넌트에서 최적화를 위해 사용
- `props`가 **얕은 비교(shallow compare)**로 동일한 경우 렌더링 생략

### 3. 사용 예시

```tsx
const Button = React.memo(({ onClick, children }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>{children}</button>;
});

const handleClick = useCallback(() => {
  console.log("clicked");
}, []);

<Button onClick={handleClick}>Click</Button>;
```

### 4. 주의사항

- 객체, 배열, 함수는 참조값이 달라질 수 있어 memo가 무효화됨 → `useMemo`, `useCallback`과 함께 사용 필요
- 깊은 비교는 하지 않음 → 커스텀 비교 함수 필요 시 `React.memo(Component, areEqual)`

---

## useMemo

### 1. 개요

`useMemo`는 렌더링 시 **비용이 많이 드는 계산 결과를 기억(memoization)**하여  
**불필요한 재계산을 방지**하고 컴포넌트 성능을 최적화하는 Hook이다.

### 2. 문법

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 3. 주요 특징

- 리렌더링 시 의존성이 변하지 않으면 계산 생략
- 값(Value)을 메모이제이션
- `useCallback`과 달리 **함수 실행 결과(값)**을 캐싱

### 4. 사용 예시

```tsx
const primeList = useMemo(() => findPrimes(limit), [limit]);
const sortedList = useMemo(() => data.sort(customCompare), [data]);
```

### 5. 사용 시기

- 권장 시점: 정렬, 필터링, 계산 등 연산 비용이 클 때
- 비권장 시점: 간단한 연산, 렌더링이 드물 때
- 주의: 항상 새 값을 반환해야 하는 경우가 아니라면 불필요할 수 있음

### 6. 자주 발생하는 실수

- 빈 의존성 배열 사용 → 업데이트 반영 안 됨
- 단순 연산까지 useMemo로 감싸 성능 저하 및 복잡도 증가
