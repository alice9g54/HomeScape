/* ============================================================
   HOMESCAPE - SERVICE WORKER
   Version: 1.0.0
   Purpose: Offline caching, faster loading
   ============================================================ */

var CACHE_NAME = 'homescape-v1.0.0';
var CACHE_URLS = [
  '/',
  '/index.html',
  '/properties.html',
  '/experience.html',
  '/video-tours.html',
  '/about.html',
  '/contact.html',
  '/privacy.html',
  '/terms.html',
  '/404.html',
  '/manifest.json',
  '/assets/css/main.css',
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png',
  '/assets/images/favicon.ico'
];

// ============================================================
// INSTALL
// ============================================================
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('📦 Caching app shell');
      return cache.addAll(CACHE_URLS.map(function(url) {
        return new Request(url, { credentials: 'same-origin' });
      })).catch(function(err) {
        console.warn('⚠️ Some files failed to cache:', err);
      });
    })
  );
  self.skipWaiting();
});

// ============================================================
// ACTIVATE
// ============================================================
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// ============================================================
// FETCH
// ============================================================
self.addEventListener('fetch', function(event) {
  var request = event.request;
  var url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Skip external
  if (url.origin !== location.origin) return;

  // Skip admin
  if (url.pathname.startsWith('/admin/')) return;

  // Skip data (always fresh)
  if (url.pathname.startsWith('/data/')) {
    event.respondWith(
      fetch(request).catch(function() {
        return caches.match(request);
      })
    );
    return;
  }

  // Network first, fallback to cache
  event.respondWith(
    fetch(request).then(function(response) {
      if (response && response.status === 200) {
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(request).then(function(cached) {
        return cached || caches.match('/404.html');
      });
    })
  );
});

console.log('✅ Service Worker loaded');