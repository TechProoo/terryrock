import { useCallback, useEffect, useRef, useState } from 'react';
import { sectorCarousel } from '../data/sectorCarousel';
import './SectorCarousel.css';

/**
 * Sector carousel. A row of cards rides over a full-bleed background, and the
 * background is always the selected card's own photograph — selecting a card
 * cross-fades the section behind it.
 *
 * It advances on its own, but only while it is worth advancing: paused on
 * hover, on keyboard focus, while the tab is hidden, and while the section is
 * off screen. A reduced-motion preference stops it entirely.
 */
export default function SectorCarousel() {
  const { eyebrow, title, autoplayMs, slides } = sectorCarousel;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Assume visible where there is no observer to tell us otherwise. */
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window));
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const go = useCallback((index: number) => setActive((index + slides.length) % slides.length), [slides.length]);

  /* The block hangs off the right-hand edge. Where the row sits is a
     measurement, not a formula:

       - while the whole row fits, it is right-aligned to the gutter, so the
         cards sit against the right edge with open background to their left;
       - once it is wider than that, it slides to bring the selected card to the
         left of the visible run, clamped at both ends so neither edge ever
         shows dead space.

     `--row-x` carries the row's resting left edge back out to the heading and
     the dots, which line up with it. Written straight to the nodes, so
     re-measuring costs no render. */
  const positionTrack = useCallback(() => {
    const view = viewport.current;
    const row = track.current;
    const box = inner.current;
    if (!view || !row || !box) return;

    const card = row.children[active] as HTMLElement | undefined;
    if (!card) return;

    const gutter = parseFloat(getComputedStyle(box).paddingLeft) || 0;
    const viewW = view.clientWidth;
    const rowW = row.scrollWidth;
    const rightAligned = viewW - gutter - rowW;

    const x =
      rowW + gutter * 2 <= viewW
        ? rightAligned
        : Math.min(Math.max(gutter - card.offsetLeft, rightAligned), gutter);

    row.style.transform = `translateX(${x}px)`;
    box.style.setProperty('--row-x', `${Math.max(gutter, rightAligned) - gutter}px`);
  }, [active]);

  useEffect(positionTrack, [positionTrack]);

  useEffect(() => {
    window.addEventListener('resize', positionTrack);
    return () => window.removeEventListener('resize', positionTrack);
  }, [positionTrack]);

  /* Only run the timer when the section is actually on screen. */
  useEffect(() => {
    const el = section.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tick = () => setActive((i) => (i + 1) % slides.length);
    const id = window.setInterval(tick, autoplayMs);

    /* A backgrounded tab throttles timers; stop rather than queue up jumps. */
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [paused, visible, autoplayMs, slides.length]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section
      className="sc"
      ref={section}
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Background stack — every slide is mounted, only the active one shows. */}
      <div className="sc__bg" aria-hidden="true">
        {slides.map((slide, i) => (
          <img
            key={slide.alt}
            className={`sc__bgImg${i === active ? ' is-active' : ''}`}
            src={slide.image}
            alt=""
          />
        ))}
        <div className="sc__veil" />
      </div>

      <div className="sc__inner" ref={inner}>
        <header className="sc__head">
          <p className="micro sc__eyebrow">{eyebrow}</p>
          <h2 className="sc__title">{title}</h2>
        </header>

        <div className="sc__viewport" ref={viewport} onKeyDown={onKeyDown}>
          <div className="sc__track" ref={track}>
            {slides.map((slide, i) => (
              <button
                type="button"
                key={slide.alt}
                className={`sc__card${i === active ? ' is-active' : ''}`}
                onClick={() => go(i)}
                aria-current={i === active}
                aria-label={`${slide.label.join(' ')} — slide ${i + 1} of ${slides.length}`}
              >
                <img className="sc__cardImg" src={slide.image} alt={slide.alt} />
                <span className="sc__cardVeil" aria-hidden="true" />
                <span className="sc__cardBody">
                  <span className="sc__stat">{slide.stat}</span>
                  <span className="sc__label">
                    {slide.label.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="sc__dots">
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.alt}
              className={`sc__dot${i === active ? ' is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Show ${slide.label.join(' ')}`}
              aria-current={i === active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
