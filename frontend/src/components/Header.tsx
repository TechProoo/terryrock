import { useCallback, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandMark from './BrandMark';
import MenuOverlay from './MenuOverlay';
import { IconMenu, IconX } from './Icons';
import { nav } from '../data/site';
import { menu } from '../data/menu';
import './Header.css';

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  /* Closing hands focus back to the control that opened it, and a stable
     identity keeps the overlay's listeners from re-binding every render. */
  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  /* The live location rather than the one the route curtain is showing: a
     reader who clicks a pill should see it take straight away, while the
     curtain is still closing over the page they are leaving. */
  const isCurrent = (to: string) => to === pathname;

  const pill = (item: { label: string; to: string }) => (
    <Link
      key={item.label}
      className={`pill pill--glass hdr__pill${isCurrent(item.to) ? ' is-current' : ''}`}
      to={item.to}
      aria-current={isCurrent(item.to) ? 'page' : undefined}
    >
      {item.label}
    </Link>
  );

  return (
    <>
      <header className="hdr">
        <div className="hdr__inner">
          <Link className="hdr__brand" to="/" aria-label="TerryRock — home">
            {/* The one mark a reader looks for to know whose site this is, so
                it is sized against the viewport rather than pinned at a size
                that only suits one. The floor is what the narrow bar can hold
                beside the menu chip; the ceiling is what the wide one can
                carry without the mark outweighing the pills. */}
            <BrandMark height="clamp(52px, 4.2vw, 68px)" reserve={56} />
          </Link>

          <nav className="hdr__group hdr__group--left" aria-label="Primary">
            {nav.left.map(pill)}
          </nav>

          <div className="hdr__group hdr__group--right">
            <button
              className={`hdr__menu${open ? ' is-open' : ''}`}
              type="button"
              ref={menuButton}
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-label={open ? menu.close : menu.open}
            >
              <span className="hdr__menuIcon">
                {open ? <IconX size={14} /> : <IconMenu size={15} />}
              </span>
              <span className="hdr__menuLabel">{menu.label}</span>
            </button>

            <nav className="hdr__group hdr__sub" aria-label="Secondary">
              {nav.right.map(pill)}
            </nav>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={close} />
    </>
  );
}
