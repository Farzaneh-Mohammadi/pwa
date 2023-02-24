
const CACHE_NAME = "v1.0";
const  urlsToCache = ["index.html", "offline.html"]

const self = this;

// install SW
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('open cache')

            return cache.addAll(urlsToCache)
        })
    )
})

// listen requests
self.addEventListener("fetch", (e) => {
e.respondWith(
    caches.match(e.request)
    .then(() => {
        return fetch(e.request)
        .catch(() => caches.match('offline.html'))
    })
)
})

// activate SW
self.addEventListener("activate", (e) => {
const cacheWhitelist = []
cacheWhitelist.push(CACHE_NAME)

e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
            if(!cacheWhitelist.includes(cacheName)){
                return caches.delete(cacheName);
            }
        })
    ))
)
})