async function v(){return w("getKernelInfo")}async function y(e,t,s={},r={}){return b(e,t,0,t,s,r)}async function b(e,t,s,r,n={},c={}){const o=[],p=[e,t,s,r,n,c];if("data"in n&&"width"in n&&"height"in n)o.push(n.data.buffer);else for(const d of Object.values(n))o.push(d.data.buffer);return w("createPartialImageData",p,o)}function D(e){if(m=e.keepAlive,a=e.maxCount,!m)i.splice(0);else{const t=i.length+l.length-a;t>0&&i.splice(0,t)}}function L(){g.splice(0)}const k="import.meta.ROLLUP_FILE_URL_b09687fd";let m=!0,a=navigator.hardwareConcurrency;const l=[],i=[],g=[],f=[];let x=1;async function I(){let e=i.shift();if(!e){if(a<1)throw new Error(`Unable to start worker because maxCount is ${a}`);if(l.length<a)e=new Worker(k,{type:"module"}),e.onmessage=j,e.onerror=t=>console.error(t);else return new Promise(t=>{g.push(t)})}return l.push(e),e}async function w(e,t=[],s=[]){const r=await I(),n={id:x++,promise:null,resolve:null,reject:null,worker:r};return n.promise=new Promise((c,o)=>{n.resolve=c,n.reject=o}),f.push(n),r.postMessage([e,n.id,...t],{transfer:s}),n.promise}function j(e){const[t,s,r]=e.data,n=f.findIndex(u=>u.id===s),c=f[n];f.splice(n,1);const{worker:o,resolve:p,reject:d}=c;t!=="error"?p(r):d(r);const h=g.shift();if(h)h(o);else{const u=l.indexOf(o);u!==-1&&l.splice(u,1),m&&i.length<a&&i.push(o)}}export{y as createImageData,b as createPartialImageData,v as getKernelInfo,D as manageWorkers,L as purgeQueue};
