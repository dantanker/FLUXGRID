import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroScroll } from './components/HeroScroll';
import { ProofSection } from './components/ProofSection';
import { AudienceSection } from './components/AudienceSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DemoModal } from './components/DemoModal';
import { ElectricalGridBackground } from './components/ElectricalGridBackground';
import { Footer } from './components/Footer';
import { SiteHeader } from './components/SiteHeader';
import { ClosingCta } from './components/ClosingCta';
import { DemoModalProvider } from './context/DemoModalContext';
import { Reveal, RevealItem, RevealStagger } from './components/motion/Reveal';
import './App.css';

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

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`faq-item${isOpen ? ' active' : ''}`}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {question}
        <span className="faq-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <motion.div
        className="faq-answer-wrap"
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <div className="faq-answer">{answer}</div>
      </motion.div>
    </div>
  );
}

function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <DemoModalProvider>
      <ElectricalGridBackground />
      <div className="fluxgrid-app">
        <SiteHeader />

        <HeroScroll />
        <ProofSection />
        <HowItWorksSection />
        <AudienceSection />

        <section className="faq-section" id="faq">
          <div className="container faq-layout">
            <Reveal className="faq-header">
              <h2 className="section-title section-title--left">Questions from shop owners</h2>
              <p className="section-subtitle section-subtitle--left">
                Setup, caller experience, and how FluxGrid works alongside your existing team.
              </p>
            </Reveal>

            <RevealStagger className="faq-list" stagger={0.06}>
              {faqItems.map((item, index) => (
                <RevealItem key={item.question}>
                  <FaqItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={activeFaq === index}
                    onToggle={() => toggleFaq(index)}
                  />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        <ClosingCta />
        <Footer />
        <DemoModal />
      </div>
    </DemoModalProvider>
  );
}

export default App;
