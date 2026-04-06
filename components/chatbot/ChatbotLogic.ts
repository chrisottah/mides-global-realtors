import { chatbotKnowledge, fallbackResponse, greetingMessage, ChatbotKnowledge } from "@/lib/chatbotData";

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  needsWhatsApp?: boolean;
}

export function getChatbotResponse(userInput: string): { response: string; needsWhatsApp: boolean } {
  const normalizedInput = userInput.toLowerCase().trim();
  
  console.log("User input:", normalizedInput); // Debug log
  
  // Check for empty input
  if (!normalizedInput) {
    return { response: "Please ask me something about our properties, services, or locations! 🏠", needsWhatsApp: false };
  }
  
  // Check for greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy"];
  if (greetings.some(greeting => normalizedInput.includes(greeting))) {
    return { response: greetingMessage, needsWhatsApp: false };
  }
  
  // Check for thank you messages
  const thanks = ["thank", "thanks", "appreciate", "good job"];
  if (thanks.some(thank => normalizedInput.includes(thank))) {
    return { response: "You're welcome! Is there anything else I can help you with? 😊", needsWhatsApp: false };
  }
  
  // Direct keyword matching (simpler and more reliable than Fuse.js)
  let bestMatch = null;
  let highestScore = 0;
  
  for (const item of chatbotKnowledge) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        // Longer keywords get higher scores
        score += keyword.length;
      }
    }
    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = item;
    }
  }
  
  // If we found a match with decent score
  if (bestMatch && highestScore > 2) {
    return { 
      response: bestMatch.response, 
      needsWhatsApp: bestMatch.redirectWhatsApp || false 
    };
  }
  
  // Check for property-related questions
  const propertyKeywords = ["property", "house", "home", "land", "apartment", "flat", "duplex", "villa"];
  const locationKeywords = ["lekki", "ajah", "ikoyi", "vi", "ibeju", "epe", "lagos"];
  const priceKeywords = ["price", "cost", "how much", "budget", "naira"];
  
  const hasPropertyKeyword = propertyKeywords.some(k => normalizedInput.includes(k));
  const hasLocationKeyword = locationKeywords.some(k => normalizedInput.includes(k));
  const hasPriceKeyword = priceKeywords.some(k => normalizedInput.includes(k));
  
  if (hasPropertyKeyword || hasLocationKeyword || hasPriceKeyword) {
    if (hasLocationKeyword) {
      return {
        response: `Yes! We have properties available in ${locationKeywords.find(l => normalizedInput.includes(l)) || "Lagos"}. For specific listings, pricing, and to schedule viewings, please click the WhatsApp button below to chat with Gloria directly! She'll send you current available properties in that area. 🏠`,
        needsWhatsApp: true
      };
    }
    if (hasPriceKeyword) {
      return {
        response: "Our properties range from ₦50M for lands to ₦500M+ for luxury homes. For accurate pricing on specific properties, please click the WhatsApp button below and Gloria will send you detailed information! 💰",
        needsWhatsApp: true
      };
    }
    return {
      response: "I'd love to help you find properties! For the most current listings and personalized recommendations, please click the WhatsApp button below to chat with Gloria directly. She'll send you properties matching your criteria! 🏠",
      needsWhatsApp: true
    };
  }
  
  // Fallback response
  return {
    response: fallbackResponse,
    needsWhatsApp: true
  };
}

export function getInitialMessages(): ChatMessage[] {
  return [
    {
      id: "1",
      text: greetingMessage,
      isUser: false,
      timestamp: new Date(),
      needsWhatsApp: false,
    },
  ];
}