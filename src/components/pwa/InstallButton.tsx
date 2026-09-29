import React from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../../pwa/usePWAInstall';

interface InstallButtonProps {
  className?: string;
  variant?: 'nav' | 'drawer' | 'compact';
  onActionTriggered?: () => void;
}

export const InstallButton: React.FC<InstallButtonProps> = ({
  className = '',
  variant = 'nav',
  onActionTriggered,
}) => {
  const { canInstall, isInstalled, installApp, isIOS, setShowIOSGuide } = usePWAInstall();

  // If already installed, never show
  if (isInstalled) {
    return null;
  }

  // If installation is unavailable (neither PWA prompt nor iOS guide), do not show
  if (!canInstall) {
    return null;
  }

  const handleClick = () => {
    if (onActionTriggered) onActionTriggered();
    if (isIOS) {
      setShowIOSGuide(true);
    } else {
      installApp();
    }
  };

  if (variant === 'drawer') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#241316] bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-110 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${className}`}
      >
        <Download className="w-4 h-4 text-[#241316]" />
        <span>Install App</span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold text-[#E9CB8A] hover:text-white border border-[#D5AA63]/50 hover:border-[#D5AA63] flex items-center gap-1.5 transition-all cursor-pointer hover:bg-white/5 ${className}`}
        title="Install Hiyupiyu Web App"
      >
        <Download className="w-3.5 h-3.5 text-[#D5AA63]" />
        <span>Install App</span>
      </button>
    );
  }

  // Default nav button
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E9CB8A] hover:text-white border border-[#D5AA63]/60 hover:border-[#D5AA63] hover:bg-[#D5AA63]/10 flex items-center gap-1.5 transition-all cursor-pointer ${className}`}
      title="Install Hiyupiyu for fast mobile home screen access"
    >
      <Download className="w-3.5 h-3.5 text-[#D5AA63]" />
      <span>Install App</span>
    </button>
  );
};
