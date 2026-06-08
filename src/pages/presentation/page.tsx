import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'SEN-MOOL PROTECT 2.0',
    subtitle: 'Souveraineté Numérique & Économie Bleue — New Deal Technologique 2026',
    type: 'hero',
    accent: 'bg-senegal-green',
    content: [
      'Un bracelet connecté maritime Made in Sénégal',
      'Une app mobile inclusive (Wolof, Pulaar, Serer)',
      'Un dashboard temps réel pour la Marine Nationale',
      'Souveraineté totale des données sur SENUM SA',
    ],
    stat: '1,247 bracelets déployés — 47 vies sauvées',
    icon: 'ri-anchor-line',
  },
  {
    id: 2,
    title: 'Le Problème',
    subtitle: '312 disparitions en mer chaque année au Sénégal',
    type: 'problem',
    accent: 'bg-alert-red',
    content: [
      '45% des alertes VHF perdues en mer — couverture insuffisante',
      'Temps de réponse SAR moyen : 38 minutes — trop long',
      'Aucun système prédictif des zones à risque',
      'Données des pêcheurs transitant par des serveurs étrangers',
      '12% seulement de la zone côtière couverte en temps réel',
    ],
    stat: 'Coût humain : 312 familles endeuillées chaque année',
    icon: 'ri-alarm-warning-line',
  },
  {
    id: 3,
    title: 'Mool-Safe',
    subtitle: 'Le bracelet connecté maritime — Made in Sénégal',
    type: 'product',
    accent: 'bg-ocean-600',
    content: [
      'GPS < 3m | Détection noyade auto 5 sec immersion',
      'Dual-Signal : fréquences nationales sécurisées + 4G',
      'Mesh Network : communication p2p entre bracelets (3km)',
      'IP68 | Autonomie 72h | OLED 1.3"',
      'Assemblage 100% au PTN Diamniadio — 45 emplois créés',
    ],
    stat: '98% des alertes atteignent leur destination',
    icon: 'ri-device-line',
  },
  {
    id: 4,
    title: 'App Mobile Pêcheur',
    subtitle: 'Inclusion technologique totale',
    type: 'product',
    accent: 'bg-senegal-green',
    content: [
      'Interface 100% visuelle ET vocale — Wolof, Pulaar, Serer',
      'Météo marine GO/NO-GO avec fenêtres dangereuses',
      'Carte temps réel avec positions des pirogues',
      'Protocole Voisin de Mer — solidarité communautaire',
      'Dossier médical partagé UNIQUEMENT en cas de SOS',
    ],
    stat: 'Accessible à tous, même sans alphabétisation',
    icon: 'ri-smartphone-line',
  },
  {
    id: 5,
    title: 'Dashboard Mool-Control',
    subtitle: 'Commandement temps réel — Marine Nationale',
    type: 'product',
    accent: 'bg-ocean-800',
    content: [
      'Carte Sénégal temps réel : 1,247 points actifs',
      'Alertes SOS instantanées + confirmation prise en charge',
      'IA prédictive : cartographie zones à risque 6h avant',
      'Météo marine intégrée avec strip horaire GO/NO-GO',
      'Historique trajets + analytics complet',
    ],
    stat: 'Temps de réponse : 6.2 minutes — vs. 38 min avant',
    icon: 'ri-dashboard-line',
  },
  {
    id: 6,
    title: 'Voisin de Mer',
    subtitle: 'Protocole de solidarité maritime communautaire',
    type: 'feature',
    accent: 'bg-senegal-yellow',
    content: [
      'Mesh Network : relais p2p entre bracelets sans réseau',
      '3 pirogues proches alertées en < 2 min en cas de SOS',
      'Intervention citoyenne avant secours officiels',
      '312 nœuds actifs, portée moyenne 3.2 km',
      'Fonctionne hors-ligne — résilience totale',
    ],
    stat: 'Intervention citoyenne moyenne : 9 minutes',
    icon: 'ri-group-line',
  },
  {
    id: 7,
    title: 'Souveraineté Numérique',
    subtitle: '100% des données restent au Sénégal',
    type: 'feature',
    accent: 'bg-ocean-700',
    content: [
      'Cloud National SENUM SA — hébergement territorial',
      'Aucun transit des données vers serveurs étrangers',
      'Chiffrement AES-256 end-to-end',
      'Dossiers médicaux chiffrés — accès SOS uniquement',
      'RGPD adapté au contexte sénégalais — traçabilité totale',
    ],
    stat: 'Souveraineté totale des données maritimes',
    icon: 'ri-shield-check-line',
  },
  {
    id: 8,
    title: 'Impact Socio-Économique',
    subtitle: 'Des chiffres qui sauvent des vies',
    type: 'impact',
    accent: 'bg-senegal-green',
    content: [
      '47 vies sauvées depuis janvier 2026',
      '-67% des disparitions en mer vs. 2024',
      '156M FCFA de pertes matérielles évitées',
      '45 emplois directs au PTN Diamniadio',
      '1,247 familles de pêcheurs protégées',
    ],
    stat: 'Réduction 84% du temps de réponse SAR',
    icon: 'ri-heart-pulse-line',
  },
  {
    id: 9,
    title: 'Feuille de Route',
    subtitle: '2026 — 2028 : Deux ans pour changer la donne',
    type: 'roadmap',
    accent: 'bg-ocean-600',
    content: [
      '2026 : Prototypage industriel au PTN + pilote Saint-Louis',
      '2026-2027 : Intégration systèmes Marine Nationale',
      '2027 : Test grandeur nature saison des fortes houles',
      '2028+ : Généralisation nationale — équipement obligatoire',
      '5,000 bracelets cible 2028 | Zone économique exclusive',
    ],
    stat: 'Déjà 1,247 bracelets — 94% couverture côtière pilote',
    icon: 'ri-road-map-line',
  },
  {
    id: 10,
    title: 'SEN-MOOL PROTECT 2.0',
    subtitle: 'La souveraineté numérique au service de l\'économie bleue',
    type: 'cta',
    accent: 'bg-senegal-green',
    content: [
      'Prototype web fonctionnel prêt pour démonstration',
      '3 interfaces simulées : bracelet, app, dashboard',
      'Météo marine GO/NO-GO temps réel',
      'Mesh Network Voisin de Mer opérationnel',
      'IA prédictive des zones à risque intégrée',
    ],
    stat: 'Tester le prototype maintenant →',
    icon: 'ri-play-circle-line',
  },
];

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const SLIDE_DURATION = 15000;

  const goTo = useCallback((index: number) => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setProgress(0);
      setIsExiting(false);
    }, 300);
  }, []);

  const next = useCallback(() => {
    goTo((currentSlide + 1) % slides.length);
  }, [currentSlide, goTo]);

  const prev = useCallback(() => {
    goTo((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goTo]);

  // Auto-advance + progress bar
  useEffect(() => {
    if (isPaused) return;
    const interval = 100;
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) {
          next();
          return 0;
        }
        return p + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Escape') {
        navigate('/');
      } else if (e.key === 'p') {
        setIsPaused((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, navigate]);

  const slide = slides[currentSlide];
  const isDark = slide.type === 'hero' || slide.type === 'cta' || slide.type === 'problem' || slide.type === 'product' || slide.type === 'feature' || slide.type === 'roadmap';

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${isDark ? 'bg-ocean-900' : 'bg-white'}`}>
      {/* Top bar: progress + slide counter */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center px-6 md:px-10 pt-4 md:pt-6 gap-3">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-senegal-green rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Prototype badge */}
          <span className="text-[10px] font-bold bg-amber-400/90 text-white px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
            <i className="ri-flask-line text-[9px]" />
            MAQUETTE
          </span>
          <span className={`text-xs font-medium ${isDark ? 'text-ocean-300' : 'text-ocean-400'}`}>
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPaused ? 'bg-senegal-green text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <i className={isPaused ? 'ri-play-line text-xs' : 'ri-pause-line text-xs'} />
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-full bg-white/10 text-white/60 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <i className="ri-close-line text-xs" />
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-20">
        <div
          className={`max-w-4xl w-full transition-all duration-300 ${
            isExiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}
        >
          {/* Slide number badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${slide.accent} flex items-center justify-center text-white`}>
              <i className={`${slide.icon} text-lg`} />
            </div>
            <span className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-ocean-300' : 'text-ocean-400'}`}>
              Slide {currentSlide + 1}
            </span>
          </div>

          <h1
            className={`font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-3 ${
              isDark ? 'text-white' : 'text-ocean-900'
            }`}
          >
            {slide.title}
          </h1>
          <p className={`text-lg md:text-xl mb-10 ${isDark ? 'text-ocean-200' : 'text-ocean-600'}`}>
            {slide.subtitle}
          </p>

          <div className="space-y-4 mb-10">
            {slide.content.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isDark ? 'bg-white/10' : 'bg-ocean-100'}`}>
                  <i className={`ri-check-line text-xs ${isDark ? 'text-senegal-green' : 'text-ocean-600'}`} />
                </div>
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-ocean-100' : 'text-ocean-700'}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Stat highlight */}
          <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-ocean-50 border border-ocean-100'}`}>
            <div className={`w-8 h-8 rounded-lg ${slide.accent} flex items-center justify-center`}>
              <i className={`${slide.icon} text-white text-sm`} />
            </div>
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-ocean-900'}`}>
              {slide.stat}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className={`px-6 md:px-10 py-4 flex items-center justify-between ${isDark ? 'border-t border-white/10' : 'border-t border-ocean-100'}`}>
        <button
          onClick={prev}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isDark ? 'text-ocean-300 hover:bg-white/10' : 'text-ocean-500 hover:bg-ocean-50'
          }`}
        >
          <i className="ri-arrow-left-line" />
          Précédent
        </button>

        <div className="hidden md:flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-senegal-green' : 'w-2 bg-ocean-300/30 hover:bg-ocean-300/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isDark ? 'text-ocean-300 hover:bg-white/10' : 'text-ocean-500 hover:bg-ocean-50'
          }`}
        >
          Suivant
          <i className="ri-arrow-right-line" />
        </button>
      </div>
    </div>
  );
}
