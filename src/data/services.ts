export interface Service {
  id: string;
  name: string;
  gujaratiName: string;
  category: 'Luxury Healing & Body' | 'Facials & Skin Glow' | 'Waxing Care' | 'Hands & Feet' | 'Hair Rituals' | 'Threading';
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
  startingPrice?: boolean;
  imageUrl: string;
  visualTheme?: 'chakra' | 'facial' | 'hair' | 'wax' | 'nails' | 'body' | 'glow' | 'setup';
}

export const serviceCategories = [
  'All',
  'Luxury Healing & Body',
  'Facials & Skin Glow',
  'Waxing Care',
  'Hands & Feet',
  'Hair Rituals',
  'Threading'
] as const;

export const services: Service[] = [
  // ==========================================
  // 1. LUXURY HEALING & BODY (પ્રીમિયમ બોડી અને સ્કીન સર્વિસ)
  // ==========================================
  {
    id: "7-chakra-facial",
    name: "7 Chakra Facial",
    gujaratiName: "૭ ચક્રા ફેશિયલ",
    category: "Luxury Healing & Body",
    price: 1500,
    originalPrice: 2000,
    duration: 75,
    description: "Our signature holistic energy healing facial aligning your 7 bodily chakras using authentic gemstone crystal stones, botanical serums, and gentle acupressure for inner calm and radiant skin.",
    gujaratiDescription: "ચહેરાના એનર્જી પોઈન્ટ્સને બેલેન્સ કરતું કુદરતી જેમસ્ટોન અને ચક્રા બેલેન્સિંગ પ્રીમિયમ ફેશિયલ.",
    benefits: [
      "Balances 7 body chakra energy centers",
      "Lymphatic drainage with cooling gemstone crystals",
      "Deep vibrational calm & radiant luminous skin",
      "Reduces tension lines, headaches, and mental stress"
    ],
    includes: [
      "Chakra energy assessment & breathing ritual",
      "Botanical milk cleanse & gentle micro-polish",
      "7 Chakra crystal placement and energy alignment",
      "Rose quartz & jade acupressure facial massage",
      "Luminescent gold radiance peel-off mask"
    ],
    featured: true,
    active: true,
    popularTag: "Signature Healing • ₹1,500",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/0.jpg"
  },
  {
    id: "sound-therapy-facial",
    name: "Sound Therapy Facial",
    gujaratiName: "સાઉન્ડ થેરાપી ફેશિયલ",
    category: "Luxury Healing & Body",
    price: 1300,
    originalPrice: 1999,
    duration: 70,
    description: "Holistic acoustic healing session merging authentic Tibetan singing bowl sound vibrations with deep facial hydration to dissolve cellular stress, improve sleep, and awaken a natural glow.",
    gujaratiDescription: "તિબેટીયન સાઉન્ડ બોલ્સની મધુર ધ્વનિ તરંગો સાથે ડીપ રિલેક્સેશન અને નેચરલ ગ્લો ફેશિયલ.",
    benefits: [
      "Sound vibrations melt away nervous exhaustion & anxiety",
      "Promotes deep restorative sleep and peace of mind",
      "Stimulates cellular regeneration & natural glow",
      "Harmonizes mind and balances body energy field"
    ],
    includes: [
      "Tibetan acoustic singing bowl frequency prelude",
      "Triple botanical herbal cleanse",
      "Rhythmic sound wave facial acupressure",
      "Deep moisture peptide hydration pack",
      "Harmonic sound bowl closing ritual"
    ],
    featured: true,
    active: true,
    popularTag: "Sound Wave Therapy • ₹1,300",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/1.jpg"
  },
  {
    id: "stone-eye-mask",
    name: "Stone Eye Mask Facial",
    gujaratiName: "સ્ટોન આઈ માસ્ક",
    category: "Luxury Healing & Body",
    price: 1200,
    originalPrice: 1500,
    duration: 45,
    description: "Luxurious amethyst & crystal gemstone weighted eye mask ritual that drains sinus puffiness, reduces dark circles, cools tired strained eyes, and induces restorative sleep.",
    gujaratiDescription: "આંખોના થાક, સોજા અને ડાર્ક સર્કલ દૂર કરતું કૂલિંગ ક્રિસ્ટલ સ્ટોન આઈ માસ્ક.",
    benefits: [
      "Cools and refreshes screen-fatigued tired eyes",
      "Removes fluid retention and morning puffiness",
      "Fades stubborn dark circles & crow's feet lines",
      "Relaxes eye muscles for peaceful sound sleep"
    ],
    includes: [
      "Cooling rose petal compress & herbal eye mist",
      "Almond & caffeine serum orbital massage",
      "Natural weighted amethyst crystal gemstone eye mask",
      "Gentle temple and forehead acupressure"
    ],
    featured: true,
    active: true,
    popularTag: "Crystal Therapy • ₹1,200",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/2.jpg"
  },
  {
    id: "oil-body-massage",
    name: "Oil Body Massage",
    gujaratiName: "ઓઈલ બોડી મસાજ",
    category: "Luxury Healing & Body",
    price: 899,
    originalPrice: 1300,
    duration: 60,
    description: "Soothing full-body warm herbal oil massage delivered in the total privacy and comfort of your home by licensed expert Himanshi Patel to melt fatigue, joint soreness, and stress.",
    gujaratiDescription: "ગરમ આયુર્વેદિક ઓઈલ સાથે થાક અને દર્દ દૂર કરતી પૂર્ણ બોડી મસાજ.",
    benefits: [
      "Relieves stiff back, neck, and shoulder muscle knots",
      "Boosts blood circulation and eases body fatigue",
      "Deeply moisturizes dry, depleted skin tissue",
      "Strictly ladies only in complete home privacy"
    ],
    includes: [
      "Warm sesame & almond herbal oil blend",
      "Targeted back, shoulders, arms & leg massage",
      "Gentle acupressure spine alignment strokes",
      "Warm sanitized towel compress"
    ],
    featured: true,
    active: true,
    popularTag: "Pure Relaxation • ₹899",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/3.jpg"
  },
  {
    id: "cream-body-polish",
    name: "Cream Body Polish",
    gujaratiName: "ક્રીમ બોડી પોલિશ",
    category: "Luxury Healing & Body",
    price: 999,
    originalPrice: 1500,
    duration: 60,
    description: "Exquisite exfoliating and brightening cream body polish that sloughs dead skin cells, reveals baby-soft silky texture, and restores radiant bridal glow across the body.",
    gujaratiDescription: "બોડી સ્કિનને સ્મૂથ, ગ્લોઇંગ અને સિલ્કી સોફ્ટ બનાવતું ક્રીમ બોડી પોલિશ.",
    benefits: [
      "Removes dead skin layers and deeply cleanses pores",
      "Instantly evens out patchy skin tone & tan lines",
      "Infuses lasting velvet smoothness and natural fragrance",
      "Ideal prep for festive garba and bridal wear"
    ],
    includes: [
      "Aromatherapy botanical body exfoliation scrub",
      "Gentle full-body polishing circular strokes",
      "Hydrating milk and rose nourishment emulsion",
      "Silky skin finishing cream glaze"
    ],
    featured: true,
    active: true,
    popularTag: "Velvet Glow • ₹999",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/4.jpg"
  },

  // ==========================================
  // 2. FACIALS & SKIN GLOW (ફેસિયલ અને ક્લીન અપ)
  // ==========================================
  {
    id: "facial-classic",
    name: "Facial (All Types)",
    gujaratiName: "ફેશિયલ (બધા પ્રકારના ફેશિયલ)",
    category: "Facials & Skin Glow",
    price: 400,
    startingPrice: true,
    duration: 60,
    description: "Customized professional salon facial tailored to your skin type (Herbal, Gold, Diamond, Fruit, or Radiance) for deep nourishment, pore cleansing, and glowing complexion.",
    gujaratiDescription: "તમારી સ્કિન ટાઈપ મુજબના હર્બલ, ગોલ્ડ અને ગ્લોઇંગ ફેશિયલ.",
    benefits: [
      "Deep pore unclogging & blackhead removal",
      "Improves skin tone, elasticity, and softness",
      "Stimulates lymphatic circulation with relaxing face massage"
    ],
    includes: [
      "Skin type analysis & double cleansing",
      "Gentle steam & exfoliation scrub",
      "Acupressure face, neck & shoulder massage",
      "Nourishing herbal treatment pack"
    ],
    featured: true,
    active: true,
    popularTag: "Start from ₹400",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/5.jpg"
  },
  {
    id: "clean-up",
    name: "Clean Up",
    gujaratiName: "ક્લીન અપ",
    category: "Facials & Skin Glow",
    price: 350,
    startingPrice: true,
    duration: 40,
    description: "Quick and effective deep-pore purifying facial clean up that removes dirt, dead cells, and excess sebum for an instant clean and refreshed look.",
    gujaratiDescription: "ત્વચાના છિદ્રોની ઊંડાણપૂર્વક સફાઈ કરતું ઇન્સ્ટન્ટ ફ્રેશ ક્લીન અપ.",
    benefits: [
      "Clears stubborn blackheads & whiteheads",
      "Restores fresh natural glow in under 45 minutes",
      "Controls excess oiliness and prevents breakouts"
    ],
    includes: [
      "Cleansing & deep enzyme scrub",
      "Gentle steam & blackhead extraction",
      "Soothing tone balancing pack"
    ],
    featured: false,
    active: true,
    popularTag: "Start from ₹350",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/6.webp"
  },
  {
    id: "d-tan-treatment",
    name: "D-Ten (D-Tan)",
    gujaratiName: "ડી-ટેન",
    category: "Facials & Skin Glow",
    price: 200,
    startingPrice: true,
    duration: 30,
    description: "Instant botanical de-tan pack that fades stubborn sun tanning, environmental pollution dullness, and pigmentation patches on face or neck.",
    gujaratiDescription: "સૂર્યના તાપથી કાળી પડેલી ત્વચાનો કલર લાઈટ કરતું ઇન્સ્ટન્ટ ડી-ટેન પેક.",
    benefits: [
      "Reverses sun damage and outdoor tanning",
      "Brightens complexion without harsh bleaching agents",
      "Leaves skin visibly clearer and even-toned"
    ],
    includes: [
      "Pre-tan cleansing wash",
      "Natural kojic & fruit acid de-tan paste",
      "Post-soothing cooling aloe hydration"
    ],
    featured: false,
    active: true,
    popularTag: "Start from ₹200",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bleach-service",
    name: "Bleach",
    gujaratiName: "બ્લીચ",
    category: "Facials & Skin Glow",
    price: 200,
    startingPrice: true,
    duration: 25,
    description: "Gentle skin-safe facial bleaching formulated to camouflage fine facial hair and lighten dark spots for a radiant, uniform appearance.",
    gujaratiDescription: "ચહેરાના વાળને ગોલ્ડન કરી ત્વચાને ચમકદાર બનાવતું જેન્ટલ બ્લીચ.",
    benefits: [
      "Lightens facial fuzz seamlessly with natural skin tone",
      "Removes surface tanning and imparts instant fairness",
      "Safe herbal activator suitable for delicate skin"
    ],
    includes: [
      "Pre-bleach skin patch test & protective cream",
      "Precision gold/diamond bleach application",
      "Soothing post-bleach cold compression"
    ],
    featured: false,
    active: true,
    popularTag: "Start from ₹200",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // 3. WAXING CARE (વેક્સિંગ કેર)
  // ==========================================
  {
    id: "hand-wax",
    name: "Hand Wax",
    gujaratiName: "હેન્ડ વેક્સ",
    category: "Waxing Care",
    price: 150,
    duration: 25,
    description: "Smooth, clean hair removal for full hands using gentle skin-friendly wax, leaving your arms silky and bump-free.",
    gujaratiDescription: "હાથના અણગમતા વાળ દૂર કરતું સ્મૂથ અને જેન્ટલ વેક્સિંગ.",
    benefits: [
      "Silky smooth arms lasting 3 to 4 weeks",
      "Removes surface dead skin cells",
      "Includes post-wax soothing lotion"
    ],
    includes: [
      "Sanitizing pre-wax powder",
      "Full arms waxing application with disposable strips",
      "Cooling soothing moisturizer"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹150",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "half-leg-wax",
    name: "Half Leg Wax",
    gujaratiName: "હાફ લેગ વેક્સ",
    category: "Waxing Care",
    price: 150,
    duration: 30,
    description: "Quick, hygienic half-leg hair removal from knees to ankles for effortlessly smooth and tidy legs.",
    gujaratiDescription: "ઢીંચણથી પગ સુધીના વાળ દૂર કરતું હાફ લેગ વેક્સિંગ.",
    benefits: [
      "Clean, smooth legs free from prickliness",
      "Single-use hygienic wooden spatulas",
      "Fast and virtually painless technique"
    ],
    includes: [
      "Skin preparation & sanitization",
      "Half legs wax application",
      "Post-depilatory calming gel"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹150",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "under-arms-wax",
    name: "Under Arms",
    gujaratiName: "અંડર આર્મ્સ",
    category: "Waxing Care",
    price: 50,
    duration: 15,
    description: "Gentle and precise underarm hair removal ensuring smooth, clean, and irritation-free skin.",
    gujaratiDescription: "સ્વચ્છ અને સ્મૂથ અંડર આર્મ્સ વેક્સિંગ માત્ર ₹50 માં.",
    benefits: [
      "Ultra-hygienic and quick",
      "Reduces underarm darkening and ingrown hairs",
      "Smooth results for 3-4 weeks"
    ],
    includes: [
      "Antiseptic pre-cleanse",
      "Warm peel-off wax removal",
      "Cooling aloe vera finish"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹50",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rica-wax",
    name: "Rica Wax",
    gujaratiName: "રિકા વેક્સ",
    category: "Waxing Care",
    price: 200,
    startingPrice: true,
    duration: 35,
    description: "Premium Italian Rica liposoluble wax made with natural resin and vegetable oils for 100% colophony-free, gentle waxing on sensitive skin.",
    gujaratiDescription: "સેન્સિટિવ સ્કિન માટે ઇટાલિયન પ્રીમિયમ રિકા વેક્સ.",
    benefits: [
      "Virtually painless and gentle on sensitive areas",
      "No skin peeling, redness, or allergic reaction",
      "Grabs the shortest, finest hairs from roots"
    ],
    includes: [
      "Rica pre-wax purifying gel",
      "Warm Rica wax strip application",
      "Rica nourishing post-wax oil"
    ],
    featured: true,
    active: true,
    popularTag: "Start from ₹200",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "full-body-wax",
    name: "Full Body Wax",
    gujaratiName: "ફૂલ બોડી વેક્સ",
    category: "Waxing Care",
    price: 700,
    duration: 75,
    description: "Complete full-body hair removal covering full arms, full legs, underarms, and back in absolute privacy and comfort of your home.",
    gujaratiDescription: "આખા શરીરના અણગમતા વાળ દૂર કરતું સંપૂર્ણ ફૂલ બોડી વેક્સિંગ.",
    benefits: [
      "Complete head-to-toe silky smoothness",
      "Hospital-grade sanitized disposable supplies",
      "Ideal before weddings, festivals, and holidays"
    ],
    includes: [
      "Full arms + Underarms waxing",
      "Full legs waxing",
      "Front & back touchups",
      "Calming tea tree lotion"
    ],
    featured: true,
    active: true,
    popularTag: "Full Body Care",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // 4. HANDS & FEET (મેનિક્યોર અને પેડિક્યોર)
  // ==========================================
  {
    id: "manicure",
    name: "Manicure",
    gujaratiName: "મેનીક્યોર",
    category: "Hands & Feet",
    price: 400,
    duration: 45,
    description: "Pampering hand spa ritual including warm rose petal soak, cuticle cleaning, dead skin scrub, nail shaping, and relaxing hand massage.",
    gujaratiDescription: "હાથ અને નખની સંપૂર્ણ સુંદરતા માટે લક્ઝરી મેનીક્યોર.",
    benefits: [
      "Softens rough hands and dry cuticle beds",
      "Shapes and polishes nails cleanly",
      "Improves joint circulation with soothing massage"
    ],
    includes: [
      "Warm aromatherapy petal soak",
      "Cuticle push, trim, & nail buffing",
      "Sugar almond hand exfoliation",
      "Moisturizing cream hand massage"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹400",
    imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pedicure",
    name: "Pedicure",
    gujaratiName: "પેડિક્યોર",
    category: "Hands & Feet",
    price: 400,
    duration: 45,
    description: "Revitalizing foot spa therapy that cleanses cracked heels, buffs away tough calluses, trims toenails, and eases tired feet with a soothing massage.",
    gujaratiDescription: "થાકેલા પગ અને ફાટેલી એડીને સોફ્ટ બનાવતું રિલેક્સિંગ પેડિક્યોર.",
    benefits: [
      "Removes rough heel calluses and dead skin",
      "Relieves swollen, tired feet and calf muscles",
      "Neat, hygienic toenail grooming"
    ],
    includes: [
      "Warm therapeutic foot bath",
      "Heel scrubbing with pumice stone & callus file",
      "Invigorating foot scrub & nail grooming",
      "Pressure point foot & calf massage"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹400",
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // 5. HAIR RITUALS (હેર કેર અને સ્ટાઇલિંગ)
  // ==========================================
  {
    id: "normal-hair-spa",
    name: "Normal Hair Spa",
    gujaratiName: "નોર્મલ હેર સ્પા",
    category: "Hair Rituals",
    price: 350,
    duration: 45,
    description: "Deep conditioning restorative hair spa featuring intensive moisturizing cream, relaxing pressure point head massage, and steaming to banish dryness.",
    gujaratiDescription: "વાળને મુલાયમ, સિલ્કી અને મજબૂત બનાવતું ડીપ કન્ડિશનિંગ હેર સ્પા.",
    benefits: [
      "Restores moisture balance to dry, frizzy hair",
      "Relieves head tension and mental fatigue",
      "Stimulates roots for healthier hair growth"
    ],
    includes: [
      "Professional nourishing hair cream application",
      "Relaxing Indian head & scalp acupressure massage",
      "Hair steaming and towel wrap"
    ],
    featured: true,
    active: true,
    popularTag: "Great Value ₹350",
    imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hair-cut",
    name: "Hair Cut",
    gujaratiName: "હેર કટ",
    category: "Hair Rituals",
    price: 100,
    duration: 30,
    description: "Professional ladies' haircut, split-end trimming, layer cut, or U/V shape cut styled right at your home.",
    gujaratiDescription: "તમારા ફેસ લુકને અનુરૂપ પરફેક્ટ હેર કટિંગ અને ટ્રીમિંગ.",
    benefits: [
      "Eliminates dead split ends",
      "Adds bouncy volume and tidy shape",
      "Sterilized professional scissors & styling"
    ],
    includes: [
      "Consultation on shape and length",
      "Precision cut & section trimming",
      "Blow-dry styling check"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹100",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
  },
  /*{
    id: "hair-highlights",
    name: "Highlights",
    gujaratiName: "હાઈ લાઈટ",
    category: "Hair Rituals",
    price: 500,
    startingPrice: true,
    duration: 60,
    description: "Trendy streak hair highlights that add dimensional depth and salon flair to your locks.",
    gujaratiDescription: "વાળને નવો સ્ટાઇલિશ લુક આપતી મોર્ડન હેર હાઈલાઈટ્સ.",
    benefits: [
      "Adds gorgeous dimension and youthful shine",
      "Ammonia-safe premium hair pigments",
      "Tailored sectioning for subtle or bold looks"
    ],
    includes: [
      "Foil sectioning & strand lightening",
      "Toning & gloss wash",
      "Post-color protective hair mask"
    ],
    featured: false,
    active: true,
    popularTag: "Start from ₹500",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
  },*/
  {
    id: "hair-colour",
    name: "Hair Colour",
    gujaratiName: "હેર કલર",
    category: "Hair Rituals",
    price: 400,
    startingPrice: true,
    duration: 60,
    description: "Complete grey coverage or vibrant global hair coloring applied with precision and no-mess cleanliness in your home.",
    gujaratiDescription: "ગ્રે હેર કવરેજ અને ગ્લોબલ હેર કલરિંગ સર્વિસ.",
    benefits: [
      "100% grey hair coverage",
      "Long-lasting rich salon shine",
      "No staining or home mess"
    ],
    includes: [
      "Root touchup or global application",
      "Protective hairline barrier cream",
      "Color lock shampoo & conditioner"
    ],
    featured: false,
    active: true,
    popularTag: "Start from ₹400",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },
  /*{
    id: "permanent-straightening",
    name: "Permanent Hair Straightening & Smoothing",
    gujaratiName: "પરમેનન્ટ હેર સ્ટ્રેટનિંગ અને સ્મૂથનિંગ",
    category: "Hair Rituals",
    price: 1500,
    startingPrice: true,
    duration: 180,
    description: "Transform unruly, frizzy waves into mirror-shine, silky poker-straight hair that lasts for months with premium salon-grade rebonding/keratin smoothing.",
    gujaratiDescription: "વાળને કાયમી સિલ્કી, સોફ્ટ અને સીધા કરતું પરમેનન્ટ સ્ટ્રેટનિંગ.",
    benefits: [
      "Zero morning frizz or styling hassle",
      "Silky smooth texture that lasts 6-10 months",
      "Deep protein bonding to strengthen damaged hair"
    ],
    includes: [
      "Pre-treatment clarifying hair wash",
      "Section-by-section smoothing cream & neutralizer",
      "Thermal iron sealing & keratin protein infusion",
      "Post-care routine instructions"
    ],
    featured: true,
    active: true,
    popularTag: "Start from ₹1,500",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },*/

  // ==========================================
  // 6. THREADING (આઇબ્રો અને અપર લિપ્સ)
  // ==========================================
  {
    id: "eye-brow",
    name: "Eye Brow",
    gujaratiName: "આઇબ્રો",
    category: "Threading",
    price: 50,
    duration: 15,
    description: "Precise eyebrow shaping and threading using sterilized organic cotton thread to define your facial frame cleanly.",
    gujaratiDescription: "પરફેક્ટ શેપ સાથે આઇબ્રો થ્રેડિંગ માત્ર ₹50 માં.",
    benefits: [
      "Sharp, clean eyebrow arch definition",
      "Hygienic cotton thread with no skin pulling",
      "Gentle cooling astringent application"
    ],
    includes: [
      "Brow shape consultation",
      "Precision thread shaping",
      "Soothing rose water touch"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹50",
    imageUrl: "https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "upper-lips",
    name: "Upper Lips",
    gujaratiName: "અપર લિપ્સ",
    category: "Threading",
    price: 20,
    duration: 10,
    description: "Quick and neat upper lip hair removal using organic cotton thread for smooth, hair-free lips.",
    gujaratiDescription: "અપર લિપ્સના વાળ દૂર કરવાનું ઝડપી અને ચોખ્ખું થ્રેડિંગ માત્ર ₹20 માં.",
    benefits: [
      "Quick 5-10 minute gentle session",
      "Smooth foundation and lipstick application",
      "Affordable daily upkeep"
    ],
    includes: [
      "Cleanse and powder prep",
      "Precision cotton thread hair removal",
      "Calming aloe finish"
    ],
    featured: false,
    active: true,
    popularTag: "Only ₹20",
    imageUrl: "https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80"
  }
];
