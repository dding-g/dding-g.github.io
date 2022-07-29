---
title: "call, apply, bind 차이점"
date: "2022-07-29T07:37:32.634Z"
description: call, apply, bind의 차이점
tags:
  - Javascript
---

call. apply는 바로 함수가 호출되고, bind는 할당된 객체를 한번 거쳐서 호출된다.

`call()` this를 특정 객체로 지정 가능.
`obj.call(targetObj, 'param1', 'param2')` `obj`에서 `this`를 호출하면 `targetObj`를 보게됨.

`apply()`도 call과 유사하다.
하지만 매개변수를 배열로 받는다는점이 다르다.
`obj.apply(targetObj, ['param1', 'param2'])`

`bind()` this를 영구적으로 변환할 수 있다.

```js
const test = obj.bind(targetObj)
test("param1", "param2")
```

요런것도 가능.

```js
const log = console.log.bind(document)

log("test") // test
log("helloooooo") // helloooooo
```

scope체인은??
