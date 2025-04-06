- 위의 영상을 보고 학습한 내용을 정리해주세요!
    
    기본적으로 콘솔과 화면에서 보여지는 것이 비동기로 처리됩니다. 즉, 아래와 같은 코드에서
    
    ```jsx
    import { useState } from "react";
    
    const UseEffectPage = () => {
        const [count, setCount] = useState(0);
    
        const handleIncrease = () => {
            setCount((prev : number) => prev + 1);
            
            console.log(count);
        }
        
        return (
            <div>
                UseEffectPage
                <h3> {count} </h3>
                <button onClick = {handleIncrease}> 증가 </button>
            </div>
        )
    }
    
    export default UseEffectPage
    ```
    
    콘솔을 출력해 보면 사진처럼 화면에 증가하는 숫자와 콘솔에 출력되는 숫자가 다름을 확인할 수 있습니다.
    
    ![콘솔비동기.png]
    
    그런데 만약 사용자가 화면에 출력되는 것과 콘솔에 출력되는 내용을 동기화 시키고 싶다면 useEffect 를 사용할 수 있습니다. 
    
    ```jsx
    //useEffect 의 기본적인 형태
    useEffect(() => {(실행하고 싶은 코드 내용)}, [**dependency array**]); 
    
    //dependency array (의존성 배열) 의 부분이 가장 중요하다!
    ```
    
    이때, 실행하고 싶은 코드에 console.log(count); 를 입력한다면 아래처럼 콘솔에 0 이 두 번 출력되고 증가 버튼을 눌렀음에도 화면에 나타나는 count 는 증가하지만 콘솔에는 아무것도 찍히지 않습니다.
    
    ![콘솔 두 번 출력.png](attachment:a6863d5f-bba5-4e42-bd88-02ba06df95bc:스크린샷_2025-04-02_오후_8.14.17.png)
    
    ![콘솔에 아무것도 안 찍힘.png](attachment:23cb352e-dcb2-46fd-9eec-c6915da871fb:스크린샷_2025-04-02_오후_8.15.39.png)
    
    - 두 번 0 이 출력되는 이유
        
        : React 가 18 버전부터 <StrictMode> 를 지원하면서 이로 인해 개발환경에서 useEffect 가 두 번 calling 됩니다.
        
    
    - **dependency array (의존성 배열)**
        
        : 위의 예제에 따라, count 가 변화함에 따라서 useEffect 부수효과를 실행시켜 주고 싶을 때 배열에 count 를 넣어줌으로써 바로바로 찍히게 합니다. 
        
        >> 화면이 업데이트 된 이후에 setState 로 업데이트 된 값을 useEffect 는 return 문을 반환한 이후에 실행합니다. (항상 최신값을 나타낸다.)
        
    
    처음 새로고침을 눌러 화면이 처음 mount 되었을 때, 부수효과가 1번 발생합니다. 즉, useState 를 통해 초기값을 얻어오고, useEffect 가 있다는 것을 React 에게 알려줍니다. 그 후, JSX 컴포넌트가 반환이 되고, count 도 먼저 인식되므로 콘솔에 한 번 찍힙니다. 그 이후에 console.log(count) 가 실행됩니다.
    
    ```jsx
    import { useState } from "react";
    
    const UseEffectPage = () => {
        const [count, setCount] = useState(0);
    
    const handleIncrease = () => {
        setCount((prev : number) => prev + 1);
        
        // **(optional) return function();**
        // **cleanup function**
        // 컴포넌트가 unmount 될 때, update 되기 전 cleanup function 을 적어줘야 합니다.
        
        console.log(count);
    }
    
    ```
    
    cleanup function 을 사용해 주면, 언마운트 될 때 콘솔의 상태를 한 번 청소해 줌으로써, 재시작했을 때에 같은 상태를 유지할 수 있습니다.
    
    - useEffect 에서 절대 하면 안 되는 규칙 : 상태를 업데이트 시키는 코드가 있으면 안 됩니다.
    
    ```jsx
    import { useEffect, useState } from "react";
    
    export default function UseEffectError() {
        const [counter, setCounter] = useState(0);
    
        const handleIncrease = () => {
            setCounter (counter => counter + 1);
        }
    
        return (
            <div onClick = {() => setCounter(counter + 1)}> 
                {counter}
            </div>
        )
    }
    ```
    
    위 코드처럼 handleIncrease 함수를 통해서 카운터의 상태를 변화시킬 경우 아무런 문제가 없이 정상 작동 되지만, 아래처럼 useEffect 를 통해서 상태를 업데이트 할 경우, 숫자가 무한히 증가함을 볼 수 있습니다.
    
    ```jsx
    // 올바르지 않은 형태
    import { useEffect, useState } from "react";
    
    export default function UseEffectError() {
        const [counter, setCounter] = useState(0);
    
        useEffect(() => {
            setCounter (counter => counter + 1);
        })
    
        return (
            <div onClick = {() => setCounter(counter + 1)}> 
                {counter}
            </div>
        )
    }
    ```
    
    [화면 기록 2025-04-03 오전 6.25.51.mov](attachment:b254a225-e407-4145-86f8-fdcfd2420044:화면_기록_2025-04-03_오전_6.25.51.mov)
    
    콘솔에 아래와 같은 에러가 뜨는 것을 확인할 수 있습니다.
    
    useEffect 내에서 setState 함수를 dependency array 없이 호출할 경우 업데이트의 최대 depth 가 초과했다는 것을 알 수 있습니다. 즉 매번 렌더링이 일어납니다.
    
    ![에러 코드.png](attachment:b76386b2-9f69-4b01-bc01-94f149123767:스크린샷_2025-04-03_오전_6.27.04.png)
    
    만약 이때 dependency array 를 사용하여 useEffect 내부에 setState 함수를 호출한다면, 렌더링이 한 번만 일어나도록 함을 알 수 있습니다드
    
    >> 화면이 업데이트 될 때 딱 한 번 setCounter 를 통해 한 번만 업데이트 시켜준다는 것을 명시해 줍니다.
    
    여기서, dependency array 자리에 counter 를 써 줄 경우, 논리에 어긋나는 코드가 되므로 무한 렌더링이 발생합니다. 따라서 이 자리에 들어갈 코드를 잘 이해하는 것이 중요합니다.


