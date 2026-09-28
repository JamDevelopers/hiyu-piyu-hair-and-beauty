export interface Offer {
  id: string;
  title: string;
  gujaratiTitle: string;
  tagline: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  savings: number;
  validUntil: string;
  badge: string;
  includedServices: string[];
  terms: string[];
  popular?: boolean;
  imageUrl?: string;
}

export const offers: Offer[] = [
  {
    id: "bridal-festive-glow",
    title: "Royal Bridal & Festive Radiance Combo",
    gujaratiTitle: "રોયલ બ્રાઇડલ અને ફેસ્ટિવ ગ્લો પેકેજ",
    tagline: "The complete luxury head-to-toe makeover at your doorstep",
    description: "Indulge in our most comprehensive pampering experience designed for brides, wedding guests, and festive occasions across Surat.",
    originalPrice: 5200,
    offerPrice: 3899,
    savings: 1301,
    validUntil: "31 October 2026",
    badge: "Best Value • Save 25%",
    imageUrl: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "7 Chakra Facial with Jade Stone Therapy (75 min)",
      "L'Oréal Deep Conditioning Hair Spa & Head Massage",
      "Full Body Rica Waxing with Pre/Post Soothing Care",
      "Deluxe Rose Petal Manicure & Pedicure with Callus Buffing",
      "Complimentary Eyebrow & Upperlip Threading"
    ],
    terms: [
      "Appointment duration ~ 3.5 to 4 hours.",
      "Advance booking recommended at least 24 hours prior.",
      "Applicable for home visits across Surat."
    ],
    popular: true
  },
  {
    id: "de-tan-monsoon-glow",
    title: "Deep De-Tan & Revitalizing Duo",
    gujaratiTitle: "ડીપ ડી-ટેન અને રિવાઇટલાઇઝિંગ ડ્યુઓ",
    tagline: "Erase sun exposure and restore vibrant moisture balance",
    description: "Ideal for ladies dealing with outdoor pollution, sun tanning, and dull skin texture. Leaves you refreshed and glowing.",
    originalPrice: 2700,
    offerPrice: 1999,
    savings: 701,
    validUntil: "15 November 2026",
    badge: "Seasonal Special",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "O3+ Radiant De-Tan Brightening Facial (60 min)",
      "Lotus Herbal Full Arms & Full Legs De-Tan Pack",
      "Soothing Head & Temple Acupressure Massage"
    ],
    terms: [
      "Takes approx. 90 minutes.",
      "Valid on weekdays & weekends upon slot availability."
    ],
    popular: false
  },
  {
    id: "hair-makeover-smooth",
    title: "Silk Touch Hair Smoothing & Spa Package",
    gujaratiTitle: "સિલ્ક ટચ હેર સ્મૂધનિંગ અને સ્પા પેકેજ",
    tagline: "Bid farewell to stubborn frizz with salon-grade smoothness",
    description: "Complete professional hair transformation including straightening/smoothing, restorative mask, and post-treatment haircut.",
    originalPrice: 4800,
    offerPrice: 3499,
    savings: 1301,
    validUntil: "30 November 2026",
    badge: "Hair Transformation",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "Permanent Hair Straightening / Smoothing Treatment",
      "Post-chemical Nourishing Keratin Infusion",
      "Precision Split-End Haircut & Styling",
      "Take-Home Post-Care Routine Advice"
    ],
    terms: [
      "Takes 3 to 4 hours depending on hair length and volume.",
      "Please keep clean dry hair prior to technician arrival."
    ],
    popular: true
  },
  {
    id: "quick-weekend-pamper",
    title: "Weekend Quick Glow & Waxing Express",
    gujaratiTitle: "વિકએન્ડ ક્વિક ગ્લો અને વેક્સિંગ એક્સપ્રેસ",
    tagline: "Essential monthly hygiene and radiance in 2 hours flat",
    description: "Everything a busy woman needs to feel groomed, tidy, and confident without losing hours at a crowded salon.",
    originalPrice: 2200,
    offerPrice: 1650,
    savings: 550,
    validUntil: "Ongoing Special",
    badge: "Weekend Must-Have",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "Classic Herbal Glow Facial",
      "Full Arms & Half Legs Honey Waxing",
      "Eyebrows & Upperlip Clean Threading",
      "Express Rose Petal Pedicure"
    ],
    terms: [
      "Quick 2-hour home service.",
      "Available across all residential sectors of Surat."
    ],
    popular: false
  }
];
