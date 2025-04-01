- **위의 영상을 보고 Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠 ⭐
  return 부분이 실행되어야 하는데 무거운 작업들 때문에 안됨.
  ㄴ실행 값을 넘기지 않고 참조만 넘겨주는 방식을 의미한다.
  **<예시코드>**

  ```jsx
  const getHeavyData = () => {
    return [1, 2, 3, 4, 5]; // 이 데이터가 무겁다고 가정
  };

  let dataRef: (() => number[]) | null = null;

  function getData() {
    if (!dataRef) {
      dataRef = getHeavyData; // 실행 결과가 아니라 참조만 저장
    }
    return dataRef(); // 필요할 때 실행
  }

  // 처음 호출할 때만 무거운 데이터 생성됨
  console.log(getData()); // [1, 2, 3, 4, 5] 반환 (무거운 데이터 생성)
  console.log(getData()); // 기존 데이터 재사용
  ```
