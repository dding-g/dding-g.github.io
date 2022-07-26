---
title: "[Vue] document 훑어보기 | 반응성 기초(Reactivity)"
date: "2022-07-26T09:42:40.631Z"
description: Vue guide를 훑어보고 정리한 문서
tags:
  - Vue
---

## 반응성 기초

### 반응 상태 선언

`reactive()` 를 사용하여 반응형 개체 또는 배열을 만들 수 있다.

```js
import { reactive } from "vue"

const state = reactive({ count: 0 })
```

반응형 개체는 [Javascript 프록시](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)이며 일반 개체 처럼 동작한다.
차이점은 Vue가 송성 엑세스 및 반응 객체의 돌연변이를 추적할 수 있다는 것 이다. _&larr; 뭔소린지 모르겠다. 자세한 내용이 궁금하면 [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)를 살펴보라고 한다._

아래처럼 `setup()`에서 사용하려면 선언하고 반환한다.

```js
import { reactive } from "vue"

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // don't forget to expose the function as well.
    return {
      state,
      increment,
    }
  },
}
```

```html
<button @click="increment">{{ state.count }}</button>
```

### `<script setup>`

`setup()`을 통해 sate, method를 수동으로 노출하는건 장황할 수 있다. 다행히 이건 빌드 단계를 사용하지 않을때만 필요하다.
단일 파일 구성요소(SFC)를 사용할 때 다음을 사용하여 사용을 크게 단순화 할 수 있다.

```html
<script setup>
  import { reactive } from "vue"

  const state = reactive({ count: 0 })

  function increment() {
    state.count++
  }
</script>

<template>
  <button @click="increment">{{ state.count }}</button>
</template>
```

`<script setup>` 에서 선언된 최상위 가져오기 및 변수는 `template`에서 자동으로 사용할 수 있다.

### DOM 업데이트 타이밍

state를 변경하면 DOM이 자동으로 업데이트 된다. 그러나 DOM 업데이트는 동기적으로 적용되지 않는다.
대신 Vue는 업데이트 주기의 "다음 틱"까지 버퍼링하여 상태 변경 횟수에 관계없이 각 구성요소가 한 번만 업데이트 되도록 한다.

상태 변경 후 DOM 업데이트가 완료될 떄 까지 기다리려면 [`nextTick()`](https://vuejs.org/api/general.html#nexttick) 전역 API를 사용할 수 있다.

```js
import { nextTick } from "vue"

function increment() {
  state.count++
  nextTick(() => {
    // access updated DOM
  })
}
```

### 깊은 Reactivity

중첩된 객체를 변경해도 변경 사항이 감지된다.

```js
import { reactive } from "vue"

const obj = reactive({
  nested: { count: 0 },
  arr: ["foo", "bar"],
})

function mutateDeeply() {
  // these will work as expected.
  obj.nested.count++
  obj.arr.push("baz")
}
```

### `reactive()`의 제한사항

1. 객체 유형에서만 동작한다. `Map Set string number boolean` 같은 기본 유형에서는 동작하지 않는다.
2. Vue의 반응성 추적은 속성 엑세스에 대해 동작하므로 항상 반응성 객체에 대한 동일한 참조를 유지해야한다.

```js
let state = reactive({ count: 0 })

// the above reference ({ count: 0 }) is no longer being tracked (reactivity connection is lost!)
state = reactive({ count: 1 })
```

### 반응 변수 `ref()`

`ref()`는 `reactive()`와 다르게 모든 값 유형을 사용할 수 있다.
`.value`를 통해 객체 내부 값을 가져올 수 있다.

```js
import { ref } from "vue"

const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

또한 `reactive()`와는 다르게 함수의 인자로 전달하거나, 반환하거나 다른 변수에 넣는다고 해도 반응성을 잃지 않는다.
즉 `ref()`에 어떤 값에 대한 "참조"를 만들고 반응성을 잃지 않고 전달할 수 있다.
이는 [hooks를 만드는 등 "컴포저블"](https://vuejs.org/guide/reusability/composables.html)에 사용되기 때문에 매우 중요하다.

```js
const objectRef = ref({ count: 0 })

// this works reactively
objectRef.value = { count: 1 }

...

const obj = {
  foo: ref(1),
  bar: ref(2)
}

// the function receives a ref
// it needs to access the value via .value but it
// will retain the reactivity connection
callSomeFunction(obj.foo)

// still reactive
const { foo, bar } = obj
```

### 반응형 객체의 참조 언래핑

```js
const count = ref(0)
const state = reactive({
  count,
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1

const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```
