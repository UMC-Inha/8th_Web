# 📦 Tanstack Query 활용 정리

## ✅ Tanstack Query Devtools란?

`Tanstack Query Devtools`는 React Query의 동작을 시각적으로 확인하고 디버깅할 수 있도록 도와주는 도구입니다.  
쿼리와 뮤테이션의 상태, 캐시, 리트라이 등 다양한 정보를 실시간으로 확인할 수 있어 개발 생산성을 높여줍니다.

### 🔧 Devtools 설치 및 설정 방법

1. 패키지 설치

```bash
pnpm add @tanstack/react-query-devtools
```

2. 최상위 컴포넌트에서 사용

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
```

3. 개발 환경에서만 표시

```tsx
{
  process.env.NODE_ENV === "development" && (
    <ReactQueryDevtools initialIsOpen={false} />
  );
}
```

---

## ✅ useQuery vs useCustomFetch 비교

| 기능            | useCustomFetch (직접 구현) | useQuery (Tanstack Query)         |
| --------------- | -------------------------- | --------------------------------- |
| 데이터 가져오기 | 가능                       | 가능                              |
| 로딩 상태 관리  | 수동 구현 필요             | isLoading 자동 제공               |
| 에러 핸들링     | try/catch 수동 구현        | isError, onError 자동 제공        |
| 데이터 캐싱     | 없음                       | 동일 요청에 대해 캐시 재사용      |
| 자동 재요청     | 없음                       | 포커스 변경 시 자동 refetch       |
| 조건부 요청     | 조건문 수동 구현           | enabled 옵션으로 간편 처리        |
| Devtools 시각화 | 없음                       | 가능                              |
| 중복 요청 방지  | 직접 처리                  | queryKey 기반 자동 중복 방지      |
| 복수 요청 처리  | 복잡한 중첩 필요           | useQueries, useInfiniteQuery 지원 |
| 상태 동기화     | 수동 갱신 필요             | invalidateQueries 등으로 자동화   |

---

## ✅ gcTime vs staleTime

### 🔸 gcTime

- **설명**: 사용되지 않는(inactive) 쿼리 데이터가 메모리에서 제거되기까지의 시간 (ms)
- **용도**: 메모리 낭비 방지, 캐시 자동 정리
- **캐시 유용하게 사용하려면?**
  - 짧은 체류 예상 시 → 짧게 설정
  - 재방문 고려 시 → 길게 설정

### 🔸 staleTime

- **설명**: 데이터가 신선(fresh)하다고 간주되는 시간 (ms)

  = staleTime 동안에는 자동 refetch가 발생하지 않음

- **캐시 유용하게 사용하려면?**
  - 자주 바뀌는 데이터 → 짧게 설정
  - 거의 안 바뀌는 데이터 → 길게 또는 Infinity 설정

---

## ✅ 페이지네이션 전략

### 🔹 오프셋 기반 페이지네이션 (offset-based pagination)

- **개념**: 특정 위치(offset)부터 일정 개수(limit)의 데이터를 조회하는 방식
- **장점**
  - 이해하기 쉬움 (page=1, 2...)
  - 특정 페이지로 이동 가능
- **단점**
  - OFFSET이 클수록 성능 저하
  - 데이터 삽입/삭제 시 중복·누락 발생
  - 무한 스크롤에 비효율적

### 🔹 커서 기반 페이지네이션 (cursor-based pagination)

- **개념**: 이전 데이터의 특정 필드 값(cursor)을 기준으로 다음 페이지를 조회
- **장점**
  - 데이터 일관성 높음 (삽입/삭제에도 안정적)
  - 무한 스크롤에 최적
- **단점**
  - 특정 페이지로 이동 불가
  - 커서 값 관리 필요
  - 구현 복잡도 높음

---

## ✅ Skeleton UI란?

### 🔸 정의

- 데이터를 불러오는 동안 화면에 표시되는 **로딩용 플레이스홀더 UI**

### 🔸 장점

1. **체감 로딩 시간 감소**: 스피너보다 빠른 응답 느낌 제공
2. **콘텐츠 구조 예측 가능**: 콘텐츠가 어떤 형태로 나올지 미리 알 수 있음
3. **시각적 일관성 유지**: 로딩 중 레이아웃 깨짐 방지
4. **로딩 불쾌감 완화**: 흰 화면/스피너보다 사용자 친화적
5. **컴포넌트화 및 재사용 용이**: CardSkeleton, TextSkeleton 등으로 분리하여 사용 가능

---
