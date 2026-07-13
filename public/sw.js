const VERSION = 'v4';
const SHELL_CACHE = `apc-shell-${VERSION}`;
const STATIC_CACHE = `apc-static-${VERSION}`;
const MEDIA_CACHE = `apc-media-${VERSION}`;
const PAGE_CACHE = `apc-pages-${VERSION}`;

const PRECACHE_URLS = ['/', '/index.html', '/assets/apc-branco.svg', '/assets/apc-preto.svg', '/fonts/CircularStd-Book.otf'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => undefined)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const validCaches = new Set([SHELL_CACHE, STATIC_CACHE, MEDIA_CACHE, PAGE_CACHE]);

      try {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => !validCaches.has(key)).map((key) => caches.delete(key)));
      } catch {}

      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

function isStaticAssetRequest(request, url) {
  if (!isSameOrigin(url)) return false;
  const destination = request.destination;
  return destination === 'script' || destination === 'style' || destination === 'font';
}

function isMediaRequest(request, url) {
  if (!isSameOrigin(url)) return false;
  const destination = request.destination;
  return destination === 'image' || destination === 'video' || destination === 'audio';
}

async function staleWhileRevalidate(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone()).catch(() => undefined);
      }
      return response;
    })
    .catch(() => undefined);

  if (cached) {
    return cached;
  }

  return networkPromise || Response.error();
}

async function networkFirst(cacheName, request) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone()).catch(() => undefined);
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;

    const shell = await caches.match('/index.html');
    return shell || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (!request || request.method !== 'GET') return;

  const url = new URL(request.url);

  if (isNavigationRequest(request) && isSameOrigin(url)) {
    event.respondWith(networkFirst(PAGE_CACHE, request));
    return;
  }

  if (isStaticAssetRequest(request, url)) {
    event.respondWith(staleWhileRevalidate(STATIC_CACHE, request));
    return;
  }

  if (isMediaRequest(request, url) || (isSameOrigin(url) && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/')))) {
    event.respondWith(staleWhileRevalidate(MEDIA_CACHE, request));
  }
});
