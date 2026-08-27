import { Link } from 'react-router-dom';
import Header from './Header';
import { IconEye, IconPin, IconTikTok } from './Icons';
import { contact, hero } from '../data/site';
import './Hero.css';

const toneClass: Record<string, string> = {
  ink: '',
  steel: 'c-steel',
  'steel-deep': 'c-steel-deep',
};

/* The rail used to be a hand-written trio — Instagram, Facebook and an X the
   company never had — all three pointing at the contact anchor. It advertised
   accounts that did not answer. It is drawn from the contact record now, and
   an account with no icon here simply does not appear, so the rail cannot
   claim a platform the data does not carry. */
const socialIcons: Record<string, typeof IconTikTok | undefined> = {
  TikTok: IconTikTok,
};

const socials = contact.socials.flatMap((social) => {
  const Icon = socialIcons[social.label];
  return Icon ? [{ ...social, Icon }] : [];
});

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Header />

      <div className="hero__glow" aria-hidden="true" />
      <p className="hero__wordmark" aria-hidden="true">
        {hero.wordmark}
      </p>

      <div className="hero__scene">
        <img src={hero.image} alt={hero.imageAlt} />
      </div>
      <div className="hero__floor" aria-hidden="true" />

      <div className="hero__rail">
        {socials.map(({ label, href, handle, Icon }) => (
          <a
            key={label}
            className="hero__railBtn"
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${label}, ${handle}`}
          >
            <Icon />
          </a>
        ))}
      </div>

      <div className="hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            {hero.headline.map((line, i) => (
              <span key={i}>
                {line.map((clause, j) => (
                  <span key={j} className={toneClass[clause.tone]}>
                    {clause.text}
                    {j < line.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <Link className="pill pill--solid hero__cta" to="/projects">
            {hero.cta}
          </Link>
        </div>

        <div className="hero__aside">
          <div className="hero__note">
            <p className="hero__noteTitle">
              {hero.asideTitle.map((line) => (
                <span key={line} style={{ display: 'block' }}>
                  {line}
                </span>
              ))}
            </p>
            <p className="hero__noteBody">{hero.asideBody}</p>
          </div>

          <div className="hero__cards">
            {hero.cards.map((card) => (
              <a key={card.href + card.icon} className="hero__card" href={card.href}>
                <span className="hero__cardIcon">
                  {card.icon === 'pin' ? <IconPin size={17} /> : <IconEye size={17} />}
                </span>
                <span className="hero__cardTitle">
                  {card.title.map((line) => (
                    <span key={line} style={{ display: 'block' }}>
                      {line}
                    </span>
                  ))}
                </span>
                <span className="hero__cardBody">{card.body}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
