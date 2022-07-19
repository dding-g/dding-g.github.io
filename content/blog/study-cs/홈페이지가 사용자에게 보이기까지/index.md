---
title: "홈페이지가 사용자에게 보이기까지"
date: "2022-07-19T06:59:07.725Z"
description: 주소창에 www.google.com 을 검색하면 어떤 일이 일어날까?
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

**렌더링 엔진들**
사파리와 크롬은 `Webkit`을 사용하고 파이어폭스 모질라에서 직접 만든 게코(Gecko)엔지을 사용한다.

---

_참고 자료_

- [Naver D2 - 브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361)
- [[번역] Browser에 www.google.com을 검색하면 어떤 일이 일어날까?
  ](https://devjin-blog.com/what-happen-browser-search/)
