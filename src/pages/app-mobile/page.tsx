import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fishermen, alerts, appMobileMenu, todayHourlyWeather, fiveDayForecast, meshNodes } from '@/mocks/senmool-v2';
import { useNotifications } from '@/hooks/useNotifications';
import ToastContainer from '@/components/base/Toast';
import PrototypeBanner from '@/components/base/PrototypeBanner';

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function getCurrentHourIndex() {
  const now = new Date();
  const h = now.getHours();
  const idx = todayHourlyWeather.findIndex((w) => parseInt(w.hour) > h);
  return idx === -1 ? todayHourlyWeather.length - 1 : idx;
}

export default function AppMobilePage() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [sosPressed, setSosPressed] = useState(false);
  const [language, setLanguage] = useState('Wolof');
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedWeatherHour, setExpandedWeatherHour] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toasts, removeToast, success, warning } = useNotifications();

  useEffect(() => {
    const p = location.pathname;
    if (p.includes('/carte')) setActiveTab('carte');
    else if (p.includes('/alertes')) setActiveTab('alertes');
    else if (p.includes('/voisins')) setActiveTab('voisins');
    else if (p.includes('/meteo')) setActiveTab('meteo');
    else if (p.includes('/profil')) setActiveTab('profil');
    else setActiveTab('accueil');
  }, [location.pathname]);

  const currentFisherman = fishermen[0];
  const myAlerts = alerts.filter((a) => a.fishermanId === currentFisherman.id);
  const weatherCurrentIndex = getCurrentHourIndex();
  const currentWeather = todayHourlyWeather[weatherCurrentIndex] || todayHourlyWeather[0];

  const handleSos = () => {
    setSosPressed(true);
    warning('SOS envoyé', 'Alerte transmise à la Marine Nationale et aux Voisins de Mer');
    setTimeout(() => setSosPressed(false), 3000);
  };

  const translations: Record<string, Record<string, string>> = {
    Wolof: {
      bonjour: 'Nanga def',
      alertes: 'Woy',
      carte: 'Kàrt',
      voisins: 'Bàrke Yàlla',
      profil: 'Sama bopp',
      accueil: 'Wàllu bi',
      meteo: 'Tàngal weer',
      vitesse: 'Daw',
      cap: 'Yoon',
      batterie: 'Battéri',
      temperature: 'Tàngal',
      noyade: 'Noyade detectée',
      retour: 'Dellu ci gëna wàllu',
      securite: 'Sàmm sa bopp',
    },
    Pulaar: {
      bonjour: 'A jaaraama',
      alertes: 'Ɓattonde',
      carte: 'Kartal',
      voisins: 'Konuuji',
      profil: 'Sama hoore',
      accueil: 'Fuɗɗoode',
      meteo: 'Hannde hunduko',
      vitesse: 'Yaaɓre',
      cap: 'Laawol',
      batterie: 'Batteri',
      temperature: 'Ɓalɗe',
      noyade: 'Fottude heen',
      retour: 'Rutto',
      securite: 'Kisal ma',
    },
    Serer: {
      bonjour: 'Mbaa ngi',
      alertes: 'Aert',
      carte: 'Kart',
      voisins: 'Ndax',
      profil: 'Sama bopp',
      accueil: 'Wàllu',
      meteo: 'Tàngal weer',
      vitesse: 'Dëgër',
      cap: 'Yoon',
      batterie: 'Batteri',
      temperature: 'Tàngal',
      noyade: 'Noyad',
      retour: 'Dell',
      securite: 'Kisal',
    },
  };

  const t = (key: string) => translations[language]?.[key] || key;

  return (
    <div className="min-h-screen bg-ocean-50 flex flex-col items-center py-8 md:py-12">
      <div className="w-full max-w-[420px] px-4 mb-4">
        <PrototypeBanner />
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="text-center mb-6">
        <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">
          Simulation Mobile
        </span>
        <h1 className="font-display font-bold text-xl md:text-2xl text-ocean-900 mt-1">
          App Mool-Control Mobile
        </h1>
        <p className="text-ocean-500 text-xs mt-1">Interface inclusive pour les pêcheurs sénégalais</p>
      </div>

      {/* Phone frame */}
      <div className="w-full max-w-[360px] bg-ocean-900 rounded-[40px] p-3 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-ocean-900 rounded-b-xl z-10" />

        <div className="bg-white rounded-[32px] overflow-hidden min-h-[680px] flex flex-col">
          {/* Header */}
          <div className="bg-ocean-900 text-white p-4 pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-senegal-green flex items-center justify-center">
                  <i className="ri-anchor-line text-white text-xs" />
                </div>
                <span className="font-display font-bold text-sm">Mool-Control</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const langs = ['Wolof', 'Pulaar', 'Serer'];
                    const idx = langs.indexOf(language);
                    setLanguage(langs[(idx + 1) % langs.length]);
                    success('Langue changée', `Langue : ${langs[(idx + 1) % langs.length]}`);
                  }}
                  className="text-[10px] bg-white/15 px-2 py-1 rounded-full whitespace-nowrap"
                >
                  {language}
                </button>
                <i className="ri-battery-line text-ocean-300 text-sm" />
              </div>
            </div>
            <p className="text-ocean-300 text-xs">{t('bonjour')}, Pêcheur #F001 !</p>
            <p className="text-ocean-400 text-[10px]">MS-2026-001 — {currentFisherman.boatName}</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* === ACCUEIL === */}
            {activeTab === 'accueil' && (
              <div className="p-4 space-y-4">
                {/* GO / NO-GO banner météo */}
                <div className={`rounded-2xl p-4 text-white ${currentWeather.go ? 'bg-senegal-green' : 'bg-alert-red'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-[10px] uppercase tracking-wider">Condition actuelle</p>
                      <p className="text-2xl font-bold mt-0.5">{currentWeather.go ? 'MER OUVERTE' : 'MER FERMÉE'}</p>
                      <p className="text-white/90 text-xs mt-1">
                        {currentWeather.go
                          ? `Vent ${currentWeather.windSpeed} kt — Houle ${currentWeather.waveHeight}m`
                          : currentWeather.dangerReason || 'Conditions dangereuses'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <i className={`${currentWeather.icon} text-2xl text-white`} />
                    </div>
                  </div>
                  {!currentWeather.go && (
                    <div className="mt-3 bg-white/20 rounded-lg p-2">
                      <p className="text-xs text-white font-medium">⚠️ Retour immédiat recommandé</p>
                      <p className="text-[10px] text-white/80">Prochaine fenêtre sûre : vérifiez l\'onglet Météo</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSos}
                  className={`w-full py-5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95 flex flex-col items-center gap-1 ${
                    sosPressed ? 'bg-alert-red animate-pulse' : 'bg-alert-red hover:bg-red-700'
                  }`}
                >
                  <i className="ri-alarm-warning-line text-2xl" />
                  SOS — APPUYER
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-ocean-50 rounded-xl p-3 text-center">
                    <i className="ri-speed-line text-ocean-500 text-lg" />
                    <p className="text-ocean-900 font-bold text-lg">0.8 <span className="text-xs font-normal">kt</span></p>
                    <p className="text-ocean-400 text-[10px]">{t('vitesse')}</p>
                  </div>
                  <div className="bg-ocean-50 rounded-xl p-3 text-center">
                    <i className="ri-compass-line text-ocean-500 text-lg" />
                    <p className="text-ocean-900 font-bold text-lg">310°</p>
                    <p className="text-ocean-400 text-[10px]">{t('cap')}</p>
                  </div>
                  <div className="bg-ocean-50 rounded-xl p-3 text-center">
                    <i className="ri-battery-line text-senegal-green text-lg" />
                    <p className="text-ocean-900 font-bold text-lg">92%</p>
                    <p className="text-ocean-400 text-[10px]">{t('batterie')}</p>
                  </div>
                  <div className="bg-ocean-50 rounded-xl p-3 text-center">
                    <i className="ri-temp-cold-line text-ocean-500 text-lg" />
                    <p className="text-ocean-900 font-bold text-lg">28°</p>
                    <p className="text-ocean-400 text-[10px]">{t('temperature')}</p>
                  </div>
                </div>

                <div className="bg-ocean-50 rounded-xl p-3">
                  <h4 className="text-ocean-800 text-sm font-semibold mb-2">{t('alertes')}</h4>
                  {myAlerts.length === 0 ? (
                    <p className="text-ocean-400 text-xs text-center py-2">Aucune alerte</p>
                  ) : (
                    myAlerts.map((a) => (
                      <div key={a.id} className={`rounded-lg p-2 mb-1.5 text-xs ${
                        a.severity === 'critical' ? 'bg-alert-red/10 text-alert-red' : 'bg-alert-orange/10 text-alert-orange'
                      }`}>
                        <p className="font-medium">{a.description}</p>
                        <p className="text-[10px] opacity-70">{formatTime(a.timestamp)}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-senegal-green/10 rounded-xl p-3 border border-senegal-green/20">
                  <div className="flex items-center gap-2">
                    <i className="ri-ship-line text-senegal-green" />
                    <div>
                      <p className="text-senegal-green text-sm font-semibold">Voisin de Mer</p>
                      <p className="text-ocean-600 text-[10px]">3 pirogues à proximité — réseau actif</p>
                    </div>
                  </div>
                </div>

                <div className="bg-ocean-50 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <i className="ri-sun-line text-senegal-yellow text-xl" />
                    <div>
                      <p className="text-ocean-800 text-sm font-medium">Ciel dégagé — 32°C</p>
                      <p className="text-ocean-400 text-[10px]">Vent NE 12 kt — Mer calme</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === CARTE === */}
            {activeTab === 'carte' && (
              <div className="p-4">
                <div className="bg-ocean-100 rounded-xl overflow-hidden h-64 relative">
                  <iframe
                    title="Carte pêcheur"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155500!2d-17.4677!3d14.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzU1LjAiTiAxN8KwMjYnNDguMCJX!5e0!3m2!1sfr!2sfr!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 bg-ocean-50 rounded-xl p-3">
                  <p className="text-ocean-800 text-sm font-semibold">Ma position</p>
                  <p className="text-ocean-500 text-xs font-mono mt-1">14°42'55"N, 17°26'48"W</p>
                  <p className="text-ocean-400 text-xs mt-1">Cap-Vert — Dakar</p>
                </div>
                <div className="mt-3 bg-senegal-green/10 rounded-xl p-3 border border-senegal-green/20">
                  <p className="text-senegal-green text-xs font-semibold">Mode Mesh — Hors-ligne OK</p>
                  <p className="text-ocean-500 text-[10px] mt-1">2 nœuds relais à portée — signal relayé</p>
                </div>
              </div>
            )}

            {/* === ALERTES === */}
            {activeTab === 'alertes' && (
              <div className="p-4 space-y-3">
                {alerts.map((a) => {
                  const f = fishermen.find((fm) => fm.id === a.fishermanId);
                  return (
                    <div key={a.id} className={`rounded-xl p-3 border ${
                      a.severity === 'critical'
                        ? 'bg-alert-red/5 border-alert-red/20'
                        : 'bg-alert-orange/5 border-alert-orange/20'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          a.severity === 'critical' ? 'bg-alert-red/10 text-alert-red' : 'bg-alert-orange/10 text-alert-orange'
                        }`}>
                          {a.severity === 'critical' ? 'CRITIQUE' : 'ATTENTION'}
                        </span>
                        <span className="text-ocean-400 text-[10px]">{formatTime(a.timestamp)}</span>
                      </div>
                      <p className="text-ocean-800 text-sm">{a.description}</p>
                      {f && <p className="text-ocean-500 text-xs mt-1">{f.name} — {f.boatName}</p>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* === VOISINS === */}
            {activeTab === 'voisins' && (
              <div className="p-4 space-y-3">
                <div className="bg-senegal-green/10 rounded-xl p-4 border border-senegal-green/20 text-center">
                  <i className="ri-ship-line text-senegal-green text-3xl mb-2" />
                  <h3 className="text-ocean-800 font-semibold text-sm">Protocole Voisin de Mer</h3>
                  <p className="text-ocean-500 text-xs mt-1">
                    Si un pêcheur est en détresse, une alerte est envoyée automatiquement aux pirogues à moins de 5 km.
                  </p>
                </div>
                <p className="text-ocean-500 text-xs font-semibold">Pêcheurs à proximité :</p>
                {fishermen.slice(1, 4).map((f) => (
                  <div key={f.id} className="bg-ocean-50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-ocean-200 flex items-center justify-center">
                      <i className="ri-user-3-line text-ocean-600" />
                    </div>
                    <div>
                      <p className="text-ocean-800 text-sm font-medium">{f.name}</p>
                      <p className="text-ocean-400 text-xs">{f.boatName} — {f.language}</p>
                    </div>
                    <span className="ml-auto text-[10px] bg-senegal-green/10 text-senegal-green px-2 py-0.5 rounded-full">
                      {Math.round(Math.random() * 3 + 1)} km
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* === METEO === */}
            {activeTab === 'meteo' && (
              <div className="p-4 space-y-4">
                {/* Banner GO/NO-GO */}
                <div className={`rounded-2xl p-4 text-white ${currentWeather.go ? 'bg-senegal-green' : 'bg-alert-red'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <i className={`${currentWeather.icon} text-2xl text-white`} />
                    </div>
                    <div>
                      <p className="text-white/80 text-[10px] uppercase tracking-wider">{currentWeather.hour}</p>
                      <p className="text-xl font-bold">{currentWeather.go ? '✅ GO — Pêche autorisée' : '🚫 NO-GO — Danger'}</p>
                      <p className="text-white/90 text-xs">{currentWeather.dangerReason || `Vent ${currentWeather.windSpeed} kt — Houle ${currentWeather.waveHeight}m`}</p>
                    </div>
                  </div>
                </div>

                {/* Prévisions 5 jours */}
                <div>
                  <p className="text-ocean-800 text-sm font-semibold mb-2">Prévisions 5 jours</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {fiveDayForecast.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDay(i)}
                        className={`flex-shrink-0 rounded-xl p-2.5 min-w-[72px] text-center transition-all ${
                          selectedDay === i
                            ? d.go ? 'bg-senegal-green text-white' : 'bg-alert-red text-white'
                            : 'bg-ocean-50 text-ocean-800'
                        }`}
                      >
                        <p className="text-[10px] font-medium">{d.day}</p>
                        <p className="text-[10px] opacity-80">{d.date}</p>
                        <div className="w-6 h-6 flex items-center justify-center mx-auto my-1">
                          <i className={d.icon} />
                        </div>
                        <p className="text-[10px] font-bold">{d.go ? 'GO' : 'NO-GO'}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Détail jour sélectionné */}
                <div className="bg-ocean-50 rounded-xl p-3">
                  <p className="text-ocean-800 text-xs font-semibold mb-2">
                    {fiveDayForecast[selectedDay].day} — {fiveDayForecast[selectedDay].condition}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-ocean-400 text-[10px]">Temp max</p>
                      <p className="text-ocean-800 font-bold text-sm">{fiveDayForecast[selectedDay].maxTemp}°</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-ocean-400 text-[10px]">Vent max</p>
                      <p className="text-ocean-800 font-bold text-sm">{fiveDayForecast[selectedDay].windMax} kt {fiveDayForecast[selectedDay].windDir}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-ocean-400 text-[10px]">Houle max</p>
                      <p className="text-ocean-800 font-bold text-sm">{fiveDayForecast[selectedDay].waveMax}m</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-ocean-400 text-[10px]">Fenêtre danger</p>
                      <p className="text-ocean-800 font-bold text-[10px]">{fiveDayForecast[selectedDay].dangerWindow || 'Aucune'}</p>
                    </div>
                  </div>
                </div>

                {/* Heures détaillées */}
                <div>
                  <p className="text-ocean-800 text-sm font-semibold mb-2">Conditions par heure</p>
                  <div className="space-y-1.5">
                    {todayHourlyWeather.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => setExpandedWeatherHour(expandedWeatherHour === i ? null : i)}
                        className={`w-full text-left rounded-xl p-2.5 transition-all ${
                          h.go ? 'bg-white border border-ocean-100' : 'bg-alert-red/5 border border-alert-red/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${h.go ? 'bg-ocean-50' : 'bg-alert-red/10'}`}>
                              <i className={`${h.icon} ${h.go ? 'text-ocean-500' : 'text-alert-red'}`} />
                            </div>
                            <div>
                              <p className="text-ocean-800 text-sm font-medium">{h.hour}</p>
                              <p className="text-ocean-400 text-[10px]">{h.go ? 'Pêche OK' : h.dangerReason}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-bold ${h.go ? 'text-senegal-green' : 'text-alert-red'}`}>
                              {h.go ? 'GO' : 'NO-GO'}
                            </p>
                            <p className="text-ocean-400 text-[10px]">{h.windSpeed} kt</p>
                          </div>
                        </div>
                        {expandedWeatherHour === i && (
                          <div className="mt-2 grid grid-cols-3 gap-1">
                            <div className="bg-ocean-50 rounded-lg p-1.5 text-center">
                              <p className="text-ocean-400 text-[10px]">Temp</p>
                              <p className="text-ocean-800 text-xs font-bold">{h.temp}°</p>
                            </div>
                            <div className="bg-ocean-50 rounded-lg p-1.5 text-center">
                              <p className="text-ocean-400 text-[10px]">Houle</p>
                              <p className="text-ocean-800 text-xs font-bold">{h.waveHeight}m</p>
                            </div>
                            <div className="bg-ocean-50 rounded-lg p-1.5 text-center">
                              <p className="text-ocean-400 text-[10px]">Visibilité</p>
                              <p className="text-ocean-800 text-xs font-bold">{h.visibility}</p>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* === PROFIL === */}
            {activeTab === 'profil' && (
              <div className="p-4 space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-ocean-200 flex items-center justify-center mx-auto">
                    <i className="ri-user-3-line text-ocean-600 text-2xl" />
                  </div>
                  <h3 className="text-ocean-800 font-semibold text-sm mt-2">Pêcheur #F001</h3>
                  <p className="text-ocean-400 text-xs">MS-2026-001 — Jàmm baax</p>
                </div>
                <div className="bg-alert-red/5 border border-alert-red/10 rounded-xl p-3">
                  <p className="text-alert-red text-xs font-semibold mb-1">⚠️ Dossier médical partagé SOS</p>
                  <div className="space-y-1 text-xs text-ocean-700">
                    <p><strong>Groupe sanguin :</strong> O+</p>
                    <p><strong>Allergies :</strong> Poisson — réaction modérée</p>
                    <p><strong>Médication :</strong> Ventoline SOS</p>
                    <p><strong>Asthme :</strong> Léger</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Langue', value: 'Wolof' },
                    { label: 'Téléphone', value: '+221 77 *** ** 01' },
                    { label: 'Contact d\'urgence', value: 'Contact #C001 — +221 77 *** ** 01' },
                    { label: 'Langue d\'alerte', value: 'Wolof + Français' },
                  ].map((item) => (
                    <div key={item.label} className="bg-ocean-50 rounded-xl p-3 flex justify-between">
                      <span className="text-ocean-400 text-xs">{item.label}</span>
                      <span className="text-ocean-800 text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom nav */}
          <div className="bg-white border-t border-ocean-100 px-1 py-2">
            <div className="flex items-center justify-around">
              {appMobileMenu.map((item) => {
                const key = item.label.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
                const isActive = activeTab === key || (item.path === '/app-mobile' && activeTab === 'accueil');
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      setActiveTab(key);
                      navigate(item.path);
                    }}
                    className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-lg transition-all ${
                      isActive ? 'text-ocean-900' : 'text-ocean-300'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={item.icon} />
                    </div>
                    <span className="text-[9px] font-medium whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate('/bracelet')}
          className="px-5 py-3 bg-ocean-900 text-white rounded-xl text-sm font-medium hover:bg-ocean-800 transition-all whitespace-nowrap flex items-center gap-2"
        >
          <i className="ri-device-line" />
          Simuler Bracelet
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-5 py-3 bg-ocean-100 text-ocean-700 rounded-xl text-sm font-medium hover:bg-ocean-200 transition-all whitespace-nowrap flex items-center gap-2"
        >
          <i className="ri-dashboard-line" />
          Dashboard Marine
        </button>
      </div>
    </div>
  );
}