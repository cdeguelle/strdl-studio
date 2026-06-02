# strdl-studio — Roadmap

## En cours / immédiat

---

---

## Visuels

- [ ] **Opacité Hydra** — slider temps réel pour l'opacité du canvas Hydra
- [ ] **Pattern `H`** — utiliser un pattern Strudel comme input Hydra bidirectionnel (fonction `H`)
- [ ] **`detectAudio: true`** — capture audio réelle dans Hydra (vs sampling canvas actuel)

---

## Partage & communauté

- [ ] **URL sharing** — encoder le pattern dans une URL pour le partager (comme le REPL officiel)

---

## Fait ✓

- [x] **Ableton Link** — toggle dans le panneau I/O ; sync tempo bidirectionnel avec Ableton Live / Bitwig / tout app Link-compatible via `rusty_link` (Tauri Rust backend)
- [x] **MIDI out** — `midi("device name")` disponible dans le code ; panneau I/O dans la sidebar liste les sorties connectées
- [x] **MIDI in** — `midin()` / `midikeys()` disponibles ; panneau I/O liste les entrées connectées
- [x] **OSC** — `osc()` disponible ; panneau I/O guide le démarrage du bridge (`node node_modules/@strudel/osc/server.js`) et vérifie la connexion ws://localhost:8080
- [x] **MQTT** — `mqtt()` disponible via `@strudel/mqtt` intégré dans l'eval scope
- [x] **Éditeur Strudel** — éditeur CodeMirror complet avec autocomplétion et syntax highlighting
- [x] **Éditeur Hydra** — panneau latéral CodeMirror 6 avec évaluation live
- [x] **Multi-onglets** — sessions multiples avec gestion des fichiers récents
- [x] **Visualiseurs** — scope, spectrum, piano roll, punch card, spiral
- [x] **Samples browser** — chargement, preview et insertion de samples
- [x] **Snippets** — snippets utilisateur, exemples officiels, patterns par style
- [x] **Export audio** — rendu WAV avec durée configurable
- [x] **Color themes** — 5 thèmes (Void, Aqua, Ember, Jade, Sakura) synchronisés avec la syntax highlighting
- [x] **Synchronisation Hydra ↔ Strudel** — démarrage/arrêt automatique, FFT audio-réactif
- [x] **Pattern highlighting** — éléments actifs surlignés dans la mini-notation pendant la lecture
- [x] **Panneau Settings** — taille/famille de police, numéros de lignes, bracket matching/closing, line wrapping, tab indentation, vim mode
- [x] **Toggle commentaire** `Cmd+/` — commenter/décommenter la ligne ou la sélection
- [x] **Recherche** `Cmd+F` — barre de recherche flottante avec navigation
- [x] **Vim mode** — keybindings vim optionnels via le panneau Settings
- [x] **Tap tempo** — cliquer sur le BPM pour taper le tempo
- [x] **Historique d'évaluations** — naviguer entre les états précédents (`⌘↑` / `⌘↓`)
