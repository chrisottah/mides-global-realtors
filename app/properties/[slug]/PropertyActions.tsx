"use client";

import { Phone, Mail } from "lucide-react";

export default function PropertyActions({ 
  property, 
  displayPrice, 
  displaySize, 
  propertyUrl 
}: { 
  property: any;
  displayPrice: string;
  displaySize: string | null;
  propertyUrl: string;
}) {
  const whatsappMessage = `Hello Gloria! I'm interested in "${property.title}" located at ${property.location}.

📍 Property Link: ${propertyUrl}

Please send me more information about:
- Price: ${displayPrice}
- Size: ${displaySize || 'Not specified'}
- Availability: ${property.status}

Thank you!`;

  return (
    <div className="space-y-3">
      <button 
        onClick={() => window.open(`https://wa.me/2349033581493?text=${encodeURIComponent(whatsappMessage)}`, "_blank")}
        className="w-full bg-[#25D366] text-white py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4" />
        Inquire on WhatsApp
      </button>
      <button 
        onClick={() => window.location.href = `/contact`}
        className="w-full bg-accent text-white py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-85 transition flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Request a Viewing
      </button>
    </div>
  );
}