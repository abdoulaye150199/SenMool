import { useNavigate } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { features, components, impactStats, roadmap, partners } from '@/mocks/senmool';
import DemoVideo from '@/components/feature/DemoVideo';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[520px] md:h-[700px] overflow-hidden bg-ocean-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=Dark%20deep%20ocean%20underwater%20scene%20with%20subtle%20teal%20bioluminescent%20particles%20and%20light%20rays%20filtering%20from%20above%2C%20abstract%20digital%20circuit%20patterns%20glowing%20in%20cyan%20on%20the%20ocean%20floor%2C%20mysterious%20underwater%20atmosphere%20with%20dark%20navy%20blue%20tones%2C%20minimal%20and%20clean%20aesthetic%20suitable%20for%20a%20technology%20hero%20background%2C%20no%20text%2C%20no%20objects%2C%20just%20abstract%20deep%20sea&width=1400&height=800&seq=hero-bg&orientation=landscape')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/60 via-ocean-900/40 to-ocean-900/80" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center pt-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-senegal-green flex items-center justify-center">
              <i className="ri-anchor-line text-white text-lg" />
            </div>
            <div className="flex">
              <div className="w-3 h-3 rounded-full bg-senegal-green" />
              <div className="w-3 h-3 rounded-full bg-senegal-yellow" />
              <div className="w-3 h-3 rounded-full bg-senegal-red" />
            </div>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight max-w-4xl leading-tight">
            SEN-MOOL
            <span className="text-ocean-300"> PROTECT</span>
            <span className="text-senegal-green"> 2.0</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-ocean-100 max-w-2xl leading-relaxed">
            Souveraineté Numérique & Économie Bleue — New Deal Technologique 2026
          </p>
          <p className="mt-3 text-sm md:text-base text-ocean-200 max-w-xl">
            Bracelet connecté Mool-Safe, app mobile inclusive et dashboard Mool-Control
            pour protéger les travailleurs de la mer au Sénégal.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => navigate('/bracelet')}
              className="px-6 py-3 bg-senegal-green text-white rounded-full font-medium text-sm hover:bg-emerald-700 transition-all whitespace-nowrap flex items-center justify-center gap-2"
            >
              <i className="ri-device-line" />
              Découvrir Mool-Safe
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-white/15 text-white rounded-full font-medium text-sm hover:bg-white/25 transition-all backdrop-blur-sm whitespace-nowrap flex items-center justify-center gap-2"
            >
              <i className="ri-dashboard-line" />
              Dashboard Mool-Control
            </button>
          </div>

          <div className="mt-10 md:mt-14 w-full max-w-md mx-auto">
            <img
              src="https://readdy.ai/api/search-image?query=A%20futuristic%20maritime%20smartwatch%20bracelet%20floating%20in%20dark%20blue%20ocean%20water%20with%20glowing%20cyan%20teal%20light%20accents%2C%20OLED%20screen%20showing%20GPS%20coordinates%20and%20SOS%20status%2C%20dark%20navy%20silicone%20band%20with%20small%20Senegal%20flag%20colors%20detail%2C%20product%20photography%20on%20deep%20sea%20background%20with%20subtle%20water%20ripples%2C%20high%20tech%20IoT%20wearable%20device%2C%20dramatic%20lighting%2C%20no%20text%20on%20screen%2C%20photorealistic&width=500&height=380&seq=hero-bracelet&orientation=squarish"
              alt="Bracelet Mool-Safe"
              className="w-full h-auto rounded-2xl shadow-2xl shadow-ocean-900/50"
            />
          </div>
        </div>
      </section>

      {/* DÉMO VIDÉO */}
      <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-white">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">
              Démonstration Interactive
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">
              Découvrez les 4 composantes en action
            </h2>
            <p className="text-ocean-500 text-sm mt-3 max-w-lg mx-auto">
              Une simulation visuelle des interfaces Mool-Safe, App Mobile, Dashboard et Voisin de Mer — le tout, en temps réel.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <DemoVideo />
        </AnimatedSection>
        <AnimatedSection>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-ocean-600 text-sm">
              <i className="ri-device-line text-senegal-green" />
              <span>Mool-Safe — Bracelet</span>
            </div>
            <div className="flex items-center gap-2 text-ocean-600 text-sm">
              <i className="ri-smartphone-line text-senegal-green" />
              <span>App Mobile — Inclusive</span>
            </div>
            <div className="flex items-center gap-2 text-ocean-600 text-sm">
              <i className="ri-dashboard-line text-senegal-green" />
              <span>Mool-Control — Dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-ocean-600 text-sm">
              <i className="ri-ship-line text-senegal-green" />
              <span>Voisin de Mer — Mesh</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 3 PILIERS */}
      <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-ocean-50">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">
              Les 3 Piliers
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">
              Vision du New Deal Technologique
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f) => (
            <AnimatedSection key={f.title} className="h-full">
              <div className="bg-white rounded-2xl p-6 md:p-8 h-full border border-ocean-100 hover:border-ocean-200 transition-all hover:shadow-lg group">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    f.color === 'senegal-green'
                      ? 'bg-emerald-100 text-emerald-700'
                      : f.color === 'senegal-yellow'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <i className={`${f.icon} text-xl`} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ocean-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-ocean-600 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* COMPOSANTES */}
      <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-white">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">
              Composantes du Système
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">
              Trois briques, une vision
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto space-y-16">
          {components.map((comp, idx) => (
            <AnimatedSection key={comp.name}>
              <div
                className={`flex flex-col ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 md:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={comp.image}
                      alt={comp.name}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <span className="text-senegal-green text-xs font-semibold tracking-wider uppercase">
                    {comp.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2 mb-5">
                    {comp.name}
                  </h3>
                  <div className="space-y-3">
                    {comp.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-start gap-3 bg-ocean-50 rounded-lg p-3 border border-ocean-100"
                      >
                        <div className="w-6 h-6 rounded-full bg-ocean-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-ocean-600 text-xs" />
                        </div>
                        <div>
                          <span className="text-ocean-400 text-xs font-medium">
                            {spec.label}
                          </span>
                          <p className="text-ocean-800 text-sm font-medium">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {comp.name === 'Mool-Safe' && (
                    <button
                      onClick={() => navigate('/bracelet')}
                      className="mt-5 px-5 py-2.5 bg-ocean-900 text-white rounded-full text-sm font-medium hover:bg-ocean-800 transition-all whitespace-nowrap flex items-center gap-2 w-fit"
                    >
                      <i className="ri-device-line" />
                      Simuler le bracelet
                    </button>
                  )}
                  {comp.name === 'Mool-Control' && (
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="mt-5 px-5 py-2.5 bg-ocean-900 text-white rounded-full text-sm font-medium hover:bg-ocean-800 transition-all whitespace-nowrap flex items-center gap-2 w-fit"
                    >
                      <i className="ri-dashboard-line" />
                      Ouvrir le dashboard
                    </button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-ocean-900">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-ocean-300 text-xs font-semibold tracking-widest uppercase">
              Impacts Socio-Économiques
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-2">
              Des chiffres qui sauvent des vies
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {impactStats.map((stat) => (
            <AnimatedSection key={stat.label}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-ocean-200 text-2xl`} />
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl text-white">
                  {stat.value}
                </div>
                <p className="text-ocean-300 text-sm mt-2">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FEUILLE DE ROUTE */}
      <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-white">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">
              Feuille de Route Opérationnelle
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">
              Deux ans pour changer la donne
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ocean-100" />
            {roadmap.map((item, idx) => (
              <AnimatedSection key={item.step}>
                <div
                  className={`relative flex items-start gap-6 md:gap-0 mb-10 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10">
                    <div
                      className={`w-full h-full rounded-full ${
                        item.status === 'in_progress'
                          ? 'bg-senegal-green'
                          : 'bg-ocean-200'
                      }`}
                    />
                  </div>
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      idx % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
                    }`}
                  >
                    <div className="bg-ocean-50 rounded-xl p-5 border border-ocean-100 inline-block text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'in_progress'
                              ? 'bg-senegal-green/10 text-senegal-green'
                              : 'bg-ocean-100 text-ocean-500'
                          }`}
                        >
                          {item.status === 'in_progress' ? 'En cours' : 'À venir'}
                        </span>
                        <span className="text-ocean-400 text-xs font-medium">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-ocean-900 text-sm mb-1">
                        Étape {item.step} : {item.phase}
                      </h4>
                      <p className="text-ocean-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="w-full px-6 md:px-10 py-16 md:py-20 bg-ocean-50">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">
              Écosystème de Réalisation
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">
              Unis pour la souveraineté
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {partners.map((p) => (
            <AnimatedSection key={p.name}>
              <div className="bg-white rounded-xl p-5 border border-ocean-100 flex items-start gap-4 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-ocean-100 flex items-center justify-center flex-shrink-0">
                  <i className={`${p.icon} text-ocean-600 text-lg`} />
                </div>
                <div>
                  <h4 className="font-medium text-ocean-900 text-sm">{p.name}</h4>
                  <p className="text-ocean-400 text-xs mt-0.5">{p.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full px-6 md:px-10 py-16 md:py-20 bg-ocean-900">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
              Tester le prototype maintenant
            </h2>
            <p className="text-ocean-200 text-sm md:text-base mb-8">
              Explorez les 3 interfaces du système SEN-MOOL PROTECT 2.0 :
              bracelet, application mobile et dashboard de commandement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/bracelet')}
                className="px-6 py-3 bg-senegal-green text-white rounded-full font-medium text-sm hover:bg-emerald-700 transition-all whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-device-line" />
                Simuler Mool-Safe
              </button>
              <button
                onClick={() => navigate('/app-mobile')}
                className="px-6 py-3 bg-white/15 text-white rounded-full font-medium text-sm hover:bg-white/25 transition-all whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-smartphone-line" />
                App Mobile
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-white/15 text-white rounded-full font-medium text-sm hover:bg-white/25 transition-all whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-dashboard-line" />
                Mool-Control
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
