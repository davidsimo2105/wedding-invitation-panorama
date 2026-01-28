"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

type Language = "hu" | "ro";

const translations = {
  hu: {
    countdown: "Visszaszámlálás",
    days: "Nap",
    hours: "Óra",
    minutes: "Perc",
    seconds: "Másodperc",
  },
  ro: {
    countdown: "Numărătoare inversă",
    days: "Zile",
    hours: "Ore",
    minutes: "Minute",
    seconds: "Secunde",
  },
};

// Baby's Breath Flower Component
const BabysBreath = ({ className = "", scale = 1 }: { className?: string; scale?: number }) => (
  <svg 
    width={120 * scale} 
    height={120 * scale} 
    viewBox="0 0 120 120" 
    className={className}
    style={{ opacity: 0.6 }}
  >
    <circle cx="60" cy="60" r="3" fill="#ffffff" opacity="0.9" />
    <circle cx="60" cy="60" r="2" fill="#f5f5f0" />
    <circle cx="48" cy="52" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="48" cy="52" r="1.5" fill="#fdfcfa" />
    <circle cx="72" cy="54" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="72" cy="54" r="1.5" fill="#fdfcfa" />
    <circle cx="54" cy="68" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="54" cy="68" r="1.5" fill="#fdfcfa" />
    <circle cx="68" cy="66" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="68" cy="66" r="1.5" fill="#fdfcfa" />
    <circle cx="42" cy="42" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="78" cy="44" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="44" cy="78" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="76" cy="76" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="60" cy="40" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="60" cy="80" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="40" cy="60" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="80" cy="60" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="50" cy="45" r="1.5" fill="#ffffff" opacity="0.75" />
    <circle cx="70" cy="48" r="1.5" fill="#ffffff" opacity="0.75" />
    <circle cx="48" cy="70" r="1.5" fill="#ffffff" opacity="0.75" />
    <circle cx="72" cy="72" r="1.5" fill="#ffffff" opacity="0.75" />
    <line x1="60" y1="60" x2="48" y2="52" stroke="#895129" strokeWidth="0.5" opacity="0.4" />
    <line x1="60" y1="60" x2="72" y2="54" stroke="#895129" strokeWidth="0.5" opacity="0.4" />
    <line x1="60" y1="60" x2="54" y2="68" stroke="#895129" strokeWidth="0.5" opacity="0.4" />
    <line x1="60" y1="60" x2="68" y2="66" stroke="#895129" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

export default function Countdown({ language }: { language: Language }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const t = translations[language];

  useEffect(() => {
    const weddingDate = new Date('2026-05-08T16:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds },
  ];

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-center text-brown mb-12 font-bold uppercase leading-tight px-2"
        >
          {language === "hu" ? (
            <>
              <span className="hidden sm:inline">VISSZASZÁMLÁLÁS</span>
              <span className="sm:hidden">
                VISSZA-
                <br />
                SZÁMLÁLÁS
              </span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">NUMĂRĂTOARE INVERSĂ</span>
              <span className="sm:hidden">
                NUMĂRĂTOARE
                <br />
                INVERSĂ
              </span>
            </>
          )}
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-brown font-bold mb-2"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>
              <div className="font-[family-name:var(--font-body)] text-lg md:text-xl text-light-brown uppercase tracking-wider">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
