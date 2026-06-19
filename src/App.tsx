import { HeroScroll } from './components/HeroScroll';
import { ProofSection } from './components/ProofSection';
import { DifferentiatorStrip } from './components/DifferentiatorStrip';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { DemoModal } from './components/DemoModal';
import { ElectricalGridBackground } from './components/ElectricalGridBackground';
import { Footer } from './components/Footer';
import { SiteHeader } from './components/SiteHeader';
import { ClosingCta } from './components/ClosingCta';
import { DemoModalProvider } from './context/DemoModalContext';
import './App.css';

function App() {
  return (
    <DemoModalProvider>
      <ElectricalGridBackground />
      <div className="fluxgrid-app">
        <SiteHeader />

        <HeroScroll />
        <ProofSection />
        <DifferentiatorStrip />
        <HowItWorksSection />
        <AboutSection />
        <FaqSection />

        <ClosingCta />
        <Footer />
        <DemoModal />
      </div>
    </DemoModalProvider>
  );
}

export default App;
