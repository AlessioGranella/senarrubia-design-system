#!/usr/bin/env python3
"""
Divide lo sprite delle icone delle dotazioni in file singoli da scaricare.

    python3 scripts/dotazioni.py

Sorgente: public/brand/icone/dotazioni.svg (simboli al tratto, stroke currentColor,
griglia 24, tratto 1.6). Disegnate per il sito nel novembre 2026: il brandbook non
ha icone per le dotazioni degli alloggi.
Esce: public/brand/icone/dotazioni/<nome>.svg in cotto + <nome>.png 512 px.
"""
import re
from pathlib import Path
import fitz  # PyMuPDF

RADICE = Path(__file__).resolve().parent.parent
SPRITE = RADICE / 'public/brand/icone/dotazioni.svg'
OUT = RADICE / 'public/brand/icone/dotazioni'
COTTO = '#A4382E'


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    t = SPRITE.read_text(encoding='utf-8')
    n = 0
    for m in re.finditer(r'<symbol id="([^"]+)" viewBox="([^"]+)"([^>]*)>(.*?)</symbol>', t, re.S):
        nome, vb, attr, corpo = m.groups()
        attr = attr.replace('currentColor', COTTO)
        corpo = corpo.replace('currentColor', COTTO)
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="24" height="24"{attr}>{corpo}</svg>\n'
        (OUT / f'{nome}.svg').write_text(svg, encoding='utf-8')
        p = fitz.open(stream=svg.encode(), filetype='svg')[0]
        z = 512 / max(p.rect.width, p.rect.height)
        p.get_pixmap(matrix=fitz.Matrix(z, z), alpha=True).save(OUT / f'{nome}.png')
        n += 1
    print(f'dotazioni: {n} icone in {OUT.relative_to(RADICE)}')


if __name__ == '__main__':
    main()
