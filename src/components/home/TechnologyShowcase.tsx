"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Cpu, Wind, Zap, Layers, Monitor, ArrowRight } from "lucide-react";
import Link from "next/link";
import { techFeatures } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  wind: Wind,
  zap: Zap,
  layers: Layers,
  monitor: Monitor,
};

export function TechnologyShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);

  const active = techFeatures[activeFeature];
  const Icon = iconMap[active.icon];

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0B0F18" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 90, 31, 1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              INNOVATION
            </span>
          </div>
          <h2
            className="font-bebas text-white leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "0.05em",
            }}
          >
            TECHNOLOGY
            <br />
            <span className="text-gradient-orange">BEYOND LIMITS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Feature tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-2"
          >
            {techFeatures.map((feature, i) => {
              const FeatureIcon = iconMap[feature.icon];
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(i)}
                  className={`flex items-center gap-4 p-4 rounded-lg text-left transition-all duration-300 ${
                    activeFeature === i
                      ? "glass-orange border-l-2 border-[#FF5A1F]"
                      : "hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded ${
                      activeFeature === i
                        ? "bg-[#FF5A1F] text-black"
                        : "bg-white/5 text-[#7B7F87]"
                    }`}
                  >
                    <FeatureIcon size={18} />
                  </div>
                  <div>
                    <p
                      className={`font-medium text-sm ${
                        activeFeature === i ? "text-white" : "text-[#7B7F87]"
                      }`}
                    >
                      {feature.title}
                    </p>
                    <p className="text-xs text-[#7B7F87] mt-0.5">
                      {feature.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Feature detail */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {/* Visual */}
                <div
                  className="relative rounded-lg overflow-hidden mb-6"
                  style={{ aspectRatio: "16/9" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] via-[#0B0F18]/40 to-transparent" />

                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center pulse-glow">
                      <Icon size={36} className="text-[#FF5A1F]" />
                    </div>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    {active.stats.map((stat) => (
                      <div
                        key={stat}
                        className="glass px-3 py-2 rounded text-xs text-white"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="font-bebas text-white text-3xl mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {active.title}
                  </h3>
                  <p
                    className="text-xs tracking-widest text-[#FF5A1F] mb-4"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {active.subtitle}
                  </p>
                  <p className="text-[#7B7F87] leading-relaxed mb-6">
                    {active.description}
                  </p>
                  <Link
                    href="/technology"
                    className="flex items-center gap-2 text-sm text-[#FF5A1F] hover:gap-3 transition-all group"
                  >
                    Learn More
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
