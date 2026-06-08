import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

function TimeBox({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-white rounded-xl px-3 py-2 md:px-4 md:py-3 min-w-[56px] md:min-w-[72px] shadow-lg border-2 border-senegal-red/20 overflow-hidden">
        <span className="font-display font-bold text-xl md:text-3xl text-ocean-900 tabular-nums block text-center">
          {display}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-ocean-100" />
      </div>
      <span className="text-[10px] md:text-xs font-semibold text-ocean-400 uppercase tracking-wider mt-1.5">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    function calculate() {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUrgent(false);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsUrgent(days < 3);
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isLaunched =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isLaunched) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-senegal-green/10 border border-senegal-green/30 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-senegal-green opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-senegal-green" />
          </span>
          <span className="text-senegal-green font-semibold text-sm md:text-base">
            Lancement officiel en cours — SEN-MOOL PROTECT 2.0 est live
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isUrgent ? 'bg-senegal-red' : 'bg-senegal-green'
              } opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isUrgent ? 'bg-senegal-red' : 'bg-senegal-green'
              }`}
            />
          </span>
          <span
            className={`font-semibold text-sm md:text-base uppercase tracking-wide ${
              isUrgent ? 'text-senegal-red' : 'text-ocean-700'
            }`}
          >
            Lancement officiel dans
          </span>
        </div>
        <span className="hidden sm:inline text-ocean-300">|</span>
        <span className="text-ocean-500 text-xs md:text-sm font-medium">
          {new Date(targetDate).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 md:gap-5">
        <TimeBox value={timeLeft.days} label="Jours" />
        <span className="font-display font-bold text-xl md:text-2xl text-ocean-300 -mt-4">:</span>
        <TimeBox value={timeLeft.hours} label="Heures" />
        <span className="font-display font-bold text-xl md:text-2xl text-ocean-300 -mt-4">:</span>
        <TimeBox value={timeLeft.minutes} label="Min" />
        <span className="font-display font-bold text-xl md:text-2xl text-ocean-300 -mt-4">:</span>
        <TimeBox value={timeLeft.seconds} label="Sec" />
      </div>

      {isUrgent && (
        <p className="text-center text-senegal-red text-xs md:text-sm font-medium mt-4 animate-pulse">
          Moins de 3 jours — Préparez votre bracelet Mool-Safe
        </p>
      )}
    </div>
  );
}