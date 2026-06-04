"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { newsArticles } from "@/lib/data";

const categories = ["All", "Performance", "Technology", "Engineering", "Design"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = newsArticles.filter((article) => {
    const matchCat = activeCategory === "All" || article.category === activeCategory;
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              LATEST NEWS
            </span>
          </div>
          <h1
            className="font-bebas text-white leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "0.05em",
            }}
          >
            NEWS & INSIGHTS
          </h1>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B7F87]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-sm text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded w-64"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider transition-all ${
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

        {/* Featured article */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href={`/news/${featured.id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-lg overflow-hidden card-dark">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${featured.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A24]/50" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 text-[10px] tracking-widest text-[#FF5A1F]"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: "rgba(255, 90, 31, 0.15)",
                        border: "1px solid rgba(255, 90, 31, 0.4)",
                      }}
                    >
                      FEATURED
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span
                    className="text-xs tracking-widest text-[#FF5A1F] mb-4"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {featured.category.toUpperCase()}
                  </span>
                  <h2
                    className="font-bebas text-white text-3xl lg:text-4xl mb-4 group-hover:text-[#FF5A1F] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#7B7F87] leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-[#7B7F87] text-xs mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      <span style={{ fontFamily: "'Space Mono', monospace" }}>
                        {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      <span style={{ fontFamily: "'Space Mono', monospace" }}>{featured.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF5A1F] text-sm group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/news/${article.id}`} className="group block">
                <div className="card-dark rounded-lg overflow-hidden h-full">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24]/80 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2 py-1 text-[10px] tracking-widest text-[#FF5A1F]"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          background: "rgba(255, 90, 31, 0.15)",
                          border: "1px solid rgba(255, 90, 31, 0.3)",
                        }}
                      >
                        {article.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold leading-snug mb-3 group-hover:text-[#FF5A1F] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[#7B7F87] text-sm leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[#7B7F87] text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        <span style={{ fontFamily: "'Space Mono', monospace" }}>
                          {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} />
                        <span style={{ fontFamily: "'Space Mono', monospace" }}>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#7B7F87]">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
