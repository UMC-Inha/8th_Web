- border vs outline의 차이점 🍠
    
    border는 박스 내부에서 감싸는 테두리이고 outline은 박스 바깥쪽에 그려지는 테두리임. 따라서 border는 박스의 크기에 포함되고, outline은 그렇지 않다. 
    
    outline은 구조 안쪽에 영향을 주지 않고싶을 때 사용.


**1. relative 실습**


- 코드를 첨부해주세요 🍠
    
    ```jsx
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
          
          bottom: -155px;
          right: -2px;
    
        }
      </style>
    </head>
    
    <body>
      <div class="box">BOX</div>
      <h1>고구마 상자</h1>
    </body>
    
    </html>
    ```
    
**2. absoolute 실습**

- **`position: absolute`**를 활용하여 본인의 힘으로, 아래와 같은 이미지로 BOX2를 이동시켜보세요! 🍠
    
    ![스크린샷 2024-07-18 오후 7.13.52.png](attachment:5a810066-8c42-4e8a-a2ac-fe8757085432:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.13.52.png)
    

    
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
          position: absolute;
        }
    
        .box2 {
          width: 200px;
          height: 200px;
          background-color: yellow;
          position: relative;
          
    
        }
      </style>
    </head>
    
    <body>
      <div class="box1">BOX1</div>
      <h1 class="box2">BOX2</h1>
    </body>
    
    </html>
    ```


### 정렬 키워드 정리 🍠

- text-align
    
    텍스트를 수평 정렬하는 속성. 주로 block 요소의 내부 텍스트를 정렬하는 데 사용됨.
    
    left : 텍스트 왼쪽 정렬
    
    right : 텍스트 오른쪽 정렬
    
    center : 텍스트 가운데 정렬 
    
    justify : 텍스트 양쪽 정렬
    
- margin
    
    HTML요소의 바깥쪽 여백을 조절하는 속성. 요소와 요소의 간격을 조절할 때 사용됨.
    
    ex) margin : 10px 10px 10px 10px; (상 하 좌 우에 10px 여백 적용)
    
          margin : auto  가로 중앙 정렬
    
    margin은 요소의 바깥쪽 여백을 조절하여 다른 요소와의 거리를 조절하는 반면,
    
    padding은 요소의 안쪽 여백을 조절하여 해당 요소와 그 테두리 사이의 거리를 조절함.
    
- flex
    
    display : flex; 를 사용하여 flex container를 만들 수 있음.
    
     flex container 안의 아이템들이 배치된 방향의 축을 메인 축(Main Axis), 
    
    메인 축과 수직인 축을 수직 축(Cross Axis) 라고 함. 
    
    flex direction: 아이템들이 배치되는 축의 방향을 결정하는 속성.
    
    - row : 왼→오 (기본값)
    - row-reverse : 오→왼
    - column : 위→아래
    - column-reverse : 아래→위
    
    flex-wrap : 컨테이너의 크기가 부족해 아이템을 한 줄에 담을 수 없을 때, 아이템의 줄 바꿈을 어떻게 할 지 결정하는 속성.
    
    - nowrap : 줄바꿈 안함. 넘치면 삐져나감.
    - wrap : 줄바꿈을 함. 넘치는 부분을 아래로 넘겨줌.
    - wrap-reverse : 줄바꿈을 함. 대신, 아이템을 역순으로 배치함.
    
            ex) A  B  C 에서 C 를 줄바꿈 해야할 때 C     의 모양으로 줄바꿈 됨
    
                                                                                   A  B  
    
    flex-flow : flex -direction과 flex-wrap을 한꺼번에 지정할 수 있는 단축 속성.
    
    justify : 메인 축 방향으로 정렬.
    
    ```html
    container {
    	justify-content: flex-start;  // 아이템을 시작점으로 정렬.
    	/* justify-content: flex-end; */  // 아이템을 끝점으로 정렬
    	/* justify-content: center; */ // 가운데로 정렬
    	/* justify-content: space-between; */ // 아이템 사이사이에 균일한 간격 생성
    	/* justify-content: space-around; */ // 아이템의 둘레에 균일한 간격 생성
    	/* justify-content: space-evenly; */ // 아이템 사이와 양 끝에 균일한 간격 생성
    }
    ```
    
    align : 수직 축 방향으로 정렬.
    
    ```html
    .container {
    	align-items: stretch; //아이템이 수직 축 방향으로 끝까지 늘어남
    	/* align-items: flex-start; */ // 아이템이 시작점으로 정렬
    	/* align-items: flex-end; */ // 아이템이 끝으로 정
    	/* align-items: center; */ // 수직 방향으로 가운데 정렬
    	/* align-items: baseline; */ // 텍스트 베이스라인 기준으로 정
    }
    ```
    
- translate
    
    translate(x,y) 현재 위치로부터 x,y 축으로 특정 거리만큼 이동 가능.
    
    translate3d(x,y,z) 3차원 x,,y,x 축으로 이동가능
    
- grid
    
    Grid Container : grid의 부모 요소 grid를 적용하는 전체 영역. grid 컨테이너 안의 요소들이 grid 규칙의 영향을 받아 정렬됨. 
    
    Grid Item : 컨테이너의 자식 요소. grid 규칙에 의해 배치됨. 
    
    display : grid;  설정하는 것으로 시작. (Flex와 마찬가지)
    
    grid track : 그리드의 행 또는 열.
    
    grid cell :  그리드의 한 칸을 일컫는 말. div와 같은 실제 html 요소는 그리드 아이템이고 , 이런 그리드 아이템이 들어가는 가상의 칸을 말함.
    
    grid line : 그리드 셀을 구분하는 선.
    
    grid gap : 셀 사이의 간격.
    
    grid area : 그리드 라인으로 둘러싸인 사각형 영역. 그리드 셀의 집합.
    
    그리드 형태 정의 : 
    
    grid-template-rows
    
    grid-template-columns
    
    컨테이너에 grid 트랙의 크기를 지정해주는 속성.
    
    rows 는 행의 배치.  column은 열의 배치
    
    ```html
    container {
    	grid-template-columns: 200px 200px 500px;
    	/* grid-template-columns: 1fr 1fr 1fr */
    	/* grid-template-columns: repeat(3, 1fr) */
    	/* grid-template-columns: 200px 1fr */
    	/* grid-template-columns: 100px 200px auto */
    
    	grid-template-rows: 200px 200px 500px;
    	/* grid-template-rows: 1fr 1fr 1fr */
    	/* grid-template-rows: repeat(3, 1fr) */
    	/* grid-template-rows: 200px 1fr */
    	/* grid-template-rows: 100px 200px auto */
    }
    ```
    
    위 코드에서  fr은 비율을 나타냄. 
    
    1fr 1fr 1fr 은 1:1:1, 50px 1fr 1fr 은 50px 와 나머지 트랙은 1:1 크기로 나눈다는 뜻.
    
    repeat는 반복해서 나오는 값을 축약해주는 함수.
    
    ex)  1fr 1fr 1fr 1fr 1fr 이면 repeat(5,1fr) 으로 나타낼 수 있음.
    
    minmax는 최솟값과 최댓값 지정 함수. 
    
    ex) minmax (200px, auto) 면 최소는 200px 으로 정하고 최대는 자동으로 늘어난다는 뜻. 
    
    auto-fill, auto fit
    
    auto-fill: column 개수를 정하지 않고 설정된 너비가 허용되는 한 최대한 셀을 채움. 
    
    만약 auto-fill의 너비가 10%면 10개의 column이 들어가게됨.
    
    auto-fit : auto-fill 을 사용했을 때 셀의 개수가 부족하면 빈 자리가 생기는데, 그 빈자리를 채워주는게 auto-fit.
    
    row-gap    column-gap
    
    그리드 셀 사이의 간격 설정
    
    행간격은 row-gap ,열간격은 column gap..
    
    ex) row-gap : 20px;  colume-gap : 20px
    
    각각 20px 씩 간격 설정.


    ## 반응형 background 🍠


    - background-image
        
        요소의 배경에 이미지를 추가하는 속성.
        
        url( ) 안에 이미지 경로를 넣어 사용함.
        
        ex) background-image : url(’background.jpg;);
        
    - background-repeat
        
        배경 이미지가 반복되는 방식을 결정함,
        
        repeat : 기본값 이미지를 가로와 세로로 반복
        
        repeat-x : 이미지를 가로 방향으로만 반복
        
        repeat-y : 이미지를 세로 방향으로만 반복
        
        no-repeat : 반복 없이 한 번만 표시
        
    - background-position
        
        배경 이미지의 위치를 설정하여 원하는 곳에 배치하고싶을 때 사용. 
        
        left top : 왼쪽 상단
        
        center center : 중앙 배치
        
        right bottom : 오른쪽 하단
        
        50% 50% :  X, Y 좌표 비율( 가운데 정렬)
        
        px, em, % : 특정 위치 지정
        
    - background-size
        
        배경 이미지를 요소 크기에 맞게 조절할 때 사용
        
        auto : 원본 크기 유지 (기본값)
        
        cover : 요소 전체를 덮도록 크기 조정 (비율 유지)
        
        contain :  요소 안에 맞추되, 이미지가 잘리지 않음
        
        100% 100% : 요소의 가로,세로 크기에 맞춤 (비율 무시)
        
    - 축약형
        
        여러 개의 background 속성을 한 줄로 축약하여 작성 가능.
        
        ex) 
        
        ```html
        background:  url('background.jpg') center/cover no-repeat fixed; 
        
        ```


        - transform 🍠
    


    ### transform 🍠
    
    CSS transform 속성으로, 요소에 회전 크기 조절, 기울이기, 이동 효과를 부여할 수 있습니다. `transform`은 CSS [시각적 서식 모델](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model)의 좌표 공간을 변경합니다.
    
    <aside>
    💡  아래 키워드를 실습한 사진과 코드를 남겨주세요!
    
    </aside>
    
    - translate
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>translate</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                
                transform: translate(200%,20px);
               }
                
        
                
            </style>
        </head>
        
        <body>
            <div class="box">translate</div>
        </body>
        
        ```
        
        ![스크린샷 2025-03-17 165540.png](attachment:c621ad9b-927a-4a19-9bca-29997b0a4916:스크린샷_2025-03-17_165540.png)
        
    - scale
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>scale</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                
                transform: scale(1.5,1.5);
               }
                
        
                
            </style>
        </head>
        
        <body>
            <div class="box">scale</div>
        </body>
        
        ```
        
        ![스크린샷 2025-03-17 221532.png](attachment:a5d09eba-f38c-4bf7-b3fe-da111541592a:스크린샷_2025-03-17_221532.png)
        
    - rotate
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>rotate</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                
                transform: scale(1.5,1.5);
                transform: rotate(45deg);
               }
                
        
                
            </style>
        </head>
        
        <body>
            <div class="box">rotate</div>
        </body>
        
        ```
        
        ![스크린샷 2025-03-17 222205.png](attachment:22f3ab84-a1a0-4199-9c07-8f87413391f1:스크린샷_2025-03-17_222205.png)
        
    - skew
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>rotate</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                
                transform: scale(1.5,1.5);
                transform: skew(20deg,20deg);
               }
                
        
                
            </style>
        </head>
        
        <body>
            <div class="box">rotate</div>
        </body>
        
        ```
        
        ![스크린샷 2025-03-17 222416.png](attachment:ef319d4f-69c2-41ee-97a8-0ad930ff928b:스크린샷_2025-03-17_222416.png)
        
    - matrix
        
    ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>matrix</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                    
                transform: matrix(2,1.0,0.5,2,100,100)
               }
                
        
                
            </style>
        </head>
        
        <body>
            <div class="box">matrix</div>
        </body>
        
        ```
        
        ![스크린샷 2025-03-17 222657.png](attachment:49faa6ef-4c6c-479a-9757-6a7684639867:스크린샷_2025-03-17_222657.png)
        
    
    [transform - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)



