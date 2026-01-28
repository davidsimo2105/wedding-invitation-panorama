"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/images/annie-spratt-Ff6lw9hTnEw-unsplash.jpg",
    alt: "Wedding moment 1",
    height: 400,
  },
  {
    src: "/images/annie-spratt-lDuw1X3j2G0-unsplash.jpg",
    alt: "Wedding moment 2",
    height: 350,
  },
  {
    src: "/images/enrico-bet-IicyiaPYGGI-unsplash.jpg",
    alt: "Wedding moment 3",
    height: 450,
  },
  {
    src: "/images/annie-spratt-ODXo72Oiyps-unsplash.jpg",
    alt: "Wedding moment 4",
    height: 380,
  },
  {
    src: "/images/annie-spratt-WOB4jXoTuGw-unsplash.jpg",
    alt: "Wedding moment 5",
    height: 420,
  },
];

interface ParallaxImageProps {
  src: string;
  alt: string;
  index: number;
  height: number;
}

const ParallaxImage = ({ src, alt, index, height }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for alternating images
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [-100, 100] : [-50, 50]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: `${height}px`, opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 z-10 pointer-events-none" />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index < 2}
        />
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 z-10 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

interface RevealImageProps {
  src: string;
  alt: string;
  index: number;
  height: number;
}

const RevealImage = ({ src, alt, index, height }: RevealImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "inset(0% 50% 0% 50%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 50% 0% 50%)",
    ]
  );

  const brightness = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1.1, 1.1, 0.7]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ clipPath, filter: `brightness(${brightness})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Gold tint overlay */}
        <div className="absolute inset-0 bg-gold/5 mix-blend-overlay z-10 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default function PhotoGallery() {
  return (
    <section className="relative w-full">
      {/* Gallery title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-16 px-4"
      >
        <h2 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl text-gold mb-4 font-bold">
          Pillanatok
        </h2>
        <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-navy/70">
          Moments of Love
        </p>
      </motion.div>

      {/* Photo strips with alternating effects */}
      <div className="space-y-0">
        {photos.map((photo, index) => (
          <div key={photo.src}>
            {index % 2 === 0 ? (
              <ParallaxImage
                src={photo.src}
                alt={photo.alt}
                index={index}
                height={photo.height}
              />
            ) : (
              <RevealImage
                src={photo.src}
                alt={photo.alt}
                index={index}
                height={photo.height}
              />
            )}
          </div>
        ))}
      </div>

      {/* Decorative bottom fade */}
      <div className="h-20 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
