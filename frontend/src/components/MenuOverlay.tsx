import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BrandMark from './BrandMark';
import { IconX, IconArrow, IconPhone, IconMail } from './Icons';
import { contact as contactDetails } from '../data/site';
import { menu } from '../data/menu';
import './MenuOverlay.css';

gsap.registerPlugin(useGSAP);

/** Strips spacing and punctuation so a printed number still dials. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen menu. Hovering a route swaps the photograph behind it — the same
 * move the sector carousel makes, so the gesture is already familiar by the
 * time a reader finds it here.
 *
 * Kept mounted rather than conditionally rendered, so closing can animate out
 * instead of vanishing.
 */
export default function MenuOverlay({ open, onClose }: Props) {
  const { pathname } = useLocation();
  const { phones, emails, socials } = contactDetails;

  const root = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  /* Which photograph is showing: the hovered route, or the current one at rest. */
  const currentIndex = Math.max(
    menu.items.findIndex((item) => item.to === pathname),
    0,
  );
  const [hovered, setHovered] = useState<number | null>(null);

  /* Opening and closing clears the hover, so the menu always opens showing the
     page the reader is on. Adjusted during render rather than in an effect —
     there is no second pass to paint the stale photograph. */
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    setHovered(null);
  }

  const preview = hovered ?? currentIndex;

  /* Escape closes, and the page behind must not scroll under the overlay. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const t = (seconds: number) => (reduced ? 0.001 : seconds);

      if (open) {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .set(root.current, { autoAlpha: 1, pointerEvents: 'auto' })
          .fromTo('.mn__sheet', { yPercent: -101 }, { yPercent: 0, duration: t(0.72) })
          .fromTo(
            '.mn__stagger',
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: t(0.7), stagger: t(0.055) },
            '-=0.4',
          )
          /* Focus belongs at the end of the timeline, not on a timer. `autoAlpha`
             holds the staggered rows at `visibility: hidden` until they animate
             in, and focus() on a hidden element fails silently. */
          .add(() => closeButton.current?.focus());
      } else {
        gsap
          .timeline({ defaults: { ease: 'power3.inOut' } })
          .to('.mn__stagger', { autoAlpha: 0, y: 14, duration: t(0.22), stagger: t(0.02) })
          .to('.mn__sheet', { yPercent: -101, duration: t(0.5) }, '-=0.1')
          .set(root.current, { autoAlpha: 0, pointerEvents: 'none' });
      }
    },
    { dependencies: [open], scope: root },
  );

  return (
    <div
      className="mn"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={menu.title}
      aria-hidden={!open}
    >
      <div className="mn__sheet">
        <div className="mn__bg" aria-hidden="true">
          {menu.items.map((item, i) => (
            <img
              key={item.to}
              className={`mn__bgImg${i === preview ? ' is-active' : ''}`}
              src={item.image}
              alt=""
            />
          ))}
          <span className="mn__veil" />
        </div>

        <div className="mn__inner shell">
          <header className="mn__top mn__stagger">
            <BrandMark height={32} decorative />
            <button
              type="button"
              className="mn__close"
              ref={closeButton}
              onClick={onClose}
              aria-label={menu.close}
            >
              <span>{menu.closeShort}</span>
              <IconX size={13} />
            </button>
          </header>

          <nav className="mn__nav" aria-label={menu.navLabel}>
            {/* Leaving the list hands the photograph back to the current page. */}
            <ul onMouseLeave={() => setHovered(null)}>
              {menu.items.map((item, i) => {
                const current = item.to === pathname;
                return (
                  <li className="mn__item mn__stagger" key={item.to}>
                    <Link
                      to={item.to}
                      className={`mn__link${current ? ' is-current' : ''}`}
                      onClick={onClose}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      aria-current={current ? 'page' : undefined}
                    >
                      <span className="mn__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mn__labelWrap">
                        <span className="mn__label">{item.label}</span>
                        <span className="mn__note">{item.note}</span>
                      </span>
                      <IconArrow size={16} className="mn__arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <footer className="mn__foot mn__stagger">
            <p className="micro mn__footLabel">{menu.reachLabel}</p>

            <div className="mn__reach">
              <ul className="mn__chips">
                {phones.slice(0, 2).map((phone) => (
                  <li key={phone}>
                    <a className="tag mn__chip" href={telHref(phone)}>
                      <IconPhone size={11} />
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a className="tag mn__chip" href={`mailto:${emails[0]}`}>
                    <IconMail size={11} />
                    {emails[0]}
                  </a>
                </li>
              </ul>

              <ul className="mn__socials">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer noopener">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