## transition 🍠
    
    ### transition  🍠
    
    <aside>
    💡 아래 키워드에 대해 학습한 후, 실습을 진행해주시고, 코드와 실행 영상을 남겨주세요!
    
    </aside>
    
- transition-property
        
    ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>rotate</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                
                transition: background-color 0.5s ease-in-out;
               }
                .box:hover{
                    background-color: blueviolet;
        
                }
        
                
            </style>
        </head>
        
        <body>
            <div class="box">tranision-property</div>
        </body>
     ```



        [property.mp4](attachment:14707686-3677-4949-aa68-2bcfb31a29d2:property.mp4)
        
- transition-duration
        
    ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>rotate</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                transform: translate(200px, 200px);
                
                transition: width 0.5s, height 0.5s
               }
                .box:hover{
                    background-color: blueviolet;
                    width: 200px;
                    height: 200px;
        
                }
        
                
            </style>
        </head>
        
        <body>
            <div class="box">tranision-property</div>
        </body>
        
    ```
        
        [duration.mp4](attachment:25ffefb0-58bf-4d08-afe0-bf27b43753d0:duration.mp4)
        
    - transition-timing-function
        
        애니메이션의 속도의 변화를 제어할 수 있게 해주는 속성.  쉽게 말해서 애니메이션이 어떻게 움직일지를 결정해주는 속성이다.
        
        linear : 일정한 속도로 애니메이션이 진행됨
        
        ease: 기본값이며, 느리게 시작하여 빠르게 진행되고, 느리게 끝남.
        
        ease-in: 느리게 시작하고 점점 빨라짐
        
        easer-out: 빠르게 시작하고 점점 느려짐
        
        ease-in-out: 느리게시작하고 느리게 끝남. 중간에 빨라짐
        
        cubic-bezier(x1, ,y1, x2, y2): 사용자 정의 속도 곡선을 지정할 수 있음.
        
    - transition-delay
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>rotate</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: aqua;
                justify-content: center;
                align-items: center;
                position: relative;
                
                transition: background-color 0.5s ease-in-out 1s;
               }
                .box:hover{
                    background-color: blueviolet;
        
                }
        
                
            </style>
        </head>
        
        <body>
            <div class="box">tranision-property</div>
        </body>
        
        ```
        
        [delay.mp4](attachment:bc991fe9-5f7f-4d73-9c8f-7e0fdda2a717:delay.mp4)
        
    - transition-behavior
        
        transition-behavior 속성은 현재 최신 브라우저에서는 동작하지 않음. 다른 transition 속성들을 활용하여 효과를 적용할 수 있음.
        
    
    ### 실습  🍠
    
    **`transition`** 키워드를 학습한 후, 해당 키워드와, **`transform에서 배운 특정 키워드를 활용`**하여, 아래와 같은 영상과 비슷하게 만들어주세요! (똑같을 필요는 없고, 기능만 같으면 됩니다.)
    
    단, **`transition 축약형`**을 사용해주세요!
    
    [화면 기록 2024-07-18 오후 7.51.38.mov](attachment:e6dc806f-17a6-483d-b55e-e3ae81b0d27c:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-07-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.51.38.mov)
    
    - 코드 첨부 🍠
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial=-scale=1.0">
            <title>prac</title>
            <style>
                
               .box{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: pink;
                justify-content: center;
                align-items: center;
                position: relative;
                margin: 50px;
            
               
                transform: rotate(45deg) translate(150px,50px);
                transition: background-color 0.5s ease-in-out;
                
               }
                .box:hover{
                    background-color: violet;
        
                }
        
                
            </style>
        </head>
        
        <body>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            
        
        </body>
        
        ```
        
    - 실행 영상 첨부 🍠
        
        [transition-prac.mp4](attachment:8ef34acd-49d4-46f6-96e0-722bba2b980d:transition-prac.mp4)





    
