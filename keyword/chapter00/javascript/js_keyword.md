### 원시 타입 (Primitive Type)

쉽게 정의하면 객체가 아닌 다른 모든 타입을 의미. 객체가 아니기에, 이러한 원시 타입은 메서드를 갖고 있지 않음.

- **number** 🍠

    - JS에서 사칙연산을 하는 방법을 작성해주세요. 🍠
        ```javascript
        console.log(a+b); // 더하기
        console.log(a-b); // 뺴기
        console.log(a*b); // 곱하기
        console.log(a/b); // 나누기
        console.log(a%b); // 나머지 구하기
        console.log(a**b); // 거듭제곱(a^b)
        ```

    - JS에서 비교 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
        1. 기본 비교 연산자 (`==`,`===`,`!=`,`!==`)
            - `==`: 값이 같으면 `true` 반환
            - `===`: 값과 자료형이 모두 같아야 `true` 반환
            - `!=`: 값이 다르면 `true` 반환
            - `!==`: 값 또는 자료형이 다르면 `true` 반환

        ```javascript
        console.log(5 == "5");  // true  (자료형 무시)
        console.log(5 != "5");  // false (자료형 무시)
        console.log(5 === "5"); // false (자료형 다름)
        console.log(5 !== "5"); // true  (자료형 다름)
        ```
        
        2. 대소 비교 연산자 (`>`,`<`,`>=`,`<=`)
            - `>`: 왼쪽 값이 크면 `true`
            - `<`: 오른쪽 값이 크면 `true`
            - `>=`: 왼쪽 값이 크거나 같으면 `true`
            - `<=`: 오른쪽 값이 크거나 같으면 `true`

        ```javascript
        console.log(10 > 5);  // true
        console.log(10 < 5);  // false
        console.log(10 >= 10); // true
        console.log(10 <= 5);  // false
        ```

        3. 논리 연산자 (`&&`,`||`,`!`)
            - `&&`(AND): 둘 다 참일 때만 `true`
            - `||`(OR): 둘 중 하나만 참이어도 `true`
            - `!`(NOT): 반대 값 반환
        ```javascript
        console.log((10 > 5) && (5 < 8)); // true  (둘 다 참)
        console.log((10 < 5) || (5 < 8)); // true  (하나만 참이어도 true)
        console.log(!(10 > 5));  // false (true의 반대)
        ```

        4. 삼항 연산자 (condition ? true값 : false값)
            - `if-else`문을 한 줄로 줄일 때 사용
        ```javascript
        let age = 20;
        let result = (age >= 18) ? "성인" : "미성년자";
        console.log(result); // "성인"
        ```

    - JS에서 증가/감소 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠

        1. `++`(증가 연산자), `--`(감소 연산자)
            - `++x`: 먼저 1 증가 후 그 값 사용
            - `x++`: 현재 값 사용 후 1 증가
            - `--x`: 먼저 1 감소 후 그 값 사용
            - `x--`: 현재 값 사용 후 1 감소
            
            ```javascript
            let x = 5;
            console.log(++x); // 6 (전위 연산: 먼저 증가 후 출력)
            console.log(x);   // 6

            let y = 5;
            console.log(y++); // 5 (후위 연산: 출력 후 증가)
            console.log(y);   // 6
            ```
        
        2. 복합 대입 연산자 (`+=`,`-=`,`*=`,`/=`,`%=`,`**=`)
            ```javascript
            let a = 10;

            a += 3; // a = a + 3 (13)
            a -= 2; // a = a - 2 (11)
            a *= 2; // a = a * 2 (22)
            a /= 2; // a = a / 2 (11)
            a %= 3; // a = a % 3 (2)
            a **= 2; // a = a ** 2 (4)
            console.log(a);
            ```

        3. 함수를 사용한 증가/감소
            ```javascript
            function increase(n) {
                return n + 1;
            }
            function decrease(n) {
                return n - 1;
            }

            console.log(increase(10)); // 11
            console.log(decrease(10)); // 9
            ```

    - 연산자 우선순위에 대해 작성해주세요. 🍠

        -덧셈(+), 뻴셈(-) < 곱셈(*), 나눗셈(/), 나머지(%) 먼저 계산

