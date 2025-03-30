# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

</aside>

- CSS 기본 문법
    
    # 기본 문법
    
    `HTML`을 통해, 웹 페이지의 뼈대를 구축하였다면, 이제 멋있고 예쁜, 형태로 디자인을 하기 위해서 `CSS`를 사용해야 한다.
    
    ### 1. 선택자 활용 스타일링
    
    선택자는 `태그`, `클래스`, `#아이디` 등 여러가지가 있다.
    
    ```tsx
    선택자 {
    	속성1: "속성값1";
    	속성2: "속성값2";
    }
    ```
    
    ```css
      <style>
        /** 1. 태그 선택자 */
        p {
          color: red;
        }
    
        /** 2. ID 선택자 */
        #matthew {
          color: red;
        }
    
        /** 3. class 선택자 */
        .yongmin {
          color: red;
        }
      </style>
    ```
    
    ### 2. 인라인 스타일링
    
    아래와 같이 `Inline으로도 스타일링`이 가능하다.
    
    ```tsx
    <태그 style="값: 속성'">컨텐츠 내용</태그>
    ```
    
- CSS란 무엇인가? → CSS 우선순위 관련 설명
    
    # CSS란 무엇인가?
    
    CSS의 약자는 아래와 같다.
    
    `Cascading Style Sheets(CSS)`
    
    [Cascade](https://www.google.com/search?q=Cascading&oq=Cascading&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIHCAEQABiABDIJCAIQRRg7GIAEMgcIAxAAGIAEMgcIBBAAGIAEMgYIBRBFGD0yBggGEEUYPTIGCAcQRRg80gEIMjU5MmowajSoAgCwAgA&sourceid=chrome&ie=UTF-8)의 의미는 아래와 같이 **폭포처럼 쏟아지는 물** 이라는 의미가 있다.
    
    ![스크린샷 2024-07-18 오후 5.44.55.png](attachment:0128c476-c339-4383-80df-09e4ef76f21a:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.44.55.png)
    
    즉, 연속하는, 계속 이어진 두가지 이상의 스타일이 있을떄, 어떤 우선순위에 따라 CSS가 적용될지 우선순위를 알고 있는게 매우 중요합니다.
    
    <aside>
    💡 아래의 설명은, IDE(VSCode 등)을 설치 한 후, Live Server(VSCode 사용시 extension 설치 필수)를 설치했다는 가정하에 진행하겠습니다.
    
    </aside>
    
    먼저, `index.html` 파일을 만든 후 아래와 같은 내용을 붙여 넣어 보겠습니다. 1주차에도 설명했지만, **`<head> 태그는 SEO를 위한 메타데이터들을 입력`**하고, **`실제로 유저에게 보이는 요소들은 <body> 태그 내부에 작성`**한다고 설명드렸습니다.
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    
    <body>
      <h1>고구마 아이스크림 맛있다.</h1>
      <div>고구마 아이스크림 맛있다.<div>
    </body>
    
    </html>
    ```
    
    우리는, 어떠한 스타일링을 적용하지 않았습니다. 하지만, 실제로 `Live Server로 실행` 시켜보면, `<h1> 태그`와 `<div> 태그`에 같은 내용이 들어있지만, **`실제로 다른 스타일링이 적용`**됨을 알 수 있습니다.
    
    ![스크린샷 2024-07-18 오후 5.53.29.png](attachment:3ac3b114-1a50-46c0-bf3e-04fa703e3a5f:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.53.29.png)
    
    이는, `<h1>태그`는 브라우저 자체에서 적용한 스타일링이 적용되는 것 입니다. **`(브라우저 자체 스타일링)`**
    
    <aside>
    💡 폰트가 커지고, 진하게 표시되는 이유 → 브라우저에서 <h1>을 자체 적으로 스타일링 해줌.
    
    </aside>
    
    사용자가 브라우저 세팅에서, h1태그에 대해서 스타일을 지정했다면, 사용자가 지정한 스타일링이 우선순위가 높기에, 사용자가 지정한대로 표기가 됩니다.
    
    # CSS-Origin 우선 순위
    
    1. 사용자 Style
        - 사용자 에이전트나, 브라우저에 기본적으로 내장된 스타일시트를 말함.
        - 브라우저마다 기본 스타일이 조금씩 다르기 떄문에, 퍼블리싱 할 떄 `normalize.css`, `reset.css` 처럼 공통 속성을 재정의하는 css를 작성하곤 합니다.
        - 위에서 설명드린, `<h1> 태그`가 기본적으로 폰트가 커지고 진하게 표시되는 이유.
    2. 코드 Style
        - 가장 일반적인 CSS, 프론트엔드 개발자가, 화면을 꾸미기 위하여, 작성한 StyleSheet 코드를 말합니다.
    3. User Style
        - 개발자가 아닌, 웹 사이트의 사용자가 설정하는 StyleSheet 의미
        - 일부 사용자는 시각적 불편을 줄이기 위한 목적 등으로, 자신만의 StyleShet를 브라우저에 적용함.
    
    ### 코드 Style 우선순위
    
    처음에는 잘 이해가 안되겠지만, 태그에 대해 구체적으로 설명을 할 경우, 우선순위가 높다는 것 입니다.
    
    ```html
    <h1>고구마<h1> // 태그
    
    <h1 class="sweet-potato-class">고구마<h1> // 클래스
    
    <h1 id="sweet-potato-id">고구마<h1> // 아이디
    
    <h1 style="color: purple;">고구마<h1> // 인라인 스타일링
    
    // !important 속성
    // 다른 모든 스타일 규칙보다, 우선 적용되도록, 강제하는데 사용!
    
    .sweet-potato-class {
    	color: red !important;
    }
    ```
    
    **`우선 순위`**
    
    <aside>
    💡 태그 < .클래스 < #아이디 < 인라인 스타일링 < !important
    
    </aside>
    
    <aside>
    💡 동일한 레벨에서는 나중에 작성한 스타일이 우선순위가 높다!
    
    </aside>
    
    - 동일 레벨 관련 부가 설명
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            .sweet-potato-class {
              color: red;
            }
        
            .sweet-potato-class {
              color: blue;
            }
          </style>
        </head>
        
        <body>
          <h1 class="sweet-potato-class">고구마 아이스크림 맛있다.</h1>
          <div>고구마 아이스크림 맛있다.<div>
        </body>
        
        </html>
        ```
        
        `.sweet-potato-class`에 처음에 red 색상을 적용하고 그 이후에 blue 색상을 정의했다. 동일한 클래스 레벨이므로, `늦게 작성한 blue가 적용`된다는 의미이다.
        
- box-sizing
    
    ### box-sizing
    
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
          margin-bottom: 10px;
        }
      </style>
    </head>
    
    <body>
      <div class="box box1">border-box</div>
      <div class="box box2">content-box</div>
    </body>
    
    </html>
    ```
    
    위와 같은 코드를 실행시켜 봅시다. **`box라는 공통 class`**를 갖고 있고, **`각각 box1, box2라는 다른 클래스`**를 갖고 있는 코드입니다. **`띄어쓰기를 통해 여러개의 클래스를 부여`**할 수 있습니다.
    
    ![스크린샷 2024-07-18 오후 6.22.38.png](attachment:ee36a669-bd40-4f67-bf94-6cfa140b3300:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.22.38.png)
    
    **`실제로 100(가로) X 100(세로) 크기의 박스를 만들었습니다.`**
    
    한번, box에 `padding`과 `border`를 적용시켜보겠습니다. 이전 박스와 크기의 차이를 잘 보셔야 합니다.
    
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
          margin-bottom: 10px;
          padding: 10px;
          border: 10px solid red;
        }
      </style>
    </head>
    
    <body>
      <div class="box box1">border-box</div>
      <div class="box box2">content-box</div>
    </body>
    
    </html>
    ```
    
    [화면 기록 2024-07-18 오후 6.24.41.mov](attachment:8f0a550d-af90-4d26-b6d7-e96477c411c1:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.24.41.mov)
    
    <aside>
    💡 border / padding 적용 이전
    ⇒ 100 X 100
    
    border / padding 적용 이후
    ⇒ 140 X 140
    
    </aside>
    
    위의 영상과 같이, 우리는 **`크기를 가로 세로 100px을 적용`**했지만,
    
    실제로 우리가 padding과 border를 추가로 적용했기에 상/하/좌/우 모두 padding의 10px, border의 10px씩 들어가 **`140 X 140으로 의도한 것과 다르게 변경됨을 확인`**할 수 있습니다.
    
    ![스크린샷 2024-07-18 오후 6.26.31.png](attachment:7d89d2a3-7355-4207-8357-b01e087d9aa1:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.26.31.png)
    
    크롬에서 화면에 오른쪽 클릭, **`개발자 도구`**, **`Elements의 왼쪽 부분에 있는 화살표 아이콘을 클릭`**하면, box 요소의 크기를 알 수 있습니다.
    
    ### border-box, content-box
    
    보통의 개발자라면, width: 100px, height: 100px을 선언함으로서 얻고자 하는 결과물은, border가 있든, padding이 있든간에 항상 100px을 유지하는 것을 원할 것 입니다.
    
    이렇게, 매번 padding / border을 추가할 떄 마다, 요소가 의도하지 않은 크기로 변경된다면, 개발하는데에 있어, HTML의 사이즈가 의도하지 않은대로 커지게 되며, HTML Flow가 영향을 받게 됩니다.
    
    이를 해결하기 위한 방안은, `border-box를 선언`하는 것 입니다.
    
    기본적으로 우리가 만든 box는 `box-sizing: content-box;` 로 선언되어 있습니다.
    
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
          margin-bottom: 10px;
          padding: 10px;
          border: 10px solid red;
        }
    
        .box1 {
          box-sizing: content-box;
        }
    
        .box2 {
          box-sizing: border-box;
        }
      </style>
    </head>
    
    <body>
      <div class="box box1">border-box</div>
      <div class="box box2">content-box</div>
    </body>
    
    </html>
    ```
    
    위의 코드를 적용시켜봅시다.
    
    ![스크린샷 2024-07-18 오후 6.32.59.png](attachment:fe6b3986-4b61-4e2c-8538-397dfcc9cec6:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.32.59.png)
    
    `border-box` 는 padding과, border가 있어도. 사용자가 지정한 width, height을 유지함을 알 수 있습니다.
    
- border / outline 🍠
    
    ### border vs outline
    
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
          outline: 10px solid red;
        }
      </style>
    </head>
    
    <body>
      <div class="box box1">border-box</div>
      <div class="box box2">content-box</div>
    </body>
    
    </html>
    ```
    
    위의 코드를 실행시키면, 아래의 이미지와 같은 결과물이 나오게 됩니다.
    
    ![스크린샷 2024-07-18 오후 6.39.15.png](attachment:8ab8a9b0-0b42-464b-b18b-54e50914ef1c:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.39.15.png)
    
    위의 **`box-sizing`** 설명 부분에서 제가 여러분들에게 워크북으로 설명 드린 것 처럼, 아래의 토글에 본인이 **`VSCode를 통해 여러번 실행시켜보며 개발자 도구와, 캡처한 이미지를 활용하여 어떠한 차이점을 갖고 있는지 상세하게 정리`**해주세요!
    
    - border vs outline의 차이점 🍠
        - Box-model
            - border
                
                요소의 박스 모델에 포함되며, 요소의 전체 크기에 영향을 주게 됌.
                
                border 두께가 추가되면 요소의 width와 height에도 추가됌.
                
            - outline
                
                요소의 박스 모델 외부에 그려지므로, 요소의 크기나 레이아웃에 영향을 주지 않음
                
        - 스타일링 방식
            - border
                
                각 면에 대해 별도로 스타일, 두께, 색상을 지정할 수 있으며, border-radius를 사용해 둥근 모서리도 적용 가능
                
            - outline
                
                하나의 단일 선으로 전체 요소를 둘러싸며, 각 면 별로 세밀하게 조정 불가
                
                대부분의 경우 둥근 모서리를 지원 x
                
        
        레퍼런스 : https://velog.io/@wonyuuu/CSS-border-outline-%EB%B9%84%EA%B5%90
        
