import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share, PlusSquare, Sparkles } from 'lucide-react';

interface IOSInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallModal: React.FC<IOSInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#160206]/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-sm bg-gradient-to-b from-[#3D0513] to-[#2B030D] text-white rounded-3xl p-6 shadow-2xl border-2 border-[#D5AA63]/50 my-auto"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-stone-300 hover:text-white rounded-full cursor-pointer"
              aria-label="Close guide"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2">
              <div className="w-16 h-16 rounded-2xl mx-auto overflow-hidden shadow-lg border border-[#D5AA63] mb-3 bg-[#4A0718]">
                <img
                  src="/pwa-192x192.png"
                  alt="Hiyupiyu Icon"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                id="ios-install-title"
                className="font-serif text-xl font-bold text-white tracking-tight"
              >
                Add Hiyupiyu to Home Screen
              </h3>
              <p className="text-stone-300 text-xs mt-1">
                Install as a lightweight home screen web app on your iPhone or iPad:
              </p>
            </div>

            <div className="mt-5 space-y-3 bg-white/5 rounded-2xl p-4 border border-[#D5AA63]/30 text-xs text-stone-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#D5AA63]/20 text-[#E9CB8A] flex items-center justify-center shrink-0 mt-0.5">
                  <Share className="w-3.5 h-3.5 text-[#E9CB8A]" />
                </div>
                <div>
                  <span className="font-semibold text-white block">1. Tap the Share button</span>
                  <span className="text-stone-300 text-[11px]">Located at the bottom of Safari (or top right on iPad).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#D5AA63]/20 text-[#E9CB8A] flex items-center justify-center shrink-0 mt-0.5">
                  <PlusSquare className="w-3.5 h-3.5 text-[#E9CB8A]" />
                </div>
                <div>
                  <span className="font-semibold text-white block">2. Tap "Add to Home Screen"</span>
                  <span className="text-stone-300 text-[11px]">Scroll down the menu list and tap Add.</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full py-3 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-bold text-xs rounded-full uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
            >
              Got It
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