- **string** 🍠

    문자열(string)은 텍스트 데이터를 다룰 때 사용

    ```javascript
    let str1 = "Hello";   // 큰따옴표
    let str2 = 'World';   // 작은따옴표

    let name = "Teri";
    let message = `Hello, ${name}!`;  // 백틱엔 변수삽입 가능!
    console.log(message);  // Hello, Teri!

    // 문자열 길이 확인: length
    console.log(name.length); // 4

    // 문자열 인덱싱: [], charAt
    console.log(str1[0]); //'H' (대괄호 표기법)
    console.log(str1.charAt(1)); //'e' (charAt 메서드)
    console.log(str1[str1.length-1]); //'o': 마지막 문자 가져오기

    // 문자열 합치기: +, concat
    console.log(str1 + " " + str2); //Hello World
    console.log(str1.concat(" ", str2)); //Hello World

    // 문자열 일부 추출: slice, substring, substr
    let str = "JavaScript";

    console.log(str.slice(0, 4)); // "Java" 0부터 4전까지 자르기
    console.log(str.substring(0, 4)); // "Java" 0부터 4전까지 (음수사용불가)
    console.log(str.substr(4, 6)); // "Script" 4부터 6길이만큼 (옛날방식)

    // 문자열 변환
    let str = "  JavaScript  ";

    console.log(str.toUpperCase()); // "  JAVASCRIPT  "
    console.log(str.toLowerCase()); // "  javascript  "
    console.log(str.trim()); // "JavaScript" (앞뒤 공백제거)
    console.log("Hi ".repeat(3)); // "Hi Hi Hi "

    // 문자열 검색
    let str = "Hello World";

    console.log(str.indexOf("o")); // 4 (처음 찾은 위치 반환, 없으면 -1)
    console.log(str.lastIndexOf("o")); // 7 (마지막 위치 반환)
    console.log(str.includes("World")); // true (포함 여부 t/f)
    console.log(str.startsWith("Hell")); // true (특정 문자열로 시작하는지 t/f)
    console.log(str.endsWith("ld")); // true (특정 문자열로 끝나는지 t/f)

    // 문자열 대체: replace
    let text = "I love JavaScript!";
    console.log(text.replace("JavaScript", "Python")); // "I love Python!"

    let str = "apple, Apple, APPLE"; // 정규 표현식 사용 가능
    console.log(str.replace(/apple/gi, "banana")); // "banana, banana, banana"

    // 문자열 분할: spilt
    let str = "apple,banana,grape";
    let fruits = str.split(","); // ['apple', 'banana', 'grape']

    // 문자열 -> 숫자 변환
    console.log(parseInt("42")); // 42 (정수)
    console.log(parseFloat("42.5")); // 42.5 (실수)
    console.log(Number("42.5")); // 42.5
    ```


