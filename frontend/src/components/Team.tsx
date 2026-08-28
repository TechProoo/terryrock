import SectionHead from './SectionHead';
import { IconAvatar } from './Icons';
import { team } from '../data/site';
import './Team.css';

export default function Team() {
  const { headline, lede, banner, people } = team;

  return (
    <section className="section tm" id="team">
      <div className="shell">
        <SectionHead headline={headline} lede={lede} titleClassName="tm__title" />

        <figure className="tm__banner reveal">
          <div className="frame tm__bannerFrame">
            <img src={banner.image} alt={banner.alt} />
          </div>
          <figcaption className="micro tm__bannerCaption">{banner.caption}</figcaption>
        </figure>

        <ul className="tm__list">
          {people.map((person, i) => (
            <li key={person.name} className="tm__row reveal">
              <span className="micro tm__index">{String(i + 1).padStart(2, '0')}</span>

              {/* One mark for everyone on the roster, so it stands for the seat
                 rather than the face. Decorative: the name beside it is what
                 the row is read out as. */}
              <span className="tm__avatar" aria-hidden="true">
                <IconAvatar />
              </span>

              <span className="tm__name">{person.name}</span>
              <span className="tm__role">{person.role}</span>
              <span className="tm__qual">{person.qualification}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
