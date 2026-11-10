import { useEffect, useRef, useState } from 'react';

/**
 * Copia un valore negli appunti al clic.
 *
 * `navigator.clipboard` esiste solo in contesto sicuro (https o localhost);
 * altrove si ricade sul vecchio execCommand, che vuole un nodo nel documento.
 */
export function useCopia(): [string | null, (valore: string) => void] {
  const [copiato, setCopiato] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copia = (valore: string) => {
    const segnala = () => {
      setCopiato(valore);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopiato(null), 1400);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(valore).then(segnala, () => ripiego(valore, segnala));
    } else {
      ripiego(valore, segnala);
    }
  };
  return [copiato, copia];
}

function ripiego(valore: string, poi: () => void) {
  const ta = document.createElement('textarea');
  ta.value = valore;
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); poi(); } finally { ta.remove(); }
}
