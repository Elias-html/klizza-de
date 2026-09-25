/* ============================================================
   Service Worker
   -------------------------------------------------------------
   Cacht nur das feste Grundgerüst (App-Shell). Inhalte einzelner
   Mini-Apps kommen später ggf. mit eigener Cache-Strategie
   (z.B. "network first" für Kalenderdaten).

   WICHTIG beim Deployen von Änderungen:
   CACHE_VERSION hochzählen, sonst liefert der Cache alte Dateien aus.
   ============================================================ */

const CACHE_VERSION = "basis-shell-v2";

const SHELL_FILES = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/config.js",
  "/js/router.js",
  "/js/app.js",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Nur eigene GET-Requests behandeln, alles andere normal durchlassen
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
