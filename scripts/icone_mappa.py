#!/usr/bin/env python3
"""
Estrae in SVG + PNG le icone dei servizi (legenda della mappa) e della raccolta
differenziata (flyer) dagli esecutivi di stampa vettoriali.

    python3 scripts/icone_mappa.py

Le icone non sono ridisegnate: ogni tracciato viene letto dal PDF con PyMuPDF
(get_drawings) e riscritto 1:1 come <path>, con riempimento, contorno e
opacità originali. I colori arrivano dal CMYK di stampa convertito in RGB.
"""
from pathlib import Path

import fitz  # PyMuPDF

RADICE = Path(__file__).resolve().parent.parent
PROGETTO = RADICE.parent
OUT = RADICE / 'public/brand/icone/servizi'

MAPPA = PROGETTO / "S'EA_Mappa A3/S'EA_Mappa_A3_Esecutivo di Stampa.pdf"
FLYER = PROGETTO / "Flyer/S'EA_Flyer_22-05-25_Esecutivo.pdf"

# Legenda della mappa A3: 4 righe × 6 colonne, in ordine di lettura.
COLONNE = [(28, 75), (200, 250), (415, 458), (600, 648), (832, 876), (1028, 1068)]
RIGHE = [(585, 628), (632, 672), (674, 712), (714, 750)]
SERVIZI = [
    ['parcheggio', 'docce-servizi', 'casa-mobile', 'camper-roulotte', 'piscina', 'area-cani'],
    ['reception', 'acqua-potabile', 'tenda-lodge', 'camper-service', 'parco-giochi', 'bird-watching'],
    ['bar', 'lavanderia', 'tenda', 'corner-shop', 'campo-calcio', 'spiaggia-cani'],
    ['ristorante', 'doccia-cani', 'barbecue', 'isola-ecologica', 'beach-tennis-volley', 'area-spettacoli'],
]
# Flyer, pagina 2, colonna «Raccolta differenziata» (versione italiana, in alto).
RIFIUTI = ['organico', 'carta', 'non-riciclabile', 'plastica', 'vetro', 'metallo']


def hexa(c):
    return '#%02X%02X%02X' % tuple(round(v * 255) for v in c[:3])


def path_d(items, ox, oy):
    """Converte gli elementi di un disegno PyMuPDF in un attributo d SVG."""
    f = lambda p: f'{p.x - ox:.2f},{p.y - oy:.2f}'
    d, ultimo = [], None
    for it in items:
        k = it[0]
        if k == 'l':
            if ultimo is None or abs(it[1] - ultimo) > 0.01:
                d.append('M' + f(it[1]))
            d.append('L' + f(it[2])); ultimo = it[2]
        elif k == 'c':
            if ultimo is None or abs(it[1] - ultimo) > 0.01:
                d.append('M' + f(it[1]))
            d.append('C' + ' '.join(f(q) for q in it[2:5])); ultimo = it[4]
        elif k == 're':
            r = it[1]
            d.append(f'M{f(r.tl)}L{f(r.tr)}L{f(r.br)}L{f(r.bl)}Z'); ultimo = None
        elif k == 'qu':
            q = it[1]
            d.append(f'M{f(q.ul)}L{f(q.ur)}L{f(q.lr)}L{f(q.ll)}Z'); ultimo = None
    return ''.join(d)


def svg_da(disegni, titolo, margine=1.0):
    box = fitz.Rect()
    for x in disegni:
        box |= x['rect']
    box += (-margine, -margine, margine, margine)
    parti = []
    for x in disegni:
        d = path_d(x['items'], box.x0, box.y0)
        if x.get('closePath'):
            d += 'Z'
        a = [f'd="{d}"']
        if x.get('fill') is not None and x['type'] in ('f', 'fs'):
            a.append(f'fill="{hexa(x["fill"])}"')
            if (x.get('fill_opacity') or 1) < 1:
                a.append(f'fill-opacity="{x["fill_opacity"]:.3f}"')
            if x.get('even_odd'):
                a.append('fill-rule="evenodd"')
        else:
            a.append('fill="none"')
        if x.get('color') is not None and x['type'] in ('s', 'fs'):
            a.append(f'stroke="{hexa(x["color"])}" stroke-width="{x.get("width") or 1:.2f}"')
            a.append(f'stroke-linecap="{["butt", "round", "square"][int((x.get("lineCap") or [0])[0])]}"')
            a.append(f'stroke-linejoin="{["miter", "round", "bevel"][int(x.get("lineJoin") or 0)]}"')
            if (x.get('stroke_opacity') or 1) < 1:
                a.append(f'stroke-opacity="{x["stroke_opacity"]:.3f}"')
        parti.append('<path ' + ' '.join(a) + '/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {box.width:.2f} {box.height:.2f}" '
            f'role="img" aria-label="{titolo}">\n  <title>{titolo}</title>\n  ' + '\n  '.join(parti) + '\n</svg>\n')


def scrivi(nome, contenuto, lato=512):
    (OUT / f'{nome}.svg').write_text(contenuto, encoding='utf-8')
    p = fitz.open(stream=contenuto.encode(), filetype='svg')[0]
    z = lato / max(p.rect.width, p.rect.height)
    p.get_pixmap(matrix=fitz.Matrix(z, z), alpha=True).save(OUT / f'{nome}.png')


def nella_cella(x, cella):
    c = (x['rect'].tl + x['rect'].br) / 2
    return cella.contains(c) and x['rect'].width < 60 and x['rect'].height < 60


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    n = 0
    dis = fitz.open(MAPPA)[0].get_drawings()
    for r, (y0, y1) in enumerate(RIGHE):
        for c, (x0, x1) in enumerate(COLONNE):
            cella = fitz.Rect(x0, y0, x1, y1)
            sel = [x for x in dis if nella_cella(x, cella)]
            assert sel, f'cella vuota {SERVIZI[r][c]}'
            nome = SERVIZI[r][c]
            scrivi(nome, svg_da(sel, nome.replace('-', ' ').capitalize())); n += 1

    dis = fitz.open(FLYER)[1].get_drawings()
    zona = [x for x in dis if 1420 < x['rect'].x0 and x['rect'].x1 < 1515 and 180 < x['rect'].y0 and x['rect'].y1 < 500
            and x['rect'].width < 70]
    # i sei cerchi: un gruppo per ciascuno, ordinati dall'alto
    cerchi = sorted({round(x['rect'].y0 / 10) for x in zona if x['rect'].width > 40})
    gruppi = []
    for x in sorted(zona, key=lambda x: x['rect'].y0):
        for g in gruppi:
            if (g['r'] + (-2, -2, 2, 2)).intersects(x['rect']):
                g['r'] |= x['rect']; g['x'].append(x); break
        else:
            gruppi.append({'r': fitz.Rect(x['rect']), 'x': [x]})
    gruppi = [g for g in gruppi if g['r'].width > 40]
    gruppi.sort(key=lambda g: g['r'].y0)
    assert len(gruppi) == 6, f'{len(gruppi)} gruppi rifiuti (cerchi {cerchi})'
    for nome, g in zip(RIFIUTI, gruppi):
        scrivi(f'rifiuti-{nome}', svg_da(g['x'], 'Raccolta differenziata: ' + nome.replace('-', ' '))); n += 1
    print(f'icone servizi: {n} SVG + PNG in {OUT.relative_to(RADICE)}')


if __name__ == '__main__':
    main()
