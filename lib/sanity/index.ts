import { sanityClient } from './client';

export interface Property {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  type: 'building' | 'land';
  category: string[];
  priceType: 'fixed' | 'range' | 'on_request';
  price?: number;
  priceFrom?: number;
  priceTo?: number;
  priceDisplay?: string;
  location: string;
  sizeType?: 'single' | 'range' | 'unspecified';
  size?: string;
  sizeFrom?: string;
  sizeTo?: string;
  bedrooms?: number;
  bathrooms?: number;
  status: 'available' | 'sold' | 'pending';
  description: string;
  shortDescription?: string;
  images: any[];
  features?: string[];
  featured: boolean;
  publishedAt: string;
}

// Get property by slug - Working version
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const query = `*[_type == "property" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    type,
    category,
    priceType,
    price,
    priceFrom,
    priceTo,
    priceDisplay,
    location,
    sizeType,
    size,
    sizeFrom,
    sizeTo,
    bedrooms,
    bathrooms,
    status,
    description,
    shortDescription,
    images[]{
      asset->{
        _id,
        url
      },
      caption
    },
    features,
    featured,
    publishedAt
  }`;
  return await sanityClient.fetch(query);
}

// Get all properties
export async function getAllProperties(): Promise<Property[]> {
  const query = `*[_type == "property"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    category,
    priceType,
    price,
    priceFrom,
    priceTo,
    priceDisplay,
    location,
    sizeType,
    size,
    sizeFrom,
    sizeTo,
    bedrooms,
    bathrooms,
    status,
    description,
    shortDescription,
    images[]{
      asset->{
        _id,
        url
      },
      caption
    },
    features,
    featured,
    publishedAt
  }`;
  return await sanityClient.fetch(query);
}

// Get recent properties (6 most recently published available properties)
export async function getRecentProperties(): Promise<Property[]> {
  const query = `*[_type == "property" && status == "available"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    type,
    category,
    priceType,
    price,
    priceFrom,
    priceTo,
    priceDisplay,
    location,
    sizeType,
    size,
    sizeFrom,
    sizeTo,
    bedrooms,
    bathrooms,
    status,
    description,
    shortDescription,
    images[]{
      asset->{
        _id,
        url
      },
      caption
    },
    features,
    featured,
    publishedAt
  }`;
  return await sanityClient.fetch(query);
}

// Helper function to get formatted price
export function getFormattedPrice(property: Property): string {
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
  return `₦${property.price?.toLocaleString() || 'Contact for Price'}`;
}

// Helper function to get formatted size
export function getFormattedSize(property: Property): string | null {
  if (property.sizeType === 'range' && property.sizeFrom && property.sizeTo) {
    return `${property.sizeFrom} - ${property.sizeTo} sqm`;
  }
  if (property.sizeType === 'single' && property.size) {
    return property.size;
  }
  return null;
}