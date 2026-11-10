import { useState, type CSSProperties } from 'react';
import { asset } from '../../asset';
import { Fascia } from '../../components/Fascia';
import { Etichetta } from '../../components/Etichetta';
import { Bottone, LinkFreccia } from '../../components/Bottone';
import { IconaDotazione } from '../../components/IconaDotazione';
import { Contatore, Segmento, Chip } from '../../components/Controlli';
import { Prenota } from '../../components/Prenota';
import { SchedaSistemazione, CardFoto, type DatiSistemazione } from '../../components/SchedaSistemazione';
import { InBreve, Ambiente, GrigliaIcone, Sapere, Orari } from '../../components/Dettaglio';
import { Testata, Pannello } from '../../components/Sezioni';
import { Codice } from '../Codice';

const foto = (n: string) => asset(`brand/esempi/sito/${n}.jpg`);
const servizio = (n: string) => asset(`brand/icone/servizi/${n}.svg`);
const VOCI: [string, string][] = [['Sistemazioni', '#componenti'], ['Natura', '#componenti'], ['Pet', '#componenti'], ['Servizi', '#componenti'], ['Offerte', '#componenti'], ['Dove siamo', '#componenti']];

/* Dati veri, dal sito attuale (novembre 2026). */
const ALLOGGI: (DatiSistemazione & { clima: boolean; wc: boolean; veranda: boolean })[] = [
  { nome: 'Casa mobile Mirto', tipo: 'casa', foto: foto('mirto-esterno'), foto2: foto('mirto-soggiorno'), frase: 'Soggiorno con divano letto, due camere e WC in un ambiente separato dal bagno.',
    persone: 5, mq: 26, camere: 2, href: '#componenti', clima: true, wc: true, veranda: false },
  { nome: 'Casa mobile Fenicottero Plus', tipo: 'casa', foto: foto('fenicottero-plus'), foto2: foto('fenicottero-plus-interno'), frase: 'La più grande: zona giorno di 17,5 m², tre camere e bagno diviso in due ambienti.',
    persone: 6, mq: 36.4, camere: 3, href: '#componenti', clima: true, wc: true, veranda: true },
  { nome: 'Tenda Lodge Oasi', tipo: 'tenda', foto: foto('tenda-oasi'), foto2: foto('tenda-oasi-interno'), frase: 'L’atmosfera del campeggio, chiusa a chiave, con ombrellone, tavolo e sedie fuori.',
    persone: 5, mq: 27, camere: 2, href: '#componenti', clima: false, wc: false, veranda: false },
];

function DemoFiltro() {
  const [tipo, setTipo] = useState<'tutte' | 'casa' | 'tenda'>('tutte');
  const [ospiti, setOspiti] = useState(2);
  const [serve, setServe] = useState<Set<string>>(new Set());
  const cambia = (k: string) => setServe(s => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const lista = ALLOGGI.filter(a => (tipo === 'tutte' || a.tipo === tipo) && a.persone >= ospiti
    && (!serve.has('clima') || a.clima) && (!serve.has('wc') || a.wc) && (!serve.has('veranda') || a.veranda));
  return (
    <>
      <div className="dx-demo" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <Segmento etichetta="Tipologia" valore={tipo} onChange={setTipo} opzioni={[
          { id: 'tutte', label: 'Tutte' }, { id: 'casa', label: 'Case mobili', icona: 'casa-mobile' }, { id: 'tenda', label: 'Tende lodge', icona: 'tenda' }]} />
        <div style={{ border: '1.5px solid var(--se-border-soft)', borderRadius: 999, padding: '6px 8px 6px 16px' }}>
          <Contatore nome="Siamo in" valore={ospiti} min={1} max={6} onChange={setOspiti} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexBasis: '100%' }}>
          <Chip icona="clima" attivo={serve.has('clima')} onClick={() => cambia('clima')}>Aria condizionata</Chip>
          <Chip icona="separato" attivo={serve.has('wc')} onClick={() => cambia('wc')}>WC separato</Chip>
          <Chip icona="veranda" attivo={serve.has('veranda')} onClick={() => cambia('veranda')}>Veranda coperta</Chip>
        </div>
      </div>
      <p style={{ fontWeight: 800, color: 'var(--se-fg-title)' }}><span style={{ color: 'var(--se-minio)' }}>{lista.length}</span> su {ALLOGGI.length}</p>
      <div className="dx-griglia dx-griglia--2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))' }}>
        {lista.map(a => <SchedaSistemazione key={a.nome} s={{ ...a, tratti: [
          ...(a.clima ? [{ icona: 'clima' as const, testo: 'Aria condizionata', cercato: serve.has('clima') }] : []),
          ...(a.wc ? [{ icona: 'separato' as const, testo: 'WC separato', cercato: serve.has('wc') }] : []),
          a.veranda ? { icona: 'veranda' as const, testo: 'Veranda coperta', cercato: serve.has('veranda') } : { icona: 'tavolo' as const, testo: a.tipo === 'tenda' ? 'Spazio esterno' : 'Veranda in parte coperta' },
        ] }} />)}
      </div>
    </>
  );
}

