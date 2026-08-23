import SectionHead from './SectionHead';
import { services } from '../data/site';
import './Services.css';

export default function Services() {
  const { headline, lede, gallery, items, kitImage, kitImageAlt, kitLabel, kit } = services;

  return (
    <section className="section svc" id="services">
      <div className="shell">
        <SectionHead headline={headline} lede={lede} titleClassName="svc__title" />

        <div className="svc__gallery reveal">
          {gallery.map((shot) => (
            <figure key={shot.caption} className="svc__shot">
              <div className="frame svc__shotFrame">
                <img src={shot.image} alt={shot.alt} />
              </div>
              <figcaption className="micro svc__shotCaption">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <ol className="svc__grid">
          {items.map((item, i) => (
            <li key={item.title} className="svc__item reveal">
              <span className="micro svc__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="svc__name">{item.title}</h3>
              <p className="svc__body">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="svc__kit reveal">
          <div className="frame svc__kitFrame">
            <img src={kitImage} alt={kitImageAlt} />
          </div>

          <div className="svc__kitBody">
            <p className="micro svc__kitLabel">{kitLabel}</p>
            <ul className="svc__kitList">
              {kit.map((tool) => (
                <li key={tool} className="tag svc__kitItem">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
