const timelineEvents = [
  {
    time: '09:14 PM',
    label: 'Phone Intercept',
    body: '"Breaker sparking, smelling burning plastic"',
    accent: 'border-l-orange-500',
    tag: 'text-orange-400',
  },
  {
    time: '09:15 PM',
    label: 'Trade Logic Analysis',
    body: 'Classified: High-Priority Emergency Hazard',
    accent: 'border-l-blue-500',
    tag: 'text-blue-400',
  },
  {
    time: '09:16 PM',
    label: 'CRM Automated Action',
    body: 'Emergency slot booked — crew notified',
    accent: 'border-l-emerald-500',
    tag: 'text-emerald-400',
  },
];

const calendarHours = ['6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];

export function HeroScrollDemo() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-zinc-950 p-4 font-sans text-white md:p-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 md:pb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 md:text-xs">
            FluxGrid Engine v1.0 // Active
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 md:text-xs">Connected to ServiceTitan</div>
      </div>

      <div className="my-auto grid flex-1 grid-cols-1 gap-4 py-4 md:grid-cols-2 md:gap-6 md:py-6">
        <div className="space-y-2 md:space-y-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 md:text-xs">
            Live Feed
          </div>
          {timelineEvents.map((event) => (
            <div
              key={event.label}
              className={`rounded-lg border border-zinc-800 border-l-4 bg-zinc-900/80 px-3 py-2 md:px-4 md:py-3 ${event.accent}`}
            >
              <div className={`font-mono text-[10px] md:text-xs ${event.tag}`}>
                {event.time} · {event.label}
              </div>
              <div className="mt-1 text-xs text-zinc-200 md:text-sm">{event.body}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 md:p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 md:text-xs">
              Tonight&apos;s Schedule
            </span>
            <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400 md:text-xs">
              1 slot added
            </span>
          </div>

          <div className="space-y-2">
            {calendarHours.map((hour) => {
              const isHighlighted = hour === '9 PM';

              return (
                <div
                  key={hour}
                  className={`flex items-center gap-3 rounded-lg border px-2 py-2 md:px-3 ${
                    isHighlighted
                      ? 'border-orange-500/50 bg-orange-500/10'
                      : 'border-zinc-800 bg-zinc-950/50'
                  }`}
                >
                  <span className="w-10 shrink-0 font-mono text-[10px] text-zinc-500 md:text-xs">{hour}</span>
                  {isHighlighted ? (
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-semibold text-orange-400 md:text-sm">
                        Emergency — Panel Hazard
                      </div>
                      <div className="truncate text-[10px] text-zinc-400 md:text-xs">
                        Auto-dispatched · Tech #4
                      </div>
                    </div>
                  ) : (
                    <div className="h-2 flex-1 rounded bg-zinc-800/80" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
