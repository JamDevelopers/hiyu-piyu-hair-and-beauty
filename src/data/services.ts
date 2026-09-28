export interface Service {
  id: string;
  name: string;
  gujaratiName: string;
  category: 'Facial' | 'Hair' | 'Waxing' | 'Hands & Feet' | 'Body Care' | 'Premium Services';
  price: number;
  originalPrice?: number;
  duration: number; // in minutes
  description: string;
  gujaratiDescription?: string;
  benefits: string[];
  includes: string[];
  featured?: boolean;
  active: boolean;
  popularTag?: string;
  visualTheme: 'facial' | 'chakra' | 'hair' | 'wax' | 'nails' | 'body' | 'glow';
  imageUrl: string;
}

export const services: Service[] = [
  // --- PREMIUM & SIGNATURE SERVICES ---
  {
    id: "7-chakra-facial",
    name: "7 Chakra Facial",
    gujaratiName: "7 ચક્રા ફેશિયલ",
    category: "Premium Services",
    price: 1500,
    originalPrice: 1900,
    duration: 75,
    description: "Our signature luxury wellness ritual. Balances facial energy vortexes using organic gemstone extracts, botanical pressure massage, and aura alignment for profound inner serenity and luminous skin glow.",
    gujaratiDescription: "ચહેરાના એનર્જી પોઈન્ટ્સને બેલેન્સ કરતું આયુર્વેદિક અને જેડ સ્ટોન યુક્ત રિલેક્સિંગ પ્રીમિયમ ફેશિયલ.",
    benefits: [
      "Deep vibrational relaxation and stress release",
      "Cellular energy activation for lasting radiance",
      "Lymphatic drainage with cooling gemstone tools",
      "Detoxifies and clarifies tired skin"
    ],
    includes: [
      "Aromatherapy inhalation & welcome mist",
      "7 Chakra herbal cleansing & gentle micro-polish",
      "Vedic energy pressure point acupressure",
      "Cooling jade & rose quartz stone roller",
      "Luminescent gold algae peel-off mask"
    ],
    featured: true,
    active: true,
    popularTag: "Signature Best Seller",
    visualTheme: "chakra",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sound-therapy-facial",
    name: "Sound Therapy Facial",
    gujaratiName: "સાઉન્ડ થેરાપી ફેશિયલ",
    category: "Premium Services",
    price: 1650,
    originalPrice: 2100,
    duration: 80,
    description: "An extraordinary holistic session merging rhythmic acoustic singing bowl resonance with deeply nourishing peptide hydration for ultimate mental calm and youthful skin tone.",
    gujaratiDescription: "તિબેટીયન સાઉન્ડ બોલ્સની મધુર ધ્વનિ સાથે માઈન્ડ રિલેક્સેશન અને ગ્લોઇંગ સ્કિન ફેશિયલ.",
    benefits: [
      "Calms nervous system and reduces facial tension lines",
      "Enhances transdermal serum absorption via acoustic waves",
      "Increases collagen elasticity and suppleness"
    ],
    includes: [
      "Tibetan bowl sound frequency prelude",
      "Triple botanical cleanse & gentle enzyme peel",
      "Hydrating botanical serum massage",
      "Deep relaxation acoustic mask interval"
    ],
    featured: true,
    active: true,
    popularTag: "Exclusive Luxury",
    visualTheme: "chakra",
    imageUrl: "https://images.unsplash.com/photo-1512290900672-1f4164eb34a5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "stone-eye-mask",
    name: "Stone Eye Mask Therapy",
    gujaratiName: "સ્ટોન આઈ માસ્ક થેરાપી",
    category: "Premium Services",
    price: 600,
    originalPrice: 850,
    duration: 35,
    description: "Specialized cold-pressed amethyst and jade mineral eye treatment targeting dark circles, screen fatigue, puffiness, and fine crow's feet lines.",
    gujaratiDescription: "આંખોના થાક, ડાર્ક સર્કલ અને સોજા દૂર કરવા માટે ખાસ કુદરતી સ્ટોન આઈ માસ્ક.",
    benefits: [
      "Instantly drains fluid retention and reduces puffiness",
      "Soothes tired eyes caused by screen time and sleeplessness",
      "Firms delicate under-eye contours"
    ],
    includes: [
      "Cucumber & rose cooling compress",
      "Gentle acupressure eye massage with almond serum",
      "Weighted natural cooling jade stone eye blanket"
    ],
    featured: false,
    active: true,
    visualTheme: "facial",
    imageUrl: "https://images.unsplash.com/photo-1512290900672-1f4164eb34a5?auto=format&fit=crop&w=800&q=80"
  },

  // --- FACIALS ---
  {
    id: "all-type-facial",
    name: "Custom Classic Glow Facial",
    gujaratiName: "ઓલ ટાઇપ ફેશિયલ (કસ્ટમ ગ્લો)",
    category: "Facial",
    price: 900,
    originalPrice: 1200,
    duration: 60,
    description: "Personalized skin cleansing and massage therapy tailored precisely to your skin type—dry, oily, combination, or sensitive.",
    gujaratiDescription: "તમારી સ્કિન ટાઈપ મુજબ ઊંડાણપૂર્વક ક્લીન્સિંગ અને મોઈશ્ચરાઈઝિંગ કરતું ફ્રેશ ગ્લો ફેશિયલ.",
    benefits: [
      "Cleanses deep pores and dissolves blackheads",
      "Restores natural moisture barrier",
      "Smooth, supple and refreshed look"
    ],
    includes: [
      "Deep cleansing with herbal milk",
      "Steam & gentle vacuum / scrubber exfoliation",
      "15-minute relaxing facial and neck massage",
      "Nourishing skin pack & SPF finish"
    ],
    featured: true,
    active: true,
    popularTag: "Popular",
    visualTheme: "facial",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "o3-bridal-glow-facial",
    name: "O3+ Radiant Bridal Glow Facial",
    gujaratiName: "O3+ બ્રાઇડલ ગ્લો ફેશિયલ",
    category: "Facial",
    price: 1800,
    originalPrice: 2400,
    duration: 75,
    description: "Professional medical-grade brightening facial infused with active oxygen molecules, niacinamide, and gold pigments for show-stopping bridal luminescence.",
    gujaratiDescription: "લગ્ન પ્રસંગ અને તહેવારો માટે સ્પેશિયલ હાઇ-એન્ડ O3+ વ્હાઇટનિંગ અને ગ્લો ટ્રીટમેન્ટ.",
    benefits: [
      "Intensive tan removal and skin tone evening",
      "3D radiant glass skin glow",
      "Diminishes pigmentation and blemishes"
    ],
    includes: [
      "O3+ brightening cleanaur & micro-dermabrasion scrub",
      "Oxygen whitening ampoule serum infusion",
      "Pure gold sheet booster mask",
      "Cooling hydration lock finish"
    ],
    featured: true,
    active: true,
    popularTag: "Bridal Favorite",
    visualTheme: "glow",
    imageUrl: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lotus-herbal-tan-clear",
    name: "Lotus Herbal Tan-Clear Facial",
    gujaratiName: "લોટસ હર્બલ ડી-ટેન ફેશિયલ",
    category: "Facial",
    price: 1100,
    originalPrice: 1400,
    duration: 60,
    description: "Natural Ayurvedic tan removal facial enriched with liquorice, mulberry, and papaya enzymes that gently lift stubborn sun tan and pollution dullness.",
    gujaratiDescription: "સૂર્યના તડકા અને પ્રદૂષણથી થયેલ કાળાશ દૂર કરતું શુદ્ધ હર્બલ ડી-ટેન ફેશિયલ.",
    benefits: [
      "Reverses sun damage and pigmentation",
      "Cooling, anti-inflammatory effect",
      "Lightens dark spots naturally"
    ],
    includes: [
      "Papaya enzyme deep exfoliation",
      "De-tan eucalyptus herbal wrap",
      "Sandalwood cooling massage cream",
      "Clay clarifying tan pack"
    ],
    featured: false,
    active: true,
    visualTheme: "facial",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },

  // --- HAIR SERVICES ---
  {
    id: "loreal-hair-spa",
    name: "L'Oréal Deep Nourishing Hair Spa",
    gujaratiName: "હેર સ્પા (ડીપ નરિશિંગ)",
    category: "Hair",
    price: 950,
    originalPrice: 1300,
    duration: 60,
    description: "Intense moisture and protein therapy for dry, frizzy, chemical-treated, or rough hair. Includes steam therapy and a 20-minute rhythmic head and shoulder massage.",
    gujaratiDescription: "વાળને રેશમી, ચમકદાર અને મુલાયમ બનાવતું સ્પેશિયલ હેર સ્પા અને હેડ મસાજ.",
    benefits: [
      "Controls frizz and deeply conditions split ends",
      "Stimulates scalp blood flow and supports hair strength",
      "Unbelievable silky shine and easy manageability"
    ],
    includes: [
      "Scalp diagnosis & clarifying wash",
      "Protein concentrate cream application",
      "Ionic hair steaming",
      "Deep stress-relief neck & shoulder massage",
      "Velvet serum finish"
    ],
    featured: true,
    active: true,
    popularTag: "Must Try",
    visualTheme: "hair",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "permanent-hair-straightening",
    name: "Permanent Hair Straightening & Smoothing",
    gujaratiName: "હેર સ્ટ્રેટનિંગ અને સ્મૂધનિંગ",
    category: "Hair",
    price: 3500,
    originalPrice: 4800,
    duration: 180,
    description: "Transform curly, wavy, or unruly tresses into glass-smooth, poker-straight perfection with long-lasting structural bond restructuring and zero damage formulas.",
    gujaratiDescription: "વાળને કાયમી રેશમી, સીધા અને આકર્ષક બનાવતી પ્રોફેશનલ સ્મૂધનિંગ ટ્રીટમેન્ટ.",
    benefits: [
      "Straight, manageable, wash-and-go hair for months",
      "Eliminates 95% of frizz and humidity puffiness",
      "Mirror-like gloss and softness"
    ],
    includes: [
      "Pre-treatment protein filler",
      "Precision straightening cream application",
      "Ceramic heat sealing",
      "Neutralizing mask & post-care shine gloss"
    ],
    featured: true,
    active: true,
    visualTheme: "hair",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hair-cut-styling",
    name: "Precision Hair Cut & Blowdry Styling",
    gujaratiName: "હેર કટ અને બ્લોડ્રાય સ્ટાઇલિંગ",
    category: "Hair",
    price: 450,
    originalPrice: 600,
    duration: 40,
    description: "Bespoke haircut customized to flatter your face shape—layers, feather, step cut, blunt bob, or split-end cleanup with volume blow-dry.",
    gujaratiDescription: "ફેસ શેપ અનુસાર લેયર્સ, સ્ટેપ અથવા ફેધર કટ સાથે પ્રોફેશનલ બ્લોડ્રાય.",
    benefits: [
      "Removes split ends while preserving your desired length",
      "Adds bounce, volume, and movement",
      "Effortless daily styling"
    ],
    includes: [
      "Style consultation",
      "Wet sectioning & precision cut",
      "Thermal round-brush blowdry"
    ],
    featured: false,
    active: true,
    visualTheme: "hair",
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "highlights-hair-colour",
    name: "Global Hair Colour & Highlights",
    gujaratiName: "ગ્લોબલ હેર કલર અને હાઇલાઇટ્સ",
    category: "Hair",
    price: 1800,
    originalPrice: 2400,
    duration: 120,
    description: "Ammonia-free rich shades—warm chocolate, caramel balayage, honey blonde streaks, or 100% grey root coverage with luminous conditioning gloss.",
    gujaratiDescription: "વાળને સુંદર લુક આપવા માટે પ્રીમિયમ હાઇલાઇટ્સ અથવા ગ્રે હેર કવરેજ કલર.",
    benefits: [
      "100% grey coverage with non-damaging organic oils",
      "Multi-dimensional salon depth and vibrant shimmer",
      "Long-lasting fade-resistant shine"
    ],
    includes: [
      "Shade matching consultation",
      "Precision foil highlight placement or global application",
      "Post-color acidic shine rinse & conditioning pack"
    ],
    featured: false,
    active: true,
    visualTheme: "hair",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80"
  },

  // --- WAXING SERVICES ---
  {
    id: "full-body-wax",
    name: "Full Body Waxing (Rica / Honey)",
    gujaratiName: "ફુલ બોડી વેક્સ (રીકા / હની)",
    category: "Waxing",
    price: 1350,
    originalPrice: 1750,
    duration: 70,
    description: "Smooth, hygienic, and nearly painless full-body waxing done with disposable hygiene sheets, pre-wax sanitization, and soothing post-wax chamomile lotion.",
    gujaratiDescription: "સંપૂર્ણ હાઇજીનિક, ડિસ્પોઝેબલ કીટ સાથે સ્મૂધ અને ક્લીન ફુલ બોડી વેક્સિંગ.",
    benefits: [
      "Leaves skin silky smooth for up to 4 weeks",
      "Gradually slows down and thins hair regrowth",
      "Gently exfoliates dead epidermal surface cells"
    ],
    includes: [
      "Full arms, full legs, underarms & stomach/back line",
      "Pre-wax soothing cooling powder",
      "Gentle temperature-controlled wax",
      "Post-wax soothing tea-tree lotion"
    ],
    featured: true,
    active: true,
    popularTag: "Home Favorite",
    visualTheme: "wax",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "arms-legs-underarms-wax",
    name: "Arms, Legs & Underarms Wax Combo",
    gujaratiName: "હાથ, પગ અને અન્ડરઆર્મ્સ વેક્સ",
    category: "Waxing",
    price: 750,
    originalPrice: 1000,
    duration: 45,
    description: "Quick, neat, and gentle waxing for limbs and underarms using skin-friendly non-sticky herbal wax formulas.",
    gujaratiDescription: "નિયમિત સંભાળ માટે હાથ, પગ અને અન્ડરઆર્મ્સનું પરફેક્ટ વેક્સિંગ પેકેજ.",
    benefits: [
      "Quick 45-minute treatment at your home",
      "Minimal irritation and no stickiness"
    ],
    includes: [
      "Full arms, full legs and underarms",
      "Post-wax cooling gel"
    ],
    featured: false,
    active: true,
    visualTheme: "wax",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "eyebrow-threading-upperlip",
    name: "Eyebrow Threading & Upperlip / Forehead",
    gujaratiName: "આઈ-બ્રો, અપરલિપ અને ફોરહેડ થ્રેડિંગ",
    category: "Waxing",
    price: 150,
    originalPrice: 200,
    duration: 20,
    description: "Precision shape definition with sterile anti-bacterial organic cotton thread for crisp, clean brow arches.",
    gujaratiDescription: "આંખોને આકર્ષક શેપ આપવા માટે પરફેક્ટ થ્રેડિંગ અને અપરલિપ કેર.",
    benefits: [
      "Crisp arch definition customized to your eyes",
      "Quick and hygienic with aloe vera soothing gel"
    ],
    includes: [
      "Eyebrows shaping",
      "Upper lips & forehead hair removal",
      "Cooling aloe vera massage"
    ],
    featured: false,
    active: true,
    visualTheme: "wax",
    imageUrl: "https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80"
  },

  // --- HANDS & FEET ---
  {
    id: "manicure-pedicure-combo",
    name: "Deluxe Rose Petal Manicure & Pedicure Combo",
    gujaratiName: "મેનીક્યોર અને પેડીક્યોર કોમ્બો",
    category: "Hands & Feet",
    price: 1100,
    originalPrice: 1500,
    duration: 75,
    description: "A decadent spa bath for tired hands and cracked heels. Includes botanical dead-sea salt soak with fresh rose petals, heel scraping, cuticle grooming, and relaxing massage.",
    gujaratiDescription: "ગુલાબની પાંખડીઓ સાથે હાથ-પગની ક્લિનિંગ, સ્ક્રબ અને રિલેક્સિંગ મસાજ.",
    benefits: [
      "Heals cracked heels and removes thick calluses",
      "Restores softness to sun-exposed hands and feet",
      "Clean, shaped, and naturally glossy nails"
    ],
    includes: [
      "Aromatic rose-water warm soak with Epsom salts",
      "Callus buffing & cuticle care",
      "Walnut shell micro-exfoliation",
      "20-minute acupressure foot and hand massage",
      "Protective nail buffing or polish application"
    ],
    featured: true,
    active: true,
    visualTheme: "nails",
    imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "heel-peel-pedicure",
    name: "Advanced Heel Peel & Cracked Foot Treatment",
    gujaratiName: "હીલ પીલ થેરાપી (પગની મજબૂત કાળજી)",
    category: "Hands & Feet",
    price: 700,
    originalPrice: 950,
    duration: 45,
    description: "Clinical-strength fruit acid heel wrap that softens stubborn deep cracks, hard skin, and rough heels without painful blades.",
    gujaratiDescription: "પગની તિરાડો અને કઠણ ચામડીને સોફ્ટ બનાવતી મેડિકેટેડ હીલ ટ્રીટમેન્ટ.",
    benefits: [
      "Noticeably baby-soft soles in just one session",
      "Painless and safe for sensitive feet"
    ],
    includes: [
      "Keratolytic fruit acid peel wrap",
      "Gentle diamond-grit foot sanding",
      "Rich shea butter moisture seal"
    ],
    featured: false,
    active: true,
    visualTheme: "nails",
    imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80"
  },

  // --- BODY CARE ---
  {
    id: "oil-body-massage",
    name: "Holistic Herbal Oil Body Massage",
    gujaratiName: "ઓઈલ બોડી મસાજ (હર્બલ રિલેક્સેશન)",
    category: "Body Care",
    price: 1400,
    originalPrice: 1800,
    duration: 60,
    description: "Full-body stress melting massage using warm Ayurvedic sesame, almond, and essential oils. Performed strictly for ladies with warm towel wipe-downs.",
    gujaratiDescription: "થાક અને બોડી પેઈન દૂર કરવા માટે વોર્મ આયુર્વેદિક ઓઈલ બોડી મસાજ.",
    benefits: [
      "Relieves backache, shoulder knots, and fatigue",
      "Improves blood circulation and sound sleep",
      "Nourishes deep dermis and leaves skin glowing"
    ],
    includes: [
      "Warm botanical oil formulation",
      "Full body rhythmic pressure stroke therapy",
      "Warm steamed towel wipe-down"
    ],
    featured: true,
    active: true,
    visualTheme: "body",
    imageUrl: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cream-body-polish",
    name: "Radiance Cream Body Polish",
    gujaratiName: "ક્રીમ બોડી પોલિશ (બ્રાઇડલ ગ્લો)",
    category: "Body Care",
    price: 1600,
    originalPrice: 2200,
    duration: 75,
    description: "Luxurious exfoliating wrap that sloughs away dead layers using crushed walnut, saffron cream, and milk proteins for silky, radiant body skin.",
    gujaratiDescription: "આખા શરીરની સ્કિનને એકસરખી અને સોનેરી ચમક આપતું પ્રીમિયમ બોડી પોલિશિંગ.",
    benefits: [
      "Evens out stubborn pigmentation on elbows, knees & back",
      "Velvety-soft texture that lasts for weeks",
      "Essential pre-bridal glow preparation"
    ],
    includes: [
      "Full body saffron-almond micro scrub",
      "Nourishing herbal milk cream glaze massage",
      "Moisturizing post-polish butter"
    ],
    featured: true,
    active: true,
    popularTag: "Bridal Essential",
    visualTheme: "body",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  }
];

export const serviceCategories = [
  "All",
  "Premium Services",
  "Facial",
  "Hair",
  "Waxing",
  "Hands & Feet",
  "Body Care"
] as const;

