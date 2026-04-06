"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just open WhatsApp with the message
    const whatsappMessage = `Hello Gloria! My name is ${formData.name}. ${formData.message}. My phone is ${formData.phone}`;
    window.open(`https://wa.me/2349033581493?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get in touch with Gloria for all your real estate needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Phone Numbers</p>
                      <p className="text-gray-600">0903 358 1493</p>
                      <p className="text-gray-600">0816 469 0627</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@midesglobalrealtors.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Office Address</p>
                      <p className="text-gray-600">Thomas Estate, Ajah, Lagos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Working Hours</p>
                      <p className="text-gray-600">Monday - Saturday: 9AM - 6PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => window.open("https://wa.me/2349033581493", "_blank")}
                  className="w-full mt-6 bg-[#25D366] text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-accent text-white py-3 rounded-full font-semibold hover:bg-opacity-85 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}