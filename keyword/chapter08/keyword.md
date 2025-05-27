- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
    - **`Debounce`** 개념 정리 🍠
        - 연속적으로 발생한 이벤트를 하나로 처리하는 방식
        - 주로 처음이나 마지막으로 실행된 함수만을 실행함
        - 성능상의 문제를 위해 사용
            
            (모든 함수를 실행하면 성능적으로 문제가 생길 수 있음)
            
    - **`Debounce`** 코드 작성 🍠
        
        ```jsx
        let alertTimer: ReturnType<typeof setTimeout> | undefined;
        
        const nameElem = document.getElementById('inputName') as HTMLInputElement | null;
        
        function alertWhenTypingStops() {
          if (!nameElem) return;
        
          // 이전 타이머 제거
          if (alertTimer) {
            clearTimeout(alertTimer);
          }
        
          const name = nameElem.value;
        
          // 새로운 타이머 설정
          alertTimer = setTimeout(() => {
            console.log(`입력된 이름: ${name}`);
          }, 1000);
        }
        
        if (nameElem) {
          nameElem.addEventListener("input", alertWhenTypingStops);
        }
        ```
        
- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
    - **`Throttling`** 개념 정리 🍠
        - 쓰로틀링은 출력을 조정한다는 의미로 이벤트를 일정주기마다 발생하도록 하는 기술
        - 일정 시간동안 단 한 번만 이벤트를 발생시킴
        - 연이어 발생한 이벤트에 대해, 일정한 delay를 포함시켜 연속적으로 발생한 이벤트는 무시하는 방식을 뜻
    - **`Throttling`** 코드 작성 🍠
    
    ```jsx
    let isInThrottle
    function increaseScoreDuringTyping() {
      if (isInThrottle) {
        return
      }
    
      isInThrottle = true
    
      // 타이머 세팅
      setTimeout(() => {
        const score = document.querySelector('#score')
        const newScore = parseInt(score.innerText) + 1
        score.innerText = newScore
    
        isInThrottle = false
      }, 500)
    }
    
    const nameElem = document.querySelector('#inputName')
    
    nameElem.addEventListener("input", increaseScoreDuringTyping)