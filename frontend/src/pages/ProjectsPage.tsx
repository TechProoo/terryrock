import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MetaStrip from '../components/MetaStrip';
import Contact from '../components/Contact';
import { IconArrow, IconChevron, IconInfo } from '../components/Icons';
import { projectsPage } from '../data/projectsPage';
import useReveal from '../hooks/useReveal';
import './ProjectsPage.css';

const ALL = 'all';

export default function ProjectsPage() {
  const {
    headline,
    lede,
    cta,
    hero,
    feature,
    secondary,
    closer,
    filterLabel,
    allLabel,
    categories,
    items,
    showcase,
  } = projectsPage;

  const [filter, setFilter] = useState<string>(ALL);
  /* Which project inside the current selection the stage is showing. */
  const [active, setActive] = useState(0);

  const shown = useMemo(
    () => (filter === ALL ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  /* A new selection always opens on its first project. */
  useEffect(() => setActive(0), [filter]);

  const count = shown.length;
  const current = shown[Math.min(active, count - 1)] ?? items[0];
  const step = (delta: number) => setActive((i) => (i + delta + count) % count);
  const peek = (offset: number) => shown[(active + offset) % count] ?? items[0];

  /* The stage's pill row is a sliding window, so a 24-project selection shows
     the same handful of chips a four-project one does. */
  const windowStart = Math.min(Math.max(active - 1, 0), Math.max(count - 4, 0));
  const windowed = shown.slice(windowStart, windowStart + 4);

  const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? '';
  const countFor = (id: string) => items.filter((item) => item.category === id).length;
  const thumbFor = (id: string) => items.find((item) => item.category === id) ?? items[0];

  /* Re-runs the reveal observer whenever the filtered set changes, so cards
     that mount after a filter change animate in rather than staying hidden. */
  useReveal([filter]);

  return (
    <div className="pp">
      <Header />

      <main className="pp__main">
        {/* -- Hero card ------------------------------------------------- */}
        <section className="pp__heroWrap shell">
          <div className="pp__hero">
            <img className="pp__heroImg" src={hero.image} alt={hero.alt} />
            <div className="pp__heroVeil" aria-hidden="true" />

            {/* The filter row sits in a notch punched out of the hero's
               top-right corner, so the chips read as part of the card rather
               than as a toolbar floating above it. */}
            <div className="pp__notch">
              <div className="pp__filters" role="group" aria-label={filterLabel}>
                <button
                  type="button"
                  className={`pp__filter${filter === ALL ? ' is-active' : ''}`}
                  onClick={() => setFilter(ALL)}
                  aria-pressed={filter === ALL}
                >
                  {allLabel}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`pp__filter${filter === category.id ? ' is-active' : ''}`}
                    onClick={() => setFilter(category.id)}
                    aria-pressed={filter === category.id}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pp__heroCopy">
              <h1 className="pp__title">
                {headline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="pp__lede">{lede}</p>
              <a className="pill pill--solid pp__cta" href={cta.href}>
                {cta.label}
              </a>
            </div>
          </div>
        </section>

        {/* -- Three cards, as in the reference --------------------------- */}
        <section className="pp__cards shell">
          <article className="pp__feature reveal">
            <img className="pp__featureImg" src={feature.image} alt={feature.alt} />
            <div className="pp__featureBody">
              <span className="tag pp__featureTag">{feature.tag}</span>
              <h2 className="pp__featureTitle">
                {feature.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <span className="pp__featureLink">{feature.link}</span>
            </div>
          </article>

          <article className="pp__secondary reveal">
            <div className="pp__secondaryHead">
              <div>
                <h2 className="pp__secondaryTitle">{secondary.title}</h2>
                <p className="pp__secondaryBody">{secondary.body}</p>
              </div>
              <span className="pp__secondaryBtn" aria-hidden="true">
                <IconArrow />
              </span>
            </div>
            <img className="pp__secondaryImg" src={secondary.image} alt={secondary.alt} />
          </article>

          <article className="pp__closer reveal">
            <h2 className="pp__closerTitle">{closer.title}</h2>
            <p className="pp__closerBody">{closer.body}</p>
            <div className="pp__closerFrame">
              <img src={closer.image} alt={closer.alt} />
              {closer.spots.map((spot) => (
                <span
                  key={spot.label}
                  className="pp__spot"
                  style={{ top: spot.top, left: spot.left }}
                  title={spot.label}
                >
                  <span className="pp__spotDot" aria-hidden="true" />
                  <span className="pp__spotLabel">{spot.label}</span>
                </span>
              ))}
            </div>
          </article>
        </section>

        {/* -- Showcase panel -------------------------------------------- */}
        <section className="pb shell" aria-live="polite">
          <div className="pb__grid">
            {/* Left rail: mark, a second view of the selection, and a note. */}
            <div className="pb__rail reveal">
              <p className="pb__wordmark">{showcase.wordmark}</p>

              <div className="pb__railFrame">
                <img src={peek(1).image} alt={peek(1).alt} />
              </div>

              <div className="pb__note">
                <h2 className="pb__noteTitle">
                  {showcase.note.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                <p className="pb__noteBody">{showcase.note.body}</p>
              </div>
            </div>

            {/* Stage: the project currently selected. */}
            <article className="pb__stage reveal">
              <img className="pb__stageImg" src={current.image} alt={current.alt} />
              <div className="pb__stageVeil" aria-hidden="true" />

              <div className="pb__stageTop">
                <button
                  type="button"
                  className="pb__round"
                  onClick={() => step(-1)}
                  aria-label={showcase.prevLabel}
                >
                  <IconArrow size={16} />
                </button>

                <div className="pb__steps">
                  {windowed.map((item) => {
                    const index = shown.indexOf(item);
                    return (
                      <button
                        key={item.title}
                        type="button"
                        className={`pb__step${index === active ? ' is-active' : ''}`}
                        onClick={() => setActive(index)}
                        aria-label={item.title}
                        aria-current={index === active}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>

                <a className="pb__contact" href={showcase.contact.href}>
                  {showcase.contact.label}
                </a>
              </div>

              <p className="micro pb__stageTag">{labelFor(current.category)}</p>
              <h2 className="pb__stageTitle">{current.title}</h2>

              <div className="pb__stageFoot">
                <div className="pb__credit">
                  <span className="pb__faces" aria-hidden="true">
                    {[1, 2, 3].map((offset) => (
                      <span key={offset} className="pb__face">
                        <img src={peek(offset).image} alt="" />
                      </span>
                    ))}
                  </span>
                  <span className="pb__creditLabel">{showcase.creditLabel}</span>
                </div>

                <button type="button" className="pb__next" onClick={() => step(1)}>
                  <span className="pb__nextLabel">
                    {showcase.nextPrefix} {peek(1).title}
                  </span>
                  <span className="pb__nextThumb" aria-hidden="true">
                    <img src={peek(1).image} alt="" />
                  </span>
                </button>
              </div>
            </article>

            {/* Right rail: the disciplines, with the live project counts. */}
            <div className="pb__rail pb__rail--list reveal">
              <div className="pb__listHead">
                <h2 className="pb__listTitle">{showcase.listTitle}</h2>
                <span className="pb__info" title={showcase.listHint}>
                  <IconInfo size={15} />
                  <span className="pb__srOnly">{showcase.listHint}</span>
                </span>
              </div>

              <ul className="pb__list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      className={`pb__row${filter === category.id ? ' is-active' : ''}`}
                      onClick={() => setFilter(category.id)}
                      aria-pressed={filter === category.id}
                    >
                      <span className="pb__rowThumb">
                        <img src={thumbFor(category.id).image} alt="" />
                      </span>
                      <span className="pb__rowText">
                        <span className="pb__rowTitle">{category.label}</span>
                        <span className="pb__rowSub">
                          {countFor(category.id)} {showcase.unitLabel}
                        </span>
                      </span>
                      <IconChevron size={13} className="pb__chev" />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`pb__all${filter === ALL ? ' is-active' : ''}`}
                onClick={() => setFilter(ALL)}
                aria-pressed={filter === ALL}
              >
                {showcase.exploreAll}
              </button>

              <a className="pb__explore" href={showcase.contact.href}>
                <img src={peek(2).image} alt={peek(2).alt} />
                <span className="pb__exploreVeil" aria-hidden="true" />
                <span className="pb__exploreLabel">{showcase.exploreLabel}</span>
              </a>
            </div>
          </div>
        </section>

        <div className="pp__back shell">
          <Link className="pill pill--outline" to="/">
            Back to home
          </Link>
        </div>

        <Contact />
      </main>

      <footer className="section">
        <MetaStrip variant="footer" />
      </footer>
    </div>
  );
}
