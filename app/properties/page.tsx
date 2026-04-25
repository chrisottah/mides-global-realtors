import { getAllProperties } from '@/lib/sanity';
import PropertyCard from '@/components/ui/PropertyCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import Popup from '@/components/ui/Popup';
import Link from 'next/link';
import { Building2, Landmark, Home } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PropertiesPage() {
  const properties = await getAllProperties();
  
  const availableProperties = properties.filter(p => p.status === 'available');
  const soldProperties = properties.filter(p => p.status === 'sold');

  // Count property types
  const buildingCount = properties.filter(p => p.type === 'building' && p.status === 'available').length;
  const landCount = properties.filter(p => p.type === 'land' && p.status === 'available').length;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              All <span className="text-accent">Properties</span>
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm">
              Browse through our complete collection of available properties in Lagos and across Nigeria
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8">
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>{availableProperties.length} Available Properties</span>
              </div>
              {buildingCount > 0 && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-3 h-3" />
                  <span>{buildingCount} Buildings</span>
                </div>
              )}
              {landCount > 0 && (
                <div className="flex items-center gap-2">
                  <Landmark className="w-3 h-3" />
                  <span>{landCount} Lands</span>
                </div>
              )}
            </div>
          </div>

          {/* Available Properties Grid */}
          {availableProperties.length === 0 ? (
            <div className="text-center py-16">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No properties available</h3>
              <p className="text-gray-500">Check back soon for new listings!</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-5">Available Properties</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </>
          )}

          {/* Sold Properties Section */}
          {soldProperties.length > 0 && (
            <>
              <h2 className="text-xl font-bold mt-12 mb-5">Sold Properties</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                {soldProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
      <Popup />
    </>
  );
}