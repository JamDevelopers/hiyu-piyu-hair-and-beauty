import { useState, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

export function useServiceWorkerUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateFunction, setUpdateFunction] = useState<((reloadPage?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    try {
      const updateSW = registerSW({
        onNeedRefresh() {
          setNeedRefresh(true);
        },
        onOfflineReady() {
          if (import.meta.env.DEV) {
            console.log('[PWA] App is ready for offline browsing.');
          }
        },
      });
      setUpdateFunction(() => updateSW);
    } catch (err) {
      console.warn('[PWA] Service worker registration error:', err);
    }
  }, []);

  const reloadApp = async () => {
    if (updateFunction) {
      await updateFunction(true);
    } else {
      window.location.reload();
    }
  };

  return { needRefresh, reloadApp };
}
