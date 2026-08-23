import { useEffect } from 'react';

/**
 * Adds `is-in` to every `.reveal` element once it scrolls into view.
 * One observer for the whole page; elements are unobserved after firing so the
 * animation never replays.
 *
 * `deps` re-runs the observer when the set of `.reveal` nodes changes — a
 * filtered list, for instance, mounts new cards that would otherwise never be
 * observed and would sit at `opacity: 0` forever.
 */
export default function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
