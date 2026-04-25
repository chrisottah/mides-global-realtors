"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";

export default function PropertyInteractivity({ 
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = property.images || [];
  const currentImageUrl = allImages[currentImageIndex] ? urlFor(allImages[currentImageIndex]) : '/images/placeholder.jpg';

  const nextImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const whatsappMessage = `Hello Gloria! I'm interested in "${property.title}" located at ${property.location}.

📍 Property Link: ${propertyUrl}

Please send me more information about:
- Price: ${displayPrice}
- Size: ${displaySize || 'Not specified'}
- Availability: ${property.status}

Thank you!`;

  const isPriceOnRequest = property.priceType === 'on_request';
  const isPriceRange = property.priceType === 'range';

  return (
    <>
      {/* Image Slider Section */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <Image
          src={currentImageUrl}
          alt={`${property.title}`}
          fill
          className="object-cover"
          priority
        />
        
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition w-10 h-10 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition w-10 h-10 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="mt-5 space-y-3">
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
    </>
  );
}