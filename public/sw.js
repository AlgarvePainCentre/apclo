const CACHE_NAME = 'apc-static-v2';

const PRECACHE_URLS = ['/assets/apc-branco.svg', '/assets/apc-preto.svg', '/fonts/CircularStd-Book.otf'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => undefined)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      } catch {}
      await self.clients.claim();
    })()
  );
});

function isCacheableRequest(request) {
  if (!request) return false;
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  const dest = request.destination;
  if (dest === 'script' || dest === 'style' || dest === 'image' || dest === 'font') return true;
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/')) return true;
  return false;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (!isCacheableRequest(req)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);

      const update = fetch(req)
        .then((res) => {
          try {
            if (res && res.ok) cache.put(req, res.clone());
          } catch {}
          return res;
        })
        .catch(() => undefined);

      if (cached) {
        event.waitUntil(update);
        return cached;
      }

      const res = await update;
      return res || fetch(req);
    })()
  );
});
