# Axios vs Fetch: HTTP 요청을 위한 라이브러리 비교

## 📘 개요

HTTP 요청을 처리하는 두 가지 주요 방법인 **Axios**와 **Fetch** 정리

---

## 1. **Axios란?**

**Axios**는 Promise 기반의 HTTP 비동기 통신 라이브러리로, 브라우저와 Node.js 환경에서 HTTP 요청을 보내고 응답을 처리할 수 있게 도와줍니다.

### ✅ **주요 특징**

- **Promise 기반**으로 비동기 통신을 처리
- **JSON 자동 변환** (응답을 자동으로 JSON으로 변환)
- **요청 취소** 및 **응답 시간 초과** 설정 가능
- **에러 처리**가 간단 (HTTP 오류에 대해 `reject` 처리)
- **HTTP 인터셉터 지원**: 요청 전/후 데이터 처리 가능
- 동시 요청 처리: 여러 요청을 동시에 보내고 결과를 결합할 수 있음.
  `axios.all` 및 `axios.spread`를 사용하여 하나의 응답으로 결합 가능

```javascript
axios
  .all([
    axios.get("https://api.example.com/endpoint1"),
    axios.get("https://api.example.com/endpoint2"),
  ])
  .then(
    axios.spread((response1, response2) => {
      console.log(response1.data);
      console.log(response2.data);
    })
  );
```

- 간편한 에러 처리: 400, 500대의 오류를 reject로 처리, catch에서 처리 가능

## 2. **Fetch란?**

**Fetch**는 네이티브 JavaScript API로 제공되는 HTTP 요청 메서드입니다. 별도의 라이브러리 없이 바로 사용할 수 있으며, 최신 브라우저에서 기본 지원됩니다.

### ✅ **주요 특징**

- **Promise 기반** 비동기 통신
- **JSON 변환**을 수동으로 해야 함
- 네이티브 API이므로 **별도의 라이브러리 설치 필요 없음: 브라우저에서 바로 지원**
- **시간 초과** 및 **요청 취소**는 `AbortController`로 처리해야 함
- 최신 브라우저에서 기본 제공: polyfill로 구형 브라우저에서도 사용 가능
- 커스터마이징이 용이 (요청과 응답에서 더 많은 제어 가능)

```javascript
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    key: "value",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // 응답 데이터
  })
  .catch((error) => {
    console.error("Error:", error); // 오류 처리
  });
```

## 3. 결론

- **Axios**는 강력한 기능(응답 시간 초과 설정, 요청 취소, HTTP 인터셉터 등)을 제공하며, 복잡한 요청 처리가 필요할 때 유용합니다. 또한, 자동으로 JSON 응답을 변환하고, 에러 처리도 간편하여 매우 편리하게 사용할 수 있습니다.
- **Fetch**는 네이티브 API로 설치가 필요 없고, 간단한 HTTP 요청을 수행할 때 유용합니다. 그러나 응답을 수동으로 처리해야 하고, 요청 취소 및 시간 초과 처리에 한계가 있어 복잡한 기능이 필요할 경우 **Axios**가 더 나은 선택일 수 있습니다.

따라서, 간단한 요청에는 **Fetch**를, 복잡한 기능이 필요한 요청에는 **Axios**를 사용하는 것이 좋습니다.
