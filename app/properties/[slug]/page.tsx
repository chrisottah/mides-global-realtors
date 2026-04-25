import { getPropertyBySlug, getAllProperties, getFormattedPrice, getFormattedSize } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import Popup from '@/components/ui/Popup';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Bed, Bath, Ruler, ArrowLeft, Check, Home, Building2, Landmark, Phone, Mail } from 'lucide-react';
import PropertyInteractivity from './PropertyInteractivity';

// Generate static paths for all properties
export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((property) => ({
    slug: property.slug.current,
  }));
}

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

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const displayPrice = getFormattedPrice(property);
  const displaySize = getFormattedSize(property);
  const isPriceOnRequest = property.priceType === 'on_request';
  const isPriceRange = property.priceType === 'range';

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://midesglobalrealtors.com';
  const propertyUrl = `${baseUrl}/properties/${property.slug.current}`;

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
              {/* Interactive Image Slider - Pass only serializable data */}
              <PropertyInteractivity 
                images={property.images || []}
                title={property.title}
                location={property.location}
                status={property.status}
                priceType={property.priceType}
                displayPrice={displayPrice}
                displaySize={displaySize}
                propertyUrl={propertyUrl}
              />

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

            {/* Right Column - Property Details Card */}
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

                {/* CTA Buttons - Direct inline buttons (avoid passing property object) */}
                <div className="mt-5 space-y-3">
                  <button 
                    onClick={() => window.open(`https://wa.me/2349033581493?text=${encodeURIComponent(`Hello Gloria! I'm interested in "${property.title}" located at ${property.location}. Please send me more information.`)}`, "_blank")}
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
      <Footer />
      <Chatbot />
      <Popup />
    </>
  );
}