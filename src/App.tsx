import { useState, useMemo } from 'react';
import { FluxGridLogo } from './components/FluxGridLogo';
import { HeroScroll } from './components/HeroScroll';
import { AudienceSection } from './components/AudienceSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DemoModal } from './components/DemoModal';
import { DemoCtaButton } from './components/DemoCtaButton';
import { ElectricalGridBackground } from './components/ElectricalGridBackground';
import { Footer } from './components/Footer';
import { DemoModalProvider } from './context/DemoModalContext';
import './App.css';

const CONVERSION_RATE = 0.4;
const MONTHLY_WEEKS = 4.33;

const faqItems = [
  {
    question: 'Do I have to change my phone number?',
    answer:
      'No. FluxGrid connects to the business line you already advertise on trucks, Google, and your website. Same number, same carrier — callers never know the difference.',
  },
  {
    question: 'What does the customer hear when they call?',
    answer:
      'Your shop greeting — not a robot menu. It sounds like someone from your office asking the same things you would: what\'s going on, is there sparking or a burning smell, is anyone in danger, and what\'s the address.',
  },
  {
    question: 'How does it know it\'s a real electrical emergency?',
    answer:
      'We build rules around what you already use in the field: full or partial power loss, tripping breakers, sparking panels, burning odors, and shock risk. You sign off on the script and what counts as "call the on-call tech now" before we go live.',
  },
  {
    question: 'Can my team change or cancel a booked job?',
    answer:
      'Yes. Jobs land in your CRM like any other dispatch. Your office can edit notes, reschedule, reassign a tech, or cancel — same as they do today.',
  },
  {
    question: 'Will this replace my office manager or dispatcher?',
    answer:
      'No. FluxGrid is overflow coverage — after 5, weekends, holidays, and when all lines are busy. Your team stays in charge during normal hours.',
  },
  {
    question: 'What about spam, wrong numbers, and price shoppers?',
    answer:
      'Non-jobs get filtered or logged without clogging your board. Real estimate requests get basic info captured. Only qualified leads and emergencies get booked into open slots.',
  },
  {
    question: 'How long until we\'re actually live?',
    answer:
      'Most shops are answering live calls within 7 business days. We hook up your line, connect your CRM, load your emergency rules, and do a short walkthrough with whoever handles dispatch.',
  },
  {
    question: 'We use a CRM that\'s not on your list — can you still connect?',
    answer:
      'ServiceTitan, Jobber, and Housecall Pro are ready out of the box. Other systems often work through webhooks — tell us what you run on the demo and we\'ll confirm before you commit.',
  },
];

function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [missedCalls, setMissedCalls] = useState(5);
  const [ticketValue, setTicketValue] = useState(1200);

  const calculatedLoss = useMemo(
    () => Math.round(missedCalls * CONVERSION_RATE * ticketValue * MONTHLY_WEEKS),
    [missedCalls, ticketValue],
  );

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <DemoModalProvider>
      <ElectricalGridBackground />
      <div className="fluxgrid-app">
        <header>
          <div className="container nav-container">
            <a href="#" className="logo">
              <FluxGridLogo size="md" />
            </a>
            <DemoCtaButton className="cta-btn nav header-mobile-cta">Book Demo</DemoCtaButton>
            <nav>
              <a href="#leaks">Missed Revenue</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#faq">FAQ</a>
              <DemoCtaButton className="cta-btn nav">Book Demo</DemoCtaButton>
            </nav>
          </div>
        </header>

        <HeroScroll />

        <section className="calculator-section" id="leaks">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">What Missed Calls Cost Your Shop</h2>
              <p className="section-subtitle">
                Most owners watch fuel, materials, and payroll — but not the jobs that go to
                voicemail when the crew is tied up. Plug in rough numbers for your shop.
              </p>
            </div>

            <div className="calc-box">
              <div className="calc-inputs">
                <div className="slider-group">
                  <div className="slider-label">
                    <span>Missed Calls Per Week</span>
                    <span className="value-display">{missedCalls}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <span>Average Job Value</span>
                    <span className="value-display">${ticketValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={300}
                    max={5000}
                    step={100}
                    value={ticketValue}
                    onChange={(e) => setTicketValue(parseInt(e.target.value, 10))}
                  />
                </div>

                <p className="calc-disclaimer">
                  *Calculated assuming a conservative 40% booking rate on captured leads.
                </p>
              </div>

              <div className="calc-results">
                <h4>
                  <span className="pulse-dot" />
                  Estimated Monthly Loss
                </h4>
                <div className="leak-counter">${calculatedLoss.toLocaleString()}</div>
                <DemoCtaButton className="cta-btn full-width">
                  Reclaim Your Missed Revenue
                </DemoCtaButton>
              </div>
            </div>
          </div>
        </section>

        <HowItWorksSection />

        <AudienceSection />

        <section className="closer-section" id="faq">
          <div className="container">
            <div className="faq-container">
              <h2 className="section-title" style={{ marginBottom: '24px' }}>
                Common Questions From Shop Owners
              </h2>

              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index;

                return (
                  <div key={item.question} className={`faq-item${isOpen ? ' active' : ''}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      {item.question} <i className="fa-solid fa-chevron-down" />
                    </button>
                    <div className="faq-answer">{item.answer}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
        <DemoModal />
      </div>
    </DemoModalProvider>
  );
}

export default App;
