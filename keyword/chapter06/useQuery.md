### 키워드 정리 🍠

- `Tanstack Query`는 무엇인가요?
    
    ### Tanstack Query란 ?
    
    `Tanstack Query`(구 React Query)는 서버 상태 관리, 비동기 데이터 패칭 및 캐싱, 동기화를 효과적으로 처리할 수 있도록 도와주는 라이브러리입니다.
    
    ```tsx
    // 적합한 환경에 따라 선택하여 설치해주시면 됩니다. bun도 사용하셔도 상관 없습니다.
    pnpm install @tanstack/react-query
    npm install @tanstack/react-query
    yarn add @tanstack/react-query
    ```
    
    **설정 방법**
    
    React 애플리케이션의 최상위 컴포넌트에서 `QueryClient`와 `QueryClientProvider`를 사용하여 전체 앱에 `Tanstack Query`를 적용합니다.
    
    ```tsx
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    
    const queryClient = new QueryClient();
    
    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
        </QueryClientProvider>
      );
    }
    export default App;
    ```
    
- `Tanstack Query Devtools`는 무엇인가요?  🍠
    - **Tanstack Query Devtools는 무엇인가요?** 🍠
        
        : TanStack Query의 상태를 시각적으로 확인하고 디버깅할 수 있게 해 주는 **개발자 도구**
        
        - 주요 기능
            - 쿼리 캐시 시각화
                
                : 현재 메모리에 로드된 모든 쿼리 키와 상태(stale/fresh, fetching 등)를 리스트로 보여줌
                
            - 변경 이력 추적
                
                : 쿼리의 데이터가 어떻게 바뀌어 왔는지 스냅샷 단위로 확인 가능
                
            - 강제 리패칭
                
                : 각 쿼리 옆의 버튼을 눌러 해당 쿼리를 즉시 재요청(refetch) 가능
                
            - 캐시 수동 조작
                
                : 쿼리 데이터를 직접 수정하거나, 해당 캐시를 삭제·무효화(invalidate) 가능
                
    - **Tanstack Query Devtools는** 어떻게 세팅하나요? 🍠
        
        <aside>
        ❓
        
        `Devtools` 세팅 방법을 위의 `Tanstack Query` 설명처럼 적어주시면 좋습니다!
        
        아래 공식 문서를 참고해주세요!
        
        추가적으로 이런 개발에 도움이 되는 도구들은 실제 배포환경에서 보여주는 것은 바람직 하지 않습니다.
        
        개발 환경일 때만 `Devtools`가 보이게 세팅할려면 어떻게 코드를 작성해야할까요?
        
        직접 작성해보시고, 모르시는 분은 강의 영상에서 제가 정리해드릴 예정이니 강의 영상을 본 후 작성해주셔도 좋습니다!
        
        - UMC 8th 중앙 웹 파트장 매튜 / 김용민 - 
        
        </aside>
        
        ```tsx
        npm i @tanstack/react-query-devtools@4
        pnpm add @tanstack/react-query-devtools@4
        yarn add @tanstack/react-query-devtools@4
        ```
        
        ```tsx
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
        ```
        
        https://tanstack.com/query/v5/docs/framework/react/devtools
        
- **`useQuery` 는 무엇인가요?** (커스텀 훅과 비교) ****🍠
    
    ### useQuery
    
    `useQuery`는 단일 데이터 요청을 수행하며, 데이터 캐싱, 로딩/에러 상태 관리 및 자동 재요청 등의 기능을 제공합니다.
    
    **사용법**
    
    ```tsx
    import { useQuery } from '@tanstack/react-query';
    
    const fetchTodos = async () => {
      const res = await fetch('/api/todos');
      return res.json();
    };
    
    function TodosComponent() {
      const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선도 유지
      });
    
      if (isLoading) return <div>로딩 중!</div>;
      if (error) return <div>에러입니다!</div>;
    
      return (
        <ul>
          {data?.map((todo: any) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      );
    }
    ```
    
    - `useCustomFetch` 커스텀 훅과 비교했을 떄 `useQuery`는 어떤 장점이 있나요? 🍠
        
        커스텀 훅의 경우에는 캐싱/중복 요청 방지/리패칭/에러·로딩 상태 관리 등의 기능을 구현하기 위해서는 직접 모든 코드를 구현해야 했으나, useQuery에는 내장된 메커니즘이 있기 때문에 별다른 구현없이 호출만으로 이 같은 기능들을 사용할 수 있다.
        
        즉, 개발자 입장에서 훨씬 편하게 쓸 수 있는 도구인셈. 
        
