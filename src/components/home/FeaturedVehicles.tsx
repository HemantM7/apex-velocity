"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Gauge, Timer } from "lucide-react";
import { vehicles } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function FeaturedVehicles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featured = vehicles.slice(0, 4);

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative"
      style={{ background: "#02040A" }}
    >
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF5A1F]" />
              <span
                className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                OUR FLEET
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
              FEATURED
              <br />
              <span className="text-gradient-orange">VEHICLES</span>
            </h2>
          </div>
          <Link
            href="/collection"
            className="hidden md:flex items-center gap-2 text-sm text-[#7B7F87] hover:text-[#FF5A1F] transition-colors group"
          >
            View All Models
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <VehicleCard vehicle={vehicle} featured={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 mt-10 md:hidden">
        <Link
          href="/collection"
          className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 text-white text-sm font-medium tracking-wider hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
        >
          VIEW ALL MODELS
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function VehicleCard({
  vehicle,
  featured,
}: {
  vehicle: (typeof vehicles)[0];
  featured?: boolean;
}) {
  return (
    <Link href={`/vehicles/${vehicle.id}`} className="group block">
      <div
        className="relative overflow-hidden card-dark rounded-lg"
        style={{ aspectRatio: featured ? "16/9" : "4/3" }}
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/30 to-transparent" />

        {/* Badge */}
        {vehicle.badge && (
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 text-[10px] tracking-widest font-medium"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: vehicle.fuelType === "electric"
                  ? "rgba(0, 200, 100, 0.15)"
                  : "rgba(255, 90, 31, 0.15)",
                border: `1px solid ${vehicle.fuelType === "electric" ? "rgba(0, 200, 100, 0.4)" : "rgba(255, 90, 31, 0.4)"}`,
                color: vehicle.fuelType === "electric" ? "#00C864" : "#FF5A1F",
              }}
            >
              {vehicle.badge}
            </span>
          </div>
        )}

        {/* Limited badge */}
        {vehicle.limited && (
          <div className="absolute top-4 right-4">
            <span
              className="px-3 py-1 text-[10px] tracking-widest text-white"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {vehicle.limitedCount} UNITS
            </span>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-xs tracking-widest text-[#7B7F87] mb-1"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {vehicle.brand}
              </p>
              <h3
                className="font-bebas text-white mb-3"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  letterSpacing: "0.05em",
                }}
              >
                {vehicle.name}
              </h3>

              {/* Quick stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Zap size={12} className="text-[#FF5A1F]" />
                  <span
                    className="text-xs text-[#7B7F87]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {vehicle.specs.horsepower}HP
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gauge size={12} className="text-[#FF5A1F]" />
                  <span
                    className="text-xs text-[#7B7F87]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {vehicle.specs.topSpeed}MPH
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Timer size={12} className="text-[#FF5A1F]" />
                  <span
                    className="text-xs text-[#7B7F87]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {vehicle.specs.acceleration}s
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p
                className="text-xs tracking-widest text-[#7B7F87] mb-1"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                FROM
              </p>
              <p
                className="font-bebas text-white text-2xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {formatPrice(vehicle.price)}
              </p>
            </div>
          </div>

          {/* Hover CTA */}
          <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
            <div className="flex items-center gap-2 text-[#FF5A1F] text-sm font-medium">
              <span>Explore {vehicle.name}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
