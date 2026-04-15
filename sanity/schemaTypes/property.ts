export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  icon: () => '🏠',
  fields: [
    {
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Building/House', value: 'building' },
          { title: 'Land/Plot', value: 'land' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Industrial', value: 'industrial' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (in Naira)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'priceDisplay',
      title: 'Price Display Text',
      type: 'string',
      description: 'e.g., "₦250M" or "₦85M"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      hidden: ({ document }: any) => document?.type === 'land',
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      hidden: ({ document }: any) => document?.type === 'land',
    },
    {
      name: 'size',
      title: 'Size (sqm)',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Pending', value: 'pending' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description (for cards)',
      type: 'string',
      maxLength: 120,
    },
    {
      name: 'images',
      title: 'Property Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'images.0',
    },
  },
};