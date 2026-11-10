import type { ReactNode } from 'react';
import { asset } from '../asset';
import { linkMotore } from '../motore';

/** Testata del sito. `trasparente` sopra una foto (logo bianco), altrimenti solida (logo a colori). */
export function Testata({ voci, trasparente = false, attiva, statica = false }: {
  voci: [string, string][]; trasparente?: boolean; attiva?: string; statica?: boolean;
}) {
  return (
    <header className={`se-testata${trasparente ? ' se-testata--trasparente' : ''}`} style={statica ? { position: 'relative' } : undefined}>
      <a className="se-testata__logo" href="#" aria-label="S'Ena Arrubia Camping Village, home">
        <img className="se-logo-colore" src={asset('brand/loghi/logo-ufficiale.svg')} alt="" />
        <img className="se-logo-bianco" src={asset('brand/loghi/logo-bianco.svg')} alt="" />
      </a>
      <nav className="se-testata__nav" aria-label="Principale">{voci.map(([t, h]) => <a key={t} href={h} aria-current={t === attiva ? 'page' : undefined}>{t}</a>)}</nav>
      <div className="se-testata__azioni">
        <button className="se-testata__lingua" type="button">IT</button>
        <a className="se-btn se-btn--pieno" href={linkMotore()} target="_blank" rel="noopener">Prenota</a>
        <button className="se-testata__menu" type="button" aria-label="Apri il menu"><span /><span /></button>
      </div>
    </header>
  );
}

/** Foto a tutto schermo con testo in basso a sinistra. */
export function Pannello({ numero, titolo, foto, icone = [], children, altezza }: {
  numero: string; titolo: string; foto: string; icone?: { src: string; alt: string }[]; children?: ReactNode; altezza?: string;
}) {
  return (
    <article className="se-pannello" style={altezza ? { height: altezza, minHeight: 0 } : undefined}>
      <div className="se-pannello__img"><img src={foto} alt="" loading="lazy" /></div>
      <div className="se-pannello__corpo">
        <span className="se-pannello__num">{numero}</span>
        <h2>{titolo}</h2>
        {children}
        {icone.length > 0 && <div className="se-pannello__icone">{icone.map(i => <img key={i.src} src={i.src} alt={i.alt} />)}</div>}
      </div>
    </article>
  );
}
