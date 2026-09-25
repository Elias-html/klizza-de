/* ============================================================
   Zentrale App-Konfiguration
   -------------------------------------------------------------
   Hier trägst du jede neue Mini-App EINMAL ein. Das reicht,
   damit sie auf dem Startbildschirm erscheint und über den
   Router erreichbar ist.

   Felder:
   - id:      eindeutiger Slug, taucht in der URL als #/<id> auf
              und muss zum Ordnernamen unter /apps/<id>/ passen
   - name:    Anzeigename
   - sub:     kurzer Untertitel auf der Kachel
   - color:   CSS-Variable für die Icon-Akzentfarbe (siehe style.css)
   - icon:    SVG-Pfad(e) als String (stroke-basiert, s. Beispiele)
   - status:  "ready"  -> lädt /apps/<id>/index.js
              "soon"   -> zeigt "Kommt bald"-Platzhalter, kein Modul nötig
   ============================================================ */

const APPS = [
  {
    id: "beispiel",
    name: "Beispiel-Modul",
    sub: "Zeigt, wie eine App angebunden wird",
    color: "var(--tile-teal)",
    icon: '<path d="M12 2l9 4.9v10.2L12 22l-9-4.9V6.9L12 2z"/><path d="M12 22V12"/><path d="M21 6.9L12 12 3 6.9"/>',
    status: "ready",
  },
  {
    id: "skyblock",
    name: "Skyblock",
    sub: "Hypixel-Daten im Blick",
    color: "var(--tile-purple)",
    icon: '<path d="M12 2l3 6 6 1-4.5 4.4 1 6.1L12 16.9 6.5 19.5l1-6.1L3 9l6-1 3-6z"/>',
    status: "soon",
  },
  {
    id: "rubiks",
    name: "Rubik's Timer",
    sub: "Solves stoppen & tracken",
    color: "var(--tile-amber)",
    icon: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 10h16M4 14h16M10 4v16M14 4v16"/>',
    status: "soon",
  },
  {
    id: "tankpreise",
    name: "Tankpreise",
    sub: "Preise in der Nähe vergleichen",
    color: "var(--tile-coral)",
    icon: '<path d="M3 22V6a2 2 0 012-2h6a2 2 0 012 2v16"/><path d="M3 12h10"/><path d="M13 8h2l3 3v6a1 1 0 01-1 1h-1"/><circle cx="17.5" cy="17.5" r="1.2"/>',
    status: "soon",
  },
  {
    id: "kalender",
    name: "Kalender",
    sub: "Gemeinsame Termine",
    color: "var(--tile-blue)",
    icon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    status: "soon",
  },
];

// Damit Router / App-Skripte ohne Modul-Bundler darauf zugreifen können
window.APPS = APPS;
