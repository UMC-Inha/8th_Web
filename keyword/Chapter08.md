- **`Debounce`** 개념 정리 🍠
    
    Debounce는 유저가 입력할 때 마다 코드를 오직 한 번씩만 실행되도록 해주는 함수이다. 
    
    유저의 타이핑에 따라 검색 쿼리에 대한 제안 옵션을 보여주고 싶다고 하면, 매 입력마다 제안을 하는 경우에는 너무 자주 사용되기 때문에 성능적으로 불리하게 작용하는 측면이 있다. 따라서 이와같은 사용자의 의도와는 무관한 요청을 줄이기 위해 사용되는 것이 바로 Debounce라는 개념이다. 
    
    입력 주기를 설정해서 입력 주기가 끝남과 동시에 이벤트를 호출하는 방식으로 작동한다. 예를 들면 유저의 타이핑이 1초동안 중지되었을 때만 이벤트를 발생시킨다고 제한하면, 유저가 타이핑 중일 때는 이벤트가 발생하지 않으므로, 성능적으로 이득을 보게 된다. 
    
    Debounce는 키워드 검색, 자동완성 기능, 사용자 창 크기 조정 등의 이벤트에서 유용하게 사용된다. 
    
- **`Debounce`** 코드 작성 🍠
    
    ```tsx
    function debounce(func, timeout = 300){
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    }
    function saveInput(){
      console.log('Saving data');
    }
    const processChange = debounce(() => saveInput());
    ```
    
    debounce 함수
    
    ```tsx
    <input type="text" onkeyup="processChange()" />
    ```
    
    input 안에서의 사용
    
    ```tsx
    <button onclick="processChange()">Click me</button>
    ```
    
    버튼 안에서의 사용
    
    ```tsx
    window.addEventListener("scroll", processChange);
    ```
    
    윈도우 이벤트 스크롤에서의 사용



- **`Throttling`** 개념 정리 🍠
    
    throttle은 이벤트 핸들러가 일정 시간 간격으로 한 번만 실행되도록 제한하는 방법이다. 스크롤 이벤트나 마우스 이동 이벤트와 같이 빈번하게 발생하는 이벤트를 처리할 때 유용하다. throttle을 사용하면 이벤트 핸들러가 너무 자주 실행되는 것을 방지하고, 성능 이슈를 줄일 수 있다. 
    
- **`Throttling`** 코드 작성 🍠
    
    ```tsx
    const throttle = (callback, delay) => {
      let timer;
      return function () {
        if (!timer) {
          timer = setTimeout(_ => {
            callback.apply(this, arguments);
            timer = undefined;
          }, delay);
        }
      };
    };
    ```
    
    ```tsx
    <div>
      <input id="input" type="text">
      <p id="text"></p>
    </div>
    
    <script>
      const throttle = (callback, delay) => {
        let timer;
        return function () {
          if (!timer) {
            timer = setTimeout(_ => {
              callback.apply(this, arguments);
              timer = undefined;
            }, delay);
          }
        };
      };
    
      const action = function (e) {
        document.querySelector('#text').innerHTML = this.value;
      };
    
      document.querySelector('#input').addEventListener('keydown', throttle(action, 1000));
    </script>
    ```
    
    클로저를 이용하여 구현한 방식.
    
    callback은 이벤트가 발생했을 때 실행될 콜백함수이며, delay는 콜백 함수를 실행시킬 딜레이 시간이다. 반환할 함수 밖에 setTimeout을 사용하여 타이머로 사용할 변수 timer를 선언한다. 
    
    timer 변수가 undefined 상태라면 timer 변수에 setTimeout()을 사용하면서 설정하는 delay 시간 뒤에 내부 함수가 실행되도록 한다. 
    
    setTimeout() 내부에서는 실행될 콜백함수에 apply를 사용하여 this를 바인딩해주고 arguments를 함께 넘겨주는 것으로 콜백함수를 실행시켜 주고, timer를 undefined로 만든다.
    
    delay로 설정한 시간까지 timer 변수는 undefined 상태가 아닐 것이므로 만약 delay로 설정한 시간보다 빠른 시간에 같은 이벤트가 발생했을 때 if(!timer) 에서 걸러져 내부가 실행되지 않는 것으로 스로틀이 이루어진다.
