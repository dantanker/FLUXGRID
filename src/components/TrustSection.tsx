import { TrustPhoneMockup } from './TrustPhoneMockup';

const stats = [
  {
    value: '12+',
    label: 'After-hours jobs booked in the first 30 days (typical 5–15 tech shop)',
  },
  {
    value: '94%',
    label: 'Inbound calls answered on the first ring — no voicemail loop',
  },
  {
    value: '<7 days',
    label: 'From signed agreement to live on your line and CRM',
  },
];

export function TrustSection() {
  return (
    <section className="trust-section" id="proof">
      <div className="container">
        <div className="trust-layout">
          <div className="trust-content">
            <p className="trust-eyebrow">Built for electrical contractors — not a generic answering service</p>

            <div className="trust-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="trust-stat">
                  <div className="trust-stat-value">{stat.value}</div>
                  <div className="trust-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <TrustPhoneMockup />
        </div>
      </div>
    </section>
  );
}
