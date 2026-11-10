import { asset } from '../asset';

/** ◇ Le icone della legenda della mappa (24) e della raccolta differenziata (6). */
export const SERVIZI = {
  'parcheggio': 'Parcheggio', 'docce-servizi': 'Docce e servizi igienici', 'casa-mobile': 'Casa mobile',
  'camper-roulotte': 'Camper / roulotte', 'piscina': 'Piscina', 'area-cani': 'Area cani',
  'reception': 'Reception', 'acqua-potabile': 'Acqua potabile', 'tenda-lodge': 'Tenda lodge',
  'camper-service': 'Camper service e WC chimico', 'parco-giochi': 'Parco giochi', 'bird-watching': 'Bird watching',
  'bar': 'Bar', 'lavanderia': 'Lavanderia', 'tenda': 'Tenda', 'corner-shop': 'Corner shop',
  'campo-calcio': 'Campo da calcio', 'spiaggia-cani': 'Spiaggia per cani',
  'ristorante': 'Ristorante', 'doccia-cani': 'Doccia cani', 'barbecue': 'Barbecue',
  'isola-ecologica': 'Isola ecologica', 'beach-tennis-volley': 'Beach tennis e volley', 'area-spettacoli': 'Area spettacoli',
} as const;

export const RIFIUTI = {
  'rifiuti-organico': 'Organico', 'rifiuti-carta': 'Carta', 'rifiuti-non-riciclabile': 'Non riciclabile',
  'rifiuti-plastica': 'Plastica', 'rifiuti-vetro': 'Vetro', 'rifiuti-metallo': 'Metallo',
} as const;

export type NomeServizio = keyof typeof SERVIZI | keyof typeof RIFIUTI;

/**
 * Icona di un servizio del campeggio. Sono illustrazioni a più toni (dalla mappa):
 * si usano come <img>, nei loro colori, senza ritingerle.
 */
export function IconaServizio({ nome, dimensione = 48, decorativa = false }: {
  nome: NomeServizio; dimensione?: number; decorativa?: boolean;
}) {
  const alt = decorativa ? '' : ((SERVIZI as Record<string, string>)[nome] ?? (RIFIUTI as Record<string, string>)[nome]);
  return <img className="se-icona-servizio" src={asset(`brand/icone/servizi/${nome}.svg`)} alt={alt}
              style={{ height: dimensione, width: 'auto', maxWidth: dimensione * 1.6 }} />;
}
