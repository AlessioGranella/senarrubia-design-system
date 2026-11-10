/**
 * Specchio JS dei token di src/styles/colors_and_type.css. Vanno tenuti allineati a mano.
 * ◆ = Brand Book 2024 · ★ = indicazione DROP successiva · il resto è derivato.
 */

/** ◆ p.17-18 — sei colori di brand, più il nero del logo monocromatico. */
export const palette = {
  minio:  '#D85844',
  sabbia: '#EBC6A4',
  cotto:  '#A4382E',
  bianco: '#FFFFFF',
  acqua:  '#D9EEF6',
  cielo:  '#79CADB',
  nero:   '#000000',
} as const;

export type NomeColore = keyof typeof palette;

type Scheda = {
  nome: NomeColore; etichetta: string; livello: 'Primario' | 'Secondario' | 'Terziario' | 'Solo logo';
  pantone: string | null; cmyk: [number, number, number, number]; rgb: [number, number, number]; ruolo: string;
};

/** ◆ Valori di stampa e digitali esattamente come nel brandbook. */
export const schede: Scheda[] = [
  { nome: 'minio',  etichetta: 'Rosso Minio', livello: 'Primario',   pantone: '2027 C',    cmyk: [10, 76, 72, 2],  rgb: [216, 88, 68],   ruolo: 'Il colore del logo e del sole. Copertine, fasce piene, titoli grandi.' },
  { nome: 'sabbia', etichetta: 'Sabbia',      livello: 'Primario',   pantone: '719 C',     cmyk: [8, 25, 38, 1],   rgb: [235, 198, 164], ruolo: 'Il colore della spiaggia. Fondo delle aperture e dei materiali caldi.' },
  { nome: 'cotto',  etichetta: 'Rosso Cotto', livello: 'Secondario', pantone: '7627 C',    cmyk: [25, 86, 80, 20], rgb: [164, 56, 46],   ruolo: 'Le colline del pittogramma. Titoli, fasce profonde, piede.' },
  { nome: 'bianco', etichetta: 'Bianco',      livello: 'Secondario', pantone: null,        cmyk: [0, 0, 0, 0],     rgb: [255, 255, 255], ruolo: 'Fondo di pagina. Logo in negativo su minio, cotto, cielo.' },
  { nome: 'acqua',  etichetta: 'Acqua',       livello: 'Terziario',  pantone: 'P 115-2 C', cmyk: [18, 0, 4, 0],    rgb: [217, 238, 246], ruolo: 'Fondo leggero per mare, oasi, informazioni pratiche.' },
  { nome: 'cielo',  etichetta: 'Cielo',       livello: 'Terziario',  pantone: '2197 C',    cmyk: [54, 0, 15, 0],   rgb: [121, 202, 219], ruolo: 'Accento estivo: piscina, spiaggia. Mai testo bianco sopra.' },
  { nome: 'nero',   etichetta: 'Nero',        livello: 'Solo logo',  pantone: null,        cmyk: [0, 0, 0, 100],   rgb: [0, 0, 0],       ruolo: 'Logo monocromatico (◆ p.6, 9). Derivato: testo corrente.' },
];

/** Contrasti WCAG misurati. Il testo piccolo vuole ≥ 4,5. */
export const contrasti: { testo: NomeColore; fondo: NomeColore; rapporto: number }[] = [
  { testo: 'nero',   fondo: 'bianco', rapporto: 21 },
  { testo: 'nero',   fondo: 'sabbia', rapporto: 13.15 },
  { testo: 'nero',   fondo: 'cielo',  rapporto: 11.28 },
  { testo: 'cotto',  fondo: 'bianco', rapporto: 6.6 },
  { testo: 'bianco', fondo: 'cotto',  rapporto: 6.6 },
  { testo: 'cotto',  fondo: 'acqua',  rapporto: 5.5 },
  { testo: 'nero',   fondo: 'minio',  rapporto: 5.4 },
  { testo: 'cotto',  fondo: 'sabbia', rapporto: 4.13 },
  { testo: 'minio',  fondo: 'bianco', rapporto: 3.89 },
  { testo: 'bianco', fondo: 'minio',  rapporto: 3.89 },
  { testo: 'cotto',  fondo: 'cielo',  rapporto: 3.54 },
  { testo: 'minio',  fondo: 'sabbia', rapporto: 2.43 },
  { testo: 'bianco', fondo: 'cielo',  rapporto: 1.86 },
  { testo: 'bianco', fondo: 'sabbia', rapporto: 1.6 },
];

export const font = {
  famiglia: "'Raleway', 'Helvetica Neue', Arial, sans-serif", // ★
  logotipo: 'Signika (personalizzato, in curve)',              // ◆ p.12 — solo nel logo
} as const;

export const marchio = {
  minimoStampaMm: 20,     // ◆ p.14 — 2 cm di larghezza
  minimoSchermoPx: 60,    // ◆ p.14 — 60 px di larghezza
  rispetto: 0.056,        // ◆ p.13 — altezza di CAMPING ≈ 5,6% della larghezza del logo
  rapporto: 719.83 / 473.18,
} as const;

/** Le versioni del logo, con i file del cliente da cui vengono. */
export type VersioneLogo = 'ufficiale' | 'bianco-rosso' | 'cotto-rosso' | 'bianco' | 'nero';
export const versioniLogo: { id: VersioneLogo; nome: string; fileCliente: string; descrizione: string }[] = [
  { id: 'ufficiale',    nome: 'Ufficiale',      fileCliente: 'S_EA_Sabbia+Rosso', descrizione: 'S\'ENA e payoff sabbia, ARRUBIA rosso. Su bianco.' },
  { id: 'bianco-rosso', nome: 'Bianco + rosso', fileCliente: 'S_EA_Bianco+Rosso', descrizione: 'S\'ENA e payoff bianchi, ARRUBIA rosso. Su sabbia, cotto, cielo e grigi.' },
  { id: 'cotto-rosso',  nome: 'Cotto + rosso',  fileCliente: 'S_EA_Cotto+Rosso',  descrizione: 'S\'ENA e payoff cotto, ARRUBIA rosso. Su sabbia.' },
  { id: 'bianco',       nome: 'Negativo',       fileCliente: 'S_EA_Bianco',       descrizione: 'Al tratto, tutto bianco. Su nero, minio, grigi medi.' },
  { id: 'nero',         nome: 'Positivo',       fileCliente: 'S_EA_Nero',         descrizione: 'Al tratto, tutto nero. Su bianco e grigi chiari.' },
];

/** ◆ p.11 — le tre parti del logo. */
export const componenti = [
  ['A', 'Pittogramma', 'L\'oasi e il sole che la illumina. Può vivere da solo.'],
  ['B', 'Logotipo', 'S\'ENA ARRUBIA, il nome. Non esiste senza A.'],
  ['C', 'Payoff', 'CAMPING VILLAGE, il tipo di attività. Non esiste senza A.'],
] as const;

/** ◆ p.12 — i dettagli del logotipo che non vanno persi. */
export const dettagliLogotipo = [
  'Nella versione a più colori ARRUBIA è sempre rosso.',
  'Le A non hanno l\'asta orizzontale: ricordano le tende.',
  'L\'apostrofo di S\'Ena è una goccia che accompagna la S.',
  'Le due R di ARRUBIA sono legate.',
  'La pancia della P non si chiude sull\'asta.',
  'La M poggia la parte centrale sulla linea di base.',
] as const;
