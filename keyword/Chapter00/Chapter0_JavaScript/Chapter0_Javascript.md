# JavaScript 핵심 키워드 정리

## 1. 원시 자료형 일부 소개

### String

문자열(String)은 **문자의 연속된 집합**으로, JavaScript에서 **기본 데이터 타입(Primitive type)** 중 하나입니다. 문자열은 **텍스트 데이터를 다룰 때 사용**되며, 작은따옴표(`'`), 큰따옴표(`"`) 또는 백틱(```)을 사용하여 선언할 수 있습니다.

#### **문자열 선언 예시**

```javascript
let str1 = "Hello";
let str2 = "World";
let str3 = `Hello, ${str2}!`; // 템플릿 리터럴
```

백틱(```)을 사용하면 **템플릿 리터럴(Template Literal)** 기능을 활용할 수 있어 **문자열 내 변수 삽입**이 가능합니다.

**🔗 출처:** [MDN String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

### BigInt

`BigInt`는 [`Number`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number) 원시 값이 안정적으로 나타낼 수 있는 최대치인 2^53 - 1보다 큰 정수를 표현할 수 있는 내장 객체입니다.

- 숫자 뒤에 `n`을 붙이거나 `BigInt` 생성자를 사용하여 선언할 수 있습니다.

```javascript
let bigNum1 = 123456789012345678901234567890n;
let bigNum2 = BigInt("123456789012345678901234567890");
```

**🔗 출처:** [MDN BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

## 2. 객체 자료형 중 Array 메서드

| 메서드    | 설명                                                 | 출처                                                                                                          |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `sort`    | 배열을 정렬 (기본적으로 문자열 정렬)                 | [MDN sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)       |
| `join`    | 배열의 모든 요소를 문자열로 변환하여 반환            | [MDN join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)       |
| `reverse` | 배열의 요소 순서를 반대로 변경                       | [MDN reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) |
| `splice`  | 배열의 요소를 추가, 제거 또는 변경                   | [MDN splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)   |
| `slice`   | 배열의 일부를 얕은 복사하여 반환                     | [MDN slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)     |
| `find`    | 조건을 만족하는 첫 번째 요소 반환                    | [MDN find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)       |
| `filter`  | 조건을 만족하는 요소들만 필터링하여 새 배열 반환     | [MDN filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)   |
| `map`     | 배열의 모든 요소에 대해 함수를 적용하여 새 배열 반환 | [MDN map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)         |
| `reduce`  | 배열의 요소들을 누적하여 하나의 값 반환              | [MDN reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)   |
| `some`    | 배열의 요소 중 하나 이상이 조건을 만족하는지 확인    | [MDN some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)       |
| `every`   | 배열의 모든 요소가 조건을 만족하는지 확인            | [MDN every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)     |
| `forEach` | 배열의 각 요소에 대해 주어진 함수를 실행             | [MDN forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) |

---

## 3. Hoisting (호이스팅)

Hoisting(호이스팅)은 JavaScript 엔진이 코드를 실행하기 전에 **함수, 변수, 클래스의 선언을 해당 범위의 최상단으로 이동하는 과정**을 의미합니다.

### **변수 호이스팅**

- `var` 변수는 선언만 먼저 올라가고, 할당은 원래 위치에서 이루어집니다.
- 따라서 `undefined` 값을 갖습니다.

```javascript
console.log(x); // undefined
var x = 10; // 선언이 코드 최상단으로 올라감
```

### **함수 호이스팅**

- 함수 선언문은 전체가 끌어올려지므로 선언 이전에도 호출할 수 있습니다.

```javascript
console.log(square(5)); // 정상 실행

function square(n) {
  return n * n;
}
```

### **클래스 호이스팅 불가**

- `class`는 `hoisting`이 적용되지 않습니다.

```javascript
console.log(new MyClass()); // ReferenceError 발생
class MyClass {}
```

**🔗 출처:** [MDN Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

---

## 4. 연산자

### 📌 기본 연산자

| 연산자 | 이름            | 목적                                                  | 예시                  |
| ------ | --------------- | ----------------------------------------------------- | --------------------- |
| `+`    | 더하기          | 두 개의 숫자를 더합니다.                              | `6 + 9`               |
| `-`    | 빼기            | 왼쪽에 있는 수를 오른쪽 수로 뺍니다.                  | `20 - 15`             |
| `*`    | 곱하기          | 두 개의 숫자를 곱합니다.                              | `3 * 7`               |
| `/`    | 나누기          | 왼쪽의 숫자를 오른쪽 숫자로 나눠서 몫을 구합니다.     | `10 / 5`              |
| `%`    | 나머지 (모듈로) | 왼쪽의 숫자를 오른쪽 숫자로 나눠서 나머지를 구합니다. | `8 % 3` (결과: `2`)   |
| `**`   | 지수            | 왼쪽의 숫자를 오른쪽 숫자만큼 제곱합니다.             | `5 ** 2` (결과: `25`) |

**🔗 출처:** [MDN 연산자](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math)

---

### 📌 비교 연산자

| 연산자 | 이름              | 목적                                                       | 예시          |
| ------ | ----------------- | ---------------------------------------------------------- | ------------- |
| `===`  | 일치 연산자       | 왼쪽과 오른쪽 값이 완전히 동일한지 테스트합니다.           | `5 === 2 + 3` |
| `!==`  | 불일치 연산자     | 왼쪽과 오른쪽 값이 서로 동일하지 않은지 테스트합니다.      | `5 !== 2 + 3` |
| `<`    | ~보다 작음        | 왼쪽 값이 오른쪽 값보다 작은지 테스트합니다.               | `10 < 6`      |
| `>`    | ~보다 큼          | 왼쪽 값이 오른쪽 값보다 큰지 테스트합니다.                 | `10 > 20`     |
| `<=`   | ~보다 작거나 같음 | 왼쪽 값이 오른쪽 값보다 작거나 같은지 여부를 테스트합니다. | `3 <= 2`      |
| `>=`   | ~보다 크거나 같음 | 왼쪽 값이 오른쪽 값보다 크거나 같은지 여부를 테스트합니다. | `5 >= 4`      |

**🔗 출처:** [MDN 연산자](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math)

---

### 📌 증가/감소 연산자 (`++`, `--`)

| 연산자   | 설명             | 적용 위치 | 실행 시 변수 값 변화           |
| -------- | ---------------- | --------- | ------------------------------ |
| `++변수` | 전위 증가 연산자 | 변수 앞   | 해당 줄이 실행되기 전에 1 증가 |
| `변수++` | 후위 증가 연산자 | 변수 뒤   | 해당 줄 실행 후 1 증가         |
| `--변수` | 전위 감소 연산자 | 변수 앞   | 해당 줄이 실행되기 전에 1 감소 |
| `변수--` | 후위 감소 연산자 | 변수 뒤   | 해당 줄 실행 후 1 감소         |

**🔗 출처:** [MDN 연산자](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math)

---

### 📌 연산자 우선순위

| 우선순위 | 연산자 유형                  | 결합성   | 연산자           |
| -------- | ---------------------------- | -------- | ---------------- |
| 19       | 그룹                         | 없음     | `( … )`          |
| 18       | 멤버 접근                    | 좌결합성 | `… . …`          |
|          | 계산된 멤버 접근             | 좌결합성 | `… [ … ]`        |
|          | `new` (인자 리스트 제공)     | 없음     | `new … ( … )`    |
|          | 함수 호출                    | 좌결합성 | `… ( … )`        |
|          | 옵셔널 체이닝                | 좌결합성 | `?.`             |
| 17       | `new` (인자 리스트 생략)     | 우결합성 | `new …`          |
| 16       | 후위 증가                    | 없음     | `… ++`           |
|          | 후위 감소                    | 없음     | `… --`           |
| 15       | 논리 NOT                     | 우결합성 | `! …`            |
|          | 비트 NOT                     | 우결합성 | `~ …`            |
|          | 단항 양부호                  | 우결합성 | `+ …`            |
|          | 단항 부정                    | 우결합성 | `- …`            |
|          | 전위 증가                    | 우결합성 | `++ …`           |
|          | 전위 감소                    | 우결합성 | `-- …`           |
|          | `typeof`                     | 우결합성 | `typeof …`       |
|          | `void`                       | 우결합성 | `void …`         |
|          | `delete`                     | 우결합성 | `delete …`       |
|          | `await`                      | 우결합성 | `await …`        |
| 14       | 거듭제곱                     | 우결합성 | `… ** …`         |
| 13       | 곱하기                       | 좌결합성 | `… * …`          |
|          | 나누기                       | 좌결합성 | `… / …`          |
|          | 나머지                       | 좌결합성 | `… % …`          |
| 12       | 더하기                       | 좌결합성 | `… + …`          |
|          | 빼기                         | 좌결합성 | `… - …`          |
| 11       | 비트 왼쪽 시프트             | 좌결합성 | `… << …`         |
|          | 비트 오른쪽 시프트           | 좌결합성 | `… >> …`         |
|          | 비트 부호 없는 오른쪽 시프트 | 좌결합성 | `… >>> …`        |
| 10       | 미만                         | 좌결합성 | `… < …`          |
|          | 이하                         | 좌결합성 | `… <= …`         |
|          | 초과                         | 좌결합성 | `… > …`          |
|          | 이상                         | 좌결합성 | `… >= …`         |
|          | `in`                         | 좌결합성 | `… in …`         |
|          | `instanceof`                 | 좌결합성 | `… instanceof …` |
| 9        | 동등 (`==`)                  | 좌결합성 | `… == …`         |
|          | 부등 (`!=`)                  | 좌결합성 | `… != …`         |
|          | 일치 (`===`)                 | 좌결합성 | `… === …`        |
|          | 불일치 (`!==`)               | 좌결합성 | `… !== …`        |
| 7        | 비트 AND                     | 좌결합성 | `… & …`          |
| 6        | 비트 XOR                     | 좌결합성 | `… ^ …`          |
| 5        | 비트 OR                      | 좌결합성 | `… \| …`         |
| 4        | 논리 AND                     | 좌결합성 | `… && …`         |
| 3        | 논리 OR                      | 좌결합성 | `… \|\| …`       |
|          | 널 병합 연산자               | 좌결합성 | `… ?? …`         |
| 2        | 조건 (삼항 연산자)           | 우결합성 | `… ? … : …`      |
| 1        | 쉼표 / 시퀀스                | 좌결합성 | `… , …`          |

**🔗 출처:** [MDN 연산자 우선순위](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_precedence?utm_source=chatgpt.com)

---

## 5. Dom 조작

### 📌 태그 가져오기

HTML 요소를 선택하는 두 가지 방법인 `getElementById`와 `querySelector`

### `getElementById`:

- ID를 기준으로 특정 HTML 요소를 선택하는 방법입니다.
- 고유한 ID 값을 사용해 단일 요소를 선택합니다.
- 사용이 간단하고, ID가 정확한 경우에 유용합니다.

#### 예시

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>getElementById Example</title>
  </head>
  <body>
    <div id="myElement">Hello, this is a div!</div>
    <script>
      var element = document.getElementById("myElement");
      element.innerText = "Updated text using getElementById!";
    </script>
  </body>
</html>
```

### `querySelector`:

- CSS 선택자를 사용해 HTML 요소를 선택하는 방법입니다.
- ID 선택자뿐만 아니라 태그 선택자, 클래스 선택자, 다른 복잡한 CSS 선택자도 사용할 수 있습니다.
- 첫 번째로 일치하는 요소만 반환합니다.

#### 예시

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>querySelector Example</title>
  </head>
  <body>
    <div class="myClass">This is a div with a class!</div>
    <a href="https://www.example.com" id="myLink">Click here</a>
    <script>
      var element = document.querySelector(".myClass");
      element.innerText = "Text updated using querySelector with class!";
    </script>
  </body>
</html>
```

### 여러 요소를 선택하려면 `querySelectorAll`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>querySelectorAll Example</title>
  </head>
  <body>
    <p><a href="https://www.example.com">Link 1</a></p>
    <p><a href="https://www.example2.com">Link 2</a></p>
    <script>
      var links = document.querySelectorAll("a");
      links.forEach(function (link, index) {
        link.innerText = "Updated Link " + (index + 1);
      });
    </script>
  </body>
</html>
```

---

### 📌 이벤트 리스너 추가하기

이벤트를 감지하고 특정 동작을 실행하도록 설정할 수 있습니다.

```javascript
function handleClick() {
  console.log("클릭 이벤트 발생");
}
let button = document.getElementById("myButton");
button.addEventListener("click", handleClick);
```

### 📌 이벤트 리스너 제거하기

이벤트 리스너를 삭제하려면 참조할 함수를 변수에 저장해야 합니다.

```javascript
button.removeEventListener("click", handleClick);
```

---

### 📌 키보드와 마우스 이벤트

```javascript
document.addEventListener("keydown", function (event) {
  console.log(`키 눌림: ${event.key}`);
});
```

---

### 📌 태그 속성 다루기

`getAttribute()`와 `setAttribute()`로 속성을 조회하거나 변경할 수 있습니다.

```javascript
let link = document.querySelector("a");
console.log(link.getAttribute("href")); // 속성 가져오기
link.setAttribute("href", "https://www.example.com"); // 속성 변경하기
```

---

### 📌 부모와 자식 태그 찾기

```javascript
let list = document.getElementById("myList");
console.log(list.parentElement); // 부모 요소 찾기
console.log(list.children); // 자식 요소 찾기
```

---

### 📌 새로운 태그 만들기

```javascript
let newElement = document.createElement("p");
newElement.innerText = "새로운 문단 추가!";
document.body.appendChild(newElement);
```

---

### 📌 태그 복제하기

```javascript
let original = document.getElementById("original");
let copy = original.cloneNode(true);
document.body.appendChild(copy);
```

---

📌 **출처**

- [MDN DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
