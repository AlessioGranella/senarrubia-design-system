import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { IconaDotazione, type NomeDotazione } from './IconaDotazione';

/** Contatore con bottoni tondi (adulti, bambini, ospiti). */
export function Contatore({ nome, nota, valore, min = 0, max = 8, onChange, box = false }: {
  nome: string; nota?: string; valore: number; min?: number; max?: number; onChange: (v: number) => void; box?: boolean;
}) {
  return (
    <div className={`se-contatore${box ? ' se-contatore--box' : ''}`}>
      <span className="se-contatore__nome">{nome}{nota && <small>{nota}</small>}</span>
      <span className="se-contatore__ctrl">
        <button type="button" className="se-tondo" disabled={valore <= min} onClick={() => onChange(valore - 1)} aria-label={`${nome}: uno in meno`}><IconaDotazione nome="meno" /></button>
        <output aria-live="polite">{valore}</output>
        <button type="button" className="se-tondo" disabled={valore >= max} onClick={() => onChange(valore + 1)} aria-label={`${nome}: uno in più`}><IconaDotazione nome="piu" /></button>
      </span>
    </div>
  );
}

/** Scelta unica con cursore che scivola sotto l'opzione attiva. */
export function Segmento<T extends string>({ opzioni, valore, onChange, etichetta }: {
  opzioni: { id: T; label: ReactNode; icona?: NomeDotazione; aria?: string }[]; valore: T; onChange: (v: T) => void; etichetta: string;
}) {
  const box = useRef<HTMLDivElement>(null), cur = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const on = box.current?.querySelector<HTMLButtonElement>('[aria-pressed=true]');
    if (on && cur.current) { cur.current.style.width = `${on.offsetWidth}px`; cur.current.style.transform = `translateX(${on.offsetLeft}px)`; }
  }, [valore]);
  return (
    <div className="se-segmento" role="group" aria-label={etichetta} ref={box}>
      <span className="se-segmento__cursore" ref={cur} aria-hidden />
      {opzioni.map(o => (
        <button key={o.id} type="button" aria-pressed={o.id === valore} aria-label={o.aria} onClick={() => onChange(o.id)}>
          {o.icona && <IconaDotazione nome={o.icona} />}{o.label}
        </button>
      ))}
    </div>
  );
}

/** Chip a scelta multipla (filtro). */
export function Chip({ icona, attivo, onClick, children }: { icona?: NomeDotazione; attivo: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" className="se-chip" aria-pressed={attivo} onClick={onClick}>{icona && <IconaDotazione nome={icona} />}{children}</button>;
}

/** Etichette piccole delle dotazioni sulle schede. */
export function Tratti({ voci }: { voci: { icona: NomeDotazione; testo: string; cercato?: boolean }[] }) {
  return <ul className="se-tratti">{voci.map(v => <li key={v.testo} className={v.cercato ? 'is-cercato' : undefined}><IconaDotazione nome={v.icona} />{v.testo}</li>)}</ul>;
}
