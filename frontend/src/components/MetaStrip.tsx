import { metaStrip } from '../data/site';
import './MetaStrip.css';

type Props = {
  /** Extra top/bottom padding when used as the page footer. */
  variant?: 'top' | 'footer';
};

export default function MetaStrip({ variant = 'top' }: Props) {
  return (
    <div className={`meta meta--${variant}`}>
      <div className="meta__inner shell">
        <div className="meta__tags">
          {metaStrip.tags.map((tag) => (
            <span key={tag} className="pill pill--outline micro meta__tag">
              {tag}
            </span>
          ))}
        </div>

        <dl className="meta__facts">
          {metaStrip.facts.map((fact) => (
            <div key={fact.label} className="meta__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
