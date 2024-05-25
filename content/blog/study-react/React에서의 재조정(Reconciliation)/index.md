---
title: "React에서 Virtual DOM과 재조정(Reconciliation)"
published: 2022-08-15T08:24:02.300Z
description: React의 비교 알고리즘을 만들때 어떤 선택을 했는지 소개하는 글
category: React
tags:
  - React
  - FE
---

## Virtual DOM

리액트는 Virtual DOM을 사용해 렌더링 최적화를 진행합니다.
Virtual DOM은 실제 렌더링 되는 DOM의 구조와 똑같은 `가상의 DOM`입니다.
하지만 실제 렌더링 되는 과정은 없고 트리 형태만 갖추고 있기 때문에 실제 DOM을 변경하는 것 보다 훨씬 적은 비용이 듭니다.
렌더링하는 과정이 없기 때문이죠.
React는 re-rendering 되기 직전의 Virtual DOM과 현재 변경된 Virtual DOM을 비교합니다.
그리고 변경된 사항을 실제 DOM에 반영하죠.
이 과정에서 새로운 Virtual DOM이 변경되었지만, 이전 Virtual DOM과 차이가 없는 경우, React는 해당 부분을 다시 렌더링하지 않습니다.
이렇게 이전 Virtual DOM과 새로운 Virtual DOM을 비교하는 과정을 `diffing` 이라고 합니다.

**그렇다면 React는 언제 다시 렌더링 될까요?**

React가 Virtual DOM을 변경해서 변경점이 있는 Node만 렌더링하는걸 알았습니다.
그러면 이 "비교" 하는 과정은 어느 시점에서 이뤄질까요?

React는 `state`가 변경 될 때 마다 렌더링을 **예약**합니다.
렌더링을 "예약"한다는건 즉시 발생하지 않는다는 것이고 React는 렌더링을 위한 최적의 순간을 찾으려고 노력합니다.
`state`가 바뀔때마다 렌더링된다고 하면 0.01초 만에 100개의 state가 바뀐다고 할 때 100번 다시 DOM을 그리는 것 보다,
사용자가 화면을 다시 볼 수 있는, 모니터가 렌더링 속도를 따라갈 수 있는 시점(주사율)에 다시 렌더링하는게 훨씬 비용이 적게 들테니까요.

또 `state`가 바뀔때 해당 부분만 re-rendering 되는게 아니라 **props 변경 여부와 상관없이 모든 하위 구성 요소가 re-rendering** 됩니다. 그렇기 때문에 `memorization`과 같은 최적화가 필요합니다. 렌더링이 불필요한 components는 re-rendering되는 비용을 막아야 하니까요.

이런 장점을 사용해서 React는 Virtual DOM을 사용합니다.

## 비교 알고리즘 (Diffing Algorithm)

위에서 `diffing`은 이전 Virtual DOM과 최신 Virtual DOM을 비교하는 작업이라고 했습니다.
DOM Tree는 굉장히 복잡하고 깊기 때문에 어떤 비교 알고리즘을 사용해서 차이점을 찾느냐가 성능과 직결될 수 있습니다.

React는 아래 두가지 가정을 가지고 `diffing` 알고리즘을 구현했습니다.

1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
2. 개발자가 `key` prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할 지 표시해 줄 수 있다.

1번은 무엇을 의미할까요?
`<a>` 태그를 가진 노드가 `<div>`로 바뀐다면 React는 이전 트리를 버리고 완전히 새로운 트리를 구축합니다.
트리를 버릴 때 이전 DOM노드는 모두 파괴되고 `componentWillUnmount()`가 실행됩니다.
이어서 새로운 트리를 만들면 해당 컴포넌트 인스턴스는 `UNSAFE_componentWillMount()`가 실행되고 이어서 `componentDidMount()`가 실행됩니다.

---

참고 문서

- [document](https://ko.reactjs.org/docs/reconciliation.html)
- https://felixgerschau.com/react-rerender-components/
