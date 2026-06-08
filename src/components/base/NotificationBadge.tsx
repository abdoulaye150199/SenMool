import { useState } from 'react';
import { mockNotifications } from '@/mocks/senmool-v2';

export default function NotificationBadge() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(mockNotifications);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-ocean-800/50 transition-colors"
      >
        <i className="ri-notification-3-line text-white text-base" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-senegal-red text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-xl border border-ocean-100 z-50 overflow-hidden">
            <div className="p-3 border-b border-ocean-100 flex items-center justify-between">
              <span className="font-display font-semibold text-ocean-900 text-sm">Notifications</span>
              <button
                onClick={markAllRead}
                className="text-ocean-500 text-xs hover:text-ocean-700 transition-colors"
              >
                Tout lire
              </button>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              {notifs.length === 0 ? (
                <p className="p-4 text-ocean-400 text-xs text-center">Aucune notification</p>
              ) : (
                notifs.map((n) => {
                  const iconMap = {
                    alert: 'ri-alarm-warning-line text-alert-red',
                    weather: 'ri-sun-cloudy-line text-ocean-500',
                    system: 'ri-settings-3-line text-ocean-400',
                    mesh: 'ri-ship-line text-senegal-green',
                  };
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full text-left p-3 hover:bg-ocean-50 transition-colors border-b border-ocean-50 ${
                        !n.read ? 'bg-ocean-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className={iconMap[n.type]} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-ocean-800 text-xs font-semibold">{n.title}</p>
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-senegal-red flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-ocean-500 text-[11px] mt-0.5">{n.message}</p>
                          <p className="text-ocean-300 text-[10px] mt-1">
                            {new Date(n.timestamp).toLocaleTimeString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}