- **`useQuery`**의 주요 옵션
    
    ### useQuery의 다양한 옵션
    
    - **queryKey**
        - **설명:** 해당 쿼리를 고유하게 식별하는 키. (배열이나 문자열 형태)
        - **용도:** 캐싱, 데이터 갱신, 중복 요청 방지에 사용.
    - **queryFn**
        - **설명:** 데이터를 비동기로 패칭하는 함수.
        - **용도:** Promise를 반환해야 하며, 실제 API 호출 로직을 포함.
    - **gcTime**
        - **설명:** 사용되지 않는 쿼리 데이터가 메모리에서 제거되기까지의 시간 (밀리초 단위).
        - **용도:** 메모리 관리와 불필요한 데이터 보관 방지.
    - **enabled**
        - **설명:** 쿼리 실행을 조건부로 활성화할지 결정하는 불리언 값.
        - **용도:** 특정 조건(예: 인증 상태)에 따라 데이터 패칭 여부를 제어.
    - **networkMode**
        - **설명:** 쿼리의 네트워크 요청 동작 모드를 지정 (예: 오프라인, 온라인 모드 등).
        - **용도:** 네트워크 상태에 따른 데이터 패칭 로직 제어.
    - **initialData**
        - **설명:** 쿼리의 초기 데이터 값.
        - **용도:** 최초 렌더링 시 이미 가지고 있는 데이터를 활용하여 빠른 UI 표시.
    - **initialDataUpdatedAt**
        - **설명:** 초기 데이터가 설정된 시점의 타임스탬프.
        - **용도:** 초기 데이터의 신선도 판단에 사용.
    - **meta**
        - **설명:** 사용자가 추가로 전달할 수 있는 메타 데이터.
        - **용도:** 로깅, 디버깅, 또는 특정 로직을 위해 커스텀 정보를 저장.
    - **notifyOnChangeProps**
        - **설명:** 어떤 속성 변화가 컴포넌트 리렌더링을 유발할지 지정.
        - **용도:** 불필요한 리렌더링을 줄여 성능 최적화.
    - **placeholderData**
        - **설명:** 실제 데이터가 도착하기 전까지 임시로 보여줄 데이터.
        - **용도:** 사용자에게 즉각적인 UI 피드백 제공.
    - **queryKeyHashFn**
        - **설명:** queryKey를 해싱할 때 사용하는 커스텀 함수.
        - **용도:** 복잡한 queryKey의 일관된 캐싱을 위해 사용.
    - **refetchInterval**
        - **설명:** 데이터 자동 refetch 간격 (밀리초 단위).
        - **용도:** 주기적으로 최신 데이터를 유지.
    - **refetchIntervalInBackground**
        - **설명:** 앱이 백그라운드 상태일 때도 refetch를 계속할지 여부.
        - **용도:** 사용자가 백그라운드에서도 데이터 최신성을 유지해야 할 경우 사용.
    - **refetchOnMount**
        - **설명:** 컴포넌트 마운트 시 refetch 여부.
        - **용도:** 화면 전환 등으로 인해 최신 데이터를 항상 불러와야 하는 경우.
    - **refetchOnReconnect**
        - **설명:** 네트워크 재연결 시 자동으로 refetch할지 여부.
        - **용도:** 네트워크 장애 후 최신 데이터 복원.
    - **refetchOnWindowFocus**
        - **설명:** 브라우저 창에 포커스가 돌아올 때 refetch할지 여부.
        - **용도:** 사용자가 페이지로 돌아왔을 때 데이터를 최신 상태로 유지.
    - **retry**
        - **설명:** 쿼리 실패 시 재시도 횟수 (숫자 또는 함수 형태로 제어 가능).
        - **용도:** 일시적 네트워크 오류 시 자동 복구.
    - **retryOnMount**
        - **설명:** 컴포넌트 마운트 시 재시도 여부.
        - **용도:** 초기 로딩 실패 후 재시도 로직 제어.
    - **retryDelay**
        - **설명:** 재시도 사이의 대기 시간 (밀리초 단위).
        - **용도:** 연속된 재시도 사이의 간격 조절.
    - **select**
        - **설명:** 패칭된 데이터를 가공하여 반환하는 함수.
        - **용도:** 컴포넌트에 필요한 데이터 형태로 변환.
    - **staleTime**
        - **설명:** 데이터가 신선하다고 간주되는 시간 (밀리초 단위).
        - **용도:** 이 시간 동안은 자동 refetch가 발생하지 않음.
    - **structuralSharing**
        - **설명:** 데이터 갱신 시 구조적 공유를 활용하여 불필요한 리렌더링을 방지.
        - **용도:** 데이터 참조 보존 및 최적화.
    - **subscribed**
        - **설명:** 내부적으로 사용되는 옵션으로, 쿼리의 구독 상태를 관리.
        - **용도:** Tanstack Query 내부 로직에서 활용.
    - **throwOnError**
        - **설명:** 에러 발생 시 에러를 throw하여, 에러 핸들링을 강제할지 결정.
        - **용도:** 에러가 컴포넌트 밖으로 전달되어 예외 처리되도록 할 때 사용.
    
