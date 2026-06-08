import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { meshNodes } from '@/mocks/senmool-v2';
import { useNotifications } from '@/hooks/useNotifications';
import ToastContainer from '@/components/base/Toast';
import PrototypeBanner from '@/components/base/PrototypeBanner';

interface BraceletData {
  heartRate: number;
  battery: number;
  gps: { lat: string; lng: string };
  speed: number;
  bearing: number;
  temp: number;
  immersion: number;
  signal: number;
  sosActive: boolean;
  mode: 'normal' | 'alert' | 'sos' | 'mesh';
  meshConnected: boolean;
  meshSignal: number;
  meshRelayed: number;
}

const INIT_DATA: BraceletData = {
  heartRate: 72,
  battery: 92,
  gps: { lat: '14°42\'55"N', lng: '17°26\'48"W' },
  speed: 0.8,
  bearing: 310,
  temp: 28.4,
  immersion: 0,
  signal: 98,
  sosActive: false,
  mode: 'normal',
  meshConnected: true,
  meshSignal: 87,
  meshRelayed: 3,
};

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function BraceletPage() {
  const [data, setData] = useState<BraceletData>(INIT_DATA);
  const [time, setTime] = useState(formatTime);
  const [log, setLog] = useState<string[]>([
    '09:30:00 — GPS connecté, signal fort',
    '09:30:15 — Capteur température OK',
    '09:31:00 — Vitesse : 0.8 nœuds',
    '09:31:30 — Mesh Network : 3 nœuds relais à portée',
  ]);
  const [sosCountdown, setSosCountdown] = useState(0);
  const [meshEnabled, setMeshEnabled] = useState(true);
  const sosTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();
  const { toasts, removeToast, success, warning } = useNotifications();

  useEffect(() => {
    const t = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newHr = Math.max(60, Math.min(110, prev.heartRate + (Math.random() - 0.5) * 6));
        const newSpeed = Math.max(0, prev.speed + (Math.random() - 0.5) * 0.3);
        const newTemp = Math.max(24, Math.min(34, prev.temp + (Math.random() - 0.5) * 0.2));
        const newSignal = Math.max(70, Math.min(100, prev.signal + (Math.random() - 0.5) * 3));
        const newBattery = prev.sosActive ? prev.battery - 0.01 : Math.max(0, prev.battery - 0.002);
        const newMeshSignal = Math.max(30, Math.min(100, prev.meshSignal + (Math.random() - 0.5) * 5));
        return {
          ...prev,
          heartRate: Math.round(newHr),
          speed: Math.round(newSpeed * 10) / 10,
          temp: Math.round(newTemp * 10) / 10,
          signal: Math.round(newSignal),
          battery: Math.round(newBattery * 10) / 10,
          meshSignal: Math.round(newMeshSignal),
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sosCountdown > 0) {
      sosTimer.current = setInterval(() => {
        setSosCountdown((c) => {
          if (c <= 1) {
            if (sosTimer.current) clearInterval(sosTimer.current);
            setData((prev) => ({ ...prev, sosActive: true, mode: 'sos' }));
            setLog((l) => [...l, `${formatTime()} — SOS envoyé via Dual-Signal + Mesh Relay`]);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => { if (sosTimer.current) clearInterval(sosTimer.current); };
  }, [sosCountdown]);

  const handleSosPress = () => {
    if (data.sosActive) {
      setData((prev) => ({ ...prev, sosActive: false, mode: 'normal' }));
      setLog((l) => [...l, `${formatTime()} — SOS annulé`]);
      success('SOS annulé', 'Alerte désactivée, retour au mode normal');
      return;
    }
    setLog((l) => [...l, `${formatTime()} — Bouton SOS pressé — décompte 5 sec`]);
    warning('SOS en cours', 'Appui maintenu — 5 secondes avant transmission');
    setSosCountdown(5);
  };

  const simulateDrowning = () => {
    setLog((l) => [...l, `${formatTime()} — Immersion détectée`]);
    setData((prev) => ({ ...prev, immersion: 1, mode: 'alert' }));
    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setData((prev) => ({ ...prev, immersion: 6 - count }));
      if (count <= 0) {
        clearInterval(interval);
        setData((prev) => ({ ...prev, sosActive: true, mode: 'sos' }));
        setLog((l) => [...l, `${formatTime()} — ALERTE AUTO NOYADE — signal envoyé via Mesh + Dual-Signal`]);
      }
    }, 1000);
  };

  const simulateLowBattery = () => {
    setData((prev) => ({ ...prev, battery: 15 }));
    setLog((l) => [...l, `${formatTime()} — Batterie faible : 15%`]);
    warning('Batterie faible', '15% restant — recharge nécessaire dans 6h');
  };

  const toggleMesh = () => {
    setMeshEnabled(!meshEnabled);
    setData((prev) => ({ ...prev, meshConnected: !meshEnabled }));
    if (!meshEnabled) {
      setLog((l) => [...l, `${formatTime()} — Mesh Network activé — 3 nœuds relais`]);
      success('Mesh activé', 'Mode hors-ligne : signal relayé via Voisin de Mer');
    } else {
      setLog((l) => [...l, `${formatTime()} — Mesh Network désactivé — mode standard`]);
    }
  };

  const resetSimulation = () => {
    setData(INIT_DATA);
    setLog([
      '09:30:00 — GPS connecté, signal fort',
      '09:30:15 — Capteur température OK',
      '09:31:00 — Vitesse : 0.8 nœuds',
      '09:31:30 — Mesh Network : 3 nœuds relais à portée',
    ]);
    setSosCountdown(0);
    setMeshEnabled(true);
  };

  const modeColor = data.mode === 'sos' ? 'bg-alert-red' : data.mode === 'alert' ? 'bg-alert-orange' : data.mode === 'mesh' ? 'bg-ocean-600' : 'bg-ocean-600';
  const glowClass = data.sosActive ? 'shadow-[0_0_40px_rgba(220,38,38,0.5)] animate-pulse' : 'shadow-2xl';

  return (
    <div className="min-h-screen bg-ocean-50">
      <PrototypeBanner />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="w-full px-6 md:px-10 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-ocean-500 text-xs font-semibold tracking-widest uppercase">Simulation Interactive</span>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mt-2">Mool-Safe — Bracelet Connecté Maritime</h1>
            <p className="text-ocean-500 text-sm mt-2 max-w-lg mx-auto">Interface de simulation du bracelet IoT. Testez le SOS, la détection de noyade, et le mode Mesh Network.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BRACELET SCREEN */}
            <div className="flex flex-col items-center">
              <div className={`relative w-[280px] md:w-[320px] ${modeColor} rounded-[40px] p-4 ${glowClass} transition-all duration-500`}>
                <div className="bg-ocean-900 rounded-[32px] p-5 overflow-hidden relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-gps-line text-ocean-300 text-xs" />
                      <span className="text-ocean-300 text-[10px]">{data.gps.lat} {data.gps.lng}</span>
                    </div>
                    <span className="text-ocean-300 text-xs font-mono">{time}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4].map((b) => (
                      <div key={b} className={`w-1 rounded-full ${data.signal >= b * 25 ? 'bg-ocean-300' : 'bg-ocean-700'}`} style={{ height: `${b * 3 + 4}px` }} />
                    ))}
                    <span className="text-ocean-400 text-[10px] ml-1">GPS, IoT, 4G</span>
                  </div>

                  {/* Mesh indicator */}
                  <div className={`flex items-center gap-1.5 mb-3 rounded-lg px-2 py-1 ${data.meshConnected ? 'bg-senegal-green/20' : 'bg-ocean-700/50'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${data.meshConnected ? 'bg-senegal-green animate-pulse' : 'bg-ocean-500'}`} />
                    <span className={`text-[9px] ${data.meshConnected ? 'text-senegal-green' : 'text-ocean-400'}`}>
                      {data.meshConnected ? `Mesh : ${data.meshSignal}% — ${data.meshRelayed} relais` : 'Mesh déconnecté'}
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-ocean-400 flex items-center justify-center mx-auto mb-2">
                      <i className="ri-anchor-line text-ocean-300 text-lg" />
                    </div>
                    <h2 className="font-display font-bold text-xl text-white tracking-wide">MOOL-SAFE</h2>
                    <p className="text-ocean-400 text-[10px]">SÉNÉGAL MARITIME</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-ocean-800/60 rounded-xl p-3">
                      <span className="text-ocean-400 text-[10px] block">Vitesse</span>
                      <span className="text-white text-lg font-mono font-bold">{data.speed.toFixed(1)} <span className="text-xs font-normal">kt</span></span>
                    </div>
                    <div className="bg-ocean-800/60 rounded-xl p-3">
                      <span className="text-ocean-400 text-[10px] block">Cap</span>
                      <span className="text-white text-lg font-mono font-bold">{data.bearing}° <span className="text-xs font-normal">NW</span></span>
                    </div>
                    <div className="bg-ocean-800/60 rounded-xl p-3">
                      <span className="text-ocean-400 text-[10px] block">Batt.</span>
                      <span className={`text-lg font-mono font-bold ${data.battery < 20 ? 'text-alert-red' : 'text-white'}`}>{Math.round(data.battery)}%</span>
                    </div>
                    <div className="bg-ocean-800/60 rounded-xl p-3">
                      <span className="text-ocean-400 text-[10px] block">Temp</span>
                      <span className="text-white text-lg font-mono font-bold">{data.temp.toFixed(1)}°</span>
                    </div>
                  </div>

                  <div className="bg-ocean-800/60 rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-ocean-400 text-[10px]">Fréq. cardiaque</span>
                      <span className="text-white text-sm font-mono font-bold">{data.heartRate} <span className="text-xs font-normal text-ocean-400">bpm</span></span>
                    </div>
                    <div className="w-full h-1 bg-ocean-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-ocean-300 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (data.heartRate / 120) * 100)}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-ocean-400 text-[10px]">Étanche : IP68 Active</span>
                    {data.sosActive ? (
                      <span className="text-alert-red text-xs font-bold animate-pulse">SOS ACTIF</span>
                    ) : data.mode === 'alert' ? (
                      <span className="text-alert-orange text-xs font-bold">ALERTE</span>
                    ) : (
                      <span className="text-senegal-green text-xs font-bold">● NORMAL</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSosPress}
                  className={`absolute right-[-14px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
                    data.sosActive ? 'bg-alert-red text-white animate-pulse' : sosCountdown > 0 ? 'bg-alert-orange text-white' : 'bg-white text-alert-red hover:bg-red-50'
                  }`}
                >
                  <span className="font-bold text-xs">{sosCountdown > 0 ? sosCountdown : 'SOS'}</span>
                </button>
              </div>

              <div className="w-[240px] h-12 bg-ocean-800 rounded-b-3xl mt-[-8px]" />
              <div className="flex gap-1 mt-2">
                <div className="w-6 h-2 rounded-full bg-senegal-green" />
                <div className="w-6 h-2 rounded-full bg-senegal-yellow" />
                <div className="w-6 h-2 rounded-full bg-senegal-red" />
                <span className="text-ocean-500 text-[10px] ml-1">SÉNÉGAL MARITIME</span>
              </div>
            </div>

            {/* CONTROLS & LOG */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5 border border-ocean-100">
                <h3 className="font-display font-semibold text-ocean-900 text-sm mb-4">Contrôles de simulation</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleSosPress} className={`px-4 py-3 rounded-xl font-medium text-sm transition-all active:scale-95 whitespace-nowrap ${data.sosActive ? 'bg-ocean-100 text-ocean-600' : 'bg-alert-red text-white hover:bg-red-700'}`}>
                    {data.sosActive ? 'Annuler SOS' : 'Appeler SOS'}
                  </button>
                  <button onClick={simulateDrowning} disabled={data.sosActive} className="px-4 py-3 bg-alert-orange text-white rounded-xl font-medium text-sm hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                    Simuler noyade auto
                  </button>
                  <button onClick={simulateLowBattery} className="px-4 py-3 bg-ocean-100 text-ocean-700 rounded-xl font-medium text-sm hover:bg-ocean-200 transition-all active:scale-95 whitespace-nowrap">
                    Batterie faible
                  </button>
                  <button onClick={toggleMesh} className={`px-4 py-3 rounded-xl font-medium text-sm transition-all active:scale-95 whitespace-nowrap ${meshEnabled ? 'bg-senegal-green text-white hover:bg-emerald-700' : 'bg-ocean-100 text-ocean-700'}`}>
                    {meshEnabled ? 'Mesh ON — désactiver' : 'Mesh OFF — activer'}
                  </button>
                  <button onClick={resetSimulation} className="col-span-2 px-4 py-3 bg-ocean-100 text-ocean-700 rounded-xl font-medium text-sm hover:bg-ocean-200 transition-all active:scale-95 whitespace-nowrap">
                    Réinitialiser simulation
                  </button>
                </div>
              </div>

              {/* Mesh nodes */}
              <div className="bg-white rounded-2xl p-5 border border-ocean-100">
                <h3 className="font-display font-semibold text-ocean-900 text-sm mb-3">Réseau Mesh — Voisins de Mer</h3>
                <div className="space-y-2">
                  {meshNodes.slice(0, 4).map((node) => (
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
              </div>

              <div className="bg-white rounded-2xl p-5 border border-ocean-100 flex-1 min-h-[200px]">
                <h3 className="font-display font-semibold text-ocean-900 text-sm mb-3">Journal d'événements</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {log.map((entry, i) => (
                    <div key={i} className={`text-xs font-mono py-1.5 px-2 rounded ${entry.includes('SOS') ? 'bg-alert-red/10 text-alert-red' : entry.includes('ALERTE') ? 'bg-alert-orange/10 text-alert-orange' : 'bg-ocean-50 text-ocean-600'}`}>
                      {entry}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-ocean-100">
                <h3 className="font-display font-semibold text-ocean-900 text-sm mb-3">Caractéristiques Mool-Safe</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Assemblage', value: 'PTN Diamniadio' },
                    { label: 'Signal', value: 'Dual-Signal + Mesh' },
                    { label: 'GPS', value: 'Précision < 3m' },
                    { label: 'Étanchéité', value: 'IP68' },
                    { label: 'Autonomie', value: '72h actif' },
                    { label: 'Détection', value: '5 sec immersion' },
                  ].map((s) => (
                    <div key={s.label} className="bg-ocean-50 rounded-lg p-2.5">
                      <span className="text-ocean-400 text-[10px] block">{s.label}</span>
                      <span className="text-ocean-800 text-xs font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => navigate('/app-mobile')} className="flex-1 px-4 py-3 bg-ocean-900 text-white rounded-xl font-medium text-sm hover:bg-ocean-800 transition-all whitespace-nowrap flex items-center justify-center gap-2">
                  <i className="ri-smartphone-line" /> Voir l'app mobile
                </button>
                <button onClick={() => navigate('/dashboard')} className="flex-1 px-4 py-3 bg-ocean-100 text-ocean-700 rounded-xl font-medium text-sm hover:bg-ocean-200 transition-all whitespace-nowrap flex items-center justify-center gap-2">
                  <i className="ri-dashboard-line" /> Dashboard Marine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}