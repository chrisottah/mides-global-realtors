import { groq } from 'next-sanity';

export const PROPERTY_FIELDS = groq`
  _id,
  title,
  slug,
  type,
  category,
  price,
  priceDisplay,
  location,
  bedrooms,
  bathrooms,
  size,
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
`;

export const getAllPropertiesQuery = groq`
  *[_type == "property"] | order(publishedAt desc) {
    ${PROPERTY_FIELDS}
  }
`;

export const getFeaturedPropertiesQuery = groq`
  *[_type == "property" && featured == true && status == "available"] | order(publishedAt desc)[0...6] {
    ${PROPERTY_FIELDS}
  }
`;

export const getPropertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    ${PROPERTY_FIELDS}
  }
`;

export const getAvailablePropertiesQuery = groq`
  *[_type == "property" && status == "available"] | order(publishedAt desc) {
    ${PROPERTY_FIELDS}
  }
`;