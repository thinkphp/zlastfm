(function(a,b){this[a]=b()})("use",function(){var k=document,h=k.getElementsByTagName("head")[0],a=/^https?:\/\//,g={},l,c={},m="string",e=false;push="push",domContentLoaded="DOMContentLoaded",readyState="readyState",addEventListener="addEventListener",onreadystatechange="onreadystatechange";function d(f,o,n){for(n=0,j=f.length;n<j;++n){if(!o(f[n])){return e}}return 1}function i(f,n){d(f,function(o){return !n(o)})}function b(u,q,o){u=u.push?u:[u];var s=u.length,n=q&&q.call,p=n?q:o,f=n?u.join(""):q;function t(){if(!--s){g[f]=1;p&&p()}}setTimeout(function(){i(u,function(v){if(c[v]){return c[v]==2&&t()}r(!a.test(v)&&l?l+"/"+v+".js":v,t)})},0);function r(y,x){var w=k.createElement("script"),v=e;w.onload=w.onerror=w[onreadystatechange]=function(){if((w[readyState&&!(/^c|loade/.test(w[readyState]))])||v){return}w.onload=w[onreadystatechange]=null;v=1;c[y]=2;x()};w.async=1;w.src=y;h.appendChild(w)}return b}b.path=function(f){l=f};return b});