import type { CSSProperties } from "react";
import { asset } from '../../asset';
import { Fascia } from '../../components/Fascia';
import { Logo } from '../../components/Logo';
import { Icona } from '../../components/Icona';
import { SchedaSistemazione } from '../../components/SchedaSistemazione';
import { Codice } from '../Codice';

export function Componenti() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Costruire · derivato</span>
          <h1>Componenti</h1>
          <p className="se-lead">
            I mattoni per il nuovo sito e i materiali digitali. Ognuno esiste in CSS
            (<code>components.css</code>) e in React (<code>src/components/</code>).
          </p>
        </div>

        <h2>Testata</h2>
        <div className="dx-fascia-demo">
          <header className="se-testata">
            <Logo versione="ufficiale" larghezza={130} />
            <nav><a href="#componenti">Sistemazioni</a><a href="#componenti">Servizi</a><a href="#componenti">L'oasi</a><a href="#componenti">Contatti</a></nav>
            <a className="se-bottone" href="#componenti">Prenota</a>
          </header>
        </div>
        <p className="se-small">Il logo intero, a 130 px, sta in una testata da 100 px circa. Su mobile si scende fino a 60 px, non oltre (◆ p.14).</p>

        <h2>Fascia</h2>
        <p>Sezione a tutta larghezza su sei fondi. Su minio e cotto il testo passa a bianco da solo. <code>archi</code> aggiunge gli anelli delle copertine del brandbook.</p>
        {(['sabbia', 'minio', 'cotto', 'acqua', 'cielo'] as const).map(f => (
          <div className="dx-fascia-demo" key={f}>
            <Fascia fondo={f} centrata archi={f === 'minio' || f === 'sabbia'}>
              <span className="se-etichetta">Fascia {f}</span>
              <h2>Titolo della fascia</h2>
              <p>Testo di esempio. Sui fondi pieni titoli, testo ed etichetta passano a bianco da soli; su cielo il testo resta nero.</p>
              <a className="se-bottone" href="#componenti">Scopri i servizi</a>
            </Fascia>
          </div>
        ))}
        <Codice>{`<⟦Fascia⟧ fondo="minio" centrata archi>…</Fascia>
<section class="⟦se-fascia se-fascia--minio⟧"><div class="se-fascia__inner">…</div></section>`}</Codice>

        <h2>Archi</h2>
        <p>
          ◆ p.1, 4, 10, 16, 28. Anelli bianchi spessi, tagliati dall'angolo della pagina: il segno grafico
          delle aperture del brandbook. Solo su fondi pieni (minio, sabbia), solo negli angoli, mai sopra un testo.
        </p>
        <div className="dx-archi-demo" style={{ background: 'var(--se-minio)' }}>
          <span className="se-archi se-archi--bs" aria-hidden />
          <span className="se-archi se-archi--singolo se-archi--ad" style={{ '--se-archi-d': '200px' } as CSSProperties} aria-hidden />
          <h2 style={{ color: '#fff', margin: 0, position: 'relative' }}>Camping S'Ena Arrubia</h2>
        </div>
        <Codice>{`<span class="⟦se-archi se-archi--bs⟧" aria-hidden></span>          <!-- doppio, in basso a sinistra -->
<span class="⟦se-archi se-archi--singolo se-archi--ad⟧" aria-hidden></span> <!-- singolo, in alto a destra -->`}</Codice>

        <h2>Bottone</h2>
        <div className="dx-demo dx-row">
          <a className="se-bottone" href="#componenti">Prenota ora</a>
          <a className="se-bottone se-bottone--linea" href="#componenti">Vedi le sistemazioni</a>
        </div>
        <Codice>{`<a class="⟦se-bottone⟧">Prenota ora</a>
<a class="⟦se-bottone se-bottone--linea⟧">Vedi le sistemazioni</a>`}</Codice>

        <h2>Chip</h2>
        <div className="dx-demo dx-row">
          {['4 posti letto', 'Aria condizionata', 'Veranda', 'Animali ammessi'].map(c => <span className="se-chip" key={c}>{c}</span>)}
        </div>

        <h2>Scheda sistemazione</h2>
        <div className="dx-griglia" style={{ background: 'var(--se-sabbia)', padding: 24, borderRadius: 20 }}>
          <SchedaSistemazione tipo="Casa mobile" nome="Fenicottero Plus" foto={asset('brand/foto/casetta-coppia.jpg')}
            testo="Due camere, bagno, cucina e veranda coperta, nella pineta." dati={['4 posti', 'Aria condizionata']} />
          <SchedaSistemazione tipo="Piazzola" nome="Piazzola camper" foto={asset('brand/foto/camper.jpg')}
            testo="All'ombra dei pini, con corrente e acqua." dati={['Fino a 8 m', 'Corrente 6 A']} />
          <SchedaSistemazione tipo="Tenda" nome="Tenda Oasi" foto={asset('brand/foto/tenda.jpg')}
            testo="La vacanza in tenda, già montata e arredata." dati={['2 posti']} />
        </div>
        <p className="se-small">Testi e dotazioni qui sono di esempio: quelli veri vanno presi dal cliente. Il prezzo (prop <code>prezzo</code>) si mostra solo se arriva dal motore MyGuestCare.</p>
        <Codice>{`<⟦SchedaSistemazione⟧ tipo="Casa mobile" nome="Fenicottero Plus" foto={…}
  dati={['4 posti']} href="https://booking.senarrubia.com/…" />`}</Codice>

        <h2>Icone in linea</h2>
        <div className="dx-demo dx-row">
          <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontWeight: 700 }}><Icona nome="stelle" colore="minio" larghezza={44} decorativa /> Camping village tre stelle</span>
          <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center', fontWeight: 700 }}><Icona nome="sole" colore="cielo" larghezza={28} decorativa /> Sole come elenco puntato</span>
        </div>
      </section>
    </>
  );
}
