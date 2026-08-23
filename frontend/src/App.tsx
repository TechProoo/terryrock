import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SystemsPage from './pages/SystemsPage';
import ContactPage from './pages/ContactPage';
import ScrollToHash from './components/ScrollToHash';
import PageTransition from './components/PageTransition';

export default function App() {
  /* The curtain renders the routes with a location that lags the real one, so
     the page only swaps while the screen is covered. */
  return (
    <PageTransition>
      {(location) => (
        <>
          <ScrollToHash location={location} />
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Anything else falls back to the landing page. */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </>
      )}
    </PageTransition>
  );
}
