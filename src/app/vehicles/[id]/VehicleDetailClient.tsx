"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Gauge,
  Timer,
  Weight,
  Wind,
  Settings,
  Heart,
  Share2,
  Download,
  Palette,
  ShoppingBag,
} from "lucide-react";
import type { Vehicle } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface Props {
  vehicle: Vehicle;
  related: Vehicle[];
}

export function VehicleDetailClient({ vehicle, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [wishlisted, setWishlisted] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);
  const isSpecsInView = useInView(specsRef, { once: true });

  const allImages = [vehicle.images.hero, ...vehicle.images.gallery];

  const specItems = [
    { icon: Zap, label: "Horsepower", value: `${vehicle.specs.horsepower.toLocaleString()} HP` },
    { icon: Gauge, label: "Top Speed", value: `${vehicle.specs.topSpeed} MPH` },
    { icon: Timer, label: "0–60 MPH", value: `${vehicle.specs.acceleration} sec` },
    { icon: Zap, label: "Torque", value: `${vehicle.specs.torque.toLocaleString()} lb-ft` },
    { icon: Weight, label: "Weight", value: `${vehicle.specs.weight.toLocaleString()} kg` },
    { icon: Wind, label: "Drag Coefficient", value: `Cd ${vehicle.specs.aeroDrag}` },
    { icon: Settings, label: "Engine", value: vehicle.specs.engine },
    { icon: Settings, label: "Transmission", value: vehicle.specs.transmission },
    { icon: Settings, label: "Drivetrain", value: vehicle.specs.drivetrain },
    ...(vehicle.specs.range
      ? [{ icon: Zap, label: "Electric Range", value: `${vehicle.specs.range} km` }]
      : []),
  ];

  const tabs = ["overview", "specifications", "gallery", "technology"];

  return (
    <div className="min-h-screen" style={{ background: "#02040A" }}>
      {/* Hero */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('${allImages[activeImage]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A] via-[#02040A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-[#02040A]/30" />

        {/* Orange glow */}
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at 80% 80%, rgba(255, 90, 31, 1) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-xs text-[#7B7F87]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
              <span>/</span>
              <span className="text-[#FF5A1F]">{vehicle.name}</span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                {vehicle.badge && (
                  <span
                    className="inline-block px-3 py-1 text-[10px] tracking-widest text-[#FF5A1F] mb-4"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      background: "rgba(255, 90, 31, 0.15)",
                      border: "1px solid rgba(255, 90, 31, 0.4)",
                    }}
                  >
                    {vehicle.badge}
                  </span>
                )}
                <h1
                  className="font-bebas text-white leading-none mb-2"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {vehicle.name}
                </h1>
                <p className="text-[#7B7F87] text-lg max-w-lg">{vehicle.tagline}</p>
              </div>

              <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                  <p
                    className="text-xs tracking-widest text-[#7B7F87]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    STARTING FROM
                  </p>
                  <p
                    className="font-bebas text-4xl text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-[#FF5A1F] transition-all"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={18}
                      className={wishlisted ? "fill-[#FF5A1F] text-[#FF5A1F]" : "text-white"}
                    />
                  </button>
                  <button
                    className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-[#FF5A1F] transition-all"
                    aria-label="Share"
                  >
                    <Share2 size={18} className="text-white" />
                  </button>
                  <Link
                    href={`/vehicles/${vehicle.id}/order`}
                    className="btn-skew px-6 py-3 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors flex items-center gap-2"
                    style={{
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    ORDER NOW
                    <ShoppingBag size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image thumbnails */}
        {allImages.length > 1 && (
          <div className="absolute bottom-6 right-6 lg:right-20 z-10 flex gap-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-10 overflow-hidden border-2 transition-all ${
                  activeImage === i ? "border-[#FF5A1F]" : "border-transparent opacity-50"
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick stats bar */}
      <div
        className="border-y"
        style={{
          background: "#0B0F18",
          borderColor: "rgba(192, 192, 208, 0.1)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "HORSEPOWER", value: `${vehicle.specs.horsepower.toLocaleString()}`, unit: "HP" },
              { label: "TOP SPEED", value: `${vehicle.specs.topSpeed}`, unit: "MPH" },
              { label: "0–60 MPH", value: `${vehicle.specs.acceleration}`, unit: "SEC" },
              { label: "TORQUE", value: `${vehicle.specs.torque.toLocaleString()}`, unit: "LB-FT" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-[10px] tracking-widest text-[#7B7F87] mb-1"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {stat.label}
                </p>
                <div className="flex items-baseline justify-center gap-1">
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
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="sticky top-16 z-30 border-b"
        style={{
          background: "rgba(2, 4, 10, 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(192, 192, 208, 0.1)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm tracking-widest border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "border-[#FF5A1F] text-[#FF5A1F]"
                    : "border-transparent text-[#7B7F87] hover:text-white"
                }`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-16">
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <div>
              <h2
                className="font-bebas text-white text-4xl mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
              >
                DESIGN PHILOSOPHY
              </h2>
              <p className="text-[#7B7F87] leading-relaxed mb-6">{vehicle.description}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {vehicle.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded"
                    style={{ background: "rgba(255, 90, 31, 0.05)", border: "1px solid rgba(255, 90, 31, 0.15)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] flex-shrink-0" />
                    <span className="text-sm text-[#C0C0D0]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Color options */}
              <h3
                className="font-bebas text-white text-2xl mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
              >
                AVAILABLE COLORS
              </h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {vehicle.colors.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-[#FF5A1F] transition-all cursor-pointer"
                      style={{ background: color.hex }}
                      title={color.name}
                    />
                    <span className="text-[10px] text-[#7B7F87] text-center max-w-[60px] leading-tight">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/vehicles/${vehicle.id}/colors`}
                className="inline-flex items-center gap-1.5 text-xs text-[#7B7F87] hover:text-[#FF5A1F] transition-colors mb-10"
              >
                <Palette size={12} />
                <span style={{ fontFamily: "'Space Mono', monospace" }}>
                  VIEW ALL FINISHES IN COLOUR STUDIO →
                </span>
              </Link>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  href={`/vehicles/${vehicle.id}/order`}
                  className="w-full py-4 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm text-center hover:bg-[#FF7A3F] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <ShoppingBag size={14} />
                  ORDER YOUR {vehicle.name}
                </Link>
                <Link
                  href={`/vehicles/${vehicle.id}/colors`}
                  className="w-full py-4 border border-[#FF5A1F]/40 text-[#FF5A1F] font-medium tracking-widest text-sm text-center hover:bg-[#FF5A1F]/5 transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Palette size={14} />
                  EXPLORE COLOUR STUDIO
                </Link>
                <Link
                  href={`/configure?model=${vehicle.id}`}
                  className="w-full py-4 border border-white/20 text-white font-medium tracking-widest text-sm text-center hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  CONFIGURE VEHICLE
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/test-drive"
                  className="w-full py-4 border border-white/20 text-white font-medium tracking-widest text-sm text-center hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  BOOK TEST DRIVE
                </Link>
                <button
                  className="w-full py-4 border border-white/10 text-[#7B7F87] font-medium tracking-widest text-sm text-center hover:border-white/30 hover:text-white transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Download size={14} />
                  DOWNLOAD BROCHURE
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "specifications" && (
          <motion.div
            ref={specsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2
              className="font-bebas text-white text-4xl mb-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              TECHNICAL SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specItems.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isSpecsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 border-b"
                  style={{ borderColor: "rgba(192, 192, 208, 0.1)" }}
                >
                  <div className="flex items-center gap-3">
                    <spec.icon size={14} className="text-[#FF5A1F]" />
                    <span
                      className="text-xs tracking-wider text-[#7B7F87]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {spec.label.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-white font-medium">{spec.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Performance bars */}
            <div className="mt-12">
              <h3
                className="font-bebas text-white text-2xl mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
              >
                PERFORMANCE METRICS
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Power Output", value: Math.min((vehicle.specs.horsepower / 2000) * 100, 100) },
                  { label: "Top Speed", value: Math.min((vehicle.specs.topSpeed / 350) * 100, 100) },
                  { label: "Acceleration", value: Math.max(100 - (vehicle.specs.acceleration / 5) * 100, 10) },
                  { label: "Aerodynamics", value: Math.max(100 - (vehicle.specs.aeroDrag / 0.5) * 100, 20) },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between mb-2">
                      <span
                        className="text-xs tracking-wider text-[#7B7F87]"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {metric.label.toUpperCase()}
                      </span>
                      <span
                        className="text-xs text-[#FF5A1F]"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {Math.round(metric.value)}%
                      </span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8C5A] rounded-full"
                        initial={{ width: 0 }}
                        animate={isSpecsInView ? { width: `${metric.value}%` } : {}}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2
              className="font-bebas text-white text-4xl mb-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              GALLERY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                  onClick={() => setActiveImage(i)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "technology" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2
              className="font-bebas text-white text-4xl mb-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              TECHNOLOGY & INNOVATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicle.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-lg"
                  style={{
                    background: "#1A1A24",
                    border: "1px solid rgba(192, 192, 208, 0.1)",
                    borderTop: "1px solid rgba(192, 192, 208, 0.25)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center rounded">
                      <div className="w-2 h-2 bg-[#FF5A1F] rounded-full" />
                    </div>
                    <h3 className="text-white font-semibold">{feature}</h3>
                  </div>
                  <p className="text-[#7B7F87] text-sm leading-relaxed">
                    Advanced {feature.toLowerCase()} system engineered for maximum performance and reliability.
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Related Vehicles */}
      <div
        className="border-t py-16"
        style={{ borderColor: "rgba(192, 192, 208, 0.1)", background: "#0B0F18" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <h2
            className="font-bebas text-white text-3xl mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            EXPLORE MORE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((v) => (
              <Link key={v.id} href={`/vehicles/${v.id}`} className="group">
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${v.images.hero}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p
                      className="font-bebas text-white text-2xl"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                    >
                      {v.name}
                    </p>
                    <p
                      className="text-xs text-[#FF5A1F]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {formatPrice(v.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
