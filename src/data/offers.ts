export interface Offer {
  id: string;
  title: string;
  gujaratiTitle: string;
  packageCode: string;
  category: 'Navratri Garba Glow' | 'Luxury Healing' | 'Signature Packages (Oil)' | 'Signature Packages (Polish)';
  tagline: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  savings: number;
  validUntil: string;
  badge: string;
  includedServices: string[];
  benefits?: string[];
  terms: string[];
  popular?: boolean;
  imageUrl: string;
}

export const offerCategories = [
  'All Offers',
  'Navratri Garba Glow',
  'Luxury Healing',
  'Signature Packages (Oil)',
  'Signature Packages (Polish)'
] as const;

export const offers: Offer[] = [
  // ========================================================
  // 1. NAVRATRI GARBA GLOW OFFERS (Image 9)
  // "Navratri Ma Lago Queen Jevi"
  // ========================================================
  {
    id: "navratri-offer-01",
    title: "Offer 01: Garba Ready Glow",
    gujaratiTitle: "ઓફર ૦૧: ગરબા રેડી ગ્લો કૉમ્બો",
    packageCode: "OFFER 01",
    category: "Navratri Garba Glow",
    tagline: "Essential pre-Garba skin brightening & grooming in 60 minutes",
    description: "Look fresh and vibrant before hitting the Garba ground. Reverses sun dullness, cleanses facial pores, and grooms eyebrows and lips.",
    originalPrice: 1300,
    offerPrice: 799,
    savings: 501,
    validUntil: "Till Navratri 2026",
    badge: "Navratri Special • Save ₹501",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/001.avif",
    includedServices: [
      "D-Tan Brightening Pack",
      "Glow Facial with Gentle Massage",
      "Eyebrows Threading",
      "Upper Lips Threading"
    ],
    terms: [
      "Book your appointment 2-3 days in advance.",
      "Slots fill fast during Navratri season in Surat.",
      "Ladies only home service."
    ],
    popular: false
  },
  {
    id: "navratri-offer-02",
    title: "Offer 02: Dandiya Queen Combo",
    gujaratiTitle: "ઓફર ૦૨: દાંડિયા ક્વીન કૉમ્બો",
    packageCode: "OFFER 02",
    category: "Navratri Garba Glow",
    tagline: "Flawless arms and festive facial radiance for 9 nights of dance",
    description: "Our most requested Navratri festival package. Get velvet-smooth arms for traditional sleeveless Chaniya Cholis and high-definition facial radiance.",
    originalPrice: 1600,
    offerPrice: 999,
    savings: 601,
    validUntil: "Till Navratri 2026",
    badge: "★ BEST SELLER • Save ₹601",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/002.webp",
    includedServices: [
      "Premium Gold/Radiance Facial",
      "Full Arms Waxing",
      "Underarms Waxing",
      "Eyebrows Threading"
    ],
    terms: [
      "Book your appointment 2-3 days in advance.",
      "Hygienic single-use waxing strips and sanitized instruments.",
      "Ladies only home service."
    ],
    popular: true
  },
  {
    id: "navratri-offer-03",
    title: "Offer 03: Navratri Full Glam Combo",
    gujaratiTitle: "ઓફર ૦૩: નવરાત્રી ફૂલ ગ્લેમ કૉમ્બો",
    packageCode: "OFFER 03",
    category: "Navratri Garba Glow",
    tagline: "Complete hands, feet & face makeover for queen-like presence",
    description: "Pamper yourself with deep de-tan therapy, deluxe manicure and pedicure, radiant facial, and eyebrow shaping right at your home.",
    originalPrice: 2500,
    offerPrice: 1499,
    savings: 1001,
    validUntil: "Till Navratri 2026",
    badge: "Festive Glam • Save ₹1,001",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/001.avif",
    includedServices: [
      "Radiance Facial Treatment",
      "Deluxe Manicure Spa",
      "Revitalizing Pedicure Spa",
      "D-Tan Face & Neck Pack",
      "Eyebrows Threading"
    ],
    terms: [
      "Session duration ~ 2.5 hours.",
      "Book your appointment 2-3 days in advance.",
      "Ladies only home service across Surat."
    ],
    popular: false
  },
  {
    id: "navratri-offer-04",
    title: "Offer 04: Ultimate Navratri Diva Combo",
    gujaratiTitle: "ઓફર ૦૪: અલ્ટીમેટ નવરાત્રી દિવા કૉમ્બો",
    packageCode: "OFFER 04",
    category: "Navratri Garba Glow",
    tagline: "The royal head-to-toe makeover: cream body polish & silky smooth legs",
    description: "The complete bridal & festival luxury transformation. Velvet cream body polish, premium facial, manicure, pedicure, full legs waxing, and eyebrows.",
    originalPrice: 3300,
    offerPrice: 1999,
    savings: 1301,
    validUntil: "Till Navratri 2026",
    badge: "Royal Luxury • Save ₹1,301",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/002.webp",
    includedServices: [
      "Cream Body Polish Exfoliation",
      "Premium High-Glow Facial",
      "Deluxe Manicure Spa",
      "Therapeutic Pedicure Spa",
      "Full Legs Waxing",
      "Eyebrows Threading"
    ],
    terms: [
      "Session duration ~ 3 to 3.5 hours.",
      "Book your appointment 2-3 days in advance.",
      "100% ladies-only certified specialist at your doorstep."
    ],
    popular: true
  },

  // ========================================================
  // 2. LUXURY HEALING COLLECTIONS & COMBOS (Images 3, 4, 5, 6, 7)
  // ========================================================
  {
    id: "divine-eyes-chakra-glow",
    title: "Divine Eyes & Chakra Glow Combo",
    gujaratiTitle: "ડિવાઇન આઇઝ અને ચક્રા ગ્લો કૉમ્બો (01)",
    packageCode: "COLLECTION 01",
    category: "Luxury Healing",
    tagline: "Amethyst gemstone eye mask with authentic 7 chakra stones",
    description: "A transcendental holistic healing trinity merging sound therapy, genuine cooling amethyst crystal eye mask, and the complete 7 Chakra balancing facial.",
    originalPrice: 2400,
    offerPrice: 1499,
    savings: 901,
    validUntil: "Special Limited Offer",
    badge: "Top Recommendation • Save ₹901",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "Sound Therapy Facial (Calming Sound Waves • Relax & Rejuvenate)",
      "Stone Eye Mask (Amethyst cooling crystal • De-puff & Glow)",
      "7 Chakra Facial (Balance • Energy • Glow Therapy)"
    ],
    benefits: [
      "Balances body energy centers and eases mental anxiety",
      "Drains eye puffiness and softens dark circles",
      "Deep vibrational calm and luminous facial clarity"
    ],
    terms: [
      "Book your appointment 2-3 days in advance.",
      "Performed with sanitized crystals and Tibetan singing bowls.",
      "Surat home service strictly for ladies."
    ],
    popular: true
  },
  {
    id: "stone-eye-mask-offer",
    title: "Stone Eye Mask Facial Special Offer",
    gujaratiTitle: "સ્ટોન આઈ માસ્ક ફેશિયલ સ્પેશિયલ (02)",
    packageCode: "COLLECTION 02",
    category: "Luxury Healing",
    tagline: "Weighted cooling crystal mask to dissolve screen fatigue & dark circles",
    description: "Indulge in a tranquil eye sanctuary. Natural amethyst crystals soothe eye strain, reduce dark circles, drain sinus puffiness, and induce sound sleep.",
    originalPrice: 1500,
    offerPrice: 999,
    savings: 501,
    validUntil: "Special Limited Offer",
    badge: "Special Offer • Only ₹999",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "Stone Eye Mask Facial Treatment",
      "Amethyst Gemstone Crystal Placement",
      "Orbital Acupressure & De-Puffing Massage",
      "Soothing Rose Petal Cold Compression"
    ],
    benefits: [
      "Reduces dark circles & morning puffiness",
      "Cools tired, screen-weary eyes",
      "Induces peaceful, restorative sleep",
      "Delivers an instant natural facial glow"
    ],
    terms: [
      "Takes approx. 45-50 minutes.",
      "Surat home service for ladies only."
    ],
    popular: false
  },
  {
    id: "ultimate-trinity-healing",
    title: "Ultimate Trinity Healing Combo",
    gujaratiTitle: "અલ્ટીમેટ ટ્રિનિટી હીલિંગ કૉમ્બો (03)",
    packageCode: "COLLECTION 03",
    category: "Luxury Healing",
    tagline: "Sound Therapy + Crystal Head Massage + 7 Chakra Facial",
    description: "Our #1 Signature Wellness Masterpiece. Tibetan singing bowl resonance, relaxing crystal head massage to release mental tension, and full 7 Chakra facial alignment.",
    originalPrice: 3400,
    offerPrice: 1999,
    savings: 1401,
    validUntil: "Signature Collection",
    badge: "★ BEST SELLER • Save ₹1,401",
    imageUrl: "https://images.unsplash.com/photo-1512290900672-1f4164eb34a5?auto=format&fit=crop&w=800&q=80",
    includedServices: [
      "Sound Therapy Facial (Sound vibration for calm & rejuvenation)",
      "Crystal Head Massage (Crystal healing to release tension)",
      "7 Chakra Facial (Balance & align your 7 chakras)",
      "Stone Eye Mask Crystal Integration"
    ],
    benefits: [
      "Deep cellular relaxation & mental tranquility",
      "Unlocks tension knots in scalp, neck, and temples",
      "Harmonizes energy aura and induces radiant glow",
      "Promotes deep, unbroken sleep"
    ],
    terms: [
      "Appointment duration ~ 90-100 minutes.",
      "Please book 2-3 days in advance.",
      "Ladies only home service."
    ],
    popular: true
  },
  {
    id: "chakra-facial-offer",
    title: "7 Chakra Facial Treatment Offer",
    gujaratiTitle: "૭ ચક્રા ફેશિયલ ટ્રીટમેન્ટ (04)",
    packageCode: "COLLECTION 04",
    category: "Luxury Healing",
    tagline: "Holistic crystal energy alignment & gold peel radiance mask",
    description: "Experience inner serenity and radiant outer brilliance. Authentic 7 chakra gemstones placed along facial vortexes with soothing lymphatic drainage.",
    originalPrice: 2000,
    offerPrice: 1199,
    savings: 801,
    validUntil: "Special Limited Offer",
    badge: "Save ₹801 • Only ₹1,199",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/0.jpg",
    includedServices: [
      "7 Chakra Crystal Placement and Energy Alignment",
      "Botanical Double Cleanse and Gentle Polish",
      "Rose Quartz & Jade Facial Acupressure",
      "Luminescent Gold Radiance Peel-Off Mask"
    ],
    benefits: [
      "Aligns facial and body energy meridians",
      "Drains puffiness and firms skin tone",
      "Leaves skin luminously hydrated and glowing"
    ],
    terms: [
      "Session duration ~ 75 minutes.",
      "Strictly ladies only."
    ],
    popular: false
  },
  {
    id: "sound-therapy-offer",
    title: "Sound Therapy Facial Special Offer",
    gujaratiTitle: "સાઉન્ડ થેરાપી ફેશિયલ સ્પેશિયલ ઓફર",
    packageCode: "SPECIAL OFFER",
    category: "Luxury Healing",
    tagline: "Authentic Tibetan singing bowl sound waves for deep rejuvenation",
    description: "Soothing acoustic frequencies awaken cellular healing, calm racing thoughts, and accompany gentle facial hydration for a tranquil mind and glowing complexion.",
    originalPrice: 1999,
    offerPrice: 1199,
    savings: 800,
    validUntil: "Special Limited Offer",
    badge: "Save ₹800 • Only ₹1,199",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/1.jpg",
    includedServices: [
      "Authentic Tibetan Singing Bowl Acoustic Prelude",
      "Deep Botanical Herbal Facial Cleanse",
      "Sound Wave Acupressure Facial Stimulation",
      "Deep Moisture Peptide Radiance Mask"
    ],
    benefits: [
      "Reduces mental stress and physical exhaustion",
      "Relaxes facial tension lines & headache pressure",
      "Improves sleep quality and awakens natural glow"
    ],
    terms: [
      "Session duration ~ 70 minutes.",
      "Book 2-3 days in advance."
    ],
    popular: false
  },

  // ========================================================
  // 3. PREMIUM SIGNATURE PACKAGES: OIL MASSAGE SERIES (Image 8)
  // "Choose Oil Massage OR Cream Polish — Separate Combos"
  // ========================================================
  {
    id: "package-01a",
    title: "Package 01A: Oil Relax Combo",
    gujaratiTitle: "પેકેજ ૦૧A: ઓઈલ રિલેક્સ કૉમ્બો",
    packageCode: "PACKAGE 01A",
    category: "Signature Packages (Oil)",
    tagline: "Full body warm oil massage with 7 chakra facial & d-tan glow",
    description: "Recharge your body and face. Includes therapeutic full-body warm herbal oil massage, signature 7 Chakra facial, and 7 Chakra D-Tan brightening.",
    originalPrice: 2200,
    offerPrice: 1499,
    savings: 701,
    validUntil: "Signature Package",
    badge: "Oil Massage Series • Only ₹1,499",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/3.jpg",
    includedServices: [
      "Oil Body Massage (Full Body Warm Herbal Oil)",
      "7 CHAKRA Facial Treatment",
      "7 CHAKRA D-Tan Skin Brightening"
    ],
    terms: [
      "Book your appointment 2-3 days in advance.",
      "Separate combo: includes full Oil Body Massage.",
      "Ladies only in complete home privacy."
    ],
    popular: false
  },
  {
    id: "package-02a",
    title: "Package 02A: Divine Oil Calm",
    gujaratiTitle: "પેકેજ ૦૨A: ડિવાઇન ઓઈલ કામ",
    packageCode: "PACKAGE 02A",
    category: "Signature Packages (Oil)",
    tagline: "The comprehensive 7-service healing retreat in your home",
    description: "Our top-rated complete oil therapy package. Relieves full body fatigue while revitalizing face, eyes, hands, and feet with unhurried care.",
    originalPrice: 3200,
    offerPrice: 1999,
    savings: 1201,
    validUntil: "Signature Package",
    badge: "★ BEST SELLER • Only ₹1,999",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/3.jpg",
    includedServices: [
      "Oil Body Massage",
      "Sound Therapy Facial",
      "7 CHAKRA Facial",
      "Stone Eye Mask",
      "D-Tan Treatment",
      "Manicure Spa",
      "Pedicure Spa"
    ],
    terms: [
      "Session duration ~ 3 to 3.5 hours.",
      "Slots fill fast — please book 2-3 days before.",
      "Professional licensed therapists • Hygienic at doorstep."
    ],
    popular: true
  },
  {
    id: "package-03a",
    title: "Package 03A: Ultimate Oil Heaven",
    gujaratiTitle: "પેકેજ ૦૩A: અલ્ટીમેટ ઓઈલ હેવન",
    packageCode: "PACKAGE 03A",
    category: "Signature Packages (Oil)",
    tagline: "The supreme royal head-to-toe deep oil wellness sanctuary",
    description: "Extended therapeutic warm oil body massage combined with Tibetan sound therapy, 7 Chakra facial, cooling stone eye mask, de-tan, manicure, and pedicure.",
    originalPrice: 3900,
    offerPrice: 2499,
    savings: 1401,
    validUntil: "Signature Package",
    badge: "VIP Royal Oil Spa • Only ₹2,499",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/3.jpg",
    includedServices: [
      "Oil Body Massage (Extended Deep Therapy)",
      "Sound Therapy Facial",
      "7 CHAKRA Facial",
      "Stone Eye Mask",
      "D-Tan Treatment",
      "Manicure Spa",
      "Pedicure Spa"
    ],
    terms: [
      "Session duration ~ 3.5 to 4 hours.",
      "Book 2-3 days in advance.",
      "Surat home service strictly for ladies."
    ],
    popular: false
  },

  // ========================================================
  // 4. PREMIUM SIGNATURE PACKAGES: CREAM POLISH SERIES (Image 8)
  // "Choose Oil Massage OR Cream Polish — Separate Combos"
  // ========================================================
  {
    id: "package-01b",
    title: "Package 01B: Polish Glow Combo",
    gujaratiTitle: "પેકેજ ૦૧B: પોલિશ ગ્લો કૉમ્બો",
    packageCode: "PACKAGE 01B",
    category: "Signature Packages (Polish)",
    tagline: "Full body velvet exfoliation with 7 chakra facial & nail care",
    description: "Reveal baby-soft velvet skin texture across your body. Rich exfoliating cream body polish paired with 7 Chakra facial, D-tan, manicure, and pedicure.",
    originalPrice: 2400,
    offerPrice: 1499,
    savings: 901,
    validUntil: "Signature Package",
    badge: "Body Polish Series • Only ₹1,499",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/4.jpg",
    includedServices: [
      "Cream Body Polish (Full Body)",
      "7 CHAKRA Facial",
      "D-Tan Treatment",
      "Manicure Spa",
      "Pedicure Spa"
    ],
    terms: [
      "Book your appointment 2-3 days in advance.",
      "Separate combo: includes Cream Body Polish (no oil massage).",
      "Strictly ladies only."
    ],
    popular: false
  },
  {
    id: "package-02b",
    title: "Package 02B: Divine Polish Glow",
    gujaratiTitle: "પેકેજ ૦૨B: ડિવાઇન પોલિશ ગ્લો",
    packageCode: "PACKAGE 02B",
    category: "Signature Packages (Polish)",
    tagline: "Velvety polished skin glow with sound waves and crystal eye mask",
    description: "Our top-rated polish ritual. Exquisite full-body cream polish with 7 Chakra facial, Tibetan sound vibrations, cooling stone eye mask, manicure, and pedicure.",
    originalPrice: 3300,
    offerPrice: 1999,
    savings: 1301,
    validUntil: "Signature Package",
    badge: "★ BEST SELLER • Only ₹1,999",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/4.jpg",
    includedServices: [
      "Cream Body Polish",
      "7 CHAKRA Facial",
      "Sound Therapy Facial",
      "Stone Eye Mask",
      "Manicure Spa",
      "Pedicure Spa"
    ],
    terms: [
      "Session duration ~ 3 to 3.5 hours.",
      "Book 2-3 days in advance.",
      "Professional licensed therapists • Hygienic at doorstep."
    ],
    popular: true
  },
  {
    id: "package-03b",
    title: "Package 03B: Ultimate Polish Heaven",
    gujaratiTitle: "પેકેજ ૦૩B: અલ્ટીમેટ પોલિશ હેવન",
    packageCode: "PACKAGE 03B",
    category: "Signature Packages (Polish)",
    tagline: "The royal bridal & festive head-to-toe velvet skin transformation",
    description: "The supreme pampering for brides, festive garba, and special celebrations. Includes deep cream body polish, 7 Chakra facial, sound therapy, stone eye mask, D-tan, manicure, and pedicure.",
    originalPrice: 4100,
    offerPrice: 2499,
    savings: 1601,
    validUntil: "Signature Package",
    badge: "VIP Royal Polish • Only ₹2,499",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/4.jpg",
    includedServices: [
      "Cream Body Polish (Deep Full Body Exfoliation)",
      "7 CHAKRA Facial",
      "Sound Therapy Facial",
      "Stone Eye Mask",
      "D-Tan Treatment",
      "Manicure Spa",
      "Pedicure Spa"
    ],
    terms: [
      "Session duration ~ 3.5 to 4 hours.",
      "Book 2-3 days in advance.",
      "Surat home service strictly for ladies."
    ],
    popular: false
  }
];
