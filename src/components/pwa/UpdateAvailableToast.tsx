import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useServiceWorkerUpdate } from '../../pwa/useServiceWorkerUpdate';

export const UpdateAvailableToast: React.FC = () => {
  const { needRefresh, reloadApp } = useServiceWorkerUpdate();

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-[#4A0718] to-[#2B030D] border-2 border-[#D5AA63] rounded-2xl p-4 shadow-2xl text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D5AA63]/20 text-[#E9CB8A] flex items-center justify-center shrink-0 border border-[#D5AA63]/40">
                <Sparkles className="w-4 h-4 text-[#E9CB8A]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  New Version Available
                </span>
                <span className="text-[11px] text-stone-300 block">
                  Tap to refresh with latest updates.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={reloadApp}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-bold text-xs rounded-full shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
