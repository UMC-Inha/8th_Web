### border vs outline 🍠
    
```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .box {
          width: 100px;
          height: 100px;
          background-color: purple;
          margin-bottom: 40px;
          box-sizing: border-box;
        }
    
        .box1 {
          border: 10px solid black;
        }
    
        .box2 {
          outline: 10px solid red;g
        }
      </style>
    </head>
    
    <body>
      <div class="box box1">border-box</div>
      <div class="box box2">content-box</div>
    </body>
    
    </html>
```
- border VS outline의 차이점🍠
    - 둘 다 요소의 테두리를 정의하는 속성.
      - border: 요소의 박스 모델 안쪽, 요소 크기에 포함(width, height에 영향)
      - outline: 요소의 경계 바깥쪽, 요소 크기에 포함되지 않음
      - 본인이 VSCode를 통해 여러번 실행시켜보며 개발자 도구와, 캡처한 이미지를 활용하여 어떠한 차이점을 갖고 있는지 상세하게 정리해주세요! ->??ㅠㅠ
     
### relative / absolute 🍠

1. relative 실습
  <aside>
   <img width="559" alt="스크린샷 2024-07-18 오후 6 56 12" src="https://github.com/user-attachments/assets/277f8a05-8123-431d-a06f-6b4b3e3ce3a2" />

<img width="568" alt="스크린샷 2024-07-18 오후 6 57 43" src="https://github.com/user-attachments/assets/e595d3c8-3a51-4cff-8e2c-05d8e151b6ff" />

    
💡 Q: 그럼, 한번 여러분들이 이번에는 위의 이미지 상태에서 고구마 상자를 아래와 같은 이미지처럼 이동시켜 주세요. 

Hint: `bottom`과 `right`속성을 활용해서 진행해주세요. 필요시 고구마 상자 글씨 태그에 class 명을 부여해도 좋습니다.

⭐️ 꼭 양수만 사용할 수 있는 것은 아닙니다! ⭐️

</aside>

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background-color: purple;
      color: white;
      box-sizing: border-box;
      position: relative;
      bottom: -160px;
      right: 2px;
    }
  </style>
</head>

<body>
  <div class="box">BOX</div>
  <h1>고구마 상자</h1>
</body>

