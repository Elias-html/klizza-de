/* ============================================================
   Router
   -------------------------------------------------------------
   Einfacher Hash-Router ohne Framework. Tauscht nur den Inhalt
   von #app aus - kein Reload, fühlt sich wie eine App an.

   Routen:
   #/                -> Startbildschirm (App-Raster)
   #/<app-id>        -> lädt /apps/<app-id>/index.js dynamisch
   #/einstellungen   -> Einstellungsseite
   ============================================================ */

const $app = document.getElementById("app");
const $title = document.getElementById("header-title");
const $backBtn = document.getElementById("back-btn");

const APP_NAME = "Basis";

function setHeader({ title, showBack }) {
  $title.textContent = title;
  $backBtn.hidden = !showBack;
}

function setActiveNav(routeId) {
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.nav === routeId);
  });
}

function renderHome() {
  setHeader({ title: APP_NAME, showBack: false });
  setActiveNav("home");

  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Guten Morgen" : hour < 18 ? "Hey" : "Guten Abend";

  const tiles = APPS.map((a) => {
    const badge = a.status === "soon" ? '<span class="tile-badge">Bald</span>' : "";
    return `
      <a class="app-tile ${a.status === "soon" ? "is-soon" : ""}" href="#/${a.id}">
        <div class="tile-icon" style="background:color-mix(in srgb, ${a.color} 16%, transparent); color:${a.color}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${a.icon}</svg>
        </div>
        <div class="tile-name">${a.name}</div>
        <div class="tile-sub">${a.sub}</div>
        ${badge}
      </a>`;
  }).join("");

  $app.innerHTML = `
    <div class="home-greeting">
      <h2>${greeting}</h2>
      <p>Was möchtest du öffnen?</p>
    </div>
    <div class="app-grid">${tiles}</div>
  `;
}

function renderSoonPlaceholder(appDef) {
  $app.innerHTML = `
    <div class="placeholder">
      <strong>${appDef.name} kommt noch</strong>
      <p>Diese Anwendung ist als Kachel schon angelegt, der Code fehlt noch. Leg dafür einfach /apps/${appDef.id}/index.js an und setz den Status in config.js auf "ready".</p>
    </div>
  `;
}

function renderMissing() {
  $app.innerHTML = `
    <div class="placeholder">
      <strong>Nicht gefunden</strong>
      <p>Diese Seite gibt es nicht.</p>
    </div>
  `;
}

async function renderApp(appId) {
  const appDef = APPS.find((a) => a.id === appId);

  if (!appDef) {
    setHeader({ title: "Basis", showBack: true });
    setActiveNav("");
    return renderMissing();
  }

  setHeader({ title: appDef.name, showBack: true });
  setActiveNav("");

  if (appDef.status !== "ready") {
    return renderSoonPlaceholder(appDef);
  }

  $app.innerHTML = `<div class="placeholder">Lädt …</div>`;

  try {
    // Jede Mini-App ist ein eigenes JS-Modul, das erst bei Bedarf
    // geladen wird (kein unnötiger Code auf dem Startbildschirm).
    const mod = await import(`/apps/${appDef.id}/index.js`);
    $app.innerHTML = "";
    mod.render($app);
  } catch (err) {
    console.error(`Konnte App "${appId}" nicht laden:`, err);
    $app.innerHTML = `
      <div class="placeholder">
        <strong>Fehler beim Laden</strong>
        <p>${appDef.name} konnte nicht gestartet werden.</p>
      </div>
    `;
  }
}

function renderSettings() {
  setHeader({ title: "Einstellungen", showBack: false });
  setActiveNav("einstellungen");
  $app.innerHTML = `
    <div class="placeholder">
      <strong>Noch nichts hier</strong>
      <p>Später: Theme, Konten, App-Reihenfolge.</p>
    </div>
  `;
}

function handleRoute() {
  const path = location.hash.replace(/^#\/?/, "");

  if (path === "" ) return renderHome();
  if (path === "einstellungen") return renderSettings();
  return renderApp(path);
}

$backBtn.addEventListener("click", () => {
  history.length > 1 ? history.back() : (location.hash = "#/");
});

window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);
