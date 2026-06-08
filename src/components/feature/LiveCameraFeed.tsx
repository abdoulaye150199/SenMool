import { useState, useEffect, useCallback, useRef } from 'react';

interface DetectedObject {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  alert?: boolean;
}

export const CAMERAS = [
  { id: 'CAM-001', name: 'Pirogue Jàmm baax', owner: 'Pêcheur #F001', location: 'Cap-Vert, Dakar', status: 'online' as const },
  { id: 'CAM-002', name: 'Pirogue Ndar', owner: 'Pêcheur #F002', location: 'Langue de Barbarie', status: 'online' as const },
  { id: 'CAM-003', name: 'Pirogue Kër gui', owner: 'Pêcheur #F003', location: 'Mbour', status: 'alert' as const },
  { id: 'CAM-004', name: 'Pirogue Sopi', owner: 'Pêcheur #F004', location: 'Joal-Fadiouth', status: 'offline' as const },
  { id: 'CAM-005', name: 'Pirogue Bëggal', owner: 'Pêcheur #F005', location: 'Saint-Louis', status: 'online' as const },
];

const AI_MODELS = [
  { id: 'yolo-maritime-v3', name: 'YOLO-Maritime v3.2', desc: 'Détection multi-objets mer' },
  { id: 'person-fall-v2', name: 'PersonFall-Net v2.1', desc: 'Chute à la mer / noyade' },
  { id: 'vessel-track-v1', name: 'VesselTrack AI v1.4', desc: 'Tracking pirogues & navires' },
];

function generateMockDetections(): DetectedObject[] {
  const base: DetectedObject[] = [
    { id: 'obj-1', label: 'Personne à la mer', confidence: 0.94, x: 32, y: 45, w: 8, h: 12, color: '#ef4444', alert: true },
    { id: 'obj-2', label: 'Pirogue bois', confidence: 0.89, x: 55, y: 38, w: 18, h: 10, color: '#10b981' },
    { id: 'obj-3', label: 'Objet flottant', confidence: 0.71, x: 72, y: 62, w: 6, h: 5, color: '#f59e0b' },
    { id: 'obj-4', label: 'Filet de pêche', confidence: 0.83, x: 15, y: 70, w: 25, h: 8, color: '#06b6d4' },
    { id: 'obj-5', label: 'Vague — houle', confidence: 0.67, x: 45, y: 15, w: 40, h: 12, color: '#6366f1' },
  ];
  // Jitter positions slightly for "live" feel
  return base.map((o) => ({
    ...o,
    x: o.x + (Math.random() - 0.5) * 2,
    y: o.y + (Math.random() - 0.5) * 2,
    confidence: Math.min(0.99, Math.max(0.5, o.confidence + (Math.random() - 0.5) * 0.08)),
  }));
}

