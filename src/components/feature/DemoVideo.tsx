import { useState, useRef, useEffect } from 'react';

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const posterUrl =
    'https://readdy.ai/api/search-image?query=A%20futuristic%20maritime%20smartwatch%20bracelet%20with%20glowing%20OLED%20screen%20showing%20GPS%20and%20SOS%20interface%2C%20floating%20above%20deep%20dark%20ocean%20water%20at%20twilight%2C%20dramatic%20cinematic%20lighting%20with%20teal%20and%20cyan%20reflections%20on%20the%20waves%2C%20product%20demo%20video%20thumbnail%20style%2C%20ultra%20realistic%2C%204K%20quality%2C%20no%20text%2C%20professional%20tech%20product%20videography%20frame%2C%20dark%20navy%20and%20emerald%20tones&width=1280&height=720&seq=video-poster&orientation=landscape';

  // Vidéo stock libre de droits — océan dramatique (Pexels)
  const videoSrc =
    'https://videos.pexels.com/video-files/854982/854982-hd_1920_1080_25fps.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onTimeUpdate() {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    }

    function onLoadedMetadata() {
      setDuration(video.duration || 0);
    }

    function onEnded() {
      setIsPlaying(false);
      setShowOverlay(true);
    }

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setShowOverlay(true);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
    setCurrentTime(newTime);
  };

  function fmtTime(sec: number) {
    if (!sec || isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  return (
    <div
      className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-ocean-900 shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* VIDEO */}
      <div className="relative h-[300px] md:h-[420px] bg-ocean-950">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterUrl}
          preload="metadata"
          className="w-full h-full object-cover"
          playsInline
          onClick={togglePlay}
        />

        {/* Overlay play initial */}
        {showOverlay && (
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center cursor-pointer transition-opacity"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <i className="ri-play-fill text-ocean-900 text-3xl md:text-4xl ml-1" />
            </div>
            <p className="text-white/90 font-medium text-sm md:text-base mt-4 text-center px-4">
              Démonstration produit — SEN-MOOL PROTECT 2.0
            </p>
            <p className="text-white/50 text-xs mt-1">
              Cliquez pour lire la vidéo
            </p>
          </div>
        )}

        {/* Relecture overlay on pause */}
        {!showOverlay && !isPlaying && (
          <div
            className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <i className="ri-play-fill text-ocean-900 text-2xl ml-1" />
            </div>
          </div>
        )}

        {/* Top-right label */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-senegal-red opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-senegal-red" />
          </span>
          <span className="text-white/80 text-xs font-medium">Démo produit</span>
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="bg-ocean-950 px-4 py-3 flex flex-col gap-2"
      >
        {/* Progress bar */}
        <div className="flex items-center gap-3"
        >
          <span className="text-white/60 text-xs font-mono tabular-nums w-10 text-right"
          >
            {fmtTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress || 0}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-senegal-green hover:accent-emerald-400"
          />
          <span className="text-white/60 text-xs font-mono tabular-nums w-10"
          >
            {fmtTime(duration)}
          </span>
        </div>

        {/* Buttons row */}
        <div className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2"
          >
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <i
                className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-sm`}
              />
            </button>

            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.currentTime = Math.max(0, v.currentTime - 10);
              }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <i className="ri-skip-back-mini-fill text-white text-sm" />
            </button>

            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.currentTime = Math.min(duration, v.currentTime + 10);
              }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <i className="ri-skip-forward-mini-fill text-white text-sm" />
            </button>
          </div>

          <div className="flex items-center gap-2"
          >
            {/* Volume */}
            <div className="group relative flex items-center"
            >
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
              >
                <i className="ri-volume-up-line text-white/70 text-sm" />
              </button>
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={80}
                className="w-0 group-hover:w-16 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-senegal-green transition-all duration-300 mx-1"
                onChange={(e) => {
                  const v = videoRef.current;
                  if (v) v.volume = parseInt(e.target.value) / 100;
                }}
              />
            </div>

            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  v.requestFullscreen?.();
                }
              }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <i className="ri-fullscreen-line text-white/70 text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Caption below player */}
      <div className="bg-white border-t border-ocean-100 px-4 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1"
      >
        <div className="flex items-center gap-1.5 text-ocean-600 text-xs"
        >
          <i className="ri-device-line text-senegal-green" />
          <span>Mool-Safe — Bracelet</span>
        </div>
        <div className="flex items-center gap-1.5 text-ocean-600 text-xs"
        >
          <i className="ri-smartphone-line text-senegal-green" />
          <span>App Mobile — Inclusive</span>
        </div>
        <div className="flex items-center gap-1.5 text-ocean-600 text-xs"
        >
          <i className="ri-dashboard-line text-senegal-green" />
          <span>Mool-Control — Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5 text-ocean-600 text-xs"
        >
          <i className="ri-ship-line text-senegal-green" />
          <span>Voisin de Mer — Mesh</span>
        </div>
      </div>
    </div>
  );
}