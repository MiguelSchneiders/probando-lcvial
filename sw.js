// LCVIAL Service Worker
const CACHE_NAME = 'lcvial-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/assets/images/hero-bg.png',
  '/assets/images/nosotros.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});