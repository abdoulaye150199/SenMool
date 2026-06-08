import { useState } from 'react';

export default function PrototypeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
          <i className="ri-flask-line text-white text-xs" />
        </div>
        <p className="text-amber-800 text-xs font-medium">
          <span className="font-bold">PROTOTYPE / MAQUETTE</span> — Interface interactive de démonstration. Données fictives à des fins de présentation.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-500 hover:text-amber-700 transition-colors flex-shrink-0"
        aria-label="Fermer"
      >
        <i className="ri-close-line text-sm" />
      </button>
    </div>
  );
}