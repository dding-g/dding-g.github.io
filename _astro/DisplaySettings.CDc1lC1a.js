import{S as Z,i as L,s as y,c as I,e as h,x as O,a as U,b as p,d as v,y as F,f as $,g as f,h as s,C as V,D as K,j as tt,k as u,l as J,m as x,u as et,n as ot,o as st,A as at,t as rt,q as nt,v as it,E as lt}from"./index.BYyvZe9O.js";import{g as ut,a as Q,s as ct}from"./setting-utils.B5sRXqnj.js";var D=(e=>(e[e.Home=0]="Home",e[e.Archive=1]="Archive",e[e.About=2]="About",e[e.Proejct=3]="Proejct",e))(D||{});const dt={title:"ddingg",subtitle:"dding-glog",lang:"ko",themeHue:250,banner:{enable:!1,src:"assets/images/avatar.jpeg"}};D.Home,D.Archive,D.About,D.Proejct;var e=(e=>(e.home="home",e.about="about",e.archive="archive",e.project="project",e.tags="tags",e.categories="categories",e.recentPosts="recentPosts",e.comments="comments",e.untitled="untitled",e.uncategorized="uncategorized",e.noTags="noTags",e.wordCount="wordCount",e.wordsCount="wordsCount",e.minuteCount="minuteCount",e.minutesCount="minutesCount",e.postCount="postCount",e.postsCount="postsCount",e.themeColor="themeColor",e.more="more",e.author="author",e.publishedAt="publishedAt",e.license="license",e))(e||{});const mt={[e.home]:"Home",[e.about]:"About",[e.archive]:"Archive",[e.tags]:"Tags",[e.categories]:"Categories",[e.recentPosts]:"Recent Posts",[e.comments]:"Comments",[e.untitled]:"Untitled",[e.uncategorized]:"Uncategorized",[e.noTags]:"No Tags",[e.wordCount]:"word",[e.wordsCount]:"words",[e.minuteCount]:"minute",[e.minutesCount]:"minutes",[e.postCount]:"post",[e.postsCount]:"posts",[e.themeColor]:"Theme Color",[e.more]:"More",[e.author]:"Author",[e.publishedAt]:"Published at",[e.license]:"License"},Y={[e.home]:"블로그",[e.about]:"프로필",[e.archive]:"아카이브",[e.project]:"프로젝트",[e.tags]:"태그",[e.categories]:"카테고리",[e.recentPosts]:"최근 포스트",[e.comments]:"댓글",[e.untitled]:"무제",[e.uncategorized]:"미분류",[e.noTags]:"No Tags",[e.wordCount]:"word",[e.wordsCount]:"words",[e.minuteCount]:"minute",[e.minutesCount]:"minutes",[e.postCount]:"post",[e.postsCount]:"posts",[e.themeColor]:"테마 색상",[e.more]:"더보기",[e.author]:"작성자",[e.publishedAt]:"작성일",[e.license]:"라이센스"},gt=Y,ht={ko:Y,en:mt};function pt(e){return ht[e.toLowerCase()]||gt}function W(e){return pt(dt.lang)[e]}const ft=e=>({}),X=e=>({});function bt(t){let o,a,n,r,i,c,l,d,m,b,g,C,w,k,A,y,D,j=W(e.themeColor)+"";const T=t[4]["restore-icon"],P=I(T,t,t[3],X);return{c(){o=h("div"),a=h("div"),n=h("div"),r=O(j),i=U(),c=h("button"),l=h("div"),P&&P.c(),d=U(),m=h("div"),b=h("div"),g=O(t[0]),C=U(),w=h("div"),k=h("input"),this.h()},l(e){o=p(e,"DIV",{id:!0,class:!0});var s=v(o);a=p(s,"DIV",{class:!0});var u=v(a);n=p(u,"DIV",{class:!0});var h=v(n);r=F(h,j),i=$(h),c=p(h,"BUTTON",{"aria-label":!0,class:!0});var x=v(c);l=p(x,"DIV",{class:!0});var A=v(l);P&&P.l(A),A.forEach(f),x.forEach(f),h.forEach(f),d=$(u),m=p(u,"DIV",{class:!0});var y=v(m);b=p(y,"DIV",{id:!0,class:!0});var D=v(b);g=F(D,t[0]),D.forEach(f),y.forEach(f),u.forEach(f),C=$(s),w=p(s,"DIV",{class:!0});var V=v(w);k=p(V,"INPUT",{"aria-label":!0,type:!0,min:!0,max:!0,class:!0,id:!0,step:!0,style:!0}),V.forEach(f),s.forEach(f),this.h()},h(){s(l,"class","text-[var(--btn-content)] svelte-3akcb9"),s(c,"aria-label","Reset to Default"),s(c,"class","btn-regular w-7 h-7 rounded-md active:scale-90 svelte-3akcb9"),V(c,"opacity-0",t[0]===t[1]),V(c,"pointer-events-none",t[0]===t[1]),s(n,"class","flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem] svelte-3akcb9"),s(b,"id","hueValue"),s(b,"class","transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[var(--btn-content)] svelte-3akcb9"),s(m,"class","flex gap-1 svelte-3akcb9"),s(a,"class","flex flex-row gap-2 mb-3 items-center justify-between svelte-3akcb9"),s(k,"aria-label",W(e.themeColor)),s(k,"type","range"),s(k,"min","0"),s(k,"max","360"),s(k,"class","slider svelte-3akcb9"),s(k,"id","colorSlider"),s(k,"step","5"),K(k,"width","100%"),s(w,"class","w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none svelte-3akcb9"),s(o,"id","display-setting"),s(o,"class","float-panel closed absolute transition-all w-80 fixed right-4 px-4 py-4 svelte-3akcb9")},m(e,s){tt(e,o,s),u(o,a),u(a,n),u(n,r),u(n,i),u(n,c),u(c,l),P&&P.m(l,null),u(a,d),u(a,m),u(m,b),u(b,g),u(o,C),u(o,w),u(w,k),J(k,t[0]),A=!0,y||(D=[x(c,"click",t[2]),x(k,"change",t[5]),x(k,"input",t[5])],y=!0)},p(e,[t]){P&&P.p&&(!A||8&t)&&et(P,T,e,e[3],A?st(T,e[3],t,ft):ot(e[3]),X),(!A||3&t)&&V(c,"opacity-0",e[0]===e[1]),(!A||3&t)&&V(c,"pointer-events-none",e[0]===e[1]),(!A||1&t)&&at(g,e[0]),1&t&&J(k,e[0])},i(e){A||(rt(P,e),A=!0)},o(e){nt(P,e),A=!1},d(e){e&&f(o),P&&P.d(e),y=!1,it(D)}}}function vt(e,t,s){let{$$slots:o={},$$scope:a}=t,n=ut();const r=Q();return e.$$set=e=>{"$$scope"in e&&s(3,a=e.$$scope)},e.$$.update=()=>{1&e.$$.dirty&&(n||0===n)&&ct(n)},[n,r,function(){s(0,n=Q())},a,o,function(){n=lt(this.value),s(0,n)}]}class At extends Z{constructor(e){super(),L(this,e,vt,bt,y,{})}}export{At as default};