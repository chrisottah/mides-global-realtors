import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'guruykmg';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-04-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source || !source.asset) return '/images/placeholder.jpg';
  return builder.image(source).url();
}