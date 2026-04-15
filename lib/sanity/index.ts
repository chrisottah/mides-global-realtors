import { sanityClient } from './client';
import { 
  getAllPropertiesQuery, 
  getFeaturedPropertiesQuery, 
  getPropertyBySlugQuery,
  getAvailablePropertiesQuery 
} from './queries';

export interface PropertyImage {
  asset: {
    _id: string;
    url: string;
  };
  caption?: string;
}

export interface Property {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  type: 'building' | 'land';
  category: 'residential' | 'commercial' | 'industrial';
  price: number;
  priceDisplay: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: string;
  status: 'available' | 'sold' | 'pending';
  description: string;
  shortDescription?: string;
  images: PropertyImage[];
  features?: string[];
  featured: boolean;
  publishedAt: string;
}

export async function getAllProperties(): Promise<Property[]> {
  return await sanityClient.fetch(getAllPropertiesQuery);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return await sanityClient.fetch(getFeaturedPropertiesQuery);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return await sanityClient.fetch(getPropertyBySlugQuery, { slug });
}

export async function getAvailableProperties(): Promise<Property[]> {
  return await sanityClient.fetch(getAvailablePropertiesQuery);
}