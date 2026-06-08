import { useEffect, useState } from 'react';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ToastProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

const iconMap = {
  success: 'ri-checkbox-circle-line',
  error: 'ri-error-warning-line',
  warning: 'ri-alarm-warning-line',
  info: 'ri-information-line',
};

const colorMap = {
  success: 'bg-senegal-green text-white',
  error: 'bg-alert-red text-white',
  warning: 'bg-alert-orange text-white',
  info: 'bg-ocean-600 text-white',
};

function ToastCard({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [toast, onRemove]);

  return (
    <div
      className={`pointer-events-auto max-w-sm w-full rounded-xl p-4 shadow-lg border border-white/10 backdrop-blur-sm transition-all duration-300 ${colorMap[toast.type]} ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <i className={iconMap[toast.type]} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{toast.title}</p>
          <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className="w-5 h-5 flex items-center justify-center opacity-60 hover:opacity-100 flex-shrink-0"
        >
          <i className="ri-close-line" />
        </button>
      </div>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }: ToastProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 items-end pointer-events-none">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}