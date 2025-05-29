- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
    - **`Debounce`** 개념 정리 🍠
        
        연이어 호출되는 함수들 중 마지막 함수 (또는 제일 처음)만 호출하도록 하는 것.
        
        이벤트를 그룹화하여 특정시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술이다. 즉, 순차적 호출을 하나의 그룹으로 “그룹화”할 수 있다.
        
    - **`Debounce`** 코드 작성 🍠
        
        ```jsx
        npm install debounce
        ```
        
        ```jsx
        // debounce 모듈 가져오기
        const debounce = require('debounce');
        
        // 입력 값이 변경될 때 호출되는 함수
        function handleInputChange(event) {
          console.log('Input value:', event.target.value);
        }
        
        // 300ms 지연된 debounce 함수
        const debouncedHandleInputChange = debounce(handleInputChange, 300);
        
        // HTML 문서에서 input 요소 찾기
        const inputElement = document.getElementById('myInput');
        
        // 'input' 이벤트가 발생할 때마다 debouncedHandleInputChange 함수를 호출
        inputElement.addEventListener('input', debouncedHandleInputChange);
        ```
        
- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
    - **`Throttling`** 개념 정리 🍠
        
        마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것.
        
        이벤트를 일정 주기마다 발행하도록 하는 기술이다. 
        ex) throttle 설정시간을 1ms로 주게되면 해당 이벤트는 1ms 동안 최대 한 번만 발생하게 된다. 
        
    - **`Throttling`** 코드 작성 🍠
        
        ```jsx
        npm i lodash.throttle
        ```
        
        ```jsx
        // lodash의 throttle 함수 가져오기
        const _ = require('lodash');
        
        // 윈도우 리사이즈 이벤트 제어 함수
        const throttledResize = _.throttle(function() {
            console.log('윈도우 크기 변경 이벤트 발생!');
        }, 500);
        
        // 윈도우 리사이즈 이벤트에 throttledResize 함수를 추가
        window.addEventListener('resize', throttledResize);
        
        // 마우스 이동 이벤트 제어 함수
        const throttledMouseMove = _.throttle(function(event) {
            console.log(`마우스 위치: ${event.clientX}, ${event.clientY}`);
        }, 200);
        
        // 마우스 이동 이벤트에 throttledMouseMove 함수를 추가
        window.addEventListener('mousemove', throttledMouseMove);
        ```