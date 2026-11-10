import type { ReactNode } from 'react';
import { IconaDotazione, type NomeDotazione } from './IconaDotazione';

/** Quattro numeri con icona in testa alla scheda di un alloggio. */
export function InBreve({ voci }: { voci: { icona: NomeDotazione; valore: string; testo: string }[] }) {
  return <div className="se-in-breve">{voci.map(v => <div key={v.testo}><IconaDotazione nome={v.icona} /><strong>{v.valore}</strong><span>{v.testo}</span></div>)}</div>;
}

/** Un ambiente dell'alloggio: foto, nome numerato, dotazioni. */
export function Ambiente({ numero, nome, foto, dotazioni }: { numero: number; nome: string; foto: string; dotazioni: { icona: NomeDotazione; testo: string }[] }) {
  return (
    <div className="se-ambiente">
      <div className="se-ambiente__foto"><img src={foto} alt="" loading="lazy" /></div>
      <div>
        <h3><span className="se-ambiente__num">{numero}</span>{nome}</h3>
        <ul>{dotazioni.map(d => <li key={d.testo}><IconaDotazione nome={d.icona} />{d.testo}</li>)}</ul>
      </div>
    </div>
  );
}

/** Griglia di voci. `icona` = dotazione (quadrato acqua) · `img` = icona servizio multi-tono. */
export function GrigliaIcone({ voci }: { voci: { icona?: NomeDotazione; img?: string; testo: string; nota?: string }[] }) {
  return (
    <ul className="se-griglia-ic">
      {voci.map(v => (
        <li key={v.testo}>
          {v.img ? <img src={v.img} alt="" /> : <span className="se-griglia-ic__ic">{v.icona && <IconaDotazione nome={v.icona} />}</span>}
          <span>{v.testo}{v.nota && <small>{v.nota}</small>}</span>
        </li>
      ))}
    </ul>
  );
}

/** Riquadro «da sapere». Righe con importo a destra. */
export function Sapere({ icona, titolo, avviso = false, children, righe = [] }: {
  icona: NomeDotazione; titolo: string; avviso?: boolean; children?: ReactNode; righe?: [string, string?][];
}) {
  return (
    <div className={avviso ? 'se-sapere--avviso' : undefined}>
      <h3><IconaDotazione nome={icona} />{titolo}</h3>
      {children}
      {righe.length > 0 && <ul>{righe.map(([t, v]) => <li key={t}>{t}{v && <strong>{v}</strong>}</li>)}</ul>}
    </div>
  );
}

/** Linea del tempo 8–22. Ore come numeri decimali (16.5 = 16:30). */
export function Orari({ checkout, latefino, checkin }: { checkout: number; latefino?: number; checkin: [number, number] }) {
  const x = (h: number) => `${((h - 8) / 14) * 100}%`;
  const w = (a: number, b: number) => `${((b - a) / 14) * 100}%`;
  const hh = (h: number) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
  const ore = [8, checkout, 13, checkin[0], ...(latefino ? [latefino] : []), checkin[1], 22];
  return (
    <div className="se-orari" aria-hidden>
      <div className="se-orari__linea">
        <span className="se-orari__tratto se-orari__tratto--out" style={{ left: 0, width: x(checkout) }} />
        {latefino && <span className="se-orari__tratto se-orari__tratto--late" style={{ left: x(checkout), width: w(checkout, latefino) }} />}
        <span className="se-orari__tratto se-orari__tratto--in" style={{ left: x(checkin[0]), width: w(checkin[0], checkin[1]) }} />
      </div>
      <div className="se-orari__ore">{ore.map(h => <span key={h} style={{ left: x(h) }}>{hh(h)}</span>)}</div>
    </div>
  );
}
