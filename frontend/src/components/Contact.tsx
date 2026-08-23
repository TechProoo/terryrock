import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { IconArrow, IconPin } from './Icons';
import { brand, contact } from '../data/site';
import './Contact.css';

const toneClass: Record<string, string> = {
  plain: '',
  dim: 'c-dim',
  sand: 'c-sand',
};

/** Strips spacing and punctuation so a printed number still dials. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/* A maps *search* rather than a pin: the premises have street addresses but no
   published coordinates, so this hands the address to the map the same way a
   reader would type it, instead of asserting a location we don't have. */
const mapHref = (lines: readonly string[]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lines.join(', '))}`;

export default function Contact() {
  const { headline, lede, offices, phones, emails, socials } = contact;

  return (
    <section className="section ctc" id="contact">
      <div className="shell">
        {/* -- Masthead: the invitation left, the action opposite ------------ */}
        <div className="ctc__masthead">
          <div className="ctc__intro reveal">
            <BrandMark className="ctc__mark" height={34} decorative />

            <h2 className="ctc__title">
              {headline.map((line, i) => (
                <span key={i} className="section__titleLine">
                  {line.map((clause, j) => (
                    <span key={j} className={toneClass[clause.tone]}>
                      {clause.text}
                      {j < line.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <p className="ctc__lede">{lede}</p>
          </div>

          <div className="ctc__call reveal">
            <p className="micro ctc__callLabel">Start here</p>
            <p className="ctc__callText">{brand.tagline}</p>

            {/* The contact page is the fuller answer than a blank mail draft:
                it carries the enquiry form, the premises and WhatsApp. The
                addresses are still listed below for anyone who wants one. */}
            <Link className="pill pill--solid ctc__callBtn" to="/contact">
              Start a conversation
              <IconArrow />
            </Link>

            <a className="ctc__direct" href={telHref(phones[0])}>
              <span className="micro ctc__directLabel">Or call the office</span>
              <span className="ctc__directNumber">{phones[0]}</span>
            </a>
          </div>
        </div>

        {/* -- Premises ledger ----------------------------------------------- */}
        <div className="ctc__premises">
          <p className="micro ctc__blockLabel">Premises</p>

          <ol className="ctc__ledger">
            {offices.map((office, i) => (
              <li key={office.lines[0]} className="ctc__row reveal">
                <span className="micro ctc__rowNum">{String(i + 1).padStart(2, '0')}</span>

                <div className="ctc__rowPlace">
                  <h3 className="ctc__rowCity">{office.city}</h3>
                  <p className="micro ctc__rowRole">{office.role}</p>
                </div>

                <address className="ctc__rowAddress">
                  <span className="ctc__rowStreet">{office.lines[0]}</span>
                  <span className="ctc__rowLocality">{office.lines.slice(1).join(' · ')}</span>
                </address>

                <a
                  className="ctc__rowMap"
                  href={mapHref(office.lines)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <IconPin size={13} />
                  <span>Directions</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* -- Ways in ------------------------------------------------------- */}
        <div className="ctc__reach">
          <div className="ctc__group reveal">
            <p className="micro ctc__groupLabel">Phone</p>
            {/* Four numbers that ring the same company read as a set, so they
                sit as a wrapped row of chips rather than a ranked list. */}
            <ul className="ctc__chips">
              {phones.map((phone) => (
                <li key={phone}>
                  <a className="tag ctc__chip" href={telHref(phone)}>
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ctc__group reveal">
            <p className="micro ctc__groupLabel">Email</p>
            {/* The written channel the CTA points at, so it is set brightest. */}
            <ul className="ctc__links">
              {emails.map((email) => (
                <li key={email}>
                  <a className="ctc__link ctc__link--mail" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ctc__group reveal">
            <p className="micro ctc__groupLabel">Social</p>
            <ul className="ctc__links">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="ctc__link"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="ctc__linkName">{social.label}</span>
                    {social.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="ctc__registry">
          <span>
            {brand.legalName} · {brand.rc}
          </span>
          <span>{brand.formerly}</span>
        </p>
      </div>
    </section>
  );
}
