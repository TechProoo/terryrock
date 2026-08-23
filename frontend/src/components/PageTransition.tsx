import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandMark from './BrandMark';
import { brand, routeLabels } from '../data/site';
import './PageTransition.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COLUMNS = 6;

type Props = {
  /** Rendered with the location the curtain is currently showing. */
  children: (location: Location) => ReactNode;
};

/**
 * Cinematic route curtain.
 *
 * React Router would swap the page the instant a link is clicked, which leaves
 * nothing to cover. So the rendered location lags behind the real one: the
 * curtain closes over the page the reader is leaving, the swap happens while
 * the screen is covered, and the curtain lifts on the page they asked for.
 *
 * The columns run in one direction throughout — they grow from the bottom and
 * leave through the top — so the whole thing reads as a single pass of a
 * shutter rather than a panel that bounces back the way it came.
 */
export default function PageTransition({ children }: Props) {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);

  const curtain = useRef<HTMLDivElement>(null);
  /* What the curtain is showing, held in a ref as well as state: the effect
     below must not list `displayed` as a dependency, or committing the swap
     would tear its own timeline down halfway through. */
  const shown = useRef(location.pathname);

  const name = routeLabels[location.pathname] ?? brand.legalName;

  /* Arrival. The curtain is already covering in CSS, so the first paint is the
     curtain rather than a flash of the page behind it — this only takes it
     away. It has to run whatever the motion preference is, or the page would
     stay hidden. */
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const t = (seconds: number) => (reduced ? 0.001 : seconds);

      gsap
        .timeline({ defaults: { ease: 'power4.inOut' } })
        .set('.pt__col', { transformOrigin: '50% 0%' })
        .to('.pt__label', { autoAlpha: 0, y: -12, duration: t(0.42), ease: 'power2.in' }, t(0.45))
        .to('.pt__col', { scaleY: 0, duration: t(0.68), stagger: t(0.05) }, '-=0.18')
        .set(curtain.current, { pointerEvents: 'none' });
    },
    { scope: curtain },
  );

  /* Departure and arrival, in one pass. */
  useEffect(() => {
    if (location.pathname === shown.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = (seconds: number) => (reduced ? 0.001 : seconds);

    const timeline = gsap
      .timeline({
        defaults: { ease: 'power4.inOut' },
        /* The incoming page measured itself against a layout that only exists
           now the curtain has gone; pinned triggers need telling. */
        onComplete: () => ScrollTrigger.refresh(),
      })
      .set(curtain.current, { pointerEvents: 'auto' })
      .set('.pt__col', { transformOrigin: '50% 100%', scaleY: 0 })
      .set('.pt__label', { autoAlpha: 0, y: 12 })
      .to('.pt__col', { scaleY: 1, duration: t(0.44), stagger: t(0.035) })
      .to('.pt__label', { autoAlpha: 1, y: 0, duration: t(0.32), ease: 'expo.out' }, '-=0.2')
      /* Covered: swap the page. Done a beat before the lift so React has painted
         by the time anything shows. ScrollToHash puts the reader back at the
         top off the back of this, which is the same instant. */
      .add(() => {
        shown.current = location.pathname;
        setDisplayed(location);
      })
      /* The plate is the point of the whole thing — it holds long enough to be
         read, not just glimpsed. */
      .to('.pt__label', { autoAlpha: 0, y: -12, duration: t(0.28), ease: 'power2.in' }, '+=0.3')
      .set('.pt__col', { transformOrigin: '50% 0%' })
      .to('.pt__col', { scaleY: 0, duration: t(0.48), stagger: t(0.035) }, '-=0.14')
      .set(curtain.current, { pointerEvents: 'none' });

    /* A second navigation mid-pass kills this one and starts over, rather than
       being dropped and leaving the URL ahead of the page. */
    return () => {
      timeline.kill();
    };
  }, [location]);

  return (
    <>
      {children(displayed)}

      <div className="pt" ref={curtain} aria-hidden="true">
        <div className="pt__cols">
          {Array.from({ length: COLUMNS }, (_, i) => (
            <span className="pt__col" key={i} />
          ))}
        </div>

        <div className="pt__label">
          <BrandMark className="pt__mark" height={30} decorative />
          <span className="pt__rule" />
          <span className="pt__name">{name}</span>
        </div>
      </div>
    </>
  );
}
