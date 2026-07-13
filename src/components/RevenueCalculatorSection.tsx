import type { CSSProperties } from 'react';
import { useState } from 'react';
import { DemoCtaButton } from './DemoCtaButton';
import { Reveal } from './motion/Reveal';

const BOOKING_RATE = 0.7;
const CALLS_MIN = 2;
const CALLS_MAX = 30;
const CALLS_DEFAULT = 8;
const TICKET_MIN = 150;
const TICKET_MAX = 3000;
const TICKET_DEFAULT = 450;

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

function rangeProgress(value: number, min: number, max: number) {
  return `${((value - min) / (max - min)) * 100}%`;
}

export function RevenueCalculatorSection() {
  const [calls, setCalls] = useState(CALLS_DEFAULT);
  const [ticket, setTicket] = useState(TICKET_DEFAULT);

  const weeklyLoss = Math.round(calls * BOOKING_RATE * ticket);
  const annualLoss = weeklyLoss * 52;

  return (
    <section
      className="revenue-calc-section"
      id="revenue-calculator"
      aria-labelledby="revenue-calc-heading"
    >
      <div className="container">
        <Reveal className="revenue-calc-header">
          <p className="revenue-calc-eyebrow">Revenue calculator</p>
          <h2 id="revenue-calc-heading" className="revenue-calc-title">
            What is your missed call bottleneck costing you?
          </h2>
        </Reveal>

        <div className="calc-box revenue-calc-box">
          <div className="calc-inputs">
            <div className="slider-group">
              <div className="slider-label">
                <label htmlFor="calls">Missed calls per week</label>
                <span className="value-display" aria-live="polite">
                  {calls}
                </span>
              </div>
              <input
                type="range"
                id="calls"
                min={CALLS_MIN}
                max={CALLS_MAX}
                value={calls}
                style={
                  {
                    '--range-progress': rangeProgress(calls, CALLS_MIN, CALLS_MAX),
                  } as CSSProperties
                }
                onChange={(event) => setCalls(Number(event.target.value))}
              />
              <div className="revenue-calc-range-labels">
                <span>2 calls</span>
                <span>30 calls</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <label htmlFor="ticket">Average electrical ticket</label>
                <span className="value-display" aria-live="polite">
                  {formatCurrency(ticket)}
                </span>
              </div>
              <input
                type="range"
                id="ticket"
                min={TICKET_MIN}
                max={TICKET_MAX}
                step={50}
                value={ticket}
                style={
                  {
                    '--range-progress': rangeProgress(ticket, TICKET_MIN, TICKET_MAX),
                  } as CSSProperties
                }
                onChange={(event) => setTicket(Number(event.target.value))}
              />
              <div className="revenue-calc-range-labels">
                <span>$150</span>
                <span>$3,000+</span>
              </div>
            </div>
          </div>

          <div className="calc-results revenue-calc-results">
            <p className="revenue-calc-stat-label">Weekly leaked revenue</p>
            <p className="revenue-calc-weekly" aria-live="polite">
              {formatCurrency(weeklyLoss)}
            </p>

            <div className="revenue-calc-divider" aria-hidden="true" />

            <p className="revenue-calc-stat-label">Annual revenue recovered</p>
            <p className="leak-counter revenue-calc-annual" aria-live="polite">
              {formatCurrency(annualLoss)}
            </p>
            <p className="revenue-calc-note">
              Based on an industry-standard 70% booking rate on captured service calls.
            </p>

            <DemoCtaButton className="revenue-calc-cta">Book a demo</DemoCtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
