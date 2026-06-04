"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { dealers } from "@/lib/data";
import Link from "next/link";

export default function DealersPage() {
  const [activeDealer, setActiveDealer] = useState(dealers[0]);

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              GLOBAL NETWORK
            </span>
          </div>
          <h1
            className="font-bebas text-white leading-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "0.05em",
            }}
          >
            FIND A DEALER
          </h1>
          <p className="text-[#7B7F87] max-w-xl">
            Our global network of showrooms offers an unparalleled experience. Visit us to see our vehicles in person and speak with our specialists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              aspectRatio: "4/3",
              background: "#0B0F18",
              border: "1px solid rgba(192, 192, 208, 0.1)",
            }}
          >
            {/* Stylized map */}
            <div className="absolute inset-0 grid-overlay opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* World map SVG placeholder */}
                <svg viewBox="0 0 800 400" className="w-full h-full opacity-20">
                  <path d="M100,200 Q200,150 300,200 Q400,250 500,200 Q600,150 700,200" stroke="#FF5A1F" strokeWidth="1" fill="none" />
                  <path d="M50,150 Q150,100 250,150 Q350,200 450,150 Q550,100 650,150 Q750,200 800,150" stroke="#C0C0D0" strokeWidth="0.5" fill="none" />
                </svg>

                {/* Dealer pins */}
                {dealers.map((dealer, i) => {
                  const positions = [
                    { x: "25%", y: "35%" },
                    { x: "20%", y: "40%" },
                    { x: "55%", y: "45%" },
                    { x: "75%", y: "42%" },
                  ];
                  const pos = positions[i];
                  return (
                    <button
                      key={dealer.id}
                      onClick={() => setActiveDealer(dealer)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: pos.x, top: pos.y }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all ${
                          activeDealer.id === dealer.id
                            ? "bg-[#FF5A1F] border-[#FF5A1F] scale-150"
                            : "bg-[#FF5A1F]/40 border-[#FF5A1F] hover:scale-125"
                        }`}
                        style={{
                          boxShadow: activeDealer.id === dealer.id
                            ? "0 0 15px rgba(255, 90, 31, 0.6)"
                            : "none",
                        }}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <div
                          className="px-2 py-1 text-xs text-white rounded"
                          style={{ background: "#1A1A24", border: "1px solid rgba(255, 90, 31, 0.3)" }}
                        >
                          {dealer.name.split(" ").pop()}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active dealer overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div
                className="p-4 rounded-lg"
                style={{ background: "rgba(11, 15, 24, 0.9)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 90, 31, 0.2)" }}
              >
                <p
                  className="font-bebas text-white text-lg"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  {activeDealer.name}
                </p>
                <p className="text-xs text-[#7B7F87]">{activeDealer.address}</p>
              </div>
            </div>
          </div>

          {/* Dealer list */}
          <div className="space-y-4">
            {dealers.map((dealer, i) => (
              <motion.button
                key={dealer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveDealer(dealer)}
                className={`w-full p-6 rounded-lg text-left transition-all border ${
                  activeDealer.id === dealer.id
                    ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                    : "border-white/10 hover:border-white/30"
                }`}
                style={{ background: activeDealer.id === dealer.id ? undefined : "#1A1A24" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="font-bebas text-white text-xl"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                    >
                      {dealer.name}
                    </h3>
                    {activeDealer.id === dealer.id && (
                      <span
                        className="text-[10px] text-[#FF5A1F]"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        SELECTED
                      </span>
                    )}
                  </div>
                  <ArrowRight
                    size={16}
                    className={`transition-all ${activeDealer.id === dealer.id ? "text-[#FF5A1F]" : "text-[#7B7F87]"}`}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#7B7F87] text-sm">
                    <MapPin size={13} className="text-[#FF5A1F] flex-shrink-0" />
                    <span>{dealer.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7B7F87] text-sm">
                    <Phone size={13} className="text-[#FF5A1F] flex-shrink-0" />
                    <span>{dealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7B7F87] text-sm">
                    <Mail size={13} className="text-[#FF5A1F] flex-shrink-0" />
                    <span>{dealer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7B7F87] text-sm">
                    <Clock size={13} className="text-[#FF5A1F] flex-shrink-0" />
                    <span>{dealer.hours}</span>
                  </div>
                </div>

                {activeDealer.id === dealer.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                    <Link
                      href="/test-drive"
                      className="flex-1 py-2.5 bg-[#FF5A1F] text-black text-xs font-semibold tracking-widest text-center hover:bg-[#FF7A3F] transition-colors"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      BOOK TEST DRIVE
                    </Link>
                    <a
                      href={`tel:${dealer.phone}`}
                      className="px-4 py-2.5 border border-white/20 text-[#7B7F87] text-xs tracking-wider hover:border-[#FF5A1F] hover:text-white transition-all"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      CALL
                    </a>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
