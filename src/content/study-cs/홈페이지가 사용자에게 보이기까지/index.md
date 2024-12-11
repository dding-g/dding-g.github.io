---
title: "홈페이지가 사용자에게 보이기까지"
published: 2022-07-19
description: 주소창에 www.google.com 을 검색하면 어떤 일이 일어날까?
category: CS
tags:
  - CS
---

## 순서 정리

1. www.google.com 을 주소창에 타이핑하고 Enter키를 누른다.
2. DNS에서 www.google.com 을 찾아 등록된 IP로 Get Request를 보낸다.
3. 반환된 html을 렌더링 한다.

크게보면 위와 같다.
조금 더 상세하게 알자보자.

### DNS에서 www.google.com을 찾는다.

DNS는 `.` 으로 나눠진 레벨별로 검색을 한다.
맨 처음 `Top-level`에서는 `.com` 에서 `google.com` 으로 redirect 시켜주고
`Second-level`에서는 `google.com`에서 `www.google.com`으로 redirect 시켜준다.
마지막 `Third-level`에서는 `www.google.com`에 해당하는 ip주소를 검색해서 브라우저로 return한다.

### 브라우저에서 google로

브라우저는 DNS로 부터 받은 ip주소에 HTTP통신을 요청한다.
그전에 `TCP/IP` 통신의 `TCP/IP 3 way handshake` 방식으로 connection을 먼저 맻어야 한다.
`TCP/IP 3 way handshake`는 아래 순서로 이뤄진다.

1.  Client &rarr; Server `SYN(Synchronize Sequence Number)`
    1.  Client가 SYNC 패킷을 서버에 보내면 Client는 서버의 `SYN/ACK`응답을 기다리는 상태가 된다.
2.  Server &rarr; Client `SYN + ACK(Acknowledgement)`
    1.  Server는 Client에 요청을 수락한다는 `SYN + ACK` 요청을 보내게 되고 Client의 `ACK`를 기다리는 상태가 된다.
3.  Client &rarr; Server `ACK`
    1.  Client는 마지막으로 Server에게 `ACK` 요청을 보내고 Server와 Client가 통신할 수 있게 된다.

다음은 HTTP request를 날린다.
Client는 `www.google.com`에 할당된 IP로 GET request를 날리고
Server는 요청을 처리하고 response data를 생성한다.
이후에 Status code등 각종 메타 데이터를 포함한 HTTP response를 Client로 보내주고
최종적으로 Client는 받은 데이터를 브라우저에 보여준다.

### 브라우저 HTML 렌더링

브라우저의 주요 기능은 선택한 자원을 서버에 요청하고 브라우저에 표시하는 것 이다. 보통 HTML문서 이지만 PDF, 이미지 등 다른 형태일 수 있고 자원의 주소는 URI(Uniform Resource Identifier)에 의해 정해진다.

**렌더링 엔진**
사파리는 `Webkit`, 파이어폭스 모질라에서 직접 만든 `게코(Gecko)`, 크롬은 Webkit 베이스로 제작한 `블링크` 를 사용한다.

렌더링 엔진은 아래와 같은 순서로 동작한다.

> DOM트리 구축을 위한 HTML파싱 &rarr; 렌더 트리 구축 &rarr; 렌더 트리 배치 &rarr; 렌더 트리 그리기

**파싱**
파싱은 브라우저가 코드를 이해하고 사용할수 있는 구조로 변환하는걸 말한다. (노드 트리)
HTML은 일반적인 상향식, 하향식 파서로는 파싱할 수 없다.
HTML 파서로 파싱을 해야하는데 이유는 아래와 같다.

1. 언어의 너그러운 속성.
2. 잘 알려져 있는 HTML 오류에 대한 브라우저의 관용.
   1. 태그가 잘못 닫히거나 유효하지 않은 태그를 쓰는 등의 브라우저의 오류 처리
