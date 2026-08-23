import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { IconMenu } from './Icons';
import { nav } from '../data/site';
import './Header.css';

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <Link className="hdr__brand" to="/" aria-label="TerryRock — home">
          <BrandMark height={38} />
        </Link>

        <nav className="hdr__group hdr__group--left" aria-label="Primary">
          {nav.left.map((item) => (
            <Link key={item.label} className="pill pill--glass" to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__group hdr__group--right">
          <button className="hdr__menu" type="button" aria-label="Open menu">
            <span className="hdr__menuIcon">
              <IconMenu size={15} />
            </span>
            <span className="hdr__menuLabel">Menu</span>
          </button>

          <nav className="hdr__group hdr__sub" aria-label="Secondary">
            {nav.right.map((item) => (
              <Link key={item.label} className="pill pill--glass" to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
