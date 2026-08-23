import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { ExpoScaleEase } from 'gsap/EasePack';
import { scrubGallery } from '../data/scrubGallery';
import './ScrubGallery.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, ExpoScaleEase);

/**
 * Scrubbed bento gallery, after GreenSock's demo of the same name
 * (codepen.io/GreenSock/pen/vYMzKZx).
 *
 * The trick is entirely in two CSS states of one grid. At rest the tiles sit
 * in a compact bento; adding `is-final` blows the same grid up far past the
 * viewport. Flip measures both states, builds a tween between them, and
 * ScrollTrigger scrubs that tween against the scrollbar while the section is
 * pinned — so scrolling drives the camera straight through the wall of work.
 */
export default function ScrubGallery() {
  const wrap = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gridEl = grid.current;
      const wrapEl = wrap.current;
      if (!gridEl || !wrapEl) return;

      const items = gridEl.querySelectorAll<HTMLElement>('.sg__item');

      /* Flip measures pixels, so the tween is only correct for the width it
         was built at — it gets rebuilt whenever the layout actually changes.
         `flipCtx` holds the previous build so it can be reverted first. */
      let flipCtx: gsap.Context | undefined;
      let lastWidth = window.innerWidth;

      const build = () => {
        flipCtx?.revert();
        gridEl.classList.remove('is-final');

        flipCtx = gsap.context(() => {
          /* Capture the blown-up state, then drop straight back to the bento
             so the tween runs from what the reader sees to what they don't. */
          gridEl.classList.add('is-final');
          const state = Flip.getState(items);
          gridEl.classList.remove('is-final');

          const flip = Flip.to(state, { simple: true, ease: 'expoScale(1, 5)' });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: gridEl,
                start: 'center center',
                end: '+=100%',
                scrub: true,
                pin: wrapEl,
              },
            })
            .add(flip);

          return () => gsap.set(items, { clearProps: 'all' });
        }, wrapEl);
      };

      /* Mobile browsers fire `resize` every time the URL bar slides, and a
         rebuild on each one would fight the scrub. Only width changes matter. */
      const onResize = () => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        build();
      };

      /* The gallery sits a long way down a page built out of photographs, and
         ScrollTrigger caches its start and end on creation. Measure again once
         the images above have landed, or the pin ends up anchored to a page
         that was hundreds of pixels shorter than the one the reader scrolls. */
      let refreshTimer = 0;
      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
      };

      const pending = Array.from(document.images).filter((img) => !img.complete);
      pending.forEach((img) => {
        img.addEventListener('load', scheduleRefresh, { once: true });
        img.addEventListener('error', scheduleRefresh, { once: true });
      });

      /* Honour a reduced-motion preference: the bento just sits there. */
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        build();
        window.addEventListener('resize', onResize);
        return () => {
          window.clearTimeout(refreshTimer);
          window.removeEventListener('resize', onResize);
          pending.forEach((img) => {
            img.removeEventListener('load', scheduleRefresh);
            img.removeEventListener('error', scheduleRefresh);
          });
          flipCtx?.revert();
        };
      });
    },
    { scope: wrap },
  );

  return (
    <section className="sg" aria-labelledby="sg-title">
      <div className="sg__head shell">
        <p className="micro sg__eyebrow">{scrubGallery.eyebrow}</p>
        <h2 className="sg__title" id="sg-title">
          {scrubGallery.title.map((line) => (
            <span key={line.text} className={line.tone}>
              {line.text}{' '}
            </span>
          ))}
        </h2>
        <p className="sg__lede">{scrubGallery.lede}</p>
      </div>

      <div className="sg__wrap" ref={wrap}>
        <div className="sg__grid" ref={grid}>
          {scrubGallery.items.map((item) => (
            <figure className="sg__item" key={item.alt}>
              <img src={item.image} alt={item.alt} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
