import { useMemo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { IconArrow, IconWhatsApp } from './Icons';
import { survey } from '../data/servicesPage';
import { contactPage } from '../data/contactPage';
import './SurveyBooking.css';

gsap.registerPlugin(useGSAP);

/** Mon 25 Aug — short enough for a chip, unambiguous in a message. */
const dayName = (date: Date) =>
  date.toLocaleDateString('en-GB', { weekday: 'short' });
const dayNumber = (date: Date) => date.getDate();
const longDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

/**
 * Survey scheduler, after the reference's date-and-time card.
 *
 * It requests a slot rather than claiming one: no calendar sits behind this
 * site, so nothing here can know what is free. The picker composes the request
 * and hands it to WhatsApp, and the copy says so.
 */
export default function SurveyBooking() {
  const root = useRef<HTMLDivElement>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [slotIndex, setSlotIndex] = useState(0);

  /* The next working days from today — computed, so the card is never stale. */
  const days = useMemo(() => {
    const out: Date[] = [];
    const cursor = new Date();
    while (out.length < survey.dayCount) {
      cursor.setDate(cursor.getDate() + 1);
      if (cursor.getDay() !== 0 && cursor.getDay() !== 6) out.push(new Date(cursor));
    }
    return out;
  }, []);

  const month = days[0]?.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) ?? '';
  const chosenDay = days[dayIndex] ?? days[0];
  const chosenSlot = survey.slots[slotIndex];

  const message = chosenDay
    ? `${survey.messagePrefix} ${longDate(chosenDay)}, ${chosenSlot.label} (${chosenSlot.window}).`
    : survey.messagePrefix;

  const href = `https://wa.me/${contactPage.whatsapp.number}?text=${encodeURIComponent(message)}`;

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.sb__rise', {
          y: 44,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="sb shell" ref={root}>
      <header className="sb__head">
        <p className="micro sb__eyebrow">{survey.eyebrow}</p>

        {/* Faces and an action set into the headline, as in the reference. */}
        <h2 className="sb__title">
          <span>{survey.title[0]}</span>
          <span className="sb__faces" aria-hidden="true">
            {survey.faces.map((face, i) => (
              <span className="sb__face" key={i}>
                <img src={face} alt="" />
              </span>
            ))}
          </span>
          <span>{survey.title[1]}</span>
          <a className="sb__inline" href={survey.link.href}>
            {survey.link.label}
            <span className="sb__inlineDot" aria-hidden="true">
              <IconArrow size={12} />
            </span>
          </a>
          <span>{survey.title[2]}</span>
        </h2>
      </header>

      <div className="sb__grid">
        {/* -- The picker ------------------------------------------------- */}
        <div className="sb__card sb__rise">
          <div className="sb__cardTop">
            <p className="sb__cardLabel">{survey.dayLabel}</p>
            <span className="sb__month">{month}</span>
          </div>

          <div className="sb__days" role="group" aria-label={survey.dayLabel}>
            {days.map((day, i) => (
              <button
                type="button"
                key={day.toISOString()}
                className={`sb__day${i === dayIndex ? ' is-on' : ''}`}
                onClick={() => setDayIndex(i)}
                aria-pressed={i === dayIndex}
              >
                <span className="sb__dayName">{dayName(day)}</span>
                <span className="sb__dayNum">{dayNumber(day)}</span>
              </button>
            ))}
          </div>

          <p className="sb__cardLabel sb__cardLabel--slots">{survey.slotLabel}</p>

          <div className="sb__slots" role="group" aria-label={survey.slotLabel}>
            {survey.slots.map((slot, i) => (
              <button
                type="button"
                key={slot.label}
                className={`sb__slot${i === slotIndex ? ' is-on' : ''}`}
                onClick={() => setSlotIndex(i)}
                aria-pressed={i === slotIndex}
              >
                <span className="sb__slotDot" aria-hidden="true" />
                <span className="sb__slotName">{slot.label}</span>
                <span className="sb__slotWindow">{slot.window}</span>
              </button>
            ))}
          </div>
        </div>

        {/* -- The request ------------------------------------------------ */}
        <div className="sb__side sb__rise">
          <p className="sb__body">{survey.body}</p>

          <p className="sb__chosen" aria-live="polite">
            <span className="micro sb__chosenLabel">{survey.chosenLabel}</span>
            {chosenDay ? `${longDate(chosenDay)} · ${chosenSlot.window}` : '—'}
          </p>

          <a className="sb__go" href={href} target="_blank" rel="noreferrer noopener">
            <IconWhatsApp size={15} />
            {survey.cta}
            <IconArrow size={13} />
          </a>

          <p className="sb__hint">{survey.hint}</p>
        </div>

        {/* -- The counter, as in the reference --------------------------- */}
        <div className="sb__stat sb__rise">
          <span className="sb__statValue">{survey.stat.value}</span>
          <span className="sb__statLabel">{survey.stat.label}</span>
        </div>
      </div>
    </section>
  );
}
