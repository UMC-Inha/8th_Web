- 🍠 `fetch` vs `axios`의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!
    - `fetch` ?
        
        Fetch API는 웹 브라우저에서 기본적으로 제공하는 내장 HTTP 클라이언트 API이다.
        
        - 별도의 라이브러리 설치 없이 사용 가능
        - 비동기 처리를 위해 Promise를 사용함
        - 응답 데이터를 스트림 형태로 받을 수 있음
        - 응답 객체에서 response.json()을 직접 호출해 json으로 변환해야함
        - 추가기능(인터셉트, 타임아웃, 요청 취소 등)은 기본적으로 지원하지 않고 별도로 구현해야함!
        
        ```tsx
        // 사용 예시
        fetch("https://api.example.com/data")
          .then((response) => {
            if (!response.ok) {
              throw new Error("네트워크 응답에 문제가 있습니다.");
            }
            return response.json();
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("Fetch Error:", error));
        ```
        
    - `axios` ?
        
        **Axios**는 HTTP 요청을 더 쉽게 다룰 수 있도록 도와주는 JavaScript 라이브러리다.
        
        - 응답 데이터를 자동으로 JSON 형태로 파싱
        - 기본 URL, 헤더, 타임아웃 등 공통 설정을 인스턴스로 관리 가능
        - 요청 및 응답 인터셉터 지원
        - CancelToken을 통해 요청을 취소 가능
        
        ```tsx
        // 사용 예시
        import axios from "axios";
        
        axios
          .get("https://api.example.com/data")
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Axios Error:", error);
          });
        ```
        
    - `fetch`와 `axios`의 차이
        1. 내장 vs 외부 라이브러리
        2. 응답 데이터 처리 방식(json 파싱 유무)
        3. 에러 처리 방식
        : Fetch는 네트워크 오류 발생 시에만 Promise를 reject, HTTP 오류(404, 500 등)는 정상 응답으로 취급하므로, 직접 응답의 ok 속성을 확인함. 반면 Axios는 HTTP 오류 응답도 에러로 처리하므로, catch 블록에서 HTTP 에러를 쉽게 핸들링 가능
        4. 추가 기능 지원
        : Axios는 요청/응답 인터셉터, 요청 취소, 타임아웃 설정 등 다양한 기능을 기본적으로 제공하지만 Fetch는 지원 x