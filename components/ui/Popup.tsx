"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ChevronRight } from "lucide-react";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem("popupShown");
    
    if (!popupShown && !hasShown) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("popupShown", "true");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  // Also show on scroll (when user scrolls 50% of page)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5 && !hasShown && !sessionStorage.getItem("popupShown")) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("popupShown", "true");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/2349033581493?text=Hi Gloria! I saw your free consultation offer and I'm interested!", "_blank");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Content */}
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">
                  Free Property Consultation! 🏠
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Get a FREE consultation with Gloria and discover your dream property today!
                </p>
                
                <div className="bg-accent/5 rounded-lg p-3 mb-5">
                  <p className="text-sm text-gray-700">
                    ✨ Limited time offer: <span className="font-semibold text-accent">Free site inspection</span> for first 10 clients
                  </p>
                </div>
                
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                >
                  Claim Your Free Offer
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <p className="text-xs text-gray-400 mt-4">
                  No obligation. Just expert advice on finding your perfect home.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}