import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { IconArrow } from './Icons';
import { projects } from '../data/site';
import './Projects.css';

const toneClass: Record<string, string> = {
  plain: '',
  dim: 'c-dim',
  sand: 'c-sand',
};

export default function Projects() {
  const { headline, lede, controls, items } = projects;

  /* Opens on an interior slide so the carousel starts the way the reference
     reads — the tall active card centred, with a neighbour either side. */
  const [active, setActive] = useState(() => Math.min(2, items.length - 1));
  const [offset, setOffset] = useState(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const go = useCallback(
    (next: number) => setActive(((next % items.length) + items.length) % items.length),
    [items.length],
  );

  /* The active slide is centred by measuring it rather than by calculating
     widths in CSS, so the carousel stays centred at any breakpoint and
     whatever the slide sizes resolve to. */
  useLayoutEffect(() => {
    const recentre = () => {
      const view = viewRef.current;
      const track = trackRef.current;
      const slide = track?.children[active] as HTMLElement | undefined;
      if (!view || !track || !slide) return;

      const centred = view.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2);
      /* Clamped to the track's own ends, so reaching the first or last project
         butts the row up against the gutter instead of opening a dead gap
         where a neighbouring slide would otherwise sit. */
      const min = Math.min(0, view.clientWidth - track.scrollWidth);
      setOffset(Math.max(min, Math.min(0, centred)));
    };

    recentre();

    /* Images and webfonts both change slide metrics after first paint. */
    const raf = window.requestAnimationFrame(recentre);
    window.addEventListener('resize', recentre);
    window.addEventListener('load', recentre);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', recentre);
      window.removeEventListener('load', recentre);
    };
  }, [active]);

  /* Left/right arrows move the carousel while it holds focus. */
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(active - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(active + 1);
    }
  };

  const current = items[active];

  return (
    <section className="section prj" id="projects">
      <div className="shell">
        <div className="prj__head reveal">
          <h2 className="prj__title">
            {headline.map((line, i) => (
              <span key={i} className="section__titleLine">
                {line.map((clause, j) => (
                  <span key={j} className={toneClass[clause.tone]}>
                    {clause.text}
                    {j < line.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="prj__lede">{lede}</p>
        </div>

        <div
          className="prj__carousel reveal"
          ref={viewRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Recent work"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <ul
            className="prj__track"
            ref={trackRef}
            style={{ transform: `translate3d(${offset}px, 0, 0)` }}
          >
            {items.map((item, i) => (
              <li key={item.name} className={`prj__slide${i === active ? ' is-active' : ''}`}>
                <button
                  type="button"
                  className="prj__slideBtn"
                  onClick={() => go(i)}
                  aria-label={`Show ${item.name}`}
                  aria-current={i === active}
                >
                  <span className="frame prj__slideFrame">
                    <img src={item.image} alt={item.alt} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="prj__controls reveal">
          <div className="prj__dots">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                className={`prj__dot${i === active ? ' is-active' : ''}`}
                aria-label={item.name}
                aria-current={i === active}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <div className="prj__nav">
            <button
              type="button"
              className="prj__navBtn prj__navBtn--prev"
              onClick={() => go(active - 1)}
              aria-label={controls.prev}
            >
              <IconArrow />
            </button>
            <button
              type="button"
              className="prj__navBtn"
              onClick={() => go(active + 1)}
              aria-label={controls.next}
            >
              <IconArrow />
            </button>
          </div>
        </div>

        <figure className="prj__feature reveal">
          <div className="frame prj__featureFrame">
            <img src={current.image} alt={current.alt} />
            <span className="prj__featureVeil" aria-hidden="true" />
          </div>

          <figcaption className="prj__featureMeta">
            <span className="tag prj__featureTag">{current.tag}</span>
            <span className="prj__featureText">
              <span className="prj__featureCompany">{current.title}</span>
              <span className="prj__featureName">{current.name}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
