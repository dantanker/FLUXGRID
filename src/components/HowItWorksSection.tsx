import step1IncomingCall from '../assets/how-it-works/step-1-incoming-call.png';
import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';

const steps = [
  {
    title: '1. Answer Every Call',
    subtitle: '24/7 INSTANT RESPONSE',
    description:
      'Picks up when your office is closed or already on another line. The caller hears your shop name and a real person-style greeting — not "leave a message after the beep."',
    image: step1IncomingCall,
    imageAlt: 'iPhone showing an incoming electrical service call answered by FluxGrid',
    visualClass: 'process-card__visual--phone',
  },
  {
    title: '2. Qualify the Job',
    subtitle: 'INTELLIGENT TRIAGE',
    description:
      'Asks exactly what a master dispatcher would: sparks, burning smells, full or partial outages, and panel access. True emergencies are instantly flagged and bumped to the front of the queue.',
    image: step2CallDetails,
    imageAlt: 'CRM call details screen with customer info, priority, and job type captured from the call',
    visualClass: 'process-card__visual--crm',
  },
  {
    title: '3. Book Into Your CRM',
    subtitle: 'CRM SYNCHRONIZED',
    description:
      'The qualified job drops directly into ServiceTitan, Jobber, or Housecall Pro with complete customer notes, address, and priority level. Your morning dispatch looks exactly the same—just with a much fuller board.',
    image: step3JobsBoard,
    imageAlt: 'Jobs board with scheduled electrical work orders assigned to technicians',
    visualClass: 'process-card__visual--board',
  },
];

export function HowItWorksSection() {
  return (
    <section className="process-section" id="how-it-works">
      <div className="container">
        <div className="section-intro">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Our 24/7 Intelligent Dispatch Engine automates your intake in three simple steps—zero
            extra headcount required.
          </p>
        </div>

        <div className="grid-3">
          {steps.map((step) => (
            <article key={step.title} className="process-card">
              <div className={`process-card__visual ${step.visualClass}`}>
                <img src={step.image} alt={step.imageAlt} loading="lazy" decoding="async" />
              </div>
              <div className="process-card__copy">
                <h3>{step.title}</h3>
                <div className="tech-subtitle">{step.subtitle}</div>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
