/**
 * Motore di prenotazione MyGuestCare (Mycomp). Non si cambia: ci si collega con un link.
 * Parametri verificati sul motore il 9 e il 10/11/2026. Il link non seleziona un alloggio:
 * il motore mostra tutti quelli liberi nelle date scelte.
 */
export const MOTORE = {
  url: 'https://booking.senarrubia.com/.eshop',
  cliente: 'senaarrubia',
  preventivo: 'https://www.senarrubia.com/richiesta-disponibilita/',
} as const;

const LINGUE: Record<string, number> = { it: 1, en: 2, fr: 3, de: 4, es: 5 };

export type Ricerca = { arrivo?: string; partenza?: string; adulti?: number; bambini?: number; eta?: number[]; lingua?: string };

/** Date in formato ISO (aaaa-mm-gg). Senza date apre la pagina iniziale del motore. */
export function linkMotore({ arrivo, partenza, adulti = 2, bambini = 0, eta = [], lingua = 'it' }: Ricerca = {}): string {
  const p = new URLSearchParams({ idcliente: MOTORE.cliente, idvendor: '1', orderBy: '2', fast: '1', invcart: '1',
    lang: String(LINGUE[lingua.slice(0, 2)] ?? 1) });
  if (arrivo && partenza) {
    const it = (v: string) => v.split('-').reverse().join('/');
    p.set('arrivo', it(arrivo)); p.set('partenza', it(partenza)); p.set('stanze', '1');
    p.set('adulti1', String(adulti)); p.set('bambini1', String(bambini));
    eta.forEach((a, j) => p.set(`etabambino1${j + 1}`, String(a)));
  }
  return `${MOTORE.url}?${p.toString().replace(/%2F/g, '/')}`;
}
