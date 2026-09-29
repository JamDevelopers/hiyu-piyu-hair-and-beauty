import { useState, useEffect, useRef, useCallback } from 'react';
import { logPWAEvent } from './analytics';

const DISMISSAL_STORAGE_KEY = 'hiyupiyu_install_dismissed';
const COOLDOWN_DAYS = 7;
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });

  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const [hasDismissed, setHasDismissed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);
  const [installedToast, setInstalledToast] = useState<boolean>(false);

  const userEngagedRef = useRef<boolean>(false);
  const modalAlreadyTriggeredRef = useRef<boolean>(false);

  // Platform detection & Standalone check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = window.navigator.userAgent.toLowerCase();
    const android = /android/.test(ua);
    const ios = /iphone|ipad|ipod/.test(ua);
    setIsAndroid(android);
    setIsIOS(ios);
    setIsDesktop(!android && !ios);

    // Check display mode
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsInstalled(standalone);
    };

    checkStandalone();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener?.('change', checkStandalone);

    // Check 7-day dismissal cooldown
    try {
      const raw = localStorage.getItem(DISMISSAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.dismissedAt && Date.now() - parsed.dismissedAt < COOLDOWN_MS) {
          setHasDismissed(true);
        } else {
          localStorage.removeItem(DISMISSAL_STORAGE_KEY);
        }
      }
    } catch {
      // LocalStorage not available or blocked
    }

    return () => {
      mediaQuery.removeEventListener?.('change', checkStandalone);
    };
  }, []);

  // Listen to beforeinstallprompt and appinstalled
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser default ambient bar
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
      setShowBanner(false);
      setInstalledToast(true);
      logPWAEvent('app_installed');

      // Auto-hide success toast after 4 seconds
      setTimeout(() => {
        setInstalledToast(false);
      }, 4000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Smart Engagement Trigger (Requirement: Do NOT interrupt the hero immediately!)
  // Trigger after user scrolls > 200px OR after 6 seconds of browsing
  useEffect(() => {
    if (isInstalled || hasDismissed || modalAlreadyTriggeredRef.current) return;

    const triggerSmartPresentation = () => {
      if (modalAlreadyTriggeredRef.current) return;
      modalAlreadyTriggeredRef.current = true;
      userEngagedRef.current = true;

      // Only show mobile bottom sheet modal on Android when install prompt is captured
      if (isAndroid && deferredPrompt) {
        setShowModal(true);
        logPWAEvent('install_popup_shown');
      } else if (isAndroid && !deferredPrompt) {
        // If Android but beforeinstallprompt is still warming up, show gentle banner
        setShowBanner(true);
      }
    };

    // 1. Scroll trigger (after 220px scroll)
    const handleScroll = () => {
      if (window.scrollY > 220) {
        window.removeEventListener('scroll', handleScroll);
        setTimeout(triggerSmartPresentation, 1200);
      }
    };

    // 2. Fallback timer trigger (after 6.5 seconds of browsing)
    const timer = setTimeout(() => {
      triggerSmartPresentation();
    }, 6500);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isAndroid, isInstalled, hasDismissed, deferredPrompt]);

  // Install Action
  const installApp = useCallback(async (): Promise<boolean> => {
    logPWAEvent('install_clicked');

    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSGuide(true);
        logPWAEvent('ios_guide_opened');
        return false;
      }
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        logPWAEvent('install_accepted');
        setIsInstalled(true);
        setDeferredPrompt(null);
        setShowModal(false);
        setShowBanner(false);
        setInstalledToast(true);
        setTimeout(() => setInstalledToast(false), 4000);
        return true;
      } else {
        logPWAEvent('install_dismissed', { reason: 'user_cancelled_prompt' });
        setShowModal(false);
        // User dismissed system prompt: treat as dismissal
        try {
          localStorage.setItem(
            DISMISSAL_STORAGE_KEY,
            JSON.stringify({ dismissedAt: Date.now() })
          );
          setHasDismissed(true);
        } catch {
          // ignore
        }
        return false;
      }
    } catch (err) {
      console.error('Failed to trigger PWA installation:', err);
      return false;
    }
  }, [deferredPrompt, isIOS]);

  // Dismiss Action ("Maybe Later")
  const dismissInstallPrompt = useCallback(() => {
    logPWAEvent('install_dismissed', { reason: 'maybe_later_clicked' });
    setShowModal(false);
    setShowBanner(false);
    setHasDismissed(true);

    try {
      localStorage.setItem(
        DISMISSAL_STORAGE_KEY,
        JSON.stringify({ dismissedAt: Date.now() })
      );
    } catch {
      // ignore
    }
  }, []);

  return {
    canInstall: !!deferredPrompt || isIOS,
    isInstallable: !!deferredPrompt,
    isInstalled,
    isAndroid,
    isIOS,
    isDesktop,
    hasDismissed,
    showModal,
    setShowModal,
    showBanner,
    setShowBanner,
    showIOSGuide,
    setShowIOSGuide,
    installedToast,
    setInstalledToast,
    installApp,
    dismissInstallPrompt,
  };
}