export default function LiveCameraFeed() {
  const [selectedCamera, setSelectedCamera] = useState(CAMERAS[0]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [detections, setDetections] = useState<DetectedObject[]>(generateMockDetections());
  const [fps, setFps] = useState(24);
  const [latency, setLatency] = useState(142);
  const [timestamp, setTimestamp] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aiAlert, setAiAlert] = useState<string | null>(
    'ALERTE IA — Personne détectée à la mer (confiance 94%)'
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTimestamp(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // AI detection refresh
  useEffect(() => {
    if (!aiEnabled) return;
    const interval = setInterval(() => {
      setDetections(generateMockDetections());
      setFps(22 + Math.floor(Math.random() * 6));
      setLatency(130 + Math.floor(Math.random() * 40));
    }, 800);
    return () => clearInterval(interval);
  }, [aiEnabled]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const bgImage = selectedCamera.status === 'offline'
    ? 'https://readdy.ai/api/search-image?query=Dark%20blurry%20static%20noise%20screen%20with%20horizontal%20scan%20lines%2C%20no%20signal%20television%20pattern%2C%20black%20and%20gray%20pixel%20noise%2C%20analog%20TV%20off-air%20static%2C%20dark%20monochrome%20aesthetic%2C%20no%20objects%2C%20no%20text&width=1280&height=720&seq=cam-offline&orientation=landscape'
    : 'https://readdy.ai/api/search-image?query=First%20person%20view%20from%20a%20small%20Senegalese%20wooden%20fishing%20pirogue%20on%20the%20Atlantic%20Ocean%20at%20dawn%2C%20calm%20turquoise%20sea%20with%20gentle%20waves%2C%20wooden%20boat%20deck%20edge%20visible%20at%20bottom%2C%20horizon%20line%20with%20warm%20golden%20sunrise%20light%2C%20distant%20coastline%20silhouette%2C%20documentary%20style%20POV%20camera%20shot%2C%20cinematic%20maritime%20atmosphere%2C%20no%20text%2C%20realistic%20photojournalism&width=1280&height=720&seq=cam-live&orientation=landscape';

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-ocean-900 shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Video feed area */}
      <div className="relative h-[280px] md:h-[420px] overflow-hidden">
        {/* Background image / video placeholder */}
        <img
          src={bgImage}
          alt={`Caméra ${selectedCamera.name}`}
          className={`w-full h-full object-cover ${selectedCamera.status === 'offline' ? 'grayscale' : ''}`}
        />

        {/* Offline overlay */}
        {selectedCamera.status === 'offline' && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <i className="ri-video-off-line text-white/40 text-5xl mb-3" />
            <p className="text-white/60 font-medium text-sm">Caméra hors ligne</p>
            <p className="text-white/40 text-xs mt-1">Dernière connexion : il y a 2h</p>
          </div>
        )}

        {/* AI Bounding boxes */}
        {aiEnabled && selectedCamera.status === 'online' && (
          <div className="absolute inset-0 pointer-events-none">
            {detections.map((d) => (
              <div
                key={d.id}
                className="absolute border-2 animate-pulse"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: `${d.w}%`,
                  height: `${d.h}%`,
                  borderColor: d.color,
                  boxShadow: `0 0 8px ${d.color}40`,
                }}
              >
                <div
                  className="absolute -top-5 left-0 text-[9px] font-bold text-white px-1.5 py-0.5 rounded whitespace-nowrap"
                  style={{ backgroundColor: d.color }}
                >
                  {d.label} — {Math.round(d.confidence * 100)}%
                </div>
              </div>
            ))}

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
            </div>

            {/* Crosshair center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full" />
          </div>
        )}

        {/* Top overlay bar */}
        <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-white/90 text-xs font-bold uppercase tracking-wider">Live</span>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-white/70 text-xs font-mono">{selectedCamera.id}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-[10px] font-mono">{timestamp.toLocaleTimeString('fr-FR')}</span>
            <button
              onClick={toggleFullscreen}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <i className={`${isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'} text-white/70 text-xs`} />
            </button>
          </div>
        </div>

        {/* Bottom overlay bar */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-sm font-semibold">{selectedCamera.name}</p>
              <p className="text-white/60 text-[10px]">{selectedCamera.owner} — {selectedCamera.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5">
                <i className="ri-cpu-line text-ocean-300 text-[10px]" />
                <span className="text-white/80 text-[10px] font-mono">{fps} FPS</span>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5">
                <i className="ri-signal-tower-line text-ocean-300 text-[10px]" />
                <span className="text-white/80 text-[10px] font-mono">{latency}ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI alert banner */}
        {aiAlert && aiEnabled && selectedCamera.status === 'online' && (
          <div className="absolute top-10 left-3 right-3 md:left-auto md:right-3 md:w-80">
            <div className="bg-alert-red/90 backdrop-blur-sm rounded-lg p-2.5 border border-alert-red flex items-start gap-2 animate-pulse">
              <i className="ri-alarm-warning-line text-white text-sm mt-0.5" />
              <div>
                <p className="text-white text-xs font-bold">{aiAlert}</p>
                <p className="text-white/70 text-[10px] mt-0.5">IA — {selectedModel.name}</p>
              </div>
              <button
                onClick={() => setAiAlert(null)}
                className="ml-auto text-white/60 hover:text-white text-xs"
              >
                <i className="ri-close-line" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="bg-ocean-900 px-4 py-3 flex flex-col gap-3">
        {/* Camera selector + AI toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-ocean-400 text-[10px] font-semibold uppercase tracking-wider">Caméra</span>
            <div className="flex gap-1.5">
              {CAMERAS.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCamera(cam)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedCamera.id === cam.id
                      ? 'bg-senegal-green text-white'
                      : cam.status === 'offline'
                      ? 'bg-white/5 text-ocean-400'
                      : cam.status === 'alert'
                      ? 'bg-alert-red/10 text-alert-red'
                      : 'bg-white/5 text-ocean-300 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        cam.status === 'online'
                          ? 'bg-senegal-green'
                          : cam.status === 'alert'
                          ? 'bg-alert-red'
                          : 'bg-ocean-400'
                      }`}
                    />
                    {cam.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* AI toggle */}
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                aiEnabled
                  ? 'bg-ocean-500/20 text-ocean-300 border border-ocean-500/30'
                  : 'bg-white/5 text-ocean-500 border border-white/5'
              }`}
            >
              <i className={`${aiEnabled ? 'ri-eye-line' : 'ri-eye-off-line'}`} />
              Vision IA {aiEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Model selector + detection list */}
        {aiEnabled && selectedCamera.status === 'online' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border-t border-white/5 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-ocean-500 text-[10px] font-semibold">Modèle IA</span>
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const m = AI_MODELS.find((x) => x.id === e.target.value);
                  if (m) setSelectedModel(m);
                }}
                className="bg-ocean-900 border border-ocean-700 rounded-lg text-[10px] text-ocean-200 px-2 py-1 focus:outline-none focus:border-ocean-500"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <span className="text-ocean-500 text-[10px]">{selectedModel.desc}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {detections.map((d) => (
                <div
                  key={d.id}
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                    d.alert
                      ? 'bg-alert-red/10 text-alert-red border-alert-red/20'
                      : 'bg-white/5 text-ocean-300 border-white/10'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  {d.label} ({Math.round(d.confidence * 100)}%)
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}