- `fetch` vs `axios`의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!
  - `fetch` ?
    정의: Promise 기반 JS 내장 라이브러리
    장점:
    - 자바스크립트 내장 라이브러리이므로 별도의 설치 필요 X
    - Promise API를 활용하기 때문에 다루기 편리
    - 내장 라이브러리이기 때문에 업데이트에 따른 오류 예방 가능
    단점:
    - 지원되지 않는 브라우저 존재
    - 네트워크 에러 발생 시 response timeout이 없어 하염없이 기다려야 함.
    - JSON 변환, 문자열 변환 과정 별도 필요
    - axios에 비해 비교적 기능 부족
    문법 구성:
    ```jsx
    const getData = async (e) => {
      const { data } = await fetch("API통신을 위한 url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //JSON변환
      body: JSON.stringify({
        id: "id",
        description: "description",
      })
    }).then((response) => console.log(response));
    ```
  - `axios` ?
    정의 : node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트
    장점:
    - 비교적 다양한 기능들 존재
    - Promise API를 활용하기 때문에 다루기 편리
    - 브라우저 호환성이 뛰어남.
    단점:
    - 별도의 라이브러리 설치 필요
      → npm install axios
    - 외부 라이브러리이므로 업데이트에 따라 불안정적일 수 있음.
    문법구성:
    ```jsx
    import axios from "axios";

    const getData = async (e) => {
      const { data } = await axios({
        method: "get,
        url: "API통신을 위한 url",
      }).then((response) => console.log(response));
    };
    ```
  - `fetch`와 `axios`의 차이
    1. Axios는 패키지 설치가 필요하지만 Fetch는 내장 라이브러리여서 별도의 설치 없이 이용 가능하다.
    2. Axios는 모던 브라우저에서 모두 지원하지만 Fetch는 IE의 경우 지원하지 않는 버전도 존재한다.
    3. Axios는 JSON 데이터 자동 변환을 지원하지만 Fetch는 지원하지 않는다.
