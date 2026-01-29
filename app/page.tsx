"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import LanguageToggle from "@/components/LanguageToggle";
import VenueMap from "@/components/VenueMap";
import Countdown from "@/components/Countdown";

type Language = "hu" | "ro";

const translations = {
  hu: {
    invited: "Meghívó",
    subtitle: "Esküvői meghívó",
    ourWedding: "Esküvőnk",
    together: "",
    invite: "Szeretettel meghívunk az esküvőnkre 2026. május 8-án, ünnepeljük együtt életünk egyik legszebb napját!",
    names: "Hanna & Dávid",
    when: "Időpont",
    date: "2026. május 8.",
    time: "16:00",
    where: "Helyszín",
    venue: "Panorama Boutique Hotel",
    location: "Sepsiszentgyörgy",
    weddingParty: "Násznagyok",
    contact: "Kapcsolat",
    contactText: "Kérjük, erősítsd meg részvételed telefonon:",
    rsvpDeadline: "Részvételi szándékotokat kérjük jelezzétek április 24-ig az alábbi telefonszámok egyikén.",
    hanna: "Hanna",
    david: "Dávid",
    waitingFor: "Szeretettel várunk!",
    program: "Program",
    ceremony: "Egyházi szertartás",
    dinner: "Ünnepi ebéd",
    firstDance: "Nyitótánc",
    cake: "Torta",
    physicalInvitations: "A fizikai meghívók is úton vannak már!",
    physicalInvitationsSubtext: "Csak idő kérdése és kezetekben foghatjátok.",
  },
  ro: {
    invited: "Invitație",
    subtitle: "Invitație de nuntă",
    ourWedding: "Nunta Noastră",
    together: "",
    invite: "Vă invităm cu drag să sărbătoriți împreună cu noi pe 8 mai 2026, când ne vom uni viețile și ne vom jura credință veșnică unul altuia.",
    names: "Hanna & Dávid",
    when: "Data",
    date: "8 mai 2026",
    time: "16:00",
    where: "Locația",
    venue: "Panorama Boutique Hotel",
    location: "Sfântu Gheorghe",
    weddingParty: "Nașii noștri",
    contact: "Contact",
    contactText: "Vă rugăm să confirmați participarea telefonic:",
    rsvpDeadline: "Vă rugăm să confirmați participarea până cel târziu pe 24 aprilie la unul dintre numerele de telefon:",
    hanna: "Hanna",
    david: "Dávid",
    waitingFor: "Vă așteptăm cu drag!",
    program: "Program",
    ceremony: "Ceremonia religioasă",
    dinner: "Servirea mesei",
    firstDance: "Dansul mirilor",
    cake: "Tort",
    physicalInvitations: "Invitațiile fizice sunt deja în drum!",
    physicalInvitationsSubtext: "Este doar o chestiune de timp până le veți avea în mâini.",
  },
};

