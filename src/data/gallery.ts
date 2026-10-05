export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tag: string;
  theme: 'facial' | 'chakra' | 'hair' | 'wax' | 'nails' | 'body' | 'setup';
  imageUrl: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "7 Chakra Facial Setup & Glow",
    category: "Facial Care",
    description: "Gemstone rollers, soothing aroma oils, and aura balancing crystals prepared at customer's home in Vesu.",
    tag: "Signature Ritual",
    theme: "chakra",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/0.jpg"
  },
  {
    id: "gal-2",
    title: "Silky Hair Smoothing Transformation",
    category: "Hair Transformation",
    description: "Mirror-gloss permanent hair straightening and keratin infusion for natural shine.",
    tag: "Hair Smoothing",
    theme: "hair",
    imageUrl: "https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/14.jpg"
  },
  {
    id: "gal-3",
    title: "Rose Petal Foot Spa Basin",
    category: "Manicure & Pedicure",
    description: "Hygienic foot soak basin with fresh rose petals and dead sea salts for cracked heel revival.",
    tag: "Pedicure Spa",
    theme: "nails",
    imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-4",
    title: "Radiant Indian Bridal Facial",
    category: "Bridal Makeover",
    description: "O3+ professional oxygen whitening and gold mask application for festive event ready skin.",
    tag: "Bridal Facial",
    theme: "facial",
    imageUrl: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-5",
    title: "Sterile Home Salon Kit Setup",
    category: "Hygiene Standard",
    description: "Single-use disposable bed sheets, sterilized metal implements, and sealed branded skincare products.",
    tag: "Hospital Hygiene",
    theme: "setup",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-6",
    title: "Ayurvedic Warm Oil Massage",
    category: "Body Wellness",
    description: "Calming herbal oils and hot steamed towel compression for relieving stress and muscle tension.",
    tag: "Body Therapy",
    theme: "body",
    imageUrl: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"
  }
];

