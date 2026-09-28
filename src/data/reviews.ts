export interface Review {
  id: string;
  name: string;
  area: string;
  serviceTaken: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Pooja V. Shah",
    area: "Vesu, Surat",
    serviceTaken: "7 Chakra Facial & Stone Eye Mask",
    rating: 5,
    date: "September 2026",
    comment: "Himanshi ben is simply wonderful! The 7 Chakra facial was so relaxing I almost fell asleep. The jade stone eye mask took away all my screen fatigue. Everything she brought was completely sterile, with fresh disposable bedsheets and towels. Best home salon experience in Surat!",
    verified: true
  },
  {
    id: "rev-2",
    name: "Dr. Kinjal Patel",
    area: "Citylight, Surat",
    serviceTaken: "Full Body Rica Wax & L'Oréal Hair Spa",
    rating: 5,
    date: "September 2026",
    comment: "As a busy professional, I dread waiting in salons on weekends. Hiyupiyu Hair & Beauty came right on time at 10 AM. Very clean, zero mess, and painless Rica waxing. Hair spa massage was heavenly. Highly recommended for all ladies in Surat.",
    verified: true
  },
  {
    id: "rev-3",
    name: "Bhavisha Mehta",
    area: "Adajan, Surat",
    serviceTaken: "Bridal & Festive Radiance Combo",
    rating: 5,
    date: "August 2026",
    comment: "Booked Himanshi for my brother's wedding events. She did my facial, waxing, and hair styling patiently over 3.5 hours. My face was glowing throughout the reception! Love that she provides genuine ladies-only privacy at home.",
    verified: true
  },
  {
    id: "rev-4",
    name: "Nidhi Kaswala",
    area: "Pal / Palanpur Canal Road, Surat",
    serviceTaken: "Deluxe Rose Petal Pedicure & Facial",
    rating: 5,
    date: "August 2026",
    comment: "The rose petal pedicure basin and foot massage healed my dry heels completely. Very polite, clean, and reasonably priced. Booking via WhatsApp was smooth without any hassle.",
    verified: true
  },
  {
    id: "rev-5",
    name: "Roshni Zaveri",
    area: "Althan, Surat",
    serviceTaken: "Permanent Hair Straightening & Smoothing",
    rating: 5,
    date: "July 2026",
    comment: "My hair had become terribly frizzy. Himanshi did the complete smoothing treatment at my home with top-tier branded products. 2 months later, my hair is still silk-straight and shiny. Truly 'Your beauty, our responsibility'!",
    verified: true
  }
];
