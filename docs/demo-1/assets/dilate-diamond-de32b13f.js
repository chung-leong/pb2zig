async function v(){return h("getKernelInfo")}async function y(e,r,o={},t={}){return k(e,r,0,r,o,t)}async function k(e,r,o,t,n={},c={}){const s=[],d=[e,r,o,t,n,c];if("data"in n&&"width"in n&&"height"in n)s.push(n.data.buffer);else for(const m of Object.values(n))s.push(m.data.buffer);return h("createPartialImageData",d,s)}function C(e){if("keepAlive"in e&&(p=e.keepAlive,p||i.splice(0)),"maxCount"in e){a=e.maxCount;const r=i.length+l.length-a;r>0&&i.splice(0,r)}}function P(){w.splice(0)}const b=new URL("dilate-diamond-worker-ccd12085.js",import.meta.url).href;let p=!0,a=navigator.hardwareConcurrency;const l=[],i=[],w=[],f=[];let x=1;async function j(){let e=i.shift();if(!e){if(a<1)throw new Error(`Unable to start worker because maxCount is ${a}`);if(l.length<a)e=new Worker(b,{type:"module"}),await new Promise((r,o)=>{e.onmessage=r,e.onerror=o}),e.onmessage=I,e.onerror=r=>console.error(r);else return new Promise(r=>w.push(r))}return l.push(e),e}async function h(e,r=[],o=[]){const t=await j(),n={id:x++,promise:null,resolve:null,reject:null,worker:t};return n.promise=new Promise((c,s)=>{n.resolve=c,n.reject=s}),f.push(n),t.onmessageerror=()=>reject(new Error("Message error")),t.postMessage([e,n.id,...r],{transfer:o}),n.promise}function I(e){const[r,o,t]=e.data,n=f.findIndex(u=>u.id===o),c=f[n];f.splice(n,1);const{worker:s,resolve:d,reject:m}=c;r!=="error"?d(t):m(t);const g=w.shift();if(g)g(s);else{const u=l.indexOf(s);u!==-1&&l.splice(u,1),p&&i.length<a&&i.push(s)}}export{y as createImageData,k as createPartialImageData,v as getKernelInfo,C as manageWorkers,P as purgeQueue};