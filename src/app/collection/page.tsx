"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, Heart, ArrowRight, Zap, Gauge, Timer, X } from "lucide-react";
import { vehicles } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/lib/data";

const categories = ["All", "Hypercar", "Supercar", "Electric", "GT"];
const fuelTypes = ["All", "Electric", "Hybrid", "Petrol"];
const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Horsepower", value: "hp-desc" },
  { label: "Top Speed", value: "speed-desc" },
  { label: "0-60 Time", value: "accel-asc" },
];

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFuel, setActiveFuel] = useState("All");
  const [sortBy, setSortBy] = useState("price-asc");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const filtered = vehicles
    .filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.tagline.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "All" ||
        v.category === activeCategory.toLowerCase();
      const matchFuel =
        activeFuel === "All" ||
        v.fuelType === activeFuel.toLowerCase();
      return matchSearch && matchCategory && matchFuel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "hp-desc": return b.specs.horsepower - a.specs.horsepower;
        case "speed-desc": return b.specs.topSpeed - a.specs.topSpeed;
        case "accel-asc": return a.specs.acceleration - b.specs.acceleration;
        default: return 0;
      }
    });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              2025 LINEUP
            </span>
          </div>
          <h1
            className="font-bebas text-white leading-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "0.05em",
            }}
          >
            THE COLLECTION
          </h1>
          <p className="text-[#7B7F87] max-w-xl">
            Every vehicle in our lineup represents the absolute pinnacle of
            automotive engineering. Choose your weapon.
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div
        className="sticky top-16 z-30 border-y"
        style={{
          background: "rgba(2, 4, 10, 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(192, 192, 208, 0.1)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B7F87]"
              />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-sm text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7F87] hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-wider transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#FF5A1F] text-black font-semibold"
                      : "border border-white/10 text-[#7B7F87] hover:border-[#FF5A1F] hover:text-white"
                  }`}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="ml-auto flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 text-sm text-[#7B7F87] px-3 py-2.5 focus:outline-none focus:border-[#FF5A1F] rounded"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0B0F18]">
                    {opt.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 border text-sm transition-all ${
                  showFilters
                    ? "border-[#FF5A1F] text-[#FF5A1F]"
                    : "border-white/10 text-[#7B7F87] hover:border-white/30"
                }`}
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
            </div>
          </div>

          {/* Extended filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/5 mt-4 flex flex-wrap gap-6">
                  <div>
                    <p
                      className="text-[10px] tracking-widest text-[#7B7F87] mb-2"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      FUEL TYPE
                    </p>
                    <div className="flex gap-2">
                      {fuelTypes.map((fuel) => (
                        <button
                          key={fuel}
                          onClick={() => setActiveFuel(fuel)}
                          className={`px-3 py-1.5 text-xs tracking-wider transition-all ${
                            activeFuel === fuel
                              ? "bg-[#FF5A1F] text-black"
                              : "border border-white/10 text-[#7B7F87] hover:border-[#FF5A1F]"
                          }`}
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {fuel.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-6">
        <p
          className="text-xs text-[#7B7F87]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          SHOWING {filtered.length} OF {vehicles.length} VEHICLES
        </p>
      </div>

      {/* Vehicle Grid */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-20 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-[#7B7F87] text-lg">No vehicles match your filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setActiveFuel("All");
                }}
                className="mt-4 text-[#FF5A1F] text-sm hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <CollectionCard
                    vehicle={vehicle}
                    isWishlisted={wishlist.includes(vehicle.id)}
                    onWishlist={() => toggleWishlist(vehicle.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CollectionCard({
  vehicle,
  isWishlisted,
  onWishlist,
}: {
  vehicle: Vehicle;
  isWishlisted: boolean;
  onWishlist: () => void;
}) {
  return (
    <div className="group card-dark rounded-lg overflow-hidden hover:border-[#FF5A1F]/30 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {vehicle.badge && (
            <span
              className="px-2 py-1 text-[10px] tracking-widest"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: "rgba(255, 90, 31, 0.15)",
                border: "1px solid rgba(255, 90, 31, 0.4)",
                color: "#FF5A1F",
              }}
            >
              {vehicle.badge}
            </span>
          )}
          {vehicle.limited && (
            <span
              className="px-2 py-1 text-[10px] tracking-widest text-white"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              LIMITED
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onWishlist();
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#FF5A1F] transition-all"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            className={isWishlisted ? "fill-[#FF5A1F] text-[#FF5A1F]" : "text-white"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p
              className="text-[10px] tracking-widest text-[#7B7F87] mb-1"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {vehicle.year} · {vehicle.fuelType.toUpperCase()}
            </p>
            <h3
              className="font-bebas text-white text-2xl"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {vehicle.name}
            </h3>
          </div>
          <div className="text-right">
            <p
              className="text-[10px] tracking-widest text-[#7B7F87]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              FROM
            </p>
            <p
              className="font-bebas text-[#FF5A1F] text-xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {formatPrice(vehicle.price)}
            </p>
          </div>
        </div>

        <p className="text-[#7B7F87] text-xs leading-relaxed mb-4 line-clamp-2">
          {vehicle.tagline}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-white/5">
          {[
            { icon: Zap, label: "HP", value: vehicle.specs.horsepower.toLocaleString() },
            { icon: Gauge, label: "MPH", value: vehicle.specs.topSpeed },
            { icon: Timer, label: "0-60", value: `${vehicle.specs.acceleration}s` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon size={12} className="text-[#FF5A1F] mx-auto mb-1" />
              <p
                className="font-bebas text-white text-lg"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {value}
              </p>
              <p
                className="text-[10px] text-[#7B7F87]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="flex-1 py-3 bg-[#FF5A1F] text-black text-xs font-semibold tracking-widest text-center hover:bg-[#FF7A3F] transition-colors flex items-center justify-center gap-2"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            EXPLORE
            <ArrowRight size={12} />
          </Link>
          <Link
            href={`/configure?model=${vehicle.id}`}
            className="px-4 py-3 border border-white/10 text-[#7B7F87] text-xs tracking-wider hover:border-[#FF5A1F] hover:text-white transition-all"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            CONFIG
          </Link>
        </div>
      </div>
    </div>
  );
}
