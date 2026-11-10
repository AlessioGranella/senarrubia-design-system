import type { CSSProperties, ReactNode } from "react";


export type FondoFascia = 'bianco' | 'sabbia' | 'sabbia-piena' | 'acqua' | 'minio' | 'cotto' | 'cielo';

/**
 * Fascia a tutta larghezza con contenitore condiviso.
 * Su minio e cotto il testo passa a bianco. `archi` aggiunge gli anelli
 * delle copertine del brandbook (solo su fondi pieni, ◆ p.1, 4).
 * `sabbia` è la sabbia velata del sito; `sabbia-piena` il colore pieno del brandbook.
 */
export function Fascia({ fondo = 'bianco', centrata = false, archi = false, children }: {
  fondo?: FondoFascia; centrata?: boolean; archi?: boolean; children: ReactNode;
}) {
  const cls = ['se-fascia', fondo !== 'bianco' && `se-fascia--${fondo}`, centrata && 'se-fascia--centrata']
    .filter(Boolean).join(' ');
  return (
    <section className={cls}>
      {archi && <><span className="se-archi se-archi--bs" aria-hidden /><span className="se-archi se-archi--singolo se-archi--ad" style={{ '--se-archi-d': '220px' } as CSSProperties} aria-hidden /></>}
      <div className="se-fascia__inner">{children}</div>
    </section>
  );
}
