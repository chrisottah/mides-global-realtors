import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              MIDES<span className="text-accent"> GLOBAL</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Building dreams, facilitating futures, and guarding the essence of home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/properties" className="hover:text-accent transition">Properties</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span>Thomas Estate, Ajah, Lagos</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>0903 358 1493 / 0816 469 0627</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@midesglobalrealtors.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors w-9 h-9 flex items-center justify-center">
                <span className="text-white text-sm">f</span>
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors w-9 h-9 flex items-center justify-center">
                <span className="text-white text-sm">t</span>
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors w-9 h-9 flex items-center justify-center">
                <span className="text-white text-sm">in</span>
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors w-9 h-9 flex items-center justify-center">
                <span className="text-white text-sm">ig</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mides Global Realtors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}