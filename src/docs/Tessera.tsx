import { asset } from '../asset';

/**
 * Anteprima di un file del brand su un fondo, con i link per scaricarlo.
 * `percorso` senza estensione, es. 'brand/loghi/logo-ufficiale'.
 */
export function Tessera({ percorso, titolo, nota, fondo, png = true, mono }: {
  percorso: string; titolo: string; nota?: string; fondo?: string; png?: boolean; mono?: string;
}) {
  return (
    <div className="dx-tessera">
      <div className={`dx-tessera__fondo${fondo ? '' : ' dx-tessera__fondo--scacchi'}`} style={fondo ? { background: fondo } : undefined}>
        <img src={asset(`${percorso}.svg`)} alt={titolo} loading="lazy" />
      </div>
      <div className="dx-tessera__meta">
        <span><strong>{titolo}</strong>{nota && <><br /><span className="se-small">{nota}</span></>}</span>
        <span className="dx-scarica">
          <a href={asset(`${percorso}.svg`)} download>SVG</a>
          {png && <a href={asset(`${percorso}.png`)} download>PNG</a>}
          {mono && <a href={asset(`${mono}.svg`)} download title="currentColor, per tingerlo via CSS">Mono</a>}
        </span>
      </div>
    </div>
  );
}
