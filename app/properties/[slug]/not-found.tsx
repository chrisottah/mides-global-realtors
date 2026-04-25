import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PropertyNotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-3">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/properties"
            className="bg-accent text-white px-6 py-2 rounded-full hover:bg-opacity-85 transition"
          >
            View All Properties
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}