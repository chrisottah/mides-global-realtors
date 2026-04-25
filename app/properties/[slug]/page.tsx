import { getPropertyBySlug, getAllProperties, getFormattedPrice, getFormattedSize } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import Popup from '@/components/ui/Popup';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Bed, Bath, Ruler, ArrowLeft, Check, Home, Building2, Landmark } from 'lucide-react';
import PropertyActions from './PropertyActions';

// Generate static paths for all properties
export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((property) => ({
    slug: property.slug.current,
  }));
}

// Helper function to get icon based on property type
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

// Helper function to get category display
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

  const mainImage = property.images?.[0];
  const mainImageUrl = mainImage ? urlFor(mainImage) : '/images/placeholder.jpg';
  const galleryImages = property.images?.slice(1) || [];
  const displayPrice = getFormattedPrice(property);
  const displaySize = getFormattedSize(property);
  const isPriceOnRequest = property.priceType === 'on_request';
  const isPriceRange = property.priceType === 'range';

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://midesglobalrealtors.com';
  const propertyUrl = `${baseUrl}/properties/${property.slug.current}`;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Back Button */}
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>

          {/* Title Section */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
          </div>

          {/* Main Image */}
          <div className="relative h-[40vh] md:h-[50vh] rounded-xl overflow-hidden mb-4">
            <Image
              src={mainImageUrl}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: property.status === 'available' ? '#10b981' : '#ef4444',
                color: 'white'
              }}
            >
              {property.status === 'available' ? 'Available' : property.status === 'sold' ? 'Sold' : 'Pending'}
            </div>
          </div>

          {/* Gallery Images */}
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {galleryImages.map((image: any, index: number) => (
                <div key={index} className="relative h-24 md:h-28 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(image)}
                    alt={`${property.title} - Image ${index + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Price Section */}
              <div className="bg-accent/10 rounded-xl p-5 mb-8">
                <p className="text-gray-600 text-xs mb-1">Price</p>
                {isPriceOnRequest ? (
                  <span className="inline-block bg-accent text-white text-sm px-3 py-1 rounded-full">
                    {displayPrice}
                  </span>
                ) : isPriceRange ? (
                  <div>
                    <p className="text-2xl font-bold text-accent">{displayPrice}</p>
                    <p className="text-xs text-gray-500 mt-1">Price Range (negotiable)</p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-accent">{displayPrice}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-3">Key Features</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-5 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-500">Type</span>
                    <span className="font-semibold capitalize flex items-center gap-1">
                      {getTypeIcon(property.type)}
                      {property.type === 'building' ? 'Building/House' : 'Land/Plot'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-right">
                      {getCategoryDisplay(property.category)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </span>
                  </div>
                  
                  {property.type === 'building' && property.bedrooms && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-500">Bedrooms</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {property.bedrooms}
                      </span>
                    </div>
                  )}
                  
                  {property.type === 'building' && property.bathrooms && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-500">Bathrooms</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Bath className="w-3 h-3" />
                        {property.bathrooms}
                      </span>
                    </div>
                  )}
                  
                  {displaySize && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-gray-500">
                        {property.type === 'land' ? 'Land Size' : 'Size'}
                      </span>
                      <span className="font-semibold flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {displaySize}
                      </span>
                    </div>
                  )}
                </div>

                {/* Use Client Component for interactive buttons */}
                <PropertyActions 
                  property={property}
                  displayPrice={displayPrice}
                  displaySize={displaySize}
                  propertyUrl={propertyUrl}
                />

                <p className="text-xs text-gray-400 text-center mt-4">
                  Contact Gloria directly for more details or to schedule a viewing
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