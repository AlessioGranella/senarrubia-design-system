import { asset } from '../../asset';
import { GrigliaImmagini } from '../Lightbox';

const f = (n: string, d: string) => ({ src: asset(`brand/foto/${n}.jpg`), didascalia: d });

const MARE = [
  f('spiaggia-drone', 'Il mare dall\'alto'), f('spiaggia-relax', 'In spiaggia'), f('spiaggia-riva', 'La riva, d\'estate'),
  f('oasi-drone', 'Pineta, stagno e mare'), f('oasi-fenicotteri', 'I fenicotteri dell\'oasi'), f('oasi-birdwatching', 'Birdwatching'),
];
const CAMPEGGIO = [
  f('pineta-cielo', 'La pineta, dal basso'), f('pineta-drone', 'La pineta dall\'alto'), f('cartelli', 'I cartelli in legno'),
  f('casetta', 'Le case mobili'), f('casetta-coppia', 'Sulla veranda'), f('tenda', 'In tenda'), f('camper', 'In camper'),
];
const VITA = [
  f('piscina-famiglia', 'In piscina'), f('piscina', 'Bordo piscina'), f('piscina-drone', 'La piscina dall\'alto'),
  f('cavalli', 'A cavallo'), f('ristorante', 'Al ristorante'),
];

export function Fotografia() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Applicazioni · derivato</span>
          <h1>Fotografia</h1>
          <p className="se-lead">
            Il brandbook non parla di fotografia. Queste regole vengono dalla selezione fatta per il nuovo
            sito: luce piena, pineta, acqua, persone vere in vacanza.
          </p>
        </div>
        <div className="dx-do-dont">
          <div className="dx-do"><h4>Sì</h4><ul>
            <li>Luce del giorno, cieli puliti, colori naturali e caldi che stanno con sabbia e minio.</li>
            <li>Le viste dall'alto: raccontano in un colpo pineta, stagno e mare.</li>
            <li>Persone vere che fanno cose: nuotare, leggere in veranda, andare a cavallo.</li>
            <li>L'oasi e i fenicotteri: sono ciò che nessun altro campeggio ha.</li>
          </ul></div>
          <div className="dx-dont"><h4>No</h4><ul>
            <li>Foto scure, notturne senza motivo, dominanti verdi o blu forti.</li>
            <li>Filtri, vignettature, saturazione spinta.</li>
            <li>Stock generico di spiagge che non sono Arborea.</li>
            <li>Immagini generate con l'AI spacciate per foto del campeggio.</li>
          </ul></div>
        </div>
      </section>
      <section className="dx-section"><h2>Mare e oasi</h2><GrigliaImmagini voci={MARE} foto /></section>
      <section className="dx-section"><h2>Il campeggio</h2><GrigliaImmagini voci={CAMPEGGIO} foto /></section>
      <section className="dx-section">
        <h2>Vita in campeggio</h2>
        <GrigliaImmagini voci={VITA} foto />
        <p className="se-small" style={{ marginTop: 16 }}>
          Copie a 1600 px. Originali completi in <code>Sito/1. CHECK FOTO 3/</code> (e nelle cartelle CHECK FOTO precedenti).{' '}
          <a href={asset('brand/zip/senarrubia-foto.zip')} download>Scarica la selezione (ZIP)</a>
        </p>
      </section>
    </>
  );
}