- **bigInt** 🍠
    - `Number` 의 최대 표현 정수(2^53-1) 이상의 큰 정수를 다룰 때 사용하는 JS 데이터 타입

    ```javascript
    // bigint 생성법 1) n 붙이기
    let bigNum = 123456789012345678901234567890n;
    console.log(bigNum); // 123456789012345678901234567890n
    console.log(typeof bigNum); // "bigint"

    // 2) BigInt() 함수 사용 (소수점 사용 XX)
    let bigNum2 = BigInt("123456789012345678901234567890");
    console.log(bigNum2); // 123456789012345678901234567890n
    ```

    - `Number`는 최대 2^53-1의 정수 출력, 그 이상이면 정확한 값이 나오지 않는 오류발생
    - `BigInt`를 사용하면 정확한 계산 가능!

    ```javascript
    let num = 9007199254740991;
    console.log(num + 1); // ❌ 9007199254740992 (정확 X)
    console.log(num + 2); // ❌ 9007199254740992 (오류 발생!)

    let bigNum = 9007199254740991n;
    console.log(bigNum + 1n); // ✅ 9007199254740992n
    console.log(bigNum + 2n); // ✅ 9007199254740993n
    ```

    - `BigInt` 연산 (사칙연산) --> 똑같이 다됨
    ```javascript
    let a = 100000000000000000000n;
    let b = 200000000000000000000n;

    console.log(a + b); // 300000000000000000000n
    console.log(a - b); // -100000000000000000000n
    console.log(a * b); // 20000000000000000000000000000000000000000n
    console.log(b / a); // 2n (정수 나눗셈, 소수점 버림)
    console.log(b % a); // 0n (나머지 연산)
    console.log(2n ** 10n); // 1024n (거듭제곱)

    console.log(7n / 3n); //2n (나눗셈은 정수값만 반환!, 소수점 버림)
    ```

    - `BigInt`와 `Number`는 다른 타입으로 같이 사용 불가!
    ```javascript
    let big = 10n;
    let num = 5;
    console.log(big + num); // ❌ TypeError: Cannot mix BigInt and other types

    // BigInt -> Number 변환: Number()
    console.log(Number(10n) + 5); // ✅ 15

    // Number -> BigInt 변환: BigInt(), 변환시 소수점 버려짐
    console.log(BigInt(5) + 10n); // ✅ 15n
    console.log(BigInt(3.14)); // 3n (소수점 버려짐)
    ```

    - 그치만 `BigInt`와 `Number` 비교 연산은 가능
    ```javascript
    console.log(10n > 5); // ✅ true
    console.log(10n === 10); // ❌ false (타입 다름)
    console.log(10n == 10); // ✅ true (자동 변환)
    ```

### 객체 타입 (Object Type)

위의 7개 원시 타입 제외 자바스크립트를 이루고 있는 대부분의 타입이 객체 타입. 여기에는 배열, 함수, 정규식, 클래스 등이 포함된다.

여기서 한 가지 주목할 것이 **`객체 타입은 참조를 전달`**하기에, **`참조 타입`**으로도 불린다는 것이다.

```jsx
const hello1 = () => {}; 
const hello2 = () => {};
```

위의 내용을 보면 실제로, 함수의 내용이 같아 보입니다. 하지만, 서로의 참조가 다르기에 false가 반환됨을 알 수 있습니다.

```jsx
hello1 === hello2 // false
```

