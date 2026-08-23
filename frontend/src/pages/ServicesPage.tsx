import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import MetaStrip from '../components/MetaStrip';
import Contact from '../components/Contact';
import SurveyBooking from '../components/SurveyBooking';
import { IconArrow } from '../components/Icons';
import useReveal from '../hooks/useReveal';
import { quality, clients as clientData } from '../data/site';
import { servicesPage } from '../data/servicesPage';
import './ServicesPage.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServicesPage() {
  const { hero, areas, capacity, standard, clients, closer } = servicesPage;
  const page = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* The shared Contact section is built out of `.reveal` elements. */
  useReveal();

  /* The hero is a composition of floating plates, so they arrive in the order
     the eye reads them: headline, then the panel opposite, then the foot. */
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.sv__titleLine span', { yPercent: 110, duration: 1.05, stagger: 0.08 })
          .from('.sv__cta', { opacity: 0, y: 14, duration: 0.7 }, 0.5)
          .from('.sv__tag', { opacity: 0, y: 14, duration: 0.6, stagger: 0.06 }, 0.3)
          .from('.sv__note', { opacity: 0, y: 22, duration: 0.8 }, 0.42)
          .from('.sv__plate', { opacity: 0, y: 22, duration: 0.8, stagger: 0.08 }, 0.56);
      });
    },
    { scope: heroRef },
  );

  /* The rest of the page arrives on scroll rather than all at once.
     Three moves, applied by class so a new section only needs the right one:

       .sv-lines  headings, revealed a line at a time from behind a mask
       .sv-rise   cards and plates, lifted in on a stagger within their group
       .sv-drift  photographs, drifting slowly against the scroll

     ScrollTrigger caches positions on creation and this page is built out of
     photographs, so a refresh follows the last of them loading. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.sv-lines').forEach((heading) => {
          gsap.from(heading.querySelectorAll('span'), {
            yPercent: 112,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: heading, start: 'top 86%' },
          });
        });

        /* Grouped by parent, so each row staggers on its own rather than the
           whole page counting through one long sequence. */
        const groups = new Set(
          gsap.utils.toArray<HTMLElement>('.sv-rise').map((el) => el.parentElement),
        );
        groups.forEach((group) => {
          if (!group) return;
          gsap.from(group.querySelectorAll('.sv-rise'), {
            y: 46,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 84%' },
          });
        });

        gsap.utils.toArray<HTMLElement>('.sv-drift').forEach((frame) => {
          const image = frame.querySelector('img');
          if (!image) return;
          gsap.fromTo(
            image,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });
      });

      let timer = 0;
      const refresh = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 140);
      };
      const pending = Array.from(document.images).filter((img) => !img.complete);
      pending.forEach((img) => {
        img.addEventListener('load', refresh, { once: true });
        img.addEventListener('error', refresh, { once: true });
      });

      return () => {
        window.clearTimeout(timer);
        pending.forEach((img) => {
          img.removeEventListener('load', refresh);
          img.removeEventListener('error', refresh);
        });
      };
    },
    { scope: page },
  );

  return (
    <div className="sv" ref={page}>
      <Header />

      <main className="sv__main">
        {/* -- Hero ------------------------------------------------------- */}
        <section className="sv__heroWrap shell" ref={heroRef}>
          <div className="sv__hero">
            <img className="sv__heroImg" src={hero.image} alt={hero.alt} />
            <div className="sv__heroVeil" aria-hidden="true" />

            <div className="sv__heroGrid">
              {/* Top left: the headline, with the action on the last line. */}
              <div className="sv__lead">
                {/* The reference's micro labels, set as a row above the headline
                   rather than inside its lines — in a line that both clips for
                   the reveal and wraps, they broke the headline apart. */}
                <p className="sv__flags">
                  {hero.flags.map((flag) => (
                    <span key={flag}>{flag}</span>
                  ))}
                </p>

                <h1 className="sv__title">
                  {hero.headline.map((line, i) => (
                    <span className="sv__titleLine" key={line.text}>
                      <span className={line.ring ? 'sv__ring' : undefined}>{line.text}</span>
                      {i === hero.headline.length - 1 ? (
                        <a className="pill pill--solid sv__cta" href={hero.cta.href}>
                          {hero.cta.label}
                          <IconArrow size={13} />
                        </a>
                      ) : null}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Top right: topics, then a plate of policy. */}
              <div className="sv__panel">
                <div className="sv__tags">
                  {hero.tags.map((tag) => (
                    <span className="tag sv__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="sv__note">
                  <div className="sv__noteText">
                    <h2 className="sv__noteTitle">{hero.note.title}</h2>
                    <p className="sv__noteBody">{hero.note.body}</p>
                  </div>
                  <span className="sv__noteThumb">
                    <img src={hero.note.image} alt={hero.note.alt} />
                  </span>
                </div>
              </div>

              {/* Foot: a plate, a counter and a closing line, sharing one row so
                 they cannot land on top of each other. */}
              <div className="sv__foot">
                <div className="sv__aside sv__plate">
                  <div className="sv__asideText">
                    <h2 className="sv__asideTitle">{hero.aside.title}</h2>
                    <p className="sv__asideBody">{hero.aside.body}</p>
                    <Link className="sv__more" to={hero.aside.href}>
                      {hero.aside.link}
                      <IconArrow size={12} />
                    </Link>
                  </div>
                  <span className="sv__asideThumb">
                    <img src={hero.aside.image} alt={hero.aside.alt} />
                  </span>
                </div>

                <div className="sv__proof sv__plate">
                  <span className="sv__faces" aria-hidden="true">
                    {hero.proof.faces.map((face, i) => (
                      <span className="sv__face" key={i}>
                        <img src={face.image} alt="" />
                      </span>
                    ))}
                  </span>
                  <span className="sv__proofValue">{hero.proof.value}</span>
                  <span className="sv__proofLabel">
                    {hero.proof.label.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </div>

                <div className="sv__closerNote sv__plate">
                  <p>{hero.closer.body}</p>
                  <Link className="sv__more" to={hero.closer.href}>
                    {hero.closer.link}
                    <IconArrow size={12} />
                  </Link>
                </div>
              </div>
              {/* A slow ring of text, the ornament the references keep using. */}
              <span className="sv__badge" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <path
                      id="sv-badge-path"
                      d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                      fill="none"
                    />
                  </defs>
                  <text>
                    <textPath href="#sv-badge-path">{hero.badge.repeat(2)}</textPath>
                  </text>
                </svg>
                <span className="sv__badgeDot" />
              </span>

            </div>
          </div>
        </section>

        {/* -- Areas of work ---------------------------------------------- */}
        <section className="sv__areas shell">
          <header className="sv__areasHead">
            <div>
              <p className="micro sv__eyebrow">{areas.eyebrow}</p>
              <h2 className="sv__sectionTitle sv-lines">
                {areas.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
            <div className="sv__areasAside">
              <p className="sv__sectionLede">{areas.lede}</p>
              <Link className="pill pill--outline sv__areasLink" to={areas.link.href}>
                {areas.link.label}
                <IconArrow size={13} />
              </Link>
            </div>
          </header>

          <ul className="sv__areaGrid" role="list">
            {areas.items.map((item) => (
              <li className="sv__area sv-rise" key={item.title}>
                <div className="sv__areaFrame sv-drift">
                  <img src={item.image} alt={item.alt} />
                  <span className="sv__areaTag">{item.tag}</span>
                </div>
                <h3 className="sv__areaTitle">{item.title}</h3>
                <p className="sv__areaBody">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -- Capacity ---------------------------------------------------- */}
        <section className="sv__capacity shell">
          <header className="sv__capHead">
            <div>
              <p className="micro sv__eyebrow">{capacity.eyebrow}</p>
              <h2 className="sv__sectionTitle sv-lines">
                {capacity.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
          </header>

          <div className="sv__mosaic">
            {/* A photograph carrying the disciplines as pills. */}
            <figure className="sv__tagged sv-rise">
              <span className="sv__taggedFrame sv-drift">
                <img src={capacity.tagged.image} alt={capacity.tagged.alt} />
              </span>
              <span className="sv__taggedVeil" aria-hidden="true" />
              <span className="sv__taggedTags">
                {capacity.tags.map((tag) => (
                  <span className="tag sv__capTag" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
              <figcaption className="sv__taggedCaption">{capacity.tagged.caption}</figcaption>
            </figure>

            {capacity.stats.map((stat) => (
              <Link className="sv__stat sv-rise" to={stat.href} key={stat.value}>
                <span className="sv__statValue">{stat.value}</span>
                <span className="sv__statLabel">{stat.label}</span>
                <IconArrow size={13} className="sv__statArrow" />
              </Link>
            ))}

            {/* Arch-topped, the shape the hotel reference uses for its cluster. */}
            <span className="sv__arch sv-rise sv-drift">
              <img src={capacity.tall.image} alt={capacity.tall.alt} />
            </span>

            <span className="sv__wide sv-rise sv-drift">
              <img src={capacity.wide.image} alt={capacity.wide.alt} />
            </span>

            <div className="sv__capNote sv-rise">
              <p>{capacity.note.body}</p>
              <Link className="sv__more" to={capacity.note.href}>
                {capacity.note.link}
                <IconArrow size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* -- Survey scheduler -------------------------------------------- */}
        <SurveyBooking />

        {/* -- The standard ------------------------------------------------ */}
        <section className="sv__standard shell">
          <p className="micro sv__eyebrow">{standard.eyebrow}</p>
          <h2 className="sv__sectionTitle sv-lines">
            {standard.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          {/* The company's own quality statement, not a claim written here. */}
          <p className="sv__standardLede">{quality.lede}</p>

          <div className="sv__standardGrid">
            {quality.columns.map((block) => (
              <div className="sv__block sv-rise" key={block.label}>
                <p className="micro sv__blockLabel">{block.label}</p>
                <ul className="sv__blockList">
                  {block.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="sv__block sv-rise">
              <p className="micro sv__blockLabel">{quality.pillars.label}</p>
              <ul className="sv__blockList">
                {quality.pillars.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sv__band sv-drift">
            <img src={standard.band.image} alt={standard.band.alt} />
            <span className="sv__bandVeil" aria-hidden="true" />
            <p className="sv__bandNote">{quality.policy}</p>
          </div>
        </section>

        {/* -- Clients ----------------------------------------------------- */}
        <section className="sv__clients shell">
          <header className="sv__clientsHead">
            <div>
              <p className="micro sv__eyebrow">{clients.eyebrow}</p>
              <h2 className="sv__sectionTitle sv-lines">
                {clients.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
            <p className="sv__sectionLede">{clients.lede}</p>
          </header>

          <ul className="sv__names" role="list">
            {clientData.names.map((name) => (
              <li className="sv__name sv-rise" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </section>

        {/* -- Closer ------------------------------------------------------ */}
        <section className="sv__closer shell">
          <h2 className="sv__closerTitle sv-lines">
            {closer.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="sv__closerBody">{closer.body}</p>
          <a className="pill pill--solid sv__closerCta" href={closer.cta.href}>
            {closer.cta.label}
            <IconArrow size={13} />
          </a>
        </section>

        <Contact />
      </main>

      <footer className="section">
        <MetaStrip variant="footer" />
      </footer>
    </div>
  );
}
