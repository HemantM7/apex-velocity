"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Play, Briefcase, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Vehicles: [
    { label: "APEX X1", href: "/vehicles/apex-x1" },
    { label: "PHANTOM GT", href: "/vehicles/phantom-gt" },
    { label: "VOLT R", href: "/vehicles/volt-r" },
    { label: "STORM S", href: "/vehicles/storm-s" },
    { label: "All Models", href: "/collection" },
  ],
  Experience: [
    { label: "Configurator", href: "/configure" },
    { label: "Test Drive", href: "/test-drive" },
    { label: "Gallery", href: "/gallery" },
    { label: "Technology", href: "/technology" },
    { label: "Compare", href: "/compare" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "News & Blog", href: "/news" },
    { label: "Dealer Locator", href: "/dealers" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Share2, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Play, href: "#", label: "YouTube" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{
        background: "#02040A",
        borderColor: "rgba(192, 192, 208, 0.1)",
      }}
    >
      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-8 h-8 border border-[#FF5A1F] rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#FF5A1F] rotate-45" />
                </div>
              </div>
              <span
                className="font-bebas text-2xl tracking-[0.15em] text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                APEX VELOCITY
              </span>
            </Link>
            <p className="text-[#7B7F87] text-sm leading-relaxed max-w-xs mb-8">
              Engineering the impossible. Every vehicle we create represents the
              absolute pinnacle of human achievement in automotive design and
              performance.
            </p>

            {/* Newsletter */}
            <div>
              <p
                className="text-xs tracking-widest text-[#7B7F87] mb-3"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                STAY INFORMED
              </p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[#0B0F18] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors"
                />
                <button className="px-4 py-3 bg-[#FF5A1F] text-black hover:bg-[#FF7A3F] transition-colors">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-xs tracking-widest text-[#7B7F87] mb-5"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {category.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#7B7F87] hover:text-white transition-colors duration-200 animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(192, 192, 208, 0.08)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#7B7F87]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            © 2025 APEX VELOCITY. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#7B7F87] hover:text-[#FF5A1F] transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-[#7B7F87] hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
