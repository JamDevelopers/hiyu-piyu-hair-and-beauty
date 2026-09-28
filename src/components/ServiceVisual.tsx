import React, { useState } from 'react';

interface ServiceVisualProps {
  theme?: 'chakra' | 'facial' | 'hair' | 'wax' | 'nails' | 'body' | 'glow' | 'setup';
  title?: string;
  badge?: string;
  imageUrl?: string;
  className?: string;
  heightClass?: string;
}

export const ServiceVisual: React.FC<ServiceVisualProps> = ({
  theme = 'facial',
  title = '',
  badge,
  imageUrl,
  className = '',
  heightClass = 'h-52'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback themes in bright, warm feminine rose-gold palette (not dark!)
  const fallbackGradients = {
    chakra: 'from-[#FFF1F2] via-[#FFE4E6] to-[#FED7AA]',
    facial: 'from-[#FFF7ED] via-[#FEE2E2] to-[#FFEDD5]',
    hair: 'from-[#FAF5FF] via-[#FCE7F3] to-[#FED7AA]',
    wax: 'from-[#FFF1F2] via-[#FDF2F8] to-[#FEE2E2]',
    nails: 'from-[#FFF7ED] via-[#FFE4E6] to-[#FCE7F3]',
    body: 'from-[#FEF3C7] via-[#FEE2E2] to-[#FED7AA]',
    glow: 'from-[#FFFBEB] via-[#FFE4E6] to-[#FEF3C7]',
    setup: 'from-[#F0FDF4] via-[#FEF3C7] to-[#FEE2E2]'
  };

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-t-2xl flex items-center justify-center select-none bg-stone-100 ${className}`}
    >
      {/* Real High-Resolution Photography */}
      {imageUrl && !imageError ? (
        <>
          <img
            src={imageUrl}
            alt={title || 'Beauty Service Hiyupiyu'}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Gentle, radiant warm vignette overlay to ensure text/badges pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/15 to-transparent pointer-events-none" />
        </>
      ) : null}

      {/* Styled Bright & Radiant Floral Fallback Container (used when no image or image fails) */}
      {(!imageUrl || imageError || !imageLoaded) && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            fallbackGradients[theme] || fallbackGradients.facial
          } flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 ${
            imageUrl && imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Subtle Decorative Golden Mandala Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="200" cy="150" r="130" stroke="#B45309" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            <circle cx="200" cy="150" r="90" stroke="#B45309" strokeWidth="0.8" fill="none" />
            <circle cx="200" cy="150" r="50" stroke="#B45309" strokeWidth="0.6" fill="none" />
            <path d="M200,20 L200,280 M70,150 L330,150 M108,58 L292,242 M108,242 L292,58" stroke="#B45309" strokeWidth="0.5" />
          </svg>

          {/* Theme Vector Icon */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {theme === 'chakra' && (
              <svg className="w-14 h-14 text-[#9E1B42] drop-shadow-sm" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                <circle cx="32" cy="32" r="7" strokeWidth="1.5" fill="rgba(244,63,94,0.15)" />
                <path d="M32 10 C36 18, 36 24, 32 25 C28 24, 28 18, 32 10 Z" strokeWidth="1.2" fill="rgba(217,119,6,0.25)" />
                <path d="M32 54 C36 46, 36 40, 32 39 C28 40, 28 46, 32 54 Z" strokeWidth="1.2" fill="rgba(217,119,6,0.25)" />
                <path d="M10 32 C18 36, 24 36, 25 32 C24 28, 18 28, 10 32 Z" strokeWidth="1.2" fill="rgba(217,119,6,0.25)" />
                <path d="M54 32 C46 36, 40 36, 39 32 C40 28, 46 28, 54 32 Z" strokeWidth="1.2" fill="rgba(217,119,6,0.25)" />
              </svg>
            )}

            {theme === 'facial' && (
              <svg className="w-14 h-14 text-[#9E1B42] drop-shadow-sm" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                <path d="M26 16 C34 16, 40 22, 40 30 C40 35, 37 38, 38 42 C39 45, 36 48, 31 48 C25 48, 22 43, 22 36" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M34 18 C46 16, 50 26, 44 32 C38 28, 36 22, 34 18 Z" fill="rgba(244,63,94,0.2)" strokeWidth="1.2" />
              </svg>
            )}

            {theme === 'hair' && (
              <svg className="w-14 h-14 text-[#9E1B42] drop-shadow-sm" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                <path d="M22 18 C28 14, 40 14, 46 22 C48 26, 48 34, 44 42 C40 50, 32 54, 26 54" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M26 22 C32 18, 38 22, 40 28 C42 34, 38 44, 34 50" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 1" />
              </svg>
            )}

            {(theme === 'wax' || theme === 'nails' || theme === 'body' || theme === 'glow' || theme === 'setup') && (
              <svg className="w-14 h-14 text-[#9E1B42] drop-shadow-sm" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                <ellipse cx="32" cy="42" rx="20" ry="7" strokeWidth="1.4" fill="rgba(244,63,94,0.15)" />
                <path d="M22 36 C22 30, 26 26, 32 26 C38 26, 42 30, 42 36" strokeWidth="1.4" />
                <path d="M32 12 L36 24 L48 28 L36 32 L32 44 L28 32 L16 28 L28 24 Z" fill="rgba(217,119,6,0.3)" strokeWidth="1" />
              </svg>
            )}

            <span className="text-xs font-serif font-bold text-[#9E1B42] mt-2 tracking-wide">
              {title || 'Hiyupiyu Beauty Care'}
            </span>
          </div>
        </div>
      )}

      {/* Top Banner Tag / Badge if provided */}
      {badge && (
        <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md border border-amber-300 shadow-sm px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider text-[#9E1B42] uppercase">
          {badge}
        </div>
      )}

      {/* Title overlay at bottom for imagery */}
      {title && imageUrl && (
        <div className="absolute bottom-2.5 left-3.5 right-3.5 z-20 pointer-events-none">
          <span className="text-white font-serif text-sm font-semibold tracking-wide drop-shadow-md line-clamp-1">
            {title}
          </span>
        </div>
      )}

      {/* Bottom Delicate Rose-Gold Hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
    </div>
  );
};
