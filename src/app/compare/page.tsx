"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { vehicles } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Check, Minus } from "lucide-react";
import type { Vehicle } from "@/lib/data";

const MAX_COMPARE = 3;

export default function ComparePage() {
  const [selected, setSelected] = useState<Vehicle[]>([vehicles[0], vehicles[2]]);
  const [showPicker, setShowPicker] = useState(false);

  const addVehicle = (vehicle: Vehicle) => {
    if (selected.length < MAX_COMPARE && !selected.find((v) => v.id === vehicle.id)) {
      setSelected([...selected, vehicle]);
    }
    setShowPicker(false);
  };

  const removeVehicle = (id: string) => {
    setSelected(selected.filter((v) => v.id !== id));
  };

  const specRows = [
    { label: "Price", key: "price", format: (v: Vehicle) => formatPrice(v.price) },
    { label: "Horsepower", key: "hp", format: (v: Vehicle) => `${v.specs.horsepower.toLocaleString()} HP` },
    { label: "Torque", key: "torque", format: (v: Vehicle) => `${v.specs.torque.toLocaleString()} lb-ft` },
    { label: "Top Speed", key: "speed", format: (v: Vehicle) => `${v.specs.topSpeed} MPH` },
    { label: "0–60 MPH", key: "accel", format: (v: Vehicle) => `${v.specs.acceleration} sec` },
    { label: "Weight", key: "weight", format: (v: Vehicle) => `${v.specs.weight.toLocaleString()} kg` },
    { label: "Engine", key: "engine", format: (v: Vehicle) => v.specs.engine },
    { label: "Transmission", key: "trans", format: (v: Vehicle) => v.specs.transmission },
    { label: "Drivetrain", key: "drive", format: (v: Vehicle) => v.specs.drivetrain },
    { label: "Drag Coefficient", key: "drag", format: (v: Vehicle) => `Cd ${v.specs.aeroDrag}` },
    { label: "Fuel Type", key: "fuel", format: (v: Vehicle) => v.fuelType.charAt(0).toUpperCase() + v.fuelType.slice(1) },
    { label: "Year", key: "year", format: (v: Vehicle) => v.year.toString() },
  ];

  const getBest = (key: string): string | null => {
    if (selected.length < 2) return null;
    switch (key) {
      case "hp": return selected.reduce((a, b) => a.specs.horsepower > b.specs.horsepower ? a : b).id;
      case "speed": return selected.reduce((a, b) => a.specs.topSpeed > b.specs.topSpeed ? a : b).id;
      case "accel": return selected.reduce((a, b) => a.specs.acceleration < b.specs.acceleration ? a : b).id;
      case "drag": return selected.reduce((a, b) => a.specs.aeroDrag < b.specs.aeroDrag ? a : b).id;
      case "price": return selected.reduce((a, b) => a.price < b.price ? a : b).id;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <span
              className="text-xs tracking-[0.3em] text-[#FF5A1F]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              SIDE BY SIDE
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
            COMPARE VEHICLES
          </h1>
        </motion.div>

        {/* Vehicle selector row */}
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${MAX_COMPARE + 1}, 1fr)` }}>
          {/* Label column */}
          <div className="hidden lg:block" />

          {/* Selected vehicles */}
          {Array.from({ length: MAX_COMPARE }).map((_, i) => {
            const vehicle = selected[i];
            return (
              <div key={i}>
                {vehicle ? (
                  <div className="relative rounded-lg overflow-hidden card-dark">
                    <div
                      className="relative h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24] to-transparent" />
                      <button
                        onClick={() => removeVehicle(vehicle.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 border border-white/20 flex items-center justify-center hover:border-[#FF5A1F] transition-all"
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p
                        className="font-bebas text-white text-xl"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                      >
                        {vehicle.name}
                      </p>
                      <p
                        className="text-xs text-[#FF5A1F]"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {formatPrice(vehicle.price)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowPicker(true)}
                    className="w-full h-full min-h-[180px] border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#FF5A1F]/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF5A1F] transition-all">
                      <Plus size={18} className="text-[#7B7F87] group-hover:text-[#FF5A1F]" />
                    </div>
                    <span
                      className="text-xs text-[#7B7F87] tracking-widest"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      ADD VEHICLE
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        {selected.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(192, 192, 208, 0.1)" }}>
              {specRows.map((row, i) => {
                const bestId = getBest(row.key);
                return (
                  <div
                    key={row.key}
                    className={`grid gap-4 px-6 py-4 ${i % 2 === 0 ? "" : "bg-white/2"}`}
                    style={{ gridTemplateColumns: `200px repeat(${MAX_COMPARE}, 1fr)` }}
                  >
                    <span
                      className="text-xs tracking-wider text-[#7B7F87] flex items-center"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {row.label.toUpperCase()}
                    </span>
                    {Array.from({ length: MAX_COMPARE }).map((_, j) => {
                      const vehicle = selected[j];
                      if (!vehicle) return <div key={j} />;
                      const isBest = bestId === vehicle.id;
                      return (
                        <div key={j} className="flex items-center gap-2">
                          {isBest && (
                            <div className="w-4 h-4 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/50 flex items-center justify-center flex-shrink-0">
                              <Check size={8} className="text-[#FF5A1F]" />
                            </div>
                          )}
                          <span
                            className={`text-sm ${isBest ? "text-[#FF5A1F] font-medium" : "text-[#C0C0D0]"}`}
                          >
                            {row.format(vehicle)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {selected.length < 2 && (
          <div className="text-center py-16">
            <p className="text-[#7B7F87]">Add at least 2 vehicles to compare.</p>
          </div>
        )}
      </div>

      {/* Vehicle picker modal */}
      {showPicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(2, 4, 10, 0.9)", backdropFilter: "blur(20px)" }}
          onClick={() => setShowPicker(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl rounded-lg overflow-hidden"
            style={{ background: "#0B0F18", border: "1px solid rgba(192, 192, 208, 0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "rgba(192, 192, 208, 0.1)" }}>
              <h3
                className="font-bebas text-white text-2xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
              >
                SELECT VEHICLE
              </h3>
              <button onClick={() => setShowPicker(false)}>
                <X size={20} className="text-[#7B7F87] hover:text-white" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
              {vehicles.map((vehicle) => {
                const isSelected = selected.find((v) => v.id === vehicle.id);
                return (
                  <button
                    key={vehicle.id}
                    onClick={() => !isSelected && addVehicle(vehicle)}
                    disabled={!!isSelected}
                    className={`relative rounded-lg overflow-hidden text-left transition-all ${
                      isSelected ? "opacity-40 cursor-not-allowed" : "hover:border-[#FF5A1F]"
                    }`}
                    style={{ border: "1px solid rgba(192, 192, 208, 0.1)" }}
                  >
                    <div
                      className="h-24 bg-cover bg-center"
                      style={{ backgroundImage: `url('${vehicle.images.hero}')` }}
                    />
                    <div className="p-3">
                      <p
                        className="font-bebas text-white text-lg"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {vehicle.name}
                      </p>
                      <p className="text-xs text-[#7B7F87]">{formatPrice(vehicle.price)}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Check size={24} className="text-[#FF5A1F]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
