import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SystemsPage from './pages/SystemsPage';
import ScrollToHash from './components/ScrollToHash';

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/systems" element={<SystemsPage />} />
        {/* Anything else falls back to the landing page. */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
