export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount: number;
  maximumDiscount?: number;
  description: string;
  active: boolean;
}

export const promoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minimumAmount: 500,
    maximumDiscount: 300,
    description: "10% off for first-time clients (up to ₹300, min ₹500 order)",
    active: true
  },
  {
    code: "SAVE150",
    type: "fixed",
    value: 150,
    minimumAmount: 1200,
    description: "Flat ₹150 instant discount on bookings above ₹1,200",
    active: true
  },
  {
    code: "GLOW20",
    type: "percentage",
    value: 20,
    minimumAmount: 2000,
    maximumDiscount: 500,
    description: "20% off on premium facial & combo packages above ₹2,000",
    active: true
  },
  {
    code: "SURAT50",
    type: "fixed",
    value: 50,
    minimumAmount: 400,
    description: "Flat ₹50 off on any quick service above ₹400",
    active: true
  }
];
