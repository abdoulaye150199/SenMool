import { useState, useCallback } from 'react';
import type { ToastItem } from '@/components/base/Toast';

export function useNotifications() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast({ type: 'success', title, message, duration }),
    [addToast],
  );
  const error = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast({ type: 'error', title, message, duration }),
    [addToast],
  );
  const warning = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast({ type: 'warning', title, message, duration }),
    [addToast],
  );
  const info = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast({ type: 'info', title, message, duration }),
    [addToast],
  );

  return { toasts, removeToast, success, error, warning, info };
}