import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../../pwa/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#36040F] border-b border-[#D5AA63]/50 text-white px-4 py-2.5 shadow-xl backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1 rounded-full bg-amber-500/20 text-amber-400">
                <WifiOff className="w-4 h-4" />
              </span>
              <span>
                <strong>You are currently offline.</strong> Cached pages are viewable. An internet connection is needed for WhatsApp booking.
              </span>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-3 py-1 bg-[#D5AA63] text-[#241316] font-bold rounded-full text-[11px] flex items-center gap-1 hover:brightness-110 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
