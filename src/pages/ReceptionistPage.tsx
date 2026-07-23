import { FaqSection } from '../components/FaqSection';
import { GrowthSuiteSection } from '../components/GrowthSuiteSection';
import { HeroScroll } from '../components/HeroScroll';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ProofSection } from '../components/ProofSection';
import { RevenueCalculatorSection } from '../components/RevenueCalculatorSection';
import { VisionSection } from '../components/VisionSection';

export function ReceptionistPage() {
  return (
    <>
      <HeroScroll />
      <ProofSection />
      <HowItWorksSection />
      <RevenueCalculatorSection />
      <GrowthSuiteSection />
      <FaqSection />
      <VisionSection />
    </>
  );
}
