- optional chaining 정리 ⭐⭐
  ### 정의:
  객체에서 **값이 없을 수 있는 속성에 안전하게 접근**할 수 있는 방법이다. 이를 통해 **값이 없을 때 오류를 피할 수 있다.**
  ### 예시:
  ```jsx
  const user = { name: "John", address: { city: "New York" } };

  console.log(user.address.city); // New York
  console.log(user.contact?.phone); // undefined (에러 없이 undefined 반환)
  ```
  - `user.contact?.phone`은 `contact`가 없으면 에러가 발생하지 않고 `undefined`를 반환
  - `?.`는 **옵셔널 체이닝**을 의미하며, 객체에 속성이 없을 경우 안전하게 접근할 수 있게 해준다.
