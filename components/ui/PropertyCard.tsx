"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square } from "lucide-react";

interface Property {
  id: string;
  slug: string;
  title: string;
  type: string;
  priceNaira: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: string;
  images: string[];
  status: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
    >
      <Link href={`/properties/${property.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images[0] || "/images/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.status === "available" ? "Available" : "Sold"}
          </div>
          {property.type === "land" && (
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              Land
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center gap-4 mb-4 text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
            )}
            {property.size && (
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span className="text-sm">{property.size}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-accent">{property.priceNaira}</span>
            <span className="text-accent font-semibold group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}