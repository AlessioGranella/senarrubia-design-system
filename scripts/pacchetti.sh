#!/bin/sh
# Rigenera gli zip scaricabili dai file in public/brand, così non vanno fuori sincrono.
# Il pacchetto «stampa» prende gli originali del cliente (PDF, EPS) da originali/.
# I sorgenti .ai restano fuori dal repo, in ../Sito/Brand.
set -e
cd "$(dirname "$0")/../public/brand"
mkdir -p zip
rm -f zip/*.zip
zip -qr zip/senarrubia-logo.zip loghi -x '*.DS_Store'
zip -qr zip/senarrubia-icone.zip icone -x '*.DS_Store'
zip -qr zip/senarrubia-raleway.zip font -x '*.DS_Store'
zip -qr zip/senarrubia-foto.zip foto -x '*.DS_Store'
( cd ../../originali && zip -qr - PDF Eps -x '*.DS_Store' ) > zip/senarrubia-originali-stampa.zip
zip -qr zip/senarrubia-kit-completo.zip loghi icone font -x '*.DS_Store'
echo "pacchetti: $(ls zip | wc -l | tr -d ' ') zip"
