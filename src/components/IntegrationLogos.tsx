import { ServiceTitanLogo } from './ServiceTitanLogo';
import jobberLogo from '../assets/integrations/jobber.png';
import housecallproLogo from '../assets/integrations/housecallpro.png';
import { INTEGRATIONS } from './integrations/IntegrationChip';

export function IntegrationLogos() {
  return (
    <div className="integration-strip" aria-label="Supported dispatch software">
      {INTEGRATIONS.map((item) => {
        if (item.id === 'servicetitan') {
          return (
            <div key={item.id} className="integration-strip__item" title={item.label}>
              <ServiceTitanLogo className="integration-strip__logo integration-strip__logo--servicetitan" />
            </div>
          );
        }

        if (item.id === 'jobber') {
          return (
            <div key={item.id} className="integration-strip__item" title={item.label}>
              <img src={jobberLogo} alt={item.label} className="integration-strip__logo" />
            </div>
          );
        }

        if (item.id === 'housecallpro') {
          return (
            <div key={item.id} className="integration-strip__item" title={item.label}>
              <img src={housecallproLogo} alt={item.label} className="integration-strip__logo" />
            </div>
          );
        }

        return (
          <div key={item.id} className="integration-strip__item integration-strip__item--text" title={item.label}>
            <span>Custom CRM</span>
          </div>
        );
      })}
    </div>
  );
}
