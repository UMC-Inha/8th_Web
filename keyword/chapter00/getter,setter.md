- getter 🍠
  값을 가져올 때 사용
  ```jsx
  class Student {
    constructor(name, school) {
      // 필드
      this._name = name;
      this._school = school;
    }

    // Getter
    get name() {
      console.log("이름: ");
      return this._name;
    }

    get school() {
      console.log("학교: ");
      return this._school;
    }

    // 메서드
    introduction() {
      console.log(
        `안녕하세요, ${this._name}입니다. ${this._school}에 다니고 있습니다.`
      );
    }
  }

  // 예제
  const student = new Student("Deogi", "인하대학교");

  console.log(student.name); // "이름: " -> "Deogi"
  console.log(student.school); // "학교:" → "인하대학교"

  student.introduction(); // "안녕하세요, Deogi입니다. 인하대학교에 다니고 있습니다."
  ```
- setter 🍠
  값을 변경할 때 사용
  ```jsx
  class Student {
    constructor(name, school) {
      // 필드
      this._name = name;
      this._school = school;
    }

    // Setter
    set name(newName) {
      this._name = newName;
    }

    set school(newSchool) {
      this._school = newSchool;
    }

    // 메서드
    introduction() {
      console.log(
        `안녕하세요, ${this._name}입니다. ${this._school}에 다니고 있습니다.`
      );
    }
  }

  // 예제
  const student = new Student("matthew", "상명대학교");

  student.name = "Deogi";
  console.log(student.name); // "Deogi"

  student.school = "인하대학교";
  console.log(student.school); // "인하대학교"

  student.introduction(); // "안녕하세요, Deogi입니다. 인하대학교에 다니고 있습니다."
  ```