// Parallax Background Component
const ParallaxBackground = ({ 
  imageSrc, 
  speed = 0.5,
  overlay = "none" 
}: { 
  imageSrc: string; 
  speed?: number;
  overlay?: "none" | "light" | "dark";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-20%] w-full h-[140%]"
      >
        <Image
          src={imageSrc}
          alt="Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Optional overlays for text readability */}
        {overlay === "dark" && (
          <>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
          </>
        )}
        {overlay === "light" && (
          <>
            <div className="absolute inset-0 bg-white/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/20" />
          </>
        )}
      </motion.div>
    </div>
  );
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
    {/* Baby's breath cluster - multiple small flowers */}
    {/* Center flowers */}
    <circle cx="60" cy="60" r="3" fill="#ffffff" opacity="0.9" />
    <circle cx="60" cy="60" r="2" fill="#f5f5f0" />
    
    {/* Surrounding flowers */}
    <circle cx="48" cy="52" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="48" cy="52" r="1.5" fill="#fdfcfa" />
    
    <circle cx="72" cy="54" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="72" cy="54" r="1.5" fill="#fdfcfa" />
    
    <circle cx="54" cy="68" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="54" cy="68" r="1.5" fill="#fdfcfa" />
    
    <circle cx="68" cy="66" r="2.5" fill="#ffffff" opacity="0.85" />
    <circle cx="68" cy="66" r="1.5" fill="#fdfcfa" />
    
    {/* Outer ring */}
    <circle cx="42" cy="42" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="78" cy="44" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="44" cy="78" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="76" cy="76" r="2" fill="#ffffff" opacity="0.8" />
    
    <circle cx="60" cy="40" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="60" cy="80" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="40" cy="60" r="2" fill="#ffffff" opacity="0.8" />
    <circle cx="80" cy="60" r="2" fill="#ffffff" opacity="0.8" />
    
    {/* Small accent flowers */}
    <circle cx="50" cy="45" r="1.5" fill="#ffffff" opacity="0.75" />
    <circle cx="70" cy="48" r="1.5" fill="#ffffff" opacity="0.75" />
    <circle cx="48" cy="70" r="1.5" fill="#ffffff" opacity="0.75" />
    <circle cx="72" cy="72" r="1.5" fill="#ffffff" opacity="0.75" />
    
    {/* Delicate stems */}
    <line x1="60" y1="60" x2="48" y2="52" stroke="#8F9779" strokeWidth="0.5" opacity="0.4" />
    <line x1="60" y1="60" x2="72" y2="54" stroke="#8F9779" strokeWidth="0.5" opacity="0.4" />
    <line x1="60" y1="60" x2="54" y2="68" stroke="#8F9779" strokeWidth="0.5" opacity="0.4" />
    <line x1="60" y1="60" x2="68" y2="66" stroke="#8F9779" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

// Floral Garland Component
const FloralGarland = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Top garland */}
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-between px-8">
      <BabysBreath scale={0.4} className="rotate-45 opacity-40" />
      <BabysBreath scale={0.35} className="-rotate-30 opacity-40" />
      <BabysBreath scale={0.38} className="rotate-60 opacity-40" />
    </div>
    {/* Bottom garland */}
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-between px-8">
      <BabysBreath scale={0.4} className="-rotate-45 opacity-40" />
      <BabysBreath scale={0.35} className="rotate-30 opacity-40" />
      <BabysBreath scale={0.38} className="-rotate-60 opacity-40" />
    </div>
  </div>
);

