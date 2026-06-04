"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "#02040A" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "4/5" }}>
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90')",
                  y,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040A]/60 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 glass-orange rounded-lg p-6 w-48"
            >
              <p
                className="text-[10px] tracking-widest text-[#FF5A1F] mb-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                FOUNDED
              </p>
              <p
                className="font-bebas text-5xl text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                2008
              </p>
              <p className="text-xs text-[#7B7F87] mt-1">
                Years of engineering excellence
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#FF5A1F]" />
                <span
                  className="text-xs tracking-[0.3em] text-[#FF5A1F]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  OUR STORY
                </span>
              </div>

              <h2
                className="font-bebas text-white leading-none mb-8"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  letterSpacing: "0.05em",
                }}
              >
                ENGINEERED
                <br />
                FOR THOSE WHO
                <br />
                <span className="text-gradient-orange">REFUSE TO SETTLE</span>
              </h2>

              <div className="space-y-5 text-[#7B7F87] leading-relaxed">
                <p>
                  Apex Velocity was born from a singular obsession: to build the
                  world's most extraordinary automobiles. Founded in 2008 by a
                  team of Formula 1 engineers and aerospace designers, we set out
                  to challenge every assumption about what a road car could be.
                </p>
                <p>
                  Every vehicle we create begins with a question: what is the
                  absolute limit of what is physically possible? Then we exceed
                  it. Our carbon fiber monocoques are built to aerospace
                  tolerances. Our powertrains are developed on the same
                  dynamometers used by championship-winning race teams.
                </p>
                <p>
                  We don't build cars for everyone. We build them for the few who
                  understand that true performance is not just about speed — it's
                  about the perfect synthesis of man, machine, and moment.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
                {[
                  { value: "847", label: "Vehicles Built" },
                  { value: "23", label: "World Records" },
                  { value: "6", label: "Model Lines" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-bebas text-4xl text-[#FF5A1F] mb-1"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#7B7F87]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