export function Componenti() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Costruire · dal sito, novembre 2026</span>
          <h1>Componenti</h1>
          <p className="se-lead">
            I mattoni del nuovo sito, presi così come sono dalla bozza (<code>Sito/sito-bozza</code>). Ognuno esiste in
            CSS (<code>components.css</code>, prefisso <code>se-</code>) e, dove serve, in React (<code>src/components/</code>).
          </p>
        </div>
        <div className="dx-note dx-note--derivato">
          <p>Il brandbook non ha UI: tutto qui è derivato, sempre con i colori e il Raleway del brand. I componenti non
            decidono il proprio margine esterno, lo decide la pagina. Le icone al tratto sono quelle delle dotazioni
            (vedi <a href="#icone">Icone</a>); le icone multi-tono sono quelle dei servizi del campeggio.</p>
        </div>

        {/* -------------------------------------------------- BASE */}
        <h2>Pretitolo e titoli</h2>
        <p>Il pretitolo è preceduto dal sole del logo, tinto con il colore del testo. Il titolo è nero pesante e stretto; la seconda parte va in corsivo leggero minio.</p>
        <div className="dx-demo">
          <Etichetta>Dove dormire</Etichetta>
          <h2 className="se-titolo-xl">Case mobili e tende,<br /><em>all'ombra dei pini</em></h2>
          <p className="se-lead" style={{ margin: 0 }}>Cinque case mobili e due tende lodge, tutte nella pineta e a pochi passi dal mare.</p>
        </div>
        <div className="dx-demo" style={{ background: 'var(--se-cotto)' }}>
          <p className="se-etichetta" style={{ color: 'var(--se-bianco)' }}>Pet friendly</p>
          <h2 className="se-titolo-l" style={{ color: 'var(--se-bianco)', margin: 0 }}>In vacanza con il tuo <em style={{ color: 'var(--se-sabbia)' }}>quattro zampe</em></h2>
        </div>
        <Codice>{`<p class="⟦se-etichetta⟧">Dove dormire</p>          <!-- --nuda: senza sole -->
<h2 class="⟦se-titolo-xl⟧">Case mobili e tende,<br><em>all'ombra dei pini</em></h2>
<⟦Etichetta⟧>Dove dormire</Etichetta>`}</Codice>

        <h2>Bottoni e link</h2>
        <p><strong>Pieno</strong> (minio) solo per l'azione principale, prenotare. <strong>Scuro</strong> per le altre azioni, <strong>linea</strong> per quelle secondarie. <strong>Bianco</strong> sui fondi pieni, <strong>vetro</strong> sopra le foto. In hover la freccia scivola a destra.</p>
        <div className="dx-demo dx-row">
          <Bottone variante="pieno">Verifica disponibilità</Bottone>
          <Bottone variante="scuro" freccia>Tutti i servizi</Bottone>
          <Bottone variante="linea">Seguici su Instagram</Bottone>
          <LinkFreccia href="#componenti">Confrontale tutte</LinkFreccia>
        </div>
        <div className="dx-demo dx-row" style={{ background: `linear-gradient(rgba(40,14,10,.35), rgba(40,14,10,.35)), url(${foto('spiaggia-drone')}) center / cover` }}>
          <Bottone variante="bianco" freccia>Usa il filtro</Bottone>
          <Bottone variante="vetro" freccia>Scopri la natura</Bottone>
        </div>
        <Codice>{`<a class="⟦se-btn se-btn--pieno⟧">Verifica disponibilità</a>
<a class="⟦se-btn se-btn--scuro⟧">Tutti i servizi <svg class="se-ic"><use href="…/dotazioni.svg#freccia"/></svg></a>
<⟦Bottone⟧ variante="vetro" freccia>Scopri la natura</Bottone>
<⟦LinkFreccia⟧ href="…">Confrontale tutte</LinkFreccia>`}</Codice>

        {/* -------------------------------------------------- TESTATA */}
        <h2>Testata</h2>
        <p>Fissa in alto, alta 88 px, logo a 112 px. Sopra la foto della hero è trasparente con il logo bianco; dopo il 60% dello schermo diventa bianca con il logo a colori. Scorrendo verso il basso si nasconde, verso l'alto torna.</p>
        <div className="dx-fascia-demo" style={{ background: `url(${foto('spiaggia-drone')}) center / cover` }}>
          <Testata voci={VOCI} trasparente statica attiva="Sistemazioni" />
          <div style={{ height: 60 }} />
        </div>
        <div className="dx-fascia-demo"><Testata voci={VOCI} statica attiva="Sistemazioni" /></div>
        <Codice>{`<header class="⟦se-testata se-testata--trasparente⟧">…</header>   <!-- + se-testata--nascosta scorrendo giù -->
<⟦Testata⟧ voci={[['Sistemazioni', '/sistemazioni']]} trasparente />`}</Codice>

        {/* -------------------------------------------------- PRENOTA */}
        <h2>Prenotazione</h2>
        <p>Collegata al motore MyGuestCare, che non si cambia: al clic si apre il motore con date, adulti, bambini ed età già compilati. Il link è costruito da <code>linkMotore()</code> in <code>src/motore.ts</code>. Prova: scegli le date e premi il bottone.</p>
        <div className="dx-demo" style={{ background: `url(${foto('pineta-casette')}) center / cover`, padding: '120px 24px 24px' }}>
          <Prenota />
        </div>
        <div className="dx-griglia dx-griglia--2" style={{ alignItems: 'start' }}>
          <Prenota variante="riquadro" titolo="Casa mobile Mirto" nota="Fino a 5 persone" />
          <div>
            <p>Il <strong>riquadro</strong> sta a lato nella scheda di un alloggio e resta visibile scorrendo (sticky). Su telefono scende in fondo alla scheda; al suo posto compare una barra in basso con nome e «Verifica date».</p>
            <Codice>{`<⟦Prenota⟧ />                                   <!-- barra, sotto la hero -->
<⟦Prenota⟧ variante="riquadro" titolo="Casa mobile Mirto" nota="Fino a 5 persone" />
⟦linkMotore⟧({ arrivo: '2027-07-10', partenza: '2027-07-17', adulti: 2, bambini: 1, eta: [7] })`}</Codice>
          </div>
        </div>

        {/* -------------------------------------------------- SISTEMAZIONI */}
        <h2>Filtro e scheda sistemazione</h2>
        <p>Segmento (scelta unica, il cursore cotto scivola), contatore e chip (scelta multipla, attivi in cielo). Le dotazioni cercate si accendono in cielo anche dentro le schede. In hover la scheda sale e la foto passa a quella dell'interno. Questo filtro funziona: provalo.</p>
        <DemoFiltro />
        <Codice>{`<⟦Segmento⟧ etichetta="Tipologia" valore={tipo} onChange={setTipo} opzioni={[…]} />
<⟦Contatore⟧ nome="Siamo in" valore={n} min={1} max={6} onChange={setN} />
<⟦Chip⟧ icona="clima" attivo={on} onClick={…}>Aria condizionata</Chip>
<⟦SchedaSistemazione⟧ s={{ nome, tipo: 'casa', foto, foto2, frase, persone, mq, camere, href, tratti }} />`}</Codice>

        <h2>Card foto</h2>
        <p>Foto 4:5 a tutta card con il testo bianco sulla velatura. In hover la foto si avvicina e compare il tondo con la freccia. Nel sito scorrono di lato nella sezione «Dove dormire»; l'ultima è la card minio che porta al filtro.</p>
        <div className="dx-demo" style={{ background: 'color-mix(in srgb, var(--se-sabbia) 45%, var(--se-bianco))', display: 'flex', gap: 16, overflowX: 'auto' }}>
          {ALLOGGI.map(a => <div key={a.nome}><CardFoto s={{ ...a, nome: a.nome.replace(/^(Casa mobile|Tenda Lodge) /, '') }} /></div>)}
          <a className="se-card-foto se-card-foto--fine" href="#componenti" style={{ position: 'relative', overflow: 'hidden' }}>
            <span className="se-archi se-archi--ad" style={{ '--se-archi-d': '300px', opacity: .22 } as CSSProperties} aria-hidden />
            <span><strong>Quale fa per te?</strong><span className="se-btn se-btn--bianco">Usa il filtro<IconaDotazione nome="freccia" /></span></span>
          </a>
        </div>
        <Codice>{`<⟦CardFoto⟧ s={{ nome: 'Mirto', tipo: 'casa', foto, persone: 5, mq: 26, camere: 2, href }} />
<a class="⟦se-card-foto se-card-foto--fine⟧">…</a>`}</Codice>

        <h2>Pillole</h2>
        <div className="dx-demo">
          <div className="se-pillole"><span className="se-pillole__label">Quanti siete?</span>{[2, 3, 4, 5, 6].map(n => <a key={n} href="#componenti">{n}</a>)}</div>
        </div>

        {/* -------------------------------------------------- DETTAGLIO */}
        <h2>Scheda di un alloggio</h2>
        <p>Le «altre info» della scheda in forma schematica: numeri, ambienti, griglie di icone, riquadri e una linea del tempo. Esempio con i dati veri della Casa mobile Mirto.</p>

        <h3>In breve</h3>
        <InBreve voci={[{ icona: 'persone', valore: '5', testo: 'persone' }, { icona: 'superficie', valore: '26 m²', testo: 'più la veranda' },
          { icona: 'camera', valore: '2', testo: 'camere, più divano letto' }, { icona: 'clima', valore: 'Sì', testo: 'aria condizionata' }]} />

        <h3 style={{ marginTop: 40 }}>Com'è fatta, ambiente per ambiente</h3>
        <div style={{ display: 'grid', gap: 14 }}>
          <Ambiente numero={1} nome="Soggiorno e cucina" foto={foto('mirto-cucina')} dotazioni={[{ icona: 'divano-letto', testo: 'Divano letto' }, { icona: 'cucina', testo: 'Angolo cottura attrezzato' }, { icona: 'frigorifero', testo: 'Frigo 204 l con ghiacciaia' }, { icona: 'microonde', testo: 'Forno a microonde' }]} />
          <Ambiente numero={2} nome="Bagno e WC separati" foto={foto('mirto-bagno')} dotazioni={[{ icona: 'doccia', testo: 'Box doccia e lavabo' }, { icona: 'wc', testo: 'WC in un ambiente a parte' }]} />
        </div>

        <h3 style={{ marginTop: 40 }}>Griglia di icone</h3>
        <p className="se-small">Con un'icona dotazione nel quadrato acqua, oppure con un'icona servizio multi-tono così com'è.</p>
        <GrigliaIcone voci={[{ icona: 'energia', testo: 'Acqua, luce e gas' }, { icona: 'coperta', testo: 'Cuscini e coperte', nota: 'Per tutti i posti letto' },
          { img: servizio('piscina'), testo: 'Piscina e lettini', nota: 'Fino a esaurimento. Cuffia obbligatoria' }, { img: servizio('parcheggio'), testo: 'Un posto auto o moto', nota: 'Nel parcheggio interno' }]} />

        <h3 style={{ marginTop: 40 }}>Da sapere</h3>
        <div className="se-sapere">
          <Sapere icona="biancheria" titolo="Biancheria su richiesta" righe={[['Set matrimoniale, 2 persone', '€ 20'], ['Set singolo, 1 persona', '€ 10']]}><p>Lenzuola e asciugamani si chiedono quando prenoti.</p></Sapere>
          <Sapere icona="no" titolo="Da portare da casa" righe={[['Teli mare e piscina'], ['Cuffia per la piscina'], ['Carta igienica']]} />
          <Sapere icona="info" titolo="Angolo cottura pulito" avviso righe={[['Se no, supplemento', '€ 30']]}><p>Alla partenza cucina e stoviglie vanno lasciate pulite.</p></Sapere>
        </div>

        <h3 style={{ marginTop: 40 }}>Orari</h3>
        <div className="dx-demo">
          <Orari checkout={10.5} latefino={18} checkin={[16.5, 20]} />
          <div className="se-orari__voci">
            <div><span className="se-orari__pallino" style={{ background: 'var(--se-minio)' }}><IconaDotazione nome="arrivo" /></span><div><strong>16:30 – 20:00</strong><span>Check-in</span></div></div>
            <div><span className="se-orari__pallino" style={{ background: 'var(--se-cotto)' }}><IconaDotazione nome="partenza" /></span><div><strong>Entro le 10:30</strong><span>Check-out</span></div></div>
            <div><span className="se-orari__pallino" style={{ background: 'var(--se-sabbia)', color: 'var(--se-cotto)' }}><IconaDotazione nome="orologio" /></span><div><strong>Fino alle 18:00 · € 30</strong><span>Late check-out, se disponibile</span></div></div>
          </div>
        </div>
        <Codice>{`<⟦InBreve⟧ voci={[{ icona: 'persone', valore: '5', testo: 'persone' }, …]} />
<⟦Ambiente⟧ numero={1} nome="Soggiorno e cucina" foto={…} dotazioni={[{ icona: 'divano-letto', testo: 'Divano letto' }]} />
<⟦GrigliaIcone⟧ voci={[{ icona: 'energia', testo: 'Acqua, luce e gas' }, { img: '…/servizi/piscina.svg', testo: 'Piscina' }]} />
<div class="⟦se-sapere⟧"><⟦Sapere⟧ icona="biancheria" titolo="…" righe={[['Set singolo', '€ 10']]} /></div>
<⟦Orari⟧ checkout={10.5} latefino={18} checkin={[16.5, 20]} />`}</Codice>

        <h3>Inclusi</h3>
        <div className="se-inclusi">
          <div><IconaDotazione nome="energia" /><strong>Acqua, luce e gas</strong><span>Tutti i consumi.</span></div>
          <div><IconaDotazione nome="stoviglie" /><strong>Cucina e stoviglie</strong><span>Angolo cottura attrezzato.</span></div>
          <div><img src={servizio('piscina')} alt="" /><strong>Piscina e lettini</strong><span>Cuffia obbligatoria.</span></div>
          <div><img src={servizio('parcheggio')} alt="" /><strong>Un posto auto</strong><span>Nel parcheggio interno.</span></div>
        </div>

        {/* -------------------------------------------------- SEZIONI */}
        <h2>Pannello</h2>
        <p>Foto a tutto schermo con il testo in basso a sinistra. Nel sito mare, pineta e oasi si impilano uno sull'altro scorrendo.</p>
        <div className="dx-fascia-demo">
          <Pannello numero="02 — LA PINETA" titolo="All’ombra della pineta" foto={foto('pineta-casette')} altezza="460px"
            icone={[{ src: servizio('casa-mobile'), alt: 'Case mobili' }, { src: servizio('tenda-lodge'), alt: 'Tende lodge' }, { src: servizio('barbecue'), alt: 'Barbecue' }]}>
            <p>Case mobili, tende e piazzole stanno all’ombra della pineta.</p>
          </Pannello>
        </div>

        <h2>Voce in card e promo</h2>
        <div className="dx-demo" style={{ background: 'var(--se-cotto)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <div className="se-voce"><img src={servizio('spiaggia-cani')} alt="" /><strong>Dog Beach</strong><span>Un lungo tratto di spiaggia ad accesso libero per i cani.</span></div>
          <div className="se-voce"><img src={servizio('area-cani')} alt="" /><strong>Dog area</strong><span>Oltre 500 metri nella pineta, sempre all’ombra.</span></div>
          <div className="se-voce"><img src={servizio('doccia-cani')} alt="" /><strong>Doccia per cani</strong><span>Dentro la dog area.</span></div>
        </div>
        <div className="se-promo" style={{ marginBottom: 32 }}>
          <div className="se-promo__foto"><img src={foto('camper')} alt="" /></div>
          <div className="se-promo__corpo">
            <p className="se-etichetta">Hai la tua casa con te?</p>
            <h3 className="se-titolo-l">Piazzole per camper, caravan e tende</h3>
            <ul>
              <li><img src={servizio('camper-roulotte')} alt="" />Fondo sabbioso, ben ombreggiate nella pineta</li>
              <li><img src={servizio('camper-service')} alt="" />La maggior parte con corrente a 6 ampere</li>
            </ul>
            <Bottone variante="bianco" freccia>Richiedi preventivo</Bottone>
          </div>
        </div>

        <h2>Fascia</h2>
        <p>Sezione a tutta larghezza. <code>sabbia</code> è la sabbia velata, il fondo caldo del sito; <code>sabbia-piena</code> è il colore pieno del brandbook. Su minio e cotto il testo passa a bianco da solo.</p>
        {(['sabbia', 'acqua', 'cotto'] as const).map(f => (
          <div className="dx-fascia-demo" key={f}>
            <Fascia fondo={f}>
              <span className="se-etichetta">Fascia {f}</span>
              <h2 className="se-titolo-l">Titolo della <em>fascia</em></h2>
              <p>Testo di esempio sul fondo {f}.</p>
              <Bottone variante={f === 'cotto' ? 'bianco' : 'scuro'} freccia>Scopri</Bottone>
            </Fascia>
          </div>
        ))}

        <h2>Archi</h2>
        <p>◆ p.1, 4, 10, 16, 28. Anelli bianchi spessi, tagliati dall'angolo: solo su fondi pieni, solo negli angoli, mai sopra un testo. Nel sito stanno nel piede e nella sezione pet, al 10–22% di opacità.</p>
        <div className="dx-archi-demo" style={{ background: 'var(--se-minio)' }}>
          <span className="se-archi se-archi--bs" aria-hidden />
          <span className="se-archi se-archi--singolo se-archi--ad" style={{ '--se-archi-d': '200px' } as CSSProperties} aria-hidden />
          <h2 style={{ color: '#fff', margin: 0, position: 'relative' }}>Camping S'Ena Arrubia</h2>
        </div>

        {/* -------------------------------------------------- MOVIMENTO */}
        <h2>Movimento</h2>
        <p>Nel sito le animazioni sono fatte con GSAP (ScrollTrigger, SplitText) e lo scorrimento morbido con Lenis, sul modello di lasalaplazahotel.com. Le regole:</p>
        <ul>
          <li>Una curva sola, <code>--se-ease</code>: parte veloce e si posa piano. Durate: <code>--se-durata-breve</code> 0,3 s (hover), <code>--se-durata-media</code> 0,5 s (card, cursori), <code>--se-durata-lunga</code> 1,2 s (zoom delle foto).</li>
          <li>I titoli salgono riga per riga da una maschera; il testo lungo si accende parola per parola mentre si scorre.</li>
          <li>Le foto si svelano dal basso (clip-path) e poi si muovono lente (parallasse ±6%); in hover si avvicinano del 4–6%.</li>
          <li>Con «riduci movimento» attivo nel sistema non parte nessuna animazione.</li>
        </ul>
      </section>
    </>
  );
}
