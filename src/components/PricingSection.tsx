const plans = [
  {
    title: 'Setup & Go-Live',
    price: 'One-time fee',
    detail:
      'We connect your business line, link your CRM, and load your emergency rules and shop scripts.',
    items: [
      'Keep your existing phone number',
      'CRM sync tested before launch',
      'Custom scripts for your shop',
      'Dispatch walkthrough for your team',
    ],
  },
  {
    title: 'Monthly Coverage',
    price: 'Flat monthly rate',
    detail:
      'Unlimited inbound call handling — nights, weekends, holidays, and overflow when lines are busy.',
    items: [
      '24/7 answering on your line',
      'Emergency vs. estimate routing',
      'Jobs booked into your schedule',
      'Script updates as your shop grows',
    ],
    featured: true,
  },
];

export function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">Straightforward Pricing</h2>
          <p className="section-subtitle">
            No per-minute surprises. One booked panel change or service call often covers months of
            coverage — especially on the jobs you&apos;re missing after hours.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
            >
              {plan.featured && <span className="pricing-badge">Where most shops start</span>}
              <h3>{plan.title}</h3>
              <div className="pricing-price">{plan.price}</div>
              <p className="pricing-detail">{plan.detail}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          Exact numbers depend on call volume and CRM setup.{' '}
          <a href="#demo">Book a free walkthrough</a> — we&apos;ll quote your shop in 10 minutes.
        </p>
      </div>
    </section>
  );
}
