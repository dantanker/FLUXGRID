const faqItems = [
  {
    question: 'How does it work?',
    answer:
      'When you miss a call, the engine instantly texts the lead back, qualifies what electrical service they need, and books the job directly into your existing calendar—all in under 30 seconds.',
  },
  {
    question: 'Do I have to learn a new software?',
    answer:
      'No. There is no dashboard to log into and nothing new to learn. I manage the entire system in the background so you can stay focused on your trucks.',
  },
  {
    question: 'Who do I contact if I need help?',
    answer:
      "You call me directly. FluxGrid isn't a faceless corporation. I built the system, I launch it for your shop, and you will have my direct cell phone number.",
  },
] as const;

export function FaqSection() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-section__grid electrical-grid-bg" aria-hidden="true" />

      <div className="container faq-inner">
        <h2 id="faq-heading" className="sr-only">
          Frequently asked questions
        </h2>

        <dl className="faq-stack">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="faq-stack__question">{item.question}</dt>
              <dd className="faq-stack__answer">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
