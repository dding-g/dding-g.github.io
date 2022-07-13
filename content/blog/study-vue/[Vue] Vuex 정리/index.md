---
title: "[Vue] Vuex 정리"
date: 2022-07-13T19:46:03.284Z
tags:
  - "vue"
  - "vuex"
---

## Vuex

> 지금은 [Pinia](https://pinia.vuejs.org/)가 vue의 공식적인 default 상태관리 라이브러리가 되었지만, 그 전까지 Vuex가 대중적으로 사용되었다. 앞으로 Vuex에는 새로운 기능이 추가되지는 않고 `Pinia`로 migration하거나 새로운 프로젝트에서는 `Pinia`로 시작하는걸 강력하게 권장하고 있다.
> 이 글은 [공식 docuemnt](https://vuex.vuejs.org/)를 훑어보면서 필자가 생각하는 핵심이라고 여겨지는 내용들을 적어둘 예정이다.
