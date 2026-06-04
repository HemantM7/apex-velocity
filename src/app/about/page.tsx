"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Users, Globe, Zap } from "lucide-react";

const milestones = [
  { year: "2008", event: "Founded in Geneva, Switzerland by former F1 engineers" },
  { year: "2010", event: "First prototype completes 1,000km endurance test" },
  { year: "2012", event: "APEX ONE wins Top Gear Hypercar of the Year" },
  { year: "2014", event: "Opens advanced composites facility in Stuttgart" },
  { year: "2016", event: "Launches first hybrid hypercar — APEX HYBRID" },
  { year: "2018", event: "Nürburgring production car record: 6:52" },
  { year: "2020", event: "Announces electric hypercar program" },
  { year: "2022", event: "VOLT R prototype achieves 0-60 in 1.8 seconds" },
  { year: "2024", event: "Opens new design studio in Los Angeles" },
  { year: "2025", event: "APEX X1 breaks Nürburgring record: 6:38" },
];

const values = [
  {
    icon: Zap,
    title: "Performance First",
    description: "Every decision, every component, every gram is evaluated against one criterion: does it make the car faster, more precise, more alive?",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "We build fewer than 100 vehicles per year. Each one receives the same attention as a bespoke timepiece from a master watchmaker.",
  },
  {
    icon: Users,
    title: "Driver-Centric Design",
    description: "Technology exists to serve the driver, not replace them. Our AI systems enhance human capability rather than diminish it.",
  },
  {
    icon: Globe,
    title: "Sustainable Performance",
    description: "The future of performance is electric. We're proving that sustainability and supercar performance are not just compatible — they're inseparable.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#02040A" }}>
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A] via-[#02040A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-[#02040A]/40" />

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
                OUR STORY
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
              BUILT BY
              <br />
              <span className="text-gradient-orange">OBSESSIVES</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="font-bebas text-white text-5xl mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              THE APEX PHILOSOPHY
            </h2>
            <div className="space-y-5 text-[#7B7F87] leading-relaxed">
              <p>
                We were founded on a simple but radical premise: that the world's most extraordinary automobiles had not yet been built. That somewhere between the laws of physics and the limits of human engineering, there existed a vehicle that could redefine what was possible.
              </p>
              <p>
                Seventeen years later, we're still chasing that vehicle. Every model we release is our best attempt at perfection — and every model reveals new possibilities we hadn't imagined.
              </p>
              <p>
                We don't build cars for the masses. We build them for the few who understand that a truly great car is not just a machine — it's a philosophy made physical. A statement about what humans can achieve when they refuse to accept limitations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "847", label: "Vehicles Built", sub: "Since 2008" },
              { value: "23", label: "World Records", sub: "Track & Road" },
              { value: "6", label: "Model Lines", sub: "Active 2025" },
              { value: "4", label: "Global Showrooms", sub: "London · NY · Dubai · Tokyo" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-lg"
                style={{
                  background: "#1A1A24",
                  border: "1px solid rgba(192, 192, 208, 0.1)",
                  borderTop: "1px solid rgba(192, 192, 208, 0.25)",
                }}
              >
                <p
                  className="font-bebas text-5xl text-[#FF5A1F] mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-white text-sm font-medium">{stat.label}</p>
                <p className="text-[#7B7F87] text-xs mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24" style={{ background: "#0B0F18" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF5A1F]" />
              <span
                className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                PRINCIPLES
              </span>
            </div>
            <h2
              className="font-bebas text-white text-5xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              WHAT WE STAND FOR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true });

              return (
                <motion.div
                  key={value.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 rounded-lg"
                  style={{
                    background: "#1A1A24",
                    border: "1px solid rgba(192, 192, 208, 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center rounded-lg mb-5">
                    <value.icon size={20} className="text-[#FF5A1F]" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-[#7B7F87] text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24" style={{ background: "#02040A" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF5A1F]" />
              <span
                className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                HISTORY
              </span>
            </div>
            <h2
              className="font-bebas text-white text-5xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              OUR JOURNEY
            </h2>
          </div>

          <div className="space-y-0">
            {milestones.map((milestone, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true });

              return (
                <motion.div
                  key={milestone.year}
                  ref={ref}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-8 py-5 border-b group hover:bg-white/2 transition-all"
                  style={{ borderColor: "rgba(192, 192, 208, 0.08)" }}
                >
                  <span
                    className="font-bebas text-3xl text-[#FF5A1F] w-20 flex-shrink-0"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {milestone.year}
                  </span>
                  <div className="w-px h-8 bg-[#FF5A1F]/30 flex-shrink-0" />
                  <p className="text-[#7B7F87] group-hover:text-white transition-colors">
                    {milestone.event}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-24 text-center"
        style={{ background: "#0B0F18" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <h2
            className="font-bebas text-white text-5xl mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            JOIN THE APEX FAMILY
          </h2>
          <p className="text-[#7B7F87] max-w-xl mx-auto mb-10">
            Owning an Apex Velocity is more than a purchase. It's membership in an exclusive community of performance enthusiasts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              VIEW COLLECTION
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 border border-white/20 text-white font-medium tracking-widest text-sm hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
