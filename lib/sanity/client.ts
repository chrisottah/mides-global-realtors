import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'guruykmg';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-04-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Fixed: Using named export instead of default export
export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: any) {
  if (!source || !source.asset) return '/images/placeholder.jpg';
  return imageBuilder.image(source).url();
}