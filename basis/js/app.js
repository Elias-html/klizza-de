/* ============================================================
   App-Start
   -------------------------------------------------------------
   Registriert den Service Worker, der das Grundgerüst
   (HTML/CSS/JS) cacht, damit die App auch bei wackligem Netz
   sofort startet - wichtig für das "App statt Website"-Gefühl.

   Hinweis fürs Entwickeln: Während du aktiv am Code baust,
   kann der Cache alte Stände ausliefern. In den Chrome-
   DevTools unter "Application" -> "Service Workers" gibt es
   dafür "Update on reload".
   ============================================================ */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.warn("Service Worker konnte nicht registriert werden:", err);
    });
  });
}
