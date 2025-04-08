## 🍠 fetch vs axios의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!

클라이언트와 서버 간의 데이터를 주고받기 위해 비동기 HTTP 통신을 하기위한 문법

- `fetch` ?
    
    Promise 기반 JavaScript 내장 라이브러리.
    
    ```tsx
    /* app.ts :: fetch를 사용할 파일*/
    const getData = async (e) => { 
      const { data } = await fetch("API통신을 위한 url", { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
      },
      // axios와 달리 JSON 변환과정 필요
      body: JSON.stringify({ 
        id: "id", 
        description: "description", 
      }), 
    }).then((response) => console.log(response));
    ```
    
    장점:
    
    - 내장 라이브러리로 별도의 설치가 필요없음, 업데이트에 따른 오류예방 가능
    - Promise API를 활용하기 때문에 다루기 편리
    
    단점:
    
    - 지원되지 않는 브라우저가 있음 (IE11)
    - 네트워크 에러가 발생하면 response timeout이 없어 계속 기다려야 함
    - JSON 변환, 문자열 변환 과정이 별도로 필요
    - `axios`에 비해 비교적 기능 부족
- `axios` ?
    
    Node.js와 Promise API를 활용하는 HTTP 통신 외부 라이브러리. 비동기로 HTTP 통신을 할 수 있고, return을 promise 객체로 하기 때문에 response 데이터를 다루기 쉽다.
    
    ```tsx
    /* app.ts :: axios를 사용할 파일*/
    import axios from "axios";
    
    const getData = async (e) => { 
      const { data } = await axios({ 
        method: "get, 
        url: "API통신을 위한 url", 
      }).then((response) => console.log(response)); 
    };
    ```
    
    장점:
    
    - 비교적 다양한 기능: JSON 자동변환, 자동 문자열 변환, CSRF 보호 등 fetch에 없는 기능들
    - Promise API를 활용하기 때문에 다루기 편리
    - 브라우저 호환성이 뛰어남
    
    단점:
    
    - 별도의 라이브러리 설치 필요: `npm install axios`
    - 외부 라이브러리여서 업데이트에 따리 불안정할 수도 있음
- `fetch`와 `axios`의 차이
    
    
    |  | fetch | axios |
    | --- | --- | --- |
    | **설치 필요 여부** | ❌ (기본 내장) | ✅ (`npm install axios`) |
    | **JSON 변환** | `response.json()` 필요 | `response.data` 바로 사용 가능 |
    | **에러 처리** | HTTP 오류(404, 500)는 `catch`에서 안 잡힘 | 모든 에러를 `catch`에서 잡을 수 있음 |
    | **요청 취소** | ❌ 지원 안 함 | ✅ `CancelToken` 사용 가능 |
    | **타임아웃 설정** | ❌ 직접 구현해야 함 | ✅ `timeout` 옵션 제공 |
    | **요청/응답 인터셉터** | ❌ 없음 | ✅ `axios.interceptors` 사용 가능 |