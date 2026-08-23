import { useEffect } from 'react';
import { useLocation, type Location } from 'react-router-dom';

/**
 * Router-aware scrolling. Landing-page navigation is anchor based, so arriving
 * at a route carrying a hash has to scroll to that section once it has mounted;
 * arriving without one starts at the top rather than keeping the previous
 * route's scroll position.
 *
 * Behind the route curtain the rendered location lags the real one, so the
 * showing location is passed in — scrolling on the real one would jerk the
 * outgoing page to the top while it is still on screen.
 */
export default function ScrollToHash({ location }: { location?: Location }) {
  const live = useLocation();
  const { pathname, hash } = location ?? live;

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    /* The target section may mount a frame after the route does. */
    const id = window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
