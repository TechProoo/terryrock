import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IconWhatsApp, IconArrow, IconX } from './Icons';
import { contactPage } from '../data/contactPage';
import './WhatsAppDock.css';

gsap.registerPlugin(useGSAP);

/**
 * A WhatsApp dock: a resting button that opens into a small composer.
 *
 * The message is written here and handed to WhatsApp through a wa.me link, so
 * whatever the reader types arrives already in the thread rather than as an
 * empty "hi". Nothing is sent from this page.
 */
export default function WhatsAppDock() {
  const { whatsapp } = contactPage;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);

  const href = `https://wa.me/${whatsapp.number}${
    message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ''
  }`;

  const close = useCallback(() => setOpen(false), []);

  /* Escape, and a click anywhere that is not the dock. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onDown = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open, close]);

  /* Grows out of the button rather than appearing over it. */
  useGSAP(
    () => {
      if (!panel.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          still: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { motion } = context.conditions as { motion: boolean };

          if (!open) {
            gsap.set(panel.current, { autoAlpha: 0, y: 12, scale: 0.96 });
            return;
          }

          gsap.fromTo(
            panel.current,
            { autoAlpha: 0, y: motion ? 12 : 0, scale: motion ? 0.96 : 1 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: motion ? 0.42 : 0.001,
              ease: 'expo.out',
              transformOrigin: 'bottom right',
            },
          );

          if (motion) {
            gsap.fromTo(
              '.wa__stagger',
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'expo.out', delay: 0.06 },
            );
          }
        },
      );
    },
    { dependencies: [open], scope: root },
  );

  /* Opening should land the caret in the field, not leave it on the button. */
  useEffect(() => {
    if (open) window.setTimeout(() => field.current?.focus(), 220);
  }, [open]);

  return (
    <div className={`wa${open ? ' is-open' : ''}`} ref={root}>
      <div className="wa__panel" ref={panel} role="dialog" aria-label={whatsapp.title}>
        <header className="wa__head wa__stagger">
          <span className="wa__avatar" aria-hidden="true">
            <IconWhatsApp size={17} />
          </span>
          <span className="wa__ident">
            <span className="wa__name">{whatsapp.subtitle}</span>
            <span className="wa__status">{whatsapp.title}</span>
          </span>
          <button type="button" className="wa__close" onClick={close} aria-label={whatsapp.close}>
            <IconX size={13} />
          </button>
        </header>

        <p className="wa__intro wa__stagger">{whatsapp.intro}</p>

        <div className="wa__presets wa__stagger">
          {whatsapp.presets.map((preset) => (
            <button
              type="button"
              key={preset}
              className="wa__preset"
              onClick={() => {
                setMessage(preset);
                field.current?.focus();
              }}
            >
              {preset}
            </button>
          ))}
        </div>

        <label className="wa__field wa__stagger">
          <span className="wa__srOnly">{whatsapp.placeholder}</span>
          <textarea
            ref={field}
            rows={3}
            value={message}
            placeholder={whatsapp.placeholder}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <a
          className="wa__send wa__stagger"
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={close}
        >
          {whatsapp.send}
          <IconArrow size={13} />
        </a>

        <p className="wa__number wa__stagger">{whatsapp.display}</p>
      </div>

      <button
        type="button"
        className="wa__fab"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? whatsapp.close : whatsapp.open}
      >
        <span className="wa__fabIcon" aria-hidden="true">
          {open ? <IconX size={17} /> : <IconWhatsApp size={21} />}
        </span>
      </button>
    </div>
  );
}
