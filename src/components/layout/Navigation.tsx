"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Collection", href: "/collection" },
  {
    label: "Vehicles",
    href: "#",
    children: [
      { label: "APEX X1", href: "/vehicles/apex-x1", badge: "HYPERCAR" },
      { label: "PHANTOM GT", href: "/vehicles/phantom-gt", badge: "GT" },
      { label: "VOLT R", href: "/vehicles/volt-r", badge: "ELECTRIC" },
      { label: "STORM S", href: "/vehicles/storm-s", badge: "TRACK" },
    ],
  },
  { label: "Configure", href: "/configure" },
  { label: "Technology", href: "/technology" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-white/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className="flex items-center gap-1 text-sm font-medium text-[#7B7F87] hover:text-white transition-colors duration-200 animated-underline tracking-wide">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        activeDropdown === link.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 animated-underline tracking-wide",
                      pathname === link.href
                        ? "text-[#FF5A1F]"
                        : "text-[#7B7F87] hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-3 w-52 glass rounded-lg overflow-hidden border border-white/10"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between px-4 py-3 text-sm text-[#7B7F87] hover:text-white hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0"
                        >
                          <span>{child.label}</span>
                          <span
                            className="text-[10px] font-mono-custom text-[#FF5A1F] tracking-widest"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {child.badge}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-[#7B7F87] hover:text-white transition-colors duration-200 tracking-wide"
            >
              Contact
            </Link>
            <Link
              href="/test-drive"
              className="btn-skew px-5 py-2.5 bg-[#FF5A1F] text-black text-sm font-semibold tracking-wider hover:bg-[#FF7A3F] transition-colors duration-200"
              style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
            >
              BOOK TEST DRIVE
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass lg:hidden flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  {link.children ? (
                    <div>
                      <div
                        className="font-bebas text-3xl text-[#7B7F87] py-3 border-b border-white/5"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {link.label}
                      </div>
                      <div className="pl-4 flex flex-col gap-1 mt-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-sm text-[#7B7F87] hover:text-white py-2 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block font-bebas text-3xl py-3 border-b border-white/5 transition-colors",
                        pathname === link.href
                          ? "text-[#FF5A1F]"
                          : "text-[#7B7F87] hover:text-white"
                      )}
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                href="/test-drive"
                className="w-full py-4 bg-[#FF5A1F] text-black text-center font-semibold tracking-widest text-sm"
              >
                BOOK TEST DRIVE
              </Link>
              <Link
                href="/contact"
                className="w-full py-4 border border-white/20 text-white text-center font-medium tracking-wider text-sm"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
