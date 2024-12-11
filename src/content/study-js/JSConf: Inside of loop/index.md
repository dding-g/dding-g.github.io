---
title: "JSConf: Inside of loop"
published: 2022-07-16
description: "Jake Archibald: 루프 속 - JSConf.Asia (https://www.youtube.com/watch?v=cCOL7MC4Pl0)"
category: 무엇인가요 시리즈
draft: false
tags:
  - JSConf
  - Javascript
---

```js
// 1번...
document.body.appendChild(el);
el.style.display = "none";

// 2번...
el.style.display = "none";
document.body.appendChild(el);
```

- 1번에서 우리는 el이 dom에 append 되고 style을 바꾸면 혹시나 사용자에게 보일까봐 2번처럼 바꾼다.실제 그렇지는 않지만.
- 이벤트 루프 덕분에 1번처럼 코드를 작성해도 style을 바꾸는 코드와 append하는 코드는 서로 "경합"상태가 아니다.

어떻게 이런게 가능할까?

웹페이지에는 메인 스레드가 있다.
보통 코드가 실행될 떄는 코드가 경합될 일이 거의 없지만 메인 스레드가 처리되는 시간이 길어지면(Promise) UI UX는 blocking되는 상태로 보인다. 싱글 스레드 이기 떄문에. 채기를 할 때는 인간도 싱글 스레드가 된다. 이때 차를 운전중이면 위험한 상태가 될 거고 재채기를 할 때는 아무것도 할 수 없게 된다.
재채기 같은 코드는 피해야한다.

### 렌더링

위 예시에서 1번 2번 코드는 순서가 혼용되어도 상관없다고 했다. 왜 그럴까?
Javascript는 항상 렌더링 전에 작업을 완료한다. 즉, Javascript 단계 이후에 랜더링 단계로 넘어간다.
이게 이벤트 루프가 해주는 일 중 하나이다.
테스크를 큐잉하는걸 `setTimeout(callback, 0)` 으로 하는건 좋지 않다.
또한 animation을 위해 `setTimeout`을 사용하는건 좋지 않은 선택이며 timer나 네트워크 관련된 작업은 `requestAnimationFrame` 를 사용하는걸 추천한다.

js에서 이벤트를 먼저 처리하고 css가 변경되는 루프의 예시를 보자.

> [동영상 링크](https://youtu.be/cCOL7MC4Pl0?t=1186)에서 보면 더 이해하기 쉽다.

1. 박스의 X 좌표를 0px -> 1000px 으로 옮긴다.
2. X 좌표를 1000px -> 500px로 옮긴다.

다음과 같은 작업은 어떤 코드에서 실행될 수 있을까?

```js
button.addEventListener("click", () => {
  box.style.transform = "translateX(1000px)";
  box.style.transition = "transform 1s ease-in-out";
  box.style.transform = "translateX(500px)";
});
```

우리는 0 -> 1000 -> 500 으로 위치가 변하길 원한다.
하지만 위 코드를 실행시켜보면 0 -> 500 으로 위치가 변한다.

```js
button.addEventListener("click", () => {
  box.style.transform = "translateX(1000px)";
  box.style.transition = "transform 1s ease-in-out";

  requestAnimationFrame(() => {
    box.style.transform = "translateX(500px)";
  });
});
```

이건 어떨까?
여전히 0 -> 500으로 변한다.

Javascript단계에서는 1000px 까지 옮겨졌다.
하지만 렌더링 되기 직전에 requestAnimationFrame이 실행되면서 다시 500px로 옮겼기 때문에 최종 렌더링 에서는 500px로 보인다.

```js
button.addEventListener("click", () => {
  box.style.transform = "translateX(1000px)";
  box.style.transition = "transform 1s ease-in-out";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      box.style.transform = "translateX(500px)";
    });
  });
});
```

이제 우리가 원하는 결과가 나온다.
Javascript -> requestAnimationFr ame -> 렌더링 -> requestAnimationFrame -> 렌더링 단계로 수행하기 때문이다.

> 다만 edge, safari의 경우 rAF를 paint 뒤 단계에서 실행하기 때문에 순서가 조금 바뀌어야 할 수 있다.
> `getComputedStyle`을 사용해서 같은 결과를 만들 수 있다. 하지만 chrome에서만 동작한다.
