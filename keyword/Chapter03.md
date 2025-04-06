


- 위의 영상을 보고 학습한 내용을 정리해주세요!
    
    useEffect는 setState로 업데이트 된 값을 반환한 이후에 실행됨. 따라서 최신값으로 실행됨. 
    
    useEffect의 return function 
    
    useEffect를 사용할 때 뭔가를 실행시키면 종료시켜줘야 하는 cleanup function.
    
    새롭게 mount를 하게 되었을 때 이전에 실행되고있던 상태가 지속됨. 
    
    이럴 때 useEffect의 cleanup function을 사용해야 함.
    
    위 영상에서는 useEffect를 사용하여 console에 카운터가 1초마다 증가하고 있는데, 다시 mount 했을 때 기존의 카운터가 중지되지 않고 두 카운터가 양립하는 상태가 발생하게 된다. 이 때 cleanup function을 사용하여 기존 카운터를 중지시킬 필요가 있다.
    
    export시에 default는 하나만 존재해야 한다.
    
    useEffect에서 하면 안되는 원칙 : 상태를 업데이트하는 코드를 집어넣으면 안된다.
    
    → 매번 렌더링이 일어남.
    
    위 영상에서 초기에 렌더링이 일어날 때 카운터를 ++ 해 준다.  그리고 동시에 카운터가 변경될 때 마다 재렌더링이 일어나게된다 → 이 과정이 무한히 반복된다.
    
    만약 카운터가 아닌 데이터 요청이라면 
    
    데이터 요청을 무한하게 반복하여 보내게 된다. → 큰 문제 발생





