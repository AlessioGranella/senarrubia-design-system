import type { CSSProperties } from 'react';
import { assetUrl } from '../asset';
import { palette, type NomeColore } from '../tokens';

/** Icone monocromatiche del brand, tinte con un colore della palette. */
export const ICONE = {
  sole:        { file: 'sole-mono',              ratio: 961 / 959.93,      etichetta: 'Sole' },
  stelle:      { file: 'stelle-mono',            ratio: 67.3532 / 35.6932, etichetta: 'Tre stelle' },
  pittogramma: { file: 'pittogramma-linea-mono', ratio: 282.08 / 281.9,    etichetta: 'Pittogramma al tratto' },
} as const;

export type NomeIcona = keyof typeof ICONE;

/**
 * Il sole (◆ p.25) è la semplificazione ufficiale del logo per social e segnaletica.
 * Le stelle e il pittogramma al tratto vengono dallo stesso vettoriale.
 * `larghezza` in px; il colore è uno della palette.
 */
export function Icona({ nome = 'sole', colore = 'minio', larghezza = 48, decorativa = false }: {
  nome?: NomeIcona; colore?: NomeColore; larghezza?: number; decorativa?: boolean;
}) {
  const i = ICONE[nome];
  return (
    <span
      className="se-icona"
      {...(decorativa ? { 'aria-hidden': true } : { role: 'img', 'aria-label': i.etichetta })}
      style={{
        '--se-icona-src': assetUrl(`brand/icone/${i.file}.svg`),
        '--se-icona-w': `${larghezza}px`,
        '--se-icona-ratio': i.ratio,
        color: palette[colore],
      } as CSSProperties}
    />
  );
}
