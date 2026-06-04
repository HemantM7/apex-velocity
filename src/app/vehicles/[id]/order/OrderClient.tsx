"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, ChevronRight,
  Shield, Truck, Wrench, Star, Lock, BadgeCheck,
  CreditCard, FileText, Phone
} from "lucide-react";
import type { Vehicle, VehicleColor } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface Props {
  vehicle: Vehicle;
}

const wheelOptions = [
  { id: "standard", name: "Standard Alloy", desc: '20" Forged Alloy', price: 0 },
  { id: "sport",    name: "Sport Carbon",   desc: '21" Carbon Fibre', price: 8500 },
  { id: "track",    name: "Track Magnesium",desc: '20" Lightweight Mag', price: 15000 },
  { id: "luxury",   name: "Luxury Chrome",  desc: '22" Polished Chrome', price: 6000 },
];

const interiorOptions = [
  { id: "alcantara", name: "Alcantara Black",      desc: "Full Alcantara",        price: 0 },
  { id: "nappa",     name: "Nappa Leather",        desc: "Hand-stitched Nappa",   price: 12000 },
  { id: "carbon",    name: "Carbon & Alcantara",   desc: "Racing-inspired",       price: 22000 },
  { id: "bespoke",   name: "Bespoke Luxury",       desc: "Custom Tailored",       price: 45000 },
];

const performancePacks = [
  { id: "none",     name: "Standard",      desc: "Factory specification",   price: 0 },
  { id: "sport",    name: "Sport Pack",    desc: "+50HP · Sport Exhaust",   price: 18000 },
  { id: "track",    name: "Track Pack",    desc: "+120HP · Roll Cage",      price: 45000 },
  { id: "ultimate", name: "Ultimate Pack", desc: "+200HP · Full Aero Kit",  price: 85000 },
];

const deliveryOptions = [
  { id: "dealer",   name: "Showroom Collection",  desc: "Collect from your nearest Apex showroom. Includes handover ceremony.", price: 0 },
  { id: "home",     name: "White-Glove Delivery",  desc: "Delivered to your door by our dedicated logistics team.", price: 2500 },
  { id: "concierge",name: "Concierge Anywhere",    desc: "Delivered to any location worldwide including private estates.", price: 8500 },
];

const STEPS = [
  { id: 1, label: "Colour" },
  { id: 2, label: "Options" },
  { id: 3, label: "Delivery" },
  { id: 4, label: "Details" },
  { id: 5, label: "Review" },
];

