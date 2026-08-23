import SectionHead from './SectionHead';
import { clients } from '../data/site';
import './Clients.css';

export default function Clients() {
  const { headline, lede, banner, names } = clients;

  return (
    <section className="section cli" id="clients">
      <div className="shell">
        <SectionHead headline={headline} lede={lede} titleClassName="cli__title" />

        <div className="frame cli__banner reveal">
          <img src={banner.image} alt={banner.alt} />
        </div>

        <ul className="cli__wall reveal">
          {names.map((name) => (
            <li key={name} className="cli__cell">
              <span className="cli__name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
