- **`Zustand`**에 대하여 정리해주세요! 🍠
      가볍고 직관적인 React 상태 관리 라이브러리 ( Zustand가 독일어로 상태라는 뜻)
      Redux, Recoil 등과 비교해 설정이 간단하고 보일러플레이트가 거의 없다.

      사용 법-상태 생성

      ```tsx
      import { create } from 'zustand';

      const useCounterStore = create((set) => ({
        count: 0,
        increase: () => set((state) => ({ count: state.count + 1 })),
        decrease: () => set((state) => ({ count: state.count - 1 })),
      }));

      ```

      컴포넌트에서 사용
      ```tsx
  import React from 'react';
  import useCounterStore from './store';

function Counter() {
const { count, increase, decrease } = useCounterStore();

return (
<div>
<h1>{count}</h1>
<button onClick={increase}>+1</button>
<button onClick={decrease}>-1</button>
</div>
);
}

```

---
```
