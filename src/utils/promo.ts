import { promoCodes, PromoCode } from '../data/promoCodes';

export interface PromoValidationResult {
  valid: boolean;
  promo?: PromoCode;
  discount: number;
  message: string;
}

/**
 * Calculates promo discount locally.
 * Note: Subject to final manual confirmation on WhatsApp.
 */
export function calculateDiscount(subtotal: number, promo: PromoCode | null | undefined): number {
  if (!promo || !promo.active) return 0;
  if (subtotal < promo.minimumAmount) return 0;

  if (promo.type === 'percentage') {
    let discount = Math.round((subtotal * promo.value) / 100);
    if (promo.maximumDiscount && discount > promo.maximumDiscount) {
      discount = promo.maximumDiscount;
    }
    return Math.min(discount, subtotal);
  }

  if (promo.type === 'fixed') {
    return Math.min(promo.value, subtotal);
  }

  return 0;
}

/**
 * Validates promo code string against local catalog
 */
export function validatePromoCode(enteredCode: string, subtotal: number): PromoValidationResult {
  const codeClean = enteredCode.trim().toUpperCase();

  if (!codeClean) {
    return {
      valid: false,
      discount: 0,
      message: 'Please enter a promo code.'
    };
  }

  const promo = promoCodes.find(
    (item) => item.code.toUpperCase() === codeClean && item.active
  );

  if (!promo) {
    return {
      valid: false,
      discount: 0,
      message: `Code "${codeClean}" is invalid or expired.`
    };
  }

  if (subtotal < promo.minimumAmount) {
    return {
      valid: false,
      promo,
      discount: 0,
      message: `Minimum service order of ₹${promo.minimumAmount} required for this code.`
    };
  }

  const discount = calculateDiscount(subtotal, promo);

  return {
    valid: true,
    promo,
    discount,
    message: `Promo applied: ₹${discount} discount!`
  };
}
