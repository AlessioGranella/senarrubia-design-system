/** Scheda di una sistemazione (casa mobile, tenda, piazzola). Derivato. */
export function SchedaSistemazione({ tipo, nome, foto, testo, dati = [], prezzo, href = '#' }: {
  tipo: string; nome: string; foto: string; testo?: string; dati?: string[]; prezzo?: string; href?: string;
}) {
  return (
    <article className="se-scheda">
      <div className="se-scheda__foto"><img src={foto} alt={nome} loading="lazy" /></div>
      <div className="se-scheda__corpo">
        <span className="se-etichetta">{tipo}</span>
        <h3 className="se-scheda__nome">{nome}</h3>
        {testo && <p className="se-scheda__testo">{testo}</p>}
        {dati.length > 0 && <ul className="se-scheda__dati">{dati.map(d => <li className="se-chip" key={d}>{d}</li>)}</ul>}
        <div className="se-scheda__piede">
          {prezzo ? <span className="se-scheda__prezzo">da <strong>{prezzo}</strong> a notte</span> : <span />}
          <a className="se-bottone" href={href}>Prenota</a>
        </div>
      </div>
    </article>
  );
}
