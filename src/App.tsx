import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DemoModal } from './components/DemoModal';
import { ElectricalGridBackground } from './components/ElectricalGridBackground';
import { Footer } from './components/Footer';
import { SiteHeader } from './components/SiteHeader';
import { DemoModalProvider } from './context/DemoModalContext';
import { ReceptionistPage } from './pages/ReceptionistPage';
import { WebsitePage } from './pages/WebsitePage';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <DemoModalProvider>
      <ElectricalGridBackground />
      <div className="fluxgrid-app">
        <ScrollToTop />
        <div className="fluxgrid-app__main">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<ReceptionistPage />} />
            <Route path="/websites" element={<WebsitePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
        <DemoModal />
      </div>
    </DemoModalProvider>
  );
}

export default App;
