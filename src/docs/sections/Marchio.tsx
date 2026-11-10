import { asset } from '../../asset';
import { componenti, dettagliLogotipo, palette, versioniLogo, type VersioneLogo } from '../../tokens';
import { Logo } from '../../components/Logo';
import { Codice } from '../Codice';
import { Tessera } from '../Tessera';

/** ◆ p.19-20 — quale versione su quale fondo. */
const COMBINAZIONI: { fondo: string; nome: string; versione: VersioneLogo; fonte: string }[] = [
  { fondo: palette.bianco, nome: 'Bianco',   versione: 'ufficiale',    fonte: '◆ p.19 · versione ufficiale' },
  { fondo: palette.sabbia, nome: 'Sabbia',   versione: 'cotto-rosso',  fonte: '◆ p.19' },
  { fondo: palette.minio,  nome: 'Minio',    versione: 'bianco',       fonte: '◆ p.19 · al tratto' },
  { fondo: palette.cotto,  nome: 'Cotto',    versione: 'bianco-rosso', fonte: '◆ p.19' },
  { fondo: palette.cielo,  nome: 'Cielo',    versione: 'bianco-rosso', fonte: '◆ p.19' },
  { fondo: palette.nero,   nome: 'Nero',     versione: 'bianco',       fonte: '◆ p.19 · al tratto' },
  { fondo: palette.sabbia, nome: 'Sabbia',   versione: 'bianco-rosso', fonte: '◆ p.2, 7' },
  { fondo: palette.bianco, nome: 'Bianco',   versione: 'nero',         fonte: '◆ p.6, 9 · positivo' },
];
const GRIGI: { fondo: string; nome: string; versione: VersioneLogo }[] = [
  { fondo: '#E6E6E6', nome: 'Nero 10%', versione: 'nero' },
  { fondo: '#BFBFBF', nome: 'Nero 25%', versione: 'bianco-rosso' },
  { fondo: '#808080', nome: 'Nero 50%', versione: 'bianco' },
  { fondo: '#404040', nome: 'Nero 75%', versione: 'bianco-rosso' },
];

