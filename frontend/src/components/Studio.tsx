import BrandMark from './BrandMark';
import { studio } from '../data/site';
import './Studio.css';

const toneClass: Record<string, string> = {
  plain: '',
  dim: 'c-dim',
  sand: 'c-sand',
};

export default function Studio() {
  const { headline, lede, card, feature, pitch } = studio;

  return (
    <section className="section std" id="studio">
      <div className="shell">
        <div className="section__head reveal">
          <BrandMark className="section__mark" height={40} decorative />

          <h2 className="std__title">
            {headline.map((line, i) => (
              <span key={i} className="std__titleLine">
                {line.map((clause, j) => (
                  <span key={j} className={toneClass[clause.tone]}>
                    {clause.text}
                    {j < line.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <p className="section__lede">{lede}</p>
        </div>

        <div className="std__stage">
          {/* Small card, bottom-left */}
          <article className="std__card reveal">
            <div className="frame std__cardFrame">
              <img src={card.image} alt={card.imageAlt} />
            </div>
            <p className="std__cardMeta">
              <span className="std__cardCompany">{card.title}</span>
              {card.subtitle.map((line) => (
                <span key={line} className="std__cardName">
                  {line}
                </span>
              ))}
            </p>
          </article>

          {/* Tall feature */}
          <div className="std__feature reveal">
            <div className="frame std__featureFrame">
              <img src={feature.image} alt={feature.imageAlt} />
            </div>
          </div>

          {/* Pitch column */}
          <div className="std__pitch reveal">
            <h3 className="std__pitchTitle">
              {pitch.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>

            <p className="std__pitchBody">{pitch.body}</p>

            <div className="std__actions">
              {pitch.actions.map((action, i) => (
                <a
                  key={action.label}
                  className={`pill ${i === 0 ? 'pill--outline' : 'pill--outline'} std__action`}
                  href={action.href}
                >
                  {action.label}
                </a>
              ))}
            </div>

            <div className="std__proof">
              <div className="std__avatars">
                {pitch.proofImages.map((src, i) => (
                  <span key={i} className="std__avatar">
                    <img src={src} alt="" />
                  </span>
                ))}
              </div>
              <p className="std__proofText">{pitch.proof}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
