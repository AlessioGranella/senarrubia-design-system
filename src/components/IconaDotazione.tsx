import { asset } from '../asset';

/** ★ Icone al tratto delle dotazioni (sprite brand/icone/dotazioni.svg). Tratto in currentColor. */
export const DOTAZIONI = [
  'persone', 'superficie', 'camera', 'matrimoniale', 'singolo', 'castello', 'divano-letto', 'cucina', 'frigorifero', 'microonde',
  'doccia', 'wc', 'separato', 'clima', 'zanzariera', 'veranda', 'tenda', 'casa-mobile', 'chiave', 'ombrellone', 'tavolo',
  'energia', 'coperta', 'scopa', 'stoviglie', 'biancheria', 'no', 'euro', 'orologio', 'arrivo', 'partenza', 'wifi', 'info',
  'telefono', 'mail', 'luogo', 'calendario',
] as const;
/** Icone d'interfaccia, stesso tratto. */
export const INTERFACCIA = ['spunta', 'freccia', 'piu', 'meno', 'chiudi', 'filtro', 'griglia', 'tabella'] as const;
export type NomeDotazione = typeof DOTAZIONI[number] | typeof INTERFACCIA[number];

export function IconaDotazione({ nome, dimensione, className = 'se-ic', titolo }: {
  nome: NomeDotazione; dimensione?: number; className?: string; titolo?: string;
}) {
  return (
    <svg className={className} style={dimensione ? { width: dimensione, height: dimensione } : undefined}
      role={titolo ? 'img' : undefined} aria-label={titolo} aria-hidden={titolo ? undefined : true}>
      <use href={`${asset('brand/icone/dotazioni.svg')}#${nome}`} />
    </svg>
  );
}
