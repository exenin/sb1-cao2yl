import React from 'react';
import { Shield, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-cyan-500" />
              <span className="font-bold text-xl">CyberAllStars</span>
            </div>
            <p className="text-gray-400">
              Pioneering the future of cybersecurity and digital transformation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Contact</a></li>
              <li><a href="/admin/login" className="text-gray-400 hover:text-cyan-500">Admin Portal</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Cybersecurity</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Cloud Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Digital Transformation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">IT Consulting</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1234 Cyber Street</li>
              <li>Tech City, TC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@cyberallstars.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CyberAllStars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}