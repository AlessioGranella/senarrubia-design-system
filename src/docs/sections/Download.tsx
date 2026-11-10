import { asset } from '../../asset';

const PACCHETTI: { file: string; titolo: string; testo: string }[] = [
  { file: 'senarrubia-kit-completo', titolo: 'Kit completo', testo: 'Logo, icone e Raleway in un solo file. Il pacchetto da dare a chi lavora sul brand.' },
  { file: 'senarrubia-logo', titolo: 'Logo', testo: '5 versioni in SVG e PNG trasparente 2048 px, più la versione mono in currentColor.' },
  { file: 'senarrubia-icone', titolo: 'Icone', testo: 'Sole (7 colori), pittogramma, tre stelle (7 colori), 5 immagini profilo, 24 icone dei servizi, 6 della raccolta differenziata. SVG + PNG.' },
  { file: 'senarrubia-raleway', titolo: 'Raleway', testo: 'Font variabile (normale e corsivo), 18 pesi statici, licenza OFL.' },
  { file: 'senarrubia-foto', titolo: 'Fotografie', testo: 'Selezione di 18 foto a 1600 px.' },
  { file: 'senarrubia-originali-stampa', titolo: 'Originali per la stampa', testo: 'I file vettoriali consegnati dal cliente, in PDF ed EPS. Per tipografie e fornitori.' },
];

export function Download() {
  return (
    <section className="dx-section">
      <div className="dx-h">
        <span className="se-etichetta">Costruire</span>
        <h1>Download</h1>
        <p className="se-lead">I file pronti, per chi non lavora nel codice. Ogni file singolo si scarica anche dalle pagine Logo e Icone.</p>
      </div>
      {PACCHETTI.map(p => (
        <div className="dx-pacchetto" key={p.file}>
          <div><h3>{p.titolo}</h3><p>{p.testo}</p></div>
          <a className="se-btn se-btn--scuro" href={asset(`brand/zip/${p.file}.zip`)} download>ZIP</a>
        </div>
      ))}

      <h2>Quale file per cosa</h2>
      <table className="dx-tabella">
        <thead><tr><th>Uso</th><th>Formato</th></tr></thead>
        <tbody>
          <tr><td>Sito, presentazioni, documenti</td><td>SVG (si ingrandisce senza perdere qualità)</td></tr>
          <tr><td>Social, email, Word, Canva</td><td>PNG trasparente</td></tr>
          <tr><td>Tipografia, insegne, ricamo, serigrafia</td><td>PDF o EPS dagli originali di stampa, con i Pantone del brandbook</td></tr>
          <tr><td>Modifiche al marchio</td><td>AI (Illustrator): solo DROP, in <code>Sito/Brand/CAMPING VILLAGE/File sorgenti AI</code></td></tr>
        </tbody>
      </table>
      <p className="se-small">
        Logo e icone sono generati dai vettoriali del cliente con <code>npm run marchio</code>
        (<code>scripts/marchio.py</code>); gli zip si rigenerano da soli a ogni <code>npm run dev</code> / <code>build</code>.
      </p>
    </section>
  );
}
