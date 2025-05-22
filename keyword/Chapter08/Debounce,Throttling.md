# Debounce & Throttling 개념 정리

## 📌 Debounce 개념

> **Debounce란?**  
> 마지막 이벤트 호출 이후 일정 시간 동안 추가 호출이 없을 때만 실행되는 방식입니다.

- 입력 이벤트에 자주 사용
- **예시**: 검색창 자동완성, 이메일 중복 확인 등

---

### 💻 Debounce 코드 예시

#### 🧩 사용 시나리오: 검색창 자동완성 기능

- **문제**: **사용자가 빠르게 많이 타이핑할 경우 서버에 많은 요청** 발생
- **해결**: debounce를 사용하여 **입력이 멈춘 뒤 1초 후 요청**

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const fetchResults = debounce(() => {
  console.log("API 요청");
}, 1000);

input.addEventListener("input", fetchResults);
```

## 📌 Throttling 개념

> **Throttling이란?**  
> 일정 시간 간격으로 이벤트를 제한하여 실행하는 방식입니다.

- 스크롤, 리사이즈 등 **연속적으로 발생하는 이벤트**에 적합
- 예시: 무한 스크롤, 브라우저 창 크기 조절, 마우스 이동 추적 등

---

### 💻 Throttling 코드 예시

#### 🧩 사용 시나리오: 무한 스크롤 구현

- **문제**: **스크롤 이벤트가 너무 자주 발생**하여 성능 저하 발생
- **해결**: `throttle`을 적용하여 **1초에 한 번씩만** 이벤트 실행

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle(() => {
  console.log("스크롤 이벤트 처리");
}, 1000);

window.addEventListener("scroll", onScroll);
```
