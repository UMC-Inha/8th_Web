# 📌 시맨틱 태그와 HTML 구조


## 1. `div` 태그만으로 페이지를 구조화해도 괜찮을까?
❌ **그렇지 않습니다.**  
- `div` 태그는 **의미가 없는(Non-Semantic) 요소** 
- **W3C 권장사항**에 따르면 **"다른 요소가 적합하지 않을 때 최후의 수단으로 `div`를 사용해야 한다."**  

📌 **출처**  
- [MDN div](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)  

---

## 2. 시맨틱 태그란?
**시맨틱(Semantic) 태그**는 HTML 요소가 **의미를 가지도록 설계된 태그**입니다.  
즉, 단순히 화면을 표시하는 것이 아니라 **태그 자체가 역할과 목적을 설명**하는 요소입니다.  
예를 들어 `<header>`, `<section>`, `<article>`, `<footer>` 같은 태그들이 있습니다.

---

## 3. 시맨틱 태그를 사용하면 좋은 점은?
**시맨틱 태그를 사용하면 다음과 같은 장점이 있습니다.**  

- ✅ **검색 엔진 최적화(SEO) 향상** → 검색 엔진이 문서 구조를 정확히 이해하여 검색 랭킹에 도움.  
- ✅ **웹 접근성 개선** → 시각 장애인을 위한 스크린 리더가 문서를 쉽게 분석 가능.  
- ✅ **코드 가독성 향상** → 개발자가 HTML 구조를 빠르게 이해할 수 있어 유지보수와 협업이 용이.  

📌 **출처**  
- [MDN Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)  

---

## 4. 다양한 HTML 태그 정리
다음과 같이 여러 시맨틱 태그가 있습니다.  

| 태그 | 역할 |
|------|------|
| `<address>` | 연락처 정보 제공 |
| `<h1>` ~ `<h6>` | 제목 요소 |
| `<hgroup>` | 제목 그룹을 나타냄 |
| `<search>` | 검색 및 필터링 작업을 위한 그룹 |
| `<blockquote>` | 인용문 표시 |
| `<svg>` | 2D 벡터 그래픽 지원 |
| `<path>` | SVG에서 경로 요소를 정의 |

📌 **SVG 관련 편집기**  
- [SVG Path Editor](https://yqnn.github.io/svg-path-editor/) 

📌 **출처**  
- [Mozilla HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)  

---

## 5. Element Level vs. Container Level
✅ **Element Level과 Container Level이란?**  
- **Element Level**: 개별적인 콘텐츠를 표현하는 요소  
- **Container Level**: 여러 요소를 감싸는 역할을 하는 요소  

### **📌 Element Level 예시**  
- `<p>` (문단)  
- `<h1>` ~ `<h6>` (제목)  
- `<img>` (이미지)  
- `<a>` (링크)  
- `<code>` (코드 블록)  

### **📌 Container Level 예시**  
- `<div>` (비시맨틱 컨테이너)  
- `<section>` (문서의 의미 있는 섹션)  
- `<article>` (독립적인 콘텐츠 블록)  
- `<header>` (머리글)  
- `<footer>` (바닥글)  

📌 **예외적인 경우**  
- `<address>`는 블록레벨 요소이지만 `<p>`를 포함할 수 있음.  
- `<main>`은 컨테이너지만 비어 있어도 오류가 발생하지 않음.  

📌 **즉, Element Level은 콘텐츠 자체를 표현하고, Container Level은 구조를 그룹화하는 역할을 한다.**  

---
