import { Link } from 'react-router-dom';
import Header from './Header';
import { IconEye, IconFacebook, IconInstagram, IconPin, IconX } from './Icons';
import { hero } from '../data/site';
import './Hero.css';

const toneClass: Record<string, string> = {
  ink: '',
  steel: 'c-steel',
  'steel-deep': 'c-steel-deep',
};

const socials = [
  { key: 'instagram', label: 'Instagram', Icon: IconInstagram },
  { key: 'facebook', label: 'Facebook', Icon: IconFacebook },
  { key: 'x', label: 'X', Icon: IconX },
];

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
        {socials.map(({ key, label, Icon }) => (
          <a key={key} className="hero__railBtn" href="#contact" aria-label={label}>
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
