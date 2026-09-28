import React, { useState } from 'react';
import { Sparkles, Calendar, X } from 'lucide-react';
import { galleryItems, GalleryItem } from '../data/gallery';

interface GalleryPageProps {
  onNavigateToBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigateToBooking }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const tags = ['All', 'Facial Care', 'Hair Transformation', 'Manicure & Pedicure', 'Hygiene Standard', 'Body Wellness'];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedTag === 'All') return true;
    return item.category === selectedTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Real Client Results & Setups · Surat</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] tracking-tight">
          Treatment & Spa Gallery
        </h1>
        <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી
        </p>
        <p className="text-stone-600 text-xs sm:text-sm">
          A visual glimpse into our hygienic mobile salon setups, healing gemstone tools, and radiant hair and skin transformations in Surat.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-[#5B071B] to-[#7A0D28] text-white shadow-md border border-[#D8AA55]/50'
                : 'bg-white border border-[#D8AA55]/30 text-stone-700 hover:text-[#5B071B] hover:border-[#D8AA55]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group bg-white rounded-3xl border-2 border-[#D8AA55]/35 overflow-hidden shadow-luxury-card hover:shadow-luxury-hover transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1.5"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#5B071B] shadow-sm border border-[#D8AA55]/40">
                {item.tag}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D8AA55] font-bold block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#261316] group-hover:text-[#5B071B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#5B071B] font-semibold">
                <span>View Full Setup</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4 border-2 border-[#D8AA55]/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-[#D8AA55]">
                {activeItem.category} • {activeItem.tag}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#261316]">
                {activeItem.title}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setActiveItem(null);
                  onNavigateToBooking();
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#D8AA55] via-[#F1D79A] to-[#D8AA55] text-[#261316] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-gold-glow hover:brightness-105 transition-all"
              >
                Book This Treatment
              </button>
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 text-stone-500 hover:text-stone-800 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
