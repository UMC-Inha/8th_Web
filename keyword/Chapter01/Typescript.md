# TypeScript 타입 및 함수 관련 핵심단어 정리

## 📌 null vs undefined

`null`은 **의도적으로 "값이 없음"을 명시적으로 표현**할 때 사용되며, `undefined`는 **값이 할당되지 않은 변수나 존재하지 않는 프로퍼티**에서 발생합니다.

- `null`은 숫자와 계산될 경우 숫자형으로 **자동 변환되어 0**이 됩니다.
- `undefined`는 숫자와 계산될 수 없어 **NaN**(Not a Number)을 반환합니다.

```ts
typeof null; // "object" (하위 호환성으로 인해 'null'이 아님)
typeof undefined; // "undefined"
null === undefined; // false
null == undefined; // true -> 동등 비교(==)는 타입이 다르면 변환 후 비교
null === null; // true
null == null; // true
!null; // true
isNaN(1 + null); // false -> null은 0으로 변환되어 1
isNaN(1 + undefined); // true -> undefined는 숫자로 변환 불가
```

📎 출처 : [null](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/null)

---

## ✅ 각 타입의 성공/실패 할당 예시

### string

```ts
const str1: string = 123; // ❌
const str2: string = "123"; // ✅
const str3: string = true; // ❌
const str4: string = null; // ❌
const str5: string = undefined; // ❌
const str6: string = Symbol("unique"); // ❌
const str7: string = 123n; // ❌
const person: object = { name: "thunder", age: 25 };
const str8: string = person; // ❌
const str9: string = person.name; // ❌
const person2: { name: string; age: number } = { name: "thunder", age: 25 };
const str10: string = person2.name; // ✅
```

### number

```ts
const num1: number = 123; // ✅
const num2: number = "123"; // ❌
const num3: number = true; // ❌
const num4: number = null; // ❌
const num5: number = undefined; // ❌
const num6: number = Symbol(25); // ❌
const num7: number = 123n; // ❌
const person: object = { name: "thunder", age: 25 };
const num8: number = person; // ❌
const num9: number = person.age; // ❌
const person2: { name: string; age: number } = { name: "thunder", age: 25 };
const num10: number = person2.age; // ✅
```

### boolean

```ts
const bool1: boolean = 123; // ❌
const bool2: boolean = "123"; // ❌
const bool3: boolean = true; // ✅
const bool4: boolean = null; // ❌
const bool5: boolean = undefined; // ❌
const bool6: boolean = Symbol(25); // ❌
const bool7: boolean = 123n; // ❌
const person: object = { name: "thunder", isBreath: true };
const bool8: boolean = person; // ❌
const bool9: boolean = person.isBreath; // ❌
const person2: { name: string; isBreath: boolean } = {
  name: "thunder",
  isBreath: true,
};
const bool10: boolean = person2.isBreath; // ✅
```

### null

```ts
const null1: null = 123; // ❌
const null2: null = "123"; // ❌
const null3: null = true; // ❌
const null4: null = null; // ✅
const null5: null = undefined; // ❌
const null6: null = Symbol(null); // ❌
const null7: null = 123n; // ❌
const person: object = { name: "thunder", money: null };
const null8: null = person; // ❌
const null9: null = person.money; // ❌
const person2: { name: string; money: null } = { name: "thunder", money: null };
const null10: null = person2.money; // ✅
```

### undefined

```ts
const undefined1: undefined = 123; // ❌
const undefined2: undefined = "123"; // ❌
const undefined3: undefined = true; // ❌
const undefined4: undefined = null; // ❌
const undefined5: undefined = undefined; // ✅
const undefined6: undefined = Symbol(undefined); // ❌
const undefined7: undefined = 123n; // ❌
const person: object = { name: "thunder", money: undefined };
const undefined8: undefined = person; // ❌
const undefined9: undefined = person.money; // ❌
const person2: { name: string; money: undefined } = {
  name: "thunder",
  money: undefined,
};
const undefined10: undefined = person2.money; // ✅
```

### symbol

