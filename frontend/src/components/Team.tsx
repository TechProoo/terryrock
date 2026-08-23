import { useRef } from 'react';
import useCursorPreview from '../hooks/useCursorPreview';
import SectionHead from './SectionHead';
import { team } from '../data/site';
import './Team.css';

export default function Team() {
  const { headline, lede, banner, people } = team;
  const list = useRef<HTMLUListElement>(null);

  /* Hovering a name brings up the work that role is responsible for. */
  useCursorPreview(list, { row: '.tm__row', preview: '.tm__preview' });

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

        <ul className="tm__list" ref={list}>
          {people.map((person, i) => (
            <li key={person.name} className="tm__row reveal">
              {/* Fixed to the viewport and moved by GSAP, so it can leave the row. */}
              <img className="tm__preview" src={person.image} alt="" aria-hidden="true" />

              <span className="micro tm__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="tm__name">{person.name}</span>
              <span className="tm__role">{person.role}</span>
              <span className="tm__qual">{person.qualification}</span>

              {/* Touch and reduced-motion fallback for the floating preview. */}
              <span className="tm__thumb">
                <img src={person.image} alt={person.alt} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
