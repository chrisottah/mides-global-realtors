export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  icon: () => '🏠',
  fields: [
    // Basic Info
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
    
    // Property Type
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
    
    // Category - Now MULTIPLE SELECT
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ 
        type: 'string',
        options: {
          list: [
            { title: 'Residential', value: 'residential' },
            { title: 'Commercial', value: 'commercial' },
            { title: 'Industrial', value: 'industrial' },
          ],
        },
      }],
      options: {
        layout: 'tags',
      },
    },
    
    // PRICE SYSTEM - New flexible pricing
    {
      name: 'priceType',
      title: 'Price Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fixed Price', value: 'fixed' },
          { title: 'Price Range', value: 'range' },
          { title: 'On Request / Call for Price', value: 'on_request' },
        ],
        layout: 'radio',
      },
      initialValue: 'fixed',
      validation: (Rule: any) => Rule.required(),
    },
    
    // Fixed Price (shown when priceType = 'fixed')
    {
      name: 'price',
      title: 'Fixed Price (₦ Naira)',
      type: 'number',
      hidden: ({ parent }: any) => parent?.priceType !== 'fixed',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const { parent } = context;
        if (parent?.priceType === 'fixed' && !value) {
          return 'Fixed price is required when Price Type is "Fixed Price"';
        }
        return true;
      }),
    },
    
    // Price Range From (shown when priceType = 'range')
    {
      name: 'priceFrom',
      title: 'Price From (₦ Naira)',
      type: 'number',
      hidden: ({ parent }: any) => parent?.priceType !== 'range',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const { parent } = context;
        if (parent?.priceType === 'range' && !value) {
          return 'Starting price is required when Price Type is "Price Range"';
        }
        return true;
      }),
    },
    
    // Price Range To (shown when priceType = 'range')
    {
      name: 'priceTo',
      title: 'Price To (₦ Naira)',
      type: 'number',
      hidden: ({ parent }: any) => parent?.priceType !== 'range',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const { parent } = context;
        if (parent?.priceType === 'range' && !value) {
          return 'Ending price is required when Price Type is "Price Range"';
        }
        if (parent?.priceType === 'range' && value && parent?.priceFrom && value < parent.priceFrom) {
          return 'Price To must be greater than Price From';
        }
        return true;
      }),
    },
    
    // Price Display Text (auto-generated or manual override)
    {
      name: 'priceDisplay',
      title: 'Price Display Text',
      type: 'string',
      description: 'How the price appears on the website (auto-generated if left empty)',
      hidden: ({ parent }: any) => parent?.priceType === 'range',
    },
    
    // Location
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    
    // Size - Now supports range
    {
      name: 'sizeType',
      title: 'Size Type',
      type: 'string',
      options: {
        list: [
          { title: 'Single Size', value: 'single' },
          { title: 'Size Range', value: 'range' },
          { title: 'Not Specified', value: 'unspecified' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'single',
    },
    
    {
      name: 'size',
      title: 'Size (sqm)',
      type: 'string',
      hidden: ({ parent }: any) => parent?.sizeType !== 'single',
      description: 'e.g., "350 sqm"',
    },
    
    {
      name: 'sizeFrom',
      title: 'Size From (sqm)',
      type: 'string',
      hidden: ({ parent }: any) => parent?.sizeType !== 'range',
      placeholder: 'e.g., 200',
    },
    
    {
      name: 'sizeTo',
      title: 'Size To (sqm)',
      type: 'string',
      hidden: ({ parent }: any) => parent?.sizeType !== 'range',
      placeholder: 'e.g., 500',
    },
    
    // Bedrooms & Bathrooms (for buildings only)
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
    
    // Status
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
    
    // Descriptions
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
    
    // Images - Multiple images already supported!
    {
      name: 'images',
      title: 'Property Images',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: { hotspot: true },
        fields: [
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          },
        ],
      }],
      validation: (Rule: any) => Rule.required().min(1),
      description: 'You can upload multiple images. Drag to reorder.',
    },
    
    // Features
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    
    // Featured
    {
      name: 'featured',
      title: 'Featured Property (Shows on Homepage)',
      type: 'boolean',
      initialValue: false,
    },
    
    // Published Date
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'images.0',
      priceType: 'priceType',
    },
    prepare({ title, subtitle, media, priceType }: any) {
      return {
        title: title,
        subtitle: `${subtitle || 'No location'} | ${priceType === 'on_request' ? 'Price on Request' : 'Has Price'}`,
        media: media,
      };
    },
  },
};