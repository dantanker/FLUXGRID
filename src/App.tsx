import { useState, useEffect } from 'react';
import { Menu, X, Zap, Clock, CheckCircle, Phone, FileText, Database, ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogicMode, setIsLogicMode] = useState(false);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-sm border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F59E0B] rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#0F172A]" />
              </div>
              <span className="text-lg lg:text-xl font-bold tracking-tight">Grounded Logic AI</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#demo" className="text-sm text-gray-300 hover:text-white transition-colors">Demo</a>
              <a href="#solutions" className="text-sm text-gray-300 hover:text-white transition-colors">Solutions</a>
              <a href="#compare" className="text-sm text-gray-300 hover:text-white transition-colors">Compare</a>
              <a
                href="mailto:contact@groundedlogic.ai"
                className="bg-[#F59E0B] text-[#0F172A] px-5 py-2.5 rounded font-bold text-sm hover:bg-[#FCD34D] transition-all duration-300 hover:scale-105"
              >
                Book Audit <span className="ml-1">→</span>
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#0F172A] border-t border-[#1E293B] px-4 py-4 space-y-4">
            <a href="#demo" className="block text-sm text-gray-300 hover:text-white">Demo</a>
            <a href="#solutions" className="block text-sm text-gray-300 hover:text-white">Solutions</a>
            <a href="#compare" className="block text-sm text-gray-300 hover:text-white">Compare</a>
            <a
              href="mailto:contact@groundedlogic.ai"
              className="block bg-[#F59E0B] text-[#0F172A] px-5 py-2.5 rounded font-bold text-sm text-center"
            >
              Book Audit →
            </a>
          </div>
        )}
      </nav>

      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 max-w-4xl">
            The 24/7 AI Dispatcher Built For Busy Electrical Shops.
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 mb-10 max-w-3xl leading-relaxed">
            Instantly answer after-hours calls, triage emergencies, and book high-ticket jobs directly into your field CRM—automatically.
          </p>

          <a
            href="mailto:contact@groundedlogic.ai"
            className="inline-block bg-[#F59E0B] text-[#0F172A] px-8 py-4 rounded font-bold text-base lg:text-lg mb-14 hover:bg-[#FCD34D] transition-all duration-300 animate-pulse hover:scale-105"
          >
            Book Your Free 15-Minute Automation Audit <span className="ml-2">→</span>
          </a>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { value: '< 2s', label: 'AVG PICKUP TIME' },
              { value: '24/7', label: 'COVERAGE, NO PTO' },
              { value: '100%', label: 'DONE-FOR-YOU SETUP' },
              { value: '100%', label: 'LOGGED TO CRM' },
            ].map((metric, idx) => (
              <div key={idx} className="bg-[#1E293B] border border-gray-700/50 p-5 lg:p-6 rounded">
                <div className="text-3xl lg:text-4xl font-bold mb-1 font-mono text-[#F59E0B]">{metric.value}</div>
                <div className="text-xs lg:text-sm text-gray-500 font-mono tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 border-2 border-red-500/40 rounded-full animate-pulse"></div>
            </div>
            <div className="text-[#EF4444] font-mono text-xs lg:text-sm tracking-widest mb-3 uppercase">The Revenue Leak</div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 max-w-3xl mx-auto">
              Voicemail is where your highest-ticket electrical leads go to die.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'The $1,500 Missed Call',
                content: 'If a homeowner calls with an emergency panel blowout or a burning outlet at 8:00 PM and you\'re at dinner, they don\'t leave a message. They hang up and call the next electrician on Google. Every missed call is a premium job handed straight to your competitor.',
              },
              {
                title: 'The 15-Minute Ghost Town',
                content: 'Data shows that web leads contacted after 5 minutes drop in conversion by 80%. If someone requests an EV charger quote on your site while your crew is out in trucks, they\'ve already moved on by the time you check your email at night.',
              },
              {
                title: 'The Office Manager Burnout',
                content: 'Your office staff spends hours filtering out robocalls, tracking down missing billing addresses, and playing phone tag just to schedule a single diagnostic visit. It drags down efficiency and keeps your team completely bogged down in manual paperwork.',
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#1E293B] border border-red-500/30 p-6 lg:p-8 rounded">
                <h3 className="text-lg lg:text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-gray-500 font-mono text-xs lg:text-sm tracking-widest mb-3">SYS_002 // STATE_TOGGLE</div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              From chaos to order — flip the switch.
            </h2>
            <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
              Toggle between how your shop runs today and how it runs the moment Grounded Logic is plugged in.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center bg-[#1E293B] rounded-full p-1 border border-gray-700/50">
              <button
                onClick={() => setIsLogicMode(false)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  !isLogicMode
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                MANUAL CHAOS
              </button>
              <button
                onClick={() => setIsLogicMode(true)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  isLogicMode
                    ? 'bg-[#F59E0B] text-[#0F172A]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                GROUNDED LOGIC MODE
              </button>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500">
            <div className="p-4 border-b border-gray-700/50 bg-[#0F172A]/50">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isLogicMode ? 'bg-[#F59E0B]' : 'bg-red-500'} animate-pulse`}></div>
                <span className={`font-mono text-sm ${isLogicMode ? 'text-[#F59E0B]' : 'text-red-500'}`}>
                  {isLogicMode ? 'OPTIMAL' : 'DEGRADED'}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-gray-700/50">
              <div className="bg-[#1E293B] p-5 lg:p-6">
                <h3 className="font-mono text-xs text-gray-500 mb-4 tracking-wider">INBOUND CALLS</h3>
                <div className="space-y-3 mb-4">
                  {isLogicMode ? (
                    <>
                      <div className="text-sm"><span className="text-[#F59E0B]">08:14</span> – Booked via AI – Westside Reno</div>
                      <div className="text-sm"><span className="text-[#F59E0B]">08:32</span> – Booked via AI – Panel Upgrade</div>
                      <div className="text-sm"><span className="text-[#F59E0B]">09:15</span> – Emergency Dispatch</div>
                      <div className="text-sm"><span className="text-[#F59E0B]">09:47</span> – EV Charger Quote</div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-red-400">Missed – Westside Reno</div>
                      <div className="text-sm text-red-400">Missed – Voicemail full</div>
                      <div className="text-sm text-red-400">Missed – No answer</div>
                      <div className="text-sm text-red-400">Missed – After hours</div>
                    </>
                  )}
                </div>
                <div className={`font-mono text-xs ${isLogicMode ? 'text-[#F59E0B]' : 'text-red-500'}`}>
                  {isLogicMode ? '7 calls · 5 booked' : '7 missed · $0 booked'}
                </div>
              </div>

              <div className="bg-[#1E293B] p-5 lg:p-6">
                <h3 className="font-mono text-xs text-gray-500 mb-4 tracking-wider">WEB FORMS</h3>
                <div className="space-y-3 mb-4">
                  {isLogicMode ? (
                    <>
                      <div className="text-sm">Panel upgrade → <span className="text-[#F59E0B]">AI Text Bridge Sent</span></div>
                      <div className="text-xs text-gray-500 ml-4">Booked in 42s</div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-gray-300">Form: Panel upgrade – 14m ago</div>
                      <div className="text-xs text-red-400 ml-4">No reply sent</div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-[#1E293B] p-5 lg:p-6">
                <h3 className="font-mono text-xs text-gray-500 mb-4 tracking-wider">DISPATCH BOARD</h3>
                <div className="space-y-2 mb-4">
                  {isLogicMode ? (
                    <>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm border border-[#F59E0B]/30">09:00 – Westside Panel Repair</div>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm border border-[#F59E0B]/30">10:30 – EV Charger Install</div>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm border border-[#F59E0B]/30">11:45 – Emergency Outlet Fix</div>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm border border-[#F59E0B]/30">14:00 – Full Rewire Quote</div>
                    </>
                  ) : (
                    <>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm text-gray-600">— empty —</div>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm text-gray-600">— empty —</div>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm text-gray-600">— empty —</div>
                      <div className="bg-[#0F172A] p-2 rounded text-xs lg:text-sm text-gray-600">— empty —</div>
                    </>
                  )}
                </div>
                <div className={`font-mono text-xs lg:text-sm ${isLogicMode ? 'text-[#F59E0B]' : 'text-red-500'}`}>
                  {isLogicMode ? 'Revenue secured: $4,820' : 'Revenue at risk: $4,820'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-gray-500 font-mono text-xs lg:text-sm tracking-widest mb-3">SYS_003 // CORE_MODULES</div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              n8n-Powered Automation Stack
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Phone,
                title: '24/7 AI Voice Receptionist',
                content: 'Answers phone lines in under 2 seconds with human-like voice clarity, handles complex dispatch rules perfectly.',
              },
              {
                icon: FileText,
                title: 'Instant Text-Back Bridge',
                content: 'Instantly texts back website, Yelp, or Google form submissions before they look for a competitor.',
              },
              {
                icon: Database,
                title: 'Deep CRM Synchronization',
                content: 'Securely logs customer addresses, pricing tier data, and urgent job notes straight into Jobber or ServiceTitan with zero human double-entry.',
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#1E293B] border border-gray-700/50 p-6 lg:p-8 rounded hover:border-[#F59E0B]/30 transition-colors">
                <div className="w-12 h-12 bg-[#0F172A] border border-gray-700 rounded flex items-center justify-center mb-5">
                  <card.icon className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-gray-500 font-mono text-xs lg:text-sm tracking-widest mb-3">SYS_004 // COMPARE_MATRIX</div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              The Clear Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-gray-500 font-mono text-xs lg:text-sm tracking-wider border-b border-gray-700/50"></th>
                  <th className="text-center p-4 font-bold border-b border-gray-700/50 text-sm lg:text-base">Traditional Answering</th>
                  <th className="text-center p-4 font-bold border-b border-gray-700/50 text-sm lg:text-base">Built-In CRM AI</th>
                  <th className="text-center p-4 font-bold border-b border-[#F59E0B]/50 bg-[#F59E0B]/5 text-sm lg:text-base">
                    <span className="text-[#F59E0B]">Grounded Logic AI</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Setup Required', 'Hours of configuration', 'Manual integration', 'Zero configuration'],
                  ['Platform Coverage', 'Phone only', 'CRM only', 'Phone + Website + CRM'],
                  ['Trade Routing', 'Generic scripts', 'Basic triage', 'Complex multi-tier routing'],
                  ['Response Time', '10-30 seconds', '5-10 minutes', '< 2 seconds'],
                  ['After-Hours', 'Extra fees', 'Limited', 'Full 24/7 included'],
                  ['Monthly Cost', '$200-500+', 'Built into CRM tier', 'Flat rate, no surprises'],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700/30">
                    <td className="p-4 text-gray-300 font-mono text-xs lg:text-sm">{row[0]}</td>
                    <td className="p-4 text-center text-gray-500 text-xs lg:text-sm">{row[1]}</td>
                    <td className="p-4 text-center text-gray-500 text-xs lg:text-sm">{row[2]}</td>
                    <td className="p-4 text-center bg-[#F59E0B]/5 text-[#F59E0B] font-bold text-xs lg:text-sm">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A] border-t border-gray-700/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Ready to plug in?
          </h2>
          <p className="text-gray-400 text-base lg:text-lg mb-10 max-w-2xl mx-auto">
            Book your free 15-minute automation audit. We'll analyze your current workflow and show you exactly how Grounded Logic AI can transform your electrical business.
          </p>
          <a
            href="mailto:contact@groundedlogic.ai"
            className="inline-block bg-[#F59E0B] text-[#0F172A] px-8 py-4 rounded font-bold text-base lg:text-lg hover:bg-[#FCD34D] transition-all duration-300 animate-pulse hover:scale-105"
          >
            Book Your Free 15-Minute Automation Audit <span className="ml-2">→</span>
          </a>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#F59E0B] rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#0F172A]" />
            </div>
            <span className="font-bold text-sm">Grounded Logic AI</span>
          </div>
          <div className="text-gray-500 text-xs lg:text-sm font-mono">
            © 2024 Grounded Logic AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
