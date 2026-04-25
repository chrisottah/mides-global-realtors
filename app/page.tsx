"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import Popup from "@/components/ui/Popup";
import Chatbot from "@/components/chatbot/Chatbot";
import { getRecentProperties } from "@/lib/sanity";
import type { Property } from "@/lib/sanity";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const heroRef = useRef(null);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const zoomScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Fetch recent properties from Sanity
  useEffect(() => {
    async function fetchProperties() {
      try {
        const properties = await getRecentProperties();
        setRecentProperties(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section - with Light Sweep Animation */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background Image with Subtle Zoom */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ scale: zoomScale }}
          >
            <Image
              src="/images/hero-bg.jpg"
              alt="Lagos skyline - Luxury real estate in Nigeria"
              fill
              className="object-cover"
              priority
              quality={90}
              loading="eager"
              sizes="100vw"
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* Light Sweep Animation */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            <div className="light-sweep" />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 md:px-8 relative z-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.h1 
                variants={fadeUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                Your Dream Home
                <span className="text-accent block">Awaits You</span>
              </motion.h1>
              <motion.p 
                variants={fadeUp}
                className="text-gray-200 text-lg md:text-xl mt-6 max-w-2xl"
              >
                Discover premium properties in Lekki, VI, Ikoyi, Ajah, and across Nigeria. 
                Over 5 years of excellence in real estate.
              </motion.p>
              <motion.div 
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Link
                  href="/properties"
                  className="bg-accent text-white px-8 py-3 rounded-full text-center font-semibold hover:bg-opacity-85 transition transform hover:scale-105"
                >
                  Browse Properties
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-full text-center font-semibold hover:bg-white hover:text-accent transition"
                >
                  Contact Gloria
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* Recent Properties - From Sanity */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">
                Recent <span className="text-accent">Properties</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 mt-4">
                Check out our latest listings
              </motion.p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              </div>
            ) : recentProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No properties available yet. Check back soon!</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {recentProperties.map((property, index) => (
                    <motion.div key={property._id} variants={fadeUp}>
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* See More Button */}
                <div className="text-center mt-12">
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-85 transition transform hover:scale-105"
                  >
                    See More Properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Meet <span className="text-accent">Gloria</span>
                  <br />Your Trusted Realtor
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  With over 5 years of experience in Lagos real estate, I'm committed to helping 
                  you find your perfect home or investment property with integrity and transparency.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Whether you're buying, selling, or renting, I provide personalized service 
                  across Lekki, VI, Ikoyi, Ajah, Ibeju Lekki, and beyond.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                >
                  Learn More About Me →
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/gloria.jpg"
                  alt="Gloria - Realtor at Mides Global"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">
                Our <span className="text-accent">Services</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 mt-4">
                Comprehensive real estate solutions tailored to you
              </motion.p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Property Sales", desc: "Find your dream home or investment property", icon: "🏠" },
                { title: "Property Rentals", desc: "Flexible rental options across prime locations", icon: "🔑" },
                { title: "Property Management", desc: "Full-service property management solutions", icon: "📊" },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Popup />
      <Chatbot />
    </>
  );
}