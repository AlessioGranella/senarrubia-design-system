import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';
import { Inizio } from './sections/Inizio';
import { Marchio } from './sections/Marchio';
import { Icone } from './sections/Icone';
import { Colore } from './sections/Colore';
import { Tipografia } from './sections/Tipografia';
import { Fotografia } from './sections/Fotografia';
import { Applicazioni } from './sections/Applicazioni';
import { Componenti } from './sections/Componenti';
import { Download } from './sections/Download';

const NAV = [
  { gruppo: 'Partire da qui', voci: [{ id: 'inizio', label: 'Il design system', el: <Inizio /> }] },
  { gruppo: 'Marchio', voci: [
      { id: 'marchio', label: 'Il logo', el: <Marchio /> },
      { id: 'icone', label: 'Icone', el: <Icone /> },
      { id: 'colore', label: 'Palette colori', el: <Colore /> },
      { id: 'tipografia', label: 'Tipografia', el: <Tipografia /> },
  ]},
  { gruppo: 'Applicazioni', voci: [
      { id: 'fotografia', label: 'Fotografia', el: <Fotografia /> },
      { id: 'applicazioni', label: 'Applicazioni', el: <Applicazioni /> },
  ]},
  { gruppo: 'Costruire', voci: [
      { id: 'componenti', label: 'Componenti', el: <Componenti /> },
      { id: 'download', label: 'Download', el: <Download /> },
  ]},
];

const VOCI = NAV.flatMap(g => g.voci);
const daHash = () => {
  const id = window.location.hash.replace('#', '');
  return VOCI.some(v => v.id === id) ? id : 'inizio';
};

export function App() {
  const [attiva, setAttiva] = useState(daHash);

  // La sezione vive nell'hash: ogni pagina è linkabile e «indietro» funziona.
  useEffect(() => {
    const onHash = () => { setAttiva(daHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const corrente = VOCI.find(v => v.id === attiva)!;
  return (
    <div className="dx">
      <nav className="dx-nav">
        <div className="dx-nav__brand">
          <Logo versione="bianco-rosso" larghezza={180} />
          <small>Design System</small>
        </div>
        {NAV.map(g => (
          <div className="dx-nav__group" key={g.gruppo}>
            <h5>{g.gruppo}</h5>
            {g.voci.map(v => (
              <a key={v.id} href={`#${v.id}`} className="dx-nav__link" aria-current={attiva === v.id}>{v.label}</a>
            ))}
          </div>
        ))}
        <p className="dx-nav__nota">
          Brand Book 2024 · DROP 2026<br />◆ brandbook · ★ indicazione DROP · il resto è derivato
        </p>
      </nav>
      <main className="dx-main">{corrente.el}</main>
    </div>
  );
}
