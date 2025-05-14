- `Tanstack Query Devtools`는 무엇인가요?  🍠
    - **Tanstack Query Devtools는 무엇인가요?** 🍠
        
        Tanstack Query를 더 쉽게 다룰 수 있도록 도와주는 전용 Devtools
        
        ```tsx
        // 설치 방법
        pnpm add @tanstack/react-query-devtools@4
        npm i @tanstack/react-query-devtools@4
        yarn add @tanstack/react-query-devtools@4
        ```
        
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
        
        ```tsx
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
        
        function App() {
          return (
            <QueryClientProvider client={queryClient}>
              {/* The rest of your application */}
              {import.meta.env.DEV&&<ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
          )
        }
        
        // 개발환경일때만 Devtools가 보이게 세팅하기 위해 import.meta.env.DEV를 추가하였다.
        ```

- `useCustomFetch` 커스텀 훅과 비교했을 때  `useQuery`는 어떤 장점이 있나요? 🍠
    - 자동캐싱 및 동기화: 동일한 쿼리 키로 요청 시 자동으로 데이터 캐싱, 여러 컴포넌트에서 데이터가 동기화된다.
    - 상태 관리 자동화: `data`, `isLoading`, `isError` 상태를 별도 코드 없이 자동으로 관리한다.
    - 자동 리페치 및 다양한 옵션: 데이터 신선도와 업데이트 주기를 세밀하게 제어 가능하다.
    - 중복 요청 방지 및 성능 최적화: 동일 요청이 중복되면 자동으로 합쳐서 처리하고, 불필요한 네트워크 트래픽을 줄인다.
    - 간결한 코드: useEffect, useState, try-catch 등 별도 상태 관리 코드 없이 간단하게 비동기 데이터를 사용할 수 있다.
    
    | **항목** | **useCustomFetch(커스텀 훅)** | **useQuery (React Query)** |
    | --- | --- | --- |
    | 재사용성 | O | O |
    | 커스터마이즈 자유도 | 매우 높음 | 옵션 내에서 가능 |
    | 자동 캐싱 | 직접 구현 필요 | O |
    | 데이터 동기화 | 직접 구현 필요 | O |
    | 상태 관리 | 직접 구현 필요 | O (isLoading, isError 등) |
    | 자동 리페치/폴링 | 직접 구현 필요 | O (옵션으로 간단 설정) |
    | 중복 요청 방지 | 직접 구현 필요 | O |
    | 코드 간결성 | 상황에 따라 다름 | O |
    | 러닝커브 | 낮음 | 낮음(React Hook과 유사) |
    | 유지보수 | 훅 설계에 따라 다름 | O (표준화된 방식) |
    
    `useCustomFetch`: 작고 단순한 프로젝트, 아주 특수한 데이터 패핑 로직이 필요한 경우 유리
    
    `useQuery`: 중대형 프로젝트, 데이터 패칭, 캐싱, 동기화, 상태 관리 등 서버 상태 관리가 복잡한 경우 유리


- `gcTime`과 `staleTime`의 차이점에 대해 정리해보세요! 🍠
    
    ### `gcTime` vs `staleTime`
    
    <aside>
    ❓
    
    **gcTime**과 **staleTime**의 개념을 다시 정리해주시고, 두 값을 어떤 식으로 설정하면 캐싱 전략에 유리한지 설명해주세요!
    
    </aside>
    
    - `gcTime`은 무엇인가요? 🍠
        
        *gc: Garbage Collection,*
        
        캐시 데이터가 메모리에 유지되는 시간 (초기값 5분)
        
        5분동안은 동일한 쿼리에 대해서 캐시를 사용한다.
        
        ```tsx
        const { data } = useQuery({
          queryKey: ['users'],
          queryFn: fetchUsers,
          gcTime: 10 * 60 * 1000 // 10분 후 캐시에서 제거
        })
        ```
        
        창고 관리자가 사용하지 않는 상품을 얼마나 오랫동안 보관할지 결정하는 것과 비슷히다. 
        
        특정 상품(데이터)를 더 이상 사용하지 않으면 일정 시간 후 완전히 제거한다.
        
    - `staleTime`은 무엇인가요? 🍠
        
        *stale: 오래되거나 신선하지 않은,*
        
        받아온 데이터가 stale하다(오래되었다)고 표시될 때까지 걸리는 시간. 
        
        즉, 캐시 데이터가 신선한 상태(fresh)라고 간주되는 시간. (초기값 0)
        
        ```tsx
        const { data } = useQuery({
          queryKey: ['products'],
          queryFn: fetchProducts,
          staleTime: 5 * 60 * 1000 // 5분 동안 데이터 신선
        })
        ```
        
        staleTime은 마치 **"**이 우유는 2시간 동안은 완전히 신선해**!"**라고 말하는 것과 같아요. 
        
        2시간 동안은 같은 우유를 다시 사러 갈 필요가 없죠.
        
    - 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠
        
        `gcTime` > `staleTime` 권장, 캐시 데이터가 삭제되기 전에 백그라운드 리페치 가능
        
        1. 변하지 않는 데이터 (사용자 프로필, 카테고리 목록 등)
            
            `staleTime`: 길게 (ex. 10분~1시간), 불필요한 네트워크 호출 감소 
            
        2. 자주 변하는 데이터 (실시간 주식 정보, 채팅 메세지 등)
            
            `staleTime`: 아주 짧게 (ex. 0 or 아주 작은 값), 즉시 리페치


