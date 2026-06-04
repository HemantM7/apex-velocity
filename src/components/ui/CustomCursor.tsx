"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const handleMouseEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1.8)";
        cursorRef.current.style.borderColor = "#FF5A1F";
        cursorRef.current.style.background = "rgba(255, 90, 31, 0.1)";
      }
    };

    const handleMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1)";
        cursorRef.current.style.borderColor = "rgba(255, 90, 31, 0.6)";
        cursorRef.current.style.background = "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink);
      link.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, [mouseX, mouseY, dotX, dotY]);

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 1024) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          borderColor: "rgba(255, 90, 31, 0.6)",
          transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
        }}
      />
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FF5A1F] pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
