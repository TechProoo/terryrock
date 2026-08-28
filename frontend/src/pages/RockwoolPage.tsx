import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import MetaStrip from '../components/MetaStrip';
import Contact from '../components/Contact';
import useReveal from '../hooks/useReveal';
import { rockwoolPage } from '../data/rockwoolPage';
import './RockwoolPage.css';

gsap.registerPlugin(useGSAP);

export default function RockwoolPage() {
  const { eyebrow, lede, cta, hero, stats, forms, material, uses, coverage, faq, closer } =
    rockwoolPage;
  const heroRef = useRef<HTMLElement>(null);

  /* Everything below the fold is a `.reveal`, including the shared Contact
     section, which stays hidden until this runs. */
  useReveal();

  /* One arrival sequence, on the hero only. The rest of the page is long-form
     reading — a reader who came here from a search result is looking for an
     answer, and a section that has to be scrolled into existence gets in the
     way of finding one. */
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.rwh__word', { yPercent: 26, opacity: 0, duration: 1.15, stagger: 0.1 })
          /* The roll arrives after the word it stands inside, so the gap reads
             as a gap first and is filled second. */
          .from('.rwh__roll', { opacity: 0, y: 34, scale: 0.94, duration: 1.1 }, 0.34)
          .from('.rwh__note', { opacity: 0, duration: 0.7, stagger: 0.05 }, 0.62)
          .from('.rwh__eyebrow', { opacity: 0, duration: 0.6 }, 0.3)
          .from('.rwh__lede', { opacity: 0, y: 16, duration: 0.8 }, 0.5)
          .from('.rwh__cta', { opacity: 0, y: 16, duration: 0.8 }, 0.56)
          .from('.rw__stat', { opacity: 0, y: 20, duration: 0.8, stagger: 0.08 }, 0.66);
      });
    },
    { scope: heroRef },
  );

  return (
    <div className="rw">
      <Header />

      <main className="rw__main">
        <section className="rwh__wrap shell" ref={heroRef}>
          <div className="rwh">
            {/* The stock list running up the left edge, clipped by the card.
                Doubled so the loop has a second copy to hand off to. */}
            <div className="rwh__column" aria-hidden="true">
              <ul className="rwh__columnTrack">
                {[...hero.column, ...hero.column].map((word, i) => (
                  <li key={`${word}-${i}`}>{word}</li>
                ))}
              </ul>
            </div>

            {hero.notes.map((note, i) => (
              <p className={`rwh__note rwh__note--${i + 1}`} key={note.join(' ')} aria-hidden="true">
                {note.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            ))}

            {/* One word, split, with the roll standing in the gap. */}
            <h1 className="rwh__title">
              <span className="rwh__word">{hero.words[0]}</span>
              <span className="rwh__word">
                {hero.words[1]}
                <sup className="rwh__marker">{hero.marker}</sup>
              </span>
            </h1>

            <div className="rwh__roll">
              <img src={hero.image} alt={hero.alt} />
            </div>

            <div className="rwh__foot">
              <p className="micro rwh__eyebrow">{eyebrow}</p>
              <Link className="pill pill--ink rwh__cta" to={cta.href}>
                {cta.label}
              </Link>
            </div>
          </div>

          <p className="rwh__lede">{lede}</p>

          <div className="rw__stats">
            {stats.map((stat) => (
              <div className="rw__stat" key={stat.value}>
                <span className="rw__statValue">{stat.value}</span>
                <span className="rw__statLabel">
                  {stat.label.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* -- The three forms ------------------------------------------- */}
        <section className="section rw__forms">
          <div className="shell">
            <div className="section__head reveal">
              <p className="micro section__mark">{forms.eyebrow}</p>
              <h2 className="section__titleLine rw__h2">
                {forms.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p className="section__lede">{forms.lede}</p>
            </div>

            <ul className="rw__formList">
              {forms.items.map((item) => (
                <li className="rw__form reveal" key={item.label}>
                  <div className="frame rw__formFrame">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                  </div>
                  <h3 className="rw__formLabel">{item.label}</h3>
                  <p className="rw__formBody">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -- Why the material ------------------------------------------ */}
        <section className="section rw__material">
          <div className="shell">
            <div className="section__head reveal">
              <p className="micro section__mark">{material.eyebrow}</p>
              <h2 className="section__titleLine rw__h2">
                {material.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p className="section__lede">{material.lede}</p>
            </div>

            <ul className="rw__points">
              {material.points.map((point) => (
                <li className="rw__point reveal" key={point.label}>
                  <h3 className="rw__pointLabel">{point.label}</h3>
                  <p className="rw__pointBody">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -- Applications ---------------------------------------------- */}
        <section className="section rw__uses">
          <div className="shell">
            <div className="section__head reveal">
              <p className="micro section__mark">{uses.eyebrow}</p>
              <h2 className="section__titleLine rw__h2">
                {uses.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>

            <ul className="rw__useList">
              {uses.items.map((use) => (
                <li className="rw__use reveal" key={use.label}>
                  <h3 className="rw__useLabel">{use.label}</h3>
                  <p className="rw__useBody">{use.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -- Coverage --------------------------------------------------- */}
        <section className="section rw__coverage">
          <div className="shell rw__coverageInner">
            <div className="frame rw__coverageFrame reveal">
              <img src={coverage.image} alt={coverage.alt} loading="lazy" />
            </div>

            <div className="rw__coverageBody reveal">
              <p className="micro section__mark">{coverage.eyebrow}</p>
              <h2 className="section__titleLine rw__h2">
                {coverage.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p className="rw__coverageCopy">{coverage.body}</p>
              <ul className="rw__places">
                {coverage.places.map((place) => (
                  <li className="tag rw__place" key={place}>
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* -- Questions --------------------------------------------------
            Answers are in the markup rather than behind a toggle: the same
            five pairs are written into the page's structured data, and a
            reader who arrived on one of these questions should find the
            answer already on screen. */}
        <section className="section rw__faq">
          <div className="shell">
            <div className="section__head reveal">
              <p className="micro section__mark">{faq.eyebrow}</p>
              <h2 className="section__titleLine rw__h2">
                {faq.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>

            <dl className="rw__faqList">
              {faq.items.map((item) => (
                <div className="rw__qa reveal" key={item.question}>
                  <dt className="rw__q">{item.question}</dt>
                  <dd className="rw__a">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="rw__closer shell">
          <h2 className="rw__closerTitle">
            {closer.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="rw__closerBody">{closer.body}</p>
          <Link className="pill pill--solid rw__closerCta" to={closer.cta.href}>
            {closer.cta.label}
          </Link>
        </section>

        <div className="rw__back shell">
          <Link className="pill pill--outline" to="/systems">
            Every material we hold
          </Link>
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
