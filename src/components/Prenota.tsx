import { useEffect, useRef, useState, type FormEvent } from 'react';
import { linkMotore, MOTORE } from '../motore';
import { IconaDotazione } from './IconaDotazione';
import { Contatore } from './Controlli';

const iso = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Prenotazione collegata al motore MyGuestCare.
 * `barra` = orizzontale (home, sotto la hero) · `riquadro` = laterale nella scheda di un alloggio.
 * Al submit apre il motore in una nuova finestra con date, adulti, bambini ed età.
 */
export function Prenota({ variante = 'barra', titolo, nota }: { variante?: 'barra' | 'riquadro'; titolo?: string; nota?: string }) {
  const [arrivo, setArrivo] = useState(''), [partenza, setPartenza] = useState('');
  const [adulti, setAdulti] = useState(2), [bambini, setBambini] = useState(0);
  const [eta, setEta] = useState<string[]>([]), [errore, setErrore] = useState(''), [pop, setPop] = useState(false);
  const rif = useRef<HTMLFormElement>(null);
  const oggi = iso(new Date());
  const dopo = (v: string) => { const d = new Date(v); d.setDate(d.getDate() + 1); return iso(d); };

  useEffect(() => { setEta(e => Array.from({ length: bambini }, (_, i) => e[i] ?? '')); }, [bambini]);
  useEffect(() => {
    const chiudi = (e: MouseEvent) => { if (!rif.current?.contains(e.target as Node)) setPop(false); };
    document.addEventListener('click', chiudi); return () => document.removeEventListener('click', chiudi);
  }, []);

  const invia = (e: FormEvent) => {
    e.preventDefault(); setErrore('');
    if (!arrivo || !partenza) return setErrore('Scegli le date di arrivo e partenza.');
    if (partenza <= arrivo) return setErrore('La partenza deve essere dopo l’arrivo.');
    if (eta.includes('')) { setPop(true); return setErrore('Indica l’età di ogni bambino.'); }
    window.open(linkMotore({ arrivo, partenza, adulti, bambini, eta: eta.map(Number) }), '_blank', 'noopener');
  };
  const cambiaArrivo = (v: string) => { setArrivo(v); if (v && (!partenza || partenza <= v)) setPartenza(dopo(v)); };

  const persone = <>
    <Contatore nome="Adulti" nota="Dai 18 anni" valore={adulti} min={1} max={8} onChange={setAdulti} box={variante === 'riquadro'} />
    <Contatore nome="Bambini" nota="Da 0 a 17 anni" valore={bambini} min={0} max={6} onChange={setBambini} box={variante === 'riquadro'} />
    {bambini > 0 && <div className="se-eta">{eta.map((v, i) => (
      <label key={i}>Età bambino {i + 1}
        <select className="se-select" value={v} onChange={e => setEta(x => x.map((y, j) => (j === i ? e.target.value : y)))}>
          <option value="">—</option>{Array.from({ length: 18 }, (_, n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>))}</div>}
  </>;
  const riassunto = `${adulti} adult${adulti === 1 ? 'o' : 'i'}${bambini ? `, ${bambini} bambin${bambini === 1 ? 'o' : 'i'}` : ''}`;

  if (variante === 'riquadro') return (
    <form className="se-box-prenota" onSubmit={invia} noValidate ref={rif}>
      {titolo && <div className="se-box-prenota__testa"><strong>{titolo}</strong>{nota && <span>{nota}</span>}</div>}
      <div className="se-box-prenota__date">
        <label>Arrivo<input type="date" min={oggi} value={arrivo} onChange={e => cambiaArrivo(e.target.value)} /></label>
        <label>Partenza<input type="date" min={arrivo ? dopo(arrivo) : oggi} value={partenza} onChange={e => setPartenza(e.target.value)} /></label>
      </div>
      {persone}
      {errore && <p className="se-prenota__errore" role="alert" style={{ margin: 0 }}>{errore}</p>}
      <button type="submit" className="se-btn se-btn--pieno">Verifica disponibilità e prezzi</button>
      <p className="se-box-prenota__nota">Si apre il nostro sistema di prenotazione.<br />Preferisci parlarci? <a href={MOTORE.preventivo} target="_blank" rel="noopener">Richiedi un preventivo</a></p>
    </form>
  );

  return (
    <form className="se-prenota" onSubmit={invia} noValidate ref={rif} aria-label="Verifica disponibilità">
      <label className="se-prenota__campo">
        <span className="se-prenota__etichetta"><IconaDotazione nome="arrivo" />Arrivo</span>
        <input type="date" min={oggi} value={arrivo} onChange={e => cambiaArrivo(e.target.value)} />
      </label>
      <label className="se-prenota__campo">
        <span className="se-prenota__etichetta"><IconaDotazione nome="partenza" />Partenza</span>
        <input type="date" min={arrivo ? dopo(arrivo) : oggi} value={partenza} onChange={e => setPartenza(e.target.value)} />
      </label>
      <div className="se-prenota__campo">
        <span className="se-prenota__etichetta"><IconaDotazione nome="persone" />Ospiti</span>
        <button type="button" className="se-prenota__ospiti" aria-expanded={pop} onClick={() => setPop(p => !p)}>{riassunto}</button>
        <div className={`se-prenota__pop${pop ? ' is-aperto' : ''}`} role="group" aria-label="Ospiti">{persone}</div>
      </div>
      <button className="se-btn se-btn--pieno" type="submit">Verifica disponibilità</button>
      <p className="se-prenota__errore" role="alert">{errore}</p>
    </form>
  );
}
