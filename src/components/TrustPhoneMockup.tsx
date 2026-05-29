import type { ReactNode } from 'react';

function StatusBarIcons() {
  return (
    <div className="iphone15__status-icons" aria-hidden="true">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
        <rect x="0" y="8" width="3" height="4" rx="0.8" fill="currentColor" />
        <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill="currentColor" />
        <rect x="9" y="3" width="3" height="9" rx="0.8" fill="currentColor" />
        <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="currentColor" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path
          d="M8 2.2C10.4 2.2 12.5 3.1 14.1 4.5L15.5 3C13.5 1.2 10.9 0 8 0S2.5 1.2 0.5 3L1.9 4.5C3.5 3.1 5.6 2.2 8 2.2Z"
          fill="currentColor"
        />
        <path
          d="M8 5.5C9.5 5.5 10.9 6.1 12 7.1L13.4 5.7C11.9 4.4 10 3.6 8 3.6S4.1 4.4 2.6 5.7L4 7.1C5.1 6.1 6.5 5.5 8 5.5Z"
          fill="currentColor"
        />
        <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
      </svg>
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="22"
          height="12"
          rx="3.5"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
        <path
          d="M24 4.5C24.8 5 25.3 5.7 25.3 6.5C25.3 7.3 24.8 8 24 8.5V4.5Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>
    </div>
  );
}

type CallControlProps = {
  label: string;
  children: ReactNode;
  active?: boolean;
  end?: boolean;
};

function CallControl({ label, children, active, end }: CallControlProps) {
  return (
    <div className="ios-call__control">
      <div
        className={[
          'ios-call__control-btn',
          active ? 'ios-call__control-btn--active' : '',
          end ? 'ios-call__control-btn--end' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
      {!end && <span className="ios-call__control-label">{label}</span>}
    </div>
  );
}

export function TrustPhoneMockup() {
  return (
    <div className="trust-phone" aria-hidden="true">
      <div className="trust-phone__glow" />
      <div className="trust-phone__scale">
        <div className="iphone15">
          <div className="iphone15__chassis">
            <div className="iphone15__screen">
              <div className="iphone15__dynamic-island" />

              <div className="ios-call">
                <div className="ios-call__poster">
                  <div className="iphone15__status-bar iphone15__status-bar--call">
                    <span className="iphone15__status-time">9:14</span>
                    <StatusBarIcons />
                  </div>

                  <div className="ios-call__monogram">EC</div>

                  <div className="ios-call__identity">
                    <h2 className="ios-call__name">Homeowner — Oak St</h2>
                    <p className="ios-call__subtitle">mobile · partial outage</p>
                    <p className="ios-call__timer">00:42</p>
                  </div>
                </div>

                <div className="ios-call__controls">
                  <div className="ios-call__controls-row">
                    <CallControl label="Audio" active>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                        <path
                          d="M9 12.5H12L16 8.5V21.5L12 17.5H9C7.9 17.5 7 16.6 7 15.5V14.5C7 13.4 7.9 12.5 9 12.5Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 11.5C20.2 12.8 21 14.7 21 16.5C21 18.3 20.2 20.2 19 21.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21.5 9C23.4 11.1 24.5 13.7 24.5 16.5C24.5 19.3 23.4 21.9 21.5 24"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </CallControl>
                    <CallControl label="FaceTime">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                        <rect
                          x="5"
                          y="9"
                          width="15"
                          height="11"
                          rx="2.2"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                        <path
                          d="M20 13L25.5 9.5V19.5L20 16V13Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </CallControl>
                    <CallControl label="Mute">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                        <path
                          d="M12 13V17C12 18.1 12.9 19 14 19H15.2L18.8 22.6V19H20C21.1 19 22 18.1 22 17V13C22 11.9 21.1 11 20 11H14C12.9 11 12 11.9 12 13Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 11L20 21"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </CallControl>
                  </div>
                  <div className="ios-call__controls-row">
                    <CallControl label="Add">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                        <path
                          d="M15 8V22M8 15H22"
                          stroke="currentColor"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                        />
                      </svg>
                    </CallControl>
                    <CallControl label="End" end>
                      <span className="ios-call__end-text">End</span>
                    </CallControl>
                    <CallControl label="Keypad">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((dot) => (
                          <circle
                            key={dot}
                            cx={7.5 + (dot % 3) * 7.5}
                            cy={7.5 + Math.floor(dot / 3) * 7.5}
                            r="1.7"
                            fill="currentColor"
                          />
                        ))}
                      </svg>
                    </CallControl>
                  </div>
                </div>
              </div>

              <div className="iphone15__home-indicator" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
