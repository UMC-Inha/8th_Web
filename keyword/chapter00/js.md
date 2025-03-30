# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

</aside>

- 원시 타입 🍠
    
    ### 원시 타입 (Primitive Type)
    
    자바스크립트에서 원시타입은, 쉽게 정의하면 객체가 아닌 다른 모든 타입을 의미합니다. 객체가 아니기에, 이러한 원시 타입은 메서드를 갖고 있지 않습니다. 
    
    - boolean
        
        ### boolean
        
        거짓과 참을 가질 수 있는 데이터 타입입니다. 주로 조건문에서 많이 사용됩니다.
        
        true / false와 같은 boolean 형의 값 외에도 조건문에서 마치 true와 false 처럼 취급되는 truthy, falsy 값이 존재한다.
        
        ```jsx
        if (1) {
        	// 1을 true로 사용할 수 있다.
        }
        
        if (0) {
        	// 0을 false로 사용할 수 있다.
        }
        
        if (NaN) {
        	// NaN을 false로 사용할 수 있다.
        }
        
        // 그 외에도 null / undefined / 공백이 없는 빈 문자열도 falsy한 값이다.
        ```
        
    - null
        
        ### null
        
        아직 값이 없거나, 비어 있는 값을 표현할 때 사용합니다. 
        
        의도적으로 변수에 값이 없음을 표현하고 싶을 때 null을 사용합니다.
        
        ```jsx
        let matthew = null;
        console.log(matthew);  // null
        ```
        
        null이 가지고 있는 특별한 점은 다른 원시 타입 값과 다르게 타입을 체크했을 때, ‘object’라는 결과가 반환 된다는 점 입니다.
        
        ```jsx
        typeof null === 'object'; // true
        ```
        
        왜 이렇게 개발했을지 의문을 충분히 갖을 수 있습니다. 이는, 초창기 자바스크립트, 개발 시 발생한 문제이고 **`typeof null을 진짜로 null로 표현하고자 하는 많은 시도`**가 있지만, 호환성 문제가 다른 코드에 영향을 주어 받아들여지지 않았다고 합니다.
        
        [Why is typeof null "object"?](https://stackoverflow.com/questions/18808226/why-is-typeof-null-object)
        
    - undefined
        
        ### undefined
        
        `undefined`는 선언한 후 값을 할당하지 않은 변수. 즉, 아직 변수 또는 프로퍼티가 할당되지 않았음을 의미합니다.
        
        ```jsx
        let matthew;
        matthew // undefined;
        
        const matthewObject = {};
        matthewObject.key; // undefined
        ```
        
    - number 🍠
        
        자바스크립트는 bigint가 등장하기 전에는, 모든 숫자를 number라는 타입에 넣기 시작했다.
        
        ECMAScript 표준에 따르면 
        
        $$
        -(2^{53}-1)과 2^{53}-1
        $$
        
        사이의 값을 저장할 수 있다.
        
        ```jsx
        42; // 정수 리터럴
        3.14159; // 부동 소수점 리터럴
        0b1010; // 2진수 리터럴 (binary literal)
        0o755; // 8진수 리터럴 (octal literal)
        0x1A3; // 16진수 리터럴 (hexadecimal literal)
        
        // 천 단위를 읽기 쉽게 해주는 표현(가독성)
        1_000_000; // 숫자 구분 기호 (Numeric Separators)
        ```
        
        Tmi : C/C++ 와 같은 언어에서는 short/long/int/unsigned int/float/ouble 등 다양한 숫자의 타입이 존재한다
        
        - JS에서 사칙연산을 하는 방법을 작성해주세요. 🍠
            - 더하기
                
                "+" 연산자를 사용해 수행 가능
                
                ```jsx
                //간단한 사용 예시
                let a = 5, b = 3;
                let sum = a+b; // 8
                ```
                
                단, 주의해야할 점은 피연산자들의 type을 확인해야 한다는 점이다.
                
                JavaScript에서는 String 타입에서도 "+" 연산자를 지원하기 때문에 다음과 같은 상황이 벌어질 수 있다.
                
                ```jsx
                // case1. string + string = string 
                let a = "5", b = "3"; 
                let sum = a+b; // "53"
                
                // case2. string + number = string 
                let a = "5", b = 3; 
                let sum = a+b; // "53"
                ```
                
                특히, 문자열끼리의 연산(case1)은 당연히 결과값도 문자열이 나올 것이라고 예측할 수 있지만 문자열과 숫자의 연산(case2)은 사실 결과값을 예측하기가 힘들다. 
                
                JavaScript에서는 문자열과 숫자의 연산이 이뤄질 때 암묵적으로 문자열로 변환되기 때문에 case2에서 3이 "3"으로 변환되어 연산된 결과를 보이고 있다.
                
                가장 바람직한 것은 typeof 연산자를 통해 number 타입임을 보장받은 상황에서 사용하는 것이 고, 굳이 String 타입인 상황에서 덧셈 연산을 해야한다면 parseInt()와 같은 메소드를 사용하거나, Number()와 같은 형변환을 한 이후에 연산을 진행해야 의도한 결과가 나올 것이다!
                
            - 빼기
                
                "-" 연산자를 사용해 수행 가능
                
                ```jsx
                // 간단한 사용 예시
                let a = 5, b = 3;
                let result = a-b; // 2
                ```
                
                "+" 연산자와는 다르게 "-" 연산자를 사용할 때는 피연산자들을 암묵적으로 숫자로 변환한다.
                
                따라서, 다음과 같은 상황이 벌어질 수 있다.
                
                ```jsx
                // case1. string - string = number
                let a = "5", b = "3"; 
                let result = a-b; // 2
                
                // case2. string - number = number
                let a = "5", b = 3; 
                let result = a-b; // "2"
                ```
                
            - 곱하기
                
                "*" 연산자를 사용해 수행 가능
                
                ```jsx
                // 간단한 사용 예시
                let a = 5, b = 3;
                let result = a*b; // 15
                ```
                
                마찬가지로 "*" 연산자를 사용할 때도 피연산자들을 암묵적으로 숫자로 변환한다.
                
                따라서, 다음과 같은 상황이 벌어질 수 있다
                
                ```jsx
                // case1. string * string = number
                let a = "5", b = "3"; 
                let result = a*b; // 15
                
                // case2. string * number = number
                let a = "5", b = 3; 
                let result = a*b; // 15
                ```
                
            - 나누기
                
                "/" 연산자를 사용해 수행 가능
                
                ```jsx
                // 간단한 사용 예시
                let a = 5, b = 3;
                let result = a/b; // 1.6666666666666667
                ```
                
                "/" 연산자 역시, 피연산자들을 암묵적으로 숫자로 변환한다.
                
                따라서, 다음과 같은 상황이 벌어질 수 있다.
                
                ```jsx
                // case1. string + string = number
                let a = "5", b = "3"; 
                let result = a*b; // 15
                
                // case2. string + number = number
                let a = "5", b = 3;
                let result = a*b; // 15
                ```
                
                단, 이때 주의해야 할 점은 JavaScrpit에서 특정 값을 0으로 나누면 특수한 값으로 계산된다는 것이다.
                
                ```jsx
                // case1. 양수를 0으로 나누기 = Infinity
                console.log(6/0) // Infinity
                
                // case2. 음수를 0으로 나누기 = -Infinity
                console.log(-6/0) // -Infinity
                
                // case3. 0을 0으로 나누기 = NaN (Not a Number)
                console.log(-6/0) // NaN
                ```
                
                고등교육과정에서 배웠듯이, 0으로 나눈다는 것은 사실 수학적으로 정의되지 않은 연산을 하겠다는 뜻이지만 JavaScript에서는 런타임 에러를 발생시키지 않고 계산 결과로 특수한 값(Infinity, -Infinity, NaN)을 반환하는 방식으로 처리한다.
                
                Tmi : 다른 언어에서는 0으로 나누는 연산을 어떻게 처리할까?
                
                - C/C++ : SIGFPE 시그널 발생시킴(연산 허용x, 오류로 처리)
                
                - Java : ArithmeticException 예외 발생시킴(연산 허용x, 오류로 처리)
                
                - Python : ZeroDivisionError 예외 발생시킴(연산 허용x, 오류로 처리)
                
            - 나머지 구하기
                
                “%" 연산자를 사용해 수행 가능
                
                ```jsx
                // 간단한 사용 예시
                let a = 5, b = 3;
                let result = a%b; // 2
                ```
                
                나머지 연산자는 피연산자 중 왼쪽에 위치한 피연산자의 부호를 따른다.
                
                다음과 같은 상황들이 발생할 수 있다.
                
                ```jsx
                // case1. 양수 % 양수 = 양수
                console.log(10 % 3) // +1
                
                // case2. 음수 % 양수 = 음수
                console.log(-10 % 3) // -1
                
                // case3. 양수 % 음수 = 양수
                console.log(10 % -3) // +1
                
                // case4. 음수 % 음수 = 음수
                console.log(-10 % -3) // -1
                ```
                
                단, 이때 주의해야 할 점은 JavaScrpit에서 특정 값을 0으로 나누면 NaN으로 계산된다는 것이다.
                
            - 거듭 제곱
                
                "**" 연산자를 사용해 수행 가능
                
                ```jsx
                // 간단한 사용 예시
                // let result = base ** exponent;
                let a = 5, b = 2;
                let result = a**b; // 25
                ```
                
                ** 연산자는 우선순위가 높고, **는 오른쪽 결합되어 다음과 상황이 발생할 수 있음
                
                ```jsx
                let result = 2 ** 3 ** 2;  // 2 ** (3 ** 2) = 2 ** 9 = 512
                ```
                
                JavaScript는 ES2016(ES7)부터 거듭제곱 연산자를 도입하였기 때문에 이전에는 Math.pow(base, exponent) 함수를 사용하여 같은 계산을 수행했음!
                
                ```jsx
                let result = Math.pow(2, 3);  // 8
                ```
                
            
        - JS에서 비교 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
            - 비교 연산자란?
                
                피연산자를 서로 비교하고, 비교 결과가 참인지에 따라 논리 값(Boolean type)을 반환하는 연산자
                피연산자로는 숫자, 문자열, 논리형, 객체 값을 사용 가능하며 String type의 경우 Unicode 값을 사용한 표준 사전식 순서에 따라 비교한다.
                
                만약 두 피연산자가 서로 다른 타입이면, JavaScript는 피연산자들을 서로 비교하기에 적합한 타입으로 변환한다. 대부분의 경우에는 두 값을 모두 숫자로 변환한 후에 비교한 결과를 출력한다.
                
                하지만 비교 연산에서 타입 변환을 하지 않는 유일한 예외는 일치 연산자(===)와 불일치 연산자(!==)를 사용해 엄격한 일치/불일치 비교를 수행하는 경우이다
                
            - 비교 연산자의 종류
                - 동등 연산자(==)
                    
                    피연산자들의 값이 같으면 'true', 다르면 'false'를 반환
                    
                    비교하는 두 값의 타입이 다르더라도, 내부적으로 타입을 변환하여 비교!
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1==var2) // false
                    
                    console.log(var1==3) // true
                    
                    console.log(var1=="3") // true
                    
                    console.log(3=="3") // true
                    ```
                    
                    주의할 점은 동등 연산자(==)는 암묵적인 형변환이 발생하기 때문에 예상치 못한 결과를 초래할 수 있다는 점이다. 따라서 대부분의 경우에는 일치 연산자(===)를 사용하는 것이 안전성 측면에서 유리하다.
                    
                - 부등 연산자(!=)
                    
                    피연산자들의 값이 다르면 'true', 같으면 'false'를 반환
                    
                    비교하는 두 값의 타입이 다르더라도, 내부적으로 타입을 변환하여 비교!
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1!=var2) // true
                    
                    console.log(var1!=3) // false
                    
                    console.log(var1!="3") // false
                    
                    console.log(3!="3") // false
                    ```
                    
                    역시 마찬가지로 부등 연산자(!=)는 암묵적인 형변환이 발생하기 때문에 예상치 못한 결과를 초래할 수 있다. 따라서 대부분의 경우에는 불일치 연산자(!==)를 사용하는 것이 안전성측면에서 유리하다.
                    
                - 일치 연산자(===)
                    
                    두 값이 타입과 값이 모두 같으면 'true', 다르면 'false'를 반환
                    
                    비교를 수행하는 과정에서 타입 변환이 이뤄지지 않음!
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1 === var2) // false
                    
                    console.log(var1 === 3) // true
                    
                    console.log(var1 === "3") // false
                    
                    console.log(3 === "3") // false
                    ```
                    
                - 불일치 연산자(!==)
                    
                    두 값이 타입과 값이 모두 다르면 'true', 같으면 'false'를 반환
                    
                    비교를 수행하는 과정에서 타입 변환이 이뤄지지 않음!
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1 !== var2) // true
                    
                    console.log(var1 !== 3) // false
                    
                    console.log(var1 !== "3") // true
                    
                    console.log(3 !== "3") // true
                    ```
                    
                - Greater than 연산자(>)
                    
                    왼쪽 값이 오른쪽 값보다 크다면 ‘true’, 같거나 작다면 ‘false’를 반환
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1 > var2) // false
                    
                    console.log(var1 > 3) // true
                    
                    console.log(var1 > "3") // false
                    
                    console.log(3 > "3") // false
                    ```
                    
                - Greater than or equal 연산자(>=)
                    
                    왼쪽 값이 오른쪽 값보다 크거나 같다면 ‘true’, 작다면 ‘false’를 반환
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1 >= var2) // false
                    
                    console.log(var1 >= 3) // true
                    
                    console.log(var1 >= "3") // true
                    
                    console.log(3 >= "3") // true
                    ```
                    
                - Less than 연산자(<)
                    
                    왼쪽 값이 오른쪽 값보다 작다면 ‘true’, 크다면 ‘false’를 반환
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1 < var2) // true
                    
                    console.log(var1 < 3) // false
                    
                    console.log(var1 < "3") // false
                    
                    console.log(3 < "3") // false
                    ```
                    
                - Less than or equal 연산자(<=)
                    
                    왼쪽 값이 오른쪽 값보다 작거나 같다면 ‘true’, 크다면 ‘false’를 반환
                    
                    ```jsx
                    //간단한 사용 예시
                    const var1 = 3;
                    const var2 = 4;
                    
                    console.log(var1 <= var2) // true
                    
                    console.log(var1 <= 3) // true
                    
                    console.log(var1 <= "3") // true
                    
                    console.log(3 <= "3") // true
                    ```
                    
            
        - JS에서 증가/감소 연산을 하는 여러가지 방법을 조사하여 정리해주세요. 🍠
            - 증감연산자란?
                
                : 변수의 값을 1씩 증가시키거나 1씩 감소시키는 연산자로, “++”, “--” 두 가지 종류가 있다.
                
                var++ 의 경우, var = var+1로 변환할 수 있고 var-- 는 var = var-1 로 변환 가능하다. 
                
                주의할 점은 증감 연산자는 숫자에 직접 사용할 수 없다는 점이다!
                
            - 전위 연산 방식
                
                : 연산자가 변수의 앞쪽에 위치한 방식으로, 먼저 피연산자의 값을 연산(증가 혹은 감소)한 뒤 변경된 값을 반환하는 방식
                
                따라서, 다음과 같은 상황이 발생한다.
                
                ```jsx
                // 전위 연산자의 경우, 즉시 증감이 이뤄짐!
                let var1 = 3;
                
                console.log(++var1); // 4
                
                console.log(var1); // 4
                
                console.log(--var1) // 3
                
                console.log(var1) // 3
                ```
                
            - 후위 연산 방식
                
                : 연산자가 변수의 뒤쪽에 위치한 방식으로, 먼저 피연산자의 값을 반환한 뒤 연산을 진행하는 방식
                
                따라서, 다음과 같은 상황이 발생한다.
                
                ```jsx
                // 후위 연산자의 경우, 즉시 연산이 이뤄지지 않음!
                let var1 = 3;
                
                console.log(var1++); // 3
                
                console.log(var1); // 4
                
                console.log(var1--) // 4
                
                console.log(var1) // 3
                ```
                
            
        - 연산자 우선순위에 대해 작성해주세요. 🍠
            - 연산자 우선 순위란?
                
                : 여러 연산자가 함께 사용될 때, 어느 연산자가 먼저 평가되는 지를 결정하는 지표
                
                JavaScript의 연산자 우선순위 표는 다음과 같다.
                
            - JavaScript의 연산자 우선 순위
                - 우선 순위 숫자
                : 우선순위의 숫자가 클수록 높은 우선 순위를 가지며 그룹 연산자 ( … ) 가 가장 높은 순위를, 쉼표 연산자 (,) 가 가장 낮은 우선 순위를 가진다.
                - 결합성
                    - 좌결합성
                    : 같은 우선 순위의 연산자들이 여러 개 존재할 때, 왼쪽부터 계산하는 성질
                        
                        ```jsx
                        // 예시
                        let a = 5;
                        let b = 3;
                        let c = 1;
                        
                        // - 연산자는 좌결합성이기 때문에 (a-b)-c 의 순서로 계산됌!
                        console.log(a - b - c); // 1
                        ```
                        
                    - 우결합성
                    : 같은 우선 순위의 연산자들이 여러 개 존재할 때, 오른쪽부터 계산하는 성질
                        
                        ```jsx
                        // 예시
                        let a = 1;
                        let b = 2;
                        let c = 3;
                        
                        a = b = c; 
                        // 할당 연산자(=)는 우결합성이기 때문에 a=(b=c)의 순서로 할당됌!
                        // 1. b = c // b=3, c=3
                        // 2. a = b = c // a=3, b=3, c=3 
                        
                        console.log(a); // 3
                        console.log(b); // 3
                        console.log(c); // 3
                        ```
                        
                
                | 우선순위 | 연산자 유형 | 결합성 | 연산자 내용 |
                | --- | --- | --- | --- |
                | 19 | 그룹 | 없음 | `( … )` – 괄호 안의 표현식을 먼저 평가 |
                | 18 | 멤버 접근 및 함수 호출 | 좌결합성 | `… . …`, `… [ … ]`, `new … ( … )`, `… ( … )`, `?.` |
                | 17 | new (인자 리스트 생략) | 우결합성 | `new …` |
                | 16 | 후위 증가 / 후위 감소 | 없음 | `… ++`, `… --` – 현재 값을 반환한 후 증가/감소 |
                | 15 | 단항 연산자 | 우결합성 | `! …`, `~ …`, `+ …`, `- …`, 전위 증가(`++ …`), 전위 감소(`-- …`), `typeof …`, `void …`, `delete …`, `await …` |
                | 14 | 거듭제곱 | 우결합성 | `… ** …` – 오른쪽 결합성 (예: `2 ** 3 ** 2`는 `2 ** (3 ** 2)`) |
                | 13 | 곱셈, 나눗셈, 나머지 | 좌결합성 | `… * …`, `… / …`, `… % …` |
                | 12 | 덧셈, 뺄셈 | 좌결합성 | `… + …`, `… - …` |
                | 11 | 비트 시프트 | 좌결합성 | `… << …`, `… >> …`, `… >>> …` |
                | 10 | 관계 연산자 | 좌결합성 | `< …`, `<= …`, `> …`, `>= …`, `in`, `instanceof` |
                | 9 | 동등 비교 | 좌결합성 | `… == …`, `… != …`, `… === …`, `… !== …` |
                | 7 | 비트 연산자 | 좌결합성 | `… & …`, `… ^ …`, `… \| …` |
                | 5 | 논리 AND | 좌결합성 | `… && …` |
                | 4 | 논리 OR 및 널 병합 | 좌결합성 | `… |
                | 3 | 조건(삼항) | 우결합성 | `… ? … : …` |
                | 2 | 할당 연산자 | 우결합성 | `… = …`, `… += …`, `… -= …`, `… **= …`, `… *= …`, `… /= …`, `… %= …`, `… <<= …`, `… >>= …`, `… >>>= …`, `… &= …`, `… ^= …`, `… |
                | 1 | 쉼표 / 시퀀스 | 좌결합성 | `… , …` – 마지막 표현식의 값이 결과 |
        
    - string 🍠
        1. 문자열의 기본 특성
        - 문자열 리터럴 : 문자열은 큰따옴표("..."), 작은따옴표('...'), 또는 백틱(`…`)을 사용해 정의할 수 있다.
        - 불변성 : 한 번 생성된 문자열은 변경할 수 없으며, 문자열의 일부를 수정하면 새로운 문자열이 생성된다.
        
        2. 문자열 메소드와 프로퍼티
            JavaScript는 문자열을 다루기 위한 다양한 내장 메서드와 프로퍼티를 제공
        
        - 주요 메소드
            - **문자열 길이 확인**
            관련 프로퍼티 : length
            - **문자 접근**
            관련 메소드 : charAt(index)
            - **문자열 추출**
            관련 메소드 : slice(), substring(), substr()
            
            - **문자열 검색**
            관련 메소드 : indexOf(), lastIndexOf(), includes(), startsWith(), endsWith()
            
            - **문자열 대소문자 변경**
            관련 메소드 : toUpperCase(), toLowerCase()
            
            - **문자열 치환**
            관련 메소드 : replace()
            
            - **문자열 분할**
            관련 메소드 : split()
        
        3. 템플릿 리터털 
             ES6부터 도입된 템플릿 리터럴(백틱을 사용하는 문자열)은 여러 줄 문자열과 변수 삽입(문자열 보간)이 가능해져 편리함!
        
        ```jsx
        // 예시
        const name = "Alice";
        const age = 30;
        const message = `이름: ${name}
        나이: ${age}`;
        console.log(message);
        // 출력:
        // 이름: Alice
        // 나이: 30
        ```
        
        1. 문자열과 String 객체
        문자열(string)은 원시 타입이지만, String 객체로 래핑되어 내장 메소드를 사용할 수 있음
        
            - 원시 문자열: const s = "Hello";
            - String 객체: const sObj = new String("Hello");
            
            하지만 일반적으로는 원시 문자열을 사용하며, String 객체를 명시적으로 생성하는 것은 권장되지 않음!
            
            - Why?
                1. **불필요한 객체 래핑 
                :** new String()을 사용하면 원시 값을 감싸는 객체(wrapper)가 생성되는데, 이는 메모리 사용 측면에서 비효율적임
                2. **타입 불일치 문제
                :** 원시 문자열과 String 객체는 일치 비교(===) 시 서로 다른 타입으로 인식되기 때문에 예상치 못한 결과가 나타날 수 있음!
    - symbol
        
        ### Symbol
        
        Symbol 타입은 ES6에서 새롭게 추가된 7번째 타입입니다. 중복되지 않는, 고유한 값들을 나타내기 위해서 만들어 졌습니다. 심벌을 생성하기 위해서는 `Symbol()`을 사용해야 합니다.
        
        왜 Symbol을 사용할까요?
        
        아래의 yongmin이라는 사람도 Matthew라는 영어 이름을 갖고 있고, sua 라는 사람 또한 Matthew 라는 영어 이름을 갖고 있다고 합시다.
        
        ```jsx
        const yongmin = 'Matthew';
        const sua = 'Matthew';
        ```
        
        둘을 `일치 연산자(===)`로 비교하면 어떻게 될까요?
        
        ```jsx
        yongmin === sua // true
        ```
        
        당연히 true가 나옵니다.
        
        하지만, 우리가 원하는 시나리오는, 용민이라는 사람과, 수아라는 사람은 엄연히 다른 사람이기에, false가 나오기를 원한다고 가정해봅시다. 이런 경우 **`Symbol을 활용`**할 수 있습니다.
        
        ```jsx
        const yongmin = Symbol('Matthew');
        const sua = Symbol('Matthew');
        ```
        
        다시 `일치 연산자(===)`로 비교해봅시다.
        
        ```jsx
        yongmin === sua // false
        ```
        
        이처럼 중복되지 않는 어떠한 고유한 값을 나타내고 싶으면 **`Symbol 타입`**을 활용하는 것이 매우 유용합니다.
        
    - bigint 🍠
        
        JavaScript에서 매우 큰 정수를 안전하게 다루기 위해 도입된 원시타입!
        
        - Why Bigint?
            
            JavaScript에는 이미 숫자를 다루는 원시타입(Number)가 존재한다. 하지만 Number가 다룰 수 있는 정수 범위는 -2⁵³ + 1 ~ 2⁵³ - 1 로 제한된다. 따라서 해당 범위를 넘어가는 정수 연산을 위해 BigInt가 도입됨!
            
        - 표현 방법 및 사용
            - 표현식
            : BigInt 리터럴은 숫자 뒤에 n을 붙여서 작성
                
                ```jsx
                const bigNumber = 1234567890123456789012345678901234567890n;
                ```
                
            - 지원하는 연산 
            : bigint는 number에서 지원하는 대부분의 연산을 지원
            
            단, bigint와 number 타입은 서로 섞어서 연산할 수 없음.
            만약 서로 간의 연산을 시도한다면 TypeError가 발생하기 때문에, 필요한 경우 명시적으로 변환을 한 후에 연산을 해야함!
            
        
- 객체 타입 🍠
    
    ### 객체 타입 (Object Type)
    
    위의 7개 원시 타입 제외 자바스크립트를 이루고 있는 대부분의 타입이 바로 객체 타입입니다. 여기에는 배열, 함수, 정규식, 클래스 등이 포함된다.
    
    여기서 한 가지 주목할 것이 **`객체 타입은 참조를 전달`**하기에, **`참조 타입`**으로도 불린다는 것이다.
    
    ```jsx
    const hello1 = () => {}; 
    const hello2 = () => {};
    ```
    
    위의 내용을 보면 실제로, 함수의 내용이 같아 보입니다. 하지만, 서로의 참조가 다르기에 false가 반환됨을 알 수 있습니다.
    
    ```jsx
    hello1 === hello2 // false
    ```
    
    - 배열
        
        ### 배열 (Array)
        
        자바스크립트에서 배열을 만드는 방법
        
        1. **`배열 리터럴 []`** 
        
        ```jsx
        // 배열 리터럴 [] 를 사용하여 만드는 방법
        let matthew = [];
        
        // 각각 인덱스를 [] 안에 넣어, 배열 안에 값을 할당할 수 있다.
        matthew[0] = 'kim';
        matthew[1] = 'yong';
        matthew[2] = 'min';
        
        // i = 0 부터, matthew의 길이 총 3(['kim', 'yong', 'min'], i++ (하나씩 증가)
        for (let i = 0; i < matthew.length; i++) {
        	console.log(matthew[i]);
        }
        ```
        
        ![스크린샷 2024-08-19 오후 2.37.59.png](attachment:60b44166-84c0-44c0-9b7c-59b0ccf931ce:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-08-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.37.59.png)
        
        ```jsx
        // 배열 생성 (초기 값 할당)
        let arr = ['kim', 'yong', 'min'];
        
        // 배열의 크기를 미리 지정하기
        let arr = [,,,]; // undefined가 출력된다.
        ```
        
        1. **Array() 생성자 함수로 배열 생성**
        
        배열 생성
        
        ```jsx
        // 배열 생성
        let arr = new Array();
        
        arr[0] = 'kim';
        arr[1] = 'yong';
        arr[2] = 'min';
        
        for (let i = 0; i < arr.length; i++) {
        	console.log(arr[i]);
        }
        
        // 값을 할당한 채로 배열을 생성할 수 있다.
        let arr = new Array('kim', 'yong', 'min');
        
        // 배열의 크기를 지정하여 생성
        let arr = new Array(3);
        
        // 배열의 크기를 지정하여 생성한 후 원하는 값으로 채워넣을 수 있다.
        new Array(20).fill(0);
        
        // output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ```
        
        - 다양한 `Array method`에 대해 정리해주세요. 🍠
            - sort 🍠
                
                : JavaScript에서 배열을 정렬하기 위한 함수
                
                sort() 메서드는 정렬된 새로운 배열을 반환하는 것이 아니라, 원본 배열을 직접 변경.
                
                숫자 배열의 경우, 기본 정렬은 각 숫자를 문자열로 변환하여 비교하기 때문에 예상과 다른 결과가 나올 수 있음
                
                compareFunction을 통해 다양한 기준으로 정렬 가능!
                
                ```jsx
                // 표현식
                array.sort([compareFunction])
                
                // 예시
                const fruits = ['banana', 'apple', 'cherry'];
                fruits.sort();
                console.log(fruits); // ["apple", "banana", "cherry"]
                
                // 숫자 배열 정렬
                const numbers = [10, 5, 40, 25];
                numbers.sort();
                console.log(numbers); // [10, 25, 40, 5] -> 문자열 "10", "25", "40", "5"로 정렬
                
                // compareFunction 설정
                // 숫자를 오름차순으로 정렬
                numbers.sort((a, b) => a - b);
                console.log(numbers); // [5, 10, 25, 40]
                
                // 객체 배열의 속성을 기준으로 정렬
                const students = [
                  { name: 'Alice', score: 85 },
                  { name: 'Bob', score: 92 },
                  { name: 'Charlie', score: 78 }
                ];
                
                // score 기준 오름차순 정렬
                students.sort((a, b) => a.score - b.score);
                console.log(students);
                // 출력: [{ name: 'Charlie', score: 78 }, { name: 'Alice', score: 85 }, { name: 'Bob', score: 92 }]
                ```
                
            - join 🍠
                
                : JavaScript에서 배열의 모든 요소들을 지정한 구분자를 사용하여 하나의 문자열로 결합하여 반환하는 메소드
                join() 메소드는 새로운 문자열을 반환할 뿐, 원본 배열은 변경하지 않음.
                
                배열의 요소가 문자열이 아닌 경우, 내부적으로 문자열로 변환하며 null이나 undefined가 포함되어 있다면 이를 빈 문자열로 처리함! 
                
                ```jsx
                // 기본 동작
                const fruits = ['apple', 'banana', 'cherry'];
                console.log(fruits.join());       // "apple,banana,cherry"
                console.log(fruits.join(' - '));  // "apple - banana - cherry"
                console.log(fruits.join(''));     // "applebananacherry"
                
                // 여러 타입의 요소가 섞여 있는 경우!
                const mixed = [1, null, 'hello', undefined, true];
                console.log(mixed.join('-'));  // "1--hello--true"
                ```
                
            - reverse 🍠
                
                : JavaScript에서 배열의 요소 순서를 반대로 뒤집어 주는 메소드
                
                새로운 배열을 반환하는 것이 아니라 원본 배열을 직접 수정.
                
                배열을 뒤집은 후, 같은 배열 객체에 대한 참조를 반환함. 즉, 메소드 호출 결과를 변수에 저장하면 원본 배열과 동일한 배열을 참조!
                
                여러 타입이 섞여 있어도 상관없이 적용되며, 단지 배열 내의 순서만 뒤집힘!
                
                ```jsx
                // 기본 예시
                const arr = [1, 2, 3, 4, 5];
                arr.reverse();
                console.log(arr); // [5, 4, 3, 2, 1]
                
                // 참조 예시
                const reversed = arr.reverse();
                console.log(reversed === arr); // true
                
                // 혼합 예시
                const mixed = ['apple', 42, true];
                mixed.reverse();
                console.log(mixed); // [true, 42, "apple"]
                ```
                
            - splice 🍠
                
                : JavaScript에서 배열의 요소를 추가, 제거, 또는 교체하는 데 사용하는 메소드이며 원본 배열을 직접 변경하는 방식으로 동작.
                
                ```jsx
                // 사용법
                array.splice(start, deleteCount, item1, item2, ..., itemN)
                
                // 인자 설명
                // start : 배열의 어느 인덱스에서 변경을 시작할지 지정. 음수 사용 시, 배열 끝에서부터의 오프셋으로 계산!
                // deleteCount : 시작 인덱스부터 몇 개의 요소를 제거할지 지정, 0이라면 무시
                // item1, ... , itemN(선택) : start 위치에 추가할 새 요소들
                
                // 요소 제거
                const numbers = [10, 20, 30, 40, 50];
                const removed = numbers.splice(2, 2); // 인덱스 2부터 2개의 요소 제거 (30, 40)
                console.log(numbers); // [10, 20, 50]
                console.log(removed); // [30, 40]
                
                // 요소 추가
                const fruits = ['apple', 'banana', 'cherry'];
                fruits.splice(1, 0, 'orange', 'grape'); // 인덱스 1 위치에 0개의 요소를 제거하고 'orange'와 'grape' 추가
                console.log(fruits); // ["apple", "orange", "grape", "banana", "cherry"]
                
                // 요소 교체
                const colors = ['red', 'green', 'blue'];
                colors.splice(1, 1, 'yellow'); // 인덱스 1 위치에서 1개의 요소를 제거하고 'yellow'로 교체
                console.log(colors); // ["red", "yellow", "blue"]
                
                // 음수 인덱스 사용
                const letters = ['a', 'b', 'c', 'd', 'e'];
                const removedLetters = letters.splice(-2, 1); // -2는 배열의 끝에서 두 번째 요소('d')를 의미
                console.log(letters); // ["a", "b", "c", "e"]
                console.log(removedLetters); // ["d"]
                ```
                
            - slice 🍠
                
                : JavaScript에서 배열(또는 문자열)의 지정한 범위에 해당하는 부분을 잘라내어 새로운 배열(또는 문자열)을 반환하는 메소드이며 원본 배열이나 문자열은 변경하지 않음. (얉은 복사)
                
                ```jsx
                // 사용법
                array.slice(start, end)
                
                // 인자 설명
                // start : 복사를 시작할 인덱스. 음수 사용 시, 배열 끝에서부터의 오프셋으로 계산
                // end(선택) : 복사를 종료할 인덱스. 해당 인덱스의 요소는 복사 x, 생략하면 배열의 끝까지 복사함
                
                const numbers = [10, 20, 30, 40, 50];
                const slice1 = numbers.slice(1, 4); // 인덱스 1부터 3까지 복사
                console.log(slice1); // [20, 30, 40]
                console.log(numbers); // 원본 배열은 그대로: [10, 20, 30, 40, 50]
                
                // 음수 인덱스
                const letters = ['a', 'b', 'c', 'd', 'e'];
                const slice2 = letters.slice(-3); // 끝에서 3개 요소 복사
                console.log(slice2); // ["c", "d", "e"]
                const slice3 = letters.slice(1, -1); // 인덱스 1부터 마지막 전까지 복사
                console.log(slice3); // ["b", "c", "d"]
                
                // 문자열에서 사용
                const str = "Hello, World!";
                const subStr = str.slice(7, 12);
                console.log(subStr); // "World"
                ```
                
            - find 🍠
                
                : JavaScript에서 배열 내의 특정 조건을 만족하는 첫 번째 요소를 반환하는 메서드. 만약 조건을 만족하는 요소가 없으면 undefined 반환!
                
                배열의 각 요소에 대해 callback 함수를 실행하며, callback이 true를 반환하는 첫 번째 요소를 찾으면 그 요소를 즉시 반환
                
                ```jsx
                // 사용법
                array.find(callback(element[, index[, array]])[, thisArg]);
                
                // 인자 설명
                // 	•	callback: 배열의 각 요소에 대해 호출되는 함수로, 다음 인자를 받습니다.
                //  	•	element: 현재 요소
                //  	•	index (선택): 현재 요소의 인덱스
                //  	•	array (선택): find 메소드를 호출한 배열
                //  •	thisArg (선택): callback 함수 내에서 this로 사용할 값
                
                // 사용 예시
                const numbers = [5, 12, 8, 130, 44];
                
                // 10보다 큰 첫 번째 요소 찾기
                const found = numbers.find(element => element > 10);
                console.log(found); // 12
                ```
                
            - filter 🍠
                
                : JavaScript에서 배열 내의 주어진 조건(콜백 함수)을 만족하는 모든 요소를 새로운 배열로 반환하는 메소드이며 원본 배열은 변경되지 않음.
                
                동작 방식은 다음과 같음
                
                1. 원본 배열의 각 요소에 대해 callback 함수를 실행
                2. callback이 true를 반환한 요소들만 새로운 배열에 포함시켜 반환. 이때, 원본 배열은 변경 x
                
                ```jsx
                // 사용법
                array.filter(callback(element[, index[, array]])[, thisArg]);
                
                // 인자설명
                //	•	callback: 배열의 각 요소마다 호출되는 함수로, 다음 인자를 받음
                //    이 콜백 함수는 각 요소에 대해 boolean 값을 반환해야 하며, true를 반환하면 해당 요소는 새로운 배열에 포함!
                //  	•	element: 현재 요소
                //  	•	index (선택): 현재 요소의 인덱스
                //  	•	array (선택): filter 메소드를 호출한 원본 배열
                //	•	thisArg (선택): 콜백 함수 내부에서 this로 사용될 값을 지정 가능
                
                // 사용 예시
                const numbers = [1, 2, 3, 4, 5, 6];
                
                // 3보다 큰 숫자들만 걸러내기
                const filtered = numbers.filter(num => num > 3);
                console.log(filtered); // [4, 5, 6]
                ```
                
            - map 🍠
                
                : JavaScript에서 배열의 각 요소에 대해 제공된 함수를 호출하여, 그 결과를 새로운 배열로 반환하는 메서드이며 원본 배열은 변경하지 않음.
                
                ```jsx
                // 사용법
                array.map(callback(currentValue[, index[, array]])[, thisArg]);
                
                // 인자설명	
                // •	callback: 배열의 각 요소마다 호출되는 함수로, 아래 인자들을 전달받음
                //   •	currentValue: 현재 처리 중인 요소
                //   •	index (선택): 현재 요소의 인덱스
                //   •	array (선택): map()을 호출한 배열
                // •	thisArg (선택): callback 함수 내에서 this로 사용될 값을 지정 가능
                
                // 사용 예시
                const numbers = [1, 2, 3, 4];
                
                // 각 숫자에 2를 곱한 새로운 배열 생성
                const doubled = numbers.map(num => num * 2);
                console.log(doubled); // [2, 4, 6, 8]
                ```
                
            - reduce 🍠
                
                : JavaScript에서 배열의 각 요소를 순회하며 누적 결과를 하나의 값으로 축약하는 데 사용
                
                ```jsx
                // 사용법
                const result = array.reduce((accumulator, currentValue, index, array) => {
                  // 누적 로직
                  return newAccumulator;
                }, initialValue);
                
                // 숫자 배열의 합계 구하기
                const numbers = [1, 2, 3, 4, 5];
                
                // 초기값을 0으로 설정하고 각 요소를 더함
                const sum = numbers.reduce((acc, curr) => acc + curr, 0);
                console.log(sum); // 15
                
                // 배열의 최댓값 찾기
                const values = [10, 3, 25, 7, 15];
                
                const max = values.reduce((acc, curr) => {
                  return curr > acc ? curr : acc;
                }, values[0]);
                console.log(max); // 25
                ```
                
            - some  🍠
                
                : JavaScript에서 배열의 적어도 하나의 요소가 주어진 조건(콜백 함수)을 만족하는지 검사하는 메소드이며 조건을 만족하는 요소가 하나라도 있으면 true, 그렇지 않으면 false!
                
                조건을 만족하는 요소를 발견하면 즉시 반복을 중단하기 때문에, 배열 전체를 순회하지 않을 수도 있음. 또한, 원본 배열을 변경하지 않음!
                
                ```jsx
                // 사용법
                const result = array.some(callback(element, index, array), thisArg);
                
                // 사용 예시
                const numbers = [1, 3, 5, 7, 8];
                
                // 배열 내에 짝수가 하나라도 있는지 검사
                const hasEven = numbers.some(num => num % 2 === 0);
                console.log(hasEven); // true (8은 짝수이므로)
                
                const fruits = ['apple', 'banana', 'cherry'];
                
                // 배열 내에 'orange'라는 문자열이 포함되어 있는지 검사
                const hasOrange = fruits.some(fruit => fruit === 'orange');
                console.log(hasOrange); // falseㅍ
                ```
                
            - every 🍠
                
                : JavaScript에서 배열의 모든 요소가 주어진 조건(콜백 함수)을 만족하는지 검사하는 메소드. 모든 요소가 조건을 만족하면 true, 하나라도 조건에 맞지 않는 요소가 있으면 false!
                
                조건을 만족하는 요소를 발견하면 즉시 반복을 중단하기 때문에, 배열 전체를 순회하지 않을 수도 있음. 또한, 원본 배열을 변경하지 않음!
                
                ```jsx
                // 사용법
                const result = array.every(callback(element, index, array), thisArg);
                
                // 사용 예시
                const numbers = [2, 4, 6, 8];
                
                // 모든 숫자가 짝수인지 검사
                const allEven = numbers.every(num => num % 2 === 0);
                console.log(allEven); // true
                
                const fruits = ['apple', 'banana', 'cherry'];
                
                // 모든 과일 이름이 'a'를 포함하는지 검사
                const allContainA = fruits.every(fruit => fruit.includes('a'));
                console.log(allContainA); // false (cherry에는 'a'가 없음)
                ```
                
            - forEach 🍠
                
                : JavaScript에서 배열의 각 요소에 대해 주어진 콜백 함수를 한 번씩 호출하는 메소드. 반복 작업을 수행할 때 유용하며, 배열의 모든 요소에 대해 특정 동작을 실행 가능함
                
                ```jsx
                // 사용 예시
                const fruits = ['apple', 'banana', 'cherry'];
                
                fruits.forEach((fruit, index, array) => {
                  console.log(`${index}: ${fruit}`);
                });
                // 출력:
                // 0: apple
                // 1: banana
                // 2: cherry
                ```
                
    - 함수
        
        ### 함수 (function)
        
        ### 함수 선언문
        
        ```jsx
        function subtraction(a, b) {
        	return a - b;
        }
        
        subtraction(5, 3); // 2
        ```
        
        함수 선언문은 표현식이 아닌 일반 문(statement)으로 분류
        
        ### 함수 표현식
        
        ```jsx
        let subtraction2 = function (a, b) {
            return a - b;
        }
        
        subtraction2(5, 3); // 2
        ```
        
        함수 표현식은, 함수를 변수에 할당했다.
        
        ### 화살표 함수
        
        ```jsx
        let subtraction3 = (a, b) => {
        	return a - b;
        }
        
        subtraction3(5, 3); // 2
        ```
        
        ES6에 추가된 화살표 함수도 많이 사용한다.
        
        ### 호이스팅 (Hoisting) 🍠
        
        - **사전적 정의** : 끌어올리기
        - **JavaScript에서 정의** : 실행 중인 코드 내에서 변수 혹은 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 동작을 의미. 단, 호이스팅은 선언만 끌어올려지고 초기화는 끌어올려지지 않음!
        - **동작 방식**
            - 컴파일 단계 : JavaScript 엔진이 코드를 실행하기 전, 소스 코드를 읽어와 변수와 함수의 선언을 먼저 처리함. 이 때, 각 스코프 내의 선언들을 모아서 내부 환경을 생성
            - 실행 단계 : 실제 코드가 위에서부터 차례로 실행될 때, 이때 변수는 이미 선언된 상태!
        
        - **변수 호이스팅 (var, let, const)**
            - var : 변수 선언은 스코프의 최상단으로 끌어올려지지만, 초기화는 원래 위치에서 실행됨.
                
                ```jsx
                console.log(a); // undefined - 선언은 호이스팅 되었으나, 초기화되기 전이므로 undefined
                var a = 10;
                console.log(a); // 10
                ```
                
            - let, const : 선언은 호이스팅되지만, 실제 초기화(할당)는 코드 실행 시점까지 이루어지지 않음. 때문에 변수 선언문보다 먼저 해당 변수를 사용하면 “Temporal Dead Zone, TDZ“에 있게 되어 ReferenceError가 발생
                
                ```jsx
                console.log(b); // ReferenceError: Cannot access 'b' before initialization
                let b = 20;
                ```
                
        - **+ var를 지양하고 const, let을 사용해야 하는 이유**
            - 호이스팅 측면
                - var : 변수 선언은 호이스팅되어 코드 상단으로 끌어올려지지만, 초기화는 원래 위치에서 이루어지므로, 초기에는 undefined 상태가 되어 예상치 못한 버그 가능성 존재
                - let, const : 호이스팅은 발생하지만, TDZ로 인해 선언 전에 접근할 수 없으므로, 보다 명확하고 예측 가능한 코드 작성 가능
            - 중복 선언과 재할당
                - var : 동일한 스코프 내에서 같은 이름의 변수를 여러 번 선언할 수 있어, 의도치 않은 변수 덮어쓰기가 발생할 수 있다.
                - let : 동일한 스코프 내에서 재선언이 금지되어 실수로 인한 변수 충돌 방지
                - const : 재선언 및 재할당 불가능
            - 스코프 측면
                - var : 함수 스코프(Function Scope), 함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조 불가 즉, 함수 내부에서 선언한 변수는 지역 변수이고 함수 외부에서 선언한 변수는 모두 전역 변수!
                
                ```jsx
                var global = "전역";
                if (gloabl == "전역"){
                	var global = "지역";
                	console.log(global); // 지역
                }
                
                console.log(global); // 지역
                ```
                
                - let, const : 블록 스코프(Block Scope), 모든 코드 블록(함수,if문,for문,while문,try/catch문 등)내에서 선언된 변수는 코드 블록{} 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다.
                
                ```jsx
                let global = "전역";
                if (gloabl == "전역") {
                	let global = "지역";
                	console.log(global); // 지역
                }
                
                console.log(global); // 전역
                ```
                
            
        - **함수 호이스팅 (함수 선언문, 함수 표현식, 화살표 함수)**
            - 함수 선언문 : 함수 선언문 전체가 호이스팅되어, 코드의 어느 위치에서든 호출 가능
                
                ```jsx
                greet(); // "Hello" 출력
                
                function greet() {
                  console.log("Hello");
                }
                ```
                
            - 함수 표현식, 화살표 함수 : 변수에 할당되므로, 변수 호이스팅 규칙을 따른다.
                - var로 선언된 함수 표현식은 선언은 호이스팅되지만, 초기화 이전에는 undefined 상태이므로 호출하면 에러가 발생
                - let이나 const로 선언된 함수 표현식 역시 TDZ에 있기 때문에, 초기화 전에 접근하면 ReferenceError가 발생
                
                ```jsx
                sayHi(); // TypeError: sayHi is not a function
                var sayHi = function() {
                  console.log("Hi");
                };
                
                sayHi1(); // ReferenceError: sayHi1 is not defined
                let sayHi1 = function() {
                  console.log("Hi");
                };
                ```
                
    - 클래스
        
        ### 클래스 (class)
        
        Student라는 클래스를 만들어 보겠습니다.
        
        **`class라는 키워드를 이용`**해서 **`선언`**을 해주고, **`constructor 생성자를 이용`**해서, **`나중에 object를 만들 떄 필요한 데이터를 전달`**해주면 됩니다. 
        
        전달 받은 데이터를 class에 존재하는 필드에, 전달된 데이터를 바로 할당해줍니다.
        
        ```jsx
        // 클래스 선언
        class Student {
        	constructor(name, school) {
        		// 필드
        		this.name = name;
        		this.school = school;
        	}
        }
        ```
        
        이번엔 전달받은, 클래스의 이름과, 학교명을 갖고, 자기소개를 하는 **`methods`**를 만들어보겠습니다. 만드는 방법 또한 매우 간단합니다.
        
        ```jsx
        // 클래스 선언
        class Student {
        	constructor(name, school) {
        		// 필드
        		this.name = name;
        		this.school = school;
        	}
        	
        	// 메소드
        	introduction() {
        		console.log(`안녕하세요, ${this.name}입니다. ${this.school}에 다니고있습니다`)
        	}
        }
        ```
        
        아래와 같이 만든 클래스를 이용하여, **`new 키워드를 통해 새로운 object를 만들 수 있습니다.`** name과, school을 맞는 위치에 같이 전달해주면 됩니다.
        
        ```jsx
        const matthew = new Student('matthew', '상명대학교');
        console.log(matthew.name);
        console.log(matthew.school);
        matthew.introduction();
        ```
        
        ![스크린샷 2024-08-19 오후 3.59.50.png](attachment:4df14540-faeb-4238-940f-241c42af9c83:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-08-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.59.50.png)
        
        ### 아래 내용에 대해 추가적으로 학습 후 정리해보아요! 🍠
        
        - getter 🍠
            
            : 객체의 프로퍼티 값을 반환하는 메소드
            
        - setter 🍠
            
            : 객체의 프로퍼티 값을 설정 및 변경하는 메소드
            
        
        ```jsx
        // 클래스 선언(getter와 setter를 추가!)
        class Student {
        	constructor(name, school) {
        		// 필드
        		this.name = name;
        		this.school = school;
        	}
        	
        	// getter
        	getName(){
        		return this.name;
        	}
        	
        	getSchool(){
        		return this.school;
        	}
        	
        	// setter
        	setName(name){
        		this.name = name;
        	}
        	
        	setSchool(school){
        		this.school = school;
        	}
        	
        	// 메소드
        	introduction() {
        		console.log(`안녕하세요, ${this.name}입니다. ${this.school}에 다니고있습니다`)
        	}
        }
        ```
        
        ```jsx
        const returntooz = new Student('oz', '인하대');
        
        console.log(returntooz.getName()); // oz
        console.log(returntooz.getSchool()); // 인하대
        returntooz.introduction(); // 안녕하세요, oz입니다. 인하대에 다니고 있습니다
        
        returntooz.setName('오지환'); // 이름 변경
        returntooz.setSchool('인하대학교 컴퓨터공학과'); // 학교 변경
        
        console.log(returntooz.getName()); // 오지환
        console.log(returntooz.getSchool()); // 인하대학교 컴퓨터공학과
        returntooz.introduction(); // 안녕하세요, 오지환입니다. 인하대학교 컴퓨터공학과에 다니고 있습니다
        ```
        

