- **Tanstack Query Devtools는 무엇인가요?** 🍠
    
    Tanstack Query를 좀 더 쉽게 다룰 수 있게 도와주는 전용 devtools이다. 
    
    Tanstack Query의 모든 내부 동작을 시각화하는 데 도움을 주며, 문제가 발생하면 디버딩 시간을 절약할 수 있다. 
    
    개발환경에만 실행되기 때문에 배포하기 위해 해당 코드를 삭제 할 필요가 없다.
    
    Data Fetching 작업을 더 수월하게 수행할 수 있다.
    
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
    
    https://tanstack.com/query/v5/docs/framework/react/devtools
    
    1. pnpm add @tanstack/react-query-devtools 를 명령어로 devtools를 설치한다.
    
    2. import { ReactQueryDevtools } from '@tanstack/react-query-devtools
    
    이렇게 해서 devtools를 임포트 해준다.
    
    기본적으로  process.env.NODE_ENV === 'development’ 인 경우에만 포함되므로, 빌드 중에 제외하지 않아도 된다.
    
    3. 플로팅모드
    
    ```tsx
    import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
    
    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      )
    }
    ```
    
    위 코드를 가장 최상단에 위치 시킨다.  개발자 도구를 앱에 고정된 플로팅 요소로 마운트하고, 화면 모서리에 개발자 도구를 표시하거나 숨길 수 있는 토글을 제공한다. 이 토글 상태는 새로고침 시에도 로컬 스토리지에 저장된다.
    
    4. 임베디드 모드
    
    ```tsx
    import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
    
    function App() {
      const [isOpen, setIsOpen] = React.useState(false)
    
      return (
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          <button
            onClick={() => setIsOpen(!isOpen)}
          >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
          {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
        </QueryClientProvider>
      )
    }
    ```
    
    임베디드 모드에서는 개발 도구가 애플리케이션에 고정된 요소로 표시되므로, 자체개발 도구에서 패널을 사용할 수 있다. 마찬가지로 가장 최상단에 위치시킨다.

    - `useCustomFetch` 커스텀 훅과 비교했을 떄 `useQuery`는 어떤 장점이 있나요? 🍠

    1. 자동 캐싱
    - `useQuery`는 동일한 쿼리 키로 여러 컴포넌트에서 데이터를 공유할 때, **자동으로 캐시된 데이터를 사용**하고 네트워크 요청을 최소화한다.
    - 반면, `useCustomFetch`는 별도 캐싱 로직을 구현하지 않는 이상 **매번 fetch 요청**을 보낸다.
    
    2. 자동 리페치
    - `useQuery`는 **컴포넌트가 다시 마운트될 때, 또는 브라우저가 포커스될 때 자동으로 refetch**해줄 수 있다 (`refetchOnMount`, `refetchOnWindowFocus` 등 옵션).
    - `useCustomFetch`에서는 이 로직을 **직접 구현해야** 한다.
    
    3. 로딩/에러 상태 자동 관리
    - `useQuery`는 `isLoading`, `isError`, `data`, `error` 같은 상태를 **자동으로 관리**해준다.
    - `useCustomFetch`에서는 상태 관리(`useState`)를 **직접 구현**해야 하고, 반복 작업이 생긴다.
    
    4. 백오프/재시도, 쿼리 무효화, 병렬 처리 등 고급 기능
    - `retry`, `refetchInterval`, `onSuccess`, `onError`, `staleTime`, `invalidateQueries` 등의 기능을 통해 **복잡한 API 요청 흐름도 쉽게 구현**할 수 있다.
    - `useCustomFetch`는 이런 기능이 **없거나 수동으로 만들어야** 해서 유지보수가 어렵다.
    
    5. 서버 상태 관리 라이브러리와의 통합
    - React Query는 **Devtools**, **프리패칭(pre-fetching)**, **서버 사이드 렌더링(SSR)** 지원 등으로 실무에서의 통합성이 좋다.
    - `useCustomFetch`는 특정 목적에 최적화된 단순한 fetch만을 담당한다.

    - `gcTime`은 무엇인가요? 🍠
    
    쿼리 인스턴스가 모두 언마운트되었을 때부터 캐시가 완전히 삭제되기까지 기다리는 시간이다. 메모리 유지 여부를 결정하고, 메모리에서 삭제 여부를 결정한다.
    
- `staleTime`은 무엇인가요? 🍠
    
    쿼리 데이터가 언제까지 fresh(최신) 하다고 간주될 지를 설정하는 시간이다.
    
    staleTime이 지나면, Tanstack Query는 이 데이터를 stale로 간주하고 특정 상황에서 자동으로 refetch한다.
    