- **array**

    - 다양한 Array method에 대해 정리해주세요. 🍠

        - `sort()` 🍠: 배열 정렬 (기본: 문자열 기준)

        숫자 정렬 시 `a-b`(오름차순), `b-a` (내림차순) 사용!
        ```javascript
        let numbers = [40, 100, 1, 5, 25, 10];
        numbers.sort();
        console.log(numbers); // X [1, 10, 100, 25, 40, 5] (문자열 정렬됨)

        numbers.sort((a, b) => a - b);
        console.log(numbers) // O [1, 5, 10, 25, 40, 100] (숫자 정렬)
        ``` 

        - `join()` 🍠: 배열을 문자열로 변환
        ```javascript
        let fruits = ["🍎", "🍌", "🍇"]; // 배열
        console.log(fruits.join()); // "🍎,🍌,🍇" (기본값: 콤마(,)로 연결)
                                    // 콤마로 연결한 '문자열'인거임!! 배열 아님
        console.log(fruits.join(" - ")); // "🍎 - 🍌 - 🍇"
        ```

        - `reverse()` 🍠: 배열 거꾸로 뒤집기
        ```javascript
        let arr = [1, 2, 3, 4, 5];
        arr.reverse();
        console.log(arr); // [5, 4, 3, 2, 1]
        ```

        - `splice(start, deleteCount, item1, item2, ...)` 🍠: 배열의 요소 추가/삭제
            - 추가: splice(1, 0, "newColor") -> 1번 인덱스 다음에 삭제 없이 추가
            - 삭제: splice(1, 1) -> 1번 인덱스 삭제
        ```javascript
        let colors = ["red", "blue", "green"];
        colors.splice(1, 1, "yellow"); // 1번 인덱스부터 1개 제거 후 'yellow' 추가
        console.log(colors); // ["red", "yellow", "green"]
        ```

        - `slice(start, end)` 🍠: 배열의 일부 복사 (원본 유지)
        ```javascript
        let animals = ["🐶", "🐱", "🐭", "🐹"];
        console.log(animals.slice(1, 3)); // ["🐱", "🐭"] //1, 3번 인덱스 복사사
        console.log(animals.slice(-2)); // ["🐭", "🐹"] (뒤에서 2개)
        ```

        - `find(callback)` 🍠: 조건을 만족하는 첫번째 요소 반환
        ```javascript
        let numbers = [5, 12, 8, 130, 44];
        let found = numbers.find(num => num > 10);
        console.log(found); // 12 (첫 번째 10보다 큰 값)
        ```

        - `filter(callback)` 🍠: 조건을 만족하는 모든 요소 반환
        ```javascript
        let words = ["apple", "banana", "cherry", "blueberry"];
        let result = words.filter(word => word.includes("b"));
        console.log(result); // ["banana", "blueberry"]
        ``` 

        - `map(callback)` 🍠: 배열 요소를 변환하여 새 배열 반환
        ```javascript
        let numbers = [1, 2, 3, 4];
        let doubled = numbers.map(num => num * 2);
        console.log(doubled); // [2, 4, 6, 8]
        ```

        - `reduce(callback, initialValue)` 🍠: 모든 요소 누적
            - 배열의 합계 구하기, 
            - 최댓값 찾기 (`reduce((max, cur) => Math.max(max, cur))`), 
            - 배열을 객체로 변환 (`reduce((obj, cur) => {obj[cur] = true; return obj; }, {})`) 시 사용
        ```javascript
        let numbers = [1, 2, 3, 4];
        let sum = numbers.reduce((acc, cur) => acc + cur, 0); // 초기값 0, acc는 누적 값
                                                              // 배열 순회하며 계산하는 것!
        console.log(sum); // 10 (1+2+3+4)

        let items = ["apple", "banana", "apple", "orange", "banana"];
        let count = items.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1; // acc[cur] 값이 있으면 그대로 사용, 없으면 0으로 초기화
                                            // +1해서 현재 요소의 개수 증가
            return acc; // 객체 계속 업데이트 
        }, {}); // 빈 객체가 초기값
        console.log(count); // { apple: 2, banana: 2, orange: 1 }
        ```

        - `some(callback)` 🍠: 하나라도 조건을 만족하면 true
        ```javascript
        let numbers = [2, 4, 6, 8];
        console.log(numbers.some(num => num > 5)); // true (6, 8이 있음)
        console.log(numbers.some(num => num > 10)); // false
        ```

        - `every(callback)` 🍠: 모든 요소가 조건을 만족하면 true
        ```javascript
        let numbers = [2, 4, 6, 8];
        console.log(numbers.every(num => num % 2 === 0)); // true (모두 짝수)
        console.log(numbers.every(num => num > 5)); // false (2, 4가 있음)
        ```

        - `forEach(callback)` 🍠: 배열을 반복하며 실행 
            - 새로운 반환값 없음, 단순히 요소를 출력하거나 수정할 때 사용용
        ```javascript
        let fruits = ["🍎", "🍌", "🍇"];
        fruits.forEach((fruit, index) => {
            console.log(`${index}: ${fruit}`);
        });
        ```

- **function**
    - 호이스팅 (Hoisting) 🍠: JS에서 선언된 변수와 함수가 코드 실행 전에 메모리에 미리 올라가는 현상. 즉, **변수나 함수 선언이 코드의 최상단으로 끌어올려진 것처럼 동작**하지만, 실제 코드의 위치는 변하지 않는다.

        1. 변수 호이스팅 (var, let, const)

            - 호이스팅 되지만, 초기화는 안됨
            ```javascript
            console.log(a); // ❌ undefined 반환
                            // 변수는 올라가지만 값은 할당되지 않않음
            var a = 10;
            console.log(a); // ✅ 10

            console.log(b); // ❌ ReferenceError
                            // TDZ(임시 사각지대) 때문에 접근 불가
            let b = 20;
            console.log(b); // ✅ 20

            console.log(c); // ❌ ReferenceError
                            // TDZ(임시 사각지대) 때문에 접근 불가
            const c = 30;
            console.log(c);
            ```

        2. 함수 호이스팅

            - 함수 선언문: 전체가 호이스팅 됨. 즉, 정의된 내용까지 위로 올라감.
            ```javascript
            substraction(5, 3); // ✅ 2

            function subtraction(a, b) {
                return a - b;
            }
            ```

            - 함수 표현식: 변수 호이스팅만 되고, 함수 자체는 호이스팅 되지 않음!
             ```javascript
             subtraction2(5, 3); // ❌ TypeError

             let subtraction2 = function (a, b) {
                return a - b;
            } // let substraction2; 만 호이스팅 되고 값 할당 전이라 에러 (TDZ)
            ```