### react에서 자주 사용하는 자바스크립트 문법

- 구조 분해 할당(Destructuring assignment)
    
    ### 구조 분해 할당 (배열)
    
    구조 분해 할당 구문은, 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담게 하는 JS 표현식입니다.
    
    먼저, react에서는 컴포넌트에 state 변수를 추가할 수 있는 React Hook인 `useState`를 활용합니다.
    
    react를 아직 자세히 모르시는 분은, 이런 것을 나중에 배우는구나 라고 생각하며 이해만 하시면 됩니다. **`useState`**의 구조는 아래와 같습니다.
    
    ```jsx
    const [yongmin, setYongmin] = useState('초기값')
    ```
    
    `useState`는 2개의 배열을 반환하는 함수이며, 첫 번쨰 값을 value 두번쨰 값을 value를 변경하는 setter로 사용이 가능합니다.
    
    ```jsx
    const UMC = ['WEB', 'SPRING', 'NODE', 'iOS', 'Android', 'PLAN', 'DESIGN'];
    
    const [first, , , , , last] = UMC;
    
    first; // 'WEB'
    last; // 'DESIGN'
    ```
    
    배열의 구조 분해 할당은 **`,의 위치에 따라 값이 결정`**됩니다.
    
    위의 방식은, 길이가 긴 배열일 경우,  실수를 할 가능성이 매우 크기에, 배열의 길이가 작은 경우 많이 활용합니다. 배열의 구조 분해 할당은 기본 값을 선언할 수 있습니다.
    
    ```jsx
    const array = [1, 2];
    const [a = 'KIM', b = 'YONG', c = 'MIN'] = array;
    
    // a 1
    // b 2
    // c MIN (준비된 배열의 길이가 총 2개이지만, c는 3번째이기에, 미리 할당한 'MIN'을 출력)
    ```
    
    만약 먼저 선언한 배열의 길이보다, 사용하고자 하는 배열의 길이가 짧거나 값이 없는 경우에는 **`undefined`** 기본값을 사용합니다.
    
    특정 값 이후의 값을 다시 배열로 선언하고 싶은 경우에는 전개 연산자를 활용할 수 있습니다.
    
    ```jsx
    const UMC = ['WEB', 'SPRING', 'NODE', 'iOS', 'Android', 'PLAN', 'DESIGN'];
    const [first, ...etc] = UMC;
    
    first // 'WEB'
    etc // ['SPRING', 'NODE', 'iOS', 'Android', 'PLAN', 'DESIGN']
    ```
    
    ### 구조 분해 할당 (객체)
    
    객체의 구조 분해 할당은, 객체에서 값을 뽑아온 뒤 할당하는 것을 의미합니다. 배열과는 다르게, 객체는, 객체의 내부 이름을 통해 뽑아온다는 차이점이 있습니다.
    
    ```jsx
    const myName = {
    	kim: '김',
    	yong: '용',
    	min: '민',
    }
    
    const { kim, ...rest } = myName;
    
    // kim => '김'
    // rest => { yong: '용', min: '민' }
    ```
    
    기본 값 할당 또한 배열과 동일하게 가능합니다.
    
    ```jsx
    const myName = {
    	yong: '용',
    	min: '민',
    }
    
    const { yong = '야', min = '호', yaho = '야호' } = myName
    
    yong // '용'
    min // '민'
    yaho // '야호'
    ```
    
    리액트에서 어떠한 값들을 전달 할 떄, props를 통해 부모에서 자식 컴포넌트로 값을 전달할 떄 많이 활용되는 방식이므로 꼭 알고 있어야 하는 문법입니다.
    
    ```jsx
    // props.name, props.age 이러한 식으로 접근해야하지만
    // 구조 분해 할당을 통해서 name, age로 접근이 가능합니다.
    function ChildComponent({ name, age }) {
    	return (
    		<>
    			<h1>안녕하세요 {name}입니다.<h1/>
    			<span>{age}살 입니다.</span>
    		</>
    	)
    }
    ```
    
    위의 리액트 코드는 웹을 처음 접하시면 당연히 이해할 수 없지만, 이러한 방식으로 많이 활용된다는 점을 이해해주시면 됩니다.
    
