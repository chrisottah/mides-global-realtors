"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Ruler } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import type { Property } from "@/lib/sanity";

// Helper function to get formatted price
function getDisplayPrice(property: Property): string {
  if (property.priceType === 'on_request') {
    return 'Contact for Price';
  }
  if (property.priceType === 'range') {
    const from = (property.priceFrom || 0).toLocaleString();
    const to = (property.priceTo || 0).toLocaleString();
    return `₦${from} - ₦${to}`;
  }
  if (property.priceDisplay) {
    return property.priceDisplay;
  }
  if (property.price) {
    return `₦${property.price.toLocaleString()}`;
  }
  return 'Contact for Price';
}

// Helper function to get formatted size display
function getDisplaySize(property: Property): string | null {
  if (property.sizeType === 'range' && property.sizeFrom && property.sizeTo) {
    return `${property.sizeFrom} - ${property.sizeTo} sqm`;
  }
  if (property.sizeType === 'single' && property.size) {
    return property.size;
  }
  return null;
}

export default function PropertyCard({ property }: { property: Property }) {
  if (!property || !property.slug?.current) {
    return null;
  }

  const mainImage = property.images?.[0];
  let imageUrl = '/images/placeholder.jpg';
  try {
    if (mainImage && mainImage.asset) {
      imageUrl = urlFor(mainImage);
    }
  } catch (error) {
    imageUrl = '/images/placeholder.jpg';
  }

  const displayPrice = getDisplayPrice(property);
  const displaySize = getDisplaySize(property);
  const isPriceOnRequest = property.priceType === 'on_request';
  const isPriceRange = property.priceType === 'range';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
    >
      <Link href={`/properties/${property.slug.current}`} className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={property.title || 'Property'}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.jpg';
            }}
          />
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: property.status === 'available' ? '#10b981' : '#ef4444',
              color: 'white'
            }}
          >
            {property.status === 'available' ? 'Available' : property.status === 'sold' ? 'Sold' : 'Pending'}
          </div>
          {property.type === 'land' && (
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
              Land for Sale
            </div>
          )}
          {property.featured && (
            <div className="absolute bottom-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs">
              Featured
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold mb-1 line-clamp-1">{property.title}</h3>
          
          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs line-clamp-1">{property.location}</span>
          </div>

          {/* Size Display */}
          {displaySize && (
            <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs">
              <Ruler className="w-3 h-3" />
              <span className="font-semibold text-gray-600">Size:</span>
              <span>{displaySize}</span>
            </div>
          )}

          {/* Spacer to push price to bottom */}
          <div className="flex-grow"></div>

          {/* Price Section - Now stacked vertically */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            {isPriceOnRequest ? (
              <div className="mb-3">
                <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full w-full text-center">
                  {displayPrice}
                </span>
              </div>
            ) : isPriceRange ? (
              <div className="mb-3 text-center">
                <p className="text-lg font-bold text-accent">{displayPrice}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Price Range</p>
              </div>
            ) : (
              <div className="mb-3 text-center">
                <p className="text-xl font-bold text-accent">{displayPrice}</p>
              </div>
            )}
            
            {/* View Details Button - Green */}
            <div className="text-center">
              <span className="inline-block w-full bg-green-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-green-700 transition text-center">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}