// Elegant Divider
const ElegantDivider = () => (
  <motion.div 
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    className="flex items-center justify-center my-8 w-full max-w-2xl mx-auto gap-4"
  >
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brown/40 to-brown/40" />
    <div className="flex items-center gap-3">
      <BabysBreath scale={0.25} className="rotate-12" />
      <Heart className="w-4 h-4 text-brown fill-brown/20" />
      <BabysBreath scale={0.25} className="-rotate-12" />
    </div>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-brown/40 to-brown/40" />
  </motion.div>
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>("hu");
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" language={language} />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            className="min-h-screen relative bg-transparent"
          >
            {/* Language Toggle */}
            <LanguageToggle language={language} setLanguage={setLanguage} />

            {/* Floating Golden Sparkles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-brown/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            {/* Baby's Breath Floral Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {/* Top left corner */}
              <motion.div
                initial={{ opacity: 0, rotate: -15 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-8 left-8"
              >
                <BabysBreath scale={0.8} className="rotate-12" />
              </motion.div>

              {/* Top right corner */}
              <motion.div
                initial={{ opacity: 0, rotate: 15 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="absolute top-12 right-12"
              >
                <BabysBreath scale={0.7} className="-rotate-12" />
              </motion.div>

              {/* Left side mid */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute top-1/3 left-4"
              >
                <BabysBreath scale={0.6} className="rotate-45" />
              </motion.div>

              {/* Right side mid */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="absolute top-1/2 right-8"
              >
                <BabysBreath scale={0.65} className="-rotate-30" />
              </motion.div>

              {/* Bottom left */}
              <motion.div
                initial={{ opacity: 0, rotate: 15 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="absolute bottom-32 left-12"
              >
                <BabysBreath scale={0.75} className="rotate-20" />
              </motion.div>

              {/* Bottom right */}
              <motion.div
                initial={{ opacity: 0, rotate: -15 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 1.7 }}
                className="absolute bottom-24 right-16"
              >
                <BabysBreath scale={0.7} className="-rotate-25" />
              </motion.div>

              {/* Additional scattered flowers */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.9 }}
                className="absolute top-1/4 right-1/4"
              >
                <BabysBreath scale={0.5} className="rotate-60" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="absolute bottom-1/3 left-1/4"
              >
                <BabysBreath scale={0.55} className="-rotate-40" />
              </motion.div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
              <FloralGarland />
              <motion.div
                className="max-w-4xl mx-auto text-center relative z-10 mb-24"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {/* Decorative top flourish */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="mb-12"
                >
                  <svg width="200" height="40" viewBox="0 0 200 40" className="mx-auto">
                    <path d="M0 20 Q50 10 100 20 Q150 30 200 20" stroke="#8F9779" strokeWidth="1" fill="none" opacity="0.4"/>
                    <circle cx="100" cy="20" r="2" fill="#8F9779" opacity="0.6"/>
                    <circle cx="50" cy="15" r="1.5" fill="#8F9779" opacity="0.4"/>
                    <circle cx="150" cy="25" r="1.5" fill="#8F9779" opacity="0.4"/>
                  </svg>
                </motion.div>

                {/* Small subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="font-[family-name:var(--font-script)] text-4xl sm:text-5xl md:text-6xl mb-8 text-light-brown leading-tight px-4"
                >
                  {t.subtitle}
                </motion.p>

                {/* Names - Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="relative font-[family-name:var(--font-seasons)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-brown font-bold px-4 mb-16 tracking-wide leading-tight uppercase"
                >
                  {/* Decorative & symbol behind */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] font-light italic text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] opacity-25 pointer-events-none select-none tracking-widest">
                    &
                  </span>
                  {/* Names on two lines */}
                  <div className="relative flex flex-col items-center -space-y-2 sm:space-y-0 sm:gap-2">
                    <div>{t.hanna}</div>
                    <div>{t.david}</div>
                  </div>
                </motion.h1>

                {/* Invitation text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="max-w-3xl mx-auto px-4"
                >
                  <p className="font-[family-name:var(--font-body)] text-xl sm:text-2xl md:text-3xl text-light-brown leading-relaxed">
                    {language === "hu" ? (
                      <>
                        {/* Mobile version */}
                        <span className="block sm:hidden">
                          Szeretettel meghívunk az{" "}
                          <br />
                          esküvőnkre{" "}
                          <span className="text-brown font-bold">2026. május 8-án</span>,{" "}
                          <br />
                          ünnepeljük együtt életünk{" "}
                          <br />
                          egyik legszebb napját!
                        </span>
                        {/* Desktop version */}
                        <span className="hidden sm:block">
                          Szeretettel meghívunk az esküvőnkre{" "}
                          <br />
                          <span className="text-brown font-bold">
                            2026. május 8-án
                          </span>
                          , ünnepeljük együtt{" "}
                          <br />
                          életünk egyik legszebb napját!
                        </span>
                      </>
                    ) : (
                      <>
                        Vă invităm cu drag să sărbătoriți împreună cu noi pe{" "}
                        <span className="text-brown font-bold">
                          8 mai 2026
                        </span>
                        , când ne vom uni viețile și ne vom jura credință veșnică unul altuia.
                      </>
                    )}
                  </p>
                </motion.div>
              </motion.div>

              {/* Scroll indicator - positioned at section bottom */}
              {!hasScrolled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  className="absolute bottom-32 sm:bottom-20 left-1/2 -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-brown/40 rounded-full flex items-start justify-center p-2"
                  >
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-brown/60 rounded-full"
                    />
                  </motion.div>
                </motion.div>
              )}
            </section>

            <ElegantDivider />

            {/* Countdown Section */}
            <Countdown language={language} />

            <ElegantDivider />

            {/* Date & Time Section */}
            <section className="relative py-12 px-4 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                  src="/images/julia-zyablova-Eq2bF70fjrE-unsplash.jpg"
                  alt="Wedding venue"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority
                  quality={90}
                />
              </div>
              
              <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Date */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-white mb-2 sm:mb-6 font-bold drop-shadow-2xl uppercase">
                      {t.when}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white font-semibold mb-1 sm:mb-2 drop-shadow-xl">
                      {t.date}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-xl text-white drop-shadow-lg -mb-1 md:-mb-2">
                      {t.time}
                    </p>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-white mb-2 sm:mb-6 font-bold drop-shadow-2xl uppercase">
                      {t.where}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white font-semibold mb-1 sm:mb-2 drop-shadow-xl">
                      {t.venue}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-xl text-white drop-shadow-lg -mb-1 md:-mb-2">
                      {t.location}
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            <ElegantDivider />

            {/* Program Timeline */}
            <section className="relative py-6 px-4">
              <div className="max-w-3xl mx-auto">
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-center text-brown mb-16 font-bold uppercase"
                >
                  {t.program}
                </motion.h3>

                <div className="space-y-8">
                  {[
                    { image: "/images/rings.png", time: "16:00", text: t.ceremony, delay: 0.1 },
                    { image: "/images/cutlery.png", time: "17:00", text: t.dinner, delay: 0.2 },
                    { image: "/images/dance.png", time: "18:00", text: t.firstDance, delay: 0.3 },
                    { image: "/images/wedding-cake.png", time: "22:00", text: t.cake, delay: 0.4 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: item.delay, ease: [0.25, 0.1, 0.25, 1] }}
                      className="flex items-start gap-6 pl-4 sm:pl-8"
                    >
                      <div className="flex-shrink-0 flex items-center h-full pt-2">
                        <div 
                          className="w-12 h-12"
                          style={{ 
                            backgroundColor: '#8F9779',
                            maskImage: `url(${item.image})`,
                            WebkitMaskImage: `url(${item.image})`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center'
                          }}
                        />
                      </div>
                      <div className="flex-1 border-b border-brown/20 pb-6">
                        <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-brown font-bold mb-1">
                          {item.time}
                        </p>
                        <p className="font-[family-name:var(--font-body)] text-xl md:text-2xl text-light-brown">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <ElegantDivider />

            {/* Wedding Party Section */}
            <section className="relative py-6 px-4 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                  src="/images/annie-spratt-Ff6lw9hTnEw-unsplash.jpg"
                  alt="Wedding celebration"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={90}
                />
              </div>
              
              <div className="max-w-5xl mx-auto text-center relative z-10 px-4 w-full pt-5 md:pt-6">
                {/* Parents Section */}
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-white mb-4 font-bold drop-shadow-2xl uppercase break-words"
                >
                  {language === "hu" ? "Szüleink" : "Părinții noștri"}
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-16 mb-4 sm:mb-8"
                >
                  <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white font-semibold mb-0 sm:mb-3 drop-shadow-xl text-center w-full sm:w-auto break-words px-2">
                    Vida István {language === "hu" ? "és" : "și"} Angéla
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white font-semibold mb-0 sm:mb-3 drop-shadow-xl text-center w-full sm:w-auto break-words px-2">
                    Simó Attila {language === "hu" ? "és" : "și"} Andrea
                  </p>
                </motion.div>

                {/* Wedding Party */}
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-white mb-4 font-bold drop-shadow-2xl uppercase break-words"
                >
                  {t.weddingParty}
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-16 mb-3 md:mb-1"
                >
                  <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white font-semibold mb-0 sm:mb-3 drop-shadow-xl text-center w-full sm:w-auto break-words px-2">
                    Vida Dániel {language === "hu" ? "és" : "și"} Bianka
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white font-semibold mb-0 sm:mb-3 drop-shadow-xl text-center w-full sm:w-auto break-words px-2">
                    Kovács Hunor {language === "hu" ? "és" : "și"} Andrea
                  </p>
                </motion.div>
              </div>
            </section>

            <ElegantDivider />

            {/* Map Section */}
            <section className="relative py-2 px-4">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <VenueMap language={language} />
                </motion.div>
              </div>
            </section>

            <ElegantDivider />

            {/* Contact Section */}
            <section className="relative pt-9 pb-10 px-4 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                  src="/images/pongracz-noemi-v4L1TYD1ZY8-unsplash.jpg"
                  alt="Wedding contact"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={90}
                />
              </div>
              
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-white mb-8 font-bold drop-shadow-2xl uppercase">
                    {t.contact}
                  </h3>
                  
                  <p className="font-[family-name:var(--font-body)] text-2xl md:text-2xl lg:text-3xl text-white mb-6 mx-auto leading-tight text-center px-4 drop-shadow-xl max-w-3xl">
                    {language === "hu" ? (
                      <>
                        {/* Mobile version */}
                        <span className="block sm:hidden">
                          Részvételi szándékotokat{" "}
                          <br />
                          kérjük jelezzétek{" "}
                          <br />
                          <span className="font-bold">április 24</span>-ig az alábbi{" "}
                          <br />
                          telefonszámok egyikén.
                        </span>
                        {/* Desktop version */}
                        <span className="hidden sm:block">
                          Részvételi szándékotokat kérjük jelezzétek{" "}
                          <br />
                          <span className="font-bold">április 24</span>-ig az alábbi telefonszámok egyikén.
                        </span>
                      </>
                    ) : (
                      <>
                        Vă rugăm să confirmați participarea până cel târziu pe <span className="font-bold">24 aprilie</span> la unul dintre numerele de telefon:
                      </>
                    )}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-3 max-w-2xl mx-auto">
                    <motion.a
                      href="tel:+36704096591"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-center block group"
                    >
                      <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white mb-2 font-bold group-hover:scale-105 transition-transform duration-300 inline-block drop-shadow-xl">
                        {t.hanna}
                      </p>
                      <p className="font-[family-name:var(--font-body)] text-2xl md:text-2xl lg:text-3xl text-white group-hover:text-brown transition-colors drop-shadow-lg">
                        +36 70 409 6591
                      </p>
                    </motion.a>

                    <motion.a
                      href="tel:+40736374567"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-center block group"
                    >
                      <p className="font-[family-name:var(--font-body)] text-2xl md:text-3xl text-white mb-2 font-bold group-hover:scale-105 transition-transform duration-300 inline-block drop-shadow-xl">
                        {t.david}
                      </p>
                      <p className="font-[family-name:var(--font-body)] text-2xl md:text-2xl lg:text-3xl text-white group-hover:text-brown transition-colors drop-shadow-lg">
                        +40 73 637 4567
                      </p>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Final Message */}
            <section className="relative py-20 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center max-w-2xl mx-auto"
              >
                {/* Decorative flourish */}
                <svg width="200" height="40" viewBox="0 0 200 40" className="mx-auto mb-8">
                  <path d="M0 20 Q50 30 100 20 Q150 10 200 20" stroke="#8F9779" strokeWidth="1" fill="none" opacity="0.4"/>
                  <circle cx="100" cy="20" r="2" fill="#8F9779" opacity="0.6"/>
                </svg>
                
                <p className="font-[family-name:var(--font-script)] text-6xl md:text-7xl text-brown mb-12">
                  {t.waitingFor}
                </p>

                {/* Bottom flourish */}
                <svg width="200" height="40" viewBox="0 0 200 40" className="mx-auto mt-8">
                  <path d="M0 20 Q50 10 100 20 Q150 30 200 20" stroke="#8F9779" strokeWidth="1" fill="none" opacity="0.4"/>
                  <circle cx="100" cy="20" r="2" fill="#8F9779" opacity="0.6"/>
                </svg>
              </motion.div>
            </section>

            {/* Physical Invitations Section */}
            <section className="relative py-4 px-4 bg-brown">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center max-w-lg mx-auto"
              >
                <p className="font-[family-name:var(--font-body)] text-sm sm:text-base md:text-lg text-white font-semibold mb-0.5 leading-tight">
                  {t.physicalInvitations}
                </p>
                <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm md:text-base text-tan leading-tight">
                  {t.physicalInvitationsSubtext}
                </p>
              </motion.div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
