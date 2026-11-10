import type { ReactNode } from 'react';
import { IconaDotazione } from './IconaDotazione';

export type VarianteBottone = 'pieno' | 'scuro' | 'linea' | 'bianco' | 'vetro';

/** Pillola maiuscola. `pieno` (minio) solo per l'azione principale: prenotare. */
export function Bottone({ variante = 'pieno', href, freccia = false, piccolo = false, children, ...resto }: {
  variante?: VarianteBottone; href?: string; freccia?: boolean; piccolo?: boolean; children: ReactNode;
  target?: string; rel?: string; type?: 'button' | 'submit'; onClick?: () => void;
}) {
  const cls = `se-btn se-btn--${variante}${piccolo ? ' se-btn--piccolo' : ''}`;
  const dentro = <>{children}{freccia && <IconaDotazione nome="freccia" />}</>;
  return href
    ? <a className={cls} href={href} target={resto.target} rel={resto.rel}>{dentro}</a>
    : <button className={cls} type={resto.type ?? 'button'} onClick={resto.onClick}>{dentro}</button>;
}

/** Link testuale con freccia e sottolineatura sabbia → minio. */
export function LinkFreccia({ href, children }: { href: string; children: ReactNode }) {
  return <a className="se-link-freccia" href={href}>{children}<IconaDotazione nome="freccia" /></a>;
}
