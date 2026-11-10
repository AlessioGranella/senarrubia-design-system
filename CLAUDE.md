# Istruzioni per Claude Code — S'Ena Arrubia Design System

Design system di **S'Ena Arrubia Camping Village** (Arborea), cliente DROP. Traduce in codice il
`../Sito/Brand/S_Ena Arrubia - Brand Book 2024.pdf` (DROP, 28 pp.). Manuale: `../DESIGN.md`.
◆ = brandbook, normativo. ★ = indicazione DROP successiva (Raleway). Il resto è derivato.

## Fonte di verità
- Token: `src/styles/colors_and_type.css` (prefisso `--se-*`). Specchio in `src/tokens.ts`: allinearli a mano.
- Componenti: `src/styles/components.css` + `src/components/`.
- Asset: `public/brand/`. Logo e icone li genera `npm run marchio` dagli SVG del cliente;
  gli zip li genera `scripts/pacchetti.sh` (pre dev/build) e non vanno in repo. `originali/` = PDF+EPS del cliente (gli .ai restano fuori).
- Online: https://alessiogranella.github.io/senarrubia-design-system/ (deploy a ogni push su main).
- Icone servizi (24) e rifiuti (6): `scripts/icone_mappa.py` le legge dagli esecutivi `../S'EA_Mappa A3/` e `../Flyer/` → `public/brand/icone/servizi/`.

## Regole non negoziabili
1. Palette ◆: minio #D85844, sabbia #EBC6A4 (primari), cotto #A4382E, bianco (secondari), acqua #D9EEF6, cielo #79CADB (terziari). Nero solo logo mono + testo corrente.
2. Solo token semantici nei componenti: `var(--se-fg-title)`, mai `#A4382E`.
3. **Raleway** è l'unico carattere (★). Il brandbook dice Signika: vale solo dentro il logo, già in curve.
4. Il logo si usa intero, dai file di `public/brand/loghi/`, nella versione indicata per il fondo (◆ p.19-20).
   Mai logotipo senza pittogramma (◆ p.11). Min 60 px / 2 cm (◆ p.14). Rispetto = altezza di CAMPING.
5. Minio non regge testo piccolo (3,9:1). Mai testo bianco su cielo o sabbia.
6. Icone: solo quelle del brand (sole, pittogramma, stelle + servizi della mappa), mai ridisegnate né mescolate a set generici. Le icone servizi sono multi-tono: `<img>`, non si ritingono.

## Gotcha
- Gli SVG di Illustrator hanno i colori in `<style>` (.cls-N): PyMuPDF li ignora. `marchio.py` li porta in `fill` inline.
- Nel file `S_EA_Nero.svg` le tre stelle sono duplicate: lo script ne tiene una copia.
- Tinta delle icone via `mask-image` (`.se-icona`): un SVG in `<img>` non eredita `currentColor`.
- Path degli asset sempre via `asset()`/`assetUrl()` in `src/asset.ts`.
- Testo su fasce piene: regola esplicita `:is(.se-fascia--minio, .se-fascia--cotto) :is(h1…p)`, la regola globale vince sull'ereditarietà.
