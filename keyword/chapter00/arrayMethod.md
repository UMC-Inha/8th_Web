- sort 🍠
  - 배열의 요소를 적절한 위치에 정렬하고 배열을 반환
  - 비교 연산이 제공되지 않으면 기본적으로 요소를 문자열로 변환하고 유니 코드 순서에 따라 문자열을 비교하여 정렬
  ```jsx
  var items = [10, 30, 2, 20];
  items.sort();
  console.log(items); // [10, 2, 20, 30];
  ```
  ```jsx
  var items = [10, 30, 2, 20];

  items.sort((a, b) => a - b);
  console.log(items); // [2, 10, 20, 30];
  ```
- join 🍠
  - 배열의 모든 요소를 연결해 하나의 문자열로 만듦
  - 인자로 특정 문자열을 전달하면, 특정 문자열로 구분자로 요소들을 연결
  ```jsx
  var names = ["Yang", "Yujin", "Deogi"];

  console.log(names.join(" ")); // Yang Yujin Deogi;
  console.log(names.join("-")); // Yang-Yujin-Deogi;
  ```
- reverse 🍠
  - 배열의 요소 순서를 뒤집음.
  ```jsx
  const arr = [1, 2, 3, 4, 5];
  arr.reverse();
  console.log(arr); // [5, 4, 3, 2, 1]
  ```
- splice 🍠
  기존 요소를 제거하거나 새 요소를 추가하여 배열의 내용을 변경
  - start: 배열의 변경을 시작하는 인덱스
  - deleteCount: 배열에서 제거를 할 요소의 수
  - itemN: 배열에 추가될 요소, 리턴 값: 삭제된 요소들의 배열의 리턴
  array.splice(start, deleteCount[, item1[, item2[, …]]])
- slice 🍠
  - 배열의 전체 혹은 부분 복제할 때 사용
  - 시작 index(포함)와 끝 index(비포함) 두개를 인자로 받음.
  ```jsx
  var items = [1, 2, 3, 4, 5];
  var copy = items.slice();

  copy[0] = 100;
  console.log(items); // [1, 2, 3, 4, 5]
  console.log(copy); // [100, 2, 3, 4, 5]

  var copy2 = items.slice(2, 3); // [3]
  var copy3 = items.slice(2); // [3,4,5]
  var copy4 = items.slice(-2); // [4, 5]
  ```
- find 🍠
  - 조건을 만족하는 첫 번째 요소를 반환
  - 요소를 찾지 못하면 undefined 반환
  ```jsx
  const arr = [5, 12, 8, 130, 44];
  const result = arr.find((num) => num > 10);
  console.log(result); // 12 (첫 번째로 10 초과인 값)
  ```
- filter 🍠
  - 조건을 만족하는 모든 요소를 새로운 배열로 반환
  - 원본 배열은 변경되지 않는다 !
  ```jsx
  const arr = [5, 12, 8, 130, 44];
  const result = arr.filter((num) => num > 10);
  console.log(result); // [12, 130, 44]
  ```
- map 🍠
  - 배열의 각 요소를 변환하여 새로운 배열을 반환
  - 원본 배열은 변경되지 않는다 !
  ```jsx
  const arr = [1, 2, 3, 4];
  const result = arr.map((num) => num * 2);
  console.log(result); // [2, 4, 6, 8]
  ```
- reduce 🍠
  배열의 요소를 누적 계산하여 반환
  ```jsx
  const arr = [1, 2, 3, 4];
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  console.log(sum); // 10 (1+2+3+4)
  ```
- some 🍠
  배열의 일부 요소가 조건을 만족하면 **`true`**, 아니면 **`false`**를 반환
  ```jsx
  const arr = [5, 12, 8, 130, 44];
  const result = arr.some((num) => num > 100);
  console.log(result); // true (130이 조건 만족)
  ```
- every 🍠
  배열의 모든 요소가 조건을 만족하면 **`true`**, 아니면 **`false`**를 반환
  ```jsx
  const arr = [5, 12, 8, 130, 44];
  const result = arr.every((num) => num > 100);
  console.log(result); // false (130을 제외하고 조건 불만족)
  ```
- forEach 🍠
  - 배열의 각 요소를 반복하면서 콜백 함수를 실행
  - 새로운 배열을 반환하지 않고, 단순히 각 요소에 대해 작업을 수행
  - `value` → 현재 배열 요소
  - `index` → 현재 요소의 인덱스
  - `array` → 현재 배열 (생략 가능)
