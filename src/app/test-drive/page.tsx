"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calendar, MapPin, Car, User } from "lucide-react";
import { vehicles } from "@/lib/data";

const steps = [
  { id: 1, label: "Vehicle", icon: Car },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Schedule", icon: Calendar },
  { id: 4, label: "Details", icon: User },
];

const dealers = [
  { id: "london", name: "Apex Velocity London", address: "15 Mayfair Square, London" },
  { id: "newyork", name: "Apex Velocity New York", address: "432 Park Avenue, New York" },
  { id: "dubai", name: "Apex Velocity Dubai", address: "Sheikh Zayed Road, Dubai" },
  { id: "tokyo", name: "Apex Velocity Tokyo", address: "2-1 Minami-Aoyama, Tokyo" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export default function TestDrivePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    vehicle: "",
    dealer: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!form.vehicle;
      case 2: return !!form.dealer;
      case 3: return !!form.date && !!form.time;
      case 4: return !!form.firstName && !!form.lastName && !!form.email;
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: "#02040A" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg px-6"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center mx-auto mb-8 pulse-glow">
            <Check size={36} className="text-[#FF5A1F]" />
          </div>
          <h2
            className="font-bebas text-white text-5xl mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            BOOKING CONFIRMED
          </h2>
          <p className="text-[#7B7F87] mb-2">
            Your test drive has been scheduled. A confirmation has been sent to{" "}
            <span className="text-white">{form.email}</span>.
          </p>
          <p className="text-[#7B7F87] mb-8">
            Our team will contact you 24 hours before your appointment.
          </p>
          <div
            className="p-6 rounded-lg mb-8 text-left"
            style={{ background: "#1A1A24", border: "1px solid rgba(192, 192, 208, 0.1)" }}
          >
            <div className="space-y-3">
              {[
                { label: "Vehicle", value: vehicles.find((v) => v.id === form.vehicle)?.name || "" },
                { label: "Location", value: dealers.find((d) => d.id === form.dealer)?.name || "" },
                { label: "Date & Time", value: `${form.date} at ${form.time}` },
                { label: "Name", value: `${form.firstName} ${form.lastName}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span
                    className="text-xs text-[#7B7F87]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {item.label.toUpperCase()}
                  </span>
                  <span className="text-sm text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm({ vehicle: "", dealer: "", date: "", time: "", firstName: "", lastName: "", email: "", phone: "", message: "" }); }}
            className="px-8 py-3 border border-white/20 text-white text-sm tracking-wider hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            BOOK ANOTHER
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
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
              EXPERIENCE
            </span>
          </div>
          <h1
            className="font-bebas text-white leading-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              letterSpacing: "0.05em",
            }}
          >
            BOOK A TEST DRIVE
          </h1>
          <p className="text-[#7B7F87]">
            Experience the pinnacle of automotive performance firsthand. Complete the form below to schedule your private test drive.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step > s.id
                      ? "bg-[#FF5A1F] border-[#FF5A1F]"
                      : step === s.id
                      ? "border-[#FF5A1F] bg-[#FF5A1F]/10"
                      : "border-white/20 bg-transparent"
                  }`}
                >
                  {step > s.id ? (
                    <Check size={16} className="text-black" />
                  ) : (
                    <s.icon size={16} className={step === s.id ? "text-[#FF5A1F]" : "text-[#7B7F87]"} />
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 tracking-widest ${step === s.id ? "text-[#FF5A1F]" : "text-[#7B7F87]"}`}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {s.label.toUpperCase()}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-5"
                  style={{ background: step > s.id ? "#FF5A1F" : "rgba(192, 192, 208, 0.2)" }}
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
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {step === 1 && (
              <div>
                <h2
                  className="font-bebas text-white text-3xl mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  SELECT YOUR VEHICLE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => updateForm("vehicle", vehicle.id)}
                      className={`relative rounded-lg overflow-hidden text-left transition-all border-2 ${
                        form.vehicle === vehicle.id ? "border-[#FF5A1F]" : "border-transparent"
                      }`}
                    >
                      <div
                        className="h-32 bg-cover bg-center"
                        style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
                      />
                      <div className="p-4" style={{ background: "#1A1A24" }}>
                        <p
                          className="font-bebas text-white text-xl"
                          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                        >
                          {vehicle.name}
                        </p>
                        <p className="text-xs text-[#7B7F87]">{vehicle.tagline}</p>
                      </div>
                      {form.vehicle === vehicle.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF5A1F] flex items-center justify-center">
                          <Check size={12} className="text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2
                  className="font-bebas text-white text-3xl mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  CHOOSE LOCATION
                </h2>
                <div className="space-y-3">
                  {dealers.map((dealer) => (
                    <button
                      key={dealer.id}
                      onClick={() => updateForm("dealer", dealer.id)}
                      className={`w-full p-5 rounded-lg border-2 text-left transition-all flex items-center justify-between ${
                        form.dealer === dealer.id
                          ? "border-[#FF5A1F] bg-[#FF5A1F]/5"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div>
                        <p className="text-white font-medium">{dealer.name}</p>
                        <p className="text-[#7B7F87] text-sm mt-0.5">{dealer.address}</p>
                      </div>
                      {form.dealer === dealer.id && (
                        <Check size={18} className="text-[#FF5A1F]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2
                  className="font-bebas text-white text-3xl mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  SELECT DATE & TIME
                </h2>
                <div className="mb-6">
                  <label className="block text-xs tracking-widest text-[#7B7F87] mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-[#1A1A24] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FF5A1F] transition-colors rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-[#7B7F87] mb-3" style={{ fontFamily: "'Space Mono', monospace" }}>
                    PREFERRED TIME
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => updateForm("time", time)}
                        className={`py-3 text-xs tracking-wider transition-all rounded ${
                          form.time === time
                            ? "bg-[#FF5A1F] text-black font-semibold"
                            : "border border-white/10 text-[#7B7F87] hover:border-[#FF5A1F] hover:text-white"
                        }`}
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2
                  className="font-bebas text-white text-3xl mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  YOUR DETAILS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "firstName", label: "First Name", type: "text", placeholder: "John" },
                    { key: "lastName", label: "Last Name", type: "text", placeholder: "Smith" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-widest text-[#7B7F87] mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                        {field.label.toUpperCase()}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => updateForm(field.key, e.target.value)}
                        className="w-full bg-[#1A1A24] border border-white/10 px-4 py-3 text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-xs tracking-widest text-[#7B7F87] mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                      ADDITIONAL NOTES (OPTIONAL)
                    </label>
                    <textarea
                      placeholder="Any specific requirements or questions..."
                      value={form.message}
                      onChange={(e) => updateForm("message", e.target.value)}
                      rows={3}
                      className="w-full bg-[#1A1A24] border border-white/10 px-4 py-3 text-white placeholder-[#7B7F87] focus:outline-none focus:border-[#FF5A1F] transition-colors rounded resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className={`px-6 py-3 border border-white/10 text-[#7B7F87] text-sm tracking-wider hover:border-white/30 hover:text-white transition-all ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            BACK
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-widest transition-all ${
                canProceed()
                  ? "bg-[#FF5A1F] text-black hover:bg-[#FF7A3F]"
                  : "bg-white/10 text-[#7B7F87] cursor-not-allowed"
              }`}
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              CONTINUE
              <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-widest transition-all ${
                canProceed()
                  ? "bg-[#FF5A1F] text-black hover:bg-[#FF7A3F]"
                  : "bg-white/10 text-[#7B7F87] cursor-not-allowed"
              }`}
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              CONFIRM BOOKING
              <Check size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
