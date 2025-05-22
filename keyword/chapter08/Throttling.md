- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  - **`Throttling`** 개념 정리 🍠
    일정 간격으로만 함수가 실행되도록 제한하는 방식
    ⇒ 이벤트가 아무리 자주 발생해도, 지정된 간격마다 한 번만 실행
    사용 예시:
    - 무한 스크롤 이벤트
      - 모든 스크롤을 기록하면 성능 문제가 생김.
        ⇒ 특정 시간마다의 스크롤의 위치를 찍어줌.
    - 윈도우 리사이즈 감지
    - 마우스 이동 추적
      동작 방식:
    1. 이벤트 발생 → 타이머가 없으면 실행+타이머 시작
    2. 타이머 도는 동안 이벤트 무시
    3. 타이머 종료 후 다시 실행 가능
  - **`Throttling`** 코드 작성 🍠

    ```jsx
    let isInThrottle;
    function increaseScoreDuringTyping() {
      if (isInThrottle) {
        return;
      }

      isInThrottle = true;

      // 타이머 세팅
      setTimeout(() => {
        const score = document.querySelector("#score");
        const newScore = parseInt(score.innerText) + 1;
        score.innerText = newScore;

        isInThrottle = false;
      }, 500);
    }

    const nameElem = document.querySelector("#inputName");

    nameElem.addEventListener("input", increaseScoreDuringTyping);
    ```
