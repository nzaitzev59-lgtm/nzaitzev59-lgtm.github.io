const CACHE='english-quest-29a7f75c7a61';
const ASSETS=["/404.html","/audio/grammar-v1/sp5-0-0-3.mp3","/audio/grammar-v1/sp5-0-0-4.mp3","/audio/grammar-v1/sp5-0-1-3.mp3","/audio/grammar-v1/sp5-0-1-4.mp3","/audio/grammar-v1/sp5-1-0-3.mp3","/audio/grammar-v1/sp5-1-0-4.mp3","/audio/grammar-v1/sp5-1-1-3.mp3","/audio/grammar-v1/sp5-1-1-4.mp3","/audio/grammar-v1/sp5-10-0-3.mp3","/audio/grammar-v1/sp5-10-0-4.mp3","/audio/grammar-v1/sp5-10-1-3.mp3","/audio/grammar-v1/sp5-10-1-4.mp3","/audio/grammar-v1/sp5-2-0-3.mp3","/audio/grammar-v1/sp5-2-0-4.mp3","/audio/grammar-v1/sp5-2-1-3.mp3","/audio/grammar-v1/sp5-2-1-4.mp3","/audio/grammar-v1/sp5-3-0-3.mp3","/audio/grammar-v1/sp5-3-0-4.mp3","/audio/grammar-v1/sp5-3-1-3.mp3","/audio/grammar-v1/sp5-3-1-4.mp3","/audio/grammar-v1/sp5-4-0-3.mp3","/audio/grammar-v1/sp5-4-0-4.mp3","/audio/grammar-v1/sp5-4-1-3.mp3","/audio/grammar-v1/sp5-4-1-4.mp3","/audio/grammar-v1/sp5-5-0-3.mp3","/audio/grammar-v1/sp5-5-0-4.mp3","/audio/grammar-v1/sp5-5-1-3.mp3","/audio/grammar-v1/sp5-5-1-4.mp3","/audio/grammar-v1/sp5-6-0-3.mp3","/audio/grammar-v1/sp5-6-0-4.mp3","/audio/grammar-v1/sp5-6-1-3.mp3","/audio/grammar-v1/sp5-6-1-4.mp3","/audio/grammar-v1/sp5-7-0-3.mp3","/audio/grammar-v1/sp5-7-0-4.mp3","/audio/grammar-v1/sp5-7-1-3.mp3","/audio/grammar-v1/sp5-7-1-4.mp3","/audio/grammar-v1/sp5-8-0-3.mp3","/audio/grammar-v1/sp5-8-0-4.mp3","/audio/grammar-v1/sp5-8-1-3.mp3","/audio/grammar-v1/sp5-8-1-4.mp3","/audio/grammar-v1/sp5-9-0-3.mp3","/audio/grammar-v1/sp5-9-0-4.mp3","/audio/grammar-v1/sp5-9-1-3.mp3","/audio/grammar-v1/sp5-9-1-4.mp3","/icon-192.png","/icon-512.png","/icon.svg","/index.html","/index.txt","/manifest.webmanifest","/_next/static/chunks/139.7a5a8e93a21948c1.js","/_next/static/chunks/255-2005b055456c798b.js","/_next/static/chunks/4bd1b696-c023c6e3521b1417.js","/_next/static/chunks/646.f342b7cffc01feb0.js","/_next/static/chunks/app/layout-9786272adf0a63e5.js","/_next/static/chunks/app/page-4bd9b8dec3a31f88.js","/_next/static/chunks/app/_not-found/page-3f11d539260b3280.js","/_next/static/chunks/framework-28b60818f5cffd83.js","/_next/static/chunks/main-523c260c6f7df8a9.js","/_next/static/chunks/main-app-c71484d90beaeb9a.js","/_next/static/chunks/pages/_app-82835f42865034fa.js","/_next/static/chunks/pages/_error-013f4188946cdd04.js","/_next/static/chunks/polyfills-42372ed130431b0a.js","/_next/static/chunks/webpack-42e93347bc58ee0d.js","/_next/static/css/b6dd15e43dce3496.css","/_next/static/W0lLB8RiqDHfDN19J1Hbl/_buildManifest.js","/_next/static/W0lLB8RiqDHfDN19J1Hbl/_ssgManifest.js","/"];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE)
    .then(cache=>cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'}))))
    .then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key.startsWith('english-quest-')&&key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim()));
});
async function respond(request) {
  const cache=await caches.open(CACHE);
  if(request.mode==='navigate') {
    try { return await fetch(request,{cache:'no-cache'}); }
    catch { return (await cache.match('/')) || Response.error(); }
  }
  const cached=await cache.match(request);
  const range=request.headers.get('range');
  if(cached && range && new URL(request.url).pathname.endsWith('.mp3')) {
    const parts=/^bytes=([0-9]*)-([0-9]*)$/.exec(range);
    if(!parts || (!parts[1] && !parts[2])) return fetch(request);
    const audio=await cached.arrayBuffer();
    const size=audio.byteLength;
    const start=parts[1] ? Number(parts[1]) : Math.max(0,size-Number(parts[2]));
    const end=parts[1] && parts[2] ? Math.min(size-1,Number(parts[2])) : size-1;
    if(start>=size || start>end) return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+size}});
    return new Response(audio.slice(start,end+1),{status:206,headers:{
      'Content-Type':'audio/mpeg','Accept-Ranges':'bytes',
      'Content-Range':'bytes '+start+'-'+end+'/'+size,'Content-Length':String(end-start+1)
    }});
  }
  return cached || fetch(request);
}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(respond(event.request));
});