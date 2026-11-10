import { palette, schede, contrasti } from '../../tokens';
import { Codice } from '../Codice';
import { useCopia } from '../Copiabile';

const SEMANTICI: [string, string][] = [
  ['--se-bg', 'Fondo di pagina: bianco.'],
  ['--se-bg-soft', 'Sabbia: aperture, fasce calde.'],
  ['--se-bg-sky', 'Acqua: fasce leggere, mare, oasi, info pratiche.'],
  ['--se-bg-brand / -dark', 'Fasce piene: minio e cotto. Il testo sopra è bianco.'],
  ['--se-bg-accent', 'Cielo: fasce estive. Testo nero, mai bianco.'],
  ['--se-fg', 'Testo corrente, nero.'],
  ['--se-fg-title', 'Titoli, in cotto.'],
  ['--se-fg-accent', 'Titoli grandi ed etichette in minio: solo ≥ 24 px o maiuscolo bold.'],
  ['--se-on-brand', 'Testo su minio e cotto: bianco.'],
];

export function Colore() {
  const [copiato, copia] = useCopia();
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Marchio · brandbook p.16–21</span>
          <h1>Palette colori</h1>
          <p className="se-lead">
            Due primari, rosso minio e sabbia: il sole e la spiaggia. Due secondari, rosso cotto e bianco.
            Due terziari, acqua e cielo: lo stagno e il mare. Valori di stampa e digitali dal brandbook.
          </p>
        </div>
        <p className="dx-suggerimento">Clic su un colore o su un valore per copiarlo.</p>
        <div className="dx-griglia">
          {schede.map(s => {
            const hex = palette[s.nome];
            const rgb = `rgb(${s.rgb.join(', ')})`;
            const cmyk = s.cmyk.join(' · ');
            return (
              <div className="dx-swatch" key={s.nome}>
                <button type="button" className="dx-swatch__chip" aria-label={`Copia ${hex}`}
                        style={{ background: hex, borderBottom: '1px solid var(--se-border-soft)' }} onClick={() => copia(hex)} />
                <div className="dx-swatch__meta">
                  <span className="se-small">{s.livello}</span>
                  <strong>{s.etichetta}</strong>
                  <dl>
                    <dt>HEX</dt><dd><button type="button" onClick={() => copia(hex)}>{hex}</button></dd>
                    <dt>RGB</dt><dd><button type="button" onClick={() => copia(rgb)}>{s.rgb.join(' · ')}</button></dd>
                    <dt>CMYK</dt><dd><button type="button" onClick={() => copia(cmyk)}>{cmyk}</button></dd>
                    <dt>Pantone</dt><dd>{s.pantone ? <button type="button" onClick={() => copia(s.pantone!)}>{s.pantone}</button> : '—'}</dd>
                    <dt>Token</dt><dd>--se-{s.nome}</dd>
                  </dl>
                  <p>{s.ruolo}</p>
                </div>
                {(copiato === hex || copiato === rgb || copiato === cmyk || copiato === s.pantone) && <span className="dx-copiato">copiato</span>}
              </div>
            );
          })}
        </div>
        <div className="dx-note dx-note--derivato">
          <p>
            HEX, RGB, CMYK e Pantone sono quelli del brandbook (◆). Il nero non è nella palette del
            brandbook: compare solo nel logo monocromatico. Il design system lo usa anche per il testo
            corrente, perché nessun colore della palette regge un paragrafo lungo meglio del nero.
          </p>
        </div>
      </section>

      <section className="dx-section">
        <h2>Proporzioni</h2>
        <p>
          Indicative, dai materiali del brandbook: molto bianco e sabbia, il minio come colore che si
          riconosce, il cotto per i dettagli, acqua e cielo come respiro.
        </p>
        <div style={{ display: 'flex', height: 64, borderRadius: 12, overflow: 'hidden', marginBottom: 8, border: '1px solid var(--se-border-soft)' }}>
          {([['bianco', 34], ['sabbia', 24], ['minio', 20], ['cotto', 10], ['acqua', 7], ['cielo', 5]] as const).map(([c, w]) => (
            <div key={c} style={{ flex: w, background: palette[c] }} title={`${c} ${w}%`} />
          ))}
        </div>
        <p className="se-small">Bianco 34 · sabbia 24 · minio 20 · cotto 10 · acqua 7 · cielo 5. Derivato.</p>
      </section>

      <section className="dx-section">
        <h2>Contrasto</h2>
        <p>
          Il testo piccolo vuole almeno 4,5:1. Il <strong>minio regge solo testo grande</strong> (3,9:1 su
          bianco). Su <strong>cielo e sabbia mai testo bianco</strong>: il brandbook ci mette il logo bianco,
          ma un logo non è un paragrafo.
        </p>
        <div className="dx-scroll">
          <table className="dx-tabella">
            <thead><tr><th>Esempio</th><th>Testo su fondo</th><th>Rapporto</th><th>Uso</th></tr></thead>
            <tbody>
              {contrasti.map(c => (
                <tr key={c.testo + c.fondo}>
                  <td><span style={{ background: palette[c.fondo], color: palette[c.testo], padding: '4px 10px', borderRadius: 6,
                    border: '1px solid var(--se-border-soft)', fontWeight: 700 }}>S'Ena Arrubia</span></td>
                  <td>{c.testo} su {c.fondo}</td>
                  <td>{c.rapporto.toLocaleString('it-IT')}:1</td>
                  <td>{c.rapporto >= 4.5 ? 'Ogni testo' : c.rapporto >= 3 ? 'Solo testo grande (≥ 24 px) o bold maiuscolo' : 'Mai per testo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dx-section">
        <h2>Token semantici</h2>
        <p>I componenti usano solo questi. Per cambiare il tono di un contesto si rimappano, non si scrivono colori in chiaro.</p>
        <table className="dx-tabella">
          <thead><tr><th style={{ width: '38%' }}>Token</th><th>A cosa serve</th></tr></thead>
          <tbody>{SEMANTICI.map(([t, d]) => <tr key={t}><td><code>{t}</code></td><td>{d}</td></tr>)}</tbody>
        </table>
        <Codice>{`.box-orari {
  background: ⟦var(--se-bg-sky)⟧;
  color: ⟦var(--se-fg)⟧;
}
.box-orari h3 { color: ⟦var(--se-fg-title)⟧; }`}</Codice>
      </section>
    </>
  );
}