- 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠
    
    정적이고 값이 자주 바뀌지 않는 데이터는 staleTime과 gcTime을 길게 설정하면 좋다.
    
    반면에 자주 바뀌는 데이터는 최대한 최신 상태를 유지해야 하기 때문에 짧은 staleTime을 가짐으로 빠르게 갱신 가능하도록 하고, gcTime 또한 짧게 설정해서 메모리 낭비를 방지하면 좋다. 
    
    결론적으로,
    
    자주 바뀌는 데이터는 staleTime을 짧게, 데이터의 업데이트가 느리고 오래되어도 괜찮다면 길게 설정한다.
    
    컴포넌트를 자주 왔다갔다 한다면 gcTime을 길게, 메모리가 아깝다면 짧게 설정한다.

    - `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`) 🍠
    - `오프셋 기반 페이지네이션`은 무엇인가요? 🍠
        
        쿼리에서 **`offset`과 `limit`(또는 `page`, `size`)를 이용해서 데이터를 잘라서 조회**하는 방식이다.
        
    - `오프셋 기반 페이지네이션`의 장점? 🍠
        1. 구현이 간단하다. SQL이 지원하고 대부분의 백엔드 프레임워크에서 기본적으로 제공한다.
        2. UI/UX 구현이 용이하다. 페이지 번호나 이전/다음 UI 구성에 직관적이다.
        3. 특정 페이지로 점프가 가능하다. 사용자 관점에서 이동이 쉽다.
    - `오프셋 기반 페이지네이션`의 단점? 🍠
        1. 데이터 양이 많으면 느려진다. OFFSET이 클 수록 DB가 많은 행을 스킵해야 하기 때문에 성능 저하가 발생한다.
        2. 데이터 변동 시 문제가 발생한다. 중간에 데이터가 삽입/삭제되면 결과가 중복되거나 빠질 수 있다.
        3. 스케일링에 약하다. 큰 테이블에서는 OFFSET이 병목현상이 발생한다. 

- `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`) 🍠
    - `커서 기반 페이지네이션`은 무엇인가요? 🍠
        
        “어디까지 봤는지”를 기준으로 이어서 데이터를 요청하는 방식이다.
        
        OFFSET 숫자 대신 이전 페이지의 마지막 항목의 고유 값(cursor)을 전달하여 그 다음 데이터를 요청한다.
        
        구현자체는 offset 기반보다 상대적으로 복잡하다.
        
        대용량 리스트 조회, 무한 스크롤 기반 UI, 데이터 정렬 순서가 중요한 경우, 데이터 삽입 삭제가 빈번한 경우에 유용하게 사용된다.
        
    - `커서 기반 페이지네이션`의 장점 🍠
        1. 성능이 우수하다. OFFSET처럼 행을 스킵하지 않기 때문에 대용량 데이터에도 빠르다.
        2. 데이터 정합성을 보장한다. 중간에 데이터가 삽입/삭제 되어도 중복이나 누락 없이 안정적이다.
        3. 무한 스크롤에 적합하다. 다음 페이지가 아니라 다음 항목부터라는 개념이기 때문에 흐름 상 잘 맞는다.
    - `커서 기반 페이지네이션`의 단점 🍠
        1. 특정 페이지로 점프가 불가능하다. 페이지 번호가 아니라 커서 기반이라 임의 위치로 바로 이동이 불가능하다.
        2. 구현이 복잡하다. 커서 생성, 정렬 필드 관리, 방향 제어 등 고려 사항이 많다.
        3. 정렬 기준이 명확해야 한다. 커서는 고유하거나 유일한 순서를 가진 필드가 있어야 한다.

        - Skeleton UI는 무엇인가요? 🍠
    
    SkeletonUI는 사용자에게 로딩 중임을 시각적으로 보여주는 뼈대 형태의 UI이다.
    
    실제 콘텐츠가 로드되기 전에 자리만 차지하는 회색 박스나 애니메이션으로 미리 보여주는 방식이다.
    
    흔히 웹이나 앱에서 리스트, 프로필, 카드 등의 콘텐츠가 늦게 로드될 때 사용된다.
    
    실제 데이터가 들어오면 SkeletonUI가 있던 자리에 그대로 자연스럽게 실제 콘텐츠로 바뀐다.
    
- Skeleton UI를 활용했을 때 장점에 대해 정리해주세요 🍠
    1. UX 가 향상된다. 사용자에게 빈 화면이 아닌 뭔가가 진행중인 느낌을 주기 때문에 사용자 경험이 향상된다.
    2.  위치를 예측 가능 하다. 콘텐츠의 배치가 미리 보이므로, 레이지 로딩 UX가 부드럽다
    3. 시각적인 안정감을 준다. 스피너보다 자연스럽고 깔끔한 느낌을 제공한다.