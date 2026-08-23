import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { systemsPage } from '../data/systemsPage';
import './SystemsList.css';

gsap.registerPlugin(useGSAP);

/**
 * The thirteen disciplines as an editorial list, after GreenSock's
 * cursor-tracking image preview demo (demos.gsap.com/demo/cursor-tracking-image-preview).
 *
 * Each row carries its own photograph, parked off screen until the pointer
 * enters the row. `gsap.quickTo` drives x and y — it reuses one tween per
 * property instead of spawning one per mousemove, which is what keeps a
 * pointer-rate handler cheap.
 *
 * Pointer-driven and therefore desktop-only: on touch the same photographs
 * appear as thumbnails in the rows themselves, so nothing is hidden.
 */
export default function SystemsList() {
  const { list } = systemsPage;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* No hover, no preview — and a reduced-motion reader gets the thumbnails
         rather than something chasing their cursor. */
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        /* Centring has to be xPercent/yPercent, not a CSS translate: GSAP
           resolves an existing translate into x/y, and the pointer tween would
           then overwrite the very offset that centres the image. */
        gsap.set('.sl__preview', { xPercent: -50, yPercent: -50, scale: 0.92 });

        const rows = gsap.utils.toArray<HTMLElement>('.sl__row');

        rows.forEach((row) => {
          const image = row.querySelector<HTMLElement>('.sl__preview');
          if (!image) return;

          const setX = gsap.quickTo(image, 'x', { duration: 0.4, ease: 'power3' });
          const setY = gsap.quickTo(image, 'y', { duration: 0.4, ease: 'power3' });

          /* First move of a new row jumps rather than travelling across the
             page: quickTo takes a start value as its second argument. */
          let entering = false;
          const align = (event: MouseEvent) => {
            if (entering) {
              setX(event.clientX, event.clientX);
              setY(event.clientY, event.clientY);
              entering = false;
            } else {
              setX(event.clientX);
              setY(event.clientY);
            }
          };

          const stopFollow = () => document.removeEventListener('mousemove', align);
          const fade = gsap.to(image, {
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            paused: true,
            duration: 0.28,
            onReverseComplete: stopFollow,
          });

          const onEnter = (event: MouseEvent) => {
            entering = true;
            fade.play();
            document.addEventListener('mousemove', align);
            align(event);
          };
          const onLeave = () => fade.reverse();

          row.addEventListener('mouseenter', onEnter);
          row.addEventListener('mouseleave', onLeave);

          return () => {
            stopFollow();
            row.removeEventListener('mouseenter', onEnter);
            row.removeEventListener('mouseleave', onLeave);
          };
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="sl" ref={root}>
      <div className="sl__head shell">
        <div>
          <p className="micro sl__eyebrow">{list.eyebrow}</p>
          <h2 className="sl__title">
            {list.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <p className="sl__hint" aria-hidden="true">
          {list.hint}
        </p>
      </div>

      <ul className="sl__rows shell" role="list">
        {list.items.map((item, i) => (
          <li className="sl__row" key={item.title}>
            {/* Fixed to the viewport and moved by GSAP, so it can leave the row. */}
            <img className="sl__preview" src={item.image} alt="" aria-hidden="true" />

            <span className="sl__num">{String(i + 1).padStart(2, '0')}</span>

            <span className="sl__body">
              <span className="sl__rowTitle">{item.title}</span>
              <span className="sl__rowText">{item.body}</span>
            </span>

            {/* Touch and reduced-motion fallback for the floating preview. */}
            <span className="sl__thumb">
              <img src={item.image} alt={item.alt} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
