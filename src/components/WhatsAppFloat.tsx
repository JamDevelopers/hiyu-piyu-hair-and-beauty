import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openWhatsApp, getGeneralInquiryMessage } from '../utils/whatsapp';

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-end flex-col gap-2">
      {/* Friendly tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-stone-900/90 text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-[#c59b27]/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span>Need a slot in Surat? Chat with Himanshi</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-white cursor-pointer ml-1"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => openWhatsApp(getGeneralInquiryMessage())}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 border-2 border-white/80 cursor-pointer group"
        aria-label="Chat on WhatsApp with Hiyupiyu Hair & Beauty"
        title="WhatsApp: 94266 86048"
      >
        <MessageCircle className="w-7 h-7 drop-shadow" />
        {/* Pulsing ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white"></span>
        </span>
      </button>
    </div>
  );
};
