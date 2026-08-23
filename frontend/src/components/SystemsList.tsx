import { useRef } from 'react';
import useCursorPreview from '../hooks/useCursorPreview';
import { systemsPage } from '../data/systemsPage';
import './SystemsList.css';

/**
 * The thirteen disciplines as an editorial list, each row carrying a
 * photograph that follows the pointer. The behaviour lives in
 * `useCursorPreview`; on touch the same photographs appear as thumbnails in
 * the rows themselves, so nothing is hidden.
 */
export default function SystemsList() {
  const { list } = systemsPage;
  const root = useRef<HTMLElement>(null);

  useCursorPreview(root, { row: '.sl__row', preview: '.sl__preview' });

  return (
    <section className="sl" ref={root}>
      <div className="sl__head shell">
        <div>
          <p className="micro sl__eyebrow">{list.eyebrow}</p>
          <h2 className="sl__title">
            {list.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <p className="sl__hint" aria-hidden="true">
          {list.hint}
        </p>
      </div>

      <ul className="sl__rows shell" role="list">
        {list.items.map((item, i) => (
          <li className="sl__row" key={item.title}>
            {/* Fixed to the viewport and moved by GSAP, so it can leave the row. */}
            <img className="sl__preview" src={item.image} alt="" aria-hidden="true" />

            <span className="sl__num">{String(i + 1).padStart(2, '0')}</span>

            <span className="sl__body">
              <span className="sl__rowTitle">{item.title}</span>
              <span className="sl__rowText">{item.body}</span>
            </span>

            {/* Touch and reduced-motion fallback for the floating preview. */}
            <span className="sl__thumb">
              <img src={item.image} alt={item.alt} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
