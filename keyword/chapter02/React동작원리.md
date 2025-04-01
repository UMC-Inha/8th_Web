### React의 동작 원리

React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.

1. SPA (Single Page Application)

- 정리
  **SPA**: 페이지 전체가 아닌 바뀔 부분, 필요한 부분만 로딩하여 헤더나 Nav 같이 중복되는 요소들을 매번 불러오는 불필요한 자원 낭비를 줄인다.
  기존 방식- 웹페이지를 미리 준비해두었다가, 로딩할 때 새 페이지를 서버측에 요청하여 받아왔지만 규모가 커지고 사용자와의 상호작용이 많아짐에 따라서 속도 저하 발생
  단점:
  1. 첫 화면의 로딩 시간이 길다. HTML은 거의 비어있는데, 대부분의 코드가 JS에 들어 있기 때문에 그렇다. ??
  2. 검색엔진 최적화에 좋지 않다. HTML에는 정보가 거의 없기 때문이다.

1. User Interface Library

- 정리
  재사용 가능한 사용자 인터페이스(UI)의 컴포넌트의 집합
  ex) 버튼, 폼, 모달, 탭, 드롭다운 메뉴, 토글, 슬라이더 등
  목적:
  1. 팀 또는 개발자와 디자이너가 일관되고 효율적으로 UI를 구축할 수 있도록 함.
  2. 코드의 재사용성을 증대시키고, 제품(Product)의 UI를 빠르게 구축할 수 있음.

1. Functional Component (함수형 컴포넌트)

- 정리
  컴포넌트는 크게 함수형 컴포넌트와 클래스형 컴포넌트로 구분된다.
  함수형 컴포넌트 특징
  1. 더 간결한 코드: 클래스 컴포넌트보다 코드가 짧고 가독성이 좋다.
  2. React Hooks 사용 가능: useState, useEffect 등 훅을 사용해 상태 관리가 가능하다.
  3. 성능 최적화: 클래스 컴포넌트보다 렌더링이 최적화되어 있다.
  ```jsx
  import React from "react";

  export default function FunctionComponentPage() {
    return <div>JSX 영역</div>;
  }
  ```

1. Virtual DOM (가상 DOM)

- 정리
  DOM의 역할: DOM이 존재하기 때문에 Javascript는 HTML 태그들을 수정할 수 있음.
  ![image.png](attachment:30c0b1d4-f6f9-4556-92b5-e6e623e77cb8:image.png)
  ⇒ 실제 DOM에는 브라우저가 화면을 그리는데 필요한 모든 정보가 들어있어 실제 DOM을 조작하는 **작업이 무겁다**.
  ⇒ 실제 DOM의 변경 사항을 빠르게 파악하고 반영하기 위해서 내부적으로 가상 DOM을 만들어서 관리한다.
  **_Virtual DOM은 DOM의 요약본_**

1. 동시성 렌더링

- 정리
  **정의:** 한번에 둘 이상의 작업이 동시에 진행되는 것
  - 렌더링을 긴급한 업데이트, 전환 업데이트로 나눠 긴급한 업데이트부터 진행함
    - 전환 업데이트 중 긴급한 업데이트가 들어오면 전환 업데이트를 중단하고 긴급한 업데이트 우선 진행함
    - 동시성 렌더링은 계산속도를 개선한 것이 아니라 우선순위를 지정하여 긴급한 업데이트를 우선 진행해 UI 차단을 최소화시킨 것

1. React의 렌더링 조건 ⭐

- 정리
  1. State 변경
     - 상태변경을 위해 setState() 메서드 사용 ( 직접 바꾸면 state 변경 감지 못함 )
  2. Props 변경
     - 전달받은 props 값이 업데이트 된 경우
  3. 부모 컴포넌트가 렌더링 되는 경우
     1. ex) ..
  4. forceUpdate 호출

     - props나 state가 아닌 다른 값이 변경되었을 때 리렌더링 하고 싶다면 사용할 수 있는 메서드

     ```jsx
     import React from "react";

     class App extends React.Component {
       reRender = () => {
         // calling the forceUpdate() method
         this.forceUpdate();
       };
       render() {
         console.log("Component is re-rendered");
         return (
           <div>
             <h2>GeeksForGeeks</h2>
             <button onClick={this.reRender}>Click To Re-Render</button>
           </div>
         );
       }
     }
     export default App;
     ```
