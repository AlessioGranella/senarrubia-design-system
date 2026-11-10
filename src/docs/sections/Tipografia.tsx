import type { CSSProperties } from 'react';
import { asset } from '../../asset';
import { Codice } from '../Codice';

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789 àèéìòù €';
const PESI: [number, string][] = [[300, 'Light'], [400, 'Regular'], [500, 'Medium'], [600, 'SemiBold'], [700, 'Bold'], [800, 'ExtraBold']];

const SCALA: [string, string, string, CSSProperties, string][] = [
  ['Display', 'ExtraBold 800 · minio', '--se-fs-display', { fontWeight: 800, fontSize: 'var(--se-fs-display)', color: 'var(--se-minio)', lineHeight: 1.04, letterSpacing: '-.015em' }, 'Benvenuti a S\'Ena Arrubia'],
  ['Titolo H1', 'ExtraBold 800 · minio', '--se-fs-h1', { fontWeight: 800, fontSize: 'var(--se-fs-h1)', color: 'var(--se-minio)', lineHeight: 1.08 }, 'Il campeggio nella pineta'],
  ['Titolo H2', 'Bold 700 · cotto', '--se-fs-h2', { fontWeight: 700, fontSize: 'var(--se-fs-h2)', color: 'var(--se-cotto)' }, 'Case mobili e piazzole'],
  ['Titolo H3', 'Bold 700 · cotto', '--se-fs-h3', { fontWeight: 700, fontSize: 'var(--se-fs-h3)', color: 'var(--se-cotto)' }, 'Fenicottero Plus'],
  ['Etichetta', 'Bold 700 · maiuscolo spaziato · minio', '--se-fs-label', { fontWeight: 700, fontSize: 'var(--se-fs-label)', textTransform: 'uppercase', letterSpacing: '.16em', color: 'var(--se-minio)' }, 'Casa mobile · 4 posti'],
  ['Lead', 'Medium 500', '--se-fs-lead', { fontWeight: 500, fontSize: 'var(--se-fs-lead)', lineHeight: 1.5 }, 'Tra la pineta e il mare di Arborea, a due passi dall\'oasi.'],
  ['Corpo', 'Regular 400 · nero', '--se-fs-body', { fontSize: 'var(--se-fs-body)' }, 'Piazzole ombreggiate, piscina, ristorante e spiaggia a pochi passi.'],
  ['Nota', 'Regular 400', '--se-fs-small', { fontSize: 'var(--se-fs-small)', color: 'var(--se-fg-muted)' }, 'Check-in dalle 15:00, check-out entro le 10:00.'],
];

export function Tipografia() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Marchio · brandbook p.12, 22–23 · ★ DROP</span>
          <h1>Tipografia</h1>
          <p className="se-lead">
            Un carattere solo: <strong>Raleway</strong>, per titoli, testi, etichette, sito e stampati.
            Elegante nei pesi leggeri, solido nei bold, con tutte le lettere accentate.
          </p>
        </div>

        <div className="dx-demo">
          <span className="se-etichetta">Carattere della comunicazione ★</span>
          <div style={{ fontSize: 72, fontWeight: 800, color: 'var(--se-minio)', lineHeight: 1 }}>Raleway</div>
          <div className="dx-griglia" style={{ marginTop: 24, marginBottom: 0 }}>
            {PESI.map(([w, n]) => (
              <p key={w} style={{ fontWeight: w, whiteSpace: 'pre-line', margin: 0, fontSize: 15 }}>
                <span className="se-small" style={{ display: 'block', fontWeight: 400 }}>{n} {w}</span>{ALFABETO}
              </p>
            ))}
          </div>
          <p className="se-small" style={{ marginTop: 24 }}>
            Gratuito, licenza OFL, variabile 100–900 + corsivo.{' '}
            <a href={asset('brand/zip/senarrubia-raleway.zip')} download>Scarica il pacchetto</a> ·{' '}
            <a href="https://fonts.google.com/specimen/Raleway" target="_blank" rel="noreferrer">Google Fonts</a>
          </p>
        </div>

        <div className="dx-note">
          <p>
            <strong>Raleway e Signika.</strong> Il brandbook (◆ p.23) indica <strong>Signika</strong>: è il
            carattere da cui sono disegnate le scritte del logo (◆ p.12). DROP ha scelto <strong>Raleway</strong> come
            carattere della comunicazione (★). Signika resta dentro il logo, già in curve, e non si usa altrove.
          </p>
        </div>
      </section>

      <section className="dx-section">
        <h2>Gerarchia</h2>
        <p>Derivata. Titoli bold in frase, come le aperture del brandbook («Il logo e declinazioni»).</p>
        {SCALA.map(([nome, desc, token, st, testo]) => (
          <div className="dx-campione" key={nome}>
            <small>{nome}<br />{desc}<br />{token}</small>
            <div style={st}>{testo}</div>
          </div>
        ))}
      </section>

      <section className="dx-section">
        <h2>Regole</h2>
        <div className="dx-do-dont">
          <div className="dx-do"><h4>Sì</h4><ul>
            <li>Titoli in frase, bold o extrabold. Maiuscolo solo per etichette brevi, spaziato.</li>
            <li>Testo corrente Regular nero, interlinea 1,6, righe sotto i 70 caratteri.</li>
            <li>Il maiuscolo spaziato richiama CAMPING VILLAGE del logo: usarlo per categorie e sopratitoli.</li>
            <li>Numeri (prezzi, date, posti letto) in SemiBold o Bold.</li>
          </ul></div>
          <div className="dx-dont"><h4>No</h4><ul>
            <li>Altri caratteri. Il brandbook è impaginato in Inter: è il carattere del documento, non del brand.</li>
            <li>Raleway Thin ed ExtraLight per testi sotto i 24 px: troppo sottili.</li>
            <li>Paragrafi in maiuscolo o in minio.</li>
            <li>Scrivere «S'Ena Arrubia» in Raleway al posto del logo.</li>
          </ul></div>
        </div>
        <Codice>{`h1 { font-family: ⟦var(--se-font)⟧; font-weight: 800; color: var(--se-fg-accent); }
p  { font-family: ⟦var(--se-font)⟧; color: var(--se-fg); }
.sopratitolo { text-transform: uppercase; letter-spacing: ⟦var(--se-ls-label)⟧; font-weight: 700; }`}</Codice>
      </section>
    </>
  );
}
