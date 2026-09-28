/**
 * Direct WhatsApp and Call System for Hiyupiyu Hair & Beauty
 * Pure client-side deep links, zero backend.
 */

export const BUSINESS_PHONE_RAW = "919426686048";
export const BUSINESS_PHONE_DISPLAY = "+91 94266 86048";

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_PHONE_RAW}?text=${encodeURIComponent(message.trim())}`;
}

export function openWhatsApp(message: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

export function callBusiness(): void {
  window.location.href = `tel:+${BUSINESS_PHONE_RAW}`;
}

/**
 * General inquiry message
 */
export function getGeneralInquiryMessage(): string {
  return `Hello Hiyupiyu Hair & Beauty,

I want to know more about your ladies-only home beauty services in Surat.
Please share your service details and available appointment slots.

Thank you!`;
}

/**
 * Service-specific inquiry message
 */
export function getServiceInquiryMessage(serviceName: string, price?: number): string {
  const priceLine = price ? `Price: ₹${price}` : '';
  return `Hello Hiyupiyu Hair & Beauty,

I am interested in your service:
Service: ${serviceName}
${priceLine}

Please share more details and available appointment slots for home service in Surat.

Thank you!`;
}

/**
 * Offer-specific inquiry message
 */
export function getOfferInquiryMessage(offerTitle: string, offerPrice: number): string {
  return `Hello Hiyupiyu Hair & Beauty,

I would like to claim the special offer:
Offer: ${offerTitle}
Special Price: ₹${offerPrice}

Please check availability for home service in Surat and let me know your available slots.

Thank you!`;
}
