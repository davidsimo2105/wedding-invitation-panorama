"use client";

import { motion } from "framer-motion";

type Language = "hu" | "ro";

interface LoadingScreenProps {
  language: Language;
}

const loadingText = {
  hu: "Meghívó megnyitása",
  ro: "Deschiderea invitației",
};

export default function LoadingScreen({ language }: LoadingScreenProps) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-cream via-white to-tan z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Animated Heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          className="mb-8"
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="mx-auto"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              d="M60 100 C 60 100, 20 70, 20 45 C 20 30, 30 20, 45 20 C 52 20, 58 24, 60 30 C 62 24, 68 20, 75 20 C 90 20, 100 30, 100 45 C 100 70, 60 100, 60 100 Z"
              fill="none"
              stroke="#895129"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-brown mb-4">
            {loadingText[language]}
          </h2>
          
          {/* Animated Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-brown rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Decorative circles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-tan"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full border-2 border-brown"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
