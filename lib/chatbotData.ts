export interface ChatbotKnowledge {
  keywords: string[];
  response: string;
  redirectWhatsApp?: boolean;
}

export const chatbotKnowledge: ChatbotKnowledge[] = [
  // Company Info
  {
    keywords: ["who", "company", "mides", "about", "realtor", "what do you do", "tell me about", "introduce"],
    response: "Mides Global Realtors is a trusted real estate company in Lagos, founded by Gloria. We specialize in property sales, rentals, and management with a focus on integrity, transparency, and exceptional customer service."
  },
  {
    keywords: ["gloria", "ceo", "founder", "owner", "who is gloria"],
    response: "Gloria is the founder and lead realtor at Mides Global Realtors. With over 5 years of experience in Lagos real estate, she personally guarantees personalized service, expert knowledge, and seamless transactions for all clients."
  },
  
  // Services
  {
    keywords: ["services", "what do you offer", "help with", "solutions", "what services"],
    response: "We offer comprehensive real estate solutions: 🏠 Residential properties, 🏢 Commercial properties, 🏭 Industrial properties, plus Property Search, Sales, Rentals, Leasing & Property Management."
  },
  {
    keywords: ["buy", "purchase", "invest", "buying", "investment"],
    response: "Yes! We help clients purchase properties across Lagos including Lekki, VI, Ikoyi, Ajah, Ibeju Lekki, and more. Would you like to see our current listings or speak with Gloria for personalized assistance?"
  },
  {
    keywords: ["rent", "lease", "rental", "apartment", "renting"],
    response: "Absolutely! We offer rental properties including flats, apartments, and houses in prime locations. Our rental process is transparent and hassle-free. Want to discuss your rental needs with Gloria?"
  },
  {
    keywords: ["manage", "property management", "management"],
    response: "Yes, we provide full property management services including tenant screening, rent collection, maintenance coordination, and regular property inspections."
  },
  
  // Locations - Expanded
  {
    keywords: ["lekki", "lekki phase", "lekki phase 1"],
    response: "Yes! We have properties in Lekki Phase 1, Lekki Phase 2, and surrounding areas including luxury homes, apartments, and commercial spaces."
  },
  {
    keywords: ["ajah", "thomas estate", "sangotedo"],
    response: "Yes! Thomas Estate in Ajah is our primary office location. We have various properties available in Ajah, Sangotedo, and surrounding communities."
  },
  {
    keywords: ["ikoyi", "banana island", "parkview"],
    response: "Yes! We offer luxury properties in Ikoyi including Banana Island, Parkview Estate, and other high-end residential areas."
  },
  {
    keywords: ["victoria island", "vi", "v/i"],
    response: "Yes! Victoria Island is one of our key coverage areas with commercial and residential properties available."
  },
  {
    keywords: ["ibeju", "ibeju lekki", "epe", "ikorodu", "ogun", "abuja", "osun", "ibadan", "asaba"],
    response: "Yes! We operate across Nigeria. In Lagos we cover Ibeju Lekki, Epe, Ikorodu, plus Ogun State, Abuja, Osun, Ibadan, and Asaba. What location are you interested in?"
  },
  
  // Properties - Expanded
  {
    keywords: ["property", "listing", "available", "properties", "house", "land", "building", "show me", "list properties"],
    response: "We have various properties available including residential homes, luxury duplexes, commercial spaces, and prime lands. Check out our Properties page for current listings, or tell me your budget and preferred location!"
  },
  {
    keywords: ["price", "cost", "how much", "budget", "expensive", "cheap"],
    response: "Our property prices vary by location, size, and type. We have options from ₦50M for lands to ₦500M+ for luxury homes. Tell me your budget range and I'll help you find suitable options!"
  },
  {
    keywords: ["land", "plot", "acre", "land for sale"],
    response: "Yes! We have prime lands for sale in Ibeju Lekki, Epe, Ajah, and other developing areas. Land investments are great for future appreciation. Prices range from ₦50M to ₦200M depending on location and size."
  },
  {
    keywords: ["house", "home", "duplex", "bungalow", "mansion", "villa"],
    response: "We have beautiful homes available including duplexes, bungalows, and luxury villas in Lekki, Ikoyi, Ajah, and VI. Would you like to schedule a viewing with Gloria?"
  },
  {
    keywords: ["apartment", "flat", "self contain", "mini flat"],
    response: "Yes! We have apartments ranging from self-contained units to 4-bedroom flats. Locations include Ajah, Lekki, and surrounding areas. What size apartment are you looking for?"
  },
  
  // Contact - Expanded
  {
    keywords: ["contact", "reach", "call", "phone", "number", "email", "whatsapp"],
    response: "You can reach us at: 📞 0903 358 1493 or 0816 469 0627, 📧 info@midesglobalrealtors.com, 📍 Thomas Estate, Ajah, Lagos. Click the WhatsApp button to chat instantly with Gloria!"
  },
  
  // Philosophy
  {
    keywords: ["philosophy", "mission", "vision", "values", "integrity", "transparency"],
    response: "At Mides Global Realtors, we stand out as a beacon of integrity and compassion. We're builders of dreams, facilitators of futures, and guardians of the essence of home. Transparency and exceptional service are our cornerstones."
  },
  
  // Testimonials
  {
    keywords: ["trust", "reliable", "experience", "why choose", "reviews", "testimonials"],
    response: "With over 5 years of experience, we've built trust through transparency and successful transactions. Our clients choose us because we genuinely care about finding them the perfect property."
  },
  
  // Hours
  {
    keywords: ["hours", "open", "available", "when", "time", "weekend", "sunday", "monday"],
    response: "We're available Monday to Saturday, 9 AM to 6 PM. You can also reach Gloria on WhatsApp anytime for urgent inquiries!"
  },
  
  // Specific property inquiries
  {
    keywords: ["viewing", "tour", "inspect", "see property", "visit"],
    response: "To schedule a property viewing, please contact Gloria directly on WhatsApp. She'll arrange a convenient time for you to visit any property you're interested in.",
    redirectWhatsApp: true
  },
  {
    keywords: ["negotiate", "discount", "offer", "price negotiable"],
    response: "For price negotiations or special offers, it's best to speak directly with Gloria. Click the WhatsApp button below to discuss pricing and possible discounts!",
    redirectWhatsApp: true
  },
  {
    keywords: ["document", "legal", "title", "c of o", "deed", "paperwork"],
    response: "For specific document inquiries and legal verification, please contact Gloria directly. She'll provide all necessary documentation and guide you through the legal process.",
    redirectWhatsApp: true
  }
];

export const fallbackResponse = "I want to help you find your perfect property! For personalized assistance, please click the WhatsApp button below to chat directly with Gloria. She'll answer all your questions about properties, pricing, and viewings. 🏠💚";

export const greetingMessage = "👋 Hi! I'm Mides AI Assistant. I can help you learn about our properties in Lekki, Ikoyi, Ajah, VI, and across Lagos. Ask me about:\n\n• Available properties & prices\n• Locations we cover\n• Our services\n• Contact information\n\nWhat would you like to know today? 🏠";