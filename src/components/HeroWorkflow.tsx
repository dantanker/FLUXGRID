import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';
import { Reveal } from './motion/Reveal';

export function HeroWorkflow() {
  return (
    <Reveal className="hero-workflow" delay={0.1} direction="right">
      <div className="hero-workflow__panel">
        <span className="hero-workflow__label">Call captured</span>
        <div className="hero-workflow__frame">
          <img
            src={step2CallDetails}
            alt="CRM call record with customer details and job priority from the phone intake"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="hero-workflow__arrow" aria-hidden="true">
        <span className="hero-workflow__arrow-line" />
        <span className="hero-workflow__arrow-text">Books to board</span>
      </div>

      <div className="hero-workflow__panel">
        <span className="hero-workflow__label">Job on your board</span>
        <div className="hero-workflow__frame">
          <img
            src={step3JobsBoard}
            alt="Dispatch board showing a new electrical job scheduled for a technician"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </Reveal>
  );
}