function OrderForm({ vehicle }: Props) {
  const searchParams = useSearchParams();
  const preselectedColor = searchParams.get("color");

  const defaultColor =
    vehicle.colors.find((c) => c.name === preselectedColor) ?? vehicle.colors[0];

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Order state
  const [color, setColor]       = useState<VehicleColor>(defaultColor);
  const [wheel, setWheel]       = useState(wheelOptions[0]);
  const [interior, setInterior] = useState(interiorOptions[0]);
  const [perfPack, setPerfPack] = useState(performancePacks[0]);
  const [delivery, setDelivery] = useState(deliveryOptions[0]);
  const [form, setForm]         = useState({
    firstName: "", lastName: "", email: "",
    phone: "", address: "", city: "", country: "",
    depositMethod: "bank-transfer",
    agreeTerms: false,
    agreeUpdates: false,
  });

  const updateForm = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const totalPrice =
    vehicle.price +
    color.priceAdd +
    wheel.price +
    interior.price +
    perfPack.price +
    delivery.price;

  const depositAmount = Math.round(totalPrice * 0.1);

  const canProceed = () => {
    if (step === 4) {
      return (
        !!form.firstName && !!form.lastName &&
        !!form.email && !!form.phone &&
        !!form.address && !!form.city && !!form.country
      );
    }
    if (step === 5) return form.agreeTerms;
    return true;
  };

  // ── Confirmed screen ─────────────────────────────────────────────────────
  if (submitted) {
    const refNo = `AV-${vehicle.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6"
        style={{ background: "#02040A" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Animated checkmark */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 pulse-glow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Check size={40} className="text-[#FF5A1F]" />
            </div>
          </div>

          <span
            className="inline-block px-3 py-1 text-[10px] tracking-[0.3em] text-[#FF5A1F] mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "rgba(255,90,31,0.1)",
              border: "1px solid rgba(255,90,31,0.3)",
            }}
          >
            ORDER CONFIRMED
          </span>

          <h1
            className="font-bebas text-white text-5xl mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            YOUR {vehicle.name} IS RESERVED
          </h1>

          <p className="text-[#7B7F87] mb-2">
            Order reference:{" "}
            <span
              className="text-white"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {refNo}
            </span>
          </p>
          <p className="text-[#7B7F87] mb-10">
            A confirmation has been sent to{" "}
            <span className="text-white">{form.email}</span>. Your dedicated Apex
            Velocity specialist will contact you within 24 hours.
          </p>

          {/* Summary card */}
          <div
            className="rounded-lg p-6 text-left mb-8 space-y-3"
            style={{ background: "#1A1A24", border: "1px solid rgba(192,192,208,0.1)" }}
          >
            {[
              { label: "Vehicle",           value: vehicle.name },
              { label: "Exterior Colour",   value: color.name },
              { label: "Wheels",            value: wheel.name },
              { label: "Interior",          value: interior.name },
              { label: "Performance Pack",  value: perfPack.name },
              { label: "Delivery",          value: delivery.name },
              { label: "Total Price",       value: formatPrice(totalPrice) },
              { label: "Deposit (10%)",     value: formatPrice(depositAmount) },
            ].map((row) => (
              <div key={row.label} className="flex justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span
                  className="text-xs text-[#7B7F87]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {row.label.toUpperCase()}
                </span>
                <span className="text-sm text-white">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-xs text-[#7B7F87]">
            {[
              { icon: Shield,    label: "2-Year Warranty" },
              { icon: BadgeCheck,label: "Authentic" },
              { icon: Lock,      label: "Secure Payment" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} className="text-[#FF5A1F]" />
                <span style={{ fontFamily: "'Space Mono', monospace" }}>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/collection"
              className="px-8 py-3 bg-[#FF5A1F] text-black text-xs font-semibold tracking-widest hover:bg-[#FF7A3F] transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              EXPLORE MORE MODELS
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border border-white/20 text-white text-xs tracking-widest hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              RETURN HOME
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main order flow ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-16" style={{ background: "#02040A" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">

        {/* Top bar */}
        <div className="py-6 flex items-center justify-between border-b"
          style={{ borderColor: "rgba(192,192,208,0.1)" }}>
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="flex items-center gap-2 text-[#7B7F87] hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {vehicle.name}
          </Link>
          <span
            className="text-xs tracking-[0.3em] text-[#FF5A1F]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            PLACE YOUR ORDER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 pb-24">

          {/* ── Left column: Steps ─────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-10 overflow-x-auto no-scrollbar pb-2">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                        step > s.id  ? "bg-[#FF5A1F] border-[#FF5A1F]"
                        : step === s.id ? "border-[#FF5A1F] bg-[#FF5A1F]/10"
                        : "border-white/20"
                      }`}
                      onClick={() => step > s.id && setStep(s.id)}
                    >
                      {step > s.id
                        ? <Check size={14} className="text-black" />
                        : <span className={`text-xs font-bold ${step === s.id ? "text-[#FF5A1F]" : "text-[#7B7F87]"}`}>{s.id}</span>
                      }
                    </div>
                    <span
                      className={`text-[9px] mt-1 tracking-widest whitespace-nowrap ${step === s.id ? "text-[#FF5A1F]" : "text-[#7B7F87]"}`}
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {s.label.toUpperCase()}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-px mx-1.5 mb-5"
                      style={{ background: step > s.id ? "#FF5A1F" : "rgba(192,192,208,0.15)" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >

                {/* STEP 1 — Colour */}
                {step === 1 && (
                  <div>
                    <StepHeader
                      title="EXTERIOR COLOUR"
                      sub="Choose your finish. Each colour is applied by hand in our Geneva atelier."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {vehicle.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setColor(c)}
                          className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                            color.name === c.name
                              ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                              : "border-white/10 hover:border-white/30"
                          }`}
                          style={{ background: color.name === c.name ? undefined : "#1A1A24" }}
                        >
                          <div
                            className="w-14 h-14 rounded-lg flex-shrink-0 border border-white/10"
                            style={{ background: c.hex }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">{c.name}</p>
                            <p className="text-[#7B7F87] text-xs mt-0.5 capitalize">
                              {c.type} finish
                            </p>
                            <p className="text-[#FF5A1F] text-xs mt-1"
                              style={{ fontFamily: "'Space Mono', monospace" }}>
                              {c.priceAdd === 0 ? "INCLUDED" : `+${formatPrice(c.priceAdd)}`}
                            </p>
                          </div>
                          {color.name === c.name && (
                            <Check size={16} className="text-[#FF5A1F] flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/vehicles/${vehicle.id}/colors`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#7B7F87] hover:text-[#FF5A1F] transition-colors"
                      >
                        <ArrowRight size={12} />
                        <span style={{ fontFamily: "'Space Mono', monospace" }}>
                          EXPLORE COLOUR STUDIO
                        </span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Options */}
                {step === 2 && (
                  <div className="space-y-8">
                    <StepHeader
                      title="VEHICLE OPTIONS"
                      sub="Personalise every detail. Each option is crafted to your exact specification."
                    />

                    {/* Wheels */}
                    <div>
                      <h3
                        className="text-xs tracking-widest text-[#7B7F87] mb-3"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        WHEELS
                      </h3>
                      <div className="space-y-2">
                        {wheelOptions.map((w) => (
                          <OptionRow
                            key={w.id}
                            name={w.name}
                            desc={w.desc}
                            price={w.price}
                            selected={wheel.id === w.id}
                            onSelect={() => setWheel(w)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Interior */}
                    <div>
                      <h3
                        className="text-xs tracking-widest text-[#7B7F87] mb-3"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        INTERIOR TRIM
                      </h3>
                      <div className="space-y-2">
                        {interiorOptions.map((o) => (
                          <OptionRow
                            key={o.id}
                            name={o.name}
                            desc={o.desc}
                            price={o.price}
                            selected={interior.id === o.id}
                            onSelect={() => setInterior(o)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Performance */}
                    <div>
                      <h3
                        className="text-xs tracking-widest text-[#7B7F87] mb-3"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        PERFORMANCE PACK
                      </h3>
                      <div className="space-y-2">
                        {performancePacks.map((p) => (
                          <OptionRow
                            key={p.id}
                            name={p.name}
                            desc={p.desc}
                            price={p.price}
                            selected={perfPack.id === p.id}
                            onSelect={() => setPerfPack(p)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Delivery */}
                {step === 3 && (
                  <div>
                    <StepHeader
                      title="DELIVERY METHOD"
                      sub="Your vehicle arrives exactly as you choose. Every delivery is a ceremony."
                    />
                    <div className="space-y-3">
                      {deliveryOptions.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setDelivery(d)}
                          className={`w-full flex items-start gap-4 p-5 rounded-lg border-2 text-left transition-all ${
                            delivery.id === d.id
                              ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                              : "border-white/10 hover:border-white/30"
                          }`}
                          style={{ background: delivery.id === d.id ? undefined : "#1A1A24" }}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${delivery.id === d.id ? "bg-[#FF5A1F] text-black" : "bg-white/5 text-[#7B7F87]"}`}>
                            <Truck size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-white font-medium">{d.name}</p>
                              <p
                                className="text-[#FF5A1F] text-sm font-bebas"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}
                              >
                                {d.price === 0 ? "INCLUDED" : `+${formatPrice(d.price)}`}
                              </p>
                            </div>
                            <p className="text-[#7B7F87] text-sm mt-1">{d.desc}</p>
                          </div>
                          {delivery.id === d.id && (
                            <Check size={16} className="text-[#FF5A1F] mt-1 flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Lead time note */}
                    <div
                      className="mt-6 p-4 rounded-lg flex items-start gap-3"
                      style={{ background: "rgba(255,90,31,0.06)", border: "1px solid rgba(255,90,31,0.2)" }}
                    >
                      <Wrench size={14} className="text-[#FF5A1F] mt-0.5 flex-shrink-0" />
                      <p className="text-[#7B7F87] text-xs leading-relaxed">
                        <span className="text-white">Estimated build time: 18–24 months.</span> Every vehicle
                        is hand-assembled to order. Your specialist will provide exact timing after confirmation.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 4 — Personal details */}
                {step === 4 && (
                  <div>
                    <StepHeader
                      title="YOUR DETAILS"
                      sub="Your information is kept strictly confidential and never shared."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "firstName", label: "First Name",     type: "text",  placeholder: "John",              required: true,  span: false },
                        { key: "lastName",  label: "Last Name",      type: "text",  placeholder: "Smith",             required: true,  span: false },
                        { key: "email",     label: "Email Address",  type: "email", placeholder: "john@example.com",  required: true,  span: false },
                        { key: "phone",     label: "Phone Number",   type: "tel",   placeholder: "+1 (555) 000-0000", required: true,  span: false },
                        { key: "address",   label: "Street Address", type: "text",  placeholder: "123 Park Avenue",   required: true,  span: true  },
                        { key: "city",      label: "City",           type: "text",  placeholder: "New York",          required: true,  span: false },
                        { key: "country",   label: "Country",        type: "text",  placeholder: "United States",     required: true,  span: false },
                      ].map((f) => (
                        <div key={f.key} className={f.span ? "md:col-span-2" : ""}>
                          <label
                            className="block text-[10px] tracking-widest text-[#7B7F87] mb-2"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {f.label.toUpperCase()}
                            {f.required && <span className="text-[#FF5A1F] ml-1">*</span>}
                          </label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            required={f.required}
                            value={form[f.key as keyof typeof form] as string}
                            onChange={(e) => updateForm(f.key, e.target.value)}
                            className="w-full bg-[#1A1A24] border border-white/10 px-4 py-3 text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Deposit method */}
                    <div className="mt-6">
                      <h3
                        className="text-[10px] tracking-widest text-[#7B7F87] mb-3"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        PREFERRED DEPOSIT METHOD
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { id: "bank-transfer", label: "Bank Transfer" },
                          { id: "card",          label: "Credit Card" },
                          { id: "crypto",        label: "Crypto" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => updateForm("depositMethod", m.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded border text-sm transition-all ${
                              form.depositMethod === m.id
                                ? "border-[#FF5A1F] bg-[#FF5A1F]/5 text-white"
                                : "border-white/10 text-[#7B7F87] hover:border-white/30"
                            }`}
                          >
                            <CreditCard size={13} className={form.depositMethod === m.id ? "text-[#FF5A1F]" : ""} />
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5 — Review & confirm */}
                {step === 5 && (
                  <div>
                    <StepHeader
                      title="REVIEW YOUR ORDER"
                      sub="Please verify all details before confirming. Our team will reach out to finalise payment."
                    />

                    {/* Full summary */}
                    <div
                      className="rounded-lg overflow-hidden mb-6"
                      style={{ border: "1px solid rgba(192,192,208,0.1)" }}
                    >
                      {/* Vehicle hero */}
                      <div className="relative h-44">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24] to-transparent" />
                        <div className="absolute bottom-4 left-5">
                          <p
                            className="font-bebas text-white text-3xl"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                          >
                            {vehicle.name}
                          </p>
                          <p
                            className="text-xs text-[#FF5A1F]"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {vehicle.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Line items */}
                      <div className="p-5 space-y-3" style={{ background: "#1A1A24" }}>
                        {[
                          { label: "Base Price",        value: formatPrice(vehicle.price) },
                          { label: "Colour — " + color.name, value: color.priceAdd === 0 ? "Included" : `+${formatPrice(color.priceAdd)}` },
                          { label: "Wheels — " + wheel.name, value: wheel.price === 0 ? "Included" : `+${formatPrice(wheel.price)}` },
                          { label: "Interior — " + interior.name, value: interior.price === 0 ? "Included" : `+${formatPrice(interior.price)}` },
                          { label: "Pack — " + perfPack.name, value: perfPack.price === 0 ? "Included" : `+${formatPrice(perfPack.price)}` },
                          { label: "Delivery — " + delivery.name, value: delivery.price === 0 ? "Included" : `+${formatPrice(delivery.price)}` },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                            <span className="text-[#7B7F87]">{row.label}</span>
                            <span className="text-white">{row.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div
                        className="flex justify-between items-center px-5 py-4"
                        style={{ background: "#111118", borderTop: "1px solid rgba(255,90,31,0.2)" }}
                      >
                        <span
                          className="text-xs tracking-widest text-[#7B7F87]"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          TOTAL VEHICLE PRICE
                        </span>
                        <span
                          className="font-bebas text-2xl text-white"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {formatPrice(totalPrice)}
                        </span>
                      </div>

                      {/* Deposit callout */}
                      <div
                        className="px-5 py-4 flex items-center justify-between"
                        style={{ background: "rgba(255,90,31,0.06)", borderTop: "1px solid rgba(255,90,31,0.15)" }}
                      >
                        <div>
                          <p
                            className="text-[10px] tracking-widest text-[#FF5A1F] mb-0.5"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            DUE TODAY (10% DEPOSIT)
                          </p>
                          <p className="text-[#7B7F87] text-xs">Balance due at vehicle handover</p>
                        </div>
                        <span
                          className="font-bebas text-3xl text-[#FF5A1F]"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {formatPrice(depositAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Customer details summary */}
                    <div
                      className="p-5 rounded-lg mb-6 space-y-2"
                      style={{ background: "#1A1A24", border: "1px solid rgba(192,192,208,0.1)" }}
                    >
                      <p
                        className="text-[10px] tracking-widest text-[#7B7F87] mb-3"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        YOUR DETAILS
                      </p>
                      <p className="text-white text-sm">{form.firstName} {form.lastName}</p>
                      <p className="text-[#7B7F87] text-sm">{form.email} · {form.phone}</p>
                      <p className="text-[#7B7F87] text-sm">{form.address}, {form.city}, {form.country}</p>
                    </div>

                    {/* Agreements */}
                    <div className="space-y-3 mb-2">
                      {[
                        {
                          key: "agreeTerms",
                          label: "I agree to the Apex Velocity Purchase Terms & Conditions, including the deposit refund policy.",
                          required: true,
                        },
                        {
                          key: "agreeUpdates",
                          label: "Keep me updated on exclusive events, model releases, and owner experiences.",
                          required: false,
                        },
                      ].map((a) => (
                        <label key={a.key} className="flex items-start gap-3 cursor-pointer group">
                          <button
                            type="button"
                            onClick={() => updateForm(a.key, !form[a.key as keyof typeof form])}
                            className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                              form[a.key as keyof typeof form]
                                ? "bg-[#FF5A1F] border-[#FF5A1F]"
                                : "border-white/20 group-hover:border-[#FF5A1F]/50"
                            }`}
                          >
                            {form[a.key as keyof typeof form] && <Check size={11} className="text-black" />}
                          </button>
                          <span className="text-[#7B7F87] text-sm leading-relaxed">
                            {a.label}
                            {a.required && <span className="text-[#FF5A1F] ml-1">*</span>}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t"
              style={{ borderColor: "rgba(192,192,208,0.08)" }}>
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`flex items-center gap-2 px-6 py-3 border border-white/10 text-[#7B7F87] text-xs tracking-wider hover:border-white/30 hover:text-white transition-all ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <ArrowLeft size={13} /> BACK
              </button>

              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-8 py-3 text-xs font-semibold tracking-widest transition-all ${
                    canProceed()
                      ? "bg-[#FF5A1F] text-black hover:bg-[#FF7A3F]"
                      : "bg-white/10 text-[#7B7F87] cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  CONTINUE <ChevronRight size={13} />
                </button>
              ) : (
                <button
                  onClick={() => form.agreeTerms && setSubmitted(true)}
                  disabled={!form.agreeTerms}
                  className={`flex items-center gap-2 px-8 py-3 text-xs font-semibold tracking-widest transition-all ${
                    form.agreeTerms
                      ? "bg-[#FF5A1F] text-black hover:bg-[#FF7A3F]"
                      : "bg-white/10 text-[#7B7F87] cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Lock size={12} /> CONFIRM ORDER
                </button>
              )}
            </div>
          </div>

          {/* ── Right column: Live price summary ───────────────────────── */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-lg overflow-hidden"
              style={{ background: "#0B0F18", border: "1px solid rgba(192,192,208,0.1)" }}
            >
              {/* Vehicle thumbnail */}
              <div className="relative h-40">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] to-transparent" />

                {/* Colour swatch overlay */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/30"
                    style={{ background: color.hex }}
                  />
                  <span className="text-xs text-white">{color.name}</span>
                </div>
              </div>

              <div className="p-5">
                <p
                  className="font-bebas text-white text-2xl mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  {vehicle.name}
                </p>
                <p
                  className="text-[10px] tracking-widest text-[#7B7F87] mb-5"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  YOUR CONFIGURATION
                </p>

                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Base",      value: formatPrice(vehicle.price) },
                    { label: "Colour",    value: color.priceAdd > 0 ? `+${formatPrice(color.priceAdd)}` : "Included" },
                    { label: "Wheels",    value: wheel.price > 0 ? `+${formatPrice(wheel.price)}` : "Included" },
                    { label: "Interior",  value: interior.price > 0 ? `+${formatPrice(interior.price)}` : "Included" },
                    { label: "Pack",      value: perfPack.price > 0 ? `+${formatPrice(perfPack.price)}` : "Included" },
                    { label: "Delivery",  value: delivery.price > 0 ? `+${formatPrice(delivery.price)}` : "Included" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs">
                      <span
                        className="text-[#7B7F87]"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {row.label.toUpperCase()}
                      </span>
                      <span className="text-white">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t pt-4 mb-4"
                  style={{ borderColor: "rgba(192,192,208,0.1)" }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className="text-[10px] tracking-widest text-[#7B7F87]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      TOTAL
                    </span>
                    <motion.span
                      key={totalPrice}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bebas text-xl text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {formatPrice(totalPrice)}
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-[10px] tracking-widest text-[#7B7F87]"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      DEPOSIT (10%)
                    </span>
                    <motion.span
                      key={depositAmount}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bebas text-xl text-[#FF5A1F]"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {formatPrice(depositAmount)}
                    </motion.span>
                  </div>
                </div>

                {/* Trust signals */}
                <div
                  className="border-t pt-4 space-y-2.5"
                  style={{ borderColor: "rgba(192,192,208,0.08)" }}
                >
                  {[
                    { icon: Shield,     label: "2-Year Warranty Included" },
                    { icon: BadgeCheck, label: "Certificate of Authenticity" },
                    { icon: FileText,   label: "Full Build Documentation" },
                    { icon: Star,       label: "Lifetime Owner Support" },
                    { icon: Phone,      label: "Dedicated Specialist" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-xs text-[#7B7F87]">
                      <Icon size={12} className="text-[#FF5A1F] flex-shrink-0" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────────

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-7">
      <h2
        className="font-bebas text-white text-3xl mb-1"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
      >
        {title}
      </h2>
      <p className="text-[#7B7F87] text-sm">{sub}</p>
    </div>
  );
}

function OptionRow({
  name, desc, price, selected, onSelect,
}: {
  name: string; desc: string; price: number; selected: boolean; onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${
        selected ? "border-[#FF5A1F] bg-[#FF5A1F]/5" : "border-white/10 hover:border-white/30"
      }`}
      style={{ background: selected ? undefined : "#1A1A24" }}
    >
      <div>
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-[#7B7F87] text-xs mt-0.5">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <p
          className="text-sm font-bebas text-[#FF5A1F]"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}
        >
          {price === 0 ? "INCLUDED" : `+${formatPrice(price)}`}
        </p>
        {selected && <Check size={15} className="text-[#FF5A1F]" />}
      </div>
    </button>
  );
}

// ── Page export with Suspense for useSearchParams ─────────────────────────

export function OrderClient({ vehicle }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#02040A" }}>
          <p className="text-[#7B7F87]">Loading order form…</p>
        </div>
      }
    >
      <OrderForm vehicle={vehicle} />
    </Suspense>
  );
}
