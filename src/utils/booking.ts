import { getWhatsAppUrl, openWhatsApp } from './whatsapp';

export interface BookingPayload {
  serviceName: string;
  name: string;
  mobile: string;
  date: string;
  timeSlot: string;
  area: string;
  address: string;
  notes?: string;
  subtotal: number;
  promoCode?: string;
  discount: number;
  estimatedTotal: number;
}

/**
 * Generate a client-side temporary booking reference for communication.
 * e.g., HY-20260928-4821
 */
export function generateBookingReference(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HY-${yyyy}${mm}${dd}-${random}`;
}

/**
 * Build the exact WhatsApp booking request message
 */
export function buildBookingWhatsAppMessage(payload: BookingPayload, reference: string): string {
  const notesSection = payload.notes?.trim() ? `Notes: ${payload.notes.trim()}\n` : '';
  const discountSection = payload.discount > 0 ? `Promo Code: ${payload.promoCode || 'Applied'}\nDiscount: ₹${payload.discount}\n` : '';

  return `Hello Hiyupiyu Hair & Beauty,

I would like to book a home beauty appointment.

Booking Reference: ${reference}

Name: ${payload.name.trim()}
Mobile: ${payload.mobile.trim()}

Service: ${payload.serviceName}
Date: ${payload.date}
Preferred Time: ${payload.timeSlot}

Area: ${payload.area}
Address: ${payload.address.trim()}
${notesSection}
Subtotal: ₹${payload.subtotal}
${discountSection}Estimated Total: ₹${payload.estimatedTotal}

Please check availability and confirm my appointment.

Thank you!`;
}

/**
 * Open WhatsApp with the generated booking request
 */
export function submitBookingViaWhatsApp(payload: BookingPayload): { reference: string; url: string } {
  const reference = generateBookingReference();
  const message = buildBookingWhatsAppMessage(payload, reference);
  const url = getWhatsAppUrl(message);
  openWhatsApp(message);
  return { reference, url };
}
