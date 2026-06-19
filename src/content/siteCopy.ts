/**
 * Site-wide marketing copy. Revert this file (or run `git revert HEAD`) to undo
 * messaging updates in one step.
 */
export const siteCopy = {
  hero: {
    headline: 'Never Miss Another Job',
    lead:
      'We help electrical shop owners go from missed calls to booked jobs — through a 24/7 digital dispatcher that qualifies leads and books them directly into your CRM. Live in 7 days.',
    cta: 'See a demo call',
  },

  footer: {
    tagline:
      'We help electrical shop owners go from missed calls to booked jobs — through a 24/7 digital dispatcher. Live in 7 days.',
  },

  proof: {
    headline:
      "You aren't losing jobs to better companies. You're losing them to faster responses.",
    subhead:
      "Most businesses just send a text saying \"we'll call you back.\" We actually book the job. Homeowners don't wait — if your team is tied up, they click the next listing on Google.",
  },

  differentiator: {
    headline: 'Humans are slow. Automation isn\u2019t.',
    subhead:
      'That\u2019s why a missed call becomes a booked job in under a minute — not a callback tomorrow.',
  },

  howItWorks: {
    eyebrow: 'How it works',
    intro:
      'To get you from missed calls to booked jobs, we instantly answer the caller, qualify the job, and schedule it directly into your CRM.',
    steps: [
      {
        num: '01',
        title: 'Answer instantly',
        description:
          'When you\u2019re closed or on another call — on the same phone number your customers already dial.',
      },
      {
        num: '02',
        title: 'Qualify the job',
        description:
          "Your intake questions cover what's wrong, where, and whether it needs the on-call tech now.",
      },
      {
        num: '03',
        title: 'Schedule into your CRM',
        description:
          'The job lands with notes and priority. Dispatch handles it like any other job.',
      },
    ] as const,
  },

  about: {
    eyebrow: 'About us',
    title: 'You run the shop. We watch the line.',
    subtitle:
      'We help electrical shop owners go from missed calls to booked jobs — without adding work for your crew.',
    letter: [
      'FluxGrid is an automation agency with a single purpose: make sure a missed call doesn\u2019t become a missed job.',
      'We built it after talking with shop owners who had full crews and packed schedules but no good answer when the phone rang at the wrong time.',
      'Everything runs inside your existing CRM setup and phone number. We handle the setup, connect to your systems, and keep it running in the background. Your techs keep their routine.',
      'Solutions like this typically start at a fraction of the $4,000 human cost, depending on scope. We\u2019re straightforward to work with and happy to prove it on a live call.',
    ],
    cta: 'See a demo call',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers for shop owners.',
    items: [
      {
        num: '01',
        question: 'How does it work?',
        answer:
          'When you miss a call, we instantly answer on your line, qualify the job with your intake questions, and schedule it directly into your CRM — usually in under a minute.',
      },
      {
        num: '02',
        question: 'Do I need a new phone number or CRM?',
        answer:
          'No. This runs inside your existing CRM setup and phone number. There is no new dashboard for your crew to learn.',
      },
      {
        num: '03',
        question: 'Will this replace my office staff or diagnose jobs?',
        answer:
          'No. This fixes lost revenue from missed calls — it does not replace your team or diagnose electrical issues. Setup takes 7 days, then it runs 24/7 in the background.',
      },
      {
        num: '04',
        question: 'How does pricing compare to hiring someone?',
        answer:
          'Solutions like this typically start at a fraction of the $4,000 human cost, depending on scope. We\u2019ll walk through what fits your shop on the demo call.',
      },
      {
        num: '05',
        question: 'What happens after I sign up?',
        answer:
          'The next step is simple: we secure the deposit and begin implementation immediately. Once the deposit is secured, setup begins and you\u2019ll have this live within 7 days. After delivery, we\u2019ll do a walkthrough so your team knows exactly how this works.',
      },
      {
        num: '06',
        question: 'Who do I contact if I need help?',
        answer:
          "You call us directly. FluxGrid isn\u2019t a faceless corporation. We built it, we launch it for your shop, and you get a direct line when you need us.",
      },
    ] as const,
  },

  closingCta: {
    eyebrow: 'Get started',
    title: 'The next step is simple.',
    text:
      'Book a demo call, secure your deposit, and we begin implementation immediately. Live within 7 days — with a walkthrough so your team knows exactly how this works.',
    cta: 'Book a demo call',
    note: 'Runs 24/7 · Does not replace your team · Setup in 7 days',
  },

  demoModal: {
    title: 'See a demo call',
    intro:
      'Ten minutes. We run a sample electrical intake, walk through scope and pricing, and show the job landing on your dispatch board.',
    successTitle: 'Let\u2019s lock in your walkthrough',
    successIntro:
      'Select a time below. After your demo, we secure the deposit, begin setup, and have you live within 7 days.',
  },
} as const;
