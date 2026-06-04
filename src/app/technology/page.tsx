"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Wind, Zap, Layers, Monitor, ArrowRight } from "lucide-react";
import { techFeatures } from "@/lib/data";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  wind: Wind,
  zap: Zap,
  layers: Layers,
  monitor: Monitor,
};

const innovations = [
  {
    year: "2008",
    title: "Founded",
    description: "Apex Velocity established by F1 engineers with a vision to redefine performance.",
  },
  {
    year: "2012",
    title: "Carbon Monocoque",
    description: "First production car with full T800 carbon fiber monocoque chassis.",
  },
  {
    year: "2016",
    title: "Hybrid Powertrain",
    description: "Pioneered the first 1,000HP hybrid hypercar powertrain.",
  },
  {
    year: "2019",
    title: "AI Integration",
    description: "Introduced neural performance AI processing 200 data points per second.",
  },
  {
    year: "2022",
    title: "800V Architecture",
    description: "Launched solid-state 800V battery platform for electric hypercars.",
  },
  {
    year: "2025",
    title: "APEX X1",
    description: "The world's most powerful road car. 1,800HP. 2.1 seconds. The future.",
  },
];

export default function TechnologyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: "#02040A" }}>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-end pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=90')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A] via-[#02040A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-[#02040A]/50" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            <h1
              className="font-bebas text-white leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3rem, 10vw, 8rem)",
                letterSpacing: "0.05em",
              }}
            >
              TECHNOLOGY
              <br />
              <span className="text-gradient-orange">BEYOND LIMITS</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Tech Features */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            const ref = useRef<HTMLDivElement>(null);
            const isInView = useInView(ref, { once: true });

            return (
              <motion.div
                key={feature.id}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div
                  className="p-8 rounded-lg h-full transition-all duration-300 hover:border-[#FF5A1F]/30"
                  style={{
                    background: "#1A1A24",
                    border: "1px solid rgba(192, 192, 208, 0.1)",
                    borderTop: "1px solid rgba(192, 192, 208, 0.25)",
                  }}
                >
                  <div className="w-14 h-14 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center rounded-lg mb-6 group-hover:bg-[#FF5A1F]/20 transition-all">
                    <Icon size={24} className="text-[#FF5A1F]" />
                  </div>

                  <h3
                    className="font-bebas text-white text-2xl mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-xs tracking-widest text-[#FF5A1F] mb-4"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {feature.subtitle}
                  </p>
                  <p className="text-[#7B7F87] text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.stats.map((stat) => (
                      <div
                        key={stat}
                        className="flex items-center gap-2 text-xs"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        <div className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
                        <span className="text-[#C0C0D0]">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div
        className="py-24"
        style={{ background: "#0B0F18" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF5A1F]" />
              <span
                className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                MILESTONES
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
              ENGINEERING
              <br />
              <span className="text-gradient-orange">TIMELINE</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
              style={{ background: "rgba(255, 90, 31, 0.2)" }}
            />

            <div className="space-y-12">
              {innovations.map((item, i) => {
                const ref = useRef<HTMLDivElement>(null);
                const isInView = useInView(ref, { once: true });

                return (
                  <motion.div
                    key={item.year}
                    ref={ref}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className={`relative flex items-center gap-8 ${
                      i % 2 === 0
                        ? "lg:flex-row pl-8 lg:pl-0 lg:pr-[calc(50%+2rem)]"
                        : "lg:flex-row-reverse pl-8 lg:pl-[calc(50%+2rem)]"
                    }`}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-0 lg:left-1/2 w-3 h-3 rounded-full bg-[#FF5A1F] -translate-x-1/2 border-2 border-[#02040A]"
                      style={{ boxShadow: "0 0 10px rgba(255, 90, 31, 0.5)" }}
                    />

                    <div
                      className="p-6 rounded-lg flex-1"
                      style={{
                        background: "#1A1A24",
                        border: "1px solid rgba(192, 192, 208, 0.1)",
                      }}
                    >
                      <p
                        className="font-bebas text-[#FF5A1F] text-3xl mb-1"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {item.year}
                      </p>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-[#7B7F87] text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center" style={{ background: "#02040A" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <h2
            className="font-bebas text-white text-5xl mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            EXPERIENCE THE TECHNOLOGY
          </h2>
          <p className="text-[#7B7F87] max-w-xl mx-auto mb-10">
            The best way to understand our technology is to feel it. Book a test drive and experience the future of performance firsthand.
          </p>
          <Link
            href="/test-drive"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            BOOK TEST DRIVE
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
