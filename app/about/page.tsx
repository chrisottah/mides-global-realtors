"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { motion } from "framer-motion";
import { Shield, Heart, Users, Award, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We operate with honesty and transparency in every transaction"
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We care about finding you the perfect home, not just making a sale"
    },
    {
      icon: Users,
      title: "Client First",
      description: "Your needs and preferences guide everything we do"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "5+ years of proven experience and successful transactions"
    }
  ];

  const locations = [
    "Lekki", "Victoria Island", "Ikoyi", "Ajah", 
    "Ibeju Lekki", "Epe", "Ikorodu", "Ogun State", 
    "Abuja", "Osun", "Ibadan", "Asaba"
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-accent">Mides Global Realtors</span>
              </h1>
              <p className="text-xl text-gray-300">
                Building dreams, facilitating futures, and guarding the essence of home
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Our Philosophy</h2>
                <div className="bg-accent/5 rounded-2xl p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    In a city where the real estate market is often seen as a cutthroat business, 
                    Mides Global Realtors stands out as a beacon of integrity and compassion. 
                    We are a builder of dreams, a facilitator of futures, and above all, a true 
                    guardian of the essence of home.
                  </p>
                </div>
              </motion.div>

              {/* Values Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
                    >
                      <value.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Transparency Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-4">Transparency First</h2>
                <p className="text-gray-700 leading-relaxed">
                  Transparency is a cornerstone of Mides Global Realtors philosophy. We maintain open and 
                  honest communication with clients, ensuring they are well-informed throughout every step 
                  of the real estate process. This commitment to transparency builds trust and fosters 
                  long-term relationships with clients.
                </p>
              </motion.div>

              {/* Meet Gloria */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-4">Meet Gloria</h2>
                      <p className="text-xl text-accent font-semibold mb-3">Founder & CEO</p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        With over 5 years of experience in Lagos real estate, Gloria has helped countless 
                        families find their dream homes and secure profitable investments.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>Thomas Estate, Ajah, Lagos</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-accent" />
                          <span>0903 358 1493 / 0816 469 0627</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4 text-accent" />
                          <span>info@midesglobalrealtors.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden mx-auto border-4 border-accent shadow-xl bg-accent/10">
                        <Image
                          src="/images/gloria.jpg"
                          alt="Gloria - Founder & CEO of Mides Global Realtors"
                          width={474}
                          height={474}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="mt-4 text-gray-600 italic">
                        "Your trusted partner in finding the perfect home"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Locations Covered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Areas We Cover</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {locations.map((location, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-accent/10 transition">
                      <span className="text-gray-700">{location}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-accent text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-3">Ready to Find Your Dream Home?</h3>
                  <p className="mb-6 opacity-90">Let's work together to find the perfect property for you</p>
                  <button 
                    onClick={() => window.open("https://wa.me/2349033581493", "_blank")}
                    className="bg-white text-accent px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                  >
                    Contact Gloria Today
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}