</html>
```

박스가 고구마 상자가 위에서 글씨 아래쪽에 위치 & 왼쪽으로 당겨짐

  * bottom: 아래에서 n만큼 떨어져잇음을 나타냄. 값을 음수로
  * right: 오른쪽에서 n만큼 떨어져잇음을 나타냄. 값을 양수로

![스크린샷 2025-03-19 150104](https://github.com/user-attachments/assets/45063246-af27-4c7c-8fd5-17a20da3ee23)


2. absolute 실습

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /** 전체 선택자 기본적으로 설정된 마진을 없앰. */
    * {
      margin: 0;
      box-sizing: border-box;
    }

    .box1 {
      width: 500px;
      height: 500px;
      background-color: purple;
      color: white;
      position: relative;
    }

    .box2 {
      width: 200px;
      height: 200px;
      background-color: yellow;
    }
  </style>
</head>

<body>
  <div class="box1">BOX1</div>
  <h1 class="box2">BOX2</h1>
</body>

</html>
```
- **`position: absolute`**를 활용하여 본인의 힘으로, 아래와 같은 이미지로 BOX2를 이동시켜보세요! 🍠
    
    <img width="505" alt="스크린샷 2024-07-18 오후 7 13 52" src="https://github.com/user-attachments/assets/67a3c027-156f-4e1c-9ede-af3d24f44724" />

    코드는 아래에 첨부해주세요!
  
    ```html
    <!DOCTYPE html>
    <html lang="en">

        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            /** 전체 선택자 기본적으로 설정된 마진을 없앰. */
            * {
              margin: 0;
              box-sizing: border-box;
            }

            .box1 {
              width: 500px;
              height: 500px;
              background-color: purple;
              color: white;
              position: relative;
            }

    .        box2 {
              width: 200px;
              height: 200px;
              background-color: yellow;
              position: absolute;
              top: 0px;
            }
          </style>
        </head>

        <body>
          <div class="box1">BOX1</div>
          <h1 class="box2">BOX2</h1>
        </body>

    </html>
    ```

    box2가 아래에서 위로 올라감 (box1 상단까지) -> box2 위치 absolute 후 top:0px;

  ![스크린샷 2025-03-19 151413](https://github.com/user-attachments/assets/c1b9f5b2-ce3c-4f14-ad37-05545b8388ed)

  
### 정렬의 진수 🍠⭐⭐⭐

- **`text-align`**: 텍스트(인라인 요소)를 정렬할 때 사용
    - 속성으로 left(왼쪽 정렬), rignt(오른쪽 정렬), center(가운데 정렬), justify(양쪽 정렬(문단 정렬))가 있다.
 
      ```css
      .text-box {
          text-align: center; /* 텍스트를 가운데 정렬 */
      }
      ```
      ```html
      <div class="text-box">안녕하세요!</div>
      ```
      결과: `"안녕하세요!"`가 가운데 정렬됨
      
- **`margin`**: 요소 자체를 정렬할 때 사용. 여백을 이용한 정렬
    - 중앙 정렬 (`margin: auto;`)
      ```css
      .box {
          width: 200px;
          margin: 0 auto; /* 가로 중앙 정렬 */
        }
      ```
      `auto`를 사용하면 블록 요소를 가운데 정렬할 수 있다. 가로정렬만 가능. (세로정렬은 `flex` 또는 `grid`가 필요)

    - 여백 조절
      ```css
      .box {
          margin: 10px 20px 30px 40px; 
          /* 위 10px, 오른쪽 20px, 아래 30px, 왼쪽 40px */
      }
      ```

- **`flex`**: 부모 요소를 `display: flex;`로 설정하면 자식 요소를 정렬할 수 있다.
 
   ```css
      .container {
          display: flex;
          justify-content: center; /* 가로 중앙 정렬 */
          align-items: center; /* 세로 중앙 정렬 */
          height: 100vh;
      }
    ```
  
   ```html
      <div class="container">
          <div class="box">정렬된 박스</div>
      </div>
    ```
   
    - 졍렬 옵션
        - `justify-content`: 가로 정렬 (왼, 가운데, 오)
        - `align-items`: 세로 정렬 (위, 가운데, 아래)
        - `align-self`: 특정 요소만 정렬
        
- **`translate`**: 요소의 위치를 이동시킬 때 사용 (`position`과 함께 사용 가능)

  ```css
  .box {
      transform: translate(50px, 100px);
  }
  ```
  `translate(50px, 100px);`  오른쪽 50px, 아래 100px 이동

  (단축 사용) `translateX(50px);` 오른쪽 50px 이동 / `translateY(-30px);` 위로 30px 이동

- **`grid`**: CSS에서 가장 강력한 정렬 방법 (2차원 정렬 가능). 전체 레이아웃 정렬

```css
    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
      grid-template-rows: 100px 200px; /* 두 개의 행 */
      justify-content: center; /* 가로 정렬 */
      align-items: center; /* 세로 정렬 */
    }
```

```html
    <div class="container">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
    </div>
```
가로/세로 정렬을 쉽게 할 수 있다.

👉 `flex`를 사용하면 가로/세로 정렬이 편함!

👉 `grid`는 레이아웃 전체를 정렬할 때 강력함!

🔥 실전에서는 `flex`와 `grid`를 가장 많이 쓴다

위의 키워드를 각각 활용해서 가운데 정렬을 해주세요! 🍠

<aside>
💡 html 요소는 여러분들이 직접 만드셔서, 가운데 정렬을 한 영상과 코드만 남겨주시면 됩니다.
향후 학습에 있어서, 매우 중요한 부분이니, 많은 실습 부탁드립니다!
</aside>

### 반응형 background 🍠

- **`background-image`**: 배경 이미지 설정
  ```css
  .element {
      background-image: url('image.jpg');
  }
  ```
- **`background-repeat`**: 배경 이미지 반복되는지 여부를 설정
    - `repeat`, `no-repeat`, `repeat-x`(가로로만 반복), `repeat-y`(세로로만 반복)
  ```css
  .element {
      background-repeat: no-repeat; /* 반복하지 않음 */
  }
  ```
- **`background-position`**: 배경 이미지 위치 설정. `top`, `left`, `center`, `right`, `bottom` 등을 사용
  ```css
  .element {
      background-position: center center; /* 이미지가 가운데 위치 */
  }
  ```
- **`bacoground-size`**: 배경 이미지 크기 설정
    - `cover`: 요소의 크기를 완전히 덮도록 이미지 확장
    - `contain`: 이미지가 요소 안에 완전히 맞게 크기 조정
    - `픽셀값/퍼센트`: 지정 크기로 이미지 크기 설정 (예: `100px 100px`)
  ```css
  .element {
      background-size: cover; /* 이미지 크기를 영역에 맞게 조정 */
  }
  ```
  
- 축약: 여러 `background` 속성을 한 줄로 축약하여 사용 가능
    - image, repeat, position, size 순서대로 설정
  ```css
  .element {
      background: url('image.jpg') no-repeat center center/cover;
  }
  ```

### transform 🍠

- **`translate`**: 요소를 이동시키는 함수. x축과 y축 기준으로 이동.
  - `translateX(50px);` X축으로만 이동
  - `translateY(50px);` Y축으로만 이동

```css
  .element {
    transform: translate(50px, 100px); /* X축으로 50px, Y축으로 100px 이동 */
  }
```
 - `translate`는 요소를 원래위치에서 상대적으로 이동시킴. 애니메이션 효과 줄때 많이 사용

- **`scale`**: 요소의 크기를 변경하는 함수
```css
  .element {
    transform: scale(1.5); /* 요소를 1.5배 크기로 */
  }
```
  -`scaleX`, `scaleY`를 사용하면 각각 x축 또는 y축 방향으로만 크기 변경 가능

- **`rotate`**: 요소를 회전시키는 함수
```css
  .element {
    transform: rotate(45deg); /* 시계방향으로 45도 회전 */
  }
```

- **`skew`**: 요소를 기울이는 함수. x축과 y축을 기준으로 각도를 설정하며 기울인다
```css
  .element {
    transform: skew(30deg, 10deg); /* X축 30도, Y축 10도 기울기 */
  }
```
  - `skewX`, `skewY`를 사용하면 각각 x축 또는 y축 방향으로만 기울이기 가능

- **`matrix`**: 2D 변환을 행렬로 표현하는 함수
```css
  .element {
    transform: matrix(1, 0, 0, 1, 50, 100); /* translate(50px, 100px)과 동일 */
  }
```
  - `matrix(a, b, c, d, e, f)`에서
    - a, d: 크기(scale) 변환
    - b, c: 기울기(skew) 변환
    - e, f: 이동(translate) 변환
  - `matrix()`는 여러 변환을 한 번에 적용할 때 유용, 그치만 직관적이지 않아 복잡해질 수 있음음
  - `matrix3d()`는 3D 변환에 사용

여러 변형을 한 번에 사용할 수도 있다. ex) 요소이동, 크기조정, 회전전
```css
  .element {
    transform: translate(50px, 100px) scale(1.2) rotate(45deg);
  }
```

