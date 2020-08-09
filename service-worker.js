const CACHE_NAME = "kelingking-beach-v1.1.27";
let urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/overview.html",
    "/pages/route.html",
    "/pages/video.html",
    "/sass/materialize.min.css",
    "/js/materialize-js/bin/materialize.min.js",
    "/js/main.js",
    "/image/kilarov-zaneit-dqhAeDXqB5U-unsplash.jpg",
    "/image/shashank-acharya-nis5gvoboyI-unsplash.jpg",
    "/image/fast-boat.jpg",
    "/image/icon-512x512.png",
    "/image/icon-256x256.png",
    "/image/icon-192x192.png",
    "/image/icon-152x152.png",
    "/image/icon-144x144.png",
    "/image/icon-120x120.png",
    "/image/icon-114x114.png",
    "/image/icon-76x76.png",
    "/image/icon-72x72.png",
    "/image/icon-60x60.png",
    "/image/icon-57x57.png",
    "/image/icon-128x128.png",
    "/image/icon-48x48.png",
    "/image/icon-32x32.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css2?family=Carter+One&family=Montserrat:wght@500;600;700;800;900&display=swap"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    return self.skipWaiting();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches
          .match(event.request, {cacheName: CACHE_NAME})
          .then(response => {
              if (response) {
                  console.log("ServiceWorker: Use asset from cache: ", response.url);
                  return response;
              }

              console.log(
                  "ServiceWorker: Load asset from server: ",
                  event.request.url
              );
              return fetch(event.request);
          })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} deleted`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
}); 