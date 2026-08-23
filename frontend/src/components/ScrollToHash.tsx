import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Router-aware scrolling. Landing-page navigation is anchor based, so arriving
 * at a route carrying a hash has to scroll to that section once it has mounted;
 * arriving without one starts at the top rather than keeping the previous
 * route's scroll position.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

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
