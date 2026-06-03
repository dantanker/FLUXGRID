const greatFit = [
  'Miss calls after hours or during busy periods',
  'Have 3–20 technicians',
  'Use any CRM or job management platform',
  'Want every lead answered immediately',
  'Need backup call coverage without extra payroll',
];

const notAFit = [
  "Aren't an electrical contractor",
  'Prefer handling everything manually',
  "Don't want automation involved in your intake process",
];

export function AudienceSection() {
  return (
    <section className="audience-section" id="who-its-for" aria-labelledby="audience-heading">
      <div className="container audience-section__inner">
        <header className="audience-header">
          <p className="audience-eyebrow">Electrical contractors only</p>
          <h2 id="audience-heading" className="audience-title">
            Who FluxGrid Is Built For
          </h2>
          <p className="audience-subheadline">
            FluxGrid helps electrical contractors capture more calls, book more jobs, and stop
            losing revenue after hours.
          </p>
        </header>

        <div className="audience-grid">
          <div className="audience-card-wrap audience-card-wrap--yes">
            <article className="audience-card audience-card--yes">
              <h3 className="audience-card__title">
                <i className="fa-solid fa-circle-check audience-card__icon" aria-hidden="true" />
                Great Fit If You
              </h3>
              <ul className="audience-card__list">
                {greatFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="audience-card-wrap audience-card-wrap--no">
            <article className="audience-card audience-card--no">
              <h3 className="audience-card__title">
                <i className="fa-solid fa-circle-xmark audience-card__icon" aria-hidden="true" />
                Probably Not a Fit If You
              </h3>
              <ul className="audience-card__list">
                {notAFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <p className="audience-trust">
          We don&apos;t try to serve every trade. By focusing only on electricians, our workflows,
          scripts, and integrations are built around how electrical businesses actually operate.
        </p>
      </div>
    </section>
  );
}
