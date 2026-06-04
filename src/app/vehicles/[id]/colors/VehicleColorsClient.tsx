"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Info, Palette, ShoppingBag } from "lucide-react";
import type { Vehicle, VehicleColor } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface Props {
  vehicle: Vehicle;
}

const typeLabels: Record<VehicleColor["type"], string> = {
  gloss: "Gloss",
  matte: "Matte",
  satin: "Satin",
  metallic: "Metallic",
  carbon: "Carbon Fibre",
};

const typeBadgeStyle: Record<VehicleColor["type"], string> = {
  gloss:    "bg-blue-500/10 border-blue-400/30 text-blue-300",
  matte:    "bg-zinc-500/10 border-zinc-400/30 text-zinc-300",
  satin:    "bg-purple-500/10 border-purple-400/30 text-purple-300",
  metallic: "bg-yellow-500/10 border-yellow-400/30 text-yellow-300",
  carbon:   "bg-[#FF5A1F]/10 border-[#FF5A1F]/30 text-[#FF5A1F]",
};

export function VehicleColorsClient({ vehicle }: Props) {
  const [active, setActive] = useState<VehicleColor>(vehicle.colors[0]);
  const [hovered, setHovered] = useState<VehicleColor | null>(null);

  const displayed = hovered ?? active;

  return (
    <div className="min-h-screen" style={{ background: "#02040A" }}>
      {/* Full-bleed visual */}
      <div className="relative h-screen overflow-hidden">
        {/* Car image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayed.hex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
          />
        </AnimatePresence>

        {/* Colour tint wash */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: displayed.hex + "22" }}
          transition={{ duration: 0.4 }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A]/80 via-transparent to-[#02040A]/40" />

        {/* Colour glow bloom */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-30 pointer-events-none rounded-full"
          animate={{ backgroundColor: displayed.hex }}
          transition={{ duration: 0.5 }}
        />

        {/* Top nav */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-24 px-6 lg:px-20">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <Link
              href={`/vehicles/${vehicle.id}`}
              className="flex items-center gap-2 text-[#7B7F87] hover:text-white transition-colors text-sm group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              {vehicle.name}
            </Link>
            <div className="flex items-center gap-3">
              <Palette size={14} className="text-[#FF5A1F]" />
              <span
                className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                COLOUR STUDIO
              </span>
            </div>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-10 px-6 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

              {/* Left — colour info */}
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayed.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-[10px] tracking-widest border rounded mb-4 ${typeBadgeStyle[displayed.type]}`}
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {typeLabels[displayed.type].toUpperCase()} FINISH
                    </span>

                    <h1
                      className="font-bebas text-white leading-none mb-2"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(2.5rem, 7vw, 6rem)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {displayed.name}
                    </h1>

                    <p className="text-[#7B7F87] max-w-sm leading-relaxed mb-4">
                      {displayed.description}
                    </p>

                    <div className="flex items-center gap-6">
                      <div>
                        <p
                          className="text-[10px] tracking-widest text-[#7B7F87]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          COLOUR SURCHARGE
                        </p>
                        <p
                          className="font-bebas text-2xl text-white"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {displayed.priceAdd === 0 ? "NO CHARGE" : `+${formatPrice(displayed.priceAdd)}`}
                        </p>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div>
                        <p
                          className="text-[10px] tracking-widest text-[#7B7F87]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          TOTAL FROM
                        </p>
                        <p
                          className="font-bebas text-2xl text-[#FF5A1F]"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {formatPrice(vehicle.price + displayed.priceAdd)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right — colour swatches */}
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] text-[#7B7F87] mb-4"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {vehicle.colors.length} COLOURS AVAILABLE
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {vehicle.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setActive(color)}
                      onMouseEnter={() => setHovered(color)}
                      onMouseLeave={() => setHovered(null)}
                      title={color.name}
                      className="relative group"
                      aria-label={`Select ${color.name}`}
                    >
                      {/* Outer ring */}
                      <div
                        className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-200 ${
                          active.name === color.name
                            ? "border-[#FF5A1F] opacity-100"
                            : "border-transparent opacity-0 group-hover:opacity-60 group-hover:border-white/40"
                        }`}
                      />
                      {/* Swatch */}
                      <div
                        className="w-10 h-10 rounded-full border border-white/20 transition-transform duration-200 group-hover:scale-110"
                        style={{ background: color.hex }}
                      />
                      {/* Selected tick */}
                      {active.name === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            size={14}
                            className={
                              color.hex.toLowerCase() === "#f0f0f5" ||
                              color.hex.toLowerCase() === "#f5f5f0" ||
                              color.hex.toLowerCase() === "#f8f8ff" ||
                              color.hex.toLowerCase() === "#e8e8e0" ||
                              color.hex.toLowerCase() === "#e8ff00"
                                ? "text-black"
                                : "text-white"
                            }
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/vehicles/${vehicle.id}/order?color=${encodeURIComponent(active.name)}`}
                    className="btn-skew flex items-center gap-2 px-7 py-3.5 bg-[#FF5A1F] text-black font-semibold tracking-widest text-xs hover:bg-[#FF7A3F] transition-colors"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    <ShoppingBag size={13} />
                    ORDER IN {active.name.toUpperCase()}
                  </Link>
                  <Link
                    href={`/configure?model=${vehicle.id}`}
                    className="btn-skew flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-medium tracking-widest text-xs hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    FULL CONFIGURATOR
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colour detail grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#FF5A1F]" />
          <span
            className="text-xs tracking-[0.3em] text-[#FF5A1F]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            FULL PALETTE
          </span>
        </div>
        <h2
          className="font-bebas text-white leading-none mb-12"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "0.05em",
          }}
        >
          EVERY SHADE,
          <br />
          <span className="text-gradient-orange">PRECISELY CRAFTED</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicle.colors.map((color, i) => (
            <motion.button
              key={color.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => {
                setActive(color);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left rounded-lg overflow-hidden transition-all duration-300 group ${
                active.name === color.name
                  ? "ring-2 ring-[#FF5A1F]"
                  : "ring-1 ring-white/10 hover:ring-white/30"
              }`}
            >
              {/* Big swatch */}
              <div
                className="relative h-48 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ background: color.hex }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

                {/* Finish texture hint for matte/satin */}
                {(color.type === "matte" || color.type === "satin") && (
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    }}
                  />
                )}

                {/* Selected badge */}
                {active.name === color.name && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#FF5A1F] flex items-center justify-center">
                    <Check size={13} className="text-black" />
                  </div>
                )}

                {/* Type badge */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] tracking-widest border rounded ${typeBadgeStyle[color.type]}`}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {typeLabels[color.type].toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div
                className="p-5"
                style={{
                  background: "#1A1A24",
                  borderTop: "1px solid rgba(192,192,208,0.1)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold">{color.name}</h3>
                  <span
                    className="text-xs text-[#FF5A1F] font-bebas"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}
                  >
                    {color.priceAdd === 0 ? "STANDARD" : `+${formatPrice(color.priceAdd)}`}
                  </span>
                </div>
                <p className="text-[#7B7F87] text-xs leading-relaxed">{color.description}</p>

                <div className="mt-4 flex items-center gap-2 text-[#FF5A1F] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span style={{ fontFamily: "'Space Mono', monospace" }}>SELECT THIS COLOUR</span>
                  <ArrowRight size={11} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Finish guide */}
        <div
          className="mt-16 p-8 rounded-lg"
          style={{ background: "#0B0F18", border: "1px solid rgba(192,192,208,0.1)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Info size={16} className="text-[#FF5A1F]" />
            <h3
              className="font-bebas text-white text-xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              FINISH GUIDE
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {(Object.entries(typeLabels) as [VehicleColor["type"], string][]).map(([type, label]) => (
              <div key={type}>
                <div
                  className={`inline-flex px-2.5 py-1 text-[10px] tracking-widest border rounded mb-2 ${typeBadgeStyle[type]}`}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {label.toUpperCase()}
                </div>
                <p className="text-[#7B7F87] text-xs leading-relaxed">
                  {type === "gloss" && "High-gloss clear coat with maximum depth and reflection. Showroom-ready finish."}
                  {type === "matte" && "Flat, non-reflective finish. Light-absorbing and contemporary. Requires specialist care."}
                  {type === "satin" && "Between gloss and matte — a subtle sheen that transforms under different light."}
                  {type === "metallic" && "Aluminium-fleck paint with dimensional depth that shifts with viewing angle."}
                  {type === "carbon" && "Exposed weave carbon fibre with tinted clear coat. Structural and visual perfection."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