- **class**

    - getter (읽기 전용)
        - `get` 키워드를 사용하여 속성을 가져오는 메서드
        - 일반적인 속성처럼 접근하지만, 실제로는 get 함수 실행. 데이터 가공(대문자 변환 등등)
        ```javascript
        class Student {
            constructor(name, school) {
                this.name = name;
                this.school = school;
            }
            
            get name() {
                return this.name.toUpperCase(); // 대문자로 변환해서 반환
            }
        }

        const Student = new Student("Minju", "Inha Univ");
        console.log(Student.name); // ✅ "MINJU"
        // Student.name 이라는 일반 속성처럼 보이지만, 실제로는 get name()이 실행
        console.log(Student.school); // "Inha Univ"
        ```

    - setter (값 설정)
        - `set` 키워드를 사용하여 속성 값을 변경하는 메서드
        - 값을 직접 할당하는 대신, 유효성 검사(이름길이제한 등등) 같은 로직 추가 가능 
        ```javascript
        class Student {
            constructor(name, school) {
                this.name = name;
                this.school = school;
            }
            
            set name(newName) {
                if (newName.length < 3) { // 이름이 3글자 이상인지 체크
                    console.log("❌ 이름은 세 글자 이상이어야 함");
                    return; // 조건 틀리면 경고메세지 & 원래것 반환
                }
                this.name = newName; // 조건 맞으면 이름 변경
            }
        }

        const Student = new Student("Minju", "Inha Univ");
        console.log(Student.name); // ✅ "Minju"

        Student.name = "MJ"; // "❌ 이름은 세 글자 이상이어야 함"
        console.log(Student.name); // "Minju" (변경되지 않음)

        Student.name = "Minjoo"; // ✅ "Minjoo"로 변경 가능
        console.log(Student.name); // "Minjoo"
        ```

## react에서 자주 사용하는 자바스크립트 문법 --> 나중에 꼭 읽어보기

### DOM 조작 🍠⭐⭐⭐⭐⭐

DOM(Document Object Model)은 html 요소를 JS로 조작할 수 있도록 해주는 인터페이스다.

1. 태그 가져오기

| 메서드 | 설명 |
|:--------|:----|
| `document.getElementById("id")` | id 속성으로 요소 1개 가져오기 |
| `document.getElementByClassName("class")` | class 속성으로 요소 여러개 가져오기 |
| `document.getElementByTagName("tag")` | 특정 태그 이름을 가진 요소 가져오기 |
| `document.querySelector("선택자")` | CSS 선택자로 요소 1개 가져오기 |
| `document.querySelectorAll("선택자")` | CSS 선택자로 요소 여러개 가져오기 |
| `document.querySelector("선택자")` | CSS 선택자로 요소 1개 가져오기 |
```javascript
const title = document.getElementById("title"); // id가 'title'인 요소 가져오기
const buttons = document.getElementsByClassName("btn"); // class가 'btn'인 모든 요소 가져오기
const firstBtn = document.querySelector(".btn"); // 첫 번째 'btn' 클래스 요소 가져오기
const allBtns = document.querySelectorAll(".btn"); // 모든 'btn' 클래스 요소 가져오기
```

2. 이벤트 리스너 추가하기

html 요소에 이벤트를 추가할 때 사용
`element.addEventListener("이벤트", 함수)`로 함수 등록

```javascript
const button = document.querySelector(".btn"); // 첫번째 'btn' 클래스 요소 가져오기

button.addEventListener("click", function() {
    alert("버튼이 클릭됨!"); // 버튼을 클릭하면 alert 창이 뜸
});
```