- 전개 연산자 (Spread Operator)
    
    ### 전개 연산자 (Spread Operator)
    
    React를 활용하여 웹 프로젝트를 진행하다보면, 배열 간에 합성을 해야 할 경우가 상당히 많이 생깁니다. 전개 연산자가 나오기 이전에는 배열 간 합성을 하기 위하여 `push`, `splice`, `concat`과 같은 배열 메서드를 사용해야 했습니다. 그러나, 전개 연산자를 활용하면, 배열을 쉽게 합성할 수 있습니다.
    
    ```jsx
    const yaho = ['y', 'a']
    const realYaho = [...yaho, 'h', 'o'] // ['y', 'a', 'h', 'o']
    ```
    
    여기서, 살짝 참조에 관한 개념을 짚고 넘어가겠습니다.
    
    ```jsx
    const yongmin = ['Kim', 'Yong', 'Min'];
    const yongmin2 = yongmin;
    
    yongmin === yongmin2; // true
    ```
    
    위의 결과 값이 true가 나온 이유는 무엇일까요? 내용이 아닌 **`객체의 참조 주소를 복사하기에 true가 반환`**됩니다.
    
    하지만, 전개 연산자를 활용하게 되면, 기존 배열에 영향을 미치지 않고, 배열을 복사하는 것이 가능합니다.
    
    ```jsx
    const yongmin = ['Kim', 'Yong', 'Min'];
    const yongmin2 = [...yongmin];
    
    yongmin === yongmin2; // false
    ```
    
    실제로 값만 복사하고, 참조가 다르기에 false가 반환됩니다.
    
    ### 전개 구문 (객체)
    
    ```jsx
    const KIM_YONG_MIN = {
    	Kim: '김',
    	Yong: '용',
    	Min: '민'
    }
    
    const KIM_YONG_MIN_2 = {
    	Ma: '매',
    	tthew: '튜'
    }
    
    const EN_KO_NAME = { ...KIM_YONG_MIN, ...KIM_YONG_MIN_2 };
    // {Kim: '김', Yong: '용', Min: '민', Ma: '매', tthew: '튜'}
    ```
    
    객체를 새로 만들 때 전개 구문을 활용할 수 있고, 객체를 합성하는 데 편리함을 제공해준다.
    
    ```jsx
    const kim = {
    	k: 'K',
    	i: 'I',
    	m: 'M',
    }
    
    const object1 = {
    	...kim,
    	m: 'N'
    } // {k: 'K', i: 'I', m: 'N'}
    
    const object2 = {
    	m: 'N',
    	...kim
    } // {m: 'M', k: 'K', i: 'I'}
    ```
    
    전개 연산자 이후, 값을 할당한다면, 전개 연산자를 값 할당 이전에 활용하냐, 이후에 활용하냐에 따라, 결괏값이 완전히 달라짐을 유의하자.
    
