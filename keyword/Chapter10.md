- **Referential Equality 는 무엇인가요?** 🍠
    
    두 값이 메모리에서 같은 객체 또는 배열, 함수 등을 가리키는가를 판단하는 것이다.
    
    객체나 배열, 함수는 값이 아니라 참조로 저장되기 때문에 두 값의 내용이 같더라도 메모리 주소가 다르면 다른 것으로 인식된다.
    
- 렌더링 최적화와 어떤 관계가 있을까요? 🍠
    
    리액트는 props나 state가 바뀌었는지를 기준으로 컴포넌트를 다시 렌더링할지 결정한다.
    
    하지만 참조형 데이터는 값이 같더라도 참조가 다르면 바뀐 것으로 인식한다.
    
    렌더링 최적화를 위해서는 참조 동일성을 의도적으로 유지하는 것이 매우 중요하다.
    
    props, 함수, 객체를 useMemo, useCallback 으로 감싸야 불필요한 렌더링을 방지할 수 있다.
    
    잘 관리하면 성능 최적화에 큰 영향을 준다.

    - **`useCallabck`** 에 대하여 정리해주세요! 🍠
    
    ussCallback은 리랜더링 간에 함수 정의를 캐싱해 주는 Reack Hook이다.
    
    `const cachedFn = useCallback(fn, dependencies)`
    
    ### **매개변수**
    
    - `fn`: 캐싱할 함숫값입니다. 이 함수는 어떤 인자나 반환값도 가질 수 있다. React는 첫 렌더링에서 이 함수를 반환한다. 다음 렌더링에서 `dependencies` 값이 이전과 같다면 React는 같은 함수를 다시 반환한다. 반대로 `dependencies` 값이 변경되었다면 이번 렌더링에서 전달한 함수를 반환하고 나중에 재사용할 수 있도록 이를 저장한다. React는 함수를 호출하지 않는다. 이 함수는 호출 여부와 호출 시점을 개발자가 결정할 수 있도록 반환된다.
    - `dependencies`: `fn` 내에서 참조되는 모든 반응형 값의 목록이다. 반응형 값은 props와 state, 그리고 컴포넌트 안에서 직접 선언된 모든 변수와 함수를 포함한다. 린터가 React를 위한 설정으로 구성되어 있다면 모든 반응형 값이 의존성으로 올바르게 명시되어 있는지 검증한다. 의존성 목록은 항목 수가 일정해야 하며 `[dep1, dep2, dep3]`처럼 인라인으로 작성해야 한다. React는 `Object.is` 비교 알고리즘을 이용해 각 의존성을 이전 값과 비교한다.
    
    ### **반환값**
    
    최초 렌더링에서는 `useCallback`은 전달한 `fn` 함수를 그대로 반환한다.
    
    후속 렌더링에서는 이전 렌더링에서 이미 저장해 두었던 `fn` 함수를 반환하거나 (의존성이 변하지 않았을 때), 현재 렌더링 중에 전달한 `fn` 함수를 그대로 반환한다.
    
    **`useCallback`은 성능 최적화를 위한 용도로만 사용해야 한다.** 만약 코드가 `useCallback` 없이 작동하지 않는다면 먼저 근본적인 문제를 찾아 해결해야 한다. 그다음에 `useCallback`을 다시 추가할 수 있다.
    
