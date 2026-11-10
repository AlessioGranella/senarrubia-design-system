import { asset } from '../../asset';
import { palette, type NomeColore } from '../../tokens';
import { Icona } from '../../components/Icona';
import { IconaServizio, SERVIZI, RIFIUTI } from '../../components/IconaServizio';
import { IconaDotazione, DOTAZIONI, INTERFACCIA } from '../../components/IconaDotazione';
import { Codice } from '../Codice';
import { Tessera } from '../Tessera';

const COLORI_SOLE: NomeColore[] = ['minio', 'cotto', 'sabbia', 'acqua', 'cielo', 'nero', 'bianco'];
const COLORI_STELLE: NomeColore[] = ['minio', 'cotto', 'sabbia', 'acqua', 'cielo', 'nero', 'bianco'];
const LINEA: NomeColore[] = ['nero', 'bianco', 'cotto', 'minio'];

/** Fondo d'anteprima: le icone chiare (bianco, acqua, sabbia) si vedono su cotto. */
const fondoPer = (c: NomeColore) => (c === 'bianco' || c === 'acqua' ? palette.cotto : c === 'sabbia' ? palette.bianco : palette.bianco);

export function Icone() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Marchio · brandbook p.11, 14, 24–25</span>
          <h1>Icone</h1>
          <p className="se-lead">
            Le icone del brand, estratte dai vettoriali del logo: il sole, il pittogramma, le tre stelle,
            le immagini profilo. Ogni file si scarica in SVG vettoriale e in PNG trasparente.
          </p>
          <p>
            <a className="se-btn se-btn--scuro" href={asset('brand/zip/senarrubia-icone.zip')} download>Scarica tutte le icone (ZIP)</a>
          </p>
        </div>
        <div className="dx-note dx-note--derivato">
          <p>
            Nessuna icona è ridisegnata. Il sole viene dai file del cliente (<code>Simbolo_Sole</code>);
            pittogramma e stelle sono ritagliati dal vettoriale del logo con <code>npm run marchio</code>
            (<code>scripts/marchio.py</code>), senza toccare i tracciati. Le versioni <em>Mono</em> sono
            in <code>currentColor</code>, per tingerle da CSS. Le icone dei servizi sono lette
            tracciato per tracciato dagli esecutivi di stampa con <code>scripts/icone_mappa.py</code>.
          </p>
        </div>
      </section>

      <section className="dx-section">
        <h2>Il sole</h2>
        <p>
          ◆ p.25 «Il logo si presta ad una semplificazione utile per la comunicazione sui social network e
          per esigenze di identificazione rapida in loco. Tale semplificazione è rappresentata dall'icona
          del sole, elemento centrale del pittogramma.» Sei colori nel brandbook, più il bianco dei file.
        </p>
        <div className="dx-griglia dx-griglia--icone">
          {COLORI_SOLE.map(c => (
            <Tessera key={c} percorso={`brand/icone/sole-${c}`} titolo={`Sole ${c}`} fondo={fondoPer(c)}
              mono={c === 'nero' ? 'brand/icone/sole-mono' : undefined} />
          ))}
        </div>
      </section>

      <section className="dx-section">
        <h2>Il pittogramma</h2>
        <p>
          ◆ p.11 La parte A del logo, l'unica che «può funzionare bene da sola». A colori, con il sole
          sabbia (versione ufficiale) o bianco; al tratto, in un colore solo.
        </p>
        <div className="dx-griglia dx-griglia--icone">
          <Tessera percorso="brand/icone/pittogramma-ufficiale" titolo="A colori · sole sabbia" fondo={palette.bianco} />
          <Tessera percorso="brand/icone/pittogramma-bianco-rosso" titolo="A colori · sole bianco" fondo={palette.sabbia} />
          {LINEA.map(c => (
            <Tessera key={c} percorso={`brand/icone/pittogramma-linea-${c}`} titolo={`Al tratto · ${c}`}
              fondo={c === 'bianco' ? palette.minio : c === 'nero' ? palette.bianco : palette.sabbia}
              mono={c === 'nero' ? 'brand/icone/pittogramma-linea-mono' : undefined} />
          ))}
        </div>
      </section>

      <section className="dx-section">
        <h2>Le tre stelle</h2>
        <p>
          La classificazione del campeggio, presa dal fondo del pittogramma. Il brandbook la usa da sola
          nell'insegna di benvenuto (◆ p.27). Si usa come segno di qualità vicino al nome, mai al posto del logo.
        </p>
        <div className="dx-griglia dx-griglia--icone">
          {COLORI_STELLE.map(c => (
            <Tessera key={c} percorso={`brand/icone/stelle-${c}`} titolo={`Stelle ${c}`} fondo={fondoPer(c)}
              mono={c === 'nero' ? 'brand/icone/stelle-mono' : undefined} />
          ))}
        </div>
      </section>


      <section className="dx-section">
        <h2>Servizi del campeggio</h2>
        <p>
          ◇ Dalla legenda della mappa (A3 e 100×70, 2025). Illustrazioni al tratto cotto con campiture
          tenui: si usano nei loro colori, senza ritingerle, su fondo bianco, sabbia o acqua.
          SVG vettoriale + PNG 512 px.
        </p>
        <div className="dx-griglia dx-griglia--icone">
          {Object.entries(SERVIZI).map(([id, nome]) => (
            <Tessera key={id} percorso={`brand/icone/servizi/${id}`} titolo={nome} fondo={palette.bianco} />
          ))}
        </div>
      </section>

      <section className="dx-section">
        <h2>Raccolta differenziata</h2>
        <p>◇ Dal flyer 2025 (retro, colonna «Raccolta differenziata»).</p>
        <div className="dx-griglia dx-griglia--icone">
          {Object.entries(RIFIUTI).map(([id, nome]) => (
            <Tessera key={id} percorso={`brand/icone/servizi/${id}`} titolo={nome} fondo={palette.bianco} />
          ))}
        </div>
      </section>

      <section className="dx-section">
        <h2>Immagini profilo</h2>
        <p>◆ p.14. Quadrate 1080 × 1080, pronte per Instagram, Facebook, Google Business, WhatsApp.</p>
        <div className="dx-griglia dx-griglia--icone">
          <Tessera percorso="brand/icone/profilo-pittogramma" titolo="Pittogramma" fondo={palette.bianco} />
          <Tessera percorso="brand/icone/profilo-linea-nero" titolo="Al tratto" fondo={palette.bianco} />
          <Tessera percorso="brand/icone/profilo-logo-sabbia" titolo="Logo su sabbia" fondo={palette.bianco} />
          <Tessera percorso="brand/icone/profilo-logo-bianco" titolo="Logo su bianco" fondo="#EEE" />
          <Tessera percorso="brand/icone/profilo-logo-cotto" titolo="Logo su cotto" fondo={palette.bianco} />
        </div>
      </section>

      <section className="dx-section">
        <h2>Dotazioni degli alloggi</h2>
        <p>
          ★ Icone al tratto per le caratteristiche delle sistemazioni (persone, m², letti, aria condizionata, bagno…)
          e per l'interfaccia del sito. Il brandbook non le ha: sono state disegnate per il sito nel novembre 2026, su
          griglia 24, tratto 1,6, angoli arrotondati. Il colore arriva da <code>currentColor</code>: minio sulle schede,
          cotto nei quadrati acqua. Si usano solo per le dotazioni; per i servizi del campeggio restano le icone multi-tono.
        </p>
        <div className="dx-griglia" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
          {DOTAZIONI.map(n => (
            <div key={n} className="dx-tessera">
              <div className="dx-tessera__fondo" style={{ background: '#fff', color: 'var(--se-cotto)', aspectRatio: '1', display: 'grid', placeItems: 'center' }}><IconaDotazione nome={n} dimensione={40} /></div>
              <div className="dx-tessera__meta"><span style={{ fontSize: 12 }}>{n}</span>
                <span className="dx-scarica"><a href={asset(`brand/icone/dotazioni/${n}.svg`)} download>SVG</a><a href={asset(`brand/icone/dotazioni/${n}.png`)} download>PNG</a></span></div>
            </div>
          ))}
        </div>
        <h3>Interfaccia</h3>
        <div className="dx-demo dx-row" style={{ color: 'var(--se-cotto)' }}>
          {INTERFACCIA.map(n => <span key={n} style={{ display: 'grid', justifyItems: 'center', gap: 6, fontSize: 12 }}><IconaDotazione nome={n} dimensione={28} />{n}</span>)}
        </div>
        <Codice>{`<⟦IconaDotazione⟧ nome="clima" />                 {/* 24 px, colore da color: */}
<svg class="⟦se-ic⟧"><use href="brand/icone/⟦dotazioni.svg#clima⟧"/></svg>`}</Codice>
      </section>

      <section className="dx-section">
        <h2>Regole</h2>
        <div className="dx-do-dont">
          <div className="dx-do"><h4>Sì</h4><ul>
            <li>Sole per social, segnaletica, gadget, favicon, elementi decorativi (◆ p.27: tazze, tote bag, post).</li>
            <li>Un solo colore della palette per icona, scelto per contrasto col fondo.</li>
            <li>Il sole come «firma» piccola in un angolo delle foto social (◆ p.27).</li>
            <li>Icone dei servizi per mappe, segnaletica, schede sistemazione, pagine servizi del sito.</li>
            <li>Icone delle dotazioni, al tratto, per le caratteristiche degli alloggi e per l'interfaccia.</li>
          </ul></div>
          <div className="dx-dont"><h4>No</h4><ul>
            <li>Riempire il sole, cambiarne il numero di raggi o lo spessore.</li>
            <li>Sole bianco su sabbia o su acqua, sole sabbia su bianco piccolo: non si vede.</li>
            <li>Mescolare queste icone con set generici (Material, Font Awesome). Se manca un servizio o una dotazione, si disegna nello stesso stile, non si prende altrove.</li>
            <li>Ritingere le icone dei servizi in un colore solo: perdono le campiture.</li>
          </ul></div>
        </div>
      </section>

      <section className="dx-section">
        <h2>Uso nel codice</h2>
        <div className="dx-demo dx-row">
          <Icona nome="sole" colore="minio" larghezza={64} />
          <Icona nome="sole" colore="cielo" larghezza={64} />
          <Icona nome="pittogramma" colore="cotto" larghezza={64} />
          <Icona nome="stelle" colore="minio" larghezza={64} />
          <IconaServizio nome="piscina" dimensione={56} />
          <IconaServizio nome="ristorante" dimensione={56} />
        </div>
        <ul className="se-servizi" style={{ marginBottom: 32 }}>
          {(['casa-mobile', 'piscina', 'ristorante', 'spiaggia-cani'] as const).map(n => (
            <li key={n}><IconaServizio nome={n} dimensione={36} decorativa />{SERVIZI[n]}</li>
          ))}
        </ul>
        <Codice>{`<⟦Icona⟧ nome="sole" colore="minio" larghezza={64} />
<⟦Icona⟧ nome="stelle" colore="cotto" larghezza={48} decorativa />
<⟦IconaServizio⟧ nome="piscina" dimensione={48} />   {/* 24 servizi + 6 rifiuti */}

/* oppure solo CSS */
.marcatore { background: currentColor; color: var(--se-minio);
  mask: url(⟦brand/icone/sole-mono.svg⟧) center / contain no-repeat; }`}</Codice>
      </section>
    </>
  );
}
