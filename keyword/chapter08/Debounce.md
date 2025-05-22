- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
  - **`Debounce`** 개념 정리 🍠
    이벤트가 연속적으로 발생할 때, 마지막 이벤트만 일정 시간이 지난 후 실행되도록 제어하는 방식
    사용 예시:
    - 검색창 자동완성
      - 사용자가 입력할 때 마다 api를 보내는 대신 일정 시간 동안 입력이 멈추면 마지막 입력에 대한 요청을 한 번만 보냄.
    - 리사이즈/스크롤 감지 최적화
    동작 방식:
    1. 사용자가 이벤트 발생
    2. 타이머 시작
    3. 그 전에 또 이벤트 발생하면 타이머 리셋
    4. 일정 시간 동안 이벤트가 안 오면 딱 한 번 함수 실행
  - **`Debounce`** 코드 작성 🍠
    ```jsx
    let alertTimer;
    function alertWhenTypingStops() {
      // 앞선 타이머를 리셋
      // 따라서 마지막 함수가 실행 (타이핑을 멈추고선 함수실행)
      if (alertTimer) {
        clearTimeout(alertTimer);
      }

      const name = nameElem.value;
      // 타이머 시작
      alertTimer = setTimeout(() => console.log(`입력된 이름: ${name}`), 1000);
    }

    const nameElem = document.getElementById("inputName");

    nameElem.addEventListener("input", alertWhenTypingStops);
    ```
