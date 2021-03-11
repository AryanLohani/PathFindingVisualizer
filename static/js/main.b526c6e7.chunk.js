(this.webpackJsonppfv=this.webpackJsonppfv||[]).push([[0],{42:function(t,e,n){},43:function(t,e,n){},45:function(t,e,n){},50:function(t,e,n){"use strict";n.r(e);var i=n(1),r=n.n(i),c=n(15),s=n.n(c),a=(n(42),n(14)),o=n(62),l=n(63),u=n(65),h=n(66),j=n(26),d=n(28),f=(n(43),n(3)),b=function(t){var e=1e6,n=t.isStart,i=t.isEnd,r=t.isVisited,c=t.isPath,s=t.Weight,a="node ";c?a+="path ":r?a+="visited ":s==e&&(a+="wall ");return Object(f.jsx)("div",{className:a,children:function(){switch(!0){case n:return Object(f.jsx)(j.b,{});case i:return Object(f.jsx)(j.a,{});case s>1&&s<e:return Object(f.jsx)(d.a,{});default:return null}}()})};n(45);var O=Math.floor((document.body.clientWidth-80)/40),x="Djisktra is a greedy Algorithm for finding the shortest path",m=function(t,e){return{idx:O*t+e,row:t,col:e,isVisited:!1,isPath:!1,Weight:1}},v=function(){var t=1e6,e=Object(i.useState)(function(){for(var t=[],e=0;e<15;e++)for(var n=0;n<O;n++)t.push(m(e,n));return t}()),n=Object(a.a)(e,2),r=n[0],c=n[1],s=Object(i.useState)(!0),j=Object(a.a)(s,2),d=j[0],v=j[1],g=Object(i.useState)([0,15*O-1]),p=Object(a.a)(g,2),w=p[0],y=p[1],C=Object(i.useState)(!1),S=Object(a.a)(C,2),W=S[0],k=S[1],M=Object(i.useState)(t),P=Object(a.a)(M,2),E=P[0],D=P[1],z=Object(i.useState)(""),I=Object(a.a)(z,2),N=I[0],V=I[1];Object(i.useEffect)((function(){document.title=E}));var A=function(){var t=function(t,e,n,i,r){var c=1e9,s=r.length;function a(t,n){return t*e+n}function o(n,i){return n>=0&&n<t&&i>=0&&i<e&&1e6!=r[a(n,i)].Weight}function l(t){for(var e=[],n=r[i].row,s=r[i].col,l=c;;){for(var u=n,h=s,j=n-1;j<=n+1;j++)for(var d=s-1;d<=s+1;d++)Math.abs(n-j)+Math.abs(s-d)==1&&o(j,d)&&t[a(j,d)]<l&&(l=t[a(j,d)],u=j,h=d);if(u==n&&h==s)return e.reverse(),e.shift(),e;e.push(a(u,h)),n=u,s=h}}var u=[],h=new Array(s).fill(c);h[n]=0;var j=[];for(j.push(n);j.length>0;){j.sort((function(t,e){return h[t]-h[e]}));var d=j[0];d!=n&&u.push(d);for(var f=r[d].row,b=r[d].col,O=(j.shift(),f-1);O<=f+1;O++)for(var x=b-1;x<=b+1;x++)if(Math.abs(f-O)+Math.abs(b-x)==1&&o(O,x)){var m=a(O,x);if(h[a(O,x)]>h[d]+r[m].Weight){if(m==i)return[u,l(h)];h[m]=h[d]+r[m].Weight,j.push(m)}}}return[u,[]]}(15,O,w[0],w[1],r),e=Object(a.a)(t,2),n=e[0],i=e[1];!function(t){for(var e=function(e){setInterval((function(){var n=r.slice();n[t[e]].isVisited=!0,c(n)}),5*e)},n=0;n<t.length;n++)e(n)}(n),function(t,e){for(var n=function(n){setInterval((function(){var e=r.slice();e[t[n]].isPath=!0,c(e)}),200*n+10*e)},i=0;i<t.length;i++)n(i)}(i,n.length+1),V(x)};return Object(f.jsxs)("div",{className:"y",children:[Object(f.jsx)(o.a,{maxWidth:"xl",children:Object(f.jsxs)(l.a,{container:!0,justify:"flex-start",children:[Object(f.jsxs)(l.a,{item:!0,md:3,className:"item",children:[Object(f.jsx)("h4",{children:"Select and double click on Grid to Change start and end positions"}),Object(f.jsx)(u.a,{m:1,children:Object(f.jsx)(h.a,{onClick:function(){return v(!0)},variant:"outlined",color:"primary",size:"small",children:"Choose Start Point"})}),Object(f.jsx)(u.a,{m:1,children:Object(f.jsx)(h.a,{onClick:function(){return v(!1)},variant:"outlined",color:"primary",size:"small",children:"Choose End Point"})})]}),Object(f.jsxs)(l.a,{item:!0,md:3,className:"item",children:[Object(f.jsx)("h4",{children:"Click and drag to create Walls and weights"}),Object(f.jsx)(u.a,{m:1,children:Object(f.jsx)(h.a,{onClick:function(){return D(t)},variant:"outlined",color:"primary",size:"small",children:"Set Walls"})}),Object(f.jsxs)(u.a,{m:1,children:[Object(f.jsx)("input",{type:"range",max:"50",min:"2",id:"weight"}),Object(f.jsx)("br",{}),Object(f.jsx)(h.a,{onClick:function(){return D(document.getElementById("weight").value)},variant:"outlined",color:"primary",size:"small",children:"Set Weights"})]})]}),Object(f.jsxs)(l.a,{item:!0,md:3,className:"item",children:[Object(f.jsx)("h4",{children:"Choose one of the following Algorithms"}),Object(f.jsx)(u.a,{m:1,children:Object(f.jsx)(h.a,{onClick:function(){return A()},variant:"outlined",color:"primary",size:"small",children:"Djisktra"})})]})]})}),Object(f.jsx)("hr",{}),Object(f.jsx)("div",{style:{width:42*O},children:r.map((function(t){return Object(f.jsx)("div",{onDoubleClick:function(){return function(t){var e=w.slice();d?e[0]=t:e[1]=t,y(e)}(t.idx)},onMouseDown:function(){return k(!0)},onMouseUp:function(){return k(!1)},onMouseEnter:function(){return function(t){if(W){var e=r.slice();e[t].Weight=E,c(e)}}(t.idx)},children:Object(f.jsx)(b,{idx:t.idx,isVisited:t.isVisited,isPath:t.isPath,Weight:t.Weight,isStart:w[0]===t.idx,isEnd:w[1]===t.idx},t)})}))}),Object(f.jsxs)("i",{children:["Algorithm Description: ",N]})]})},g=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,c=e.getLCP,s=e.getTTFB;n(t),i(t),r(t),c(t),s(t)}))};s.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root")),g()}},[[50,1,2]]]);
//# sourceMappingURL=main.b526c6e7.chunk.js.map