- 🍠 `fetch` vs `axios`의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!
    - `fetch` ?
        
        Fetch API는 HTTP 파이프라인을 구성하는 요청과 응답 등의 요소를 JavaScript에서 접근하고 조작할 수 있는 인터페이스를 제공합니다. Fetch API가 제공하는 전역 [`fetch()`](https://developer.mozilla.org/ko/docs/Web/API/Window/fetch) 메서드로 네트워크의 리소스를 쉽게 비동기적으로 취득할 수도 있습니다.쉽게 말해서, js에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있도록 해 주는 메서드이다.
        
        기본 구조 :
        
        ```jsx
        fetch(url)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
        ```
        
        기본 구조와 동작은 promise 객체와 동일하다.
        
        파라미터로 요청을 보낼 url을 입력해주고 응답을 받아서 추가적인 작업을 해줄 수 있다.
        
        then에서 응답 객체 res를 바고, catch에서 에러 요청이 발생했을 때, 에러를 받는다.
        
        - 프로미스 객체란?
            
            → js에서 비동기 작업을 처리하기 위한 객체이다. 
            
            쉽게 말해서, 나중에 결과가 온다는 약속을 나타내는 객체이다.
            
            프로미스 객체는 총 세 가지 상태를 가지는데,
            
            1. pending : 아직 결과가 안 나온 상태.
            2. fullfilled : 작업이 성공적으로 끝난 상태.
            3.  rejected : 작업이 실패한 상태.
            
            프로미스 객체는 서버에서 데이터를 가져올 때, 시간이 걸리는 작업을 기다릴 때 사용한다.
            
        
        fetch 파라미터로 직접 입력하기도 하지만 주로 **객체 변수에 저장해서 대입하는 방식으로도 사용**한다.
        
        ```jsx
        let obj = {
            method: 'post',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'foo=bar&lorem=ipsum'
        }
        fetch(url, obj)
        .then(...)
        ```
        
        ### **POST 요청 보내고 응답받기**
        
        ```jsx
        fetch(url, {
          method: 'POST',
          body: JSON.stringify({ name: "hello!" })
        })
        .then(res => {
        if (res.status === 200) {
            res.text().then(text => console.log(text)
          }
        else {
            console.log(res.statusText)
          }
        })
        .catch(err => console.log(err))
        ```
        
        POST로 body안에 데이터를 넣고, 요청을 보내주면 응답 객체 res를 받게 되는데 res 안에는 응답에 관한 정보가 존재한다.
        
        status는 요청이 성공인지 실패인지를 판별할 수 있게 해주는 요소이다.
        
        또 응답에 대한 내용은 res.text()를 통해 확인할 수 있다.
        
        text() 외에도 arrayBuffer, blob, json, formData 등의 메서드를 사용하여 값을 볼 수도 있다.
        
        GET, PUT, DELETE 요청도 같은 방식으로 보낼 수 있다.
        
        단, GET, DELETE 요청은 url 파라미터 하나만 입력하여 사용한다.
        
        요청정보 파라미터 
        
        ```jsx
        fetch(url, {
           method: 'post',
           headers: {
             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
           },
           body: 'foo=bar&lorem=ipsum'
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
        ```
        
        fetch의 두 번째 파라미터로, 요청에 대한 추가적인 데이터를 입력할 수 있다.
        
        **method** **:** HTTP method와 동일하며 요청 방식을 나타낸다. (GET, POST, PUT, DELETE 등)
        
        **headers** **:** 요청 헤더에 대한 정보를 나타낸다.
        
        **body :** 요청을 보내는 데이터를 나타낸다. 여러 가지 자료형을 대입할 수 있다.
        
    - `axios` ?
        
        axios는 브라우저와  Node.js를 위한 Promis API를 활용하는 HTTP 비동기 통신 라이브러리이다. 쉽게 말해서 백엔드와 프론트엔드 통신을 쉽게 하기 위해 사용하는 라이브러리.
        
        ## axios 특징
        
        - 운영 환경에 따라 브라우저의 XMLHttpRequest 객체 또는 Node.js의 HTTP API 사용
        - Promise(ES6) API 사용
        - 요청과 응답 데이터의 변형
        - HTTP 요청 취소 및 요청과 응답을 JSON 형태로 자동 변경
        
        ## HTTP Methods
        
        **클라이언트가 웹서버에게 사용자 요청의 목적/종류를 알리는 수단**
        
        가장 많이 사용되는 메소드를 정리:
        
        ### 1. GET
        
        > GET : 입력한 url에 존재하는 자원에 요청함.
        > 
        
        ### 문법
        
        ```jsx
        axios.get(url,[,config])
        ```
        
        **GET은 서버에서 어떤 데이터를 가져와서 보여준다거나 하는 용도임.**
        
        주소에 있는 쿼리스트링을 활용해서 정보를 전달하는 것이지 **GET메서드는 값이나 상태등을 바꿀 수 없음.**
        
        ```jsx
        import axios from 'axios';
        
        axios.get('https://localgost:3000/sewon/user')
          .then((Response)=>{console.log(Response.data)})
          .catch((Error)=>{console.log(Error)})
        ```
        
        ```
        [
          { id: 1, pw: '1234', name: 'sewon' },
          { id: 2, pw: '1234', name: 'hongil' },
          { id: 3, pw: '1234', name: 'daeyeon' }
        ]
        
        ```
        
        응답은 `json` 형태로 넘어옴.
        
        ### 2. POST
        
        > POST : 새로운 리소스를 생성(create)할 때 사용.
        > 
        
        ### 문법
        
        ```jsx
        axios.post("url주소",{
          data객체
            },[,config])
        ```
        
        **POST 메서드의 두 번째 인자는 본문으로 보낼 데이터를 설정한 객체 리터럴을 전달함.**
        
        로그인, 회원가입 등 사용자가 생성한 파일을 서버에다가 업로드할때 사용.
        
        **Post를 사용하면 주소창에 쿼리스트링이 남지 않기때문에 GET보다 안전함.**
        
        ```jsx
        axios.post( 'url',
          {
           contact: 'Sewon',
           email: 'sewon@gmail.com'
           },
          {
           headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
              }
            }
        )
          .then((response) => { console.log(response.data); })
          .catch((response) => { console.log('Error!) });
        
        ```
        
        ### 3. Delete
        
        > REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 삭제하는 목적으로 사용.
        > 
        
        ### 문법
        
        ```jsx
        axios.delete(url,[,config]);
        ```
        
        Delete 메서드는 HTML Form 태그에서 기본적으로 지원하는 HTTP 메서드가 아님.
        
        Delete 메서드는 서버에 있는 데이터베이스의 내용을 삭제하는 것을 주 목적으로 하기에 두 번째 인자를 아예 전달하지 않음.
        
        ```jsx
        axios.delete("/thisisExample/list/30").then(function(response){
            console.log(response);
              }).catch(function(ex){
              throw new Error(ex)
        }
        ```
        
        ### 4. PUT
        
        > REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 갱신하는 목적으로 사용된다.
        > 
        
        ### 문법
        
        ```jsx
        axios.put(url[, data[, config]])
        ```
        
        PUT메서드는 HTML Form 태그에서 기본적으로 지원하는 HTTP 메서드가 아니다.
        
        PUT메서드는 서버에 있는 데이터베이스의 내용을 변경하는 것을 주 목적으로 함.

        
    - `fetch`와 `axios`의 차이
        
        ## **Axios**
        
        1. 사용하기 좀 더 편리하다. ->,  사용자가 인지하고 사용하기 쉽게 만든 것 같음.
        2. fetch 에는 존재하지 않는 기능이 좀 더 많음.
        3. Promise 기반임.
        4. axios는 json을 자동으로 적용해서 response 객체를 바로 반환함.
        5. data를 바로 전달함.
        6. 요청을 중도 Cancel, 응답시간 초과 설정 등의 기능이 있음..
        7. 400, 500대의 Error 발생시에 reject 로 response를 전달해 catch로 잡아낼 수 있음. (fetch의 경우 네트워크 장애나 요청이 완료되지 않은 경우에만 reject로 response를 전달하기 때문에, 400, 500대의 Error의 경우는 resolve로 받아 따로 예외처리를 해야 함.)
        8. 자신이 진행중인 프로젝트 상위에 import 시켜줘야 함.
            
            `import axios from 'axios'`
            
        
        ## Fetch
        
        1. 라이브러리를 import 하지 않아도 사용할 수 있음.
        2. React Native 의 경우에 업데이트가 잦기 때문에, 라이브러리(ex) axios..)가 이 업데이트를 쫓아오지 못하는 경우가 생기는데, Fetch 는 이걸 걱정할 필요 없이 사용 가능
        3. Promise 기반임.
        4. Request Aborting 에 대해서 표준적인 방법을 제공해 주지 못함.
        5. 네트워크 에러가 발생했을 때, 계속 기다려야 함.> response timeout API 제공이 안됨.
        6. 지원하지 않는 브라우저가 있음.
        7. Error handling 관련해서 문제가 있음.
            - axios 의 경우엔 .then(~~~)을 실행하지 않고, console 창에 해당 에러로그를 보여줌.
            - Catch 에 걸렸을 때, 이후 .then( ~~~ )을 실행함.
        8. fetch는 promise자체를 반환해서 json으로 변환을 해야함.
        9. fetch는 body로 json.stringify()를 통해서 서버가 이해할 수 있도록 문자열 파싱을 해야함.