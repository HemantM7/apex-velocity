"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specs = [
  { label: "HORSEPOWER", value: "1,800", unit: "HP", description: "Quad-Turbo V16 Hybrid" },
  { label: "TOP SPEED", value: "310", unit: "MPH", description: "Electronically Limited" },
  { label: "0–60 MPH", value: "2.1", unit: "SEC", description: "Launch Control Active" },
  { label: "TORQUE", value: "1,600", unit: "LB-FT", description: "Peak Combined Output" },
  { label: "DOWNFORCE", value: "1,200", unit: "KG", description: "At Maximum Speed" },
  { label: "WEIGHT", value: "1,250", unit: "KG", description: "Carbon Fiber Chassis" },
];

export function SpecsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{ background: "#0B0F18" }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent opacity-50" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p
                className="text-[10px] tracking-widest text-[#7B7F87] mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {spec.label}
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span
                  className="font-bebas text-4xl text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {spec.value}
                </span>
                <span
                  className="text-xs text-[#FF5A1F]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {spec.unit}
                </span>
              </div>
              <p className="text-[11px] text-[#7B7F87]">{spec.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
