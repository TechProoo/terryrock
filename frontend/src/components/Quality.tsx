import SectionHead from './SectionHead';
import { quality } from '../data/site';
import './Quality.css';

export default function Quality() {
  const { headline, lede, policy, banner, columns, pillars } = quality;

  return (
    <section className="section qly" id="quality">
      <div className="shell">
        <SectionHead headline={headline} lede={lede} titleClassName="qly__title" />

        <p className="qly__policy reveal">{policy}</p>

        <div className="frame qly__banner reveal">
          <img src={banner.image} alt={banner.alt} />
        </div>

        <div className="qly__grid">
          {columns.map((column) => (
            <div key={column.label} className="qly__col reveal">
              <p className="micro qly__colLabel">{column.label}</p>
              <ul className="qly__list">
                {column.items.map((item) => (
                  <li key={item} className="qly__listItem">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="qly__col qly__col--pillars reveal">
            <p className="micro qly__colLabel">{pillars.label}</p>
            <ul className="qly__list qly__list--lead">
              {pillars.items.map((item) => (
                <li key={item} className="qly__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
