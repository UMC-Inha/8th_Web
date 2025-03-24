- JS에서 사칙연산을 하는 방법을 작성해주세요. 🍠
    - 더하기
        
        ```jsx
        10 + 7;
        ```
        
        일반적인 더하기 방식
        
        ```jsx
        const num1 = 10;
        const num2 = 50;
        
        num2 + num1;
        ```
        
        변수를이용한 더하기]
        
        대입 연산자 또한 사용 가능하다.
        
    - 빼기
        
        더하기와 마찬가지로 일반적인 빼기 연산과 같은 방법이다. 변수를 통한 빼기도 가능하다.     “ - “ 연산자를 사용한다.
        
    - 곱하기
        
        일반적인 곱하기 연산과 같은 방법이다.
        
         “ * “ 연산자를 사용한다.
        
    - 나누기
        
        일반적인 나누기 연산과 같은 방법이다. “ / “ 연산자를 사용한다.
        
    - 나머지 구하기
        
        일반적인 %연산자를 사용하여 구하는 것이 가능하다,
        
    - 거듭 제곱
        
        ( ** ) 연산자를 사용하여 구하는 것이 가능하다.
        
        ```jsx
        2 ** 3; // 8
        3 ** 2; // 9
        3 ** 2.5; // 15.588457268119896
        10 ** -1; // 0.1
        NaN ** 2; // NaN
        ```
        
- JS에서 비교 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
    1. 동등 비교 (값만 비교)
    
    ```jsx
    ==   // 같음
    !=   // 다름
    ```
    
    1. 일치 비교 (값 + 자료형 비교)
    
    ```jsx
    ===  // 엄격하게 같음 (자료형까지 같아야 true)
    !==  // 엄격하게 다름
    ```
    
    1. 크기 비교
    
    ```jsx
    >    // 초과
    <    // 미만
    >=   // 이상
    <=   // 이하
    ```
    
- JS에서 증가/감소 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
    
    증가 연산자 : ++
    
    감소 연산자:  - -
    
    1. 전위
    
    ++a : 변수 a에 대해 a를 먼저 1 증가시키고 값을 반환
    
      - -a : a를 먼저 1 감소시키고 그 값을 반환
    
    1. 후위
    
    a++ : a의 현재 값을 반환한 다음 1 증가
    
    a - - :  a의 현재 값을 반환한 다음 1 감소
    
- 연산자 우선순위에 대해 작성해주세요. 🍠
    
    기본 개념 : 높은 우선순위가 먼저 실행됨.
    
    우선순위표:
    
    | 1️⃣ | `()` | 괄호 (가장 먼저) | - |
    | --- | --- | --- | --- |
    
    | 2️⃣ | `++`, `--` (prefix), `!`, `typeof` | 단항 연산자 | Right to Left |
    | --- | --- | --- | --- |
    
    | 3️⃣ | `**` | 거듭제곱 | Right to Left |
    | --- | --- | --- | --- |
    
    | 4️⃣ | `*`, `/`, `%` | 곱하기, 나누기, 나머지 | Left to Right |
    | --- | --- | --- | --- |
    
    | 5️⃣ | `+`, `-` | 더하기, 빼기 | Left to Right |
    | --- | --- | --- | --- |
    
    | 6️⃣ | `<`, `>`, `<=`, `>=` | 비교 연산자 | Left to Right |
    | --- | --- | --- | --- |
    
    | 7️⃣ | `==`, `!=`, `===`, `!==` | 동등/일치 비교 | Left to Right |
    | --- | --- | --- | --- |
    
    | 8️⃣ | `&&` | AND (그리고) | Left to Right |
    | --- | --- | --- | --- |
    
    | 9️⃣ | ` |  | ` |
    | --- | --- | --- | --- |
    
    | 🔟 | `=`, `+=`, `-=`, `*=`, ... | 대입 연산자 | Right to Left |
    | --- | --- | --- | --- |
    
    | 0️⃣1️⃣ | `,` | 쉼표 연산자 | Left to Right |
    | --- | --- | --- | --- |
    
    괄호를 활용하면 가독성이 좋아지고 우선순위를 헷갈릴 일이 없다.

