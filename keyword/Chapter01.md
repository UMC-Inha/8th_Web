- **null과 undefined의 차이점에 대해 직접 작성해주세요!** 🍠
    
    undefined는 값을 설정하지 않았을 때 발생하는 상태이며, null은 값이 없음을 의도적으로 설정하는 값이다.
    
    따라서 변수 선언 후 초기화되지 않으면 자동으로 undefined가 되고, null은 직접 할당해야 한다.


- 실습 정리 🍠
    - string
        
        ```html
        
        let str: string = "hello"; // 정상 작동
        let str: string = 123; // 정상 작동 X number 타입을 가져왔을 때
        ```
        
    - number
        
        ```html
        let num: number = 42; // 정상 작동
        let num: number = "42"; // 정상 작동 X string type을 가져왔을 때
        ```
        
    - boolean
        
        ```html
        let isTrue: boolean = true; // 정상 작동
        let isTrue: boolean = "true"; // 정상 작동 X  string type을 가져왔을 때.
        
        ```
        
    - null
        
        ```html
        let nothing: null = null; // 정상 작동
        let nothing: null = undefined; // 정상 작동 X undefined를 가져왔을 때
        ```
        
    - undefined
        
        ```html
        let undef: undefined = undefined; // 정상 작동
        let undef: undefined = null; // 정상 작동 X null을 가져왔을 때 
        
        ```
        
    - symbol
        
        ```html
        let sym: symbol = Symbol("id"); // 정상 작동
        let sym: symbol = "id"; // 정상작동 X string을 가져왔을 때
        ```
        
    - bigint
        
        ```html
        let big: bigint = 100n; // 정상 작동
        let big: bigint = 100; // 정상 작동 X number을 가져왔을 때
        ```
        
    - object
        
        ```html
        let obj: object = { name: "Michael" }; // 정상 작동
        let obj: object = "Michael"; // 정상 작동 X string을 가져왔을 때
        ```


## 함수에서의 Typescript

- 함수 선언식의 특징에 대해 정리해주세요! 🍠
    1. Hoisting 
    
        함수 선언식은 호이스팅 되어서 함수가 선언되기 전에 호출할 수 있음.
    
    2. 명확한 타입 지정 가능
    
       함수의 매개변수와 반환 타입을 명확하게 지정할 수 있음.
    
    ```html
    function add(a: number, b: number): number {
        return a + b;
    }
    //a와 b의 타입이 number로 지정되었고 반환타입도 number로 지정됨
    ```
    
    3. 함수 선언식은 function 키워드로 선언하고, 이름을 포함해야 함. 
    
     
    
    4. 선택적 매개변수 
    
       매개변수 “?” 을 사용하여 선택적으로 만들 수 있음.
    
    5. 기본 매개변수 설정.
    
     매개변수에 기본값을 설정할 수 있음
    
    ```html
    function UMC(name: string = "Challenger"): string { //기본값으로 Challenger을 설정.
        return `Hello, ${name}!`;
    }
    
    console.log(UMC()); // "Hello, Challenger!"
    console.log(UMC("Michael")); // "Hello, MIchael!"
    
    ```
    
    6. 오버로딩
    
    같은 함수 이름으로 다른 매개변수 타입과 개수를 정의할 수 있음.
    
    ```html
    function add(a: number, b: number): number;
    function add(a: string, b: string): string;
    function add(a: any, b: any): any {
        return a + b;
    }
    
    console.log(add(10, 20)); // 30
    console.log(add("Hello, ", "UMC!")); // "Hello, UMC!"
    
    ```
    
- 화살표 함수의 특징에 대해 정리해주세요! 🍠
    1. 기본 문법
    
    화살표 함수는 function 키워드 없이 “⇒” 를 사용하여 선언함.
    
    ```html
    const add = (a: number, b: number): number => {         //=> 를 사용하여 선언
        return a + b;
    };
    console.log(add(3, 5)); // 8
    ```
    
    2. this 바인딩이 없음.
    
     화살표 함수는 자신만의 this를 가지지 않음. 
    
    3. 암시적 반환
    
    중괄호 ( “{ }”) 없이 한 줄로 표현하여 암시적으로 값을 반환할 수 있음. 
    
    ```html
    const square = (x: number): number => x * x;
    
    console.log(square(4)); // 16
    ```
    
    4. 괄호 생략
    
    매개변수가 하나일 때는 괄호를 생략 가능하며, 없거나 2개 이상일 때는 ()가 필수임.
    
    ```html
    const greet = name => `Hello, ${name}!`;   //괄호를 그냥 생략
    console.log(greet("Michael")); // "Hello, Michael!"
    
    const sayHello = () => "Hello!";  // 매개변수가 a, b 두 개이브로 () 필수
    const add = (a, b) => a + b;
    ```



- 타입 스크립트에만 존재하는 타입 🍠
    - any 🍠
        - 아무 타입이나 될 수 있음 (타입 검사를 비활성화하여, 어떤 타입이든 할당 가능)
        - 런타임 오류를 유발할 가능성이 있음. 안전 X
        - any를 사용하면 잘못된 연산을 해도 타입스크립트가 체크하지 않으므로 되도록 사용하지 않는 것이 좋음.
    - unknown 🍠
        - any와 비슷하지만 더 안전한 타입.
        - 어떤 값이든 할당 가능하지만, 사용할 때 타입을 확인해야함.
        - any보다 안전하고, 사용하기 전에 타입 체크를 해야함.
        - 직접적인 연산을 하면 컴파일 오류가 발생함.
    - void 🍠
        - 값을 반환하지 않는 함수에 사용함.
        - undefined와 유사하지만, 명시적으로 값을 반환하지 않는 경우에 적합함.
    - never 🍠
        - 절대로 값이 반환되지 않는 경우에 사용함.
        - 함수가 절대 끝나지 않고나, 오류를 던지는 경우에 사용함.  ex) 무한 루프, 예외 던지기