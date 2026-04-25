"use client";

import { getPropertyBySlug, getFormattedPrice, getFormattedSize } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import Popup from '@/components/ui/Popup';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MapPin, Bed, Bath, Ruler, ArrowLeft, Check, Phone, Mail, Home, Building2, Landmark, ChevronLeft, ChevronRight, X } from 'lucide-react';

function getTypeIcon(type: string) {
  switch (type) {
    case 'building':
      return <Building2 className="w-4 h-4" />;
    case 'land':
      return <Landmark className="w-4 h-4" />;
    default:
      return <Home className="w-4 h-4" />;
  }
}

function getCategoryDisplay(categories: string[]) {
  if (!categories || categories.length === 0) return 'Not specified';
  return categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ');
}

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await getPropertyBySlug(slug);
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [slug]);

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </main>
        <Footer />
      </>
    );
  }

  if (!property) {
    notFound();
  }

  const allImages = property.images || [];
  const currentImageUrl = allImages[currentImageIndex] ? urlFor(allImages[currentImageIndex]) : '/images/placeholder.jpg';
  const displayPrice = getFormattedPrice(property);
  const displaySize = getFormattedSize(property);
  const isPriceOnRequest = property.priceType === 'on_request';
  const isPriceRange = property.priceType === 'range';

  const propertyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/properties/${property.slug.current}`;
  const whatsappMessage = `Hello Gloria! I'm interested in "${property.title}" located at ${property.location}.

📍 Property Link: ${propertyUrl}

Please send me more information about:
- Price: ${displayPrice}
- Size: ${displaySize || 'Not specified'}
- Availability: ${property.status}

Thank you!`;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Back Button */}
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-8">{property.title}</h1>

          {/* Main Content Grid - 3 columns (image takes 2, card takes 1) */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image Gallery (2/3 width on desktop) */}
            <div className="lg:col-span-2">
              {/* Main Image with Slider */}
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={currentImageUrl}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
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

              {/* Description Section - Below Image */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Features Section */}
              {property.features && property.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-3">Key Features</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {property.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 rounded-lg px-3 py-2">
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Property Details Card (Compact, like before) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-5 sticky top-24">
                <h3 className="text-lg font-bold mb-4 pb-2 border-b">Property Details</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-semibold capitalize flex items-center gap-1">
                      {getTypeIcon(property.type)}
                      {property.type === 'building' ? 'Building' : 'Land'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-right text-sm">
                      {getCategoryDisplay(property.category)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold text-right text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </span>
                  </div>
                  
                  {property.type === 'building' && property.bedrooms && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bedrooms</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {property.bedrooms}
                      </span>
                    </div>
                  )}
                  
                  {property.type === 'building' && property.bathrooms && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bathrooms</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        {property.bathrooms}
                      </span>
                    </div>
                  )}
                  
                  {displaySize && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {displaySize}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price Section */}
                <div className="mt-4 pt-3 border-t">
                  <div className="bg-accent/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    {isPriceOnRequest ? (
                      <span className="inline-block bg-accent text-white text-sm px-3 py-1 rounded-full">
                        {displayPrice}
                      </span>
                    ) : isPriceRange ? (
                      <div>
                        <p className="text-lg font-bold text-accent">{displayPrice}</p>
                        <p className="text-xs text-gray-500">Price Range</p>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-accent">{displayPrice}</p>
                    )}
                  </div>
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

                <p className="text-xs text-gray-400 text-center mt-4">
                  Contact Gloria directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          <div className="relative w-[90vw] h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={urlFor(allImages[currentImageIndex])}
              alt={`${property.title} - Lightbox`}
              fill
              className="object-contain"
            />
          </div>
          
          {allImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}

      <Footer />
      <Chatbot />
      <Popup />
    </>
  );
}