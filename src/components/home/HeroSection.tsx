"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

const stats = [
  { label: "HORSEPOWER", value: "1,800", unit: "HP" },
  { label: "TOP SPEED", value: "310", unit: "MPH" },
  { label: "0–60 MPH", value: "2.1", unit: "SEC" },
  { label: "TORQUE", value: "1,600", unit: "LB-FT" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [currentStat, setCurrentStat] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden flex items-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90')",
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A] via-[#02040A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-[#02040A]/40" />
        {/* Orange glow */}
        <div
          className="absolute bottom-0 right-0 w-[60%] h-[60%] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 80% 80%, rgba(255, 90, 31, 0.6) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 grid-overlay opacity-30" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-20 w-full"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              APEX VELOCITY — 2025
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas leading-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 12vw, 9rem)",
              letterSpacing: "0.05em",
              lineHeight: 0.9,
            }}
          >
            <span className="block text-white">APEX</span>
            <span className="block text-gradient-orange">X1</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[#7B7F87] text-lg max-w-md mb-10 leading-relaxed"
          >
            The pinnacle of human engineering. 1,800 horsepower. 2.1 seconds.
            The future of performance is here.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              href="/collection"
              className="btn-skew px-8 py-4 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors duration-200"
              style={{
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              EXPLORE COLLECTION
            </Link>
            <Link
              href="/configure"
              className="btn-skew px-8 py-4 border border-white/20 text-white font-semibold tracking-widest text-sm hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all duration-200"
              style={{
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              CONFIGURE VEHICLE
            </Link>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-all duration-500 ${
                  i === currentStat ? "opacity-100" : "opacity-40"
                }`}
              >
                <div
                  className="text-xs tracking-widest text-[#7B7F87] mb-1"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-bebas text-3xl text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs text-[#FF5A1F]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {stat.unit}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Sound toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => setMuted(!muted)}
        className="absolute bottom-8 right-8 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-[#7B7F87] hover:text-white hover:border-[#FF5A1F] transition-all duration-200"
        aria-label="Toggle sound"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-widest text-[#7B7F87]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-[#FF5A1F]" />
        </motion.div>
      </motion.div>

      {/* Side label */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <div
          className="text-[10px] tracking-[0.3em] text-[#7B7F87] rotate-90 origin-center"
          style={{ fontFamily: "'Space Mono', monospace", writingMode: "vertical-rl" }}
        >
          HYPERCAR · 2025 · LIMITED EDITION
        </div>
      </div>
    </section>
  );
}
