"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              GET IN TOUCH
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
            CONTACT US
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <p className="text-[#7B7F87] leading-relaxed mb-10">
              Whether you're interested in purchasing a vehicle, scheduling a test drive, or simply want to learn more about our engineering philosophy, our team is here to assist.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (800) APEX-VEL",
                  sub: "Mon–Fri, 9AM–6PM EST",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@apexvelocity.com",
                  sub: "Response within 24 hours",
                },
                {
                  icon: MapPin,
                  label: "Headquarters",
                  value: "Geneva, Switzerland",
                  sub: "Global showrooms in 4 cities",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center rounded flex-shrink-0">
                    <item.icon size={16} className="text-[#FF5A1F]" />
                  </div>
                  <div>
                    <p
                      className="text-[10px] tracking-widest text-[#7B7F87] mb-0.5"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {item.label.toUpperCase()}
                    </p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                    <p className="text-[#7B7F87] text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 pt-10 border-t border-white/10">
              <p
                className="text-xs tracking-widest text-[#7B7F87] mb-4"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                FOLLOW US
              </p>
              <div className="flex gap-3">
                {["Instagram", "Twitter", "YouTube", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-3 py-2 border border-white/10 text-[#7B7F87] text-xs hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {social.toUpperCase().slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center mb-6 pulse-glow">
                  <Check size={28} className="text-[#FF5A1F]" />
                </div>
                <h3
                  className="font-bebas text-white text-3xl mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  MESSAGE SENT
                </h3>
                <p className="text-[#7B7F87] mb-6">
                  Thank you for reaching out. Our team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-white/20 text-white text-sm tracking-wider hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "John Smith", required: true },
                    { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000", required: false },
                    { key: "subject", label: "Subject", type: "text", placeholder: "Vehicle Inquiry", required: true },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        className="block text-xs tracking-widest text-[#7B7F87] mb-2"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {field.label.toUpperCase()}
                        {field.required && <span className="text-[#FF5A1F] ml-1">*</span>}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => updateForm(field.key, e.target.value)}
                        className="w-full bg-[#1A1A24] border border-white/10 px-4 py-3 text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    className="block text-xs tracking-widest text-[#7B7F87] mb-2"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    MESSAGE <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    className="w-full bg-[#1A1A24] border border-white/10 px-4 py-3 text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF5A1F] text-black font-semibold tracking-widest text-sm hover:bg-[#FF7A3F] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  SEND MESSAGE
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
