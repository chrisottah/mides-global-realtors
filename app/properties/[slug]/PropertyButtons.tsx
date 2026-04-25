"use client";

import { Phone, Mail } from "lucide-react";

export default function PropertyButtons({ title, location }: { title: string; location: string }) {
  const handleWhatsApp = () => {
    const message = `Hello Gloria! I'm interested in "${title}" located at ${location}. Please send me more information.`;
    window.open(`https://wa.me/2349033581493?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleViewing = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="mt-5 space-y-3">
      <button
        onClick={handleWhatsApp}
        className="w-full bg-[#25D366] text-white py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4" />
        Inquire on WhatsApp
      </button>
      <button
        onClick={handleViewing}
        className="w-full bg-accent text-white py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-85 transition transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Request a Viewing
      </button>
    </div>
  );
}