- 태그 가져오기

  ```jsx
  // ID로 가져오기
  const title = document.getElementById("title");

  // 클래스명으로 가져오기
  const items = document.getElementsByClassName("item");

  // 태그명으로 가져오기
  const paragraphs = document.getElementsByTagName("p");

  // CSS 선택자로 가져오기: 첫 번째 요소
  const firstItem = document.querySelector(".item");

  // CSS 선택자로 가져오기: 모든 요소
  const allItems = document.querySelectorAll(".item");
  ```

- 이벤트 리스너 추가하기

  - 이벤트를 감지하고 특정 동작을 실행할 때 사용

  ```jsx
  const button = document.querySelector("#changeColor");

  button.addEventListener("click", () => {
    document.body.style.backgroundColor = "lightblue";
  });

  // 클릭 시 배경 색이 lightblue로 변경
  ```

- 이벤트 리스너 제거하기

  - removeEventListener() 사용

  ```jsx
  const button = document.querySelector("#Button");

  function handleClick() {
    alert("버튼이 클릭되었습니다");
  }

  // 이벤트 추가
  button.addEventListener("click", handleClick);

  // 이벤트 제거
  setTimeout(() => {
    button.removeEventListener("click", handleClick);
  }, 3000); // 3초 후 이벤트 제거 => 클릭해도 alert x
  ```

- 키보드와 마우스 이벤트
  - keydown: 키를 눌렀을 때
  - keyup: 키를 뗐을 때
  - mouseenter: 요소에 마우스가 들어오면 실행
  - mouseleave: 요소에서 마우스가 벗어나면 실행
  - mousemove: 마우스를 움직일 때마다 실행
- 태그 속성 다루기
  - 속성 값 가져오기 : getAttribute()
  - 속성 값 변경: setAttribute()
  - 속성 제거: removeAttribute()
- 부모와 자식 태그 찾기

  ```jsx
  const parent = document.querySelector(".parent");

  // 자식 요소 찾기
  console.log(parent.children); // 모든 자식 요소를 찾는다.
  console.log(parent.firstElementChild); // 첫 번째 자식 요소를 찾는다.
  console.log(parent.lastElementChild); // 마지막 자식 요소를 찾는다.

  // 부모 요소 찾기
  const child = document.querySelector(".child");
  console.log(child.parentElement);
  ```

- 새로운 태그 만들기
  - createElement를 이용해 새로운 태그를 생성 가능
  ```jsx
  const newButton = document.createElement("button"); // button 태그 생성
  newButton.textContent = "클릭";
  document.body.appendChild(newButton);
  ```
- 태그 복제하기
  cloneNode() 를 이용해 복제
  ** 코드 정리 필요 **
