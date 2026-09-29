export interface BusinessSettings {
  brandName: string;
  gujaratiBrandName: string;
  tagline: string;
  gujaratiTagline: string;
  ownerName: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  city: string;
  serviceType: string;
  gujaratiServiceType: string;
  timing: string;
  coverageAreas: string[];
  womenClub: {
    title: string;
    url: string;
    organization: string;
    description: string;
  };
  trustBadges: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const settings: BusinessSettings = {
  brandName: "Hiyupiyu Hair & Beauty",
  gujaratiBrandName: "હિયુપીયુ હેર એન્ડ બ્યુટી",
  tagline: "Your Beauty, Our Responsibility",
  gujaratiTagline: "તમારી સુંદરતા... અમારી જવાબદારી",
  ownerName: "Himanshi Patel",
  phone: "+91 94266 86048",
  phoneRaw: "9426686048",
  whatsappNumber: "919426686048",
  city: "Surat",
  serviceType: "Ladies-Only Home Service",
  gujaratiServiceType: "મહિલાઓ માટે ખાસ હોમ સર્વિસ",
  timing: "9:30 AM – 7:30 PM (All 7 Days)",
  coverageAreas: [
    "Vesu",
    "Adajan",
    "Pal",
    "Althan",
    "Citylight",
    "Piplod",
    "Ghod Dod Road",
    "VIP Road",
    "Bhimrad",
    "Varachha",
    "Katargam",
    "Rander",
    "Jahangirpura",
    "Dumas Road",
    "Athwa Lines",
    "Palanpur Canal Road"
  ],
  womenClub: {
    title: "Certified & Working Member",
    organization: "Women Club",
    url: "https://womenclub.co.in/",
    description: "Himanshi Patel is a verified Certified Member and active Working Member of Women Club (womenclub.co.in), recognized for excellence in ladies' professional home wellness and beauty."
  },
  trustBadges: [
    {
      title: "Ladies Only & 100% Safe",
      description: "Trained female expert Himanshi Patel delivering respectful, discreet home care.",
      icon: "ShieldCheck"
    },
    {
      title: "Sanitized Disposable Kits",
      description: "Fresh single-use gowns, bed covers, spatulas, and UV sterilized tools.",
      icon: "Sparkles"
    },
    {
      title: "Doorstep Convenience",
      description: "No traffic, no salon waiting lines. Relax in the comfort of your own living room.",
      icon: "Home"
    },
    {
      title: "Premium Branded Products",
      description: "Only high-grade formulas from O3+, Lotus Herbal, L'Oréal Paris & Vedic herbs.",
      icon: "Award"
    }
  ]
};