3. 변경에 의한 재파싱. 일반적으로 소스는 파싱하는 동안 변하지 않지만 HTML에서 document.write을 포함하고 있는 스크립트 태그는 토큰을 추가할 수 있기 때문에 실제로는 입력 과정에서 파싱이 수정된다.

파서는 토큰화와 트리 구축. 이렇게 두 단계로 되어있다.
토큰화는 어휘 분석으로 입력 값을 토큰으로 파싱한다. HTML에서 토큰은 `시작 태그, 종료 태그, 속성 이름, 속성 값` 을 말한다.
이런 토큰을 만나면 파서의 상태가 바뀌면서 각 토큰에 맞는 파싱이 이뤄지게 된다. 공백, 줄바꿈과 같은 의미없는 문자도 같이 제거한다.

**DOM 트리 구축**
파서가 생성되면 문서 객체(Document Object)가 생성된다. 트리 구축이 진행되는 동안 문서 최상단에서는 DOM트리가 수정되고 요소가 추가된다.
![HTML 트리 구축](https://d2.naver.com/content/images/2015/06/helloworld-59361-11.png)

이후 파싱 모두 끝난 다음, 문서 파싱 이후에 실행되어야 하는 "지연"모드 스크립트를 파싱하기 시작한다. 문서 상태는 "완료"가 되고 "로드"이벤트가 발생한다.

**CSS 파싱**

- HTML을 파싱하다 script 태그를 만나면 스크립트가 실행되고 문서의 파싱은 스크립트가 실행되는동안 중단된다.
  스크립트가 외부에 있는 경우 우선 네트워크로부터 자원을 가져와야 하는데 이 작업이 완료될 떄 까지 파싱은 중단된다.
  따라서 개발자는 스크립트를 "지연(defer)" 혹은 "비동기(asyncronize)"로 적절히 처리해줘야한다.
- 스타일 시트는 다른 모델을 사용한다.
  이론적으로 스타일 시트는 DOM 트리를 변경하지 않기 때문에 문서의 파싱을 중단시키거나 기다릴 이유가 없다.
  하지만 스크립트 내부에서 아직 로드되지 않은 스타일 시트를 호출하는 경우에는 문제가 생길 수 있으므로 이런 경우에만 스크립트를 중단하고 처리해준다.

**렌더 트리 구축**

DOM 트리가 구축되는 동안 브라우저는 렌더 트리를 구축한다. 표시해야 할 순서와 문서의 시각적인 구성 요소로써 올바른 순서로 내용을 그려낼 수 있도록 하기 위한 목적이 있다.

**DOM 트리와 렌더 트리의 관계**

렌더러와 DOM은 1:1 대응 관계는 아니다. 예를들어 "head"요소와 같은 비시각적 DOM 요소는 렌더 트리에 추가되지 않는다. 또한 `display: none;` 인 요소는 트리에 나타나지 않는다.(`visibility: hidden` 은 나타남)

**스타일 계산**

스타일 데이터는 구성이 매우 광범위해서 수 많은 스타일 속성을 수용하면 메모리 문제를 야기할 수 있고, 최적화가 되어있지 않으면 각 구성요소에 할당된 규칙을 찾는건 성능 문제를 야기할 수 있다. (ex. `div div div div {...}` &rarr; 3번째 div 자손에 규칙을 적용하라는 뜻이다.)
또한 규칙을 적용하는 것은 계층 구조를 파악해야 하는 (CSS우선순위) 꽤나 복잡한 다단계 규칙을 수반한다.

부합하는 모든 규칙은 `스타일 트리(CSSOM)`에 저장되는데, 경로의 최하위 노드가 가장 높은 우선순위를 갖는다. 처음부터 모든 노드를 계산하지는 않지만, 노드 스타일이 계산될 필요가 있을 때 계산된 경로를 트리에 추가한다.

스타일 문맥은 구초제로 나뉘는데 선, 색상 같은 종료의 스타일 정보를 포함한다.

**배치(reflow)**
렌더러가 생성되어 트리에 추가될 때 크기와 위치 정보는 없는데 이렇게 뷰 포트 내에서 요소들의 정확한 위치와 크기를 계산하는 과정을 배치 또는 리플로라고 부른다.
HTML은 흐름 기반의 배치모델을 사용하므로 왼쪽에서 오른쪽, 위에서 아래로 흐르는 방향으로 요소가 배치된다.

reflow가 불필요하게 일어나게 되면 심각한 성능 문제를 야기할 수 있다.
자식, 부모, 조상등 관련된 모든 요소들이 layouto 배치부터 다시 계산해야 하기 때문이다.
reflow를 야기하는 요소는 아래와 같은데 자세한 이벤트는

- [what-force-layout](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
- [[성능] Reflow 원인과 마크업 최적화 Tip](https://daumui.tistory.com/12)

를 참조하자.

> - 윈도우 리사이징 (뷰포트 변화는 Global Layout에 영향)
> - 폰트의 변화 (height계산에 영향을 주므로 Global Layout에 영향)
> - 스타일 추가 또는 제거
> - 내용 변화 (인풋박스에 텍스트 입력 등..)
> - :hover와 같은 CSS Pseudo Class
> - (CSS: The Definitive Guide: The Definitive Guide 55p에서, hover할 시 나타나는 변화로 인한 우려가 생긴다는 의미인 듯 합니다.)
> - 클래스 Attribute의 동적 변화
> - JS를 통한 DOM 동적 변화
> - 엘리먼트에 대한 offsetWidth / offsetHeight (화면에서 보여지는 좌표) 계산시
> - 스타일 Attribute 동적변화

**더치 비트 체제**
소소한 변경 때문에 전체를 다시 배치하지 않기 위해 브라우저는 "더티 비트" 체제르 사용한다.

**전역배치와 점증 배치**
배치는 렌더러 트리 전체에서 일어날 수 있는데 이걸 "전역" 배치라고 하고 다음 경우에 발생한다.

1. 글꼴 크기처럼 모든 렌더러에 영향을 주는 전역 스타일 변경
2. 화면 크기 변경에 의한 결과

배치는 더티 렌더러가 배치되는 경우에만 점증되는데, 추가적 배치가 필요하기 떄문에 약간의 손실이 발생할 수 있다.

점증 배치는 `비동기적`으로 일어난다.

배치가 끝난 후 드디어 요소들을 그리는 과정이 시작된다.

**그리기**
화면에 내용을 표시하기 위한 렌더 트리가 탐색되고 렌더러의 "paint" 메서드가 호출된다. 그리기는 UI 기반의 구성요소를 사용한다.

그리기는 배치와 마찬가지로 전역 or 점증 방식으로 수행된다.

**렌더링 엔진의 스레드**
렌더링 엔진은 통신을 제외한 거의 모든 경우에 단일 스레드로 동작한다.

통신은 몇 개의 병렬 스레드에 의해 진행될 수 있는데 병렬 연결의 수는 보통 2개에서 6개로 제한된다(예를 들면 파이어폭스 3은 6개를 사용).

**다시 그리기**
Javascript &rarr; Style &rarr; Layout &rarr; Paint &rarr; Composition
이런 순서를 따라서 다시 그려지는데, 이떄 택스트 색상, 그림자가 수정되는 등 Layout이 수정되지 않아도 되는 경우에는 `Paint` 단계부터 수행되고 레이어의 합성만 다시 수행되는 경우에는 `Composition` 단계만 실행된다.
[csstriggers](https://csstriggers.com/) 에서 각 렌더링 엔진에서 어떤 속성이 어떤 과정에 의해서 일어나는지 알 수 있다.

---

_참고 자료_

- [Naver D2 - 브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361)
- [Toast - 성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
- [번역 Browser에 www.google.com을 검색하면 어떤 일이 일어날까?](https://devjin-blog.com/what-happen-browser-search/)
