---
title: "컨테이닝 블록이 무엇인가요"
date: "2022-08-15T04:36:03.560Z"
description: CSS 컨테이너닝 블록에 대해 간단히 풀어쓴 글
tags:
  - CSS
---

브라우저는 문서를 그릴 때 모든 요소에 대해 박스를 생성한다.

1. Content 영역
2. padding 영역
3. border 영역
4. maring 영역

![box area](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block/box-model.png)

컨테이닝 블록이 언제나 부모 요소의 컨텐츠는 아니다.

## 컨테이닝 블록은 어디에 영향을 끼치는가?

요소의 `크기`와 `위치`는 컨테이닝 블록의 영향을 자주 받는다.
width, height, padding, margin 의 속성값과 절대적 위치(`absolute`, `fixed` 등)로 설정된 요소의 오프셋 속성값은
자신의 컨테이닝 블록으로부터 계산된다.

이때 요소의 `position` 속성에 따라 컨테이닝 블록을 식별하는 과정이 달라진다.

1. `static`, `relative`, `sticky` 은 가장 가까운 조상 블록 컨테이너(`inline-block`, `block`, `list-item` 등) 또는 `table`, `flex`, `grid`, 블록 컨테이너 자신의 콘텐츠 영역 경계를 따라 형성된다. **즉, 부모 요소를 컨테이닝 블록으로 식별한다**

2. `absolute`인 경우, 컨테이닝 블록은 `position: static;` 이 아닌 가장 가까운 조상의 내부 "여백" 영역이다. 컨텐츠 영역이 아닌 border 영역 안쪽이 기준이 된다.
3. `fixed` 인 경우 컨테이닝 블록은 `뷰 포트`나 페이지 영역 이다.
4. `absolute`, `fixed` 인 경우 아래 조건을 만족하는 조상 요소가 컨테이닝 블록이 될 수 있다.
   1. `transform` `perspective` 속성이 `none`이 아님
   2. `will-change` 속성이 `transform` 이거나 `perspective` 임
   3. `filter` 속성이 `none` 임
   4. `contain` 속성이 `paint` 임

---

참고 문서

- [MDN 컨테이닝 블록이란](https://developer.mozilla.org/ko/docs/Web/CSS/Containing_block)
