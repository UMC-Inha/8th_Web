- **Tanstack Query Devtools는 무엇인가요?** 🍠

  정의: `TanStack Query`를 사용할 때, 쿼리 상태를 실시간으로 확인하고 디버깅할 수 있도록 도와주는 개발자 도구

  - 캐시 상태, 쿼리 키, 요청 시점, 성공 여부, 오류 메시지 등 다양한 정보를 직관적으로 확인할 수 있다.

- **Tanstack Query Devtools는** 어떻게 세팅하나요? 🍠
  - 패키지 설치
  ```html
  npm install @tanstack/react-query-devtools
  ```
  - 앱에 Devtools 컴포넌트 추가
  ```tsx
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

  const queryClient = new QueryClient();

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <YourAppComponents />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    );
  }

  export default App;
  ```
  위처럼 `process.env.NODE_ENV === 'development'` 조건을 활용해 개발 환경에서만 노출되게 할 수 있다.
