/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { MobileStickyBar } from './components/MobileStickyBar';
import { PWAInstallManager } from './components/pwa/PWAInstallManager';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { OffersPage } from './pages/OffersPage';
import { BookingPage } from './pages/BookingPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { Service, services } from './data/services';
import { Offer } from './data/offers';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Booking prep states
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingPackageTitle, setBookingPackageTitle] = useState<string | undefined>(undefined);
  const [bookingPackagePrice, setBookingPackagePrice] = useState<number | undefined>(undefined);

  // Hash change listener for browser navigation and static SEO deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setActivePage('home');
        return;
      }

      if (hash.startsWith('service-')) {
        const serviceId = hash.replace('service-', '');
        const found = services.find((s) => s.id === serviceId);
        if (found) {
          setSelectedService(found);
          setActivePage('service-detail');
          return;
        }
      }

      const validPages = ['home', 'services', 'offers', 'book', 'gallery', 'about', 'contact'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, hashOverride?: string) => {
    setActivePage(page);
    window.location.hash = hashOverride || (page === 'home' ? '' : page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (service: Service) => {
    setBookingServiceId(service.id);
    setBookingPackageTitle(undefined);
    setBookingPackagePrice(undefined);
    navigateTo('book', 'book');
  };

  const handleBookOffer = (offer: Offer) => {
    setBookingServiceId(undefined);
    setBookingPackageTitle(offer.title);
    setBookingPackagePrice(offer.offerPrice);
    navigateTo('book', 'book');
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    navigateTo('service-detail', `service-${service.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#241316] selection:bg-[#4A0718] selection:text-white">
      {/* Top Navigation */}
      <Header
        activePage={activePage}
        onNavigate={(page) => navigateTo(page)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={(page) => navigateTo(page)}
            onBookService={handleBookService}
            onBookOffer={handleBookOffer}
            onViewService={handleViewService}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onBookService={handleBookService}
            onViewService={handleViewService}
          />
        )}

        {activePage === 'service-detail' && selectedService && (
          <ServiceDetailPage
            service={selectedService}
            onBack={() => navigateTo('services')}
            onBook={handleBookService}
          />
        )}

        {activePage === 'offers' && (
          <OffersPage
            onBookOffer={handleBookOffer}
            onNavigateToBookingWithPromo={(code) => {
              navigateTo('book');
            }}
          />
        )}

        {activePage === 'book' && (
          <BookingPage
            initialServiceId={bookingServiceId}
            initialPackageTitle={bookingPackageTitle}
            initialPrice={bookingPackagePrice}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            onNavigateToBooking={() => navigateTo('book')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigateToBooking={() => navigateTo('book')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(page) => navigateTo(page)} />

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloat />

      {/* Mobile Bottom Sticky Bar */}
      <MobileStickyBar onNavigate={(page) => navigateTo(page)} />

      {/* PWA Lifecycle & Android Install Manager */}
      <PWAInstallManager />
    </div>
  );
}
