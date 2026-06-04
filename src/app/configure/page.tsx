"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Check, ChevronRight, RotateCcw, Share2, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const wheelOptions = [
  { id: "standard", name: "Standard Alloy", price: 0, description: "20\" Forged Alloy" },
  { id: "sport", name: "Sport Carbon", price: 8500, description: "21\" Carbon Fiber" },
  { id: "track", name: "Track Edition", price: 15000, description: "20\" Lightweight Magnesium" },
  { id: "luxury", name: "Luxury Chrome", price: 6000, description: "22\" Polished Chrome" },
];

const interiorOptions = [
  { id: "alcantara", name: "Alcantara Black", price: 0, description: "Full Alcantara Interior" },
  { id: "leather", name: "Nappa Leather", price: 12000, description: "Hand-stitched Nappa" },
  { id: "carbon", name: "Carbon & Alcantara", price: 22000, description: "Racing-inspired" },
  { id: "bespoke", name: "Bespoke Luxury", price: 45000, description: "Custom Tailored" },
];

const performancePacks = [
  { id: "none", name: "Standard", price: 0, description: "Factory specification" },
  { id: "sport", name: "Sport Pack", price: 18000, description: "+50HP, Sport Exhaust" },
  { id: "track", name: "Track Pack", price: 45000, description: "+120HP, Roll Cage, Harness" },
  { id: "ultimate", name: "Ultimate Pack", price: 85000, description: "+200HP, Full Aero Kit" },
];

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const modelId = searchParams.get("model") || vehicles[0].id;
  const vehicle = vehicles.find((v) => v.id === modelId) || vehicles[0];

  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0]);
  const [selectedWheel, setSelectedWheel] = useState(wheelOptions[0]);
  const [selectedInterior, setSelectedInterior] = useState(interiorOptions[0]);
  const [selectedPack, setSelectedPack] = useState(performancePacks[0]);
  const [activeSection, setActiveSection] = useState("color");

  const totalPrice =
    vehicle.price +
    selectedWheel.price +
    selectedInterior.price +
    selectedPack.price;

  const sections = [
    { id: "color", label: "Exterior Color" },
    { id: "wheels", label: "Wheels" },
    { id: "interior", label: "Interior" },
    { id: "performance", label: "Performance" },
  ];

  return (
    <div className="min-h-screen pt-16" style={{ background: "#02040A" }}>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Left: Visual */}
        <div className="relative flex-1 lg:h-full h-[50vh] overflow-hidden">
          <motion.div
            key={selectedColor.hex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
          />
          {/* Color tint overlay */}
          <div
            className="absolute inset-0 mix-blend-color opacity-20 transition-all duration-500"
            style={{ background: selectedColor.hex }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#02040A]/30" />

          {/* Vehicle info overlay */}
          <div className="absolute bottom-8 left-8">
            <p
              className="text-xs tracking-widest text-[#FF5A1F] mb-1"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              CONFIGURING
            </p>
            <h2
              className="font-bebas text-white text-5xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              {vehicle.name}
            </h2>
            <p className="text-[#7B7F87] text-sm mt-1">{selectedColor.name}</p>
          </div>

          {/* Rotate hint */}
          <div className="absolute top-8 right-8 flex items-center gap-2 text-[#7B7F87] text-xs">
            <RotateCcw size={14} />
            <span style={{ fontFamily: "'Space Mono', monospace" }}>DRAG TO ROTATE</span>
          </div>
        </div>

        {/* Right: Configuration Panel */}
        <div
          className="w-full lg:w-[420px] flex flex-col overflow-y-auto no-scrollbar"
          style={{ background: "#0B0F18", borderLeft: "1px solid rgba(192, 192, 208, 0.1)" }}
        >
          {/* Section tabs */}
          <div
            className="flex border-b"
            style={{ borderColor: "rgba(192, 192, 208, 0.1)" }}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 py-4 text-[10px] tracking-widest transition-all ${
                  activeSection === section.id
                    ? "text-[#FF5A1F] border-b-2 border-[#FF5A1F]"
                    : "text-[#7B7F87] hover:text-white"
                }`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {section.label.split(" ")[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* Section content */}
          <div className="flex-1 p-6">
            <AnimatePresence mode="wait">
              {activeSection === "color" && (
                <motion.div
                  key="color"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3
                    className="font-bebas text-white text-2xl mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    EXTERIOR COLOR
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {vehicle.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`p-3 rounded-lg border transition-all text-left ${
                          selectedColor.name === color.name
                            ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div
                          className="w-full h-12 rounded mb-2 border border-white/10"
                          style={{ background: color.hex }}
                        />
                        <p className="text-xs text-white font-medium">{color.name}</p>
                        {selectedColor.name === color.name && (
                          <div className="flex items-center gap-1 mt-1">
                            <Check size={10} className="text-[#FF5A1F]" />
                            <span
                              className="text-[10px] text-[#FF5A1F]"
                              style={{ fontFamily: "'Space Mono', monospace" }}
                            >
                              SELECTED
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "wheels" && (
                <motion.div
                  key="wheels"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3
                    className="font-bebas text-white text-2xl mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    WHEEL OPTIONS
                  </h3>
                  <div className="space-y-3">
                    {wheelOptions.map((wheel) => (
                      <button
                        key={wheel.id}
                        onClick={() => setSelectedWheel(wheel)}
                        className={`w-full p-4 rounded-lg border transition-all text-left flex items-center justify-between ${
                          selectedWheel.id === wheel.id
                            ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <p className="text-white text-sm font-medium">{wheel.name}</p>
                          <p className="text-[#7B7F87] text-xs mt-0.5">{wheel.description}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-sm font-bebas text-[#FF5A1F]"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {wheel.price === 0 ? "INCLUDED" : `+${formatPrice(wheel.price)}`}
                          </p>
                          {selectedWheel.id === wheel.id && (
                            <Check size={14} className="text-[#FF5A1F] ml-auto mt-1" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "interior" && (
                <motion.div
                  key="interior"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3
                    className="font-bebas text-white text-2xl mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    INTERIOR TRIM
                  </h3>
                  <div className="space-y-3">
                    {interiorOptions.map((interior) => (
                      <button
                        key={interior.id}
                        onClick={() => setSelectedInterior(interior)}
                        className={`w-full p-4 rounded-lg border transition-all text-left flex items-center justify-between ${
                          selectedInterior.id === interior.id
                            ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <p className="text-white text-sm font-medium">{interior.name}</p>
                          <p className="text-[#7B7F87] text-xs mt-0.5">{interior.description}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-sm font-bebas text-[#FF5A1F]"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {interior.price === 0 ? "INCLUDED" : `+${formatPrice(interior.price)}`}
                          </p>
                          {selectedInterior.id === interior.id && (
                            <Check size={14} className="text-[#FF5A1F] ml-auto mt-1" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "performance" && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3
                    className="font-bebas text-white text-2xl mb-6"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    PERFORMANCE PACKS
                  </h3>
                  <div className="space-y-3">
                    {performancePacks.map((pack) => (
                      <button
                        key={pack.id}
                        onClick={() => setSelectedPack(pack)}
                        className={`w-full p-4 rounded-lg border transition-all text-left flex items-center justify-between ${
                          selectedPack.id === pack.id
                            ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <p className="text-white text-sm font-medium">{pack.name}</p>
                          <p className="text-[#7B7F87] text-xs mt-0.5">{pack.description}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-sm font-bebas text-[#FF5A1F]"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {pack.price === 0 ? "INCLUDED" : `+${formatPrice(pack.price)}`}
                          </p>
                          {selectedPack.id === pack.id && (
                            <Check size={14} className="text-[#FF5A1F] ml-auto mt-1" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price summary */}
          <div
            className="p-6 border-t"
            style={{ borderColor: "rgba(192, 192, 208, 0.1)", background: "#02040A" }}
          >
            {/* Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-[#7B7F87]">
                <span>Base Price</span>
                <span>{formatPrice(vehicle.price)}</span>
              </div>
              {selectedWheel.price > 0 && (
                <div className="flex justify-between text-xs text-[#7B7F87]">
                  <span>{selectedWheel.name}</span>
                  <span>+{formatPrice(selectedWheel.price)}</span>
                </div>
              )}
              {selectedInterior.price > 0 && (
                <div className="flex justify-between text-xs text-[#7B7F87]">
                  <span>{selectedInterior.name}</span>
                  <span>+{formatPrice(selectedInterior.price)}</span>
                </div>
              )}
              {selectedPack.price > 0 && (
                <div className="flex justify-between text-xs text-[#7B7F87]">
                  <span>{selectedPack.name}</span>
                  <span>+{formatPrice(selectedPack.price)}</span>
                </div>
              )}
            </div>

            <div
              className="flex justify-between items-center py-3 border-t border-b mb-4"
              style={{ borderColor: "rgba(192, 192, 208, 0.1)" }}
            >
              <span
                className="text-xs tracking-widest text-[#7B7F87]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                TOTAL PRICE
              </span>
              <span
                className="font-bebas text-2xl text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-[#FF5A1F] text-black text-xs font-semibold tracking-widest hover:bg-[#FF7A3F] transition-colors flex items-center justify-center gap-2">
                ORDER NOW
                <ArrowRight size={12} />
              </button>
              <button className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#7B7F87] hover:border-[#FF5A1F] hover:text-white transition-all">
                <Share2 size={14} />
              </button>
              <button className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#7B7F87] hover:border-[#FF5A1F] hover:text-white transition-all">
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#02040A" }}>
        <div className="text-[#7B7F87]">Loading configurator...</div>
      </div>
    }>
      <ConfiguratorContent />
    </Suspense>
  );
}