- relative / absolute 🍠
    
    ### relative / absolute
    
    ### - relative 설명
    
    <aside>
    💡 **`relative` : Document Flow에 따라, 원래 본인이 있어야 할 곳을 기준으로, 좌표 프로퍼티(top / bottom / left / right) css style을 통해 위치를 이동시키는 속성.**
    
    </aside>
    
    ### 1. relative 실습
    
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
        }
      </style>
    </head>
    
    <body>
      <div class="box">BOX</div>
      <h1>고구마 상자</h1>
    </body>
    
    </html>
    ```
    
    위의 코드를 실행하면 아래와 같은 화면이 출력됩니다.
    
    ![스크린샷 2024-07-18 오후 6.54.25.png](attachment:9afde3c4-1322-40ff-b7d6-6c7ca24dbde4:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.54.25.png)
    
    보라색 박스를 위에서 50px 만큼 아래로 내리고 싶고, 왼쪽에서 50px만큼 오른쪽으로 밀고 싶다면 아래와 같은 속성을 적용하면 됩니다. (relative를 설정해주어야합니다.)
    
    <aside>
    💡 위 → 아래 (top css 적용)
    왼쪽 → 오른쪽 (left css 적용)
    
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
          top: 50px;
          left: 50px;
        }
      </style>
    </head>
    
    <body>
      <div class="box">BOX</div>
      <h1>고구마 상자</h1>
    </body>
    
    </html>
    ```
    
    ![스크린샷 2024-07-18 오후 6.56.12.png](attachment:b4018543-15bf-451e-921c-e4530f3645de:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.56.12.png)
    
    <aside>
    💡 Q: 그럼, 한번 여러분들이 이번에는 위의 이미지 상태에서 고구마 상자를 아래와 같은 이미지 처럼 이동시켜 주세요. 
    
    Hint: `bottom`과 `right` 속성을 활용해서 진행해주세요. 필요시 고구마 상자 글씨 태그에 class 명을 부여해도 좋습니다.
    
    ⭐️ 꼭 양수만 사용할 수 있는 것은 아닙니다! ⭐️
    
    </aside>
    
    ![스크린샷 2024-07-18 오후 6.57.43.png](attachment:fd7e2bc8-0597-4eff-a26b-0ffbffe17e43:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.57.43.png)
    
    - 코드를 첨부해주세요 🍠
        
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
              bottom: -150px;
              right : -50px;
            }
            .text{
                position: relative;
                right : -50px;
            }
          </style>
        </head>
        
        <body>
          <div class="box">BOX</div>
          <h1 class="text">고구마 상자</h1>
        </body>
        
        </html>
        ```
        
    
    ### - absolute 설명
    
    <aside>
    💡 **`absolute` : Document Flow에 제외 되며, `position: static`이 아닌, 즉 position이 `relative`, `absolute`, `fixed`인 부모 요소 또는 조상 요소중 선택하여 해당 요소를 기준으로 좌표 프로퍼티(top, bottom, left, right)를 사용해 위치를 이동한다. 따라서 부모 요소를 기준으로 위치를 이동할 경우, 해당 부모 요소에 `position: relative`를 선언해야 한다.**
    
    </aside>
    
    - 부모 요소가 정해지는 방식
        
        자신의 조상 요소들 중에서 position 속성이 static이 아닌(즉, relative, absolute, fixed, sticky로 지정된) 가장 가까운 요소가 부모 요소가 됌!
        
        만약, 위 조건에 해당되는 조상 요소가 없다면 뷰포트(문서 창)를 기준으로 위치를 계산함!
        
    
    ### 2. absolute 실습
    
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
    
    위의 코드를 실행하면 아래와 같은 화면이 보입니다.
    
    ![스크린샷 2024-07-18 오후 7.12.14.png](attachment:8af63428-2ea1-455d-94e5-52da156d58f6:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.12.14.png)
    
    - **`position: absolute`**를 활용하여 본인의 힘으로, 아래와 같은 이미지로 BOX2를 이동시켜보세요! 🍠
        
        ![스크린샷 2024-07-18 오후 7.13.52.png](attachment:5a810066-8c42-4e8a-a2ac-fe8757085432:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.13.52.png)
        
        ### 코드는 아래에 첨부해주세요!
        
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
        
    
- fixed / sticky
    
    ### fixed
    
    **`fixed`**: 부모 요소와 관계없이 viewport를 기준으로, 화면상의 특정한 위치에 위치가 고정됩니다. 
    
    <aside>
    💡 fixed는 Document Flow에서의 Postion의 위치를 빠져나옵니다.
    
    </aside>
    
    ### fixed 실습
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Position: Sticky</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
        }
    
        .container {
          width: 100%;
          height: 100%;
          padding: 10px;
          background-color: greenyellow;
        }
    
        .box {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
          background-color: lightgoldenrodyellow;
        }
    
        .box2 {
          background-color: purple;
          position: fixed;
          top: 40px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
        <div class="box box4"></div>
        <div class="box box5"></div>
        <div class="box box6"></div>
        <div class="box box7"></div>
        <div class="box box8"></div>
        <div class="box box9"></div>
        <div class="box box10"></div>
        <div class="box box11"></div>
        <div class="box box12"></div>
        <div class="box box13"></div>
        <div class="box box14"></div>
        <div class="box box15"></div>
        <div class="box box16"></div>
      </div>
    </body>
    
    </html>
    ```
    
    아래 영상 처럼, 기존 문서대열에서 벗어난 것을 확인할 수 있습니다.
    
    [화면 기록 2024-07-18 오후 7.33.31.mov](attachment:85c5de66-126d-432f-98aa-8662c1ccb283:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.33.31.mov)
    
    ### sticky
    
    **`sticky`**: relative와 fixed 속성이 혼합된 속성이라고 생각하면 이해가 쉽습니다. 일반적인 상황에서는 relative 처럼 동작하여, 요소가 원래 위치에서 움직이지만, 특정 스크롤 위치에 도달하면 fixed 처럼 화면에 고정되어 움직이지 않습니다.
    
    <aside>
    💡 sticky는 기존 Document Flow에서의 Position을 유지합니다.
    즉 아래 코드를 실행 시키면, 브라우저 밖으로 빠져나가기 top: 40px 전에 sticky 하게 고정시킵니다.
    
    </aside>
    
    ### sticky 실습
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Position: Sticky</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
        }
    
        .container {
          width: 100%;
          height: 100%;
          padding: 10px;
          background-color: greenyellow;
        }
    
        .box {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
          background-color: lightgoldenrodyellow;
        }
    
        .box2 {
          background-color: purple;
          position: sticky;
          top: 40px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
        <div class="box box4"></div>
        <div class="box box5"></div>
        <div class="box box6"></div>
        <div class="box box7"></div>
        <div class="box box8"></div>
        <div class="box box9"></div>
        <div class="box box10"></div>
        <div class="box box11"></div>
        <div class="box box12"></div>
        <div class="box box13"></div>
        <div class="box box14"></div>
        <div class="box box15"></div>
        <div class="box box16"></div>
      </div>
    </body>
    
    </html>
    ```
    
    [화면 기록 2024-07-18 오후 7.26.06.mov](attachment:39321339-f7fb-43f2-a3e4-dffbd28a8f68:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.26.06.mov)
    
- 정렬의 진수 🍠
    
    ### 다양한 정렬 방법
    
    해당 키워드는 앞으로, 프론트엔드 개발에 있어 매우 중요한 부분입니다. 다양한 정렬 테크닉들을 활용해서, 앞으로 여러분들은, 개발을 진행하시게 될 것 입니다.
    
    이번 부분은, 설명보다, 직접 여러분들이 다양한 자료들을 보시며, 실습해보며 개인적으로 깨닫는 것이 중요한 챕터라고 생각하여, 키워드를 정리해주시면서, 가운데 정렬을 도전해본 영상들을 남겨주시면 됩니다.
    
    ### 키워드 정리 🍠
    
    - text-align
        
        : 블록 컨테이너 내부의 인라인 콘텐츠(텍스트, 인라인 요소 등)의 수평 정렬을 제어하는 데 사용
        
    - margin
        
        : 요소의 외부 여백(바깥쪽 간격)을 설정하는 데 사용
        
    - flex
        
        : Flexbox 레이아웃에서 flex 아이템의 크기와 동작을 한 번에 설정할 수 있는 단축 속성
        
        1. **flex-grow**
            1. 아이템이 남는 공간을 얼마나 확장할 지 결정
            2. 기본값은 0이며, 값이 클수록 더 많은 남은 공간을 차지함
        2. **flex-shrink**
            1. 컨테이너의 공간이 부족할 때 아이템이 얼마나 줄어들지 결정
            2. 기본값은 1이며, 0으로 설정하면 줄어들지 않음
        3. **flex-basis**
            1. 아이템의 초기 기본 크기 지정
            2. 기본값은 auto로, 아이템의 원래 크기(또는 콘텐츠의 크기)를 기준으로 설정
            3. 고정값(예: 100px)이나 비율(%)로 지정할 수도 있음
    - translate
        
        : 요소를 이동시키기 위한 함수
        
        요소를 X축, Y축 (또는 3D의 경우 Z축) 방향으로 이동시킴
        
        브라우저 호환성을 고려해야 하며, 지원되지 않는 환경에서는 transform 속성을 사용해야함!
        
        ```css
        /* CSS Transforms Module Level 2에 따른 사용 (지원하는 브라우저에서만 작동) */
        .element-3d {
          translate: 20px 10px 5px; /* X, Y, Z 축 각각 이동 */
        }
        
        /* 호환성 고려 */
        .element {
          transform: translate(20px, 10px);
        }
        ```
        
    - grid
        
        : 2차원(행과 열) 레이아웃 시스템
        
        Flexbox가 주로 1차원 레이아웃(행 또는 열)에 적합하다면, Grid는 행과 열 모두를 제어할 수 있어 복잡한 레이아웃 구성에 유리!
        
    
    ### 위의 키워드를 각각 활용해서 가운데 정렬을 해주세요! 🍠
    
    <aside>
    💡 html 요소는 여러분들이 직접 만드셔서, 가운데 정렬을 한 영상과 코드만 남겨주시면 됩니다.
    향후 학습에 있어서, 매우 중요한 부분이니, 많은 실습 부탁드립니다!
    
    </aside>
    
    - text-align
        
        : 블록 컨테이너 내부의 인라인 콘텐츠(텍스트, 인라인 요소 등)의 수평 정렬을 제어하는 데 사용
        
    - margin
        
        : 요소의 외부 여백(바깥쪽 간격)을 설정하는 데 사용
        
    - flex
        
        : Flexbox 레이아웃에서 flex 아이템의 크기와 동작을 한 번에 설정할 수 있는 단축 속성
        
        1. **flex-grow**
            1. 아이템이 남는 공간을 얼마나 확장할 지 결정
            2. 기본값은 0이며, 값이 클수록 더 많은 남은 공간을 차지함
        2. **flex-shrink**
            1. 컨테이너의 공간이 부족할 때 아이템이 얼마나 줄어들지 결정
            2. 기본값은 1이며, 0으로 설정하면 줄어들지 않음
        3. **flex-basis**
            1. 아이템의 초기 기본 크기 지정
            2. 기본값은 auto로, 아이템의 원래 크기(또는 콘텐츠의 크기)를 기준으로 설정
            3. 고정값(예: 100px)이나 비율(%)로 지정할 수도 있음
    - translate
        
        : 요소를 이동시키기 위한 함수
        
        요소를 X축, Y축 (또는 3D의 경우 Z축) 방향으로 이동시킴
        
        브라우저 호환성을 고려해야 하며, 지원되지 않는 환경에서는 transform 속성을 사용해야함!
        
        ```css
        /* CSS Transforms Module Level 2에 따른 사용 (지원하는 브라우저에서만 작동) */
        .element-3d {
          translate: 20px 10px 5px; /* X, Y, Z 축 각각 이동 */
        }
        
        /* 호환성 고려 */
        .element {
          transform: translate(20px, 10px);
        }
        ```
        
    - grid
        
        : 2차원(행과 열) 레이아웃 시스템
        
        Flexbox가 주로 1차원 레이아웃(행 또는 열)에 적합하다면, Grid는 행과 열 모두를 제어할 수 있어 복잡한 레이아웃 구성에 유리!
        
    - 실습 코드
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CSS Practice: text-align, margin, flex, translate, grid</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f2f2f2;
              margin: 0;
              padding: 20px;
            }
            h2 {
              margin-top: 40px;
            }
        
            .text-align {
              border: 2px solid #333;
              padding: 20px;
              margin-bottom: 20px;
              text-align: center;
            }
        
            .margin {
              border: 2px dashed #0077cc;
              width: 300px;
              padding: 20px;
              margin: 20px auto;
              text-align: center;
            }
        
            .flex {
              display: flex;
              justify-content: space-around;
              align-items: center;
              background: #e0e0e0;
              padding: 20px;
              margin-bottom: 20px;
            }
            .item {
              background: #0a14a2;
              color: white;
              padding: 20px;
              margin: 10px;
            }
        
            .translate {
              position: relative;
              border: 2px solid #333;
              height: 150px;
              margin-bottom: 20px;
              overflow: hidden;
            }
        
            .trans-item {
              position: absolute;
              background: #ff5959;
              color: white;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
        
            .grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              margin-bottom: 20px;
              place-items: center;
            }
            .grid-demo .grid-item {
              background: #3eb7fd;
              color: white;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h2>Text Align</h2>
          <div class="text-align">중앙 정렬</div>
        
          <h2>Margin</h2>
          <div class="margin">마진 중앙 정렬</div>
        
          <h2>Flex</h2>
          <div class="flex">
            <div class="item">Flex 중앙 정렬</div>
          </div>
        
          <h2>Translate</h2>
          <div class="translate">
            <div class="trans-item">Translate 중앙 정렬</div>
          </div>
        
          <h2>Grid</h2>
          <div class="grid">
            <div class="grid-item"></div>
            <div class="grid-item">Grid 중앙 정렬</div>
            <div class="grid-item"></div>
          </div>
        </body>
        </html>
        ```
        
    - 실습 영상
        
        [화면 기록 2025-03-23 오후 7.19.11.mov](attachment:8329ad82-eacf-4199-994c-218ad2c02c2d:화면_기록_2025-03-23_오후_7.19.11.mov)
        
- 반응형 background 🍠
    - background-image
        
        : 요소의 배경에 이미지를 설정
        
        ```css
        // 예시
        
        .example {
          background-image: url('example.jpg');
        }
        ```
        
    - background-repeat
        
        : 배경 이미지의 반복 여부 지정
        
        - 주요 옵션
            - repeat: 이미지가 수평, 수직 모두 반복 (default)
            - repeat-x: 수평으로만 반복
            - repeat-y: 수직으로만 반복
            - no-repeat: 반복하지 않음
        
        ```css
        // 예시
        
        .example {
          background-image: url('example.jpg');
          background-repeat: repeat; /* 수평 수직 모두 반복 */ 
        }
        ```
        
    - background-position
        
        : 배경 이미지의 시작 위치 지정
        
        ```css
        // 예시
        
        .example {
          background-image: url('example.jpg');
          background-repeat: repeat; /* 수평 수직 모두 반복 */ 
          background-position: center center; /* 50% 50% 과 같은 옵션도 가능 */
        }
        ```
        
    - background-size
        
        : 배경 이미지의 크기 조절
        
        - 주요 옵션
            - auto: 원본 크기 유지 (default)
            - cover: 요소 전체를 덮도록 이미지 크기 조절 (비율 유지, 잘릴 수 있음)
            - contain: 이미지 전체가 보이도록 크기 조절 (비율 유지, 여백 발생 가능)
            - 구체적인 값이나 백분율(50% 50%)을 지정 가능
        
        ```css
        // 예시
        
        .example {
          background-image: url('example.jpg');
          background-repeat: repeat; /* 수평 수직 모두 반복 */ 
          background-position: center center; /* 50% 50% 과 같은 옵션도 가능 */
          background-size: cover;
        }
        ```
        
    - 축약형
        
        : background 관련 속성을 한 줄에 축약해서 사용 가능
        
        ```css
        // 기본형
        background: [background-color] [background-image] [background-position] / [background-size] [background-repeat];
        ```
        
        ```css
        // 예시
        // example1과 example2는 동일한 코드
        
        .example1 {
          background-image: url('example.jpg');
          background-repeat: repeat; /* 수평 수직 모두 반복 */ 
          background-position: center center; /* 50% 50% 과 같은 옵션도 가능 */
          background-size: cover;
        }
        
        .example2 {
          background: url('example.jpg') center/cover repeat;
        }
        ```
        
- transform 🍠
    
    ### transform 🍠
    
    CSS transform 속성으로, 요소에 회전 크기 조절, 기울이기, 이동 효과를 부여할 수 있습니다. `transform`은 CSS [시각적 서식 모델](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model)의 좌표 공간을 변경합니다.
    
    <aside>
    💡  아래 키워드를 실습한 사진과 코드를 남겨주세요!
    
    </aside>
    
    - translate
        
        : 요소를 좌우로 이동시키는 명령어
        
    - scale
        
        : 요소의 크기를 확대 혹은 축소시키는 명령어
        
    - rotate
        
        : 요소의 일정 각도만큼 회전시키는 명령어
        
    - skew
        
        : 요소를 X축 혹은 Y축으로 일정 각도만큼 기울이는 명령어
        
    - matrix
        
        : transform의 모든 속성을 하나로 결합한 일종의 축약형!
        
    - 실습 사진
        
        ![스크린샷 2025-03-23 오후 9.02.16.png](attachment:b46f48b3-6e02-44dc-a0f4-ffe148b98b2a:스크린샷_2025-03-23_오후_9.02.16.png)
        
    - 실습 코드
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>CSS Transform</title>
          <style>
            body {
              font-family: sans-serif;
              background: #f2f2f2;
              padding: 20px;
            }
            h2 {
              margin-bottom: 20px;
            }
            .container {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
            }
            .box {
              width: 100px;
              height: 100px;
              background-color: #4CAF50;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #333;
            }
            .translate {
              transform: translate(50px, 20px);
            }
            .scale {
              transform: scale(1.5);
                margin-top: 160px;
            }
            .rotate {
              transform: rotate(45deg);
            }
            .skew {
              transform: skew(20deg, 10deg);
            }
            .matrix {
              transform: matrix(1, 0.5, -0.5, 1, 30, 20);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="box translate">Translate</div>
            <div class="box scale">Scale</div>
            <div class="box rotate">Rotate</div>
            <div class="box skew">Skew</div>
            <div class="box matrix">Matrix</div>
          </div>
        </body>
        </html>
        ```
        
    
    [transform - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
    
- transition 🍠
    
    ### transition  🍠
    
    <aside>
    💡 아래 키워드에 대해 학습한 후, 실습을 진행해주시고, 코드와 실행 영상을 남겨주세요!
    
    </aside>
    
    - transition-property
        
        : transition이 적용될 CSS 속성을 지정
        
    - transition-duration
        
        : transition 효과가 실행되는 총 시간 지정
        
    - transition-timing-function
        
        : transition 효과가 진행되는 속도 곡선을 지정하여, 애니메이션의 가속/감속 효과 조절
        
        - 주요 옵션
            - linear: 일정 속도로 진행
            - ease: 느리게 시작, 빠르게 진행 후 느리게 끝남
            - ease-in: 느리게 시작
            - ease-out: 느리게 끝남
            - ease-in-out: 느리게 시작하고 끝남
    - transition-delay
        
        : transition 효과가 시작되기 전에 대기할 시간 지정
        
    - transition-behavior
        
        : 개별 속성에 전환을 시작할지 여부를 지정. `normal` 및 `allow-discrete` 두 개의 값을 허용하며 초깃값은 `normal`
        
    
    ### 실습  🍠
    
    **`transition`** 키워드를 학습한 후, 해당 키워드와, **`transform에서 배운 특정 키워드를 활용`**하여, 아래와 같은 영상과 비슷하게 만들어주세요! (똑같을 필요는 없고, 기능만 같으면 됩니다.)
    
    단, **`transition 축약형`**을 사용해주세요!
    
    [화면 기록 2024-07-18 오후 7.51.38.mov](attachment:e6dc806f-17a6-483d-b55e-e3ae81b0d27c:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.51.38.mov)
    
    - 코드 첨부 🍠
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>CSS Transform</title>
          <style>
            body {
              font-family: sans-serif;
              background: #f2f2f2;
              padding: 20px;
            }
            h2 {
              margin-bottom: 20px;
            }
            .container {
              display: flex;
              flex-direction: column;
              gap: 45px;
            }
            .box {
              width: 100px;
              height: 100px;
              background-color: #ffb0da;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              transform: rotate(45deg);
              transition: background-color, 1s;
            }
            .box:hover{
                background-color: #cf1bcc;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
          </div>
        </body>
        </html>
        ```
        
    - 실행 영상 첨부 🍠
        
        [화면 기록 2025-03-23 오후 10.19.03.mov](attachment:c5981b8b-2c78-4883-b992-e0bf649d306b:화면_기록_2025-03-23_오후_10.19.03.mov)
        
- animation 🍠
    
    ### animation 🍠
    
    <aside>
    💡 아래 키워드에 대해 학습한 후, 실습을 진행하시고 코드와 실행 영상을 남겨주세요!
    
    </aside>
    
    - animation-name
        
        : 애니메이션 효과를 적용할 때 사용할 애니메이션 이름 지정
        
    - animation-duration
        
        : 애니메이션 한 사이클(한번의 전체 진행)이 완료되는 데 걸리는 시간 지정
        
    - animation-delay
        
        : 애니메이션 시작 전에 대기할 시간 지정
        
    - animation-direction
        
        : 애니메이션이 진행되는 방향 제어
        
        - 주요 옵션
            - normal: 애니메이션이 정방향으로 진행
            - reverse: 애니메이션이 반대 방향으로 진행
            - alternate: 애니메이션이 한 사이클은 정방향, 다음 사이클은 반대 방향으로 진행
            - alternate-reverse: 애니메이션이 첫 사이클은 반대 방향, 그 다음 사이클은 정방향으로 진행
    - animation-iteration-count
        
        : 애니메이션이 반복되는 횟수 지정
        
    - animation-play-state
        
        : 애니메이션의 재생 상태 제어
        
        - 주요 옵션
            - running: 애니메이션이 실행중(Default)
            - paused: 애니메이션이 일시 중지됨
    - animation-timing-function
        
        : 애니메이션 진행 속도(타이밍 함수)를 지정하여, 애니메이션이 시작, 중간, 끝나는 방식(가속/감속)을 결정
        
        - 주요 옵션
            - linear: 일정한 속도
            - ease: 기본 가속/감속 효과 (느리게 시작, 빠르게 진행, 느리게 끝남)
            - ease-in: 느리게 시작
            - ease-out: 느리게 끝남
            - ease-in-out: 느리게 시작하고 느리게 끝남
            - cubic-bezier(...): 사용자 정의 타이밍 함수
    - animation-fill-mode
        
        : 애니메이션이 시작되기 전과 종료된 후에 요소에 어떤 스타일이 적용될지를 결정
        
        - 주요 옵션
            - none (기본값): 애니메이션 전후에 애니메이션 스타일이 적용되지 않음
            - forwards: 애니메이션이 끝난 후 마지막 keyframe의 스타일을 유지
            - backwards: 애니메이션 시작 전 첫 번째 keyframe의 스타일을 적용
            - both: forwards와 backwards 모두 적용
    - @keyframes
        
        : 애니메이션의 중간 상태를 정의하는 규칙. 시작부터 끝까지의 스타일 변화를 키프레임 단위로 지정
        
    - 축약형
        
        : 여러 개별 애니메이션 속성을 한 번에 설정할 수 있는 단축 속성
        
        ```css
        // 사용법
        animation: [animation-name] [animation-duration] [animation-timing-function] [animation-delay] [animation-iteration-count] [animation-direction] [animation-fill-mode] [animation-play-state];
        ```
        
    
    ### 실습  🍠
    
     **`animation 키워드`**를 학습한 후, 아래와 비슷한 영상을 만들어주세요!
    
    단, **`animation 축약형`**을 사용해주세요!
    
    - [x]  원은 어떻게 만들까요?
    - Hint
        
        **`border-radius` 를 활용해봅시다~!**
        
    - [x]  계속 튀기는 애니메이션은 어떻게 하면 쉽게 만들까요?
    - Hint
        
        `infinte`, `alternate` 속성을 활용해봅시다!
        
    
    [화면 기록 2024-07-18 오후 8.01.20.mov](attachment:6c0aa987-9afa-4c7b-8096-51940175eeb4:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.01.20.mov)
    
    - 코드 첨부 🍠
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>CSS Animation</title>
          <style>
            @keyframes ball {
               0% { top:0px; }
               95% { width: 100px; }
               to {
                  top:200px;
                  width:100px;
                  height:70px;
               } 
            }
         
            .box {
               width: 200px;
               height: 200px;
               margin: 80px;
            }
         
            .ball {
               position:relative;
               left: 100px;
               top:0;
               width:100px;
               height:100px;
               border-radius:50%;
               background:#640a91;
               /* Infinite(무한 반복) / Alternate(순방향으로 애니메이션을 시작해서 역방향으로 번갈아 애니메이션 재생) */
               animation:ball 1s ease-in Infinite Alternate;
            }
         </style>
        </head>
        <body>
            <div class="box">
                <div class="ball"></div>
             </div>
        </body>
        </html>
        ```
        
    - 실행 영상 첨부 🍠
        
        [화면 기록 2025-03-23 오후 10.40.26.mov](attachment:6e0cbe2b-a3fd-4104-a380-570b022eda48:화면_기록_2025-03-23_오후_10.40.26.mov)