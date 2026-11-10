import type { CSSProperties } from 'react';
import { asset } from '../asset';
import type { VersioneLogo } from '../tokens';

/**
 * Il logo intero: pittogramma + S'ENA ARRUBIA + CAMPING VILLAGE. ◆ brandbook p.4-9
 *
 * È un <img> perché le versioni a colori hanno tre tinte: non si ricolora.
 * Si sceglie la versione giusta per il fondo (vedi Marchio → Combinazioni).
 * Larghezza minima 60 px (◆ p.14), forzata dal CSS.
 * `rispetto` aggiunge l'area di rispetto (◆ p.13).
 */
export function Logo({ versione = 'ufficiale', larghezza = 240, rispetto = false, style }: {
  versione?: VersioneLogo; larghezza?: number; rispetto?: boolean; style?: CSSProperties;
}) {
  return (
    <span className={`se-logo${rispetto ? ' se-logo--rispetto' : ''}`}
          style={{ '--se-logo-w': `${larghezza}px`, ...style } as CSSProperties}>
      <img src={asset(`brand/loghi/logo-${versione}.svg`)} alt="S'Ena Arrubia Camping Village" />
    </span>
  );
}

/** Il solo pittogramma a colori (parte A, ◆ p.11): l'unica parte che può stare da sola. */
export function Pittogramma({ versione = 'ufficiale', diametro = 120 }: {
  versione?: 'ufficiale' | 'bianco-rosso'; diametro?: number;
}) {
  return (
    <img src={asset(`brand/icone/pittogramma-${versione}.svg`)} alt="S'Ena Arrubia"
         width={diametro} height={diametro} style={{ display: 'block' }} />
  );
}
