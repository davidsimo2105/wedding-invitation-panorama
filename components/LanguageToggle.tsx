"use client";

import { motion } from "framer-motion";

type Language = "hu" | "ro";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-4 right-8 sm:top-6 sm:right-6 z-50 m-2 sm:m-0"
    >
      <div className="flex gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-md rounded-full p-1 border-2 border-brown/20 shadow-xl">
        <button
          onClick={() => setLanguage("hu")}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-[family-name:var(--font-body)] text-xs sm:text-sm font-semibold transition-all duration-300 ${
            language === "hu"
              ? "bg-brown text-white shadow-lg"
              : "text-gray-600 hover:text-brown hover:bg-brown/5"
          }`}
        >
          HU
        </button>
        <button
          onClick={() => setLanguage("ro")}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-[family-name:var(--font-body)] text-xs sm:text-sm font-semibold transition-all duration-300 ${
            language === "ro"
              ? "bg-brown text-white shadow-lg"
              : "text-gray-600 hover:text-brown hover:bg-brown/5"
          }`}
        >
          RO
        </button>
      </div>
    </motion.div>
  );
}
