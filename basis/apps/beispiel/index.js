/* ============================================================
   Beispiel-Modul
   -------------------------------------------------------------
   Zeigt den "Vertrag", den jede Mini-App erfüllen muss, damit
   der Router sie laden kann:

   1. Datei liegt unter /apps/<id>/index.js
   2. Sie exportiert eine Funktion `render(container)`
   3. Sie räumt bei Bedarf selbst auf (Timer stoppen etc.),
      dafür gibt es optional `unmount()` (unten als Beispiel)

   Header-Titel und Zurück-Button übernimmt der Router bereits
   automatisch über die config.js - darum musst du dich hier
   nicht kümmern.
   ============================================================ */

export function render(container) {
  let count = 0;

  container.innerHTML = `
    <div class="placeholder">
      <strong>Es funktioniert 🎉</strong>
      <p>Dieses Modul wurde erst geladen, als du draufgetippt hast.</p>
      <p id="counter-value" style="color: var(--color-text); font-size: 28px; font-weight: 700; margin: var(--space-4) 0;">0</p>
      <button id="counter-btn" style="
        background: var(--color-accent);
        color: #0b1210;
        border: none;
        padding: 12px 24px;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 15px;
      ">Antippen</button>
    </div>
  `;

  container.querySelector("#counter-btn").addEventListener("click", () => {
    count++;
    container.querySelector("#counter-value").textContent = count;
  });
}
