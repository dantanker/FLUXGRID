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
      <WebsiteResults />
    </>
  );
}
