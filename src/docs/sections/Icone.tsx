import { asset } from '../../asset';
import { palette, type NomeColore } from '../../tokens';
import { Icona } from '../../components/Icona';
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
            <a className="se-bottone" href={asset('brand/zip/senarrubia-icone.zip')} download>Scarica tutte le icone (ZIP)</a>
          </p>
        </div>
        <div className="dx-note dx-note--derivato">
          <p>
            Nessuna icona è ridisegnata. Il sole viene dai file del cliente (<code>Simbolo_Sole</code>);
            pittogramma e stelle sono ritagliati dal vettoriale del logo con <code>npm run marchio</code>
            (<code>scripts/marchio.py</code>), senza toccare i tracciati. Le versioni <em>Mono</em> sono
            in <code>currentColor</code>, per tingerle da CSS.
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
        <h2>Regole</h2>
        <div className="dx-do-dont">
          <div className="dx-do"><h4>Sì</h4><ul>
            <li>Sole per social, segnaletica, gadget, favicon, elementi decorativi (◆ p.27: tazze, tote bag, post).</li>
            <li>Un solo colore della palette per icona, scelto per contrasto col fondo.</li>
            <li>Il sole come «firma» piccola in un angolo delle foto social (◆ p.27).</li>
          </ul></div>
          <div className="dx-dont"><h4>No</h4><ul>
            <li>Riempire il sole, cambiarne il numero di raggi o lo spessore.</li>
            <li>Sole bianco su sabbia o su acqua, sole sabbia su bianco piccolo: non si vede.</li>
            <li>Mescolare queste icone con set di icone generici (Material, Font Awesome) nello stesso stile.</li>
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
        </div>
        <Codice>{`<⟦Icona⟧ nome="sole" colore="minio" larghezza={64} />
<⟦Icona⟧ nome="stelle" colore="cotto" larghezza={48} decorativa />

/* oppure solo CSS */
.marcatore { background: currentColor; color: var(--se-minio);
  mask: url(⟦brand/icone/sole-mono.svg⟧) center / contain no-repeat; }`}</Codice>
      </section>
    </>
  );
}
