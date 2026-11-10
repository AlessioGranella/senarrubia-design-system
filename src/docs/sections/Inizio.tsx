import { Logo } from '../../components/Logo';
import { Fascia } from '../../components/Fascia';
import { Codice } from '../Codice';

export function Inizio() {
  return (
    <>
      <section className="dx-section">
        <div className="dx-h">
          <span className="se-etichetta">S'Ena Arrubia Camping Village · Arborea, Sardegna</span>
          <h1>Design system</h1>
          <p className="se-lead">
            Il Brand Book 2024 tradotto in token, componenti e file pronti all'uso. Qui ci sono il
            logo in tutte le versioni, le icone, i sei colori, il carattere Raleway e i mattoni per il
            nuovo sito. Tutto si scarica: SVG, PNG, font, foto, originali di stampa.
          </p>
        </div>

        <div className="dx-note">
          <p>
            <strong>◆ è normativo.</strong> Viene dal brandbook (DROP, 2024, 28 pagine) e non si tocca.
            <strong> ★</strong> è un'indicazione di DROP successiva al brandbook: il carattere della
            comunicazione è <strong>Raleway</strong>. Tutto il resto è <em>derivato</em>: copre ciò che il
            brandbook non dice, come la gerarchia web, i componenti e la fotografia.
          </p>
        </div>

        <h2>Come si usa</h2>
        <Codice>{`cd "Camping S'Ena Arrubia/design-system"
npm install
npm run dev          # apre questa libreria su http://localhost:5173
npm run marchio      # rigenera logo e icone dai vettoriali del cliente

/* in un progetto */
@import '⟦senarrubia-design-system/tokens.css⟧';
@import '⟦senarrubia-design-system/components.css⟧';

import { ⟦Logo⟧, Icona, Fascia } from 'senarrubia-design-system';`}</Codice>
      </section>

      <section className="dx-section">
        <div className="dx-fascia-demo">
          <Fascia fondo="minio" centrata archi>
            <Logo versione="bianco" larghezza={260} />
            <h2 style={{ marginTop: 32 }}>Il logo su rosso minio</h2>
            <p>
              ◆ p.11 Il pittogramma «richiama l'ambiente dell'oasi e il sole che lo illumina».
              Su minio il logo va al tratto, in bianco (◆ p.19).
            </p>
          </Fascia>
        </div>
      </section>
    </>
  );
}
