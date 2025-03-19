- string 🍠

  ### string

    <aside>
    💡 string: 문자열을 표현하는데 사용되는 데이터 타입
    
    </aside>
    
    객체로서 활용가능한 **`property`**와 **`method`**를 가지고 있는 특이한 형태의 데이터 타입
    
    - string property : length
        
        별도의 내장함수를 사용하지 않고, 문자열이 가지고 있는 property인 length로 그 길이를 알 수 있다.
        
        ```jsx
        console.log("Deogi".length); // 5
        ```
        
    - string method: replace(), charAt(), toUpperCase(), split()
        
        문자열을 여러가지 형태로 변환하거나 문자열 정의에서 밝힌 문자 하나하나의 연결 중 특정 위치의 값을 가져오는데 활용할 수 있다. 
        
        ```jsx
        console.log("Deogi".charAt(0));
        //D
        //문자열의 특정 자리에 위치한 문자를 반환
        
        console.log("hello world".replace("hello","goodbye"));
        //goodbye world
        //문자열 치환
        
        console.log("hello world".toUpperCase());
        //HELLO WORLD
        //문자열을 대문자로 변경
        
        console.log("1-2-3-4-5".split("-"))
        //["1","2"."3","4","5"]
        //"-"를 기준으로 문자열을 나누어 [배열]로 반환
        ```

- bigint 🍠
  ### bigint
    <aside>
    💡 bigint: Number 원시 값이 안정적으로 나타낼 수 있는 최대치인 2^53-1보다 큰 수를 표현할 수 있는 내장 객체
    
    </aside>
    
    사용법: 정수 뒤에 n을 붙이거나 함수 BigInt()를 호출해 사용
    
    ```jsx
    const bigIntEx = 90001020304030403n;
    
    const bigIntExtwo = BigInt(3043002030202302);
    ```

