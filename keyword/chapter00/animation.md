### animation 🍠

<aside>
💡 아래 키워드에 대해 학습한 후, 실습을 진행하시고 코드와 실행 영상을 남겨주세요!

</aside>

- animation-name
  - 애니메이션의 중간 상태를 지정하기 위한 이름을 정의
  - 중간 상태는 @keyframes 규칙을 이용하여 기술
  - 유효한 이름
  ```css
  animation-name: name; /* 문자열로 시작하는 이름 */
  animation-name: _name; /* 언더바(_)로 시작하는 이름 */
  animation-name: -name; /* 하이픈(-)으로 시작하는 이름 */
  ```
  - 유효하지 않은 이름
  ```css
  animation-name: 1name; /* 숫자로 시작하는 이름 */
  animation-name: @name; /* 특수 문자로 시작하는 이름 */
  출처: https://webclub.tistory.com/621 [Web Club:티스토리]
  ```
- animation-duration
  한 싸이클의 애니메이션이 얼마에 걸쳐 일어날지 지정
- animation-delay
  - Element가 로드되고 나서 언제 애니메이션이 시작될지 지정
  - 0, now: 속성을 적용하자마자 애니메이션을 시작
  - 시간 값이 음수면 적용한 순간 바로 애니메이션을 실행하지만, 지정한 시간이 지난 뒤의 장면부터 애니메이션을 재생함.
    - ex) 값이 ‘-1s’면 1초가 지난 뒤의 장면부터 애니메이션 재생
- animation-direction
  - 애니메이션이 종료되고 다시 처음부터 시작할지 역방향으로 진행할지 결정
  - **`normal` :** 순방향으로 재생(재생이 끝나면 첫 번째 프레임부터 다시 시작)
  - **`reverse` :** 역방향으로 재생(재생이 한 번 끝나면 마지막 프레임부터 다시 시작)
  - `alternate` : 순방향으로 애니메이션을 시작해 역방향과 순방향으로 번갈아 애니메이션 재생
  - **`alternate-reverse` :** 역방향으로 애니메이션을 시작해 순방향과 역방향으로 번갈아 애니메이션 재생
- animation-iteration-count
  - 애니메이션이 몇 번 반복될지 지정
  - **`infinite`**로 지정 시 무한 반복
- animation-play-state
  - 애니메이션을 일시 정지하거나 실행시킬 수 있음.
  - **`running`**: 애니메이션 재생 (기본값)
  - **`paused`**: 애니메이션 정지
- animation-timing-function
  중간 상태들의 전환을 어떤 시간 간격으로 진행할지 지정
- animation-fill-mode
  애니메이션이 시작되기 전이나 끝나고 난 후 어떤 값이 적용될지 지정
- @keyframes
  - 애니메이션을 적용할 요소의 animation-name을 정의하고 그 키프레임 코드 블럭에 재생할 프레임별 시간 비율을 작성
  - 0%: 애니메이션의 시작 프레임.
  - 100%: 애니메이션의 마지막 프레임.
  - from: 애니메이션의 시작 프레임. 0%과 같다.
  - to: 애니메이션의 마지막 프레임. 100%와 같다.
  - 0%와 100% 사이에 여러 개의 중간 값(%)을 설정해 프레임 작성 가능
- 축약형
  ```css
  animation: name | duration | timing-function | delay | iteration-count |
    direction | fill-mode | play-state;
  ```
