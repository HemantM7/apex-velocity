"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "#0B0F18" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-[#0B0F18]" />

      {/* Orange glow */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 90, 31, 1) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              EXPERIENCE THE APEX
            </span>
            <div className="w-8 h-px bg-[#FF5A1F]" />
          </div>

          <h2
            className="font-bebas text-white leading-none mb-6"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "0.05em",
            }}
          >
            YOUR DREAM
            <br />
            <span className="text-gradient-orange">AWAITS</span>
          </h2>

          <p className="text-[#7B7F87] text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Schedule a private viewing at your nearest Apex Velocity showroom.
            Our specialists will guide you through every detail of your perfect
            vehicle.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/test-drive"
              className="btn-skew px-10 py-5 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors duration-200 flex items-center gap-2"
              style={{
                clipPath:
                  "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              }}
            >
              BOOK TEST DRIVE
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/dealers"
              className="btn-skew px-10 py-5 border border-white/20 text-white font-semibold tracking-widest text-sm hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all duration-200"
              style={{
                clipPath:
                  "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              }}
            >
              FIND A DEALER
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
