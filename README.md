# Mides Global Realtors

A modern, production-ready real estate website for Mides Global Realtors in Lagos, Nigeria.

## 🌐 Live Site

[View Live Website](https://midesglobalrealtors.com)

## 📋 Project Overview

This is a complete real estate platform that allows property listings management, client inquiries, and automated assistance. Built for a Lagos-based realtor with over 5 years of experience serving Lekki, VI, Ikoyi, Ajah, and across Nigeria.

## ✨ Features

### Frontend
- 🏠 **Property Listings** - Grid view with filters, detail pages with image galleries
- 🤖 **Smart Chatbot** - Local knowledge base answering questions about properties, services, and locations
- 💬 **WhatsApp Integration** - Direct client communication with auto-generated property links
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🎨 **Smooth Animations** - Framer Motion for elegant transitions
- 🔍 **SEO Optimized** - Meta tags, sitemap, and semantic HTML

### Admin Features
- 📸 **Sanity CMS** - Easy property management interface at `/admin`
- 🖼️ **Multiple Image Upload** - Support for unlimited property photos
- 💰 **Flexible Pricing** - Fixed price, price range, or "Contact for Price"
- 📏 **Size Options** - Single size, size range, or not specified
- 🏷️ **Category Tags** - Residential, Commercial, Industrial (multi-select)
- ✅ **Status Management** - Available, Sold, or Pending

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **CMS** | Sanity.io |
| **Chatbot** | Custom with keyword matching + WhatsApp fallback |
| **Deployment** | Vercel |
| **Domain** | Namecheap |

## 📁 Project Structure

mides-global-realtors/
├── app/
│   ├── admin/              # Embedded Sanity Studio
│   ├── about/              # Company information
│   ├── contact/            # Contact form & info
│   ├── properties/         # Property listing & detail pages
│   ├── services/           # Services overview
│   └── layout.tsx          # Root layout
├── components/
│   ├── chatbot/            # Chatbot UI & logic
│   ├── layout/             # Navbar & Footer
│   └── ui/                 # PropertyCard, Popup
├── lib/
│   └── sanity/             # Sanity client & queries
├── sanity/                 # Sanity schema definitions
├── public/                 # Static assets
└── data/                   # Local data (fallback)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (free)

### Installation

# Clone the repository
git clone https://github.com/yourusername/mides-global-realtors.git

# Navigate to project
cd mides-global-realtors

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Sanity project ID and dataset

# Run development server
npm run dev

### Environment Variables

Create `.env.local` with:

# env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password

### Sanity Studio

Access property management at `/admin` after login:
1. Visit `http://localhost:3000/admin/login`
2. Enter admin password
3. Add/edit properties, upload images, set prices

## 📦 Deployment

### Deploy to Vercel

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Connect repository to Vercel
# Add environment variables in Vercel dashboard
# Deploy automatically on push

### Domain Configuration

1. Add domain in Vercel: `midesglobalrealtors.com`
2. Configure DNS records in Namecheap (provided by Vercel)

## 🤝 Client Access

1. **Admin Panel:** `https://midesglobalrealtors.com/admin/login`
2. **Sanity Invite:** Client receives email invitation to create free Sanity account
3. **Permissions:** Client can add/edit/publish properties only

## 📄 License

All rights reserved. Built exclusively for Mides Global Realtors.


Built with ❤️ using Next.js and Sanity CMS