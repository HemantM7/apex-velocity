"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { newsArticles } from "@/lib/data";

export function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: "#02040A" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF5A1F]" />
              <span
                className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                LATEST NEWS
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
              FROM THE
              <br />
              <span className="text-gradient-orange">TRACK & LAB</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 text-sm text-[#7B7F87] hover:text-[#FF5A1F] transition-colors group"
          >
            All Articles
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/news/${article.id}`} className="group block">
                <div className="card-dark rounded-lg overflow-hidden">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/10" }}
                  >
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

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-[#FF5A1F] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[#7B7F87] text-xs leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[#7B7F87]">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        <span
                          className="text-[10px]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} />
                        <span
                          className="text-[10px]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