export function Marchio() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Marchio · brandbook p.4–15</span>
          <h1>Il logo</h1>
          <p className="se-lead">
            Un pittogramma tondo con il sole sull'oasi e tre stelle, il nome S'ENA ARRUBIA e il payoff
            CAMPING VILLAGE. Esiste in cinque versioni: si sceglie in base al fondo, non al gusto.
          </p>
        </div>
        <div className="dx-griglia dx-griglia--2">
          <div className="dx-demo" style={{ display: 'grid', placeItems: 'center', minHeight: 300 }}>
            <Logo versione="ufficiale" larghezza={320} />
          </div>
          <div className="dx-demo dx-demo--sabbia" style={{ display: 'grid', placeItems: 'center', minHeight: 300 }}>
            <Logo versione="bianco-rosso" larghezza={320} />
          </div>
        </div>
      </section>

      <section className="dx-section">
        <h2>Le tre parti</h2>
        <p>◆ p.11. Da un punto di vista della riconoscibilità la parte A può funzionare da sola; B e C no.</p>
        <table className="dx-tabella">
          <thead><tr><th style={{ width: 40 }} /><th>Parte</th><th>Cosa è</th></tr></thead>
          <tbody>{componenti.map(([l, n, d]) => <tr key={l}><td><strong>{l}</strong></td><td><strong>{n}</strong></td><td>{d}</td></tr>)}</tbody>
        </table>
        <div className="dx-note">
          <p>
            <strong>Mai il logotipo senza pittogramma.</strong> Per questo il design system non contiene
            un file «solo scritta». Il pittogramma da solo invece c'è, in <a href="#icone">Icone</a>.
          </p>
        </div>

        <h2>Il logotipo</h2>
        <div className="dx-griglia dx-griglia--2" style={{ alignItems: 'center' }}>
          <div className="dx-demo" style={{ display: 'grid', placeItems: 'center' }}>
            <img src={asset('brand/esempi/brandbook-logotipo.png')} alt="Dettagli del logotipo, brandbook p.12" style={{ width: '100%' }} />
          </div>
          <div>
            <p>
              ◆ p.12. Le scritte sono disegnate a partire da <strong>Signika</strong>, personalizzato per il
              campeggio. Sono in curve: non si riscrivono mai con un font, nemmeno con Signika.
            </p>
            <ul>{dettagliLogotipo.map(d => <li key={d}>{d}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="dx-section">
        <h2>Le cinque versioni</h2>
        <p>Dai vettoriali consegnati dal cliente (<code>Sito/Brand/CAMPING VILLAGE/SVG</code>), ripuliti e rinominati.</p>
        <div className="dx-griglia dx-griglia--2">
          {versioniLogo.map(v => (
            <Tessera key={v.id} percorso={`brand/loghi/logo-${v.id}`} titolo={v.nome} nota={`${v.descrizione} · file cliente ${v.fileCliente}`}
              fondo={v.id === 'ufficiale' || v.id === 'nero' ? palette.bianco : v.id === 'cotto-rosso' ? palette.sabbia : v.id === 'bianco' ? palette.minio : palette.cotto}
              mono={v.id === 'nero' ? 'brand/loghi/logo-mono' : undefined} />
          ))}
        </div>
      </section>

      <section className="dx-section">
        <h2>Combinazioni consentite</h2>
        <p>◆ p.19. Ogni fondo della palette ha la sua versione. Fuori da questa tabella non si va.</p>
        <div className="dx-griglia">
          {COMBINAZIONI.map((c, i) => (
            <div className="dx-tessera" key={i}>
              <div className="dx-tessera__fondo" style={{ background: c.fondo }}><Logo versione={c.versione} larghezza={170} /></div>
              <div className="dx-tessera__meta"><span><strong>Su {c.nome.toLowerCase()}</strong> → {versioniLogo.find(v => v.id === c.versione)!.nome.toLowerCase()}<br /><span className="se-small">{c.fonte}</span></span></div>
            </div>
          ))}
        </div>

        <h2>Sul grigio</h2>
        <p>◆ p.20. Quando il fondo è grigio, la versione dipende da quanto è scuro.</p>
        <div className="dx-griglia">
          {GRIGI.map(g => (
            <div className="dx-tessera" key={g.nome}>
              <div className="dx-tessera__fondo" style={{ background: g.fondo }}><Logo versione={g.versione} larghezza={170} /></div>
              <div className="dx-tessera__meta"><span><strong>{g.nome}</strong> → {versioniLogo.find(v => v.id === g.versione)!.nome.toLowerCase()}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="dx-section">
        <h2>Area di rispetto</h2>
        <div className="dx-griglia dx-griglia--2" style={{ alignItems: 'center' }}>
          <div className="dx-demo" style={{ display: 'grid', placeItems: 'center' }}>
            <div style={{ outline: `1px dashed ${palette.minio}`, lineHeight: 0 }}><Logo versione="ufficiale" larghezza={260} rispetto /></div>
          </div>
          <div>
            <p>
              ◆ p.13 «Utilizzare il claim CAMPING nel suo lato più corto per creare lo spazio necessario.
              Non avvicinare loghi o altri elementi grafici all'interno di questi margini.»
            </p>
            <p>
              Il margine su ogni lato è <strong>l'altezza della parola CAMPING</strong>: circa il 5,6% della
              larghezza del logo. Un logo largo 10 cm vuole 5,6 mm liberi intorno.
              Nel codice: <code>{'<Logo rispetto />'}</code>.
            </p>
          </div>
        </div>

        <h2>Dimensioni minime</h2>
        <div className="dx-griglia dx-griglia--2" style={{ alignItems: 'center' }}>
          <div className="dx-demo" style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', gap: 48 }}>
            <div style={{ textAlign: 'center' }}><Logo versione="ufficiale" larghezza={60} /><div className="se-small" style={{ marginTop: 8 }}>60 px</div></div>
            <div style={{ textAlign: 'center' }}><Logo versione="ufficiale" larghezza={76} /><div className="se-small" style={{ marginTop: 8 }}>2 cm</div></div>
          </div>
          <p>
            ◆ p.14. Larghezza minima del logo intero: <strong>2 cm in stampa, 60 px a schermo</strong>,
            per tenere leggibile CAMPING VILLAGE. Il componente non scende sotto i 60 px. Dove serve un
            segno più piccolo (favicon, avatar, segnaletica) si usa il pittogramma o il sole.
          </p>
        </div>
      </section>

      <section className="dx-section">
        <h2>Usi non corretti</h2>
        <p>◆ p.15 e p.21.</p>
        <div className="dx-griglia dx-griglia--2">
          <figure className="dx-gal" style={{ margin: 0 }}><img src={asset('brand/esempi/brandbook-usi-non-corretti.png')} alt="Usi non corretti, brandbook p.15" style={{ width: '100%', borderRadius: 12, border: '1px solid var(--se-border-soft)' }} /><figcaption>◆ p.15 Usi non corretti</figcaption></figure>
          <figure className="dx-gal" style={{ margin: 0 }}><img src={asset('brand/esempi/brandbook-combinazioni-da-evitare.png')} alt="Combinazioni da evitare, brandbook p.21" style={{ width: '100%', borderRadius: 12, border: '1px solid var(--se-border-soft)' }} /><figcaption>◆ p.21 Combinazioni da evitare</figcaption></figure>
        </div>
        <div className="dx-do-dont">
          <div className="dx-do">
            <h4>Sì</h4>
            <ul>
              <li>Solo i file di questa libreria (dai vettoriali del cliente).</li>
              <li>La versione indicata per quel fondo, dalla tabella delle combinazioni.</li>
              <li>Sulle foto: zona calma, versione bianca o bianco + rosso, area di rispetto libera.</li>
              <li>Pittogramma sopra, scritta sotto, sempre centrati.</li>
            </ul>
          </div>
          <div className="dx-dont">
            <h4>No</h4>
            <ul>
              <li>Schiacciare, allungare, ruotare o inclinare il logo.</li>
              <li>Spostare il pittogramma o il payoff (sopra, di lato, staccati).</li>
              <li>Riscrivere S'ENA ARRUBIA con un font, o togliere CAMPING VILLAGE.</li>
              <li>Cambiare i colori: ARRUBIA nelle versioni a colori è sempre rosso.</li>
              <li>Fondi fuori palette (fucsia, verde, giallo, grigio scuro con logo a colori).</li>
              <li>Ombre, contorni, sfumature, trasparenze.</li>
            </ul>
          </div>
        </div>

        <h2>Uso nel codice</h2>
        <Codice>{`<⟦Logo⟧ versione="ufficiale" larghezza={240} />
<⟦Logo⟧ versione="bianco-rosso" larghezza={180} rispetto />
<⟦Pittogramma⟧ versione="ufficiale" diametro={96} />`}</Codice>
      </section>
    </>
  );
}
