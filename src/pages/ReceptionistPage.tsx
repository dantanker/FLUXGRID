import { FaqSection } from '../components/FaqSection';
import { GrowthSuiteSection } from '../components/GrowthSuiteSection';
import { HeroScroll } from '../components/HeroScroll';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ProofSection } from '../components/ProofSection';
import { RevenueCalculatorSection } from '../components/RevenueCalculatorSection';
import { VisionSection } from '../components/VisionSection';

export function ReceptionistPage() {
  return (
    <div className="receptionist-flow">
      <div className="receptionist-flow__hero">
        <HeroScroll />
      </div>
      <div className="receptionist-flow__website">
        <GrowthSuiteSection />
      </div>
      <div className="receptionist-flow__proof">
        <ProofSection />
      </div>
      <div className="receptionist-flow__hiw">
        <HowItWorksSection />
      </div>
      <div className="receptionist-flow__calc">
        <RevenueCalculatorSection />
      </div>
      <div className="receptionist-flow__faq">
        <FaqSection />
      </div>
      <div className="receptionist-flow__vision">
        <VisionSection />
      </div>
    </div>
  );
}
