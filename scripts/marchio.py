#!/usr/bin/env python3
"""
Rigenera marchio e icone del design system dai vettoriali consegnati dal cliente.

    python3 scripts/marchio.py "../Sito/Brand/CAMPING VILLAGE/SVG"

Cosa fa:
1. Legge gli SVG di Illustrator e porta i colori dalle classi CSS (.cls-N) ad
   attributi `fill` sugli elementi. Serve due volte: i file diventano
   autosufficienti (si incollano ovunque) e PyMuPDF, che ignora i <style>,
   li rasterizza con i colori giusti.
2. Scrive il logo nelle 5 versioni del cliente + una versione `mono`
   in currentColor (per tingerlo via CSS).
3. Estrae dal logo il pittogramma (parte A del brandbook p.11) e le tre stelle,
   ritagliando il viewBox sugli elementi. Nessun tracciato viene ridisegnato.
4. Copia il simbolo del sole (7 colori) e le immagini profilo.
5. Esporta ogni SVG anche in PNG trasparente (2048 px sul lato lungo; 1080 per i profili).

Richiede PyMuPDF (`pip install pymupdf`).
"""
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

RADICE = Path(__file__).resolve().parent.parent
SORGENTE = Path(sys.argv[1] if len(sys.argv) > 1 else RADICE.parent / 'Sito/Brand/CAMPING VILLAGE/SVG').resolve()
LOGHI = RADICE / 'public/brand/loghi'
ICONE = RADICE / 'public/brand/icone'

# ◆ brandbook p.17-18. Il nero dei file cliente è #090204: lo si porta al nero puro.
PALETTE = {
    'minio': '#D85844', 'sabbia': '#EBC6A4', 'cotto': '#A4382E', 'bianco': '#FFFFFF',
    'acqua': '#D9EEF6', 'cielo': '#79CADB', 'nero': '#000000',
}
NORMALIZZA = {'#d85844': '#D85844', '#ebc6a4': '#EBC6A4', '#a4382e': '#A4382E', '#fff': '#FFFFFF',
              '#ffffff': '#FFFFFF', '#d9eef6': '#D9EEF6', '#79cadb': '#79CADB', '#090204': '#000000'}
FORME = r'path|polygon|circle|rect|ellipse|polyline'


def elementi(file: Path):
    """Restituisce (viewBox, [(tag_svg_con_fill_inline, fill)]) di un SVG Illustrator."""
    s = file.read_text(encoding='utf-8')
    css = {}
    stile = re.search(r'<style>(.*?)</style>', s, re.S)
    if stile:
        for sel, corpo in re.findall(r'([^{}]+)\{([^}]*)\}', stile.group(1)):
            m = re.search(r'fill:\s*([^;]+)', corpo)
            if m:
                for c in re.findall(r'\.(cls-\d+)', sel):
                    css[c] = m.group(1).strip().lower()
    vb = [float(x) for x in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
    out = []
    for m in re.finditer(rf'<({FORME})\b([^>]*?)/?>', s):
        tag, attr = m.group(1), m.group(2)
        cls = re.search(r'class="([^"]+)"', attr)
        fill = css.get(cls.group(1).split()[0], '#000') if cls else '#000'
        fill = NORMALIZZA.get(fill, fill)
        attr = re.sub(r'\s*(class|id|data-name)="[^"]*"', '', attr).strip()
        out.append((tag, attr, fill))
    return vb, out


def svg(vb, parti, titolo):
    x, y, w, h = vb
    corpo = '\n  '.join(f'<{t} fill="{f}" {a}/>' for t, a, f in parti)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:g} {y:g} {w:g} {h:g}" '
            f'role="img" aria-label="{titolo}">\n  <title>{titolo}</title>\n  {corpo}\n</svg>\n')


def bbox(vb, parti, indici):
    """Rettangolo che contiene gli elementi `indici`, misurato da MuPDF."""
    doc = fitz.open(stream=svg(vb, parti, 'x').encode(), filetype='svg')
    disegni = doc[0].get_drawings()
    assert len(disegni) == len(parti), f'{len(disegni)} disegni per {len(parti)} elementi'
    r = fitz.Rect()
    for i in indici:
        r |= disegni[i]['rect']
    return [vb[0] + r.x0, vb[1] + r.y0, r.width, r.height]


def scrivi(cartella: Path, nome: str, contenuto: str, png_lato=2048):
    (cartella / f'{nome}.svg').write_text(contenuto, encoding='utf-8')
    if png_lato:
        doc = fitz.open(stream=contenuto.encode(), filetype='svg')
        p = doc[0]
        z = png_lato / max(p.rect.width, p.rect.height)
        p.get_pixmap(matrix=fitz.Matrix(z, z), alpha=True).save(cartella / f'{nome}.png')


def tinta(parti, colore):
    return [(t, a, colore) for t, a, _ in parti]


