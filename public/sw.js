const CACHE_NAME = 'ramadan-calendar-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/audio/azan1.mp3',
  '/audio/azan2.mp3',
  '/audio/Azan.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
