import { useState, useMemo } from 'react';
import { FluxGridLogo } from './components/FluxGridLogo';
import { HeroScroll } from './components/HeroScroll';
import { AudienceSection } from './components/AudienceSection';
import { PricingSection } from './components/PricingSection';
import { DemoSection } from './components/DemoSection';
import { MobileStickyCta } from './components/MobileStickyCta';
import { ElectricalGridBackground } from './components/ElectricalGridBackground';
import { Footer } from './components/Footer';
import './App.css';

const CONVERSION_RATE = 0.4;
const MONTHLY_WEEKS = 4.33;

function getLeakImpact(calculatedLoss: number): string {
  if (calculatedLoss < 2000) {
    return '⚠️ Roughly what many shops spend on Google Ads each month';
  }
  if (calculatedLoss < 6000) {
    return '🚨 About one service van payment plus insurance';
  }
  return '💥 Close to a full-time apprentice or junior tech on payroll';
}

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

  const leakImpact = useMemo(() => getLeakImpact(calculatedLoss), [calculatedLoss]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <ElectricalGridBackground />
      <div className="fluxgrid-app">
        <header>
          <div className="container nav-container">
            <a href="#" className="logo">
              <FluxGridLogo size="md" />
            </a>
            <a href="#demo" className="cta-btn nav header-mobile-cta">
              Book Demo
            </a>
            <nav>
              <a href="#leaks">Missed Revenue</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a href="#demo" className="cta-btn nav">
                Book Demo
              </a>
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
              </div>

              <div className="calc-results">
                <h4>
                  <span className="pulse-dot" />
                  Estimated Monthly Loss
                </h4>
                <div className="leak-counter">${calculatedLoss.toLocaleString()}</div>
                <div>
                  <span className="leak-impact-tag">{leakImpact}</span>
                </div>
                <a href="#demo" className="cta-btn full-width">
                  See How to Capture These Calls <i className="fa-solid fa-plug" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section" id="how-it-works">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">
                From ring to booked job in minutes — while your techs stay on the tools. Three steps,
                no extra headcount.
              </p>
            </div>

            <div className="grid-3">
              <div className="process-card">
                <div>
                  <div className="icon-box">
                    <i className="fa-solid fa-phone-volume" />
                  </div>
                  <h3>1. Answer Every Call</h3>
                  <div className="tech-subtitle">First ring · 24/7</div>
                  <p>
                    Picks up when your office is closed or already on another line. The caller
                    hears your shop name and a real person-style greeting — not &quot;leave a
                    message after the beep.&quot;
                  </p>
                </div>
                <div className="engine-mini-log">
                  $ status: <span className="log-success">LIVE</span>
                  <br />
                  $ hours: 24/7/365
                  <br />
                  $ missed_calls: 0
                </div>
              </div>

              <div className="process-card">
                <div>
                  <div className="icon-box">
                    <i className="fa-solid fa-bolt" />
                  </div>
                  <h3>2. Qualify the Job</h3>
                  <div className="tech-subtitle">Electrical safety first</div>
                  <p>
                    Asks what your dispatcher would: sparks, smell of burning, full outage or
                    partial, access to the panel, and whether kids or medical equipment are affected.
                    True emergencies get bumped to the front of the queue.
                  </p>
                </div>
                <div className="engine-mini-log">
                  $ caller: <span className="log-accent">&quot;no power in kitchen&quot;</span>
                  <br />
                  $ priority: emergency
                  <br />
                  $ action: book_on_call
                </div>
              </div>

              <div className="process-card">
                <div>
                  <div className="icon-box">
                    <i className="fa-solid fa-calendar-check" />
                  </div>
                  <h3>3. Book Into Your CRM</h3>
                  <div className="tech-subtitle">Ready for dispatch</div>
                  <p>
                    The job shows up in ServiceTitan, Jobber, or Housecall Pro with notes, address,
                    priority level, and customer info. Your morning dispatch looks the same — just
                    with more on the board.
                  </p>
                </div>
                <div className="engine-mini-log">
                  $ crm: field_board
                  <br />
                  $ slot: booked
                  <br />
                  $ crew: <span className="log-success">NOTIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AudienceSection />

        <PricingSection />

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

            <DemoSection />
          </div>
        </section>

        <Footer />
        <MobileStickyCta />
      </div>
    </>
  );
}

export default App;