- 🍠 `fetch` vs `axios`의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!
    - `fetch` ?
        
        fetch 는 네트워크 요청을 위해 fetch() 라는 메서드를 제공하는 인터페이스 입니다. 모던 브라우저에 내장되어 있기 때문에 따로 설치할 필요가 없습니다.
        
    - `axios` ?
        
        axios 는 브라우저와 node.js 를 위한 Promise API 를 활용하는 HTTP 비동기 통신 라이브러리입니다.
        
    - `fetch`와 `axios`의 차이
        
        **fetch 의 장점**
        
        1. 라이브러리의 import 가 필요하지 않습니다.
        2. React Native 의 경우 업데이트가 잦아 업데이트를 쫓아오지 못하는 경우가 생기나, fetch 는 이에 대한 걱정 없이 사용 가능합니다.
        3. Promise 기반입니다.
        
        **fetch 단점**
        
        1. Request Aborting 에 대해서 표준적인 방법을 제공해 주지 못합니다.
        2. response timeout API 가 제공되지 않아 네트워크 에러 발생 시 계속 기다려야 합니다.
        3. 지원하지 않는 브라우저가 있습니다.
        4. Error handling 에 관한 문제가 있습니다.
        5. promise 자체를 반환하여 json 으로 변환하여야 합니다.
        
        **axios 장점**
        
        1. 사용하기 편리합니다.
        2. fetch 에 존재하지 않는 기능이 더 많습니다.
        3.  Promise 기반입니다.
        4. json 을 자동으로 적용하여 response 객체를 바로 반환합니다.
        5. data 를 바로 전달합니다.
        
        간단한 https 요청에서는 fetch 를 사용하여도 괜찮으나, axios 와 단둘이 비교하였을 때, axios 의 장점이 더 많기 때문에 axios 를 사용하는 것이 좋을 것 같습니다