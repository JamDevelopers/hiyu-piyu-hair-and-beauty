import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../pwa/usePWAInstall';
import { InstallPromptModal } from './InstallPromptModal';
import { InstallBanner } from './InstallBanner';
import { IOSInstallModal } from './IOSInstallModal';
import { OfflineIndicator } from './OfflineIndicator';
import { UpdateAvailableToast } from './UpdateAvailableToast';

export const PWAInstallManager: React.FC = () => {
  const {
    isInstalled,
    showModal,
    setShowModal,
    showBanner,
    setShowBanner,
    showIOSGuide,
    setShowIOSGuide,
    installedToast,
    installApp,
    dismissInstallPrompt,
  } = usePWAInstall();

  // If already running standalone, do not render installation prompts
  if (isInstalled) {
    return (
      <>
        <OfflineIndicator />
        <UpdateAvailableToast />
      </>
    );
  }

  return (
    <>
      {/* 1. Offline Mode Indicator */}
      <OfflineIndicator />

      {/* 2. Service Worker New Version Update Toast */}
      <UpdateAvailableToast />

      {/* 3. Android Custom Bottom Sheet Install Modal */}
      <InstallPromptModal
        isOpen={showModal}
        onInstall={installApp}
        onDismiss={dismissInstallPrompt}
      />

      {/* 4. Android Bottom Mobile Banner (only when modal is NOT open) */}
      <InstallBanner
        isOpen={showBanner && !showModal}
        onInstall={() => {
          setShowBanner(false);
          setShowModal(true);
        }}
        onDismiss={() => {
          setShowBanner(false);
          dismissInstallPrompt();
        }}
      />

      {/* 5. iOS Safari Add to Home Screen Modal */}
      <IOSInstallModal
        isOpen={showIOSGuide}
        onClose={() => setShowIOSGuide(false)}
      />

      {/* 6. Success Toast when app is installed */}
      <AnimatePresence>
        {installedToast && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#2B030D] border-2 border-[#D5AA63] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hiyupiyu is now installed on your device!</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E9CB8A]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
