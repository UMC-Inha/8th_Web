- **`Referential Equality` (참조 동일성)** 🍠
  - **Referential Equality 는 무엇인가요?** 🍠
    두 객체(혹은 배열, 함수 등)의 **메모리 주소가 같은지**를 비교하는 개념
    ⇒ 정말 같은건지 !!
    ```jsx
    const a = { value: 1 };
    const b = a;
    const c = { value: 1 };

    console.log(a === b); // true
    console.log(a === c); // false (값은 같지만 메모리 참조 다름)
    ```
  - 렌더링 최적화와 어떤 관계가 있을까요? 🍠
    React에서는 **리렌더링**을 방지하기 위해 `Referential Equality`를 자주 활용
    ```jsx
    const memoizedData = useMemo(() => ({ name: "yujin" }), []);

    return <MyComponent data={memoizedData} />;
    ```
    → data가 같은 참조를 유지해서 불필요한 렌더링을 막을 수 있다.
