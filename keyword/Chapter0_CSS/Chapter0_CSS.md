# 📌 CSS 속성 핵심 단어 정리

## 📌 border vs outline의 차이점

✅ `border`: 요소의 **박스 모델 내부**에 포함됨 (요소 크기에 영향을 줌)  
✅ `outline`: 요소의 **박스 모델 외부**에 그려지며, 요소 크기에 영향을 주지 않음

| 속성      | 요소 크기 포함 여부 | 위치      | 적용 대상                                    |
| --------- | ------------------- | --------- | -------------------------------------------- |
| `border`  | ✅ 포함됨           | 요소 내부 | 개별 면 (top, right, bottom, left) 지정 가능 |
| `outline` | ❌ 포함되지 않음    | 요소 외부 | 개별 면 지정 불가 (전체 테두리만 가능)       |

🔗 **출처**: [MDN `border`](https://developer.mozilla.org/ko/docs/Web/CSS/border), [MDN `outline`](https://developer.mozilla.org/ko/docs/Web/CSS/outline)

---

## 🎯 **CSS 정렬 관련 속성**

| 속성         | 설명                                                                | 출처                                                                                             |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `text-align` | 블록 요소나 표의 칸 상자의 가로 정렬을 설정                         | [MDN `text-align`](https://developer.mozilla.org/ko/docs/Web/CSS/text-align)                     |
| `margin`     | 요소의 주위에 빈 공간을 추가                                        | [MDN `margin`](https://developer.mozilla.org/ko/docs/Web/CSS/margin)                             |
| `flex`       | 플렉스 아이템이 **컨테이너의 공간을 차지하는 방식**을 설정하는 속성 | [MDN `flex`](https://developer.mozilla.org/ko/docs/Web/CSS/flex)                                 |
| `translate`  | 요소의 **위치를 수평 또는 수직 방향으로 변경**                      | [MDN `translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) |
| `grid`       | `display: grid`는 행과 열을 활용한 **그리드 레이아웃**을 정의함     | [MDN `grid`](https://developer.mozilla.org/ko/docs/Glossary/Grid)                                |

---

## 🚀 **CSS Transition 관련 속성**

| 속성                         | 설명                                 | 출처                                                                               |
| ---------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `transition-property`        | 전환 효과를 줄 속성 지정             | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property)        |
| `transition-duration`        | 애니메이션이 완료되는 시간 설정      | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)        |
| `transition-timing-function` | 전환 효과의 가속 곡선 설정           | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |
| `transition-delay`           | 애니메이션 시작 전 대기 시간 지정    | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)           |
| `transition-behavior`        | 개별 속성에 대한 전환 적용 여부 지정 | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior)        |

---

## 🎬 **CSS Animation 관련 속성**

| 속성                        | 설명                                  | 출처                                                                              |
| --------------------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| `animation-name`            | 애니메이션 키프레임 이름 설정         | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name)            |
| `animation-duration`        | 애니메이션 한 사이클의 지속 시간      | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration)        |
| `animation-delay`           | 애니메이션 시작 전 대기 시간          | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)           |
| `animation-direction`       | 애니메이션 반복 방향 설정             | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)       |
| `animation-iteration-count` | 애니메이션 반복 횟수                  | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count) |
| `animation-play-state`      | 애니메이션 일시정지 여부              | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state)      |
| `animation-timing-function` | 키프레임 전환 속도 설정               | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) |
| `animation-fill-mode`       | 애니메이션 시작 전후 스타일 유지 여부 | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)       |
| `@keyframes`                | 애니메이션의 키프레임 설정            | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)                |

---

💡 **애니메이션 축약형 `animation` 예시**
/_ @keyframes duration | easing-function | delay |
iteration-count | direction | fill-mode | play-state | name _/

```css
animation: 3s ease-in 1s 2 reverse both paused slide-in;
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