def main():
    LOGHI.mkdir(parents=True, exist_ok=True)
    ICONE.mkdir(parents=True, exist_ok=True)
    n = 0

    # ---------------------------------------------------------------- LOGO
    versioni = {
        'logo-ufficiale':    ('S_EA_Sabbia+Rosso.svg', 'S\'Ena Arrubia Camping Village — versione ufficiale'),
        'logo-bianco-rosso': ('S_EA_Bianco+Rosso.svg', 'S\'Ena Arrubia Camping Village — bianco e rosso'),
        'logo-cotto-rosso':  ('S_EA_Cotto+Rosso.svg',  'S\'Ena Arrubia Camping Village — cotto e rosso'),
        'logo-bianco':       ('S_EA_Bianco.svg',       'S\'Ena Arrubia Camping Village — bianco'),
        'logo-nero':         ('S_EA_Nero.svg',         'S\'Ena Arrubia Camping Village — nero'),
    }
    for nome, (file, titolo) in versioni.items():
        vb, parti = elementi(SORGENTE / file)
        scrivi(LOGHI, nome, svg(vb, parti, titolo)); n += 1
        if nome == 'logo-nero':
            scrivi(LOGHI, 'logo-mono', svg(vb, tinta(parti, 'currentColor'), 'S\'Ena Arrubia Camping Village'), 0); n += 1

    # ------------------------------------------------- PITTOGRAMMA (parte A)
    # Nelle versioni a colori gli elementi 0-8 sono: disco minio, alone cotto,
    # tre bande (colline), sole, tre stelle. Nelle versioni al tratto il
    # pittogramma è tutto ciò che sta sopra la scritta (y < 290).
    for nome, file, titolo in [('pittogramma-ufficiale', 'S_EA_Sabbia+Rosso.svg', 'Pittogramma — sole sabbia'),
                               ('pittogramma-bianco-rosso', 'S_EA_Bianco+Rosso.svg', 'Pittogramma — sole bianco')]:
        vb, parti = elementi(SORGENTE / file)
        idx = list(range(9))
        scrivi(ICONE, nome, svg(bbox(vb, parti, idx), [parti[i] for i in idx], titolo)); n += 1

    vb, parti = elementi(SORGENTE / 'S_EA_Nero.svg')
    doc = fitz.open(stream=svg(vb, parti, 'x').encode(), filetype='svg')
    alto = [i for i, d in enumerate(doc[0].get_drawings()) if d['rect'].y1 < 290]
    # le stelle nel file Nero sono duplicate (stesso tracciato due volte): se ne tiene una copia
    visti, linea = set(), []
    for i in alto:
        chiave = parti[i][1]
        if chiave not in visti:
            visti.add(chiave); linea.append(i)
    box = bbox(vb, parti, linea)
    pl = [parti[i] for i in linea]
    for c in ('nero', 'bianco', 'cotto', 'minio'):
        scrivi(ICONE, f'pittogramma-linea-{c}', svg(box, tinta(pl, PALETTE[c]), f'Pittogramma al tratto — {c}')); n += 1
    scrivi(ICONE, 'pittogramma-linea-mono', svg(box, tinta(pl, 'currentColor'), 'Pittogramma al tratto'), 0); n += 1

    # ------------------------------------------------------------ STELLE
    # Le tre stelle del pittogramma (la classificazione del campeggio).
    vbc, pc = elementi(SORGENTE / 'S_EA_Sabbia+Rosso.svg')
    st = [6, 7, 8]
    box = bbox(vbc, pc, st)
    m = box[3] * 0.08  # un filo d'aria intorno, così il PNG non taglia le punte
    box = [box[0] - m, box[1] - m, box[2] + 2 * m, box[3] + 2 * m]
    for c, hexa in PALETTE.items():
        scrivi(ICONE, f'stelle-{c}', svg(box, tinta([pc[i] for i in st], hexa), f'Tre stelle — {c}')); n += 1
    scrivi(ICONE, 'stelle-mono', svg(box, tinta([pc[i] for i in st], 'currentColor'), 'Tre stelle'), 0); n += 1

    # -------------------------------------------------------------- SOLE
    for c in ('minio', 'cotto', 'sabbia', 'acqua', 'cielo', 'bianco', 'nero'):
        vb, parti = elementi(SORGENTE / 'Simbolo_Sole' / f'S_EA_Sole_{c.capitalize()}.svg')
        if c == 'bianco':
            parti = tinta(parti, PALETTE['bianco'])
        scrivi(ICONE, f'sole-{c}', svg(vb, parti, f'Sole — {c}')); n += 1
        if c == 'nero':
            scrivi(ICONE, 'sole-mono', svg(vb, tinta(parti, 'currentColor'), 'Sole'), 0); n += 1

    # ---------------------------------------------------- IMMAGINI PROFILO
    profili = {
        'profilo-pittogramma': 'S_EA_Immagine Profilo.svg',
        'profilo-linea-nero':  'S_EA_Immagine Profilo_Nero.svg',
        'profilo-logo-sabbia': 'S_EA_Immagine Profilo_Sabbia.svg',
        'profilo-logo-bianco': 'S_EA_Immagine Profilo_Bianco.svg',
        'profilo-logo-cotto':  'S_EA_Immagine Profilo_Cotto.svg',
    }
    for nome, file in profili.items():
        vb, parti = elementi(SORGENTE / 'Immagine Profilo Social' / file)
        scrivi(ICONE, nome, svg(vb, parti, f'Immagine profilo — {nome[8:]}'), 1080); n += 1

    print(f'marchio: {n} file SVG in {LOGHI.relative_to(RADICE)} e {ICONE.relative_to(RADICE)}')


if __name__ == '__main__':
    main()
