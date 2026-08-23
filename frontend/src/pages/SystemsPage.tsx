import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import MetaStrip from '../components/MetaStrip';
import Contact from '../components/Contact';
import SystemsList from '../components/SystemsList';
import SystemsStack from '../components/SystemsStack';
import MaterialsGrid from '../components/MaterialsGrid';
import useReveal from '../hooks/useReveal';
import { systemsPage } from '../data/systemsPage';
import './SystemsPage.css';

gsap.registerPlugin(useGSAP);

export default function SystemsPage() {
  const { eyebrow, headline, lede, cta, hero, stats, closer } = systemsPage;
  const heroRef = useRef<HTMLElement>(null);

  /* The shared Contact section is built out of `.reveal` elements, which stay
     hidden until this runs. */
  useReveal();

  /* One reveal on arrival: the headline lines, then the lede, CTA and stats.
     Nothing here is scroll-driven — the hero is already in view. */
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.sy__title span', { yPercent: 108, duration: 1.1, stagger: 0.09 })
          .from('.sy__eyebrow', { opacity: 0, duration: 0.6 }, 0.15)
          .from('.sy__lede', { opacity: 0, y: 16, duration: 0.8 }, 0.45)
          .from('.sy__cta', { opacity: 0, y: 16, duration: 0.8 }, 0.58)
          .from('.sy__stat', { opacity: 0, y: 20, duration: 0.8, stagger: 0.08 }, 0.62);
      });
    },
    { scope: heroRef },
  );

  return (
    <div className="sy">
      <Header />

      <main className="sy__main">
        <section className="sy__heroWrap shell" ref={heroRef}>
          <div className="sy__hero">
            <img className="sy__heroImg" src={hero.image} alt={hero.alt} />
            <div className="sy__heroVeil" aria-hidden="true" />

            <div className="sy__heroCopy">
              <p className="micro sy__eyebrow">{eyebrow}</p>
              {/* Each line is clipped so its span can slide up from below. */}
              <h1 className="sy__title">
                {headline.map((line) => (
                  <span key={line}>
                    <span>{line}</span>
                  </span>
                ))}
              </h1>
              <p className="sy__lede">{lede}</p>
              <a className="pill pill--solid sy__cta" href={cta.href}>
                {cta.label}
              </a>
            </div>
          </div>

          <div className="sy__stats">
            {stats.map((stat) => (
              <div className="sy__stat" key={stat.value}>
                <span className="sy__statValue">{stat.value}</span>
                <span className="sy__statLabel">
                  {stat.label.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>

        <SystemsList />

        <SystemsStack />

        <MaterialsGrid />

        <section className="sy__closer shell">
          <h2 className="sy__closerTitle">
            {closer.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="sy__closerBody">{closer.body}</p>
          <a className="pill pill--solid sy__closerCta" href={closer.cta.href}>
            {closer.cta.label}
          </a>
        </section>

        <div className="sy__back shell">
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
