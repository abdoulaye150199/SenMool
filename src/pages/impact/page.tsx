import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { caseStudies, testimonials, impactMetrics, economicBenefits, timelineEvents, beforeAfterData } from '@/mocks/impact';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

function MetricCard({ metric }: { metric: typeof impactMetrics[0] }) {
  const colorMap = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    ocean: 'bg-ocean-50 text-ocean-700 border-ocean-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    yellow: 'bg-amber-50 text-amber-700 border-amber-100',
  };
  const iconColorMap = {
    green: 'text-emerald-600',
    ocean: 'text-ocean-600',
    red: 'text-red-600',
    yellow: 'text-amber-600',
  };

  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${colorMap[metric.color]}`}>
      <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm`}>
        <i className={`${metric.icon} ${iconColorMap[metric.color]} text-lg`} />
      </div>
      <div className="font-display font-bold text-2xl md:text-3xl mb-1">{metric.value}</div>
      <div className="text-sm font-semibold mb-1">{metric.label}</div>
      <div className="text-xs opacity-70">{metric.sublabel}</div>
      <div className="mt-3 text-xs font-bold px-2 py-1 rounded-full bg-white/60 inline-block">{metric.change}</div>
    </div>
  );
}

export default function ImpactPage() {
  const [activeCase, setActiveCase] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ocean-50">
      {/* HERO */}
      <section className="relative bg-ocean-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/80 via-ocean-800/60 to-ocean-900/90" />
        <div className="relative z-10 w-full px-6 md:px-10 text-center">
          <span className="text-ocean-300 text-xs font-semibold tracking-widest uppercase">Impact Réel sur le Terrain</span>
          <h1 className="font-display font-bold text-2xl md:text-4xl text-white mt-3 max-w-3xl mx-auto leading-tight">
            Des vies sauvées, des familles protégées, une économie bleue plus sûre
          </h1>
          <p className="text-ocean-200 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Depuis le déploiement pilote de SEN-MOOL PROTECT 2.0 en janvier 2026, les chiffres parlent d'eux-mêmes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-white/15 text-white rounded-full text-sm font-medium hover:bg-white/25 transition-all whitespace-nowrap flex items-center gap-2">
              <i className="ri-dashboard-line" /> Dashboard Live
            </button>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-10 py-12 md:py-16 max-w-7xl mx-auto space-y-16">

        {/* METRICS GRID */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">KPIs Opérationnels</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Impacts Mesurables</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactMetrics.map((m) => (
              <MetricCard key={m.label} metric={m} />
            ))}
          </div>
        </AnimatedSection>

        {/* BEFORE / AFTER */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">Comparaison</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Avant / Après Mool-Safe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-red-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <i className="ri-close-circle-line text-red-500 text-lg" />
                </div>
                <h3 className="font-display font-semibold text-lg text-red-700">Avant Mool-Safe</h3>
              </div>
              <div className="space-y-4">
                {beforeAfterData.before.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-ocean-700 text-sm font-medium">{item.label}</span>
                    <span className="text-red-600 text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <i className="ri-check-double-line text-emerald-600 text-lg" />
                </div>
                <h3 className="font-display font-semibold text-lg text-emerald-700">Avec Mool-Safe</h3>
              </div>
              <div className="space-y-4">
                {beforeAfterData.after.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-ocean-700 text-sm font-medium">{item.label}</span>
                    <span className="text-emerald-600 text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ÉTUDES DE CAS */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">Récits de Terrain</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Études de Cas</h2>
            <p className="text-ocean-500 text-sm mt-2 max-w-xl mx-auto">Trois sauvetages réels simulés depuis le déploiement pilote</p>
          </div>

          {/* Case selector tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  i === activeCase
                    ? 'bg-ocean-900 text-white'
                    : 'bg-white text-ocean-600 hover:bg-ocean-50 border border-ocean-100'
                }`}
              >
                {cs.id}
              </button>
            ))}
          </div>

          {/* Active case */}
          {(() => {
            const cs = caseStudies[activeCase];
            return (
              <div className="bg-white rounded-2xl border border-ocean-100 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      cs.outcome === 'rescued' ? 'bg-emerald-100 text-emerald-700' :
                      cs.outcome === 'prevented' ? 'bg-amber-100 text-amber-700' :
                      'bg-ocean-100 text-ocean-700'
                    }`}>
                      {cs.outcome === 'rescued' ? 'SAUVETAGE' : cs.outcome === 'prevented' ? 'PRÉVENTION' : 'ÉVACUATION'}
                    </span>
                    <span className="text-ocean-400 text-xs font-medium">{cs.date} — {cs.location}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl md:text-2xl text-ocean-900 mb-3">{cs.title}</h3>
                  <p className="text-ocean-600 text-sm leading-relaxed mb-6">{cs.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-ocean-50 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-xl text-ocean-900">{cs.responseTimeMin} min</div>
                      <div className="text-ocean-500 text-xs mt-1">Temps de réponse</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-xl text-emerald-700">{cs.livesSaved} vie{cs.livesSaved > 1 ? 's' : ''}</div>
                      <div className="text-emerald-600 text-xs mt-1">Sauvée{cs.livesSaved > 1 ? 's' : ''}</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-xl text-amber-700">{cs.economicImpact.split(',')[0]}</div>
                      <div className="text-amber-600 text-xs mt-1">Impact économique</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-ocean-800 mb-2">Récit complet</h4>
                    <p className="text-ocean-600 text-sm leading-relaxed">{cs.story}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                      <p className="text-red-700 text-xs font-bold mb-1">AVANT</p>
                      <p className="text-red-600 text-sm">{cs.beforeAfter.before}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="text-emerald-700 text-xs font-bold mb-1">APRÈS</p>
                      <p className="text-emerald-600 text-sm">{cs.beforeAfter.after}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="bg-ocean-100 text-ocean-700 text-xs px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </AnimatedSection>

        {/* TIMELINE */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">Historique</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Chronologie du Déploiement</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {timelineEvents.map((evt, i) => (
              <div key={i} className={`flex-1 bg-white rounded-xl p-5 border ${evt.highlight ? 'border-senegal-green' : 'border-ocean-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${evt.highlight ? 'bg-senegal-green' : 'bg-ocean-300'}`} />
                  <span className="text-ocean-400 text-xs font-bold">{evt.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-ocean-900 mb-1">{evt.label}</h4>
                <p className="text-ocean-500 text-xs">{evt.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ECONOMIC BENEFITS */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">Retombées Économiques</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Bénéfices pour le Sénégal</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {economicBenefits.map((eb, i) => (
              <div key={i} className="bg-white rounded-2xl border border-ocean-100 p-6">
                <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center mb-4">
                  <i className={`${eb.icon} text-ocean-600 text-lg`} />
                </div>
                <div className="font-display font-bold text-2xl text-ocean-900 mb-1">{eb.amount}</div>
                <div className="text-sm font-semibold text-ocean-700 mb-2">{eb.title}</div>
                {eb.perYear && <span className="text-[10px] font-bold text-senegal-green bg-emerald-50 px-2 py-0.5 rounded-full">/ an</span>}
                <p className="text-ocean-500 text-xs mt-2 leading-relaxed">{eb.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* TESTIMONIALS */}
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">Témoignages</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Ils utilisent Mool-Safe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-ocean-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-700 font-bold text-sm">
                    {t.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ocean-900">{t.name}</div>
                    <div className="text-ocean-400 text-xs">{t.role}</div>
                  </div>
                </div>
                <p className="text-ocean-600 text-sm leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-ocean-400 text-xs">{t.location}</span>
                  <span className="text-ocean-300 text-xs">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection>
          <div className="bg-ocean-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
              Continuer l'exploration
            </h2>
            <p className="text-ocean-200 text-sm md:text-base max-w-xl mx-auto mb-8">
              Découvrez les interfaces en direct : simulation du bracelet, app mobile, dashboard de commandement, et le mode présentation pour le pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate('/bracelet')} className="px-6 py-3 bg-senegal-green text-white rounded-full font-medium text-sm hover:bg-emerald-700 transition-all whitespace-nowrap flex items-center justify-center gap-2">
                <i className="ri-device-line" /> Simuler Bracelet
              </button>
              <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-white/15 text-white rounded-full font-medium text-sm hover:bg-white/25 transition-all whitespace-nowrap flex items-center justify-center gap-2">
                <i className="ri-dashboard-line" /> Dashboard
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
