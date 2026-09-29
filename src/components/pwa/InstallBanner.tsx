import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X } from 'lucide-react';

interface InstallBannerProps {
  isOpen: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({
  isOpen,
  onInstall,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-16 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-sm mx-auto"
        >
          <div className="bg-gradient-to-r from-[#4A0718] via-[#5A081E] to-[#36040F] border border-[#D5AA63]/60 rounded-2xl p-3 shadow-2xl backdrop-blur-md text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D5AA63]/60 shrink-0 bg-[#36040F]">
                <img
                  src="/pwa-192x192.png"
                  alt="Hiyupiyu Icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate leading-tight">
                  Install Hiyupiyu App
                </span>
                <span className="text-[10px] text-stone-300 block truncate">
                  Book beauty services faster
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onInstall}
                className="px-3.5 py-1.5 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-bold text-[11px] rounded-full shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3 text-[#241316]" />
                <span>Install</span>
              </button>

              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss banner"
                className="p-1 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
