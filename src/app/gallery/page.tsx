"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play } from "lucide-react";

const categories = ["All", "Exterior", "Interior", "Track", "Studio", "Concept"];

const galleryItems = [
  { id: 1, category: "Exterior", type: "image", url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=90", title: "APEX X1 — Front Quarter", span: "col-span-2 row-span-2" },
  { id: 2, category: "Track", type: "image", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", title: "PHANTOM GT — Track Day", span: "" },
  { id: 3, category: "Studio", type: "image", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80", title: "STORM S — Studio", span: "" },
  { id: 4, category: "Interior", type: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", title: "APEX X1 — Cockpit", span: "" },
  { id: 5, category: "Exterior", type: "image", url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80", title: "VOLT R — Charging", span: "" },
  { id: 6, category: "Track", type: "image", url: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80", title: "NOVA HYBRID — Circuit", span: "col-span-2" },
  { id: 7, category: "Studio", type: "image", url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", title: "VOLT R — Studio", span: "" },
  { id: 8, category: "Exterior", type: "image", url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80", title: "APEX X1 — Rear", span: "" },
  { id: 9, category: "Interior", type: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", title: "PHANTOM GT — Interior", span: "" },
  { id: 10, category: "Concept", type: "image", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80", title: "Project APEX — Concept", span: "col-span-2" },
  { id: 11, category: "Track", type: "image", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80", title: "STORM S — Nürburgring", span: "" },
  { id: 12, category: "Studio", type: "image", url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80", title: "VOLT R — Detail", span: "" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const filtered = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      {/* Header */}
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
              VISUAL ARCHIVE
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
            GALLERY
          </h1>
          <p className="text-[#7B7F87] max-w-xl">
            A curated collection of our finest automotive photography. Every image tells the story of precision, power, and beauty.
          </p>
        </motion.div>
      </div>

      {/* Category filters */}
      <div
        className="sticky top-16 z-30 border-y"
        style={{
          background: "rgba(2, 4, 10, 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(192, 192, 208, 0.1)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider whitespace-nowrap transition-all ${
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
        </div>
      </div>

      {/* Masonry Grid */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-20 py-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`relative overflow-hidden rounded-lg cursor-pointer group ${item.span}`}
                onClick={() => setLightboxItem(item)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.url}')` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/60 flex items-center justify-center backdrop-blur-sm">
                    {item.type === "video" ? (
                      <Play size={18} className="text-white" />
                    ) : (
                      <ZoomIn size={18} className="text-white" />
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p
                    className="text-[10px] text-[#FF5A1F] mt-0.5"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {item.category.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(2, 4, 10, 0.95)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                className="w-full rounded-lg"
                style={{ maxHeight: "80vh", objectFit: "contain" }}
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{lightboxItem.title}</p>
                  <p
                    className="text-xs text-[#FF5A1F] mt-0.5"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {lightboxItem.category.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#FF5A1F] transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
