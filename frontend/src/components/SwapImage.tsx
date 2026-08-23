import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  /** Classes for the image itself; `swap` is added on top. */
  className?: string;
};

type Layer = { id: number; src: string; alt: string };

/**
 * An image that crossfades when its source changes.
 *
 * Swapping an `<img>` src outright cuts to the new picture — and cuts to the
 * container's bare background first if the file has not been fetched yet. So
 * the outgoing frame is kept mounted underneath while the incoming one fades
 * over it, and the swap is not started at all until the new source has decoded.
 * The reader sees one dissolve instead of a flash of empty box.
 *
 * Layers are absolutely positioned, so the parent must establish a containing
 * block and give itself a size.
 */
export default function SwapImage({ src, alt, className = '' }: Props) {
  const [layers, setLayers] = useState<Layer[]>(() => [{ id: 0, src, alt }]);

  /* What the top layer is showing, held in a ref so the effect can compare
     against it without listing state it also sets. */
  const shown = useRef(src);
  const nextId = useRef(0);

  useEffect(() => {
    if (shown.current === src) return;
    shown.current = src;

    let cancelled = false;
    const add = () => {
      if (cancelled) return;
      nextId.current += 1;
      setLayers((prev) => [...prev, { id: nextId.current, src, alt }]);
    };

    /* Decode first, then fade. `decode()` rejects on a source that was replaced
       mid-flight, which is exactly when the fade should be skipped anyway — but
       the layer still has to be added, or the swap would never land. */
    const preload = new Image();
    preload.src = src;
    preload.decode().then(add, add);

    return () => {
      cancelled = true;
    };
  }, [src, alt]);

  /* Once the incoming layer has landed it is the only one worth keeping; any
     layers under it are frames from clicks made during the fade. */
  const settle = () => setLayers((prev) => prev.slice(-1));

  return (
    <>
      {layers.map((layer, i) => {
        const isTop = i === layers.length - 1;
        return (
          <img
            key={layer.id}
            className={`swap${layer.id > 0 ? ' is-entering' : ''}${className ? ` ${className}` : ''}`}
            src={layer.src}
            /* Only the top layer is the picture; the ones fading out beneath it
               are decoration and would otherwise be read out twice. */
            alt={isTop ? layer.alt : ''}
            aria-hidden={isTop ? undefined : true}
            onAnimationEnd={isTop ? settle : undefined}
            draggable={false}
          />
        );
      })}
    </>
  );
}
