import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { services, serviceCategories, Service } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';

interface ServicesPageProps {
  onBookService: (service: Service) => void;
  onViewService: (service: Service) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onBookService,
  onViewService
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = services.filter((svc) => {
    const matchesCategory =
      selectedCategory === 'All' || svc.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      svc.name.toLowerCase().includes(query) ||
      svc.gujaratiName.toLowerCase().includes(query) ||
      svc.description.toLowerCase().includes(query) ||
      svc.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Ladies-Only Home Catalog · Surat</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] tracking-tight">
          Beauty & Wellness Services
        </h1>
        <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી
        </p>
        <p className="text-stone-600 text-xs sm:text-sm">
          Delivered exclusively at your home in Surat with sterilized single-use supplies and premium branded cosmetics by certified specialist Himanshi Patel.
        </p>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#D8AA55] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search facial, hair spa, waxing, massage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white border border-[#D8AA55]/40 rounded-2xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55] shadow-luxury-card placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#5B071B] to-[#7A0D28] text-white shadow-md border border-[#D8AA55]/50'
                  : 'bg-white border border-[#D8AA55]/30 text-stone-700 hover:text-[#5B071B] hover:border-[#D8AA55]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Service Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 pb-2 border-b border-[#D8AA55]/20">
          <span>
            Showing <strong className="text-stone-900">{filteredServices.length}</strong> treatments
          </span>
          <span className="text-[#5B071B] font-bold">Surat Doorstep Service</span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D8AA55]/30 p-8 space-y-3 shadow-luxury-card">
            <p className="text-stone-600 text-sm">
              No services found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-[#5B071B] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={onBookService}
                onViewDetails={onViewService}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
