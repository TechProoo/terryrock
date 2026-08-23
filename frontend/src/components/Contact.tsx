import SectionHead from './SectionHead';
import { IconArrow } from './Icons';
import { brand, contact } from '../data/site';
import './Contact.css';

/** Strips spacing and punctuation so a printed number still dials. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export default function Contact() {
  const { headline, lede, offices, phones, emails, socials } = contact;

  return (
    <section className="section ctc" id="contact">
      <div className="shell">
        <SectionHead headline={headline} lede={lede} titleClassName="ctc__title" />

        <div className="ctc__offices">
          {offices.map((office) => (
            <article key={office.label} className="ctc__office reveal">
              <p className="micro ctc__officeLabel">{office.label}</p>
              <address className="ctc__address">
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </article>
          ))}
        </div>

        <div className="ctc__reach">
          <div className="ctc__group reveal">
            <p className="micro ctc__groupLabel">Phone</p>
            <ul className="ctc__links">
              {phones.map((phone) => (
                <li key={phone}>
                  <a className="ctc__link" href={telHref(phone)}>
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ctc__group reveal">
            <p className="micro ctc__groupLabel">Email</p>
            <ul className="ctc__links">
              {emails.map((email) => (
                <li key={email}>
                  <a className="ctc__link" href={`mailto:${email}`}>
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

          <div className="ctc__cta reveal">
            <p className="ctc__ctaText">{brand.tagline}</p>
            <a className="pill pill--solid ctc__ctaBtn" href={`mailto:${emails[0]}`}>
              Start a conversation
              <IconArrow />
            </a>
            <p className="ctc__registry">
              {brand.legalName} · {brand.rc}
              <span>{brand.formerly}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
