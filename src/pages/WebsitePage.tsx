import { GrowthSuiteSection } from '../components/GrowthSuiteSection';
import { WebsiteFeatureSpotlight } from '../components/website/WebsiteFeatureSpotlight';
import { WebsiteHero } from '../components/website/WebsiteHero';
import { WebsiteProcess } from '../components/website/WebsiteProcess';
import { WebsiteResults } from '../components/website/WebsiteResults';

export function WebsitePage() {
  return (
    <>
      <WebsiteHero />
      <WebsiteFeatureSpotlight />
      <WebsiteProcess />
      <GrowthSuiteSection ctaLabel="Check it out" ctaTo="/" />
      <WebsiteResults />
    </>
  );
}