### transition 🍠

요소의 상태 변화를 부드럽게 애니메이션으로 표현하는 데 사용

- **`transition-property`**: 어떤 스타일 속성에 애니메이션을 적용할지 설정하는 속성
```css
  .element {
    transition-property: background-color, transform; /* 배경색과 변형에 애니메이션 적용 */
  }

  .element {
    transition-property: all; /* 모든 스타일 속성에 애니메이션 적용 */
  }
```

- **`transition-duration`**: 애니메이션이 완료되는 시간을 설정. 초(s)나 밀리초(ms) 단위로
```css
  .element {
    transition-duration: 2s or 500ms; /* 2초 or 0.5초 동안 애니메이션 */
  }
```

- **`transition-timing-function`**: 애니메이션의 속도 곡선 설정. 얼마나 부드럽게 변할지, 시작과 끝 부분 속도 조절
```css
  .element {
    transition-timing-function: ease-in; /* 애니메이션이 시작할 때 천천히 시작 */
  }
```
  - `linear`: 일정한 속도로 애니메이션 진행
  - `ease`: 기본값, 부드럽게 시작하고 끝남
  - `ease-in`: 시작이 느리고 끝이 빨라짐
  - `ease-out`: 시작이 빠르고 끝이 느려짐
  - `ease-in-out`: 시작과 끝이 느리게, 중간에 빠르게
  - `cubic-bezier(n, n, n, n)`: 사용자 정의 속도 곡선

- **`transition-delay`**: 애니메이션 시작 전 대기시간 설정. 초(s)나 밀리초(ms) 단위로
```css
  .element {
    transition-delay: 0.5s; /* 0.5초 후에 애니메이션 시작 */
  }
```

- **`transition-behavior`**: 애니메이션 방향을 어떻게 처리할지 지정하는 속성
  - CSS의 표준 속성이 아니며 브라우저에서 지원되지는 않음
  - 그래서 변환 방향 제어할 땐 `transition-timing-function`이나 `@keyframes`(세밀제어) 등을 사용
```css
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100px);
    }
  }

  .element {
    animation: slide 2s ease-in-out;
  }
```

실습  🍠

**`transition`** 키워드를 학습한 후, 해당 키워드와, **`transform에서 배운 특정 키워드를 활용`**하여, 아래와 같은 영상과 비슷하게 만들어주세요! (똑같을 필요는 없고, 기능만 같으면 됩니다.)

단, **`transition 축약형`**을 사용해주세요!

- 코드 첨부 🍠
- 실행 영상 첨부 🍠

### animation 🍠

요소가 특정 스타일을 일정 시간동안 변형하도록 애니메이션 효과를 적용하는 기능능

