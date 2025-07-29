self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("twinkle-run-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/style.css", "/game.js"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
);
});
