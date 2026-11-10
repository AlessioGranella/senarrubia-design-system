import type { ReactNode } from 'react';

/** Pretitolo maiuscolo spaziato, preceduto dal sole del logo. `nuda` senza sole. */
export function Etichetta({ children, nuda = false }: { children: ReactNode; nuda?: boolean }) {
  return <p className={`se-etichetta${nuda ? ' se-etichetta--nuda' : ''}`}>{children}</p>;
}