- string 🍠
    
    ### string
    
    
    String 타입 :  String 타입은 문자의 집합을 나타내며, 작은 따옴표, 큰 따옴표, 백틱을 사용하여 문자열을 표현할 수 있다.
    
    작은 따옴표와 큰 따옴표는 같은 방식으로 작동하지만, 문자열 내에서 따옴표를 포함해야 할 경우 다르게 사용하는 것이 좋다.
    
    템플릿 리터럴 (Template Literal) : 백틱 ( ` ) 을 사용하여 문자열을 더 유연하게 사용할 수 있다.
    
    장점: 1. 변수 삽입          2. 여러줄 문자열 기능
    
    문자열의 길이를 구할 때는 length 속성을 사용한다. 
    
    ```html
    let text = "HelloUMC!!";
    console.log(text.length); // 10자
    ```
    
    문자열 접근 : 문자열의 각 문자는 인덱스를 통해 접근할 수 있으며, 첫 번째 문자의 인덱스는 0이다.
    
    문자열은 불변하기 때문에 문자열 내에서 개별 수정이 불가능하므로, 수정이 필요할 시에는 새로 만들어야 한다.
    
    주요 문자열 메서드
    
    | `charAt(index)` | 지정한 인덱스의 문자 반환 |
    | --- | --- |
    
    | `charCodeAt(index)` | 해당 문자의 유니코드 반환 |
    | --- | --- |
    
    | `toUpperCase()` | 모든 문자를 대문자로 변환 |
    | --- | --- |
    
    | `toLowerCase()` | 모든 문자를 소문자로 변환 |
    | --- | --- |
    
    | `trim()` | 문자열 앞뒤 공백 제거 |
    | --- | --- |
    
    | `slice(start, end)` | 문자열 일부를 잘라서 반환 |
    | --- | --- |
    
    | `substring(start, end)` | `slice()`와 유사하지만 음수 인덱스 지원 안 됨 |
    | --- | --- |
    
    | `replace(old, new)` | 특정 문자열을 다른 문자열로 교체 |
    | --- | --- |
    
    | `split(separator)` | 문자열을 배열로 변환 |
    | --- | --- |
    
    | `includes(substring)` | 문자열 포함 여부 확인 (`true` / `false`) |
    | --- | --- |
    
    | `indexOf(substring)` | 특정 문자열의 첫 번째 위치 반환 (`-1`이면 없음) |
    | --- | --- |
    
    | `startsWith(substring)` | 특정 문자열로 시작하는지 확인 |
    | --- | --- |
    
    | `endsWith(substring)` | 특정 문자열로 끝나는지 확인 |
    | --- | --- |

### bigint



선언 방법 : 끝에 n 을 붙이면 BigInt 타입이 됨.

BigInt() 생성자는 숫자 또는 문자열을 받아서 BigInt 로 변환할 수 있음. 그러나 소수점 값은 변환할 수 없음.

BigInt는 기본적으로 사칙연산을 지원하며, 특히 나눗셈의 반환값은 항상 정수임.

BigInt 는 Number 와 혼합하여 함께 연산할 수 없음.

따라서 BigInt() 또는 Number()을 사용하여 변환하여 연산해야함.


- 다양한 `Array method`에 대해 정리해주세요. 🍠
    - sort 🍠
        
        배열을 정렬한다.
        
        ```html
        let values = [40, 1, 5, 200];
        values.sort((a, b) => a - b );
        console.log(values); // [1, 5, 40, 200] //오름차순 정
        ```
        
    - join 🍠
        
        배열을 문자열로 반환한다.
        
        ```html
        let words = ["UMC", "Challengers!!"];
        console.log(words.join(" ")); // "UMC Challengers!!"
        ```
        
    - reverse 🍠
        
        배열 요소를 반대로 정렬한다.
        
        ```html
        let nums = [1, 2, 3];
        nums.reverse();
        console.log(nums); // [3, 2, 1]
        ```
        
    - splice 🍠
        
        배열에서 요소를 추가하거나 제거한다.
        
        ```html
        let items = ["a", "b", "c", "d"];
        items.splice(1, 2, "x", "y");
        console.log(items); // ["a", "x", "y", "d"] // 1부터 2를 x, y 로 변
        
        ```
        
    - slice 🍠
        
        배열 일부를 새로운 배열로 반환한다. 그러나 원본 배열은 변하지 않는다.
        
        ```html
        let colors = ["red", "green", "blue", "yellow"];
        console.log(colors.slice(1, 3)); // ["green", "blue", "yellow"] 
        ```
        
    - find 🍠
        
        조건을 만족하는 첫 번째 요소를 반환한다.
        
        ```html
        let numbers = [10, 20, 30, 40];
        let result = numbers.find(num => num > 25);
        console.log(result); // 이 경우, 30을 반환한다.
        ```
        
    - filter 🍠
        
        특정 조건을 만족하는 요소만 필터링한다.
        
        ```html
        let numbers1 = [1, 2, 3];
        let filtered = numbers1.filter(num => num > 1);
        console.log(filtered); // [2, 3] // 1보타 큰 요소들만 출력
        ```
        
    - map 🍠
        
        배열의 각 요소를 변형하여 새로운 배열을 형성한다
        
        ```html
        let numbers2 = [1, 2, 3];
        let doubled = numbers2.map(num => num * 2);
        console.log(doubled); // [2, 4, 6] //각 요소들을 2배하여 출력
        ```
        
    - reduce 🍠
        
        배열을 하나의 값으로 줄인다.
        
        ```html
        
        let numbers3 = [1, 2, 3];
        let sum = numbers3.reduce((acc, num) => acc + num, 0);
        console.log(sum); // 6
        ```
        
    - some  🍠
        
        조건을 만족하는 요소가 하나라도 있으면 true를 반환한다.
        
        ```html
        let numbers4 = [1, 2, 3];
        console.log(numbers4.some(num => num > 2)); // true
        ```
        
    - every 🍠
        
        모든 요소가 조건을 만족해야 true를 반환한다.
        
        ```html
        let numbers5 = [1, 2, 3];
        console.log(numbers5.every(num => num > 0)); // true
        console.log(numbers5.every(num => num > 1)); // false
        ```
        
    - forEach 🍠
        
        배열 요소를 순회한다.  for이나 while과 달리 콜백 함수를 사용하여 배열의 각 요소를 반복하여 처리한다.
        
        ```html
        
        let fruits = ["apple", "banana", "cherry"];
        fruits.forEach((fruit, index) => {
          console.log(`${index}: ${fruit}`);
        });
        // 0: apple
        // 1: banana
        // 2: cherry
        ```


### 호이스팅 (Hoisting) 🍠



호이스팅은 변수 및 함수 선언이 코드 실행 전에 메모리에 미리 할당되는 동작 방식을 의미한다, 즉, 선언이 코드의 최상단으로 끌어올려진 것처럼 동작한다.

```html
test(); 

function test() {
  document.writeln("Hoisting");
}

test();
```

이 경우 가장 위에 있는 test 함수는 본래 실행되면 안되지만, 호이스팅으로 인해 실행된다.

```html

substraction(7,4) //3
function subtraction(a, b) {
	return a - b;
}

subtraction(5, 3); // 2
```

정상적으로 실행된다.


- getter 🍠
    
    ```html
    // 클래스 선언
    class Student {
    	constructor(name, school) {
    		// 필드
    		this.name = name;
    		this.school = school;
    	}
    	get name(){
    	return this.name;
    	}
    	get school() {
    	return this.school;
    }
    }
    ```
    
    getter를 사용해서 name과 school을 반환할 수 있다. get 키워드를 사용하여 정의하고, 속성을 읽을 때 자동으로 호출된다.
    
- setter 🍠
    
    ```html
    // 클래스 선언
    class Student {
    	constructor(name, school) {
    		// 필드
    		this.name = name;
    		this.school = school;
    	}
    }
      set name(newName) {
        if (newName.length > 0) {
          this._name = newName;
        } 
      set school(newSchool) {
        if (newSchool.length > 0) {
          this._school = newSchool;
        }
      }
    }
    ```
    
    setter를 사용해 name과 school 을 정의할 수 있다. set 키워드를 사용하여 정의하며, 속성을 변경할 때 자동으로 호출된다.
    
    위 코드에서는 길이가 0 이상인 값만을 설정할 수 있도록 되어있다.


    ### DOM 조작 🍠



- 태그 가져오기
    
    DOM을 사용하여 html 태그를 가져오고 조작할 수 있다.
    
    1.  id 속성을 이용해서 찾기
    
       HTML에서 id는 유일 한 값이다. 따라서 이 id로 찾게 되면 값 하나만 리턴하게 된다.
    
    document.getElementById()
    
    document.querySelector()
    
    2. 태그명을 이용해서 찾기
    
     HTML에서 태그는 여러 개가 가능하므로 배열로 리턴된다
    
    document.GetElementsByTagName()
    
    document.querySelectorAll()
    
    3. 클래스명을 이용해서 찾기
    
    클래스명은 여러 개가 가능하므로 배열로 리턴된다.
    
    document.getElementByClassName()
    
    document.querySelectorAll()
    
    4. name 속성을 이용해서 찾기
    
    name 속성은 여러 개가 가능하므로 배열로 리턴된다.
    
    document.getElementsByName()
    
    document.querySelectorAll()
    
- 이벤트 리스너 추가하기
    
    JavaScript에서 이벤트리스너를 사용하면, 사용자의 행동에 반응할 수 있다. 
    
    `addEventListener()` 
    이벤트를 동적으로 추가할 때 사용하는 가장 일반적인 방법이다.
    
    동일한 요소에 여러 개의 이벤트를 추가할 수 있고, 동적으로 이벤트 추가 및 삭제가 가능하다.
    
- 이벤트 리스너 제거하기
    
    removeEventListner()
    
    이벤트를 삭제할 때는 이 메서드를 사용한다.
    
    두 가지를 파라미터로 받는다.
    
    - type : 삭제할 이벤트 타입
    - eventListner : 삭제한 이벤트 리스너
    
- 키보드와 마우스 이벤트
    
    마우스 이벤트 정리 :
    
    **mousedown : 요소 위에서 마우스 버튼을 누를 때**
    
    **mouseup : 요소 위에서 마우스 버튼을 누르고 있다가 뗄 때**
    
    **mouseover :  마우스 커서가 요소 바깥으로부터 안으로 움직일 때**
    
    **mousemove :  마우스를 움직일 때**
    
    **click : 마우스 버튼을 사용해 동일 요소 위에서 mousedown과 mouseup 이벤트를 연달아 발생시킬 때.**
    
    **dblclick :  더블클릭**
    
    **contextmenu : 마우스 오르쪽 버튼을 눌렀을 때**
    
    키보드 이벤트 정리:
    
    keydown : 키를 누를 때
    
    keyup : 키를 놓을 때
    
- 태그 속성 다루기
    1. 요소 노드의 속성명으로 접근하기
    
          제일 기초적이고 직관적인 방법.  속성의 이름을 가지고 직접 접근할 수 있다. 그러나 속성명이 일치하지 않는 경우가 있는데, 예를 들어 클래스같은 경우, class 명령은 이미 자바스크립트에 존재하므로 사용할 수 없으니 className 이름으로 접근해야 한다.
    
    2. getAttribute/setAttribute
    
     이 방법은 접근 프로퍼티 명을 생각하지 않아도 되고, 스크립트에서 문자열로 속성명을 변경할 수 있다는 장점을 가지고 있다.
    
    3. attributes 
    
    한 요소에 담긴 다수의 속성을 반환하는 프로퍼티이다. NameNodeMap이라는 객체의 형식으로 반환된다,.
    
    4. innerHTML 
    
    주어지는 문자열을 HTML 문자열로 해석한다. 그래서 문자열에 html 태그가 포함되어 있는 경우 그 태그를 html 문서에 적용시켜 출력한다.
    
    5. textContent innerHTML과 다르게 html 문서로 해석과정 없이 문자열에 써져있는 문자열을 그대로 대입한다. 


- 부모와 자식 태그 찾기
    
    부모노드
    
    - parentNode : 부모 노드 중 모든 노드를 반환한다.
    - parentElement : 부모 노드 중에 요소 노드를 반환한다.
    
    자식노드 :
    
    - childNodes : 모든 자식 노드를 반환한다.
    - children : 자식 노드 중 요소 노드만 반환한다.


    
- 새로운 태그 만들기
    
    createElement()  → let 변수 이름 = document.createElement(’태그’);
    
- 태그 복제하기
    
    cloneNode()
    
    dom node를 복사하는 함수.
    
    var dupnode = node.cloneNode(deep);
    
    node를 복사하여 복사본(dupNode)를 리턴한다.