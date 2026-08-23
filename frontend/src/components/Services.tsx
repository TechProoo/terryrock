import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SectionHead from './SectionHead';
import { services } from '../data/site';
import './Services.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Services() {
  const { headline, lede, gallery, items, kitImage, kitImageAlt, kitLabel, kit } = services;
  const grid = useRef<HTMLOListElement>(null);

  /**
   * Scrubbed line reveal on the register, after GreenSock's autoSplit demo
   * (codepen.io/GreenSock/pen/GggpRoB).
   *
   * Every entry's number, name and body are split into lines, each line sitting
   * inside its own clipped wrapper, and the lines are scrubbed up out of that
   * clip as the entry crosses the viewport — so the index writes itself in as
   * the reader scrolls rather than fading in as a block.
   */
  useGSAP(
    () => {
      const gridEl = grid.current;
      if (!gridEl) return;

      /* Honour a reduced-motion preference: the register is just text. */
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const splits: SplitText[] = [];
        let cancelled = false;

        /* Splitting before the display face lands measures line breaks against
           the fallback and gets them wrong; `autoSplit` re-splits on any later
           reflow, and returning the tween from `onSplit` rebuilds it with the
           new lines instead of leaving it bound to reverted nodes. */
        document.fonts.ready.then(() => {
          if (cancelled) return;

          gridEl.querySelectorAll<HTMLElement>('.svc__item').forEach((item) => {
            const text = item.querySelectorAll<HTMLElement>('.svc__num, .svc__name, .svc__body');

            splits.push(
              SplitText.create(text, {
                type: 'words,lines',
                mask: 'lines',
                linesClass: 'svc__line',
                autoSplit: true,
                onSplit: (instance) =>
                  gsap.from(instance.lines, {
                    yPercent: 120,
                    stagger: 0.08,
                    scrollTrigger: {
                      trigger: item,
                      scrub: true,
                      /* `clamp()` keeps entries that are already on screen at
                         load — or sitting in the last viewport of the page —
                         from being stranded mid-tween. */
                      start: 'clamp(top 90%)',
                      end: 'clamp(top 52%)',
                    },
                  }),
              }),
            );
          });
        });

        return () => {
          cancelled = true;
          splits.forEach((split) => split.revert());
        };
      });
    },
    { scope: grid },
  );

  return (
    <section className="section svc" id="services">
      <div className="shell">
        <SectionHead headline={headline} lede={lede} titleClassName="svc__title" />

        <div className="svc__gallery reveal">
          {gallery.map((shot) => (
            <figure key={shot.caption} className="svc__shot">
              <div className="frame svc__shotFrame">
                <img src={shot.image} alt={shot.alt} />
              </div>
              <figcaption className="micro svc__shotCaption">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <ol className="svc__grid" ref={grid}>
          {items.map((item, i) => (
            <li key={item.title} className="svc__item">
              <span className="micro svc__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="svc__name">{item.title}</h3>
              <p className="svc__body">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="svc__kit reveal">
          <div className="frame svc__kitFrame">
            <img src={kitImage} alt={kitImageAlt} />
          </div>

          <div className="svc__kitBody">
            <p className="micro svc__kitLabel">{kitLabel}</p>
            <ul className="svc__kitList">
              {kit.map((tool) => (
                <li key={tool} className="tag svc__kitItem">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