- `gcTime`과 `staleTime`의 차이점에 대해 정리해보세요! 🍠
    
    ### `gcTime` vs `staleTime`
    
    <aside>
    ❓
    
    **gcTime**과 **staleTime**의 개념을 다시 정리해주시고, 두 값을 어떤 식으로 설정하면 캐싱 전략에 유리한지 설명해주세요!
    
    </aside>
    
    - `gcTime`은 무엇인가요? 🍠
        
        정의 : 사용되지 않는 캐시 데이터가 메모리에서 완전히 제거되기 전까지 보관하는 시간(밀리초 단위)
        
        동작 : 쿼리가 언마운트되고 해당 쿼리가 stale 상태가 된 시점부터 gcTime 이후에 캐시가 삭제됨. 
        
        “subscription” vs “unmount”
        
        - subscription
        : useQuery 훅을 호출하면 해당 쿼리에 대해 “구독”이 시작됨.
        컴포넌트가 화면에 렌더링된 동안, 훅은 쿼리의 데이터·상태 변화를 구독하여 최신 데이터를 전달받음
        - unmount
        : 해당 컴포넌트가 더 이상 화면에 렌더링되지 않는 시점
        useQuery가 구독을 해제함(해당 쿼리에 더 이상 반응할 컴포넌트가 없음을 의미)
    - `staleTime`은 무엇인가요? 🍠
        
        정의 : 데이터가 신선(Fresh)한 상태로 간주하는 기간(밀리초 단위)
        
        동작 : stale Time이 지나기 전까지, 해당 쿼리에 대해 리패치를 자동으로 발생시키지 않음. stale Time이 0(default)이면, 데이터를 읽는 즉시 “stale” 상태로 바뀌어 자동 리패칭이 일어날 수 있음.
        
        “fresh(신선)” vs “stale(오래된)”
        
    - 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠
        - 변경 빈도가 낮은 데이터
        : gcTime을 짧게 설정해서, 메모리 낭비를 방지
        stale time을 길게 설정해서, 불필요한 네트워크 호출을 줄임
        - 변경 빈도가 높은 데이터 
        : gcTime을 길게 설정하여 캐시 히트율을 높임
        stale time을 짧게 설정하여 최신성을 유지
    
    + Tmi
    
    : React Query에서 말하는 “캐시”는 하드웨어 레벨의 CPU 캐시(S-RAM/D-RAM)과 완전히 다른 개념.
    
    여기서 사용하는 캐시는 “브라우저 안의 자바스크립트 메모리 공간에 데이터를 저장하는 것을 의미함!
    
