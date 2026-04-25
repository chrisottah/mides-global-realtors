"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Phone, Mail } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";

export default function PropertyDetailClient({
  rawImages,
  title,
  location,
  status,
  priceType,
  displayPrice,
  displaySize,
  propertyUrl,
}: {
  rawImages: any[];
  title: string;
  location: string;
  status: string;
  priceType: string;
  displayPrice: string;
  displaySize: string | null;
  propertyUrl: string;
}) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Convert Sanity image objects to URLs on the client side
  useEffect(() => {
    if (rawImages && rawImages.length > 0) {
      const urls = rawImages.map((img) => urlFor(img));
      setImageUrls(urls);
    }
  }, [rawImages]);

  const allImages = imageUrls;
  const currentImageUrl = allImages[currentImageIndex] || "/images/placeholder.jpg";

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

  const openLightbox = () => {
    setLightboxIndex(currentImageIndex);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    if (allImages.length > 1) {
      setLightboxIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevLightboxImage = () => {
    if (allImages.length > 1) {
      setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const whatsappMessage = `Hello Gloria! I'm interested in "${title}" located at ${location}.

📍 Property Link: ${propertyUrl}

Please send me more information about:
- Price: ${displayPrice}
- Size: ${displaySize || "Not specified"}
- Availability: ${status}

Thank you!`;

  const isPriceOnRequest = priceType === "on_request";
  const isPriceRange = priceType === "range";

  if (allImages.length === 0) {
    return (
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <div className="flex items-center justify-center h-full text-gray-400">No images available</div>
      </div>
    );
  }

  return (
    <>
      {/* Main Image Slider */}
      <div
        className="relative bg-gray-100 rounded-2xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: "4/3" }}
        onClick={openLightbox}
      >
        <Image src={currentImageUrl} alt={title} fill className="object-cover" priority />
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition w-10 h-10 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
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

      {/* Action Buttons (WhatsApp, Request Viewing) */}
      <div className="mt-5 space-y-3">
        <button
          onClick={() =>
            window.open(`https://wa.me/2349033581493?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
          }
          className="w-full bg-[#25D366] text-white py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Inquire on WhatsApp
        </button>
        <button
          onClick={() => (window.location.href = "/contact")}
          className="w-full bg-accent text-white py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-85 transition flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Request a Viewing
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="relative w-[90vw] h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={allImages[lightboxIndex]} alt={title} fill className="object-contain" />
          </div>

          {allImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}