- 객체 초기자(object shorthand assignment)
    
    ### 객체 초기자
    
    객체 초기자 또한, 상당히 많이 활용하는 방식이다.
    
    객체에 집어 넣고자 하는 키와 값을 가지고 있는 변수가 이미 존재한다면, 해당 값을 매우 간단하게 넣을 수 있는 방식이다.
    
    ```jsx
    const easy = 'easy';
    const hard = 'hard';
    
    const difficulty = {
    	easy,
    	hard,
    }
    
    // {easy: 'easy', hard: 'hard'}
    ```
    
- Array 프로토타입의 메서드
    - map
        
        ### map
        
        map은 인수로 전달받은 배열과 동일한 길이의 새로운 배열을 반환하는 메서드입니다. 배열의 아이템을 순회하면서, 콜백으로 연산한 결과의 새로운 배열을 만들 수 있습니다.
        
        ```jsx
        const numbers = [1, 2, 3, 4, 5, 6];
        
        const numbersPlusTwo = numbers.map((number) => number + 2);
        // [3, 4, 5, 6, 7, 8]
        ```
        
        React에서는 data들을, 배열에 담아, 해당 내용들을 리액트 요소로 반환할 떄 많이 사용합니다.
        
        ```jsx
        const KimYongMin = ['김', '용', '민'];
        
        const ReturnElement = KimYongMin.map((name) => {
        	return <div key={name}>{name}</div>
        });
        ```
        
    - filter
        
        ### filter
        
        `filter()` 메서드는 주어진 배열의 일부에 대한 얕은 복사본을 생성하고, 주어진 배열에서 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다.
        
        ```jsx
        // 길이가 5 이하인 단어만 출력하는 방법
        const words = ['sweetPotato', 'Potato', 'haha', 'yaho'];
        
        const answer = words.filter((word) => word.length < 6);
        // ['haha', 'yaho']
        ```
        
    - reduce
        
        ### reduce
        
        map, filter를 쉽다고 생각하셨으면 reduce와 같은 경우는 조금 어렵게 느껴지실 수 있습니다. 해당 메서드는 콜백 함수이외에 initial value (초깃값)을 추가로 인수를 받습니다.
        
        초깃값이 무엇인지에 따라 어떠한 타입의 무엇인가를 반환할 수 있는 메서드가 바로 reduce 입니다.
        
        보통, 어떠한 값을 누적해서 더할 때 많이 사용합니다.
        
        ```jsx
        const numbers = [10, 20, 30, 40, 50];
        
        // result의 초기값은 0이라고 생각하면 쉽다.
        const sum = numbers.reduce((result, number) => {
        	return result + number;
        }, 0);
        
        sum // 150
        ```
        
        reducer 콜백 함수의 첫 번쨰 인수는 초깃값의 현재값을 의미, 두 번쨰 인수는 현재 배열의 아이템이다.
        
    - forEach
        
        ### forEach
        
        `forEach` 함수는 콜백 함수를 받아 배열을 순회하면서, 단순히 해당 콜백 함수를 실행만 하는 메서드입니다.
        
        ```jsx
        const Matthew = ['M', 'A', 'T', 'T', 'H', 'E', 'W'];
        
        Matthew.forEach((alpha) => console.log(alpha));
        
        // M, A, T, T, H, E, W
        ```
        
        forEach는 아무런 반환값이 없습니다. 단순히 콜백함수를 실행만 시키고, map 처럼 결과를 반환하는 작업은 하지 않습니다. (forEach의 반환값은 undefined로 의미가 없다.)
        
    - length
        
        ### length
        
        **`length`** 데이터 속성은 해당 배열의 요소 수를 나타냅니다. 
        
        ```jsx
        const Matthew = ['M', 'A', 'T', 'T', 'H', 'E', 'W'];
        
        Matthew.length // 7
        ```
        
