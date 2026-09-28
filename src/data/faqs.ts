export interface FAQ {
  id: string;
  question: string;
  gujaratiQuestion?: string;
  answer: string;
  category: 'General' | 'Booking' | 'Hygiene' | 'Pricing';
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Is Hiyupiyu Hair & Beauty strictly for ladies?",
    gujaratiQuestion: "શું આ સર્વિસ ફક્ત મહિલાઓ માટે જ છે?",
    answer: "Yes, absolutely 100%. Our services are exclusively for ladies and delivered directly by Himanshi Patel. We ensure a safe, respectful, and private environment in the comfort of your home.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Which areas in Surat do you provide home visits?",
    gujaratiQuestion: "સુરતના કયા કયા વિસ્તારોમાં હોમ સર્વિસ ઉપલબ્ધ છે?",
    answer: "We cover almost all residential areas of Surat, including Vesu, Adajan, Pal, Althan, Citylight, Piplod, Ghod Dod Road, VIP Road, Katargam, Varachha, Rander, Jahangirpura, Dumas Road, and Athwa Lines.",
    category: "General"
  },
  {
    id: "faq-3",
    question: "How does the WhatsApp booking process work?",
    gujaratiQuestion: "વ્હોટ્સએપ દ્વારા બુકિંગ કેવી રીતે થાય છે?",
    answer: "Select your desired service, date, preferred time slot, and home address on our website booking form. When you click 'Send Booking on WhatsApp', a formatted message opens directly on WhatsApp. Himanshi will personally verify schedule availability and confirm your slot promptly.",
    category: "Booking"
  },
  {
    id: "faq-4",
    question: "Why does the website say 'Preferred Time' instead of 'Instant Confirmed Slot'?",
    gujaratiQuestion: "વેબસાઇટ પર 'પ્રિફર્ડ ટાઇમ' કેમ લખેલું છે?",
    answer: "Because we respect your schedule! Since our service involves traveling between homes in Surat, Himanshi confirms the exact travel window and slot with you directly on WhatsApp so there are never double bookings or delays.",
    category: "Booking"
  },
  {
    id: "faq-5",
    question: "What hygiene protocols and supplies do you bring?",
    gujaratiQuestion: "હાઇજીન અને સ્વચ્છતા માટે શું કાળજી રાખવામાં આવે છે?",
    answer: "Cleanliness is our core responsibility. We bring single-use disposable bed sheets, fresh sanitized towels, disposable wax strips and spatulas, sterilized stainless steel implements, and genuine sealed branded products. We leave your room spotless after every session.",
    category: "Hygiene"
  },
  {
    id: "faq-6",
    question: "How do I apply a promo code?",
    gujaratiQuestion: "પ્રોમો કોડ કેવી રીતે વાપરવો?",
    answer: "In the booking form or offer page, enter active codes like WELCOME10, SAVE150, or GLOW20. The calculator instantly estimates your discount. The final billing is verified and honored when confirming your appointment on WhatsApp.",
    category: "Pricing"
  },
  {
    id: "faq-7",
    question: "When and how do I pay for my services?",
    gujaratiQuestion: "પેમેન્ટ ક્યારે અને કઈ રીતે કરવાનું રહેશે?",
    answer: "There are no advance payment requirements on the website! You only pay after your service is completed satisfactorily at home. We accept Google Pay, PhonePe, Paytm, UPI, and Cash.",
    category: "Pricing"
  },
  {
    id: "faq-8",
    question: "Can I reschedule or customize a package?",
    gujaratiQuestion: "શું સર્વિસ રિશિડ્યુલ અથવા પેકેજ કસ્ટમાઇઝ કરી શકાય?",
    answer: "Yes! Simply drop a message on WhatsApp (+91 94266 86048) at least 4 hours in advance, and we will happily adjust your timing or mix-and-match your favorite facial and hair treatments.",
    category: "Booking"
  }
];