- **`오프셋 기반 페이지네이션`**과 **`커서 기반 페이지네이션`**에 대해 정리해보세요! 🍠
    
    페이지네이션: ‘특정한 정렬기준 + 필요한 개수’ 의 조건에 맞춰 데이터를 가져오는 것
    
    웹 페이지 로드 시, 모든 데이터를 다 불러와서 처리 → 성능이 저하되는 것을 방지
    
    - `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`) 🍠
        - `오프셋 기반 페이지네이션`은 무엇인가요? 🍠
            
            **offset**(건너뛸 데이터 수)과 **limit**(가져올 데이터 수) 값을 쿼리로 전달해 원하는 구간의 데이터를 가져오는 방식.
            
            우리가 원하는 데이터가 ‘몇 번째 페이지(offset)’에 있다는 데에 초점을 맞춤.
            
            ```sql
            SELECT * FROM table ORDER BY timestamp OFFSET 0 LIMIT 3
            SELECT * FROM table ORDER BY timestamp OFFSET 3 LIMIT 3
            SELECT * FROM table ORDER BY timestamp OFFSET 6 LIMIT 3
            SELECT * FROM table ORDER BY timestamp OFFSET 9 LIMIT 3
            ```
            
            ![image.png](attachment:a006a585-053c-457f-9ba4-f5d21404cb74:image.png)
            
            페이지 버튼과 함께 쓰이며 버튼을 클릭함으로써 페이지를 휙휙 넘길 수 있다.
            
            ![image.png](attachment:753e0bc5-82c9-4952-92db-06cf655fc09e:image.png)
            
        - `오프셋 기반 페이지네이션`의 장점? 🍠
            - 직관적이고 구현하기 편하다.
            - 유저가 특정 페이지를 선택하고, 이동할 수 있다.
            - 전체 페이지의 갯수를 알 수 있다.
            
        - `오프셋 기반 페이지네이션`의 단점? 🍠
            - 신규 데이터가 삽입될 시, 중복 데이터 발생
            - 데이터 삭제 시, 데이터 누락 발생
            - 데이터를 offset만큼 읽는데, offset이 많아질수록 성능이 느려진다.
            
    - `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`) 🍠
        - `커서 기반 페이지네이션`은 무엇인가요? 🍠
            
            offset 대신 **cursor**를 사용하여 가장 최근에 가져온 데이터를 기준으로 다음 데이터를 가져오는 방식. 
            
            우리가 원하는 데이터가 ‘어떤 데이터의 다음’에 있다는 데에 초점을 맞춤.
            
            ```sql
            SELECT * FROM post order by updatedAt desc, id desc limit 3;
            ```
            
            ![image.png](attachment:d53a1df9-d8fa-4139-8986-f1d99d478a49:image.png)
            
            무한 스크롤, 실시간 피드 등에서 많이 사용된다. 사용자의 체류 시간이 중요한 UI, 특히 모바일에서는  대부분 커서 기반 페이지네이션으로 동작한다.
            
        - `커서 기반 페이지네이션`의 장점 🍠
            - 데이터가 추가/삭제 되어도 중복이나 누락 없이 안정적으로 데이터를 이어받을 수 있다. 실시간성이 중요한 환경에서 데이터 불일치 문제가 적다.
            - 데이터가 많아져도(페이지가 깊어져도) 일정한 속도로 데이터를 조회할 수 있다. 성능 유지
        - `커서 기반 페이지네이션`의 단점 🍠
            - 구현이 복잡
            - ‘5페이지로 바로 이동’ 같은 페이지 단위 이동이 어렵고, 전체 데이터 수나 페이지 수를 알기 어렵다.
    
    https://nx006.tistory.com/58
    
    https://0soo.tistory.com/130


- `Skeleton UI`는 무엇인가요? 🍠
    - Skeleton UI는 무엇인가요? 🍠
        
        실제 데이터가 렌더링 되기 전에 보이게 될 화면의 윤곽을 먼저 그려주는 로딩 애니메이션.
        
        어떤 것들이 보여질 것인지 미리 알려주는 효과를 갖고, 기존 spinner에 비해 훨씬 사용자 친화적이며 사용자 이탈을 막는다. 
        
        ![image.png](attachment:287466e3-4c4a-484e-88fe-53830182a839:image.png)
        
    - Skeleton UI를 활용했을 때 장점에 대해 정리해주세요 🍠
        - **사용자 경험(UX) 개선**: 로딩 스피너나 빈 화면 대신 실제 콘텐츠의 형태를 미리 보여주기 때문에, 사용자는 어떤 정보가 곧 나타날지 예측할 수 있어 불안감과 이탈률이 줄어든다.
        - **체감 로딩 시간 단축**: 실제 데이터가 로드되는 동안 자리표시자가 보여지므로, 사용자는 로딩이 더 짧게 느껴진다.
        - **화면 전환의 자연스러움**: 데이터가 준비되면 Skeleton UI가 실제 콘텐츠로 자연스럽게 대체되어, 갑작스러운 UI 변화 없이 부드럽게 전환된다.
        - **시각적 일관성 유지**: 콘텐츠가 늦게 로드되는 상황에서도 전체 레이아웃이 유지되어, 화면이 비어 보이거나 깨지는 느낌을 방지할 수 있다.
        - **기다림의 인지적 부담 감소**: 사용자는 단순히 기다리는 것이 아니라, 진행 중임을 인지하며 심리적으로 덜 지루함을 느낀다.