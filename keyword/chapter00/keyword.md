#html
- 시맨틱 태그란?
    - div 태그로만 페이지를 구조화 하는 것이 좋은가? 🍠
        -div는 비시맨틱 태그로 페이지를 나누는 건 좋지만 따로 의미를 가지지 않기 때문에 시맨틱 태그와 div 태그그를 적절히 섞어가며 페이지를 구조화 하는 것이 좋다.

- 기타 태그 추가 정리해보기 🍠
    - 텍스트 태그를 가장 쉽고 많이 접하게 되는 것 같다. 폰트의 크기를 조절하는 <hn>태그나 단락을 구분하는 <p>태그나 줄바꿈을 하는 <br>태그를 가장 많이 보고 사용한 것 같다.
    [html 태그 모음]https://inpa.tistory.com/entry/HTML-%F0%9F%8F%B7%EF%B8%8F-%ED%83%9C%EA%B7%B8-%EC%9A%94%EC%95%BD%ED%91%9C#%3Chn%3E

#css
- border vs outline의 차이점 🍠
    - border는 css 박스 모델의 일부이며 그 크기와 위치는 요소의 레이아웃 크기 및 정렬의 영향을 줌.
    - outline은 박스 모델의 일부가 아니며 요소의 레이아웃이나 크기에 영향을 주지 않음.
    [참고]https://persistent-weed-dev.tistory.com/entry/CSS-border-%EC%86%8D%EC%84%B1%EA%B3%BC-outline-%EC%86%8D%EC%84%B1

-  ### transition  🍠

- transition-property
    - 어떤 CSS 속성을 애니메이션할지 지정하는 속성
        div {
         transition-property: background-color, transform;
        }
- transition-duration
    -애니메이션이 실행되는 시간을 설정하는 속성
        div {
            transition-duration: 0.5s;
        }
- transition-timing-function
    - 애니메이션 속도를 조절하는 가속도 곡선을 설정함 기본값은 ease이다
- transition-delay
    - 애니메이션이 시작되기 전 대기하는 시간을 설정
    div {
     transition-delay: 1s;
    }
- transition-behavior
    - 사용자의 선호도에 따라 애니메이션을 조절하는 속성

- ### animation 🍠
- animation-name
    - 사용할 애니메이션의 이름을 설정
    div {
     animation-name: fadeIn;
    }
- animation-duration
    - 애니메이션이 실행되는 시간을 설정
    div {
     animation-duration: 2s;
    }
- animation-delay
    - 애니메이션 시작 전에 대기하는 시간을 설정
    div {
     animation-delay: 1s;
    }
- anim ation-direction
    - 애니메이션의 진행 방향을 설정
    div {
     animation-direction: alternate;
    }   
- animation-iteration-count
    - 애니메이션이 몇 번 반복될지 설정(infinite를 사용하면 무한 반복)
    div {
     animation-iteration-count: 3;
    }
- animation-play-state
    - 애니메이션을 재생하거나 정지하는 속성
    div {
     animation-play-state: paused;
    }
- animation-timing-function
    - 애니메이션 속도의 변화를 설정(transition-timing-function과 동일)
- animation-fill-mode
    - 애니메이션 실행 전후 상태를 지정
    div {
     animation-fill-mode: forwards;
    }
- @keyframes
    - 애니메이션의 단계별 스타일 변화를 정의하는 규칙
- 축약형
    - 위의 속성을 한 줄로 작성 가능

# JavaScript
- JS에서 사칙연산을 하는 방법을 작성해주세요. 🍠
    - 더하기
        - let a
          let b //변수설정
          console.log(a + b);
    - 빼기
        - console.log(a - b);
    - 곱하기
        - console.log(a * b);
    - 나누기
        - console.log(a / b);
    - 나머지 구하기
        - console.log(a % b);
    - 거듭 제곱
        - console.log(a ** b);

- JS에서 비교 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
    - == 값이 같은지 비교
    - != 값이 다른지 비교
    - >= 왼쪽 값이 크거나 같으면 true
    - <= 오른쪽 값이 크거나 같으면 true
- JS에서 증가/감소 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
    - ++변수: 전위 증가 연산자
    - 변수++: 후위 증가 연산자
    - --변수: 전위 감소 연산자
    - 변수--: 후위 감소 연산자
- 연산자 우선순위에 대해 작성해주세요. 🍠
    - 1. ()
    - 2. ++, --, !
    - 3. **
    - 4. *, /, %
    - 5. +, - 