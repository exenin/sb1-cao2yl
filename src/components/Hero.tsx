import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-shadow">
            Innovate. Build. Transform.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto text-shadow">
            Welcome to CyberAllStars - Where innovation meets cybersecurity. We're pioneers in digital transformation, 
            protecting your future in the digital age.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-black bg-cyan-400 hover:bg-cyan-500 transition-colors duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}