- 삼항 조건 연산자 (Ternary Operator)
    
    ### 삼항 조건 연산자
    
    **조건 (삼항) 연산자**는 JavaScript에서 세 개의 피연산자를 받는 유일한 연산자입니다. 앞에서부터 조건문, 물음표(`?`), 조건문이 참(truthy)일 경우 실행할 표현식, 콜론(`:`), 조건문이 거짓([falsy](https://developer.mozilla.org/ko/docs/Glossary/Falsy))일 경우 실행할 표현식이 배치됩니다. 해당 연산자는 [`if...else`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/if...else)문의 대체재로 빈번히 사용됩니다.
    
    ```jsx
    const number = 27;
    
    const isOdd = number % 2 !== 0 ? true : false 
    // true (27은 홀수 이므로)
    ```
    
    아래와 같은 기준이라고 생각하면 이해하기 쉽다.
    
    ```jsx
    조건문 ? 조건문이 참인 경우 값 : 조건문이 거짓인 경우 값;
    ```
    

### DOM 조작 🍠

<aside>
💡

DOM 조작은 웹 개발에서 매우 중요한 개념으로, 미션 1을 수행하는 데 필수적인 내용을 다루고 있습니다. 특히, React와 같은 프론트엔드 라이브러리와 밀접하게 연관되어 있기 때문에, 이 부분에 대한 깊이 있는 이해는 필수적입니다.

구글 검색을 통해 관련된 자료들을 찾아보면 DOM 조작에 대한 매우 상세하고 유익한 설명을 쉽게 얻을 수 있습니다. 이러한 자료들을 참고하여 DOM 조작에 대한 핵심 키워드를 정리하고, 워크북에 체계적으로 기록해 주시기 바랍니다.

DOM 조작은 브라우저 상에서 HTML 문서의 구조를 동적으로 수정하고, 사용자와의 상호작용을 처리하는 중요한 방법론입니다. JavaScript를 통해 DOM을 조작하는 방법을 정확히 이해하고 익히는 것이 앞으로의 학습에 큰 도움이 될 것입니다. React에서의 상태 관리와 컴포넌트 렌더링 최적화 역시 DOM 조작의 원리를 기반으로 하고 있기 때문에, 시간을 들여 꼼꼼히 학습하시길 바랍니다.

- UMC 7th 중앙 WEB 파트장 매튜/김용민 - 

</aside>

- DOM(Document Object Model) 객체란?
    
    : 문서 객체 모델(The Document Object Model, 이하 DOM) 은 HTML, XML 문서의 프로그래밍 interface 이다. DOM은 문서의 구조화된 표현(structured representation)을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다. DOM 은 nodes와 objects로 문서를 표현한다. (HTML 문서는 계층적 트리 구조로 구성됨.) 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할을 담당한다.
    
- 태그 가져오기
    - 프로퍼티
        - tagName 
        : 해당 요소의 태그 이름을 반환(HTML 요소의 경우, 항상 대문자로 반환)
            
            ```jsx
            const el = document.getElementById("example");
            console.log(el.tagName); // 예: "DIV"
            ```
            
        - nodeName 
        : 해당 요소의 노드 이름을 반환. 기본적으로 tagName과 동일하게 동작하지만, 노드의 종류에 따라 반환되는 값이 다르다.
            
            ```jsx
            // 요소 노드
            const element = document.createElement("p");
            console.log(element.nodeName); // "P" (HTML에서는 대문자로 반환)
            
            // 텍스트 노드
            const text = document.createTextNode("Hello");
            console.log(text.nodeName); // "#text"
            
            // 주석 노드
            const comment = document.createComment("This is a comment");
            console.log(comment.nodeName); // "#comment"
            ```
            
        - 요소의 로컬 이름(네임스페이스 접두사를 제외한 부분)을 반환. HTML 요소의 경우 보통 소문자로 반환
    - 메소드
        - document.getElementById(id)
        : 지정한 ID를 가진 단일 요소를 반환
            
            ```jsx
            const el = document.getElementById("example");
            ```
            
        - document.getElementsByTagName(tagName)
        : 지정한 태그 이름을 가진 모든 요소들을 라이브 HTMLCollection으로 반환
            
            ```jsx
            const divs = document.getElementsByTagName("div");
            ```
            
        - document.getElementsByTagNameNS(namespace, localName)
        : 지정한 네임스페이스와 로컬 이름을 가진 모든 요소들을 라이브 HTMLCollection으로 반환. 주로 SVG나 XML 문서에서 사용
            
            ```jsx
            const svgs = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "svg");
            ```
            
        - document.querySelector(selector)
        : 지정한 CSS 선택자와 일치하는 첫 번째 요소를 반환.
            
            ```jsx
            // HTML tag 이름
            const firstDiv = document.querySelector("tag");
            firstDiv.style.color = "red";
            
            // css class 이름
            const secondDiv = document.querySelector(".class");
            secondDiv.style.color = "red";
            
            // css id 이름 
            const thirdDiv = document.querySelector("#id");
            thirdDiv.style.color = "red";
            ```
            
        - document.querySelectorAll(selector)
        : 지정한 CSS 선택자와 일치하는 모든 요소들을 정적 NodeList로 반환.
            
            ```jsx
            const el = document.querySelectorAll(selector);
            ```
            
- 이벤트 리스너 추가하기
    - element.addEventListener(eventType, callback, useCapture);
        
        ```jsx
        // case1. 클릭 이벤트 리스너 추가
        const button = document.getElementById('myButton');
        button.addEventListener('click', function(event) {
          console.log('버튼이 클릭되었습니다!');
        });
        
        // case2. 화살표 함수 활용
        const divElement = document.querySelector('.myDiv');
        divElement.addEventListener('mouseover', (event) => {
          console.log('마우스가 요소 위에 있습니다.');
        });
        ```
        
- 이벤트 리스너 제거하기
    - element.removeEventListener(eventType, callback, useCapture);
        
        ```jsx
        // 이벤트 리스너 함수 정의
        function handleClick(event) {
          console.log('이벤트 발생!');
        }
        
        // 이벤트 리스너 추가
        const element = document.getElementById('myElement');
        element.addEventListener('click', handleClick);
        
        // 이벤트 리스너 제거
        element.removeEventListener('click', handleClick);
        ```
        
- 키보드와 마우스 이벤트
    - 주요 키보드 이벤트
        
        •	keydown: 키가 눌릴 때 발생 (누르는 순간)
        •	keypress: 문자 입력 시 발생 (일부 브라우저에서만 사용)
        •	keyup: 키를 뗄 때 발생
        
    - 주요 마우스 이벤트
        
        •	click: 요소를 클릭할 때 발생
        •	dblclick: 더블 클릭할 때 발생
        •	mousedown / mouseup: 마우스 버튼을 누르거나 뗄 때 발생
        •	mouseover / mouseout: 마우스가 요소 위에 들어오거나 나갈 때 발생
        •	mousemove: 마우스가 움직일 때 발생
        
- 태그 속성 다루기
    - getAttribute(attributeName): 지정한 속성의 값을 가져옴
    - setAttribute(attributeName, value): 지정한 속성의 값을 설정함
    - removeAttribute(attributeName): 지정한 속성을 제거함
- 부모와 자식 태그 찾기
    - 부모 요소 찾기
        - parentNode: 해당 노드의 바로 상위 노드를 반환. 이때, 반환되는 부모가 반드시 Element 타입일 필요는 없으며, Document 노드가 될 수도 있음!
        - parentElement: 부모 노드가 실제 Element인 경우에만 그 요소를 반환
    - 자식 요소 찾기
        - children: 자식 요소들을 HTMLCollection 형태로 반환 (텍스트 노드 제외)
        - childNodes: 모든 자식 노드(요소, 텍스트, 주석 등)를 NodeList 형태로 반환
        - querySelector / querySelectorAll: 특정 선택자 기준으로 자식 요소를 검색
        
        ```jsx
        const container = document.getElementById('container');
        
        // 모든 자식 요소들
        const children = container.children;
        console.log(children);
        
        // 특정 자식 요소 검색 (예: 클래스가 "item"인 요소들)
        const items = container.querySelectorAll('.item');
        items.forEach(item => console.log(item));
        ```
        
- 새로운 태그 만들기
    - 새로운 태그 생성
        
        • document.createElement(tagName): 새로운 요소를 생성
        
    - 태그 삽입 방법
        
        • appendChild(newNode): 자식 노드로 마지막에 추가
        • insertBefore(newNode, referenceNode): 특정 노드 앞에 추가
        
    
    ```jsx
    // 새 div 요소 생성
    const newDiv = document.createElement('div');
    newDiv.textContent = '새로운 요소입니다!';
    newDiv.setAttribute('class', 'new-item');
    
    // body의 마지막에 추가
    document.body.appendChild(newDiv);
    ```
    
- 태그 복제하기
    - cloneNode(deep) : deep의 값을 true로 주면 해당 요소와 해당 요소의 모든 자식 노드까지 복제, false라면 해당 요소만 복제
    
    ```jsx
    const original = document.getElementById('originalElement');
    
    // 요소와 자식 모두 복제
    const cloneDeep = original.cloneNode(true);
    
    // 요소만 복제 (자식은 복제하지 않음)
    const cloneShallow = original.cloneNode(false);
    
    // 복제한 요소를 원하는 위치에 추가
    document.body.appendChild(cloneDeep);
    ```