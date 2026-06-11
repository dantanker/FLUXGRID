import { Reveal, RevealItem, RevealStagger } from './motion/Reveal';

const traits = [
  { label: 'Shop size', value: '3–20 electricians' },
  { label: 'When you need it', value: 'After hours & busy lines' },
  { label: 'Your stack', value: 'ServiceTitan, Jobber, Housecall Pro' },
];

export function AudienceSection() {
  return (
    <section className="fit-section" id="who-its-for" aria-labelledby="audience-heading">
      <div className="container fit-inner">
        <Reveal>
          <h2 id="audience-heading" className="fit-title">
            For electrical shop owners.
          </h2>
          <p className="fit-lead">
            Overflow phone coverage — not a replacement for your dispatcher.
          </p>
        </Reveal>

        <RevealStagger className="fit-traits" stagger={0.08}>
          {traits.map((trait) => (
            <RevealItem key={trait.label} className="fit-trait">
              <span className="fit-trait__label">{trait.label}</span>
              <span className="fit-trait__value">{trait.value}</span>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
