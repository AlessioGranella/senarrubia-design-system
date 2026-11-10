import { IconaDotazione, type NomeDotazione } from './IconaDotazione';
import { Tratti } from './Controlli';
import { linkMotore } from '../motore';

export type DatiSistemazione = {
  nome: string; tipo: 'casa' | 'tenda'; foto: string; foto2?: string; frase: string;
  persone: number; mq: number; camere: number; href: string;
  tratti?: { icona: NomeDotazione; testo: string; cercato?: boolean }[];
};

const mq = (n: number) => String(n).replace('.', ',');
const tipoTesto = (t: DatiSistemazione['tipo']) => (t === 'casa' ? 'Casa mobile' : 'Tenda lodge');

/** Scheda dell'elenco sistemazioni. In hover la foto passa alla seconda (`foto2`). */
export function SchedaSistemazione({ s }: { s: DatiSistemazione }) {
  return (
    <article className="se-scheda">
      <a className="se-scheda__foto" href={s.href} tabIndex={-1} aria-hidden>
        <img src={s.foto} alt="" loading="lazy" />{s.foto2 && <img src={s.foto2} alt="" loading="lazy" />}
      </a>
      <span className="se-scheda__tipo"><IconaDotazione nome={s.tipo === 'casa' ? 'casa-mobile' : 'tenda'} />{tipoTesto(s.tipo)}</span>
      <div className="se-scheda__corpo">
        <h3 className="se-scheda__nome"><a href={s.href}>{s.nome}</a></h3>
        <p className="se-scheda__frase">{s.frase}</p>
        <Dati3 persone={s.persone} mq={s.mq} camere={s.camere} />
        {s.tratti && <Tratti voci={s.tratti} />}
        <div className="se-scheda__piede">
          <a className="se-link-freccia" href={s.href}>Scopri<IconaDotazione nome="freccia" /></a>
          <a className="se-btn se-btn--pieno" href={linkMotore()} target="_blank" rel="noopener">Verifica date</a>
        </div>
      </div>
    </article>
  );
}

/** Persone · m² · camere, in tre colonne. */
export function Dati3({ persone, mq: m, camere }: { persone: number; mq: number; camere: number }) {
  return (
    <div className="se-dati3">
      <div><IconaDotazione nome="persone" /><strong>{persone}</strong><small>persone</small></div>
      <div><IconaDotazione nome="superficie" /><strong>{mq(m)} m²</strong><small>superficie</small></div>
      <div><IconaDotazione nome="camera" /><strong>{camere}</strong><small>camere</small></div>
    </div>
  );
}

/** Card foto 4:5 (binario orizzontale della home, «potrebbero piacerti»). */
export function CardFoto({ s }: { s: Pick<DatiSistemazione, 'nome' | 'tipo' | 'foto' | 'persone' | 'mq' | 'camere' | 'href'> }) {
  return (
    <a className="se-card-foto" href={s.href}>
      <img src={s.foto} alt="" loading="lazy" />
      <span className="se-card-foto__vai" aria-hidden><IconaDotazione nome="freccia" /></span>
      <span className="se-card-foto__corpo">
        <span className="se-card-foto__tipo">{tipoTesto(s.tipo)}</span>
        <span className="se-card-foto__nome">{s.nome}</span>
        <span className="se-card-foto__dati">
          <span><IconaDotazione nome="persone" />{s.persone} persone</span>
          <span><IconaDotazione nome="superficie" />{mq(s.mq)} m²</span>
          <span><IconaDotazione nome="camera" />{s.camere} camere</span>
        </span>
      </span>
    </a>
  );
}