- **`오프셋 기반 페이지네이션`**과 **`커서 기반 페이지네이션`**에 대해 정리해보세요! 🍠
    - `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`) 🍠
        - `오프셋 기반 페이지네이션`은 무엇인가요? 🍠
            
            : 전체 목록에서 시작 위치(offset)과 한 번에 가져올 개수(limit)을 지정하여 다음 페이지를 조회하는 방식
            
        - `오프셋 기반 페이지네이션`의 장점? 🍠
            - 구현 용이
        - `오프셋 기반 페이지네이션`의 단점? 🍠
            - 중간에 새로 삽입·삭제된 데이터를 기준으로 페이지 경계가 뒤틀리면, 일부 항목이 빠지거나 중복 조회될 수 있음
            - 오프셋이 커질수록 느려질 수 있음
    - `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`) 🍠
        - `커서 기반 페이지네이션`은 무엇인가요? 🍠
            
            : 각 항목에 고유한 커서를 부여하고, 해당 커서를 기준으로 이전/이후 데이터를 조회하는 방식
            
        - `커서 기반 페이지네이션`의 장점 🍠
            - 새로 삽입·삭제가 있어도 “이전/다음” 커서만 정확히 관리하면 **스킵·중복 없이** 탐색 가능
        - `커서 기반 페이지네이션`의 단점 🍠
            - “5페이지로 이동” 같은 임의의 페이지로의 이동은 지원하지 않음
- **`useInfiniteQuery`**는 무엇인가요?
    
    ### useInfiniteQuery
    
    `useInfiniteQuery`는 페이지네이션이나 무한 스크롤을 구현할 때 사용되는 훅으로, 여러 페이지에 걸친 데이터 패칭과 연결을 손쉽게 처리할 수 있도록 도와줍니다.
    
    **사용법**
    
    ```tsx
    import { useInfiniteQuery } from '@tanstack/react-query';
    
    const fetchPosts = async ({ pageParam = 0 }) => {
      const res = await fetch(`/api/posts?page=${pageParam}`);
      return res.json();
    };
    
    function InfinitePostsComponent() {
      const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
      } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        // 마지막 페이지 정보를 바탕으로 다음 페이지 번호를 결정합니다.
        getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error occurred!</div>;
    
      return (
        <div>
          {data?.pages.map((page, pageIndex) => (
            <ul key={pageIndex}>
              {page?.data.map((post: any) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          ))}
          {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
        </div>
      );
    }
    
    ```
    
- **`useInfiniteQuery`**의 주요 옵션
    
    ### **useInfiniteQuery**의 주요 옵션
    
    - **주요 옵션들**
        - **queryKey**
            - 캐싱 및 식별을 위한 유니크 키 (배열 형태 권장)
        - **queryFn**
            - 페이지 정보를 받아 비동기 데이터 패칭 함수. 기본적으로 `pageParam` 값을 사용하며, 초기값을 설정할 수 있음.
        - **getNextPageParam**
            - 마지막 페이지 데이터를 바탕으로 다음 페이지의 `pageParam` 값을 결정하는 함수
            - 반환 값이 `false` 혹은 `undefined`이면 추가 페이지가 없음을 의미합니다.
        - **getPreviousPageParam**
            - (필요한 경우) 이전 페이지의 파라미터를 결정하는 함수
        - **staleTime, cacheTime 등**
            - 일반 useQuery와 유사하게 데이터의 신선도 및 캐싱 전략을 설정할 수 있음
        - **refetchOnWindowFocus, enabled 등**
            - 조건부 패칭 및 자동 재요청 옵션들을 동일하게 활용 가능
- `Skeleton UI`는 무엇인가요? 🍠
    - Skeleton UI는 무엇인가요? 🍠
        
        : 컨텐츠가 준비되기 전까지 빈 프레임만 먼저 렌더링 되는 기법
        페이지 전체가 깜빡이며 바뀌는 대신, 어떤 구성 요소가 어디에 올 지, 대략적인 크기와 형태를 곧바로 파악 가능!
        
    - Skeleton UI를 활용했을 때 장점에 대해 정리해주세요 🍠
        1. 사용자 경험(UX) 개선
        로딩 스피너나 빈 화면을 보여주는 것보다 사용자가 콘텐츠를 예측할 수 있도록 도와주어 불필요한 불안감을 줄임
        2. 시각적인 일관성 유지
        실제 콘텐츠가 로드될 때 갑자기 UI가 바뀌는 느낌을 줄일 수 있으며, 화면 전환이 자연스러움
        3. 기다림의 인지적 부담 감소
        스켈레톤 UI는 사용자가 로딩 시간을 짧게 느끼도록 하는 심리적 효과를 제공합니다. 비어 있는 화면보다 로드 중이라는 신호를 보내는 것이 사용자 만족도를 높이는 데 도움이 됨