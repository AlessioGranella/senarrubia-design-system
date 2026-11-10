import { useEffect, useState } from 'react';

export type Immagine = { src: string; didascalia: string };

/** Griglia di immagini ingrandibili. `foto` riempie la tessera invece di contenere. */
export function GrigliaImmagini({ voci, foto = false }: { voci: Immagine[]; foto?: boolean }) {
  const [aperta, setAperta] = useState<Immagine | null>(null);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAperta(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);
  return (
    <>
      <div className="dx-galleria">
        {voci.map(v => (
          <figure className={`dx-gal${foto ? ' dx-gal--foto' : ''}`} key={v.src}>
            <button type="button" onClick={() => setAperta(v)} aria-label={`Ingrandisci: ${v.didascalia}`}>
              <img src={v.src} alt={v.didascalia} loading="lazy" />
            </button>
            <figcaption>{v.didascalia}</figcaption>
          </figure>
        ))}
      </div>
      {aperta && (
        <div className="dx-lightbox" onClick={() => setAperta(null)} role="dialog" aria-label={aperta.didascalia}>
          <img src={aperta.src} alt={aperta.didascalia} />
          <p>{aperta.didascalia}</p>
        </div>
      )}
    </>
  );
}
