import { HeroScroll } from './components/HeroScroll';
import { ProofSection } from './components/ProofSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { RevenueCalculatorSection } from './components/RevenueCalculatorSection';
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
        <HowItWorksSection />
        <RevenueCalculatorSection />
        <FaqSection />

        <ClosingCta />
        <Footer />
        <DemoModal />
      </div>
    </DemoModalProvider>
  );
}

export default App;
