import { ServiceTitanLogo } from '../ServiceTitanLogo';
import jobberLogo from '../../assets/integrations/jobber.png';
import housecallproLogo from '../../assets/integrations/housecallpro.png';

export type IntegrationId = 'servicetitan' | 'jobber' | 'housecallpro' | 'webhooks';

export const INTEGRATIONS: { id: IntegrationId; label: string }[] = [
  { id: 'servicetitan', label: 'ServiceTitan' },
  { id: 'jobber', label: 'Jobber' },
  { id: 'housecallpro', label: 'Housecall Pro' },
  { id: 'webhooks', label: 'Your Schedule' },
];

type IntegrationChipProps = {
  id: IntegrationId;
  label: string;
  className?: string;
};

export function IntegrationChip({ id, label, className = '' }: IntegrationChipProps) {
  const chipClass = [
    'hero-integration-chip',
    `hero-integration-chip--${id}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={chipClass} title={label} aria-label={label}>
      {id === 'servicetitan' && (
        <ServiceTitanLogo className="integration-logo integration-logo--servicetitan hero-integration-chip__logo hero-integration-chip__logo--servicetitan" />
      )}
      {id === 'jobber' && (
        <img
          src={jobberLogo}
          alt=""
          aria-hidden
          className="integration-logo integration-logo--jobber hero-integration-chip__logo"
        />
      )}
      {id === 'housecallpro' && (
        <img
          src={housecallproLogo}
          alt=""
          aria-hidden
          className="integration-logo integration-logo--housecallpro hero-integration-chip__logo"
        />
      )}
      {id === 'webhooks' && (
        <span className="hero-integration-chip__webhooks">
          <i className="fa-solid fa-link" aria-hidden />
          <span className="hero-integration-chip__webhooks-text">Your Schedule</span>
        </span>
      )}
    </div>
  );
}
