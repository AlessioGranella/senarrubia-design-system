/**
 * Costruisce l'URL di un asset di brand.
 *
 * Due trappole, e questo helper esiste per entrambe.
 *
 * 1. Il sito può vivere in una sottocartella: un path assoluto tipo
 *    `/brand/...` punta alla radice del dominio e dà 404.
 *    `import.meta.env.BASE_URL` contiene la base del build, quindi lo stesso
 *    codice funziona in dev, in una build relativa e su un sito pubblicato.
 *
 * 2. Un `url()` RELATIVO dentro una custom property CSS non si risolve
 *    rispetto all'elemento che la dichiara, ma rispetto al foglio di stile
 *    che fa il `var()`. Per questo qui si restituisce un URL ASSOLUTO,
 *    risolto contro `document.baseURI`.
 *
 * Regola: nessun componente scrive path di asset a mano, passa sempre da qui.
 */
export function asset(percorso: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const rel = `${base.replace(/\/$/, '')}/${percorso.replace(/^\//, '')}`;
  if (typeof document === 'undefined') return rel;
  return new URL(rel, document.baseURI).href;
}

/** Come `asset`, ma già impacchettato in un `url(...)` per il CSS. */
export function assetUrl(percorso: string): string {
  return `url(${asset(percorso)})`;
}
