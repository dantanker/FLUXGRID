const builtFor = [
  'Residential & light commercial shops with 3–20 techs',
  'Already on ServiceTitan, Jobber, or Housecall Pro',
  'Losing after-hours calls to voicemail or competitors',
  'Need backup coverage — not a replacement for your office staff',
];

const notFor = [
  'Handyman, HVAC, or multi-trade companies',
  'Shops still running jobs off paper or spreadsheets only',
  'Owners who want zero say in emergency rules or scripts',
];

export function AudienceSection() {
  return (
    <section className="audience-section" id="who-its-for">
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">Is FluxGrid Right for Your Shop?</h2>
          <p className="section-subtitle">
            We only serve electrical contractors. That&apos;s why our call scripts know the
            difference between a tripping breaker and a true emergency — and why jobs land in your
            CRM the way your dispatch team expects.
          </p>
        </div>

        <div className="audience-grid">
          <div className="audience-card audience-card--yes">
            <h3>
              <i className="fa-solid fa-circle-check" /> Good fit if you are
            </h3>
            <ul>
              {builtFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="audience-card audience-card--no">
            <h3>
              <i className="fa-solid fa-circle-xmark" /> Probably not a fit if you are
            </h3>
            <ul>
              {notFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
