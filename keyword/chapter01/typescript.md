### 반환값에 타입을 붙이면 그것이 `TypeScript` 🍠

**실습 정리** 🍠
- string
```typescript
const teri: string = '테리'; // 작은 따옴표

let text: string = "Hello, TypeScript!"; // 큰 따옴표
let template: string = `안녕하세요, ${text}`; // 백틱 
```

- number
```typescript
const age: number = 24;

let intNum: number = 42;
let floatNum: number = 3.14;
let hexNum: number = 0xff; // 16진수
let binNum: number = 0b1010; // 2진수
let octNum: number = 0o52; // 8진수
```

- boolean
```typescript
// true or false 값을 가질 수 있다 
const isGram: boolean = true;
const isMac: boolean = false;
```

- null
```typescript
const isNull: null = null; // 명시적으로 값이 없음
```

- undefined
```typescript
const isUndefined: undefined = undefined; // 변수가 초기화되지 않음 or 존재하지 않음
```


** null과 undefined의 차이점에 대해 직접 작성해주세요! 🍠

    null: 값이 '없음'을 명확히 지정할 때 사용

    undefined: 초기화되지 않은 변수의 기본값

- symbol
    같은 symbol을 생성하더라도 서로 다른 값으로 취급된다. 변경 불가, 객체의 숨겨진 속성으로 활용 가능
```typescript
const isSymbol: symbol = Symbol('symbol');
```

- bigint
```typescript
let bigNumber: bigint = 900930992547140991n; // 매우 큰 정수
let anotherBig: bigint = BigInt(12345678901234567890);
```

- object
```typescript
const yaho: object = { yaho: 'yaho' }; // 객체 표현

let korMame: { firstName: string; lastName: string } = {
    firstName: "Kim",
    lastName: "Minju"
}; //객체는 키-값 쌍을 가지며, 속성을 정의할 수 있음
```

📌 반환값으로, 설정한 타입과 할당한 변수의 타입이 맞지 않으면, 어떻게 되는지 아래에 작성해주세요!
아래와 같이, 반환값이 문자열이라고 예상했지만, 숫자가 들어간 경우, 에러가 발생합니다.

각 실습들의 성공케이스와, 실패케이스를 아래에 정리해주세요!

```typescript
const str: string = "teri"; ✅ 
const str: string = 24; ❌ // 반환값을 문자열로 예상했지만 숫자가 들어감
```
   
### 함수에서의 `TypeScript` 🍠

- 함수 선언식의 특징에 대해 정리해주세요! 🍠
    1. `function` 키워드를 사용하여 선언
    2. 호이스팅 가능 -> 선언 전에 호출 가능
    3. `this`가 호출 컨텍스트(객체)에 바인딩됨
    4. 가독성 좋고 여러 곳에서 재사용하기 편리

    ```typescript
    function add(a: number, b: number): number {
        return a + b;
    }
    console.log(add(2, 3)); // 5

    // 호이스팅 가능
    console.log(greet("Alice")); // ✅ Hello, Alice!

    function greet(name: string): string {
        return 'Hello, ${name}!';
    }

    // 'this'가 호출한 객체에 바인딩 됨
    const obj = {
        value = 42;
        normalFunc = function() { // 함수 선언식
            console.log(this.value); // ✅ this 바인딩 됨
        }
    };

    obj.normalfunc(); // 42
    ```

- 화살표 함수의 특징에 대해 정리해주세요! 🍠
    1. `=>` 문법 사용, 간결함
    2. 호이스팅 불가능 -> 선언 전에 호출 불가
    3. `this`가 정적 바인딩 -> 호출한 객체가 아니라 함수를 선언한 곳의 `this`를 유지
    4. `return`이 필요없는 암시적 반환 사용 가능
    5. 메서드 정의에 적합하지 않음
    ```typescript
    const multiply = (a: number, b: number): number => {
        return a * b;
    }
    console.log(multiply(2, 3)); // 6

    // 호이스팅 불가능
    console.log(subtract(5, 2)); // ❌ error: 호이스팅 안됨

    const subtract = (a: number, b: number): number => a - b; // return 생략

    // this를 함수가 선언된 스코프에서 가져오기 때문에 undefined가 될 수 있음 
    // 화살표 함수 자체는 this를 가지지 않고, 화살표가 선언된 위치의 this를 사용하는 거야
    const obj = {
        value = 42;
        arrowFunc: () => { // 화살표 함수
            console.log(this.value); // ❌ this를 obj가 아닌 상위 스코프(화살표 함수가 선언된 위치의 this)에서 가져옴
        }
    };

    obj.arrowfunc(); // undefined
    ```

### 타입 스크립트에만 존재하는 타입 🍠

- any 🍠: 어떤 타입의 값도 할당할 수 있는 타입

    변수나 매개변수의 타입을 지정하지 않고 런타임에서 동적으로 값을 처리

    타입 검사기를 비활성화하는 역할을 하므로 타입 안정성을 저하시킬 수 있음
    ```typescript
    let value: any;
    value = 42; // 숫자 할당
    value = "hello"; // 문자열 할당
    value = true; // 불리언 할당
    ```

- unknown 🍠: 어떤 값도 할당할 수 있으나, 사용하려면 타입 검사를 통해 타입을 좁혀야 함

    `any`와 비슷하지만 좀 더 안전한 타입

    런타임 오류를 방지할 수 있으며, 타입 안정성 유지 가능
    ```typescript
    let value: unknown;
    value = 42; // 숫자 할당
    value = "hello"; // 문자열 할당
    
    if (typeof value =="string") {
        console.log(value.length); // 이제 문자열이므로 사용 가능
    }
    ```

- void 🍠: 함수가 값을 반환하지 않을 때 사용되는 타입

    보통 반환값이 없는 함수의 반환타입으로 사용되며, 반환값이 없다는 것을 명시적으로 나타냄

    `undefined`와 유사하지만, 값이 없는 상태를 의미하는데 더 사용됨
    ```typescript
    function logMessage(message: string): void {
        console.log(message);
    }
    let result: void = logMessage("Hello, TypeScript!");
    ```

- never 🍠: 결코 값을 반환하지 않는 타입

    실행을 끝내지 않기 때문에 반환값을 가질 수 없다. 주로 무한루프 or 예외를 던지는 함수에서, 그리고 코드 흐름을 제어하는 데 사용
    ```typescript
    function throwError(message: string): never {
        throw new Error(message);
    }
    
    function infiniteLoop(): never {
        while (true) {}
    }
    ```