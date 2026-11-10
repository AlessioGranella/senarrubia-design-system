import { asset } from '../../asset';
import { GrigliaImmagini } from '../Lightbox';

const e = (n: string, d: string) => ({ src: asset(`brand/esempi/${n}.jpg`), didascalia: d });

export function Applicazioni() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">Applicazioni · brandbook p.26–27</span>
          <h1>Applicazioni</h1>
          <p className="se-lead">
            Come il brandbook applica il marchio: segnaletica, gadget, social. Sono il riferimento per ogni
            nuovo materiale.
          </p>
        </div>
        <GrigliaImmagini voci={[
          e('insegna-welcome', 'Insegna di benvenuto: pittogramma dentro la scritta, logotipo, tre stelle'),
          e('cartello-dog-washing', 'Segnaletica interna: titolo in maiuscolo cotto su sabbia, logo piccolo, freccia'),
          e('tote-bag', 'Tote bag sabbia, logo bianco + rosso'),
          e('tshirt', 'T-shirt minio, logo al tratto in bianco'),
          e('tazze', 'Tazze smaltate: sole minio da solo, logo ufficiale'),
          e('social-kite', 'Post social: foto piena, sole bianco piccolo in basso'),
          e('social-trekking', 'Post social: foto con banda minio e sole bianco'),
        ]} />
      </section>
      <section className="dx-section">
        <h2>Cosa se ne ricava</h2>
        <ul>
          <li>Sui gadget il segno più usato è il <strong>sole</strong>, da solo, in un colore.</li>
          <li>Il logo intero va dove c'è spazio: insegne, tote bag, schede. Sulle foto social basta il sole.</li>
          <li>Sabbia e minio sono i fondi dominanti; il cotto arriva nei titoli della segnaletica.</li>
        </ul>
      </section>
    </>
  );
}