3. 이벤트 리스너 제거하기

등록된 이벤트를 제거할 때 사용.
`element.removeEventListener("이벤트", 함수)` 사용하려면,
이전에 이벤트를 추가할 때 함수 이름을 변수처럼 사용해야 함! 미리 함수 선언이 되어있어야 함.

```javascript
const button = document.querySelector(".btn");

function handleClick() { // 미리 함수 선언이 되어있어야 함
    console.log("버튼이 클릭됨!");
}

button.addEventListener("click", handleClick); // 추가
button.removeEventListener("click", handleClick); // 제거, 함수 이름을 변수처럼
```

4. 키보드와 마우스 이벤트

| 이벤트 | 설명 |
|:------|:---|
| `click` | 요소 클릭 시 |
| `dblclick`| 요소 더블 클릭 시 |
| `mouseover` | 요소 위에 마우스를 올릴 때 |
| `mouseout` | 요소에서 마우스가 벗어날 때 |
| `mousedown` | 마우스 버튼을 눌렀을 때 |
| `mouseup` | 마우스 버튼을 뗄 때 |
| `keydown` | 키를 눌렀을 때 |
| `keyup` | 키를 뗄 때 |

```javascript
// 키보드를 누르면 눌린 키 출력
document.addEventListener("keydown", function (event) { // keydown 이벤트
  console.log(`눌린 키: ${event.key}`); // 눌린 키: ~~~ 라고 출력
});

// 클릭한 좌표 출력
document.addEventListener("click", function (event) { // click 이벤트
  console.log(`X: ${event.clientX}, Y: ${event.clientY}`); // X: ~, Y: ~ 라고 출력
});
```

5. 태그 속성 다루기

html 태그의 속성을 추가, 변경, 삭제

| 메서드 | 설명 |
|:------|:-----|
| `element.getAttribute("속성")` | 속성 값 가져오기 |
| `element.setAttribute("속성", "값")` | 속성 값 설정하기 |
| `element.removeAttribute("속성")` | 속성 제거하기 |

```javascript
const img = document.querySelector("img"); // 첫번째 img 클래스 요소 가져오기 

console.log(img.getAttribute("src")); // 이미지의 src 값 가져오기
img.setAttribute("alt", "이미지 설명 추가"); // alt 속성 추가
img.removeAttribute("width"); // width 속성 제거
```

6. 부모와 자식 태그 찾기

| 메서드 | 설명 |
|:------|:-----|
| `element.parantNode` | 부모 요소 찾기 |
| `element.children` | 자식 요소들 찾기 |
| `element.firstElementChild` | 첫번째 자식 요소 |
| `element.lastElementChild` | 마지막 자식 요소 |
| `element.nextElementSibling` | 다음 형제 요소 |
| `element.previousElementSibling` | 이전 형제 요소 |

```javascript
const list = document.querySelector(".list"); // 첫번째 list 클래스(트리) 요소 가져오기
console.log(list.parentNode); // 부모 요소 찾기
console.log(list.children); // 자식 요소들 찾기
console.log(list.firstElementChild); // 첫 번째 자식 요소
console.log(list.lastElementChild); // 마지막 자식 요소
```

7. 새로운 태그 만들기

새로운 html 요소를 동적으로 생성

| 메서드 | 설명 |
|:------|:-----|
| `document.createElement("태그")` | 새로운 요소 만들기 |
| `parent.appendChild(자식)` | 부모 요소에 자식 추가 |
| `parent.insertBefore(새요소, 기준요소)` | 특정 위치에 삽입 |

```javascript
const newDiv = document.createElement("div"); // 새로운 div 생성
newDiv.textContent = "새로운 태그!"; // 내용 추가
document.body.appendChild(newDiv); // body에 추가
```

8. 태그 복제하기

`element.cloneNode(true)`: 요소 복사 (true는 자식 포함 / false는 자식 제외)

`cloneNode(true)`는 자식 요소까지 복사
```javascript
const original = document.querySelector(".box"); // 첫번째 box 클래스 요소 가져오기
const copy = original.cloneNode(true); // 자식 포함하여 복사
document.body.appendChild(copy); // 복사한 요소 추가
```