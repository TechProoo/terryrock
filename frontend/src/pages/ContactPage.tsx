import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import MetaStrip from '../components/MetaStrip';
import WhatsAppDock from '../components/WhatsAppDock';
import { IconArrow, IconPin, IconPhone, IconMail, IconShare, IconWhatsApp } from '../components/Icons';
import { brand, contact } from '../data/site';
import { contactPage } from '../data/contactPage';
import './ContactPage.css';

gsap.registerPlugin(useGSAP);

/** Strips spacing and punctuation so a printed number still dials. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/* A maps *search* rather than a pin: the premises have street addresses but no
   published coordinates, so this hands the address to the map the same way a
   reader would type it, instead of asserting a location we don't have. An
   office that carries its own `map` query is a listed place, and that query is
   what opens its listing — see the note on it in site.ts. */
const mapHref = (office: { lines: readonly string[]; map?: string }) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.map ?? office.lines.join(', '))}`;

export default function ContactPage() {
  const { eyebrow, headline, lede, hero, facts, whatsapp, form, direct, steps, premises, band } =
    contactPage;
  const { offices, phones, emails, socials } = contact;

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState({
    name: '',
    company: '',
    sector: form.sectors[0],
    scope: '',
  });

  const set = (key: keyof typeof fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((current) => ({ ...current, [key]: event.target.value }));

  /* No server sits behind this site, so the enquiry is composed here and handed
     to the reader's own mail client. It is a real href rather than a scripted
     navigation: the address shows on hover, the link can be copied or opened in
     a new window, and it survives the submit handler never running. */
  const body = [
    `Name: ${fields.name}`,
    `Company: ${fields.company || '—'}`,
    `Sector: ${fields.sector}`,
    '',
    'Works:',
    fields.scope,
  ].join('\n');

  const mailtoHref = `mailto:${emails[0]}?subject=${encodeURIComponent(
    form.subject,
  )}&body=${encodeURIComponent(body)}`;

  /* Validation stays with the browser, so an incomplete enquiry gets the native
     prompt rather than silently opening a half-empty mail. */
  const guard = (event: React.MouseEvent) => {
    if (!formRef.current?.reportValidity()) event.preventDefault();
  };

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.ct__title span span', { yPercent: 108, duration: 1.1, stagger: 0.09 })
          .from('.ct__eyebrow', { opacity: 0, duration: 0.6 }, 0.15)
          .from('.ct__lede', { opacity: 0, y: 16, duration: 0.8 }, 0.45)
          .from('.ct__quick', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.55)
          .from('.ct__fact', { opacity: 0, y: 14, duration: 0.7, stagger: 0.07 }, 0.66);
      });
    },
    { scope: heroRef },
  );

  return (
    <div className="ct">
      <Header />

      <main className="ct__main">
        {/* -- Hero ------------------------------------------------------- */}
        <section className="ct__heroWrap shell" ref={heroRef}>
          <div className="ct__hero">
            <img className="ct__heroImg" src={hero.image} alt={hero.alt} />
            <div className="ct__heroVeil" aria-hidden="true" />

            <div className="ct__heroCopy">
              <p className="micro ct__eyebrow">{eyebrow}</p>
              <h1 className="ct__title">
                {headline.map((line, i) => (
                  <span key={line}>
                    <span className={i === headline.length - 1 ? 'c-sand' : ''}>{line}</span>
                  </span>
                ))}
              </h1>
              <p className="ct__lede">{lede}</p>

              <div className="ct__quickRow">
                <a className="pill pill--solid ct__quick" href={`mailto:${emails[0]}`}>
                  {emails[0]}
                  <IconArrow />
                </a>
                <a className="pill pill--outline ct__quick" href={telHref(phones[0])}>
                  {phones[0]}
                </a>
              </div>
            </div>

            {/* Quiet counters along the foot of the card, opposite the copy. */}
            <ul className="ct__facts" aria-hidden="true">
              {facts.map((fact) => (
                <li className="ct__fact" key={fact.label}>
                  <span className="ct__factValue">{fact.value}</span>
                  <span className="ct__factLabel">{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -- Enquiry + direct ------------------------------------------- */}
        <section className="ct__reach shell">
          <form className="ct__form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <p className="micro ct__formEyebrow">{form.eyebrow}</p>
            <h2 className="ct__formTitle">
              {form.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>

            <div className="ct__pair">
              <label className="ct__field">
                <span className="ct__label">{form.fields.name}</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={fields.name}
                  onChange={set('name')}
                />
              </label>

              <label className="ct__field">
                <span className="ct__label">{form.fields.company}</span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={fields.company}
                  onChange={set('company')}
                />
              </label>
            </div>

            <label className="ct__field">
              <span className="ct__label">{form.fields.sector}</span>
              <select name="sector" value={fields.sector} onChange={set('sector')}>
                {form.sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </label>

            <label className="ct__field">
              <span className="ct__label">{form.fields.scope}</span>
              <textarea
                name="scope"
                rows={5}
                required
                placeholder={form.fields.scopePlaceholder}
                value={fields.scope}
                onChange={set('scope')}
              />
            </label>

            <a className="pill pill--solid ct__submit" href={mailtoHref} onClick={guard}>
              {form.submit}
              <IconArrow />
            </a>
            <p className="ct__note">{form.note}</p>
          </form>

          <aside className="ct__direct">
            <p className="micro ct__formEyebrow">{direct.eyebrow}</p>
            <h2 className="ct__directTitle">{direct.title}</h2>

            {/* The fastest line, given its own row rather than buried in a list. */}
            <a
              className="ct__wa"
              href={`https://wa.me/${whatsapp.number}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="ct__waIcon" aria-hidden="true">
                <IconWhatsApp size={16} />
              </span>
              <span className="ct__waText">
                <span className="ct__waLabel">{direct.whatsappLabel}</span>
                <span className="ct__waHint">{direct.whatsappHint}</span>
              </span>
              <IconArrow size={13} />
            </a>

            <div className="ct__group">
              <p className="micro ct__groupLabel">
                <IconPhone size={12} />
                {direct.phoneLabel}
              </p>
              <ul className="ct__chips">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a className="tag ct__chip" href={telHref(phone)}>
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ct__group">
              <p className="micro ct__groupLabel">
                <IconMail size={12} />
                {direct.emailLabel}
              </p>
              <ul className="ct__links">
                {emails.map((email) => (
                  <li key={email}>
                    <a className="ct__link ct__link--mail" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ct__group">
              <p className="micro ct__groupLabel">
                <IconShare size={12} />
                {direct.socialLabel}
              </p>
              <ul className="ct__links">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      className="ct__link"
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span className="ct__linkName">{social.label}</span>
                      {social.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* -- What happens next ------------------------------------------ */}
        <section className="ct__steps shell">
          <p className="micro ct__eyebrow">{steps.eyebrow}</p>
          <ol className="ct__stepList">
            {steps.items.map((step, i) => (
              <li className="ct__step" key={step.title}>
                <span className="ct__stepNum">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ct__stepTitle">{step.title}</h3>
                <p className="ct__stepBody">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* -- Band ------------------------------------------------------- */}
        <section className="ct__band shell">
          <div className="ct__bandFrame">
            <img src={band.image} alt={band.alt} />
            <div className="ct__bandVeil" aria-hidden="true" />
            <p className="micro ct__bandCaption">{band.caption}</p>
          </div>
        </section>

        {/* -- Premises --------------------------------------------------- */}
        <section className="ct__premises shell">
          <header className="ct__premisesHead">
            <div>
              <p className="micro ct__eyebrow">{premises.eyebrow}</p>
              <h2 className="ct__premisesTitle">
                {premises.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
            <p className="ct__premisesLede">{premises.lede}</p>
          </header>

          <ol className="ct__ledger">
            {offices.map((office, i) => (
              <li key={office.lines[0]} className="ct__row">
                <span className="micro ct__rowNum">{String(i + 1).padStart(2, '0')}</span>

                <div className="ct__rowPlace">
                  <h3 className="ct__rowCity">{office.city}</h3>
                  <p className="micro ct__rowRole">{office.role}</p>
                </div>

                <address className="ct__rowAddress">
                  <span className="ct__rowStreet">{office.lines[0]}</span>
                  <span className="ct__rowLocality">{office.lines.slice(1).join(' · ')}</span>
                </address>

                <a
                  className="ct__rowMap"
                  href={mapHref(office)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <IconPin size={13} />
                  <span>{premises.directions}</span>
                </a>
              </li>
            ))}
          </ol>

          <p className="ct__registry">
            <span>
              {brand.legalName} · {brand.rc}
            </span>
            <span>{brand.formerly}</span>
          </p>
        </section>

        <div className="ct__back shell">
          <Link className="pill pill--outline" to="/">
            Back to home
          </Link>
        </div>
      </main>

      <footer className="section">
        <MetaStrip variant="footer" />
      </footer>

      <WhatsAppDock />
    </div>
  );
}
