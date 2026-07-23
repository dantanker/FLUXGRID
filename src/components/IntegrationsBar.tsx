import { ServiceTitanLogo } from './ServiceTitanLogo';
import jobberLogo from '../assets/integrations/jobber.png';
import housecallproLogo from '../assets/integrations/housecallpro.png';

type IntegrationsBarProps = {
  variant?: 'hero' | 'standalone';
};

function IntegrationsMarquee() {
  return (
    <div className="app-flex-track">
      <div className="app-flex-marquee">
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            className="app-flex-set"
            aria-hidden={setIndex === 1 ? true : undefined}
          >
            <div className="app-logo">
              <ServiceTitanLogo className="integration-logo integration-logo--servicetitan" />
            </div>
            <div className="app-logo">
              <img src={jobberLogo} alt="Jobber" className="integration-logo integration-logo--jobber" />
            </div>
            <div className="app-logo">
              <img
                src={housecallproLogo}
                alt="Housecall Pro"
                className="integration-logo integration-logo--housecallpro"
              />
            </div>
            <div className="app-logo app-logo--text">
              <i className="fa-solid fa-link" /> Your Schedule
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsBar({ variant = 'standalone' }: IntegrationsBarProps) {
  const isHero = variant === 'hero';
  const label = 'Books jobs directly into the dispatch software you already use';

  return (
    <section
      className={`integrations-bar${isHero ? ' integrations-bar--hero' : ''}`}
      id="integrations"
    >
      {isHero ? (
        <>
          <p className="integrations-bar__label">{label}</p>
          <IntegrationsMarquee />
        </>
      ) : (
        <div className="container integrations-layout">
          <p>{label}</p>
          <IntegrationsMarquee />
        </div>
      )}
    </section>
  );
}
