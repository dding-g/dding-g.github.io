---
title: "[Vue] document 훑어보기 | 탬플릿 구문"
published: 2022-07-26
description: Vue guide를 훑어보고 정리한 문서
category: Vue
tags:
  - Vue
---

[Vue Document Guide](https://vuejs.org/guide/introduction.html)

## Vue 란?

사용자 인터페이스를 구축하기 위한 Javascript 프레임워크.

## Option, Composition API

### Option API

아래와 같이 생긴게 Option API. Vue2 에서 사용되던 API형식이다.

```js
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### Composition API

옵션을 선언하는 대신 함수를 가져와서 Vue 구성 요소를 작성할 수 있는 API.
Option Composition 모두 동일한 시스템 위에서 동작하며 Option API는 Composition API 최상단에 implement 되어있다.
Composition API가 더 간단하고 깔끔하게 작성할 수 있으나, 둘 중 하나만 알아야 하는건 아니고 어느 한쪽을 고집할 필요는 없다.

```js
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## 시작

- 모든 `Vue` 애플리케이션은 `createApp`을 사용해서 인스턴스를 만들어 시작한다.

  ```js
  import { createApp } from "vue";

  const app = createApp({
    /* root component options */
  });
  ```

- `.mount()` 함수가 호출되기 전 까지는 아무것도 렌더링 하지 않는다.
  실제 DOM 요소가 렌더링될 "컨테이너"인수가 필요하다.

  ```html
  <div id="app"></div>
  ```

  ```js
  app.mount("#app");
  ```

### 앱 구성

`createApp` 으로 만들어진 `app`은 전체 어플리케이션에 영향을 줄 수 있는 옵션을 구성할 수 있다.
예를들어 `.config` `.component`가 그렇다.
[Application API 참조](https://vuejs.org/api/application.html)

```js
app.config.errorHandler = (err) => {
  /* handle error */
};
```

```js
app.component("TodoDeleteButton", TodoDeleteButton); // 어디서든 TodoDeleteButton를 사용할 수 있게 된다.
```

## 템플릿 구문

Vue는 DOM을 인스턴스 데이터에 선언적으로 바인딩 할 수 있는 HTML 기반 템플릿 구문을 사용한다.
내부적으로 이 템플릿 코드를 Javascript 코드로 컴파일 한다.
Vue도 [JSX를 사용한 렌더링 기능](https://vuejs.org/guide/extras/render-function.html)을 직접 구현할 수 있다.

### 텍스트 보간 (Text Interpolation)

이중 중괄호(Mustaches)를 사용한 텍스트 보간 법은 데이터 바인딩의 가장 기본적인 형태이다.
이중 중괄호 내부 값은 인스턴스의 property값 으로 대체되고 변경될 때 마다 업데이트 된다.

```js
<span>Message: {{ msg }}</span>
```

### Raw HTML

실제 HTML 문을 출력하려면 `v-html` 지시문을 사용해야한다.

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

```
Using text interpolation: <span style="color: red">This should be red.</span>

Using v-html directive: This should be red. <- 여기 빨간색임. "color:red"가 적용됨.
```

`v-html` 과 같은걸 지시문(directive) 라고 하는데,
Vue에서 제공하는 특수 속성임을 알리기 위해 지시문은 `v-` 로 시작된다.

> 보안 경고
> 웹사이트에서 임의의 HTML을 동적으로 렌더링하는 것은 XSS 취약점 으로 쉽게 이어질 수 있기 때문에 매우 위험할 수 있습니다.
> v-html신뢰할 수 있는 콘텐츠 에만 사용 하고 사용자가 제공한 콘텐츠에는 사용 하지 마십시오.

### 속성(attribute) 바인딩

이중 중괄호(Mustaches)는 HTML 어트리뷰트에서는 사용할 수 없기 때문에 `v-bind` 지시문을 대신 사용해야한다.

```html
<div v-bind:id="dynamicId"></div>
```

`div`의 `id` 어트리뷰트와 동기화 하도록 동작한다.
바인딩 된 값이 `null` or `undefined`이면 렌더링 된 요소에서 해당 어트리뷰트는 제거된다.

아래와 같이 지시문 생략도 가능하다.

```html
<div :id="dynamicId"></div>
```

여러 속성을 한번에 바인딩하는 것도 가능하다.

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

`v-bind` 인수 없이 사용하여 단일 요소에 바인딩 할 수 있다.

```html
<div v-bind="objectOfAttrs"></div>
```

### 표현식

이중 중괄호 내에서 사용되는 표현식에서 선언, 제어문 처리는 **불가하다.**

```html
<!-- this is a statement, not an expression: -->
{{ var a = 1 }}

<!-- flow control won't work either, use ternary expressions -->
{{ if (ok) { return message } }}
```

표현식 내부에서는 [제한된 전역 목록](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3)만 전역 객체로 접근이 가능하다.
만약 전역 객체를 추가하려면 `app.config.globalProperties`를 사용한다.

### 지시문

`v-if / v-html / v-else-if / v-else / v-for ...` 등 외에도 [많은 지시문을 제공한다](https://vuejs.org/api/built-in-directives.html).

`v-on` 은 아래와 같이 약어 처리가 가능하다.

```html
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

### 동적 인수

대괄호로 감싸서 지시문 인수에서 Javascript 표현식을 쓸 수 있다.

```html
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

만약 `attributeName`이 `href`면 href로 평가되고, `id`면 id로 평가된다.

핸들러도 마찬가지로 동적 바이딩이 가능하다.

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething"></a>
```

`eventName`이 `click`이면 click, `focus`면 focus로 바인딩이 가능하다.

### 수정자

수정자는 `.`으로 표시되는 특수 점미사며 지시문이 특별한 방식으로 바인딩 되어야 함을 나타낸다.

```html
<form @submit.prevent="onSubmit">...</form>
```

### 전체 지시문 구조

![전체 지시문 구문을 시각화 한 것](https://vuejs.org/assets/directive.69c37117.png)
