import step1IncomingCall from '../assets/how-it-works/step-1-incoming-call.png';
import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';

const steps = [
  {
    title: 'We answer your line',
    description:
      'When you\'re closed or on another call. Same phone number your customers already dial.',
    image: step1IncomingCall,
    imageAlt: 'Incoming call answered on your shop line',
  },
  {
    title: 'We qualify the call',
    description:
      'Your intake questions — what\'s wrong, where, and whether it needs the on-call tech now.',
    image: step2CallDetails,
    imageAlt: 'Call details captured in your CRM',
  },
  {
    title: 'We book the job',
    description:
      'Straight into your CRM with notes and priority. Dispatch handles it like any other job.',
    image: step3JobsBoard,
    imageAlt: 'New job on your dispatch board',
  },
];

export function HowItWorksSection() {
  return (
    <section className="process-section" id="how-it-works">
      <div className="container">
        <div className="section-intro section-intro--left">
          <h2 className="section-title section-title--left">How it works</h2>
          <p className="section-subtitle section-subtitle--left">
            Same phone number. Jobs booked to your CRM. Live in about a week.
          </p>
        </div>

        <ol className="step-list">
          {steps.map((step, index) => (
            <li key={step.title} className="step-item">
              <div className="step-item__content">
                <span className="step-item__index">{index + 1}</span>
                <h3 className="step-item__title">{step.title}</h3>
                <p className="step-item__description">{step.description}</p>
              </div>
              <div className="step-item__visual">
                <img src={step.image} alt={step.imageAlt} loading="lazy" decoding="async" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
