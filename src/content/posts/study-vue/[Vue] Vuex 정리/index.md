---
title: "[Vue] Vuex 정리"
published: 2022-07-13T19:46:03.284Z
category: Vue
tags:
  - "vue"
  - "vuex"
---

## Vuex

> 지금은 [Pinia](https://pinia.vuejs.org/)가 vue의 공식적인 default 상태관리 라이브러리가 되었지만, 그 전까지 Vuex가 대중적으로 사용되었다. 앞으로 Vuex에는 새로운 기능이 추가되지는 않고 `Pinia`로 migration하거나 새로운 프로젝트에서는 `Pinia`로 시작하는걸 강력하게 권장하고 있다.

### Getters

### Setters

### Mutations

store에서 state를 변경할 수 있는 유일한 방법은 `mutation`으로 커밋하는 방법 뿐이다.
`mutaion`은 이벤트와 비슷한데 각 뮤테이션은 string 타입과 handler를 가진다. 이 handler로 state를 수정할 수 있고 첫 parameter에 state를 받는다.

```js
const store = createStore({
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      // mutate state
      state.count++
    },
  },
})
```

이 mutation handler를 호출할 때는 directly하게 호출할 수 없고, `commit`함수를 이용해서 호출 할 수있다.

### Actions

`mutation`과 비슷하다.

### 모듈화
