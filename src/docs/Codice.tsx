import { Fragment } from 'react';

/**
 * Blocco di codice. Le parti da evidenziare si marcano con ⟦…⟧ nel sorgente:
 * niente HTML dentro la stringa, così JSX continua a fare l'escaping da sé.
 */
export function Codice({ children }: { children: string }) {
  const pezzi = children.split(/⟦|⟧/);
  return (
    <pre className="dx-code">
      {pezzi.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <Fragment key={i}>{p}</Fragment>))}
    </pre>
  );
}
