const CACHE_NAME = 'pwa-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './icons/apple-icon-57x57.png',
  './icons/apple-icon-60x60.png',
  './icons/apple-icon-72x72.png',
  './icons/apple-icon-76x76.png',
  './icons/apple-icon-114x114.png',
  './icons/apple-icon-120x120.png',
  './icons/ms-icon-144x144.png',
  './icons/apple-icon-152x152.png',
  './icons/apple-touch-icon.png',
  './icons/android-icon-192x192.png',
  './icons/android-icon-512x512.png',
  './icons/favicon-32x32.png',
  './icons/favicon-96x96.png',
  './icons/favicon-16x16.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
