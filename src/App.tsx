import { useState, useMemo } from 'react';
import { FluxGridLogo } from './components/FluxGridLogo';
import { ServiceTitanLogo } from './components/ServiceTitanLogo';
import jobberLogo from './assets/integrations/jobber.png';
import housecallproLogo from './assets/integrations/housecallpro.png';
import './App.css';

const CONVERSION_RATE = 0.4;
const MONTHLY_WEEKS = 4.33;

function getLeakImpact(calculatedLoss: number): string {
  if (calculatedLoss < 2000) {
    return '⚠️ Covers your monthly local Google Ads budget';
  }
  if (calculatedLoss < 6000) {
    return '🚨 Equivalent to a full shop van payment & insurance';
  }
  return '💥 Equivalent to a full-time service technician\'s base payroll';
}

const faqItems = [
  {
    question: 'Do I have to change my phone number?',
    answer:
      'No. FluxGrid sits directly in the background of your current business line. You keep your number, your phone carriers, and your exact marketing channels.',
  },
  {
    question: 'How does it know what an electrical emergency is?',
    answer:
      'The system is pre-loaded with comprehensive electrical trade safety rules. It knows how to ask follow-ups for sparking components, complete outages, or partial power failures to ensure high-priority safety routing.',
  },
  {
    question: 'How long does integration take?',
    answer:
      'We link the dispatch engine to your field operations software and phone network hooks. Your system is fully ready to deploy in under 7 business days.',
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

  const handleDemoClick = () => {
    alert('Demo scheduler placeholder triggered!');
  };

  return (
    <div className="fluxgrid-app">
      <header>
        <div className="container nav-container">
          <a href="#" className="logo">
            <FluxGridLogo size="md" variant="dark" />
          </a>
          <nav>
            <a href="#leaks">The Problem</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#faq">FAQ</a>
            <a href="#demo" className="cta-btn nav">
              Book Demo
            </a>
          </nav>
        </div>
      </header>

      <section className="container hero-section">
        <div className="hero-grid">
          <div className="hero-left animate-fade">
            <h1>
              Stop losing electrical jobs because you <span>missed a call</span>.
            </h1>
            <p>
              FluxGrid is the 24/7 Intelligent Dispatch Engine built specifically for electrical shop owners. It
              instantly answers, qualifies with trade logic, and logs jobs straight into your CRM while you&apos;re out
              in the field or asleep.
            </p>
            <a href="#demo" className="cta-btn">
              See Engine Demo <i className="fa-solid fa-arrow-right" />
            </a>
          </div>

          <div className="hero-right animate-float">
            <div className="ui-mockup">
              <div className="ui-header">
                <span>
                  <i
                    className="fa-solid fa-circle"
                    style={{ color: 'var(--orange-main)', fontSize: '8px', marginRight: '5px' }}
                  />
                  Live Engine Status
                </span>
                <span>Active 24/7</span>
              </div>
              <div className="ui-card">
                <div className="ui-meta">09:14 PM &bull; Phone Intercept</div>
                <div className="ui-body">&quot;Breaker sparking, smelling burning plastic&quot;</div>
              </div>
              <div className="ui-card blue">
                <div className="ui-meta">09:15 PM &bull; Trade Logic Analysis</div>
                <div className="ui-body">
                  <i className="fa-solid fa-brain" /> Classified: High-Priority Emergency Hazard
                </div>
              </div>
              <div className="ui-card success">
                <div className="ui-meta">09:16 PM &bull; CRM Automated Action</div>
                <div className="ui-body success">
                  <i className="fa-solid fa-calendar-check" /> Dispatched to ServiceTitan Schedule
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="integrations-bar">
        <div className="container integrations-layout">
          <p>Plugs Directly Into the Software You Already Use</p>
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
                    <img src={housecallproLogo} alt="Housecall Pro" className="integration-logo integration-logo--housecallpro" />
                  </div>
                  <div className="app-logo app-logo--text">
                    <i className="fa-solid fa-link" /> Custom CRM Webhooks
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="calculator-section" id="leaks">
        <div className="container">
          <h2 className="section-title">The Silent Cash Leak</h2>
          <p className="section-subtitle">
            Most shop owners track tool overhead but completely ignore their uncaptured inbound pipelines. See your real
            operational leakage numbers below.
          </p>

          <div className="calc-box">
            <div className="calc-inputs">
              <div className="slider-group">
                <div className="slider-label">
                  <span>Weekly Missed Calls</span>
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
                  <span>Average Ticket Size</span>
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
                Monthly Revenue Leakage
              </h4>
              <div className="leak-counter">${calculatedLoss.toLocaleString()}</div>
              <div>
                <span className="leak-impact-tag">{leakImpact}</span>
              </div>
              <a href="#demo" className="cta-btn full-width">
                Plug the Leak <i className="fa-solid fa-plug" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="container">
          <h2 className="section-title">Engine Architecture</h2>
          <p className="section-subtitle">
            How FluxGrid acts as a reliable autonomous middle-layer between your phone lines and your field calendar.
          </p>

          <div className="grid-3">
            <div className="process-card">
              <div>
                <div className="icon-box">
                  <i className="fa-solid fa-wave-square" />
                </div>
                <h3>1. Intercept</h3>
                <div className="tech-subtitle">[ Signal Capture ]</div>
                <p>
                  The engine securely hooks directly into your primary office phone loops, instantly absorbing 100% of
                  incoming data streams on the very first ring—24/7/365.
                </p>
              </div>
              <div className="engine-mini-log">
                $ line_status: <span className="log-success">ONLINE</span>
                <br />
                $ loop_latency: 0.04ms
                <br />
                $ routing: packet_intercept
              </div>
            </div>

            <div className="process-card">
              <div>
                <div className="icon-box">
                  <i className="fa-solid fa-microchip" />
                </div>
                <h3>2. Qualify</h3>
                <div className="tech-subtitle">[ Trade-Logic Filter ]</div>
                <p>
                  Instead of relying on a rigid keyword menu, the engine uses electrical trade parameters to safely
                  evaluate safety emergencies from a basic code consultation or check-in.
                </p>
              </div>
              <div className="engine-mini-log">
                $ context: <span className="log-accent">&quot;sparks_detected&quot;</span>
                <br />
                $ hazard_eval: true (Level 5)
                <br />
                $ action: branch_priority
              </div>
            </div>

            <div className="process-card">
              <div>
                <div className="icon-box">
                  <i className="fa-solid fa-network-wired" />
                </div>
                <h3>3. Dispatch</h3>
                <div className="tech-subtitle">[ Autonomous Sync ]</div>
                <p>
                  FluxGrid accesses your current CRM scheduling matrix, finds the optimal available technician slot, files
                  the customer work ticket, and notifies your team automatically.
                </p>
              </div>
              <div className="engine-mini-log">
                $ target: field_crm_api
                <br />
                $ schedule_slot: write_ok
                <br />
                $ dispatch: <span className="log-success">COMPLETE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="closer-section" id="faq">
        <div className="container">
          <div className="faq-container">
            <h2 className="section-title" style={{ marginBottom: '40px' }}>
              Frequently Asked Questions
            </h2>

            {faqItems.map((item, index) => (
              <div
                key={item.question}
                className={`faq-item${activeFaq === index ? ' active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  {item.question} <i className="fa-solid fa-chevron-down" />
                </div>
                <div className="faq-answer">{item.answer}</div>
              </div>
            ))}
          </div>

          <div className="final-box" id="demo">
            <h2>Secure Your Competitive Edge</h2>
            <p>
              Stop leaving your revenue up to chance. Book a brief 10-minute system walk-through and look at the engine
              running live.
            </p>
            <button type="button" className="cta-btn" onClick={handleDemoClick}>
              Schedule Live System Demo <i className="fa-solid fa-calendar" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
