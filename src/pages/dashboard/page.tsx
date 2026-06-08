import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fishermen, alerts, stats, riskZones, recentTrips, meshNodes, meshStats, fiveDayForecast, todayHourlyWeather } from '@/mocks/senmool-v2';
import { useInView } from '@/hooks/useInView';
import NotificationBadge from '@/components/base/NotificationBadge';
import LiveCameraFeed, { CAMERAS } from '@/components/feature/LiveCameraFeed';

function AnimatedCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function MiniMap() {
  return (
    <div className="bg-ocean-900 rounded-xl overflow-hidden relative w-full h-64 md:h-80">
      <iframe
        title="Carte Sénégal"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101403.5210087146!2d-17.5!3d14.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5b5e7f27d%3A0x1f8e3e8e8e8e8e8e!2sSenegal!5e0!3m2!1sen!2sfr!4v1700000000000"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'brightness(0.7) hue-rotate(180deg) saturate(0.6)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-0 pointer-events-none">
        {fishermen.map((f) => (
          <div
            key={f.id}
            className={`absolute w-3 h-3 rounded-full border-2 border-white ${
              f.status === 'alert' ? 'bg-alert-red animate-pulse' : 'bg-senegal-green'
            }`}
            style={{
              left: `${((f.location.lng + 17.8) / 0.6) * 100}%`,
              top: `${((15.2 - f.location.lat) / 2.7) * 100}%`,
            }}
            title={f.name}
          />
        ))}
        {riskZones.map((rz) => (
          <div
            key={rz.id}
            className={`absolute w-6 h-6 rounded-full border-2 border-dashed ${
              rz.riskLevel === 'high'
                ? 'border-alert-red/60'
                : rz.riskLevel === 'medium'
                ? 'border-alert-orange/60'
                : 'border-senegal-green/60'
            }`}
            style={{
              left: `${((rz.lng + 17.8) / 0.6) * 100}%`,
              top: `${((15.2 - rz.lat) / 2.7) * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex gap-2 pointer-events-none">
        <span className="text-[10px] bg-black/50 text-white px-2 py-0.5 rounded">● Actif</span>
        <span className="text-[10px] bg-alert-red/80 text-white px-2 py-0.5 rounded">● Alerte</span>
        <span className="text-[10px] bg-alert-orange/60 text-white px-2 py-0.5 rounded">△ Risque</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [meshMode, setMeshMode] = useState(false);
  const [selectedFisherman, setSelectedFisherman] = useState<string | null>(null);
  const navigate = useNavigate();

  type AlertType = 'SOS_MANUAL' | 'LOW_BATTERY' | 'DROWNING_AUTO' | 'STORM_WARNING' | 'HEART_RATE_ALERT';

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const statCards = [
    { label: 'Appareils actifs', value: stats.totalDevices.toLocaleString(), icon: 'ri-device-line', color: 'bg-senegal-green' },
    { label: 'Alertes actives', value: stats.activeAlerts.toString(), icon: 'ri-alarm-warning-line', color: 'bg-alert-red' },
    { label: 'Sauvetés ce mois', value: stats.rescuedThisMonth.toString(), icon: 'ri-lifebuoy-line', color: 'bg-senegal-yellow' },
    { label: 'Temps moyen', value: `${stats.responseTimeAvg} min`, icon: 'ri-timer-flash-line', color: 'bg-ocean-500' },
  ];

  const alertIcon = (type: AlertType) => {
    switch (type) {
      case 'SOS_MANUAL':
        return 'ri-alarm-warning-line';
      case 'DROWNING_AUTO':
        return 'ri-lifebuoy-line';
      case 'STORM_WARNING':
        return 'ri-thunderstorms-line';
      case 'LOW_BATTERY':
        return 'ri-battery-low-line';
      case 'HEART_RATE_ALERT':
        return 'ri-heart-pulse-line';
      default:
        return 'ri-question-line';
    }
  };

  const activeAlerts = alerts.filter((a) => a.status === 'active' || a.status === 'pending');
  const resolvedAlerts = alerts.filter((a) => a.status === 'resolved');

  const dangerHoursToday = todayHourlyWeather.filter((h) => !h.go);

  return (
    <div className="min-h-screen bg-ocean-50">
      <div className="bg-ocean-900 text-white">
        <div className="w-full px-6 md:px-10 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-senegal-green flex items-center justify-center">
              <i className="ri-anchor-line text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm md:text-base">Mool-Control</h1>
              <p className="text-ocean-300 text-[10px]">Dashboard Marine Nationale du Sénégal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-ocean-300">
            <span className="font-mono">{currentTime.toLocaleTimeString('fr-FR')}</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Cloud SENUM SA</span>
            <span className="hidden md:inline">|</span>
            <NotificationBadge />
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-senegal-green animate-pulse" />
              En ligne
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
              <div className="p-4 border-b border-ocean-100">
                <p className="font-display font-semibold text-ocean-900 text-sm">Menu</p>
              </div>
              <div className="p-2">
                {[
                { label: "Vue d'ensemble", icon: 'ri-dashboard-line' },
                { label: 'Carte temps réel', icon: 'ri-map-2-line' },
                { label: 'Alertes', icon: 'ri-alarm-warning-line' },
                { label: 'Pêcheurs', icon: 'ri-group-line' },
                { label: 'Météo Marine', icon: 'ri-sun-cloudy-line' },
                { label: 'Trajets', icon: 'ri-route-line' },
                { label: 'Mode Mesh', icon: 'ri-broadcast-line' },
                { label: 'Rapports', icon: 'ri-bar-chart-grouped-line' },
              ].map((item) => (
                  <div
                    key={item.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ocean-600 hover:bg-ocean-50 hover:text-ocean-900 transition-all"
                  >
                    <div className="w-6 h-6 flex items-center justify-center"><i className={item.icon} /></div>
                    {item.label}
                  </div>
              ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {statCards.map((s) => (
                <AnimatedCard key={s.label}>
                  <div className="bg-white rounded-xl p-4 border border-ocean-100">
                    <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
                      <i className={`${s.icon} text-white text-sm`} />
                    </div>
                    <p className="font-display font-bold text-xl text-ocean-900">{s.value}</p>
                    <p className="text-ocean-400 text-xs">{s.label}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Map */}
            <AnimatedCard>
              <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                <div className="p-4 border-b border-ocean-100 flex items-center justify-between">
                  <h3 className="font-display font-semibold text-ocean-900 text-sm">Carte temps réel — Côtes du Sénégal</h3>
                  <span className="text-ocean-400 text-xs">{fishermen.filter((f) => f.status === 'active').length} actifs / {fishermen.length} total</span>
                </div>
                <MiniMap />
              </div>
            </AnimatedCard>

            {/* === LIVE CAMERA FEED === */}
            <AnimatedCard>
              <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                <div className="p-4 border-b border-ocean-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Vision IA temps réel — Caméras embarquées</h3>
                  </div>
                  <span className="text-ocean-400 text-[10px] bg-ocean-50 px-2 py-0.5 rounded-full">{CAMERAS.filter(c => c.status === 'online').length} / {CAMERAS.length} online</span>
                </div>
                <div className="p-4">
                  <LiveCameraFeed />
                </div>
              </div>
            </AnimatedCard>

            {/* Météo + Zones à risque */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedCard delay={100}>
                <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                  <div className="p-4 border-b border-ocean-100 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Météo Marine — Aujourd'hui</h3>
                    <span className="text-[10px] bg-ocean-100 text-ocean-600 px-2 py-0.5 rounded-full">Dakar</span>
                  </div>
                  <div className="p-4">
                    {/* GO/NO-GO summary */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dangerHoursToday.length > 0 ? 'bg-alert-red/10' : 'bg-senegal-green/10'}`}>
                        <i className={`${dangerHoursToday.length > 0 ? 'ri-alarm-warning-line text-alert-red' : 'ri-check-line text-senegal-green'}`} />
                      </div>
                      <div>
                        <p className="text-ocean-800 text-sm font-semibold">
                          {dangerHoursToday.length > 0 ? `${dangerHoursToday.length} fenêtres dangereuses` : 'Conditions favorables'}
                        </p>
                        <p className="text-ocean-400 text-xs">
                          {dangerHoursToday.length > 0
                            ? `Fenêtre critique : ${dangerHoursToday[0]?.hour} — ${dangerHoursToday[dangerHoursToday.length - 1]?.hour}`
                            : 'Toutes les heures sont sûres pour la pêche'}
                        </p>
                      </div>
                    </div>
                    {/* Hourly strip */}
                    <div className="flex gap-1.5 overflow-x-auto pb-2">
                      {todayHourlyWeather.map((h) => (
                        <div
                          key={h.hour}
                          className={`flex-shrink-0 rounded-lg p-1.5 text-center min-w-[48px] ${
                            h.go ? 'bg-ocean-50' : 'bg-alert-red/10'
                          }`}
                        >
                          <p className="text-[9px] text-ocean-400">{h.hour}</p>
                          <div className="w-5 h-5 flex items-center justify-center mx-auto my-0.5">
                            <i className={`${h.icon} ${h.go ? 'text-ocean-500' : 'text-alert-red'} text-xs`} />
                          </div>
                          <p className={`text-[9px] font-bold ${h.go ? 'text-senegal-green' : 'text-alert-red'}`}>{h.go ? 'GO' : 'NO'}</p>
                        </div>
                      ))}
                    </div>
                    {/* 5-day forecast */}
                    <div className="mt-3 pt-3 border-t border-ocean-50">
                      <p className="text-ocean-500 text-[10px] font-semibold mb-1.5">Prévisions 5 jours</p>
                      <div className="flex gap-2">
                        {fiveDayForecast.map((d, i) => (
                          <div key={i} className={`flex-1 rounded-lg p-1.5 text-center ${d.go ? 'bg-ocean-50' : 'bg-alert-red/10'}`}>
                            <p className="text-[9px] text-ocean-500">{d.day.replace("Aujourd'hui", "Auj.")}</p>
                            <div className="w-4 h-4 flex items-center justify-center mx-auto my-0.5">
                              <i className={`${d.icon} ${d.go ? 'text-ocean-500' : 'text-alert-red'} text-xs`} />
                            </div>
                            <p className={`text-[9px] font-bold ${d.go ? 'text-senegal-green' : 'text-alert-red'}`}>{d.go ? 'GO' : 'NO'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                  <div className="p-4 border-b border-ocean-100">
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Zones à risque (IA)</h3>
                  </div>
                  <div className="divide-y divide-ocean-50">
                    {riskZones.map((rz) => (
                      <div key={rz.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${rz.riskLevel === 'high' ? 'bg-alert-red' : rz.riskLevel === 'medium' ? 'bg-alert-orange' : 'bg-senegal-green'}`} />
                            <span className="text-ocean-800 text-sm font-medium">{rz.name}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rz.riskLevel === 'high' ? 'bg-alert-red/10 text-alert-red' : rz.riskLevel === 'medium' ? 'bg-alert-orange/10 text-alert-orange' : 'bg-senegal-green/10 text-senegal-green'}`}>
                            {rz.riskLevel === 'high' ? 'ÉLEVÉ' : rz.riskLevel === 'medium' ? 'MODÉRÉ' : 'FAIBLE'}
                          </span>
                        </div>
                        <p className="text-ocean-400 text-xs mt-1">{rz.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Alertes + Trajets récents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedCard delay={100}>
                <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                  <div className="p-4 border-b border-ocean-100 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Alertes en cours</h3>
                    <span className="bg-alert-red/10 text-alert-red text-xs font-bold px-2 py-0.5 rounded-full">{activeAlerts.length}</span>
                  </div>
                  <div className="divide-y divide-ocean-50">
                    {activeAlerts.length === 0 ? (
                      <p className="p-4 text-ocean-400 text-sm text-center">Aucune alerte active</p>
                    ) : (
                      activeAlerts.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setSelectedAlert(selectedAlert === a.id ? null : a.id)}
                          className="w-full text-left p-4 hover:bg-ocean-50 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.severity === 'critical' ? 'bg-alert-red/10' : 'bg-alert-orange/10'}`}>
                              <i className={`${alertIcon(a.type)} ${a.severity === 'critical' ? 'text-alert-red' : 'text-alert-orange'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${a.severity === 'critical' ? 'bg-alert-red/10 text-alert-red' : 'bg-alert-orange/10 text-alert-orange'}`}>
                                  {a.severity === 'critical' ? 'CRITIQUE' : 'ATTENTION'}
                                </span>
                                <span className="text-ocean-400 text-[10px]">{new Date(a.timestamp).toLocaleTimeString('fr-FR')}</span>
                              </div>
                              <p className="text-ocean-800 text-sm font-medium mt-1 truncate">{a.description}</p>
                              {selectedAlert === a.id && (
                                <div className="mt-2 space-y-1">
                                  <p className="text-ocean-500 text-xs">Position : {a.location.lat.toFixed(4)}, {a.location.lng.toFixed(4)}</p>
                                  <p className="text-ocean-500 text-xs">Pêcheur : {fishermen.find((f) => f.id === a.fishermanId)?.name || 'Inconnu'}</p>
                                  <div className="flex gap-2 mt-2">
                                    <button className="px-3 py-1.5 bg-senegal-green text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-all">Confirmer prise en charge</button>
                                    <button className="px-3 py-1.5 bg-ocean-100 text-ocean-700 rounded-lg text-xs font-medium hover:bg-ocean-200 transition-all">Voir sur carte</button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={150}>
                <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                  <div className="p-4 border-b border-ocean-100 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Trajets récents</h3>
                    <span className="text-ocean-400 text-[10px]">7 derniers jours</span>
                  </div>
                  <div className="divide-y divide-ocean-50 max-h-[280px] overflow-y-auto">
                    {recentTrips.map((trip) => {
                      const f = fishermen.find((fm) => fm.id === trip.fishermanId);
                      return (
                        <div key={trip.id} className="p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${trip.status === 'completed' ? 'bg-senegal-green' : trip.status === 'aborted' ? 'bg-alert-orange' : 'bg-alert-red'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-ocean-800 text-xs font-semibold truncate">{trip.startLocation} → {trip.endLocation}</p>
                              <p className="text-ocean-400 text-[10px]">{f?.name || '-'} — {trip.date} | {trip.distanceKm}km</p>
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${trip.status === 'completed' ? 'bg-senegal-green/10 text-senegal-green' : trip.status === 'aborted' ? 'bg-alert-orange/10 text-alert-orange' : 'bg-alert-red/10 text-alert-red'}`}>
                              {trip.status === 'completed' ? 'OK' : trip.status === 'aborted' ? 'Abandon' : 'SOS'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Mesh Network + Pêcheurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedCard delay={200}>
                <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                  <div className="p-4 border-b border-ocean-100 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Réseau Mesh — Voisin de Mer</h3>
                    <button
                      onClick={() => setMeshMode(!meshMode)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${meshMode ? 'bg-senegal-green text-white' : 'bg-ocean-100 text-ocean-600'}`}
                    >
                      {meshMode ? 'Mesh ACTIF' : 'Mesh INACTIF'}
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-ocean-50 rounded-lg p-2 text-center">
                        <p className="text-ocean-800 text-lg font-bold">{meshStats.activeNodes}</p>
                        <p className="text-ocean-400 text-[9px]">Nœuds actifs</p>
                      </div>
                      <div className="bg-ocean-50 rounded-lg p-2 text-center">
                        <p className="text-ocean-800 text-lg font-bold">{meshStats.avgRangeKm}km</p>
                        <p className="text-ocean-400 text-[9px]">Portée moyenne</p>
                      </div>
                      <div className="bg-ocean-50 rounded-lg p-2 text-center">
                        <p className="text-ocean-800 text-lg font-bold">{meshStats.relayedToday}</p>
                        <p className="text-ocean-400 text-[9px]">Relais aujourd'hui</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {meshNodes.map((node) => (
                        <div key={node.id} className="flex items-center gap-2 bg-ocean-50 rounded-lg p-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${node.connected ? 'bg-senegal-green' : 'bg-ocean-300'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-ocean-800 text-xs font-medium">{node.name}</p>
                            <p className="text-ocean-400 text-[9px]">{node.connected ? `Signal ${node.signal}% — ${node.rangeKm}km` : 'Hors ligne'}</p>
                          </div>
                          {node.connected && node.relayed > 0 && (
                            <span className="text-[9px] bg-senegal-green/10 text-senegal-green px-1.5 py-0.5 rounded-full">{node.relayed} relais</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {meshStats.offlineZones.length > 0 && (
                      <div className="mt-2 bg-alert-orange/5 rounded-lg p-2 border border-alert-orange/10">
                        <p className="text-alert-orange text-[10px] font-semibold">⚠️ Zones hors Mesh :</p>
                        <p className="text-ocean-500 text-[9px]">{meshStats.offlineZones.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={250}>
                <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                  <div className="p-4 border-b border-ocean-100">
                    <h3 className="font-display font-semibold text-ocean-900 text-sm">Pêcheurs actifs</h3>
                  </div>
                  <div className="divide-y divide-ocean-50 max-h-[280px] overflow-y-auto">
                    {fishermen.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFisherman(selectedFisherman === f.id ? null : f.id)}
                        className="w-full text-left p-3 hover:bg-ocean-50 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${f.status === 'alert' ? 'bg-alert-red' : 'bg-ocean-400'}`}>
                            <i className={`${f.status === 'alert' ? 'ri-alarm-warning-line' : 'ri-ship-line'} text-white`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-ocean-800 text-xs font-semibold">{f.name}</p>
                            <p className="text-ocean-400 text-[10px]">{f.boatName} — {f.language}</p>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${f.status === 'alert' ? 'bg-alert-red/10 text-alert-red' : 'bg-senegal-green/10 text-senegal-green'}`}>
                            {f.status === 'alert' ? 'ALERTE' : 'ACTIF'}
                          </span>
                        </div>
                        {selectedFisherman === f.id && (
                          <div className="mt-2 ml-9 space-y-0.5">
                            <p className="text-ocean-500 text-[10px]">Position : {f.location.lat.toFixed(4)}, {f.location.lng.toFixed(4)}</p>
                            <p className="text-ocean-500 text-[10px]">Dernière vue : {new Date(f.lastSeen).toLocaleTimeString('fr-FR')}</p>
                            <p className="text-ocean-500 text-[10px]">Device : {f.deviceId}</p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Alertes résolues table */}
            <AnimatedCard delay={300}>
              <div className="bg-white rounded-xl border border-ocean-100 overflow-hidden">
                <div className="p-4 border-b border-ocean-100">
                  <h3 className="font-display font-semibold text-ocean-900 text-sm">Alertes résolues récentes</h3>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-ocean-400 text-xs border-b border-ocean-100">
                          <th className="text-left py-2 pr-4">ID</th>
                          <th className="text-left py-2 pr-4">Type</th>
                          <th className="text-left py-2 pr-4">Pêcheur</th>
                          <th className="text-left py-2 pr-4">Heure</th>
                          <th className="text-left py-2">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ocean-50">
                        {(resolvedAlerts as Array<(typeof alerts)[number]>).map((a) => (
                          <tr key={a.id}>
                            <td className="py-2.5 pr-4 text-ocean-600 font-mono text-xs">{a.id}</td>
                            <td className="py-2.5 pr-4 text-ocean-800 text-xs">{a.type === 'LOW_BATTERY' ? 'Batterie' : a.type === 'DROWNING_AUTO' ? 'Noyade auto' : a.type === 'SOS_MANUAL' ? 'SOS' : 'Tempête'}</td>
                            <td className="py-2.5 pr-4 text-ocean-600 text-xs">{fishermen.find((f) => f.id === a.fishermanId)?.name || '-'}</td>
                            <td className="py-2.5 pr-4 text-ocean-400 text-xs">{new Date(a.timestamp).toLocaleTimeString('fr-FR')}</td>
                            <td className="py-2.5"><span className="text-[10px] bg-senegal-green/10 text-senegal-green font-bold px-2 py-0.5 rounded-full">RÉSOLU</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Quick nav */}
            <div className="flex gap-3">
              <button onClick={() => navigate('/bracelet')} className="px-5 py-3 bg-ocean-900 text-white rounded-xl text-sm font-medium hover:bg-ocean-800 transition-all whitespace-nowrap flex items-center gap-2">
                <i className="ri-device-line" /> Simuler Bracelet
              </button>
              <button onClick={() => navigate('/app-mobile')} className="px-5 py-3 bg-ocean-100 text-ocean-700 rounded-xl text-sm font-medium hover:bg-ocean-200 transition-all whitespace-nowrap flex items-center gap-2">
                <i className="ri-smartphone-line" /> App Mobile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}