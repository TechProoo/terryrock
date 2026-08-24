import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { systemsPage } from '../data/systemsPage';
import './MaterialsGrid.css';

gsap.registerPlugin(useGSAP);

const RADIUS = 210; /* px from the pointer at which a tile stops reacting */
const MAX_SCALE = 1.55;

/**
 * The stock list as a grid that swells under the pointer, after GreenSock's
 * proximity scale grid demo (demos.gsap.com/demo/proximity-scale-grid).
 *
 * Every tile measures its distance from the pointer and maps that onto a
 * scale. `overwrite: true` matters: without it each mousemove would stack
 * another tween onto the same property and the tiles would lag behind the
 * cursor by however many events had queued up.
 */
export default function MaterialsGrid() {
  const { materials } = systemsPage;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const stage = root.current?.querySelector<HTMLElement>('.mg__grid');
        if (!stage) return;

        const tiles = gsap.utils.toArray<HTMLElement>('.mg__tile');
        const toScale = gsap.utils.mapRange(0, RADIUS, 1, 0);
        const clamp = gsap.utils.clamp(0, 1);

        const onMove = (event: MouseEvent) => {
          tiles.forEach((tile) => {
            const box = tile.getBoundingClientRect();
            const distance = Math.hypot(
              event.clientX - (box.left + box.width / 2),
              event.clientY - (box.top + box.height / 2),
            );
            const nearness = clamp(toScale(distance));
            gsap.to(tile, {
              scale: 1 + (MAX_SCALE - 1) * nearness,
              zIndex: Math.round(nearness * 10),
              overwrite: true,
              duration: 0.35,
              ease: 'power2.out',
            });
          });
        };

        const onLeave = () => {
          gsap.to(tiles, {
            scale: 1,
            zIndex: 0,
            overwrite: true,
            duration: 0.7,
            ease: 'power2.out',
          });
        };

        stage.addEventListener('mousemove', onMove);
        stage.addEventListener('mouseleave', onLeave);

        return () => {
          stage.removeEventListener('mousemove', onMove);
          stage.removeEventListener('mouseleave', onLeave);
        };
      });
    },
    { scope: root },
  );

  return (
    <section className="mg" ref={root}>
      <div className="mg__inner shell">
        <header className="mg__head">
          <p className="micro mg__eyebrow">{materials.eyebrow}</p>
          <h2 className="mg__title">
            {materials.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="mg__lede">{materials.lede}</p>
        </header>

        <ul className="mg__grid" role="list">
          {/* Keyed on the image: two tiles now carry the same label. */}
          {materials.tiles.map((tile) => (
            <li className="mg__tile" key={tile.image}>
              <img src={tile.image} alt={tile.alt} />
              <span className="mg__tileLabel">{tile.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
