/**
 * Local analytics-friendly PWA event dispatcher.
 * No external API calls are made. Provides extensible hooks for future tracking.
 */

export type PWAEventName =
  | 'install_popup_shown'
  | 'install_clicked'
  | 'install_accepted'
  | 'install_dismissed'
  | 'app_installed'
  | 'ios_guide_opened'
  | 'offline_detected'
  | 'online_restored';

export interface PWAEventPayload {
  platform: 'android' | 'ios' | 'desktop' | 'unknown';
  timestamp: number;
  displayMode: 'browser' | 'standalone';
  [key: string]: unknown;
}

export function logPWAEvent(eventName: PWAEventName, extra?: Record<string, unknown>): void {
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true);

  const payload: PWAEventPayload = {
    platform: getPlatformName(),
    timestamp: Date.now(),
    displayMode: isStandalone ? 'standalone' : 'browser',
    ...extra,
  };

  // Dispatch custom DOM event so any future telemetry/listener can catch it
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('hiyupiyu_pwa_event', {
        detail: { eventName, payload },
      })
    );
  }

  // Development console log for debugging
  if (import.meta.env.DEV) {
    console.log(`[PWA Event] ${eventName}:`, payload);
  }
}

function getPlatformName(): 'android' | 'ios' | 'desktop' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';
  const ua = window.navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/windows|macintosh|linux/.test(ua)) return 'desktop';
  return 'unknown';
}