### animation 🍠
    
   
    
 - animation-name
        
        animation-name은 css 애니메이션에서 사용할 키프레임의 이름을 지정하는 속성임.
        
        ex) 박스에 x축으로 얼마만큼 이동하는 애니메이션을 적용하려면 
        
              animation-name : slide; 라는 이름의 키프레임을 지정한다.
        
 - animation-duration
        
     ```html
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation-duration</title>
            <style>
                .box {
                    width: 200px;
                    height: 200px;
                    box-sizing: content-box;
                    background-color: aqua;
                    color: aqua;
                    animation-name: slide;
                    animation-duration: 3s;
                }
                @keyframes slide {
                    from{
                        transform: translateX(0);
                    }
                        to 
                        {
                            transform: translateX(200px);
        
                        }
                    }
                  
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
        ```
        
        [ani-duration.mp4](attachment:866c13e7-7d1d-4771-addb-a896ed42988c:ani-duration.mp4)
        
- animation-delay
        
    ```html
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation</title>
            <style>
                .box {
                    width: 200px;
                    height: 200px;
                    box-sizing: content-box;
                    background-color: aqua;
                    color: aqua;
                    animation-name: slide;
                    animation-duration: 3s;
                    animation-delay: 1s;
                }
                @keyframes slide {
                    from{
                        transform: translateX(0);
                    }
                        to 
                        {
                            transform: translateX(200px);
        
                        }
                    }
                  
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
     ```
        
        [ani-delay.mp4](attachment:30ea513b-ce44-441c-8714-2e80c3477963:ani-delay.mp4)
        
