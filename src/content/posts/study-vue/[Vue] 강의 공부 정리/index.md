---
title: "[Vue] 강의 공부 정리"
published: 2022-07-26T05:57:11.254Z
description: https://github.com/dding-g/study-vue
category: Vue
tags:
  - vue
---

# vue 공부용

[study-vue repo](https://github.com/dding-g/study-vue)

- vue2 -> vue3 로 넘어오면서 컴포넌트가 <div> 태그로 한번 감싸지는 부분이 삭제되었음.
- 렌더링시점
  - react로 따지면 setState가 실행 될 때 dom이 re-render 됨. vue는 그 시점이 어디인지?
  - `import { ref } from 'vue'` 사용. 데이터가 바뀔 때 다시 렌더링 되는걸 vue에서는 `리액티브 변화`라고 함. [documnet](https://kr.vuejs.org/v2/guide/reactivity.html)
  - `import { reactivity } from 'vue'`는 `ref`처럼 `리액티브`한 효과를 줄 수 있지만 `array` `object` 만 취급이 가능하다. (`ref`는 모든 자료형 가능)
- `v-on:` -> `@` 로 생략 가능. `v-bind` 전체 생략 가능.
- `oninput` `onchange` 차이
  - `onchange`는 요소의 값이 정해질 때. 포커스를 잃었을 때 발동되고 `oninput`은 요소의 값이 변경되는 즉시 발동된다. 따라서 `oninput`이 `onchange`보다 먼저 실행된다. [medium](https://medium.com/@madgb00/input-type-range-1-onchange-oninput-%EB%B9%84%EA%B5%90-664b58b3f6c)
- 양방향 바인딩(v-model)
  - ```
    <input :type="inputType" :value="authorRef" @input="updateName" />
    <input :type="inputType" v-model="authorRef" />
    ```
  - 두개는 같은 동작을 함. value, input 두개 다 바인딩 해줄 필요 없이 v-model 사용으로 한번에 가능
- `form`에서 `preventDefault`를 vue방식으로 표현 할 수 있음.
  - [document](https://kr.vuejs.org/v2/guide/syntax.html#%EC%88%98%EC%8B%9D%EC%96%B4)에서 볼 수 있음.
- `v-for`을 사용할 때 `:key`는 필수로 바운딩 필요함.
  - ```
    <div v-for="todo in todos" :key="todo.id" class="card">
      <div class="card-body p-2">
        {{ todo }}
      </div>
    </div>
    ```
- `v-show` , `v-if` [document](https://vuejs.org/guide/essentials/conditional.html#v-show)
  - `v-show`는 `display:none` 으로 css 값이 변경됨. 초기 렌더에 비용이 많이 듦.
    - ```
        <div v-show="true">true</div>
        <div v-show="false">true</div>
      ```
  - `v-if` [document](https://vuejs.org/api/built-in-directives.html#v-if)
    - toggle 하는데 비용이 많이 듦
- `checkbox` 바인딩
  - ```
    <input
      class="form-check-input"
      type="checkbox"
      v-model="todo.completed"
    />
    <label class="form-check-label">
      {{ todo.value }}
    </label>
    ```
- [style 바인딩](https://kr.vuejs.org/v2/guide/class-and-style.html#%EA%B0%9D%EC%B2%B4-%EA%B5%AC%EB%AC%B8-1)
  - `:style`
    - `<div :style="todo.completed ? todoStyle : {}">style 바인딩</div>`
  - `:class`
    - `<div :class="{ todo : todo.completed }">class 바인딩</div>` todo.completed가 true면 `todo` css class 적용
- vue에서 컴포넌트를 만들때는 크게 3가지로 구분됨. `tempalte, script, style`

  - ```
    <template>Todo Simple Form</template>

    <script>
    export default {};
    </script>

    <style></style>
    ```

- 자식 컴포넌트에서 부모 컴포넌트로 이벤트 emit

  - 자식 컴포넌트에서 context emit 가능. [docs](https://vuejs.org/guide/components/events.html#emitting-and-listening-to-events)

- computed values
  - 탬플릿 내부에 너무 많은 연산을 집어넣게 되면 덩치가 커지고 유지, 관리가 어려울 수 있음.
  - 이걸 `computed value`가 해결해 주는데 ref로 선언된 객체가 변할 때 computed로 등록 된 값은 다시 계산되서 렌더링됨
  - 기본적으로 `getter`이고 `setter`를 등록할 수 있음. [writable-computed](https://vuejs.org/guide/essentials/computed.html#writable-computed)
  - [composition api 가 나온 배경](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api/#composition-api%E1%84%80%E1%85%A1-%E1%84%82%E1%85%A1%E1%84%8B%E1%85%A9%E1%84%80%E1%85%A6-%E1%84%83%E1%85%AC%E1%86%AB-%E1%84%87%E1%85%A2%E1%84%80%E1%85%A7%E1%86%BC)
  - 어떨때 computed를 쓰고 어떨때 method를 써야 하는가?
    - computed는 여러곳에서 사용해도 1회만 연산 하는데, method는 호출 할 때 마다 연산을 새로함.
- vue-router
  - spa용 vue router
  - [history mode 차이](https://router.vuejs.org/guide/essentials/history-mode.html#different-history-modes)