```ts
const symbol1: symbol = 123; // ❌
const symbol2: symbol = "123"; // ❌
const symbol3: symbol = true; // ❌
const symbol4: symbol = null; // ❌
const symbol5: symbol = undefined; // ❌
const symbol6: symbol = Symbol("Symbol"); // ✅
const symbol7: symbol = 123n; // ❌
const person: object = { name: "thunder", money: Symbol("만원") };
const symbol8: symbol = person; // ❌
const symbol9: symbol = person.money; // ❌
const person2: { name: string; money: symbol } = {
  name: "thunder",
  money: Symbol("만원"),
};
const symbol10: symbol = person2.money; // ✅
```

### bigint

```ts
const bigint1: bigint = 123; // ❌
const bigint2: bigint = "123"; // ❌
const bigint3: bigint = true; // ❌
const bigint4: bigint = null; // ❌
const bigint5: bigint = undefined; // ❌
const bigint6: bigint = Symbol(11n); // ❌
const bigint7: bigint = 123n; // ✅
const person: object = { name: "thunder", money: BigInt(123.4) };
const bigint8: bigint = person; // ❌
const bigint9: bigint = person.money; // ❌
const person2: { name: string; money: bigint } = {
  name: "thunder",
  money: BigInt(123.4),
};
const bigint10: bigint = person2.money; // ✅
```

### object

```ts
const object1: object = 123; // ❌
const object2: object = "123"; // ❌
const object3: object = true; // ❌
const object4: object = null; // ❌
const object5: object = undefined; // ❌
const object6: object = Symbol("hello"); // ❌
const object7: object = 123n; // ❌
const person: object = { name: "thunder", money: 123.4 };
const object8: object = person; // ✅
```

---

## 🧠 함수 선언식 특징

```ts
function name([param[, param,[..., param]]]) {
  [statements]
}
```

- `return` 문이 없다면 기본적으로 `undefined` 반환
- **호이스팅 가능**: 선언부가 포함된 범위의 최상단으로 끌어올려져 메모리에 등록됨
- **this**가 바인딩됨
- **생성자로 사용 가능**

📎 출처: [function declaration](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function)

---

## 🧠 화살표 함수 특징

```ts
() => expression

param => expression

(param) => expression

(param1, paramN) => expression

() => {
  statements
}

param => {
  statements
}

(param1, paramN) => {
  statements
}
​
```

- **간결한 표현식 가능** (암시적 반환)
- **this 바인딩 없음**
- **new로 호출 불가능** (생성자 아님)
- **yield 사용 불가** (제너레이터 아님)

📎 출처: [Arrow_functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

## 🍠 타입스크립트 전용 타입 요약

## any

`any`는 타입스크립트에서 **타입 검사 없이 모든 값을 허용**하는 타입입니다.  
타입스크립트 컴파일러가 오류를 발생시키지 않으며, 무엇이든 할 수 있는 유연한 타입입니다.

```tsx
let obj: any = { x: 0 };

// 오류 없이 실행됨
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

📎 출처: [any](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#any)

---

## 🍠 unknown

`unknown`은 `any`와 비슷하게 **모든 타입의 값을 담을 수 있지만**,  
**바로 사용할 수는 없는** 보다 안전한 타입입니다.  
타입 확인이나 타입 단언을 통해 확정된 후에만 사용할 수 있습니다.

```tsx
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  a.b(); // ❌ 오류: 'a'는 unknown 타입
}

const str = value as string;
console.log(str.toUpperCase()); // OK
```

🔐 타입을 보호하지 않으면 접근할 수 없습니다.

📎 출처: [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)

## 🍠 void

`void`는 **아무 값도 반환하지 않는 함수**의 반환 타입을 명시할 때 사용합니다.  
함수에서 `return`을 하지 않거나 `return;`만 있는 경우 타입이 `void`입니다.

```tsx
function noop(): void {
  return;
}
```

`undefined`와는 다르며, 명시적으로 값을 반환하지 않는다는 의미입니다.

📎 출처: [void](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)

## 🍠 never

`never`는 **절대 발생하지 않아야 하는 상황**에서 사용하는 타입입니다.  
예를 들어, switch 문에서 모든 경우를 다 처리한 뒤 남은 **불가능한 케이스를 처리할 때** 사용합니다.

```tsx
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      // Type 'Triangle' is not assignable to type 'never'
      return _exhaustiveCheck;
  }
}
```

📎 출처: [never](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)