- animation-direction
        
    ```html
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation-</title>
            <style>
                .box {
                    width: 200px;
                    height: 200px;
                    background-color: aqua;
                    color: aqua;
                    animation: slide 2s ease-in-out infinite alternate;
                    
                }
                @keyframes slide {
                    from{
                        transform: translateX(0);
                    }
                        to 
                        {
                            transform: translateX(200px);
        
                        }
                    }
                  
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
    ```
        
        [ani-direct.mp4](attachment:fb9192d0-3e39-441f-b740-58b18364c534:ani-direct.mp4)
        
- animation-iteration-count
        
    ```html
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation-</title>
            <style>
                .box {
                    width: 200px;
                    height: 200px;
                    background-color: aqua;
                    color: aqua;
                    animation: slide 2s ease-in-out 3 alternate;
                    
                }
                @keyframes slide {
                    from{
                        transform: translateX(0);
                    }
                        to 
                        {
                            transform: translateX(200px);
        
                        }
                    }
                  
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
    ```
        
        [ani-iter.mp4](attachment:11967011-5b0e-4bd2-bdc9-8d54b0e87153:ani-iter.mp4)
        
        3번 반복
        
    - animation-play-state
        
        ```html
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation-</title>
            <style>
                .box {
                    width: 200px;
                    height: 200px;
                    background-color: aqua;
                    color: aqua;
                    animation: slide 2s ease-in-out infinite alternate;
                    
                }
                @keyframes slide {
                    from{
                        transform: translateX(0);
                    }
                        to 
                        {
                            transform: translateX(200px);
        
                        }
                    }
                  .box:hover{
                    animation-play-state: paused;
                  }
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
        ```
        
        [ani-playstate.mp4](attachment:2dfd1417-886b-412c-bcbe-a98ab3e89767:ani-playstate.mp4)
        
    - animation-timing-function
        
        ```html
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation-</title>
            <style>
                .box {
                    width: 200px;
                    height: 200px;
                    background-color: aqua;
                    color: aqua;
                    animation: opacity 2s linear infinite alternate;
                    
                }
                @keyframes opacity {
                    from{
                        opacity: 0;
                    }
                        to 
                        {
                            opacity: 1;
        
                        }
                    }
                  .box:hover{
                    animation-play-state: paused;
                  }
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
        ```
        
        [ani-opa.mp4](attachment:9614116f-ec46-449a-9876-094987be5182:ani-opa.mp4)
        
        등속으로 opacity 이용해서 깜빡깜빡
        
    - animation-fill-mode
        
        애니메이션이 시작하기 전과 종료된 후에 요소의 스타일을 유지하는 방법을 결정하는 속성.
        
        애니메이션이 끝나고 기본 스타일로 돌아갈 지, 마지막 프레임 상태를 유지할 지, 시작 프레임을 적용할지 등을 결정할 수 있는 속성.
        
        기본 문법 :
        
        none : 애니메이션이 끝나면 원래 스타일로 돌아가게 됨.
        
                     animation-fill-mode: none;
        
        forwards : 애니메이션이 끝나고 마지막 프레임 상태를 유지.
        
                                 animation-fill-mode:  forwards;
        
        backwards : 애니메이션 시작 전의 첫번째 프레임 상태 적용
        
                                animation-fill-mode:  backwards;
        
        both : forwards와 backwards 효과 모두 적용.
        
                               animation-fill-mode: both;
        
    - @keyframe
        
        문법:
        
        @keyframes 애니메이션 이름 {
        
        from { 속성 }
        
        to { 속성 }
        
        }
        
    - 축약형
        
        animation : 애니메이션이름  지속시간 타이밍함수 반복횟수 지연시간 방향 fill-mode 상태;
        
    
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
        <!DOCTYPE HTML>
        <html lang="ko">
        <head>
            <meta charset ="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>animation-</title>
            <style>
                .box {
                    width: 100px;
                    height: 100px;
                    transform: translateX(100px);
                    background-color: aqua;
                    border-radius: 50%;
            
                    
        
                    animation: bounce-ball 1s ease-in-out infinite alternate;
                    
                }
                @keyframes bounce-ball {
                    from{
                        transform: translateY(0) ;
                    }
                        to 
                        {
                            
                            transform: translateY(400px) scaleX(1.3);
        
                        }
                    }
                  
                  
                    
                  
                
            </style>
        </head>
        <body>
        
            <div class="box"></div>
        
        </body>
        </html>
        
        ```
        
    - 실행 영상 첨부 🍠
        
        [ani-prac.mp4](attachment:7e73c222-2b9a-46fd-b0a1-c244d1068d99:ani-prac.mp4)