- **`memo`**에 대하여 정리해주세요!🍠
    
    memo를 사용하면 컴포넌트의 Props가 변경되지 않은 경우 리렌더링을 건너뛸 수 있다.
    
    ```tsx
    const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
    ```
    
    컴포넌트를 `memo`로 감싸면 해당 컴포넌트의 메모된 버전을 얻을 수 있다. 메모된 버전의 컴포넌트는 일반적으로 부모 컴포넌트가 리렌더링 되어도 Props가 변경되지 않았다면 리렌더링되지 않는다. 그러나 메모이제이션은 성능을 최적화하는 것이지, 보장하는 것은 아니기 때문에 React는 여전히 다시 렌더링될 수도 있다.
    
    ### **매개변수**
    
    - `Component`: 메모Memoize하려는 컴포넌트다. `memo`는 이 컴포넌트를 수정하지 않고 대신 새로운 메모된 컴포넌트를 반환한다. 함수와 `forwardRef` 컴포넌트를 포함한 모든 유효한 React 컴포넌트가 허용된다.
    - **optional** `arePropsEqual`: 컴포넌트의 이전 Props와 새로운 Props의 두 가지 인수를 받는 함수다. 이전 Props와 새로운 Props가 동일한 경우, 컴포넌트가 이전 Props와 동일한 결과를 렌더링하고 새로운 Props에서도 이전 Props와 동일한 방식으로 동작하는 경우 `true`를 반환해야 한다. 그렇지 않으면 `false`를 반환해야 한다. 일반적으로 이 함수를 지정하지 않는다. React는 기본적으로 `Object.is`로 각 Props를 비교한다.
    
    ### **반환값**
    
    `memo`는 새로운 React 컴포넌트를 반환한다. `memo`에 제공한 컴포넌트와 동일하게 동작하지만, 부모가 리렌더링되더라도 Props가 변경되지 않는 한 React는 이를 리렌더링하지 않는다.
    
    # **사용법**
    
    # **Props가 변경되지 않았을 때 리렌더링 건너뛰기**
    
    React는 일반적으로 부모가 리렌더링될 때마다 컴포넌트를 리렌더링한다. `memo`를 사용하면, 새로운 Props가 이전 Props와 같으면 부모 컴포넌트가 다시 렌더링되더라도 React가 해당 컴포넌트를 다시 렌더링하지 않도록 만들 수 있다. 이러한 컴포넌트를 메모된 상태라고 한다.
    
    컴포넌트를 메모하려면 `memo`로 감싸고 기존 컴포넌트 대신에 반환된 값을 사용하자.
    
    ```tsx
    const Greeting = memo(function Greeting({ name }) 
    {  return <h1>Hello, {name}!</h1>;
    });
    
    export default Greeting;
    ```
    
    React 컴포넌트는 항상 순수한 렌더링 로직을 가져야 한다. 이는 Props, State 그리고 Context가 변경되지 않으면 항상 동일한 결과를 반환해야 함을 의미한다. `memo`를 사용하면 컴포넌트가 이 요구 사항을 준수한다고 알리므로, Props가 변경되지 않는 한 React는 리렌더링 될 필요가 없다. `memo`를 사용하더라도 컴포넌트의 State가 변경되거나 사용 중인 Context가 변경되면 리렌더링 된다.
    
    아래 예시에서 `Greeting` 컴포넌트는 `name`이 Props 중 하나이기 때문에 `name`이 변경될 때마다 리렌더링 된다. 하지만 `address`는 `Greeting`의 Props가 아니기 때문에 `address`가 변경될 때는 리렌더링되지 않는다.

    - **`useMemo`** 에 대하여 정리해주세요! 🍠
    
    `useMemo` 는 재렌더링 사이에 계산 결과를 캐싱할 수 있게 해주는 React Hook이다.
    
    ```tsx
    const cachedValue = useMemo(calculateValue, dependencies)
    ```
    
    # **레퍼런스**
    
    # **`useMemo(calculateValue, dependencies)`**
    
    컴포넌트의 최상위 레벨에 있는 ‘useMemo’를 호출하여 재렌더링 사이의 계산을 캐싱한다.
    
    ```tsx
    import { useMemo } from 'react';
    
    function TodoList({ todos, tab }) {
      const visibleTodos = useMemo(
        () => filterTodos(todos, tab),
        [todos, tab]
      );
      // ...
    }
    ```
    
    ### **매개변수**
    
    - `calculateValue`: 캐싱하려는 값을 계산하는 함수다. 순수해야 하며 인자를 받지 않고, 모든 타입의 값을 반환할 수 있어야 한다. React는 초기 렌더링 중에 함수를 호출한다. 다음 렌더링에서, React는 마지막 렌더링 이후 `dependencies`가 변경되지 않았을 때 동일한 값을 다시 반환한다. 그렇지 않다면 `calculateValue`를 호출하고 결과를 반환하며, 나중에 재사용할 수 있도록 저장한다.
    - `dependencies`: `calculateValue` 코드 내에서 참조된 모든 반응형 값들의 목록이다. 반응형 값에는 props, state와 컴포넌트 바디에 직접 선언된 모든 변수와 함수가 포함된다. 만약 linter가 React용으로 설정된 경우 모든 반응형 값이 의존성으로 올바르게 설정되었는지 확인할 수 있다. 의존성 목록은 일정한 수의 항목을 가져야 하며, `[dep1, dep2, dep3]`와 같이 인라인 형태로 작성돼야 한다. React는 `Object.is` 비교를 통해 각 의존성 들을 이전 값과 비교한다.
    
    ### **반환값**
    
    초기 렌더링에서 `useMemo`는 인자 없이 `calculateValue`를 호출한 결과를 반환합니다.
    
    다음 렌더링에서, 마지막 렌더링에서 저장된 값을 반환하거나(종속성이 변경되지 않은 경우), `calculateValue`를 다시 호출하고 반환된 값을 저장합니다.
    
    # **사용법**
    
    # **비용이 높은 로직의 재계산 생략하기**
    
    재렌더링 사이에 계산을 캐싱하려면 컴포넌트의 최상위 레벨에서 `useMemo`를 호출하여 계산을 감싸면 된다.
    
    ```tsx
    import { useMemo } from 'react';
    
    function TodoList({ todos, tab, theme }) {
      const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
      // ...
    }
    ```
    
    `useMemo`에 두 가지를 전달해야 한다.
    
    1. `() =>`와 같이 인수를 받지 않고 계산하려는 값을 반환하는 계산 함수 
    2. 계산 내부에서 사용되는 컴포넌트 내의 모든 값을 포함하는 종속성 목록 
    
    초기 렌더링에서 `useMemo`에서 얻을 수 있는 값은 계산 함수를 호출한 결과값이다.
    
    이후 모든 렌더링에서 React는 종속성 목록을 마지막 렌더링 중에 전달한 종속성 목록과 비교한다. 만일 (`Object.is`와 비교했을 때) 종속성이 변경되지 않았다면, `useMemo`는 이전에 이미 계산해둔 값을 반환힌다. 그렇지 않다면 React는 계산을 다시 실행하고 새로운 값을 반환한다.
    
    즉, `useMemo`는 종속성이 변경되기 전까지 재렌더링 사이의 계산 결과를 캐싱한다.
    
    기본적으로 React는 컴포넌트를 다시 렌더링할 때마다 컴포넌트의 전체 본문을 다시 실행한다. 예를 들어, `TodoList`가 상태를 업데이트하거나 부모로부터 새로운 props를 받으면 `filterTodos` 함수가 다시 실행된다.
    
    ```tsx
    function TodoList({ todos, tab, theme }) {
      const visibleTodos = filterTodos(todos, tab);
      // ...
    }
    ```
    
    일반적으로 대부분의 계산을 매우 빠르기 때문에 문제가 되지 않는다. 그러나 큰 배열을 필터링 혹은 변환하거나 비용이 많이 드는 계산을 수행하는 경우, 데이터가 변경되지 않았다면 계산을 생략하는 것이 좋다. 만약 `todos`과 `tab`이 마지막 렌더링 때와 동일한 경우, 앞서 언급한 것처럼 `useMemo`로 계산을 감싸면 이전에 계산된 `visibleTodos`를 재사용할 수 있다.
    
    이러한 유형의 캐싱을 *메모이제이션* 라고 한다.