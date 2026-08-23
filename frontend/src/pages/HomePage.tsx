import Hero from '../components/Hero';
import MetaStrip from '../components/MetaStrip';
import Projects from '../components/Projects';
import Studio from '../components/Studio';
import Services from '../components/Services';
import Quality from '../components/Quality';
import Clients from '../components/Clients';
import Team from '../components/Team';
import Contact from '../components/Contact';
import useReveal from '../hooks/useReveal';

export default function HomePage() {
  useReveal();

  return (
    <>
      <Hero />
      <main>
        <MetaStrip variant="top" />
        <Projects />
        <Studio />
        <Services />
        <Quality />
        <Clients />
        <Team />
        <Contact />
      </main>
      <footer className="section">
        <MetaStrip variant="footer" />
      </footer>
    </>
  );
}