- **`animation-name`**: 애니메이션 이름 설정하는 속성. `@keyframes`에서 정의한 애니메이션을 연결.
```css
  .element {
    animation-name: fadeIn; /* @keyframes fadeIn을 사용 */
  }
```
- **`animation-duration`**: 애니메이션이 지속되는 총 시간. 초(s)나 밀리초(ms) 단위로
```css
  .element {
    animation-duration: 2s; /* 애니메이션이 2초 동안 실행됨 */
  }
```
- **`animation-delay`**: 애니메이션이 얼마나 기다렸다가 실행될지 결정정
```css
  .element {
    animation-delay: 1s; /* 1초 후에 애니메이션 시작 */
  }
```
- **`animation-direction`**: 애니메이션이 어떤 방향으로 실행될지 결정
```css
  .element {
    animation-direction: alternate;
  }
```
  - `normal`: 기본값, 정방향(0%->100%)
  - `reverse`: 역방향(100%->0%)
  - `alternate`: 정방향 -> 역방향 반복
  - `alternate-reverse`: 역방향 -> 정방향 반복복

- **`animation-iteration-count`**: 애니메이션 반복 횟수 설정
```css
  .element {
    animation-iteration-count: infinite; /* 무한 반복 */
  }
```
  - `1`: 기본값, 1회실행
  - `3`: 3회 실행
  - `infinite`: 무한 반복

- **`animation-play-state`**: 애니메이션 재생 또는 정지
```css
  .element {
    animation-play-state: paused; /* 애니메이션 일시 정지 */
  }
```
  - `running`: 기본값, 애니메이션 실행
  - `paused`: 애니메이션 일시 정지

- **`animation-timing-function`**: 애니메이션 속도 곡선. 애니메이션 속도 변화 조절
```css
  .element {
    animation-timing-function: ease-in-out;
  }
```
  - `linear`: 일정한 속도로 애니메이션 진행
  - `ease`: 기본값, 부드럽게 시작하고 끝남
  - `ease-in`: 시작이 느리고 끝이 빨라짐
  - `ease-out`: 시작이 빠르고 끝이 느려짐
  - `ease-in-out`: 시작과 끝이 느리게, 중간에 빠르게
  - `cubic-bezier(n, n, n, n)`: 사용자 정의 속도 곡선

- **`animation-fill-mode`**: 애니메이션이 실행 전후에 어떤 스타일을 유지할지 결정
```css
  .element {
    animation-fill-mode: forwards;
  }
```
  - `none`: 기본값, 애니메이션 끝난 후 원래 스타일로 돌아감감
  - `forwards`: 애니메이션 마지막 상태 유지
  - `backwards`: 애니메이션 시작 상태 유지
  - `both`: `forwards`+`backwards` 적용 (뭔소린지?)

- **`@keyframes`**: 애니메이션이 어떻게 변할지 단계적으로 설정.
```css
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } 

  .element {
    animation-name: fadeIn;
    animation-duration: 2s;
  }
```
  - 0%부터 100%까지 스타일을 지정하여 원하는 효과를 만들 수 있다!

- **`축약형`**: 위의 모든 속성을 한 줄로 설정
```css
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;

  .element {
    animation: fadeIn 2s ease-in-out 1s infinite alternate forwards running;
  }
```
 - 이름이 fadein, 2초 분량, 시작과 끝은 느리고 중간은 빠르게 진행, 1초 지연 후 시작,
 - 무한 반복, 정->역방향 반복, 마지막 상태 유지, 애니메이션은 재생 상태

- 완전 예제 코드
  - `@keyframes bounce`로 위아래로 튀는 애니메이션 구현
  - `animation: bounce 1s ease-in-out infinite alternate;`로 무한 반복
```css
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animation</title>
    <style>
      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-50px);
        }
        100% {
          transform: translateY(0);
        }
      }

      .box {
        width: 100px;
        height: 100px;
        background-color: tomato;
        text-align: center;
        line-height: 100px;
        color: white;
        font-weight: bold;
        animation: bounce 1s ease-in-out infinite alternate;
      }
    </style>
  </head>
  <body>
    <div class="box">BOUNCE</div>
  </body>
  </html>
```

* transition과 animation의 차이!!

- `transition`: "부드럽게" 변하는 효과 (ex. `hover`, `click` 등 트리거 필요)
- `animation`: 자동 실행 가능. 반복 가능. `@keyframes`로 여러 단계 설정 가능

- 쉽게 말해,
  - "사용자가 조작해야 실행된다" -> `transition`
  - "자동으로 실행되거나 반복되는 애니메이션 필요하다" -> `animation`

  ### 실습  🍠 ----> 해보셈

 **`animation 키워드`**를 학습한 후, 아래와 비슷한 영상을 만들어주세요!

단, **`animation 축약형`**을 사용해주세요!

- [ ]  원은 어떻게 만들까요?
- Hint
    
    **`border-radius` 를 활용해봅시다~!**
    
- [ ]  계속 튀기는 애니메이션은 어떻게 하면 쉽게 만들까요?
- Hint
    
    `infinte`, `alternate` 속성을 활용해봅시다!