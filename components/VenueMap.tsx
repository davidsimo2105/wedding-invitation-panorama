"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Language = "hu" | "ro";

interface VenueMapProps {
  language: Language;
}

const translations = {
  hu: {
    directions: "Útvonal tervezése",
  },
  ro: {
    directions: "Planifică ruta",
  },
};

export default function VenueMap({ language }: VenueMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Panorama Boutique Hotel, Calea Valcele, DN13E 9, Sfântu Gheorghe 527175
  const mapUrl = "https://maps.google.com/maps?q=Panorama+Boutique+Hotel+Calea+Valcele+DN13E+9+Sfantu+Gheorghe&hl=en&z=16&output=embed";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Panorama+Boutique+Hotel,Calea+Valcele,DN13E+9,Sfantu+Gheorghe+527175";
  
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      {/* Location Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mb-10"
      >
        <p className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-brown mb-4 font-bold">
          📍 Panorama Boutique Hotel
        </p>
        <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-light-brown font-semibold mb-2">
          Calea Valcele, DN13E 9
        </p>
        <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-light-brown">
          {language === "hu" ? "Sepsiszentgyörgy" : "Sfântu Gheorghe"} 527175
        </p>
      </motion.div>

      {/* Map Container */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px]">
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-brown border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="font-[family-name:var(--font-body)] text-brown">
                  Loading map...
                </p>
              </div>
            </div>
          )}
          
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsMapLoaded(true)}
            className="absolute inset-0"
            title="Panorama Boutique Hotel Location"
          />
        </div>

      </div>

      {/* Directions Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <motion.a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-base text-brown hover:underline transition-all duration-300 flex items-center gap-2 justify-center my-[15px] font-extrabold"
          style={{ boxSizing: 'content-box' }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
          {t.directions}
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
