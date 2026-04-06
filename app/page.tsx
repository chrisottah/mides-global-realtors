"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import Popup from "@/components/ui/Popup";
import Chatbot from "@/components/chatbot/Chatbot";
import propertiesData from "@/data/properties.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const featuredProperties = propertiesData.properties.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Luxury real estate in Lagos"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
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
        </section>

        {/* Featured Properties */}
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
                Featured <span className="text-accent">Properties</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 mt-4">
                Handpicked premium properties just for you
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProperties.map((property) => (
                <motion.div key={property.id} variants={fadeUp}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
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
                  src="/images/gloria-realtor.jpg"
                  alt="Gloria - Realtor at Mides Global"
                  fill
                  className="object-cover"
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