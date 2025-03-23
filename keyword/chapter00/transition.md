### transition 🍠

<aside>
💡 아래 키워드에 대해 학습한 후, 실습을 진행해주시고, 코드와 실행 영상을 남겨주세요!

</aside>

- transition-property
  - 트랜지션을 적용해야 하는 CSS 속성의 이름 혹은 이름들을 명시
  - 프로퍼티로 나열한 속성만 트랜지션하는 동안 움직인다.
- transition-duration
  - 트랜지션이 일어나는 지속 시간을 명시한다.
  - s 또는 ms 사용
- transition-timing-function
  - 트랜지션 이벤트의 진행 속도를 지정할 수 있는 속성
  - 기본값: ease ( 처음엔 천천히 시작했다가 중간에 빨라지고 마지막엔 느리게 진행)
  - linear: 동일한 속도로 이벤트 진행
  - ease-in: 처음엔 느리게 시작하다가 마지막엔 빠르게 진행
  - ease-out: 처음엔 빠르게 시작하다가 마지막엔 느리게 진행
- transition-delay
  - 트랜지션 이벤트를 바로 실행시키지 않고 지연시키고자 하는 경우에 사용하는 속성
- transition-behavior
  - `display`나 `visibility` 같은 불연속적인(opacity는 숫자로 중간값 표현 가능, 이거 말고 display: none, display: block 처럼 중간값 표현 못하는) 속성들 간의 전환을 가능하게 해준다.
  - `transition-behavior` 속성은 이러한 속성들을 보간(interpolate)할 수 있도록 만들지는 않지만, 변화하는 시점을 제어하여 전체 전환(transition)의 지속 시간 동안 좀 더 세밀하게 조정할 수 있도록 해준다.
